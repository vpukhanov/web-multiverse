"use client";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useState,
  MouseEvent,
  FormEvent,
  ChangeEvent,
  useCallback,
  memo,
  useEffect,
} from "react";

import { MAX_LIMIT } from "@/lib/constants";

import Spinner from "../spinner";
import Battery from "./battery";
import styles from "./browser.module.css";
import { defaultUniverse, manualContent } from "./hardcoded";
import Settings from "./settings";

export default function Browser() {
  const [url, setUrl] = useState("home.com");
  const [content, setContent] = useState(manualContent);
  const [history, setHistory] = useState([
    { url: "home.com", content: manualContent },
  ]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [universe, setUniverse] = useState(defaultUniverse);
  const [rateLimit, setRateLimit] = useState({
    remaining: MAX_LIMIT,
    reset: 0,
  });

  const handleUrlChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);

  const navigateTo = useCallback(
    async (newUrl: string) => {
      setIsLoading(true);
      let newContent: string;

      setUrl(newUrl);

      if (newUrl === "home.com") {
        newContent = manualContent;
      } else {
        const { html, limit } = await imagineWebsite(newUrl, universe);
        newContent = html;
        setRateLimit(limit);
      }

      setContent(newContent);

      // Update history
      const newHistory = history.slice(0, currentHistoryIndex + 1);
      newHistory.push({ url: newUrl, content: newContent });
      setHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);

      setIsLoading(false);
    },
    [currentHistoryIndex, history, universe],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      navigateTo(url);
    },
    [navigateTo, url],
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        e.preventDefault();
        const href = target.getAttribute("href");
        if (href) {
          navigateTo(href);
        }
      }
    },
    [navigateTo],
  );

  const handleFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const action = form.getAttribute("action") || "";

      // @ts-expect-error URLSearchParam doesn't like FormData type
      const searchParams = new URLSearchParams(formData).toString();
      const fullUrl = `${action}${searchParams ? "?" + searchParams : ""}`;
      navigateTo(fullUrl);
    },
    [navigateTo],
  );

  const goBack = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      const { url: prevUrl, content: prevContent } = history[newIndex];
      setUrl(prevUrl);
      setContent(prevContent);
    }
  }, [currentHistoryIndex, history]);

  const goForward = useCallback(() => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      const { url: nextUrl, content: nextContent } = history[newIndex];
      setUrl(nextUrl);
      setContent(nextContent);
    }
  }, [currentHistoryIndex, history]);

  useEffect(() => {
    const fetchRateLimit = async () => {
      const res = await fetch("/api/limit");
      const { remaining, reset } = await res.json();
      setRateLimit({ remaining, reset });
    };
    fetchRateLimit();
  }, []);

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Browser Chrome */}
      <div className="flex items-center bg-gray-200 p-2">
        <button
          onClick={goBack}
          disabled={currentHistoryIndex === 0 || isLoading}
          className="mr-2 rounded p-1 hover:bg-gray-300 disabled:opacity-50"
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goForward}
          disabled={currentHistoryIndex === history.length - 1 || isLoading}
          className="mr-2 rounded p-1 hover:bg-gray-300 disabled:opacity-50"
          aria-label="Go forward"
        >
          <ChevronRight size={20} />
        </button>
        <form onSubmit={handleSubmit} className="flex flex-grow items-stretch">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="flex-grow rounded-l-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter a URL or search query"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="rounded-r-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-blue-300"
            disabled={isLoading}
          >
            <Search size={20} />
          </button>
        </form>
        <div className="ml-2">
          <Battery {...rateLimit} />
        </div>
        <div className="ml-2">
          <Settings
            universe={universe}
            onUniverseChange={setUniverse}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Browser Content */}
      <div className="h-[600px] overflow-y-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <BrowserContent
            content={content}
            onClick={handleClick}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
}

// Memoize the content to prevent unnecessary re-renders when editing the URL
const BrowserContent = memo(function BrowserContent({
  content,
  onClick,
  onSubmit,
}: {
  content: string;
  onClick: (e: MouseEvent) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div
      onClick={onClick}
      onSubmit={onSubmit}
      className={`flex min-h-full flex-col justify-center ${styles.content}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
});

async function imagineWebsite(url: string, universe: string) {
  const res = await fetch("/api/navigate", {
    method: "POST",
    body: JSON.stringify({ url, universe }),
  });
  return res.json();
}
