"use client";

import { useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { parseVCard } from "@/lib/vcard";

declare global {
  interface Window {
    BarcodeDetector?: {
      new (options: { formats: string[] }): {
        detect(source: HTMLVideoElement): Promise<Array<{ rawValue?: string }>>;
      };
    };
  }
}

export function ScannerPanel({ partnerId }: { partnerId: string }) {
  const supabase = createSupabaseBrowserClient();
  const [manualVCard, setManualVCard] = useState("BEGIN:VCARD\nFN:Jaap van den Brandhof\nEMAIL:jaap@kimura.nl\nORG:Kimura\nEND:VCARD");
  const [message, setMessage] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);

  async function insertLeadFromVCard(vcard: string, source: string) {
    const parsed = parseVCard(vcard);
    if (!parsed) {
      setMessage("Geen geldige vCard gevonden.");
      return;
    }

    const { error } = await supabase.from("leads").insert({
      partner_id: partnerId,
      full_name: parsed.full_name,
      email: parsed.email,
      company: parsed.company,
      phone: parsed.phone,
      source,
      status: "Nieuw",
      scanned_at: new Date().toISOString(),
    });

    setMessage(error ? error.message : `Lead opgeslagen voor ${parsed.full_name}.`);
    if (!error) window.location.reload();
  }

  async function startCamera() {
    setMessage("");

    if (!window.isSecureContext) {
      setMessage("Camera werkt alleen via HTTPS of localhost.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOn(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      if ("BarcodeDetector" in window && videoRef.current) {
        const detector = new window.BarcodeDetector!({ formats: ["qr_code"] });
        intervalRef.current = window.setInterval(async () => {
          if (!videoRef.current) return;
          try {
            const codes = await detector.detect(videoRef.current);
            const rawValue = codes?.[0]?.rawValue ?? "";
            if (rawValue) {
              await insertLeadFromVCard(rawValue, "camera_qr");
              stopCamera();
            }
          } catch {
            // ignore frame errors
          }
        }, 900);
      } else {
        setMessage("BarcodeDetector ontbreekt. Voeg later een QR library fallback toe.");
      }
    } catch (error) {
      setMessage("Camera kon niet worden gestart.");
    }
  }

  function stopCamera() {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  }

  return (
    <div className="card">
      <h2>Scanner</h2>
      <p className="lead">Scan direct een badge of plak handmatig een vCard.</p>

      <div className="grid grid-2" style={{ marginTop: 14 }}>
        <div className="grid">
          <video ref={videoRef} className="video" muted playsInline />
          <div className="row">
            {!cameraOn ? (
              <button className="button" type="button" onClick={startCamera}>Camera starten</button>
            ) : (
              <button className="button secondary" type="button" onClick={stopCamera}>Camera stoppen</button>
            )}
            <button className="button secondary" type="button" onClick={() => insertLeadFromVCard(manualVCard, "manual_vcard")}>
              Demo-vCard opslaan
            </button>
          </div>
        </div>

        <div className="grid">
          <div>
            <label className="label">Handmatige vCard</label>
            <textarea className="textarea" value={manualVCard} onChange={(e) => setManualVCard(e.target.value)} />
          </div>
        </div>
      </div>

      {message ? <div style={{ marginTop: 12 }} className={message.includes("opgeslagen") ? "success" : "error"}>{message}</div> : null}
    </div>
  );
}
