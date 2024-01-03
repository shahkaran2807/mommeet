import { connectToDatabase } from "../db"
export async function GET(req: Request) {
    const { client, imagekit } = connectToDatabase();
    var result = imagekit.getAuthenticationParameters();
    return Response.json(result);
}