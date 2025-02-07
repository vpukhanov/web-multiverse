"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { manualContent } from "./manual";

export default function Browser() {
  const [url, setUrl] = useState("home.com");
  const [content, setContent] = useState(manualContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (url === "home.com") {
      setContent(manualContent);
    } else {
      setContent(`<h1>You are viewing: ${url}</h1>
                  <p>Content for this URL would be generated here.</p>`);
    }
  };

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Browser Chrome */}
      <div className="flex items-center bg-gray-200 p-2">
        <form onSubmit={handleSubmit} className="flex flex-grow items-stretch">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow rounded-l-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter a URL or search query"
          />
          <button
            type="submit"
            className="rounded-r-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Browser Content */}
      <div className="h-[600px] overflow-y-auto">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
