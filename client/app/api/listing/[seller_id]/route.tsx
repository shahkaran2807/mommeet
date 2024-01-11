import { connectToDatabase, convertToPSQLArray } from "../../db";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { seller_id: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const pgRes = await client.query(
    `SELECT * FROM sellers WHERE user_id = '${params.seller_id}'`
  );
  const sellerProducts = pgRes.rows[0].products;
  if (!sellerProducts) {
    return Response.json(
      { error: "No Products Listed" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
  const sellerProductsString = convertToPSQLArray(
    sellerProducts,
    true,
    "(",
    ")",
    `'`
  );
  const productsRes = await client.query(
    `SELECT * FROM products WHERE product_id IN ${sellerProductsString}`
  );
  return Response.json(
    { seller: pgRes.rows, products: productsRes.rows },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
