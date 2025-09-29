import React, { useState } from "react";
import { Copy, Check } from "lucide-react"; // icons

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copyText = async() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={copyText}
      className="flex items-center text-center gap-2 px-2 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
    >
      {copied ? <Right size={18} /> : <Copy size={18} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default CopyButton;

