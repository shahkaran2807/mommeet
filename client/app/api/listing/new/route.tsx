import { connectToDatabase, convertToPSQLArray } from "../../db";
export async function POST(request: Request) {
  const { client, imagekit } = await connectToDatabase();
  const body = await request.json();
  let {
    name,
    price,
    category,
    seller_user_id,
    description,
    images,
    listing_price,
    unavailable_dates,
  } = body;
  const imagesString = convertToPSQLArray(images, true, "{", "}", '"');
  const datesString = convertToPSQLArray(
    unavailable_dates,
    false,
    "{",
    "}",
    '"'
  );

  try {
    const genRandomUuid = await client.query("SELECT * FROM gen_random_uuid()");
    const generatedUuid = genRandomUuid.rows[0].gen_random_uuid;
    const pgResInsert = await client.query(
      `INSERT INTO products(name, price, category, description, seller_user_id, product_id, images, listing_price, unavailable_dates) VALUES ('${name}', ${price}, '${category}', '${description}', '${seller_user_id}', '${generatedUuid}', '${imagesString}', ${listing_price}, '${datesString}')`
    );
    const pgRegUpdate = await client.query(
      `UPDATE sellers SET products = array_append(products, '${generatedUuid}') WHERE user_id = '${seller_user_id}';`
    );
    return Response.json({ done: true });
  } catch (err) {
    console.log(err);
    return Response.json({ done: false });
  }
}
