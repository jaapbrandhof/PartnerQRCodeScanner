export type LeadStatus = "Nieuw" | "Opvolgen" | "Contact gehad" | "Gekwalificeerd" | "Niet relevant";

export interface Lead {
  id: string;
  partner_id: string;
  full_name: string;
  email: string | null;
  company: string | null;
  phone: string | null;
  status: LeadStatus;
  notes: string | null;
  source: string;
  scanned_at: string;
  created_at: string;
  updated_at: string;
}

export interface PartnerStat {
  partner_id: string;
  partner_name: string;
  lead_count: number;
  last_scanned_at: string | null;
}
