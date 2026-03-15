import { requireRole } from "@/lib/auth";
import { PartnerCreateForm } from "@/components/PartnerCreateForm";
import { SignOutButton } from "@/components/SignOutButton";
import type { PartnerStat } from "@/lib/types";

export default async function AdminPage() {
  const { supabase } = await requireRole("admin");
  const { data } = await supabase.rpc("get_admin_partner_scan_counts");
  const stats = (data ?? []) as PartnerStat[];

  return (
    <div className="grid">
      <section className="card">
        <div className="row">
          <div>
            <div className="pill">Beheer</div>
            <h1 style={{ marginTop: 12 }}>PBIG partner-overzicht</h1>
            <p className="lead">Admin ziet alleen aantallen per partner en geen lead details.</p>
          </div>
          <SignOutButton />
        </div>
      </section>

      <section className="stats-3">
        <div className="card"><div className="label">Partners</div><div className="stat-value">{stats.length}</div></div>
        <div className="card"><div className="label">Totaal scans</div><div className="stat-value">{stats.reduce((sum, item) => sum + Number(item.lead_count), 0)}</div></div>
        <div className="card"><div className="label">Leadgegevens</div><div className="stat-value" style={{ fontSize: 18 }}>Verborgen</div></div>
      </section>

      <section className="grid grid-2">
        <div className="card">
          <h2>Partner toevoegen</h2>
          <PartnerCreateForm />
        </div>
        <div className="card">
          <h2>Scans per partner</h2>
          <div className="grid">
            {stats.map((item) => (
              <div className="list-item" key={item.partner_id}>
                <strong>{item.partner_name}</strong>
                <div className="label">{item.lead_count} scans</div>
                <div className="label">Laatste scan: {item.last_scanned_at ? new Date(item.last_scanned_at).toLocaleString("nl-NL") : "n.v.t."}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
