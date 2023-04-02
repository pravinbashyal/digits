import { useState } from "react";

export function CopyToClipboard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false), 2000;
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const buttonText = copied ? "Copied!" : "Copy";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <input type="text" readOnly value={text} style={{ flexGrow: 1 }} />
      <button onClick={copyToClipboard}>{buttonText}</button>
    </div>
  );
}
