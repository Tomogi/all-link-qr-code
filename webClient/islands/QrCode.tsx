import { urls } from "../utils/store.ts";
import QRCode from 'npm:qrcode';

export default function QrCode() {
  return (
    <div>
      {urls.value.map((url, index) => (
        <p key={index}>{url}</p>
      ))}
    </div>
  );
}

