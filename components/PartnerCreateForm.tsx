"use client";

import { useState } from "react";

export function PartnerCreateForm() {
  const [partnerName, setPartnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    const response = await fetch("/api/admin/create-partner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partnerName, email, password }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.error ?? "Er ging iets mis.");
      return;
    }

    setMessage("Partneraccount aangemaakt.");
    setPartnerName("");
    setEmail("");
    setPassword("");
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="grid">
      <div>
        <label className="label">Partnernaam</label>
        <input className="input" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} />
      </div>
      <div>
        <label className="label">E-mail</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="label">Wachtwoord</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="button" type="submit">Partner aanmaken</button>
      {message ? <div className={message.includes("aangemaakt") ? "success" : "error"}>{message}</div> : null}
    </form>
  );
}
