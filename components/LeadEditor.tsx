"use client";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { Lead, LeadStatus } from "@/lib/types";

const STATUSES: LeadStatus[] = ["Nieuw", "Opvolgen", "Contact gehad", "Gekwalificeerd", "Niet relevant"];

export function LeadEditor({ lead }: { lead: Lead }) {
  const supabase = createSupabaseBrowserClient();
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [phone, setPhone] = useState(lead.phone ?? "");
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [message, setMessage] = useState("");

  async function save() {
    setMessage("");
    const { error } = await supabase.from("leads").update({ status, phone: phone || null, notes: notes || null }).eq("id", lead.id);
    setMessage(error ? error.message : "Opgeslagen");
  }

  return (
    <div className="list-item">
      <div className="row"><div><strong>{lead.full_name}</strong><div className="label">{lead.company ?? "Geen bedrijf"}</div></div><span className="pill">{status}</span></div>
      <div style={{ marginTop: 12 }} className="grid">
        <div><label className="label">Status</label><select className="select" value={status} onChange={(e) => setStatus(e.target.value as LeadStatus)}>{STATUSES.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
        <div><label className="label">Telefoon</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
        <div><label className="label">Notitie</label><textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
        <button className="button" type="button" onClick={save}>Opslaan</button>
        {message ? <div className="label">{message}</div> : null}
      </div>
    </div>
  );
}
