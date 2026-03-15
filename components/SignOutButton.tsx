"use client";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function SignOutButton() {
  async function handleClick() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }
  return <button className="button secondary" onClick={handleClick} type="button">Uitloggen</button>;
}
