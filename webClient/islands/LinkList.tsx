import { Button } from "../components/Button.tsx";
import { useState, useEffect } from "preact/hooks";
import { TextInput } from "../components/TextInput.tsx";
import { urls, addUrl, removeUrl, initializeUrls } from "../utils/store.ts";

export default function LinkList() {
  const [addingUrl, setAddingUrl] = useState("");
  
  // Initialize URLs from localStorage on component mount
  useEffect(() => {
    initializeUrls();
  }, []);

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