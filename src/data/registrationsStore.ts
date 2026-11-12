// In-memory & Persistent Store for Pride Patna Marathon 2027 Registrations

export interface RunnerRegistration {
  id: string;
  bibNumber: string;
  transactionId: string;
  fullName: string;
  bibName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  dob: string;
  city: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  categoryCode: "5k" | "10k" | "21k";
  tShirtSize: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  registeredAt: string;
  paymentStatus: "confirmed" | "pending" | "refunded";
  amountPaid: number;
  kitCollected: boolean;
  kitCollectedAt?: string;
  corral: string;
  medicalNotes?: string;
}

const CATEGORY_PRICES: Record<string, number> = {
  "5k": 499,
  "10k": 799,
  "21k": 1299,
};

// Seed realistic data for admin demo
const INITIAL_REGISTRATIONS: RunnerRegistration[] = [
  {
    id: "reg-001",
    bibNumber: "PPM-21K-2001",
    transactionId: "TXN-PATNA-982101",
    fullName: "Rohan Verma",
    bibName: "ROHAN",
    email: "rohan.verma@patnamarathon.in",
    phone: "9835012345",
    gender: "male",
    dob: "1994-06-15",
    city: "Patna",
    emergencyContactName: "Sunita Verma",
    emergencyContactPhone: "9835098765",
    categoryCode: "21k",
    tShirtSize: "L",
    registeredAt: "2026-11-10T09:15:00Z",
    paymentStatus: "confirmed",
    amountPaid: 1299,
    kitCollected: true,
    kitCollectedAt: "2026-11-12T11:00:00Z",
    corral: "Corral A",
    medicalNotes: "No known allergies. Sub-1:45 half marathon target.",
  },
  {
    id: "reg-002",
    bibNumber: "PPM-21K-2045",
    transactionId: "TXN-PATNA-982102",
    fullName: "Ananya Roy",
    bibName: "ANANYA",
    email: "ananya.roy@gmail.com",
    phone: "9431024680",
    gender: "female",
    dob: "1998-11-22",
    city: "Patna",
    emergencyContactName: "Dr. K. K. Roy",
    emergencyContactPhone: "9431088776",
    categoryCode: "21k",
    tShirtSize: "M",
    registeredAt: "2026-11-10T10:45:00Z",
    paymentStatus: "confirmed",
    amountPaid: 1299,
    kitCollected: true,
    kitCollectedAt: "2026-11-12T10:20:00Z",
    corral: "Corral B",
    medicalNotes: "Mild asthma, carrying inhaler.",
  },
  {
    id: "reg-003",
    bibNumber: "PPM-21K-2088",
    transactionId: "TXN-PATNA-982103",
    fullName: "Vikramaditya Kumar",
    bibName: "VIKRAM",
    email: "vikram.k@outlook.com",
    phone: "9122334455",
    gender: "male",
    dob: "1991-03-08",
    city: "Gaya",
    emergencyContactName: "Pooja Kumari",
    emergencyContactPhone: "9122339900",
    categoryCode: "21k",
    tShirtSize: "XL",
    registeredAt: "2026-11-11T08:30:00Z",
    paymentStatus: "confirmed",
    amountPaid: 1299,
    kitCollected: false,
    corral: "Corral B",
    medicalNotes: "None",
  },
  {
    id: "reg-004",
    bibNumber: "PPM-10K-3104",
    transactionId: "TXN-PATNA-982104",
    fullName: "Priyanka Mishra",
    bibName: "PRIYA",
    email: "priyanka.mishra@bihargov.in",
    phone: "9934112233",
    gender: "female",
    dob: "1996-09-19",
    city: "Muzaffarpur",
    emergencyContactName: "Alok Mishra",
    emergencyContactPhone: "9934119988",
    categoryCode: "10k",
    tShirtSize: "S",
    registeredAt: "2026-11-11T14:10:00Z",
    paymentStatus: "confirmed",
    amountPaid: 799,
    kitCollected: false,
    corral: "Corral C",
    medicalNotes: "First 10K official race.",
  },
  {
    id: "reg-005",
    bibNumber: "PPM-5K-4012",
    transactionId: "TXN-PATNA-982105",
    fullName: "Amitabh Sen",
    bibName: "AMITABH",
    email: "amitabh.sen@tatasteel.com",
    phone: "9470112244",
    gender: "male",
    dob: "1982-12-04",
    city: "Patna",
    emergencyContactName: "Nandita Sen",
    emergencyContactPhone: "9470119900",
    categoryCode: "5k",
    tShirtSize: "XXL",
    registeredAt: "2026-11-11T16:05:00Z",
    paymentStatus: "confirmed",
    amountPaid: 499,
    kitCollected: true,
    kitCollectedAt: "2026-11-12T09:40:00Z",
    corral: "Family Corral D",
    medicalNotes: "Running with 10-year-old son.",
  },
  {
    id: "reg-006",
    bibNumber: "PPM-21K-2002",
    transactionId: "TXN-PATNA-982106",
    fullName: "Kavita Thakur",
    bibName: "KAVITA",
    email: "kavita.thakur@delhirunners.org",
    phone: "9811223344",
    gender: "female",
    dob: "1989-04-12",
    city: "New Delhi",
    emergencyContactName: "Rakesh Thakur",
    emergencyContactPhone: "9811228899",
    categoryCode: "21k",
    tShirtSize: "M",
    registeredAt: "2026-11-12T08:12:00Z",
    paymentStatus: "confirmed",
    amountPaid: 1299,
    kitCollected: false,
    corral: "Corral A",
    medicalNotes: "AFI Master Athlete. Target: Half Marathon 1:35.",
  },
  {
    id: "reg-007",
    bibNumber: "PPM-21K-2101",
    transactionId: "TXN-PATNA-982107",
    fullName: "Md. Tariq Anwar",
    bibName: "TARIQ",
    email: "tariq.anwar@gmail.com",
    phone: "9304112255",
    gender: "male",
    dob: "1997-08-30",
    city: "Bhagalpur",
    emergencyContactName: "Zubair Anwar",
    emergencyContactPhone: "9304118800",
    categoryCode: "21k",
    tShirtSize: "L",
    registeredAt: "2026-11-12T09:30:00Z",
    paymentStatus: "confirmed",
    amountPaid: 1299,
    kitCollected: true,
    kitCollectedAt: "2026-11-12T12:15:00Z",
    corral: "Corral B",
    medicalNotes: "None",
  },
  {
    id: "reg-008",
    bibNumber: "PPM-10K-3150",
    transactionId: "TXN-PATNA-982108",
    fullName: "Sneha Kashyap",
    bibName: "SNEHA",
    email: "sneha.kashyap@aiims.edu.in",
    phone: "9608112266",
    gender: "female",
    dob: "1995-01-14",
    city: "Patna",
    emergencyContactName: "Dr. Manish Kashyap",
    emergencyContactPhone: "9608118877",
    categoryCode: "10k",
    tShirtSize: "S",
    registeredAt: "2026-11-12T10:00:00Z",
    paymentStatus: "confirmed",
    amountPaid: 799,
    kitCollected: false,
    corral: "Corral C",
    medicalNotes: "AIIMS Patna Doctors Running Club.",
  },
  {
    id: "reg-009",
    bibNumber: "PPM-5K-4055",
    transactionId: "TXN-PATNA-982109",
    fullName: "Deepak Choudhary",
    bibName: "DEEPAK",
    email: "deepak.c@bcci.tv",
    phone: "9430112277",
    gender: "male",
    dob: "2001-05-20",
    city: "Darbhanga",
    emergencyContactName: "Mahesh Choudhary",
    emergencyContactPhone: "9430119955",
    categoryCode: "5k",
    tShirtSize: "M",
    registeredAt: "2026-11-12T10:45:00Z",
    paymentStatus: "confirmed",
    amountPaid: 499,
    kitCollected: true,
    kitCollectedAt: "2026-11-12T13:00:00Z",
    corral: "Family Corral D",
    medicalNotes: "None",
  },
  {
    id: "reg-010",
    bibNumber: "PPM-21K-2120",
    transactionId: "TXN-PATNA-982110",
    fullName: "Simran Kaur",
    bibName: "SIMRAN",
    email: "simran.kaur@punjabracing.com",
    phone: "9876543210",
    gender: "female",
    dob: "1993-07-09",
    city: "Chandigarh",
    emergencyContactName: "Gurpreet Kaur",
    emergencyContactPhone: "9876549988",
    categoryCode: "21k",
    tShirtSize: "M",
    registeredAt: "2026-11-12T11:15:00Z",
    paymentStatus: "confirmed",
    amountPaid: 1299,
    kitCollected: false,
    corral: "Corral B",
    medicalNotes: "Pacer for 2:00 Half Marathon Bus.",
  },
];

