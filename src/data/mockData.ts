export interface LeakRecord {
  id: string;
  time: string;
  source: string;
  title: string;
  type: "SQL" | "JSON" | "TXT" | "CSV";
  recordsCount: number;
  threatLevel: "Висока" | "Середня" | "Низька";
}

export const mockLeaks: LeakRecord[] = [
  { id: "1", time: "10:23:11", source: "BreachForums", title: "US Logistics Company DB", type: "SQL", recordsCount: 2340190, threatLevel: "Висока" },
  { id: "2", time: "10:22:45", source: "Telegram Channel", title: "Users DB Dump", type: "SQL", recordsCount: 1982112, threatLevel: "Висока" },
  { id: "3", time: "10:21:02", source: "DarkWeb Forum", title: "Financial Data Pack", type: "SQL", recordsCount: 532198, threatLevel: "Середня" },
  { id: "4", time: "10:19:33", source: "Pastebin", title: "Leaked Customers", type: "JSON", recordsCount: 12532, threatLevel: "Низька" },
  { id: "5", time: "10:18:55", source: "Telegram Channel", title: "Combo List 2025", type: "TXT", recordsCount: 104892, threatLevel: "Середня" },
];

export const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);
