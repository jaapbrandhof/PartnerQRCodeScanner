# PBIG Partner Lead Scanner - production frontend v2

Deze versie gaat een stap verder dan de eerste starter.

## Nieuw in v2
- middleware route protection
- partner scanner component
- handmatige vCard parser + insert flow
- admin create partner API route
- admin create partner formulier gekoppeld
- CSV export endpoint
- PBIG-stijl basis

## Vereiste database
Gebruik het eerder gemaakte SQL-schema voor:
- partners
- profiles
- leads
- get_admin_partner_scan_counts()

## Vereiste omgeving
Kopieer `.env.example` naar `.env.local` en vul in:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

## Let op
- De QR-scanner gebruikt nu primair BarcodeDetector.
- Voor maximale device-ondersteuning wil je in een volgende stap een QR library toevoegen als fallback.
- Admin create partner gebruikt de service role server-side en maakt:
  1. partner record
  2. auth user
  3. profielkoppeling via metadata/trigger

## Snel starten
```bash
npm install
npm run dev
```
