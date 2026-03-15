import "./globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "PBIG Partner Lead Scanner", description: "Partner scanner voor PBIG events" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <div className="page-shell">
          <div className="shell">
            <header className="header">
              <div className="header-row">
                <div className="brand">
                  <div className="logo-box">PBIG</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>PBIG Partner Lead Scanner</div>
                    <div className="label">Power BI Gebruikersgroep · productie starter</div>
                  </div>
                </div>
                <div className="row">
                  <span className="pill">Partnervloer</span>
                  <span className="pill">Badge QR</span>
                  <span className="pill">Mobiel</span>
                </div>
              </div>
              <div className="stripe-row">
                <div className="stripe s1" /><div className="stripe s2" /><div className="stripe s3" />
                <div className="stripe s4" /><div className="stripe s5" /><div className="stripe s6" />
              </div>
            </header>
            <main className="content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
