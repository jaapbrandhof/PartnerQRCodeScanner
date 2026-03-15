"use client";
import { useState } from "react";

export function PartnerCreateForm() {
  const [message, setMessage] = useState("Nog niet gekoppeld aan backend.");
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("Volgende stap: admin action / edge function voor partner + auth-account creatie.");
  }
  return (
    <form onSubmit={handleSubmit} className="grid">
      <div><label className="label">Partnernaam</label><input className="input" /></div>
      <div><label className="label">E-mail</label><input className="input" /></div>
      <div><label className="label">Wachtwoord</label><input className="input" type="password" /></div>
      <button className="button" type="submit">Partner aanmaken</button>
      <div className="label">{message}</div>
    </form>
  );
}
