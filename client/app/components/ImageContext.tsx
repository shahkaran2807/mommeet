import { IKContext } from "imagekitio-react";

const urlEndpoint = "https://ik.imagekit.io/m3c9xvobb";
const publicKey = "public_QL/BnOFxsLrH4K4HBhyDyw8hWWM=";
const authenticator = async () => {
  try {
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/imageauth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function ImageContext({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {children}
      </IKContext>
    )
}