// In-memory global store preserved across all Next.js bundles on globalThis
declare global {
  // eslint-disable-next-line no-var
  var _patnaRegistrations: RunnerRegistration[] | undefined;
}

if (!globalThis._patnaRegistrations) {
  globalThis._patnaRegistrations = [...INITIAL_REGISTRATIONS];
}

const getStore = (): RunnerRegistration[] => {
  if (!globalThis._patnaRegistrations) {
    globalThis._patnaRegistrations = [...INITIAL_REGISTRATIONS];
  }
  return globalThis._patnaRegistrations;
};

export function getAllRegistrations(): RunnerRegistration[] {
  return [...getStore()];
}

export function addRegistration(
  data: Omit<RunnerRegistration, "id" | "registeredAt" | "paymentStatus" | "amountPaid" | "kitCollected">
): RunnerRegistration {
  const store = getStore();
  const newReg: RunnerRegistration = {
    ...data,
    id: `reg-${Date.now().toString(36)}`,
    registeredAt: new Date().toISOString(),
    paymentStatus: "confirmed",
    amountPaid: CATEGORY_PRICES[data.categoryCode] || 999,
    kitCollected: false,
  };
  store.unshift(newReg);
  return newReg;
}

export function toggleKitCollection(id: string): RunnerRegistration | null {
  const store = getStore();
  const reg = store.find((r) => r.id === id);
  if (!reg) return null;
  reg.kitCollected = !reg.kitCollected;
  reg.kitCollectedAt = reg.kitCollected ? new Date().toISOString() : undefined;
  return reg;
}

