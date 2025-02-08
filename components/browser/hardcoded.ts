export const manualContent = `
<div style="font-family: 'Comic Sans MS', cursive; background-color: #000080; color: #ffff00; text-align: center; padding: 20px;">
  <h1 style="font-size: 36px; color: #00ffff;">Welcome to the Web Multiverse Browser!</h1>
  <marquee behavior="alternate" scrollamount="10" style="font-size: 24px; color: #ff00ff;">
    <blink>🌈 Your Portal to Infinite Internets! 🚀</blink>
  </marquee>
  
  <p style="font-size: 18px; color: #ffffff;">Greetings, Multiversal Surfer! You've stumbled upon the most radical invention since the creation of cyberspace itself!</p>
  
  <table border="2" cellpadding="5" cellspacing="0" align="center" style="margin-top: 20px; background-color: #0000ff; color: #ffffff;">
    <tr>
      <th colspan="2" style="font-size: 24px; color: #ffff00;">How to Operate This Cosmic Browser</th>
    </tr>
    <tr>
      <td style="text-align: left;">1. Enter a URL or search query</td>
      <td style="text-align: left;">Type your desired destination in the Multiversal Address Bar</td>
    </tr>
    <tr>
      <td style="text-align: left;">2. Initiate your journey</td>
      <td style="text-align: left;">Click the 'Search' button or press 'Enter' to traverse realities</td>
    </tr>
    <tr>
      <td style="text-align: left;">3. Explore the content</td>
      <td style="text-align: left;">Immerse yourself in the alternate internet reality</td>
    </tr>
    <tr>
      <td style="text-align: left;">4. Return to this guide</td>
      <td style="text-align: left;">Type 'home.com' in the address bar to come back here</td>
    </tr>
  </table>

  <div style="background-color: #ff0000; border: 3px dashed #ffffff; margin: 20px auto; padding: 10px; max-width: 80%;">
    <h2 style="color: #ffffff;">⚠️ MULTIVERSAL TRAVELER BEWARE ⚠️</h2>
    <p style="color: #ffffff;">The Web Multiverse Browser accesses internets from parallel universes and alternate timelines. What you see may not conform to your reality's physics, history, or sanity. Surf responsibly!</p>
  </div>

  <h3 style="color: #00ff00;">Examples of Multiversal Destinations:</h3>
  <ul style="list-style-type: none; padding: 0;">
    <li><a href="ancient.rome" style="color: #ffff00;">ancient.rome</a> - Access the Roman Empire's intranet!</li>
    <li><a href="jedi.holonet" style="color: #ffff00;">jedi.holonet</a> - Browse the Jedi Archives!</li>
    <li><a href="medieval.scroll" style="color: #ffff00;">medieval.scroll</a> - Experience illuminated manuscripts online!</li>
    <li><a href="cyber.2077" style="color: #ffff00;">cyber.2077</a> - Surf the net of a dystopian future!</li>
  </ul>

  <p style="margin-top: 20px;">
    <span style="color: #ff0000;">Warning: Some parts of the multiverse are still under construction!</span>
  </p>
  
  <p style="font-size: 12px; margin-top: 40px; color: #00ff00;">
    Best experienced with Multiversal Navigator 5.0 or Interdimensional Explorer 6.0 at 1024x768 resolution across all realities.
  </p>
</div>
`.trim();

export const defaultUniverse = `
Imagine an alternate 1996 where every website is someone's passionate hobby:
- Restaurant sites list daily specials in Comic Sans with chef's diary
- Conspiracy sites use red Courier New with "TOP SECRET" watermarks  
- University sites have animated construction signs under every page
- All links feel hand-curated - no generic "Click here"
- Colorful backgrounds that make sense for the content and the universe
`.trim();

export function getErrorPage(errorMessage: string, details?: string) {
  return `
<div style="font-family: monospace; background-color: #ff0000; color: #ffffff; text-align: center; padding: 40px; min-height: 100%;">
  <div style="background-color: #800000; border: 5px double #ffffff; margin: 20px auto; padding: 20px; max-width: 600px;">
    <h1 style="font-size: 36px; margin-bottom: 20px;">🚫 MULTIVERSAL ERROR 🚫</h1>
    
    <div style="font-size: 24px; margin: 20px 0; padding: 10px; background-color: #600000;">
      ${errorMessage}
    </div>
    
    ${
      details
        ? `
    <div style="font-size: 16px; margin-top: 20px; text-align: left; background-color: #400000; padding: 15px; border: 2px solid #ffffff;">
      <pre style="margin: 0; white-space: pre-wrap;">${details}</pre>
    </div>
    `
        : ""
    }
    
    <div style="margin-top: 30px;">
      <p style="font-size: 18px;">Try <a href="home.com" style="color: #ffff00;">home.com</a> — the only stable multiversal destination!</p>
    </div>
  </div>
</div>
`.trim();
}
