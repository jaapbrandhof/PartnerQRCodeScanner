import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const adminClient = createSupabaseAdminClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const partnerName = String(body.partnerName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!partnerName || !email || !password) {
    return NextResponse.json({ error: "Vul partnernaam, e-mail en wachtwoord in." }, { status: 400 });
  }

  const { data: partner, error: partnerError } = await adminClient
    .from("partners")
    .insert({ name: partnerName, login_email: email })
    .select("id")
    .single();

  if (partnerError || !partner) {
    return NextResponse.json({ error: partnerError?.message ?? "Partner kon niet worden aangemaakt." }, { status: 400 });
  }

  const { error: authError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role: "partner",
      partner_id: partner.id,
      display_name: partnerName,
    },
  });

  if (authError) {
    await adminClient.from("partners").delete().eq("id", partner.id);
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
