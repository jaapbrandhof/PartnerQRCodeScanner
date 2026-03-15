import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return new NextResponse("Unauthorized", { status: 401 });

  const { data: leads, error } = await supabase
    .from("leads")
    .select("full_name,email,company,phone,status,notes,scanned_at,source")
    .order("scanned_at", { ascending: false });

  if (error) return new NextResponse(error.message, { status: 500 });

  const headers = ["full_name", "email", "company", "phone", "status", "notes", "scanned_at", "source"];
  const escapeValue = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [
    headers.join(","),
    ...(leads ?? []).map((row) => headers.map((key) => escapeValue((row as Record<string, unknown>)[key])).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="pbig-leads.csv"',
    },
  });
}
