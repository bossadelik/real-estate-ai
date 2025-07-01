import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Solo POST ammesso", { status: 405 });
  }

  const form = await req.formData();
  const file = form.get("image") as File;
  if (!file) {
    return new Response("Nessuna immagine", { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const chat = await openai.chat.completions.create({
    model: "gpt-4o",
    modalities: ["text", "vision"],
    messages: [{
      role: "user",
      content: "Migliora questa foto: rendila più luminosa e nitida, restando naturale.",
      name: file.name,
      type: file.type,
      image: { buffer: new Uint8Array(buffer) }
    }]
  });

  const b64 = chat.choices[0]?.message?.image?.b64_json;
  if (!b64) {
    return new Response("Enhancement fallito", { status: 500 });
  }

  const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  return new Response(bytes, { headers: { "Content-Type": file.type } });
});
