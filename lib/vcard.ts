export interface ParsedVCard {
  full_name: string;
  email: string | null;
  company: string | null;
  phone: string | null;
}

export function parseVCard(value: string): ParsedVCard | null {
  if (!value.toUpperCase().includes("BEGIN:VCARD")) return null;

  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const pick = (prefixes: string[]) => {
    const line = lines.find((entry) => prefixes.some((prefix) => entry.toUpperCase().startsWith(prefix.toUpperCase())));
    if (!line) return "";
    const index = line.indexOf(":");
    return index >= 0 ? line.slice(index + 1).trim() : "";
  };

  const fullName = (pick(["FN:", "N:"]) || "Onbekende bezoeker").replace(/;/g, " ").replace(/\s+/g, " ").trim();

  return {
    full_name: fullName,
    email: pick(["EMAIL:", "EMAIL;TYPE=INTERNET:", "EMAIL;TYPE=WORK:"]) || null,
    company: pick(["ORG:"]) || null,
    phone: pick(["TEL:", "TEL;TYPE=CELL:", "TEL;TYPE=WORK:"]) || null,
  };
}
