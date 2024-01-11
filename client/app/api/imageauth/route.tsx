import { connectToDatabase } from "../db";
export async function GET(req: Request) {
  const { client, imagekit } = await connectToDatabase();
  var result = imagekit.getAuthenticationParameters();
  return Response.json(result, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
