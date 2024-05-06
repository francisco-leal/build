import { searchBuilders } from "@/app/_api/search-builders";
import { type NextRequest } from "next/server";
import { z} from "zod";

const searchParamsSchema = z.object({
  query: z.string().min(3),
});

export async function GET(request: NextRequest) {
  const searchParams = searchParamsSchema.safeParse({
    query: request.nextUrl.searchParams.get("query"),
  });
  
  if (!searchParams.success) return Response.json({}, { status: 400 });
  return Response.json(await searchBuilders(searchParams.data.query));
}
