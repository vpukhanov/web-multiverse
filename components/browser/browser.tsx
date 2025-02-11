"use client";

import { track } from "@vercel/analytics/react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useState,
  MouseEvent,
  FormEvent,
  ChangeEvent,
  useCallback,
  memo,
  useEffect,
  useRef,
} from "react";

import Spinner from "../spinner";
import Battery from "./battery";
import styles from "./browser.module.css";
import { defaultUniverse, manualContent, getErrorPage } from "./hardcoded";
import Settings from "./settings";

type Props = {
  initialLimit: { remaining: number; reset: number };
};

export default function Browser({ initialLimit }: Props) {
  const [url, setUrl] = useState("home.com");
  const [content, setContent] = useState(manualContent);
  const [history, setHistory] = useState([
    { url: "home.com", content: manualContent },
  ]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [universe, setUniverse] = useState(defaultUniverse);
  const [rateLimit, setRateLimit] = useState(initialLimit);

  const handleUrlChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);

  const navigateTo = useCallback(
    async (newUrl: string) => {
      track("Navigation", {
        urlLength: newUrl.length,
        universeLength: universe.length,
      });

      setIsLoading(true);
      setUrl(newUrl);

      let newContent: string;
      if (newUrl === "home.com") {
        newContent = manualContent;
      } else {
        const { html, limit } = await imagineWebsite(newUrl, universe);
        newContent = html;
        if (limit) {
          setRateLimit(limit);
        }
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
      track("Back Navigation");

      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      const { url: prevUrl, content: prevContent } = history[newIndex];
      setUrl(prevUrl);
      setContent(prevContent);
    }
  }, [currentHistoryIndex, history]);

  const goForward = useCallback(() => {
    if (currentHistoryIndex < history.length - 1) {
      track("Forward Navigation");

      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      const { url: nextUrl, content: nextContent } = history[newIndex];
      setUrl(nextUrl);
      setContent(nextContent);
    }
  }, [currentHistoryIndex, history]);

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
            maxLength={1000}
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
  const contentRef = useRef<HTMLDivElement>(null);

  // Using effects, because native React's onClick and onSubmit handling
  // can break if the content is not 100% valid HTML. This ref approach seems
  // to be more robust.
  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      if (contentRef.current?.contains(e.target as Node)) {
        onClick(e as unknown as MouseEvent);
      }
    };

    const handleSubmit = (e: globalThis.SubmitEvent) => {
      if (contentRef.current?.contains(e.target as Node)) {
        onSubmit(e as unknown as FormEvent);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, [onClick, onSubmit]);

  return (
    <div
      ref={contentRef}
      className={`flex min-h-full flex-col justify-center ${styles.content}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
});

async function imagineWebsite(
  url: string,
  universe: string,
): Promise<{
  html: string;
  limit?: Props["initialLimit"];
}> {
  try {
    const res = await fetch("/api/navigate", {
      method: "POST",
      body: JSON.stringify({ url, universe }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        const { limit } = await res.json();
        return {
          html: getErrorPage(
            "Rate Limit Exceeded",
            "You've reached the maximum number of multiversal jumps!\nPlease wait before attempting another journey.",
          ),
          limit,
        };
      }

      return {
        html: getErrorPage(
          "Failed to Access Alternate Universe",
          "Unknown error occured",
        ),
      };
    }

    return res.json();
  } catch (error) {
    console.error("Error imagining website:", error);
    return {
      html: getErrorPage(
        "Multiversal Connection Lost",
        `A temporal anomaly has disrupted your connection to the multiverse.\nPlease try again later.`,
      ),
    };
  }
}
