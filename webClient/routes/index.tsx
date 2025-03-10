import LinkList from "../islands/LinkList.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">All Link QR Code</h1>
        <LinkList />
      </div>
    </div>
  );
}
