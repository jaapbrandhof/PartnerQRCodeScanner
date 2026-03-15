# PBIG deployable testversie v2

Deze versie bevat:
- partner login
- admin login
- QR-camera scan via browser
- leadopslag in localStorage
- export naar CSV, JSON en Excel-achtige .xls
- adminscherm om nieuwe partneraccounts toe te voegen
- admin ziet alleen aantallen scans per partner

## Demo-accounts
- Partner: partner@plainwater.nl / demo123
- Admin: admin@pbig.nl / admin123

## Deploy op Vercel
1. Pak deze zip uit
2. Zet de inhoud in een GitHub repository
3. Importeer de repository in Vercel
4. Deploy
5. Open de HTTPS-url op mobiel

## Belangrijke beperking
Deze demo gebruikt localStorage per apparaat.
Nieuwe gebruikers en leads worden dus lokaal op dat ene apparaat opgeslagen.
Voor productie heb je een centrale backend nodig, bijvoorbeeld Supabase of een .NET API naast Umbraco.
