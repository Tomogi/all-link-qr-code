import { urls } from "../utils/store.ts";
import { useState, useEffect } from "preact/hooks";
import QRCode from 'npm:qrcode';

export default function QrCode() {
  const [qrCodeData, setQrCodeData] = useState("");

  const joinedUrls = urls.value.join("\n\n");

  useEffect(() => {
    QRCode.toDataURL(joinedUrls, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      setQrCodeData(url);
    });
  }, [joinedUrls]);
 
  if (urls.value.length === 0) {
    return (
      <div>
        <h2>QR Code</h2>
        <p>Add link on the left</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2>QR Code</h2>
      <p>Total characters count: {joinedUrls.length}</p>
      <img src={qrCodeData} alt="QR Code" />
    </div>
  );
}

