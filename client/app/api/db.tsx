const { Client } = require("pg");
const ImageKit = require("imagekit");

type Global = {
    db: typeof Client,
    imagekit: typeof ImageKit
}
if (!((global as unknown) as Global).db) {
  ((global as unknown) as Global).db = { client: null, imagekit: null };
}

export async function connectToDatabase() {
  if (!((global as unknown) as Global).db.client) {
    console.log("No client available, creating new client.");
    ((global as unknown) as Global).db.client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASS,
      port: process.env.PG_PORT,
    });
    await ((global as unknown) as Global).db.client.connect(async function (err: any) {
      if (err) throw err;
      console.log("Connected!");
    });
  }
  if (!((global as unknown) as Global).db.imagekit) {
    const imagekit = new ImageKit({
      urlEndpoint: "https://ik.imagekit.io/m3c9xvobb",
      publicKey: "public_QL/BnOFxsLrH4K4HBhyDyw8hWWM=",
      privateKey: "private_FW95yfuHkthwCmo8vIcFvujgLpE=",
    });

  }
  return ((global as unknown) as Global).db;
}
