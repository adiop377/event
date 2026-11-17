// Pure TypeScript QR Code Generator (Version 3/4 Byte Mode)
// Generates standard 2D boolean matrix for clean SVG rendering without any external npm packages.

// Galois Field GF(256) log and exp tables for Reed-Solomon
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);

(function initGalois() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    EXP_TABLE[i + 255] = x;
    LOG_TABLE[x] = i;
    x <<= 1;
    if (x >= 256) x ^= 0x11d;
  }
})();

function gMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]];
}

function rsGeneratorPoly(degree: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(poly.length + 1);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gMul(poly[j], EXP_TABLE[i]);
      next[j + 1] ^= poly[j];
    }
    poly = next;
  }
  return poly;
}

function rsCompute(data: Uint8Array, numEcBytes: number): Uint8Array {
  const gen = rsGeneratorPoly(numEcBytes);
  const res = new Uint8Array(numEcBytes);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ res[0];
    res.copyWithin(0, 1);
    res[numEcBytes - 1] = 0;
    for (let j = 0; j < numEcBytes; j++) {
      res[j] ^= gMul(gen[j], factor);
    }
  }
  return res;
}

export interface QROptions {
  size?: number;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
}

export function generateQRCodeSVG(text: string, options: QROptions = {}): string {
  const size = options.size || 220;
  const margin = options.margin !== undefined ? options.margin : 2;
  const darkColor = options.darkColor || "#000000";
  const lightColor = options.lightColor || "#FFFFFF";

  // Use Version 4 (33x33) or Version 5 (37x37)
  const version = text.length > 50 ? 5 : 4;
  const dimension = 17 + 4 * version; // 33 or 37
  const modules: boolean[][] = Array.from({ length: dimension }, () =>
    Array(dimension).fill(false)
  );
  const isFunction: boolean[][] = Array.from({ length: dimension }, () =>
    Array(dimension).fill(false)
  );

  // Helper to set module
  const set = (r: number, c: number, val: boolean) => {
    if (r >= 0 && r < dimension && c >= 0 && c < dimension) {
      modules[r][c] = val;
      isFunction[r][c] = true;
    }
  };

  // 1. Finder patterns at 3 corners (7x7 + 1 separator)
  const drawFinder = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = row + r;
        const nc = col + c;
        if (nr < 0 || nr >= dimension || nc < 0 || nc >= dimension) continue;
        const isBorder = r === -1 || r === 7 || c === -1 || c === 7;
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        set(nr, nc, !isBorder && (isOuter || isInner));
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, dimension - 7);
  drawFinder(dimension - 7, 0);

  // 2. Timing patterns
  for (let i = 8; i < dimension - 8; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }

  // 3. Alignment pattern for Version 4 (center at 24, 24) or Version 5 (center at 28, 28)
  const alignPos = version === 5 ? 28 : 24;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isOuter = Math.abs(r) === 2 || Math.abs(c) === 2;
      const isCenter = r === 0 && c === 0;
      set(alignPos + r, alignPos + c, isOuter || isCenter);
    }
  }

  // 4. Reserve format bits around finders
  for (let i = 0; i < 9; i++) {
    if (!isFunction[8][i]) isFunction[8][i] = true;
    if (!isFunction[i][8]) isFunction[i][8] = true;
  }
  for (let i = 0; i < 8; i++) {
    const rIdx = dimension - 1 - i;
    if (!isFunction[8][rIdx]) isFunction[8][rIdx] = true;
    if (!isFunction[rIdx][8]) isFunction[rIdx][8] = true;
  }
  set(dimension - 8, 8, true); // Dark module

  // 5. Encode data: Byte mode
  const dataBytes = new TextEncoder().encode(text);
  const totalDataBytes = version === 5 ? 86 : 64; // capacity for Level M
  const ecBytes = version === 5 ? 24 : 18;

  const bitBuffer: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) {
      bitBuffer.push((val >> i) & 1);
    }
  };

  pushBits(0b0100, 4); // Byte mode indicator
  pushBits(dataBytes.length, 8); // Character count
  for (let i = 0; i < dataBytes.length; i++) {
    pushBits(dataBytes[i], 8);
  }

  // Terminator
  while (bitBuffer.length < totalDataBytes * 8 && bitBuffer.length % 8 !== 0) {
    bitBuffer.push(0);
  }
  while (bitBuffer.length < totalDataBytes * 8) {
    pushBits(0b11101100, 8);
    if (bitBuffer.length < totalDataBytes * 8) {
      pushBits(0b00010001, 8);
    }
  }

  const rawBytes = new Uint8Array(totalDataBytes);
  for (let i = 0; i < totalDataBytes; i++) {
    let byteVal = 0;
    for (let b = 0; b < 8; b++) {
      byteVal = (byteVal << 1) | bitBuffer[i * 8 + b];
    }
    rawBytes[i] = byteVal;
  }

  // Reed-Solomon Error Correction
  const ec = rsCompute(rawBytes, ecBytes);
  const finalCodewords = new Uint8Array(totalDataBytes + ecBytes);
  finalCodewords.set(rawBytes, 0);
  finalCodewords.set(ec, totalDataBytes);

  // Convert to bit sequence
  const allBits: number[] = [];
  for (let i = 0; i < finalCodewords.length; i++) {
    const byte = finalCodewords[i];
    for (let j = 7; j >= 0; j--) {
      allBits.push((byte >> j) & 1);
    }
  }

  // Place data bits in zigzag order
  let bitIndex = 0;
  let dir = -1; // up
  let col = dimension - 1;

  while (col > 0) {
    if (col === 6) col--; // Skip vertical timing column
    const rStart = dir === -1 ? dimension - 1 : 0;
    const rEnd = dir === -1 ? -1 : dimension;
    const rStep = dir;

    for (let r = rStart; r !== rEnd; r += rStep) {
      for (const c of [col, col - 1]) {
        if (!isFunction[r][c]) {
          const bit = bitIndex < allBits.length ? allBits[bitIndex++] : 0;
          // Apply mask 0: (row + col) % 2 === 0
          const mask = (r + c) % 2 === 0;
          modules[r][c] = (bit ^ (mask ? 1 : 0)) === 1;
        }
      }
    }
    col -= 2;
    dir = -dir;
  }

  // Draw format string for Mask 0, Level M (0b101010000010010)
  const formatBits = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0];
  const formatCoords = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
    [8, 7], [8, 8], [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];
  const formatCoords2 = [
    [dimension - 1, 8], [dimension - 2, 8], [dimension - 3, 8], [dimension - 4, 8],
    [dimension - 5, 8], [dimension - 6, 8], [dimension - 7, 8],
    [8, dimension - 8], [8, dimension - 7], [8, dimension - 6], [8, dimension - 5],
    [8, dimension - 4], [8, dimension - 3], [8, dimension - 2], [8, dimension - 1]
  ];

  for (let i = 0; i < 15; i++) {
    const val = formatBits[i] === 1;
    const [r1, c1] = formatCoords[i];
    const [r2, c2] = formatCoords2[i];
    modules[r1][c1] = val;
    modules[r2][c2] = val;
  }

  // Convert modules to SVG string
  const totalDim = dimension + margin * 2;
  const cellSize = (size / totalDim).toFixed(3);
  let path = "";

  for (let r = 0; r < dimension; r++) {
    for (let c = 0; c < dimension; c++) {
      if (modules[r][c]) {
        const x = ((c + margin) * (size / totalDim)).toFixed(2);
        const y = ((r + margin) * (size / totalDim)).toFixed(2);
        path += `M${x},${y}h${cellSize}v${cellSize}h-${cellSize}z `;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="${lightColor}" rx="8"/>
    <path d="${path}" fill="${darkColor}" />
  </svg>`;
}
