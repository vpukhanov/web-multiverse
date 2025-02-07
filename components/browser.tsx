"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function Browser() {
  const [url, setUrl] = useState("https://webmultiverse.com");
  const [content, setContent] = useState(sampleContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContent(`<h1>You are viewing: ${url}</h1>
                  <p>Content for this URL would be generated here.</p>`);
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

const sampleContent = `
  <div style="font-family: 'Comic Sans MS', cursive; background-color: #ffccff; color: #000080; text-align: center; padding: 20px;">
    <h1 style="font-size: 36px; color: #ff00ff;">Welcome to the Retro Web!</h1>
    <marquee behavior="alternate" scrollamount="12" style="font-size: 24px; color: #00ff00;">
      <blink>🚀 Surf the Web Multiverse! 🌈</blink>
    </marquee>
    <img src="https://web.archive.org/web/20090830094323/http://geocities.com/hk/Heartland/Plains/4180/3D-EXPLODE.gif" alt="Explosion GIF">
    <p style="font-size: 18px;">Experience the internet from any era or universe!</p>
    <table border="1" cellpadding="5" cellspacing="0" align="center" style="margin-top: 20px;">
      <tr>
        <td><a href="#" style="color: #0000ff;">Ancient Rome Net</a></td>
        <td><a href="#" style="color: #0000ff;">Star Wars HoloNet</a></td>
      </tr>
      <tr>
        <td><a href="#" style="color: #0000ff;">Medieval Scroll Web</a></td>
        <td><a href="#" style="color: #0000ff;">Futuristic Cyber Realm</a></td>
      </tr>
    </table>
    <p style="margin-top: 20px;">
      <img src="https://web.archive.org/web/20090821110535/http://geocities.com/jasonkittykat/CONSTRUCTION.GIF" alt="Under Construction">
      <br>
      This site is always under construction!
    </p>
    <p style="font-size: 12px; margin-top: 40px;">
      Best viewed with Netscape Navigator or Internet Explorer 4.0 at 800x600 resolution.
    </p>
        <h1 style="font-size: 36px; color: #ff00ff;">Welcome to the Retro Web!</h1>
    <marquee behavior="alternate" scrollamount="12" style="font-size: 24px; color: #00ff00;">
      <blink>🚀 Surf the Web Multiverse! 🌈</blink>
    </marquee>
    <img src="https://web.archive.org/web/20090830094323/http://geocities.com/hk/Heartland/Plains/4180/3D-EXPLODE.gif" alt="Explosion GIF">
    <p style="font-size: 18px;">Experience the internet from any era or universe!</p>
    <table border="1" cellpadding="5" cellspacing="0" align="center" style="margin-top: 20px;">
      <tr>
        <td><a href="#" style="color: #0000ff;">Ancient Rome Net</a></td>
        <td><a href="#" style="color: #0000ff;">Star Wars HoloNet</a></td>
      </tr>
      <tr>
        <td><a href="#" style="color: #0000ff;">Medieval Scroll Web</a></td>
        <td><a href="#" style="color: #0000ff;">Futuristic Cyber Realm</a></td>
      </tr>
    </table>
    <p style="margin-top: 20px;">
      <img src="https://web.archive.org/web/20090821110535/http://geocities.com/jasonkittykat/CONSTRUCTION.GIF" alt="Under Construction">
      <br>
      This site is always under construction!
    </p>
    <p style="font-size: 12px; margin-top: 40px;">
      Best viewed with Netscape Navigator or Internet Explorer 4.0 at 800x600 resolution.
    </p>
  </div>
`;
