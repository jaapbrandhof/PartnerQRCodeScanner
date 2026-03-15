import { requireSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { supabase, user } = await requireSession();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role === "admin") redirect("/admin");
  redirect("/partner");
}
