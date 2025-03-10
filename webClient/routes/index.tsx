import LinkList from "../islands/LinkList.tsx";
import QrCode from "../islands/QrCode.tsx";
export default function Home() {
  return (
    <>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">All Link QR Code</h1>
        </div>
      </div>

      <div class="px-4 py-8 mx-auto">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2">
            <LinkList />
          </div>
          <div class="col-span-1">
            <QrCode />
          </div>
        </div>
      </div>
    </>
  );
}
