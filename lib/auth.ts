import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function requireSession() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return { supabase, user: data.user };
}

export async function requireRole(role: "partner" | "admin") {
  const { supabase, user } = await requireSession();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, partner_id, display_name")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== role) {
    redirect(role === "admin" ? "/partner" : "/admin");
  }

  return { supabase, user, profile };
}
