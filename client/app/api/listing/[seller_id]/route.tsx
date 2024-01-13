import { connectToDatabase, convertToPSQLArray } from "../../db";

export const revalidate = 0

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
    return Response.json({ error: "No Products Listed" })
  }
  const sellerProductsString = convertToPSQLArray(
    sellerProducts,
    true,
    "(",
    ")",
    `'`
  );
  const productsRes = await client.query(
    `SELECT * FROM products WHERE product_id IN ${sellerProductsString} ORDER BY name ASC`
  );
  return Response.json({ seller: pgRes.rows, products: productsRes.rows });
}