"use client";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type MouseEvent } from "react";

import { manualContent } from "./manual";

interface HistoryEntry {
  url: string;
  content: string;
}

export default function Browser() {
  const [url, setUrl] = useState("home.com");
  const [content, setContent] = useState(manualContent);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { url: "home.com", content: manualContent },
  ]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(url);
  };

  const navigateTo = (newUrl: string) => {
    let newContent: string;
    if (newUrl === "home.com") {
      newContent = manualContent;
    } else {
      newContent = `<h1>You are viewing: ${newUrl}</h1>
                    <p>Content for this URL would be generated here.</p>`;
    }
    setUrl(newUrl);
    setContent(newContent);

    // Update history
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push({ url: newUrl, content: newContent });
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
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

  const goBack = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      const { url: prevUrl, content: prevContent } = history[newIndex];
      setUrl(prevUrl);
      setContent(prevContent);
    }
  };

  const goForward = () => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      const { url: nextUrl, content: nextContent } = history[newIndex];
      setUrl(nextUrl);
      setContent(nextContent);
    }
  };

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Browser Chrome */}
      <div className="flex items-center bg-gray-200 p-2">
        <button
          onClick={goBack}
          disabled={currentHistoryIndex === 0}
          className="mr-2 rounded p-1 hover:bg-gray-300 disabled:opacity-50"
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goForward}
          disabled={currentHistoryIndex === history.length - 1}
          className="mr-2 rounded p-1 hover:bg-gray-300 disabled:opacity-50"
          aria-label="Go forward"
        >
          <ChevronRight size={20} />
        </button>
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