export function updateRegistration(
  id: string,
  updates: Partial<RunnerRegistration>
): RunnerRegistration | null {
  const store = getStore();
  const idx = store.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  store[idx] = { ...store[idx], ...updates };
  return store[idx];
}

export function deleteRegistration(id: string): boolean {
  const store = getStore();
  const idx = store.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  store.splice(idx, 1);
  return true;
}

export function getAdminMetrics() {
  const all = getStore();
  const totalRunners = all.length;
  const totalRevenue = all.reduce((sum, r) => sum + r.amountPaid, 0);
  const kitCollectedCount = all.filter((r) => r.kitCollected).length;
  const kitPendingCount = totalRunners - kitCollectedCount;
  const collectionPercentage = totalRunners > 0 ? Math.round((kitCollectedCount / totalRunners) * 100) : 0;

  const categoryCounts = {
    "21k": all.filter((r) => r.categoryCode === "21k").length,
    "10k": all.filter((r) => r.categoryCode === "10k").length,
    "5k": all.filter((r) => r.categoryCode === "5k").length,
  };

  const jerseyCounts: Record<string, number> = {
    XS: all.filter((r) => r.tShirtSize === "XS").length,
    S: all.filter((r) => r.tShirtSize === "S").length,
    M: all.filter((r) => r.tShirtSize === "M").length,
    L: all.filter((r) => r.tShirtSize === "L").length,
    XL: all.filter((r) => r.tShirtSize === "XL").length,
    XXL: all.filter((r) => r.tShirtSize === "XXL").length,
  };

  return {
    totalRunners,
    totalRevenue,
    kitCollectedCount,
    kitPendingCount,
    collectionPercentage,
    categoryCounts,
    jerseyCounts,
    eventDate: "7 Feb 2027",
    expoDates: "4 - 6 Feb 2027",
  };
}
