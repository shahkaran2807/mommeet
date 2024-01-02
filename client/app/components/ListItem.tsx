"use client";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import ImageContext from "./ImageContext";
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";

type UploadImageResponse = {
  fileId: string;
  filePath: string;
  fileType: string;
  height: number;
  width: number;
  url: string;
};

const urlEndpoint = "https://ik.imagekit.io/m3c9xvobb";

export default function ListItem() {
  const onError = (err: any) => {
    console.log("Error", err);
  };

  const onSuccess = (res: UploadImageResponse) => {
    console.log("Success", res);
    setUploadedImages([...uploadedImages, res]);
  }

  const itemListFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const data = {
      name: itemName.current.value,
      price: itemPrice.current.value,
      category: itemCategory.current.value,
      seller_user_id: user.id,
      description: itemDescription.current.value,
      images: uploadedImages.map(imageUploadResponse => imageUploadResponse.url)
    };
    fetch(`http://localhost:5000/api/listing/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resJson) => {
        // if (resJson.done) {
        //   setRegisterSuccess({ status: "done" });
        //   redirect("/listing/new");
        // } else {
        //   setRegisterSuccess({ status: "failed" });
        // }
        console.log("Done")
      })
      .catch((err) => console.error(err));
  };
  const [uploadedImages, setUploadedImages] = useState<UploadImageResponse[]>(
    []
  );
  const { isLoaded, isSignedIn, user } = useUser();
  const itemName = useRef<HTMLInputElement>();
  const itemPrice = useRef();
  const itemCategory = useRef();
  const itemDescription = useRef();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  if (isLoaded) {
    return (
      <div>
        <div>Listing new item</div>
        <ImageContext>
          <div className="flex flex-col items-center w-full p-3 gap-2">
            <div className="flex flex-row gap-10 border-2 border-sky-500 overflow-x-auto p-5 h-[300px] w-full rounded">
              {uploadedImages.length > 0 ? (
                uploadedImages.map((img, idx) => {
                  return (
                    <IKImage
                      urlEndpoint={urlEndpoint}
                      path={img.filePath}
                      width={400}
                      height={400}
                    />
                  );
                })
              ) : (
                <div className="h-full w-full text-center text-slate-500">
                  Upload images here
                </div>
              )}
            </div>
            <IKUpload
              fileName={user.id}
              validateFile={(file) => file.size < 2000000}
              folder={"/renteasy"}
              onError={onError}
              onSuccess={onSuccess}
            />
          </div>
        </ImageContext>
        <div className="">
          <form onSubmit={itemListFormSubmit}>
            <div className="p-3">
              <label className="block" for="itemName1">
                Item Name
              </label>
              <input
                className="my-2 h-10 w-96 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500"
                id="itemName1"
                aria-describedby="itemName"
                placeholder="Enter item name"
                ref={itemName}
              />
              <small className="block" id="itemName">
                Enter a name of the item
              </small>
            </div>
            <div className="p-3">
              <label className="block" for="price1">
                Price
              </label>
              <input
                className="my-2 h-10 w-96 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500"
                id="price1"
                aria-describedby="price"
                placeholder="Enter price"
                type="number"
                ref={itemPrice}
              />
              <small className="block" id="itemName">
                Enter the item price per day
              </small>
            </div>
            <div className="p-3">
              <label className="block" for="category1">
                Category
              </label>
              <select
                className="my-2 h-10 w-96 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500"
                id="category1"
                name="category1"
                aria-describedby="categoryHelp"
                ref={itemCategory}
              >
                <option>Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="kitchen-supplies">Kitchen Supplies</option>
                <option value="entertainment">Entertainment</option>
                <option value="school-supplies">School Supplies</option>
              </select>
              <small className="block" id="categoryHelp">
                Enter the category of the item
              </small>
            </div>
            <div className="p-3">
              <label className="block" for="itemDescription1">
                Item Description
              </label>
              <textarea
                className="my-2 h-20 w-96 p-2 border-2 border-slate-300 focus:outline-none focus:border-sky-500"
                id="itemDescription1"
                name="itemDescription1"
                aria-describedby="itemDescriptionHelp"
                ref={itemDescription}
              >
              </textarea>
              <small className="block" id="itemDescriptionHelp">
                Enter the description of the item
              </small>
            </div>
            <button className="bg-sky-500 text-gray-50 font-bold p-2 rounded my-10">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
