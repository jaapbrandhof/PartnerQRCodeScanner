import { requireRole } from "@/lib/auth";
import { LeadEditor } from "@/components/LeadEditor";
import { ScannerPanel } from "@/components/ScannerPanel";
import { SignOutButton } from "@/components/SignOutButton";
import type { Lead } from "@/lib/types";

export default async function PartnerPage() {
  const { supabase, profile } = await requireRole("partner");
  const { data: leads } = await supabase.from("leads").select("*").order("scanned_at", { ascending: false });
  const leadRows = (leads ?? []) as Lead[];

  return (
    <div className="grid">
      <section className="card">
        <div className="row">
          <div>
            <div className="pill">Partneromgeving</div>
            <h1 style={{ marginTop: 12 }}>{profile.display_name ?? "Partner account"}</h1>
            <p className="lead">Eén account per partner, meerdere gelijktijdige sessies toegestaan.</p>
          </div>
          <div className="row">
            <a className="button secondary" href="/api/export/csv">CSV export</a>
            <SignOutButton />
          </div>
        </div>
      </section>

      <section className="stats-3">
        <div className="card"><div className="label">Totaal leads</div><div className="stat-value">{leadRows.length}</div></div>
        <div className="card"><div className="label">Laatste scan</div><div className="stat-value" style={{ fontSize: 18 }}>{leadRows[0]?.scanned_at ? new Date(leadRows[0].scanned_at).toLocaleString("nl-NL") : "Nog geen scans"}</div></div>
        <div className="card"><div className="label">Privacy</div><div className="stat-value" style={{ fontSize: 18 }}>Alleen eigen partnerdata</div></div>
      </section>

      <ScannerPanel partnerId={profile.partner_id} />

      <section className="grid">
        {leadRows.length === 0 ? <div className="card">Nog geen leads opgeslagen.</div> : leadRows.map((lead) => <LeadEditor key={lead.id} lead={lead} />)}
      </section>
    </div>
  );
}
