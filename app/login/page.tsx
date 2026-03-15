import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="grid grid-2">
      <section className="card">
        <div className="pill">PBIG 2027 partner tool</div>
        <h1 style={{ marginTop: 12 }}>Scan badges, bewaar leads veilig en exporteer direct.</h1>
        <p className="lead" style={{ marginTop: 12 }}>
          Productie-starter voor de partner scanner met centrale opslag in Supabase.
        </p>
      </section>
      <section className="card">
        <h2>Inloggen</h2>
        <LoginForm />
      </section>
    </div>
  );
}
