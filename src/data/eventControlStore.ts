// Central Event Control Store for Pride Patna Marathon 2027

export interface EventControlState {
  registrationsOpen: boolean;
  registrationNotice: string;
  emergencyAlert: {
    active: boolean;
    type: "info" | "warning" | "alert";
    message: string;
    updatedAt: string;
  };
  raceMode: "registration" | "expo" | "race_day" | "post_race";
  eventSchedule: {
    date: string;
    venue: string;
    reportingTime: string;
    flagOff21k: string;
    flagOff10k: string;
    flagOff5k: string;
  };
  categoryQuotas: {
    "21k": number;
    "10k": number;
    "5k": number;
  };
  paymentSettings: {
    upiId: string;
    merchantName: string;
    accountNumber?: string;
    ifscCode?: string;
    enableCards: boolean;
  };
  incidents: Array<{
    id: string;
    timestamp: string;
    location: string;
    severity: "low" | "medium" | "critical";
    unit: string;
    description: string;
    status: "active" | "resolved";
  }>;
}

// Global in-memory state with persistence
const globalForEvent = global as unknown as {
  __patnaEventControl?: EventControlState;
};

export const eventControl: EventControlState = globalForEvent.__patnaEventControl || {
  registrationsOpen: true,
  registrationNotice: "Official Registrations are Live for 7 Feb 2027 at JP Ganga Path.",
  emergencyAlert: {
    active: false,
    type: "info",
    message: "Race Command Bulletin: All timing gantries and Apollo medical stations are operational.",
    updatedAt: new Date().toISOString(),
  },
  raceMode: "registration",
  eventSchedule: {
    date: "7 Feb 2027",
    venue: "JP Ganga Path, Vending Zone",
    reportingTime: "04:30 AM IST",
    flagOff21k: "05:00 AM",
    flagOff10k: "06:00 AM",
    flagOff5k: "07:00 AM",
  },
  categoryQuotas: {
    "21k": 2000,
    "10k": 1800,
    "5k": 1200,
  },
  paymentSettings: {
    upiId: "patnamarathon@upi",
    merchantName: "Pride Patna Marathon 2027",
    accountNumber: "50200084729103",
    ifscCode: "HDFC0001234",
    enableCards: true,
  },
  incidents: [
    {
      id: "INC-101",
      timestamp: "04:45 AM",
      location: "JP Ganga Path - Gate 2",
      severity: "low",
      unit: "Apollo Aid Station 1",
      description: "Hydration electrolytes refilled. Chute barricading locked.",
      status: "resolved",
    },
    {
      id: "INC-102",
      timestamp: "05:10 AM",
      location: "Atal Path Km 4.5",
      severity: "medium",
      unit: "Traffic PCR 12",
      description: "Service lane traffic diversion cordoned off for elite runners.",
      status: "resolved",
    },
  ],
};

if (process.env.NODE_ENV !== "production") {
  globalForEvent.__patnaEventControl = eventControl;
}

export function getEventControl(): EventControlState {
  return eventControl;
}

export function updateEventControl(updates: Partial<EventControlState>): EventControlState {
  if (updates.registrationsOpen !== undefined) eventControl.registrationsOpen = updates.registrationsOpen;
  if (updates.registrationNotice !== undefined) eventControl.registrationNotice = updates.registrationNotice;
  if (updates.emergencyAlert !== undefined) {
    eventControl.emergencyAlert = {
      ...eventControl.emergencyAlert,
      ...updates.emergencyAlert,
      updatedAt: new Date().toISOString(),
    };
  }
  if (updates.raceMode !== undefined) eventControl.raceMode = updates.raceMode;
  if (updates.eventSchedule !== undefined) {
    eventControl.eventSchedule = { ...eventControl.eventSchedule, ...updates.eventSchedule };
  }
  if (updates.categoryQuotas !== undefined) {
    eventControl.categoryQuotas = { ...eventControl.categoryQuotas, ...updates.categoryQuotas };
  }
  if (updates.paymentSettings !== undefined) {
    eventControl.paymentSettings = { ...eventControl.paymentSettings, ...updates.paymentSettings };
  }
  if (updates.incidents !== undefined) eventControl.incidents = updates.incidents;

  return eventControl;
}

export function addIncident(incident: Omit<EventControlState["incidents"][0], "id">) {
  const newIncident = {
    ...incident,
    id: `INC-${Date.now().toString().slice(-4)}`,
  };
  eventControl.incidents.unshift(newIncident);
  return newIncident;
}

export function toggleIncidentStatus(id: string) {
  const item = eventControl.incidents.find((i) => i.id === id);
  if (item) {
    item.status = item.status === "active" ? "resolved" : "active";
  }
  return item;
}
