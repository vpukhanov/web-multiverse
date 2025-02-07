"use client";

import { Search } from "lucide-react";
import { useState, MouseEvent } from "react";

import { manualContent } from "./manual";

export default function Browser() {
  const [url, setUrl] = useState("home.com");
  const [content, setContent] = useState(manualContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(url);
  };

  const navigateTo = (newUrl: string) => {
    if (newUrl === "home.com") {
      setContent(manualContent);
    } else {
      setContent(`<h1>You are viewing: ${newUrl}</h1>
                  <p>Content for this URL would be generated here.</p>`);
    }
    setUrl(newUrl);
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      e.preventDefault();
      const href = target.getAttribute("href");
      if (href) {
        navigateTo(href);
      }
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
        <div
          onClick={handleClick}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
