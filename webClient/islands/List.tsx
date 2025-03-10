import { TextInput } from "../components/TextInput.tsx";

interface LinkListProps {}

export default function LinkList(props: LinkListProps) {
  const itemsMap = new Map<string, string>();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      itemsMap.set(key, localStorage.getItem(key) || "");
    }
  }
  return (
    <div>
      <ol>
        {Array.from(itemsMap.entries()).map(([key, value]) => (
          <li key={key}>
            <TextInput value={value} readOnly />
          </li>
        ))}
        <TextInput />
      </ol>
    </div>
  );
}
