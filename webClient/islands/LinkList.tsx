import { Button } from "../components/Button.tsx";
import { signal } from "@preact/signals";
import { useState } from "preact/hooks";
import { TextInput } from "../components/TextInput.tsx";

interface LinkListProps {}

const urls = signal<string[]>([]);
const test = signal<number>(0);

(function () {
  for (let i = 0; i < localStorage.length; i++) {
    const url = localStorage.getItem(i.toString());
    if (url) {
      urls.value.push(url);
    }
  }
})();

export default function LinkList(props: LinkListProps) {
  const [addingUrl, setAddingUrl] = useState("");
  function addUrl(url: string) {
    localStorage.setItem(urls.value.length.toString(), url);
    urls.value.push(url);
  }

  function removeUrl(index: number) {
    urls.value = urls.value.filter((_, _index) => index !== _index);
    localStorage.removeItem(index.toString());
  }

  return (
    <ul>
      {urls.value.map((item, index) => (
        <li key={item}>
          <TextInput value={item} readOnly />
          <Button
            onClick={() => {
              removeUrl(index);
            }}
          >
            Delete
          </Button>
        </li>
      ))}
      <li>
        <TextInput value={addingUrl} onChange={(e) => setAddingUrl(e.target.value)} />

        <Button
          onClick={() => {
            addUrl(addingUrl);
            setAddingUrl("");
          }}
        >
          Add
        </Button>
      </li>
    </ul>
  );
}
