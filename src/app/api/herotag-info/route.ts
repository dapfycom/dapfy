import { fetchECompass } from "@/services/rest/e-compass";
import { NextResponse } from "next/server";
import { z } from "zod";
const dataSchema = z.object({
  herotag: z.coerce.string(),
});
export const POST = async (req: Request) => {
  let payload;
  try {
    payload = dataSchema.parse(await req.json());
  } catch (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  const results = await fetchECompass<{
    data?: string;
    dnsAddress?: string;
    error: boolean | string;
  }>(`/maiars/getDnsAddress/${payload.herotag}`);
  console.log({
    results,
  });

  return NextResponse.json(results);
};
