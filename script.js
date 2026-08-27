/* ==========================================================================
   PROPOTION — SCRIPT PRINCIPAL
   Jogo de razão e proporção: o jogador mistura ingredientes respeitando
   a receita exata de cada poção. Comentado para fins didáticos.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ------------------------------------------------------------------------
  // 0. ÍCONES VETORIAIS SVG
  // ------------------------------------------------------------------------
  function getIconHTML(name) {
    const icons = {
      // ── POÇÕES ──
      "cura": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#70E000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><line x1="8.5" x2="15.5" y1="2" y2="2"/><path d="M8.5 14h7"/></svg>`,
      "vitalidade": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#38B000" fill-opacity="0.25" stroke="#38B000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      "agilidade": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFD166" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
      "equilibrio": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#9AD1D4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7 2 13a3 3 0 0 0 6 0Z"/><path d="M19 7l-3 6a3 3 0 0 0 6 0Z"/></svg>`,
      "clareza": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8ECFE0" fill-opacity="0.25" stroke="#8ECFE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
      "mana": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/></svg>`,
      "protecao": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4895EF" fill-opacity="0.2" stroke="#4895EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      "invisibilidade": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#B5179E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`,
      "sonho": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C77DFF" fill-opacity="0.3" stroke="#C77DFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="m19 3 .8 1.6L21.5 5l-1.7.6L19 7.2l-.8-1.6L16.5 5l1.7-.6Z"/></svg>`,
      "harmonia": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#F0C987" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9"/><circle cx="12" cy="7.5" r="1" fill="#F0C987"/><circle cx="12" cy="16.5" r="1" fill="#F0C987"/></svg>`,
      "forca": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D90429" fill-opacity="0.3" stroke="#FF4D6D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
      "trovao": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFB703" fill-opacity="0.35" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      "regeneracao": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF70A6" fill-opacity="0.35" stroke="#FF85A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      "gelo": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8ED2E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m5 6 14 12"/><path d="m19 6-14 12"/><path d="m8 3 4 3 4-3"/><path d="m8 21 4-3 4 3"/></svg>`,
      "vento": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#BFD8D2" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 16h15a3 3 0 1 1-3 3"/></svg>`,
      "cosmica": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#C77DFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3" fill="#9D4EDD" fill-opacity="0.5"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.93 4.93 2.12 2.12"/><path d="m16.95 16.95 2.12 2.12"/><path d="m4.93 19.07 2.12-2.12"/><path d="m16.95 7.05 2.12-2.12"/></svg>`,
      "eternidade": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#E0AAFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a4 4 0 1 0 0 0Zm8 0a4 4 0 1 1 0 0Z"/><path d="M8 12c2 0 3-4 4-4s2 4 4 4-3 4-4 4-2-4-4-4Z" fill="#E0AAFF" fill-opacity="0.3"/></svg>`,
      "quintessencia": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD166" fill-opacity="0.3" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 2.5 6.9L21 12l-6.5 3.1L12 22l-2.5-6.9L3 12l6.5-3.1z"/></svg>`,
      "suprema": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD166" fill-opacity="0.3" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,

      // ── INGREDIENTES ──
      "erva": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4895EF" fill-opacity="0.4" stroke="#4895EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>`,
      "agua": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4CC9F0" fill-opacity="0.45" stroke="#00B4D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`,
      "cogumelo": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M12 2a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z" fill="#52B788" fill-opacity="0.5" stroke="#52B788" stroke-width="2"/><path d="M9 11v8a3 3 0 0 0 6 0v-8" fill="#D4A373" fill-opacity="0.3" stroke="#A68A64" stroke-width="2"/></svg>`,
      "sol": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFB703" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" fill="#FFD166" fill-opacity="0.55"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
      "orvalho": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90E0EF" fill-opacity="0.3" stroke="#00B4D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.2A4.5 4.5 0 0 1 17.5 21h-11A4.5 4.5 0 0 1 4 16.2a8 8 0 0 1 12.5-6.2A6 6 0 0 1 20 16.2z"/></svg>`,
      "cristal": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90E0EF" fill-opacity="0.35" stroke="#48BFE3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20"/></svg>`,
      "essencia": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7209B7" fill-opacity="0.4" stroke="#C77DFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
      "ferro": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ADB5BD" fill-opacity="0.25" stroke="#ADB5BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
      "pena": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF9F1C" fill-opacity="0.4" stroke="#FF9F1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 13v8h8l9.24-8.76z"/><line x1="16" x2="2" y1="8" y2="22"/></svg>`,
      "sombra": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3A0CA3" fill-opacity="0.5" stroke="#7209B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
      "raiz": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#D4A373" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v10"/><path d="M12 12 7 22" stroke="#A0522D"/><path d="m12 12 5 10" stroke="#A0522D"/><circle cx="12" cy="5" r="2" fill="#52B788" fill-opacity="0.6" stroke="#52B788" stroke-width="1.5"/></svg>`,
      "fogo": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4D6D" fill-opacity="0.45" stroke="#FF4D6D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
      "trovao_ing": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD166" fill-opacity="0.5" stroke="#FFB703" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      "lotus": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF85A1" fill-opacity="0.4" stroke="#FF70A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>`,
      "flor_lunar": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E0AAFF" fill-opacity="0.35" stroke="#C77DFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a6 6 0 0 0 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 0 6-6Z"/><path d="M12 14v8"/></svg>`,
      "raiz_sombria": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#6D597A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="m8 10-4 6" stroke="#4A3260"/><path d="m16 10 4 6" stroke="#4A3260"/><path d="m12 10-3 10" stroke="#2B2D42"/><path d="m12 10 3 10" stroke="#2B2D42"/><circle cx="12" cy="4" r="1.5" fill="#9D4EDD" fill-opacity="0.6"/></svg>`,
      "po_estelar": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFB703" fill-opacity="0.5" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/></svg>`,

      // ── UI / UTILITÁRIOS ──
      "trofeu": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
      "livro": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
      "pergaminho": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>`,
      "mago": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/></svg>`,
      "cadeado": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      "meta": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
      "mochila": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10Z"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"/></svg>`,
      "ajuda": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
      "estrela": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
      "streak": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF9F1C" fill-opacity="0.35" stroke="#FFB703" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
      "alerta": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
      "check": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
    };
    return icons[name] || icons["estrela"];
  }

  function injectStaticIcons(root = document) {
    const map = {
      ".svg-icon-sparkle": "estrela", ".svg-icon-book": "livro", ".svg-icon-scroll": "pergaminho",
      ".svg-icon-target": "meta", ".svg-icon-flask": "cura", ".svg-icon-wand": "mago",
      ".svg-icon-help": "ajuda", ".svg-icon-trophy": "trofeu", ".svg-icon-backpack": "mochila",
      ".svg-icon-streak": "streak"
    };
    Object.entries(map).forEach(([sel, key]) => {
      root.querySelectorAll(sel).forEach(el => { if (!el.dataset.filled) { el.innerHTML = getIconHTML(key); el.dataset.filled = "1"; } });
    });
  }
  injectStaticIcons();

  // ------------------------------------------------------------------------
  // 1. BANCO DE DADOS DE FASES (6 ranks · 27 fases)
  // ------------------------------------------------------------------------
  const RANKS = [
    { name: "Aprendiz de Alquimia", ingCount: 2, bottle: "potion.png" },
    { name: "Alquimista",            ingCount: 3, bottle: "potion2.png" },
    { name: "Mestre Alquimista",     ingCount: 4, bottle: "potion3.png" },
    { name: "Grão-Mestre Alquimista",ingCount: 5, bottle: "potion4.png" },
    { name: "Arquimago da Floresta", ingCount: 6, bottle: "potion5.png" },
    { name: "Grande Arcanista",      ingCount: 7, bottle: "potion6.png" }
  ];

  const I = { // atalho de ingredientes reutilizáveis
    erva:      { name: "Erva Azul",          iconKey: "erva",      color: "#4895EF" },
    agua:      { name: "Água Purificada",    iconKey: "agua",      color: "#4CC9F0" },
    cogumelo:  { name: "Cogumelo Verde",     iconKey: "cogumelo",  color: "#52B788" },
    sol:       { name: "Fruta do Sol",       iconKey: "sol",       color: "#FFB703" },
    orvalho:   { name: "Orvalho Celestial",  iconKey: "orvalho",   color: "#00B4D8" },
    cristal:   { name: "Cristal Mágico",     iconKey: "cristal",   color: "#90E0EF" },
    essencia:  { name: "Essência Arcana",    iconKey: "essencia",  color: "#7209B7" },
    ferro:     { name: "Pó de Ferro",        iconKey: "ferro",     color: "#ADB5BD" },
    pena:      { name: "Pena de Fênix",      iconKey: "pena",      color: "#FF9F1C" },
    sombra:    { name: "Essência de Sombra", iconKey: "sombra",    color: "#7209B7" },
    raiz:      { name: "Raiz Vermelha",      iconKey: "raiz",      color: "#D4A373" },
    fogo:      { name: "Essência de Fogo",   iconKey: "fogo",      color: "#FF4D6D" },
    trovaoIng: { name: "Gota de Trovão",     iconKey: "trovao_ing",color: "#FFD166" },
    lotus:     { name: "Flor de Lótus",      iconKey: "lotus",     color: "#FF85A1" },
    florLunar: { name: "Flor Lunar",         iconKey: "flor_lunar",color: "#E0AAFF" },
    raizSomb:  { name: "Raiz Sombria",       iconKey: "raiz_sombria", color: "#9D7FBF" },
    poEstelar: { name: "Pó Estelar",         iconKey: "po_estelar",color: "#FFD166" }
  };
  function ing(base, def) { return { name: def.name, iconKey: def.iconKey, color: def.color, base }; }

  const phaseDefs = [
    // ---- RANK 0 · Aprendiz de Alquimia (2 ingredientes) ----
    { name: "Poção de Cura",        iconKey: "cura",        color: "#70E000", target: 10, ings: [ing(2, I.erva), ing(3, I.agua)] },
    { name: "Poção de Vitalidade",  iconKey: "vitalidade",  color: "#38B000", target: 12, ings: [ing(1, I.cogumelo), ing(3, I.agua)] },
    { name: "Poção de Agilidade",   iconKey: "agilidade",   color: "#FFD166", target: 15, ings: [ing(3, I.sol), ing(2, I.orvalho)] },
    { name: "Poção de Equilíbrio",  iconKey: "equilibrio",  color: "#9AD1D4", target: 12, ings: [ing(1, I.cristal), ing(1, I.agua)] },
    { name: "Poção de Clareza",     iconKey: "clareza",     color: "#8ECFE0", target: 16, ings: [ing(3, I.orvalho), ing(1, I.essencia)] },

    // ---- RANK 1 · Alquimista (3 ingredientes) ----
    { name: "Poção de Mana",         iconKey: "mana",         color: "#0077B6", target: 20, ings: [ing(1, I.cristal), ing(2, I.agua), ing(1, I.essencia)] },
    { name: "Poção de Proteção",     iconKey: "protecao",     color: "#4895EF", target: 18, ings: [ing(2, I.ferro), ing(1, I.cristal), ing(3, I.agua)] },
    { name: "Poção de Invisibilidade", iconKey: "invisibilidade", color: "#B5179E", target: 24, ings: [ing(2, I.pena), ing(3, I.sombra), ing(1, I.orvalho)] },
    { name: "Poção do Sonho",        iconKey: "sonho",        color: "#C77DFF", target: 24, ings: [ing(2, I.florLunar), ing(3, I.orvalho), ing(1, I.essencia)] },
    { name: "Poção da Harmonia",     iconKey: "harmonia",     color: "#F0C987", target: 24, ings: [ing(1, I.erva), ing(1, I.lotus), ing(2, I.agua)] },

    // ---- RANK 2 · Mestre Alquimista (4 ingredientes) ----
    { name: "Poção de Força",        iconKey: "forca",        color: "#D90429", target: 24, ings: [ing(2, I.raiz), ing(1, I.erva), ing(3, I.agua), ing(2, I.fogo)] },
    { name: "Poção do Trovão",       iconKey: "trovao",       color: "#FFB703", target: 28, ings: [ing(1, I.trovaoIng), ing(2, I.sol), ing(1, I.cristal), ing(3, I.agua)] },
    { name: "Poção de Regeneração",  iconKey: "regeneracao",  color: "#FF70A6", target: 30, ings: [ing(2, I.lotus), ing(2, I.erva), ing(3, I.orvalho), ing(3, I.essencia)] },
    { name: "Poção do Gelo Eterno",  iconKey: "gelo",         color: "#8ED2E8", target: 24, ings: [ing(2, I.cristal), ing(3, I.orvalho), ing(2, I.agua), ing(1, I.essencia)] },
    { name: "Poção do Vendaval",     iconKey: "vento",        color: "#BFD8D2", target: 24, ings: [ing(3, I.pena), ing(2, I.orvalho), ing(1, I.sol), ing(2, I.agua)] },

    // ---- RANK 3 · Grão-Mestre Alquimista (5 ingredientes) ----
    { name: "Poção Cósmica",         iconKey: "cosmica",      color: "#9D4EDD", target: 27, ings: [ing(1, I.florLunar), ing(2, I.cristal), ing(1, I.erva), ing(3, I.agua), ing(2, I.fogo)] },
    { name: "Poção da Eternidade",   iconKey: "eternidade",   color: "#E0AAFF", target: 30, ings: [ing(2, I.poEstelar), ing(1, I.florLunar), ing(2, I.cristal), ing(3, I.agua), ing(2, I.essencia)] },
    { name: "Poção da Tempestade Arcana", iconKey: "trovao",  color: "#F4D35E", target: 32, ings: [ing(2, I.trovaoIng), ing(1, I.pena), ing(3, I.orvalho), ing(1, I.cristal), ing(1, I.fogo)] },
    { name: "Poção das Sombras Profundas", iconKey: "invisibilidade", color: "#6D597A", target: 27, ings: [ing(2, I.raizSomb), ing(3, I.sombra), ing(1, I.florLunar), ing(2, I.agua), ing(1, I.cristal)] },
    { name: "Poção da Luz Ancestral", iconKey: "estrela",     color: "#FFE066", target: 27, ings: [ing(1, I.poEstelar), ing(3, I.sol), ing(2, I.orvalho), ing(2, I.essencia), ing(1, I.agua)] },

    // ---- RANK 4 · Arquimago da Floresta (6 ingredientes) ----
    { name: "Poção Suprema",         iconKey: "suprema",      color: "#FFD166", target: 30, ings: [ing(1, I.raizSomb), ing(2, I.florLunar), ing(1, I.cristal), ing(3, I.agua), ing(2, I.fogo), ing(1, I.poEstelar)] },
    { name: "Poção da Quintessência", iconKey: "quintessencia", color: "#FFE29A", target: 30, ings: [ing(1, I.erva), ing(1, I.cristal), ing(2, I.essencia), ing(1, I.poEstelar), ing(2, I.orvalho), ing(3, I.agua)] },
    { name: "Poção Estelar",         iconKey: "po_estelar",   color: "#FFD166", target: 22, ings: [ing(3, I.poEstelar), ing(2, I.florLunar), ing(1, I.cristal), ing(2, I.essencia), ing(1, I.orvalho), ing(2, I.agua)] },
    { name: "Poção da Fênix Renascida", iconKey: "pena",      color: "#FF9F1C", target: 30, ings: [ing(3, I.pena), ing(2, I.fogo), ing(1, I.lotus), ing(2, I.agua), ing(1, I.cristal), ing(1, I.poEstelar)] },

    // ---- RANK 5 · Grande Arcanista (7 ingredientes) ----
    { name: "Poção da Harmonia Suprema", iconKey: "harmonia", color: "#F0C987", target: 27, ings: [ing(1, I.erva), ing(2, I.agua), ing(1, I.cristal), ing(1, I.essencia), ing(1, I.florLunar), ing(1, I.poEstelar), ing(2, I.orvalho)] },
    { name: "Poção do Equilíbrio Perfeito", iconKey: "equilibrio", color: "#9AD1D4", target: 30, ings: [ing(1, I.raiz), ing(1, I.erva), ing(3, I.agua), ing(1, I.cristal), ing(1, I.fogo), ing(1, I.florLunar), ing(2, I.poEstelar)] },
    { name: "Elixir do Equilíbrio Absoluto", iconKey: "suprema", color: "#FFD166", target: 36, ings: [ing(1, I.raizSomb), ing(1, I.florLunar), ing(2, I.cristal), ing(3, I.agua), ing(1, I.fogo), ing(2, I.poEstelar), ing(2, I.essencia)] },
  ];

  const phases = [];

// distribuição real por faixas:
// 5 + 5 + 5 + 4 + 5 + 3 = 27 fases
  const RANK_BOUNDARIES = [5, 10, 15, 19, 24, 27]; // índices finais (exclusivos) de cada rank
  function rankIndexFor(i) {
    for (let r = 0; r < RANK_BOUNDARIES.length; r++) if (i < RANK_BOUNDARIES[r]) return r;
    return RANK_BOUNDARIES.length - 1;
  }

  const phasesFinal = phaseDefs.map((def, idx) => {
    const rank = RANKS[rankIndexFor(idx)];
    return {
      phase: idx + 1,
      title: `Fase ${idx + 1}: ${def.name}`,
      rank: rank.name,
      bottle: rank.bottle,
      recipe: { name: def.name, iconKey: def.iconKey, color: def.color, targetQty: def.target, ingredients: def.ings }
    };
  });
  phases.length = 0;
  phases.push(...phasesFinal);

  // ------------------------------------------------------------------------
  // 2. CONQUISTAS
  // ------------------------------------------------------------------------
  const achievementDefs = [
    { id: "primeira_gota",      title: "Primeira Gota",        desc: "Prepare sua primeira poção.", icon: "cura",
      check: s => s.potionsBrewedCount >= 1 },
    { id: "frasco_cheio",       title: "Frasco Cheio",         desc: "Descubra 5 poções diferentes.", icon: "livro",
      check: s => s.discoveredPotionNames.length >= 5 },
    { id: "maos_firmes",        title: "Mãos Firmes",          desc: "Acerte 3 poções seguidas sem explodir.", icon: "streak",
      check: s => s.bestStreak >= 3 },
    { id: "pulso_de_aco",       title: "Pulso de Aço",         desc: "Acerte 6 poções seguidas sem explodir.", icon: "streak",
      check: s => s.bestStreak >= 6 },
    { id: "perfeicao",          title: "Perfeição Alquímica",  desc: "Complete uma fase de primeira, sem nenhuma explosão.", icon: "estrela",
      check: s => s.perfectPhaseCleared === true },
    { id: "rank_alquimista",    title: "Ascensão a Alquimista", desc: "Alcance o rank de Alquimista.", icon: "essencia",
      check: s => s.maxUnlockedPhaseIndex >= 5 },
    { id: "rank_mestre",        title: "Mestre Alquimista",    desc: "Alcance o rank de Mestre Alquimista.", icon: "forca",
      check: s => s.maxUnlockedPhaseIndex >= 10 },
    { id: "rank_grao_mestre",   title: "Grão-Mestre",          desc: "Alcance o rank de Grão-Mestre Alquimista.", icon: "cosmica",
      check: s => s.maxUnlockedPhaseIndex >= 15 },
    { id: "rank_arquimago",     title: "Arquimago",            desc: "Alcance o rank de Arquimago da Floresta.", icon: "suprema",
      check: s => s.maxUnlockedPhaseIndex >= 19 },
    { id: "grimorio_completo",  title: "Grimório Completo",    desc: "Descubra todas as poções do jogo.", icon: "trofeu",
      check: s => s.discoveredPotionNames.length >= phases.length },
  ];

  // ------------------------------------------------------------------------
  // 3. PERSISTÊNCIA (localStorage)
  // ------------------------------------------------------------------------
  const STORAGE_KEY = "propotion_save_v2";

  function defaultState() {
    return {
      xp: 0,
      totalPotionsCreated: 0,
      potionsBrewedCount: 0,
      maxUnlockedPhaseIndex: 0,
      currentPhaseIndex: 0,
      inventory: {},
      discoveredPotionNames: [],
      achievementsUnlocked: [],
      streak: 0,
      bestStreak: 0,
      perfectPhaseCleared: false
    };
  }

function isValidState(s) {
  if (!s || typeof s !== "object") return false;

  const numFields = [
    "xp",
    "totalPotionsCreated",
    "potionsBrewedCount",
    "maxUnlockedPhaseIndex",
    "currentPhaseIndex",
    "streak",
    "bestStreak"
  ];

  // Verifica se todos os valores numéricos são realmente números válidos
  for (const f of numFields) {
    if (!Number.isFinite(s[f]) || s[f] < 0) {
      return false;
    }
  }

  // Verifica o inventário
  if (typeof s.inventory !== "object" || s.inventory === null) {
    return false;
  }

  // Verifica as listas
  if (!Array.isArray(s.discoveredPotionNames)) {
    return false;
  }

  if (!Array.isArray(s.achievementsUnlocked)) {
    return false;
  }

  // Verifica se a fase máxima desbloqueada existe
  if (
    s.maxUnlockedPhaseIndex < 0 ||
    s.maxUnlockedPhaseIndex >= phases.length
  ) {
    return false;
  }

  // Verifica se a fase atual existe
  if (
    s.currentPhaseIndex < 0 ||
    s.currentPhaseIndex >= phases.length
  ) {
    return false;
  }

  if (s.currentPhaseIndex > s.maxUnlockedPhaseIndex) {
  return false;
}

  return true;
}

  let dataWasCorrupted = false;
  let state = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValidState(parsed)) {
        state = Object.assign(defaultState(), parsed);
      } else {
        dataWasCorrupted = true;
      }
    }
  } catch (e) {
    dataWasCorrupted = true;
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      pulseSaveIndicator();
    } catch (e) {
      // localStorage indisponível (modo privado, cota excedida, etc.) — o jogo continua funcionando sem salvar.
    }
  }

  const saveIndicator = document.getElementById("save-indicator");
  function pulseSaveIndicator() {
    if (!saveIndicator) return;
    saveIndicator.classList.remove("show");
    void saveIndicator.offsetWidth; // reinicia a animação
    saveIndicator.classList.add("show");
  }

  // ------------------------------------------------------------------------
  // 4. ESTADO TRANSITÓRIO (não persistido)
  // ------------------------------------------------------------------------
  let currentPhaseIndex = Math.min(state.currentPhaseIndex || 0, state.maxUnlockedPhaseIndex);
  let targetQuantity = 1;
  let playerInputs = [];
  let explosionsThisAttempt = 0;
  let currentTutStep = 1;
  let toastTimeout = null;
  let achievementQueue = [];
  let achievementToastBusy = false;

  // ------------------------------------------------------------------------
  // 5. ELEMENTOS DO DOM
  // ------------------------------------------------------------------------
  const $ = id => document.getElementById(id);

  const startScreen = $("start-screen"), gameScreen = $("game-screen");
  const btnStart = $("btn-start"), btnStartLabel = $("btn-start-label"), continueSubtitle = $("continue-subtitle");
  const btnStory = $("btn-story"), btnOpenGrimoire = $("btn-open-grimoire");
  const btnResetProgress = $("btn-reset-progress");
  const btnBack = $("btn-back"), btnTutorial = $("btn-tutorial"), btnRecipeBook = $("btn-recipe-book");
  const logoImg = $("logo-img");

  const btnModalStart = $("btn-modal-start");
  const btnTutPrev = $("btn-tut-prev"), btnTutNext = $("btn-tut-next");
  const recipeBookGrid = $("recipe-book-grid"), achievementsGrid = $("achievements-grid");

  const btnClaimReward = $("btn-claim-reward"), btnClaimLabel = $("btn-claim-label");
  const rewardMissionName = $("reward-mission-name"), rewardTextDesc = $("reward-text-desc"), rewardStreakLine = $("reward-streak-line");

  const btnConfirmResetCancel = $("btn-confirm-reset-cancel"), btnConfirmResetOk = $("btn-confirm-reset-ok");
  const btnDataErrorOk = $("btn-data-error-ok");

  const phaseTitleEl = $("phase-title"), playerRankEl = $("player-rank"), phaseBadgeEl = $("phase-badge");
  const missionBadgeTextEl = $("mission-badge-text");
  const missionTitleEl = $("mission-title"), missionDescEl = $("mission-desc"), missionRewardTextEl = $("mission-reward-text");
  const xpCountEl = $("xp-count"), potionsCountEl = $("potions-count"), streakCountEl = $("streak-count"), streakBadgeEl = $("streak-badge");

  const recipeListEl = $("recipe-list");
  const currentPotionNameEl = $("current-potion-name"), currentPotionIconEl = $("current-potion-icon"), currentPotionRatioEl = $("current-potion-ratio");

  const targetQtyEl = $("target-quantity-display"), targetMinusBtn = $("target-minus"), targetPlusBtn = $("target-plus");
  const ingredientRowsContainer = $("ingredient-rows");
  const totalPartsEl = $("total-parts"), targetPartsNeededEl = $("target-parts-needed"), mixHintEl = $("mix-hint");

  const btnBrew = $("btn-brew");
  const toastFeedback = $("toast-feedback"), toastMsg = $("toast-message"), toastIconSlot = $("toast-icon-slot");
  const inventoryGrid = $("inventory-grid");

  const mathFormulaEl = $("math-formula"), codeFormulaEl = $("code-formula");

  const potionStage = $("potion-stage"), potionPngBase = $("potion-png-base");
  const potionLiquidOverlay = $("potion-liquid-overlay"), potionLiquidFill = $("potion-liquid-fill");
  const explosionFlash = $("explosion-flash"), explosionParticlesContainer = $("explosion-particles-container");

  const achievementToastEl = $("achievement-toast"), achvToastIcon = $("achv-toast-icon"), achvToastTitle = $("achv-toast-title");

  // ------------------------------------------------------------------------
  // 6. MODAIS GENÉRICOS
  // ------------------------------------------------------------------------
  function openModal(id) {
    const el = $(id);
    el.classList.remove("hidden");
    const card = el.querySelector(".modal-card");
    if (!prefersReducedMotion && card) gsap.fromTo(card, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
  }
  function closeModal(id) {
    const el = $(id);
    const card = el.querySelector(".modal-card");
    if (!prefersReducedMotion && card) {
      gsap.to(card, { opacity: 0, scale: 0.88, duration: 0.22, onComplete: () => el.classList.add("hidden") });
    } else {
      el.classList.add("hidden");
    }
  }
  document.querySelectorAll("[data-close-modal]").forEach(btn => btn.addEventListener("click", () => closeModal(btn.dataset.closeModal)));
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(overlay.id); });
  });

  // ------------------------------------------------------------------------
  // 7. TELA INICIAL
  // ------------------------------------------------------------------------
  initSparksCanvas();

  function refreshStartScreen() {
    const hasProgress = state.maxUnlockedPhaseIndex > 0 || state.potionsBrewedCount > 0;
    btnStartLabel.textContent = hasProgress ? "CONTINUAR JORNADA" : "COMEÇAR JORNADA";
    continueSubtitle.textContent = hasProgress
      ? `Bem-vindo de volta, ${phases[state.maxUnlockedPhaseIndex].rank}.`
      : "Sua jornada como alquimista começa aqui.";
    btnResetProgress.classList.toggle("hidden", !hasProgress);

    $("start-stat-xp").querySelector("strong").textContent = state.xp;
    $("start-stat-potions").querySelector("strong").textContent = state.totalPotionsCreated;
    $("start-stat-achv").querySelector("strong").textContent = `${state.achievementsUnlocked.length}/${achievementDefs.length}`;
  }
  refreshStartScreen();

  if (dataWasCorrupted) openModal("data-error-modal");
  btnDataErrorOk.addEventListener("click", () => closeModal("data-error-modal"));

  const introTimeline = prefersReducedMotion ? null : gsap.timeline({ defaults: { ease: "power3.out" } });
  if (introTimeline) {
    introTimeline
      .from(logoImg, { duration: 1.1, opacity: 0, scale: 0.9, y: -16 })
      .from(".button-group .btn", { duration: 0.7, opacity: 0, y: 20, stagger: 0.14 }, "-=0.4");
  }

  function startGame() {
    closeModal("story-modal");
    currentPhaseIndex = Math.min(currentPhaseIndex, state.maxUnlockedPhaseIndex);

    const goPlay = () => {
      startScreen.classList.add("hidden");
      gameScreen.classList.remove("hidden");
      if (!prefersReducedMotion) {
        gsap.fromTo(gameScreen, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      }
      loadPhase(currentPhaseIndex);
    };

    if (!prefersReducedMotion) {
      gsap.to(startScreen, { duration: 0.45, opacity: 0, y: -16, ease: "power2.in", onComplete: goPlay });
    } else {
      goPlay();
    }
  }

  btnStart.addEventListener("click", startGame);
  btnStory.addEventListener("click", () => openModal("story-modal"));
  btnModalStart.addEventListener("click", startGame);
  btnOpenGrimoire.addEventListener("click", () => { renderGrimoire(); openModal("grimoire-modal"); });

  btnBack.addEventListener("click", () => {
    const goBack = () => {
      gameScreen.classList.add("hidden");
      startScreen.classList.remove("hidden");
      refreshStartScreen();
      if (!prefersReducedMotion) gsap.fromTo(startScreen, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    };
    if (!prefersReducedMotion) gsap.to(gameScreen, { duration: 0.4, opacity: 0, y: 16, ease: "power2.in", onComplete: goBack });
    else goBack();
  });

  // Reset de progresso
  btnResetProgress.addEventListener("click", () => openModal("confirm-reset-modal"));
  btnConfirmResetCancel.addEventListener("click", () => closeModal("confirm-reset-modal"));
  btnConfirmResetOk.addEventListener("click", () => {
    state = defaultState();
    currentPhaseIndex = 0;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignora */ }
    closeModal("confirm-reset-modal");
    refreshStartScreen();
    showToast("O seu grimório foi limpo. Uma nova jornada aguarda.", "warning", "alerta");
  });

  // ------------------------------------------------------------------------
  // 8. TUTORIAL
  // ------------------------------------------------------------------------
  function openTutorial() { currentTutStep = 1; updateTutorialSlide(); openModal("tutorial-modal"); }
  function updateTutorialSlide() {
    document.querySelectorAll(".step-slide").forEach(s => s.classList.toggle("active", parseInt(s.dataset.step) === currentTutStep));
    document.querySelectorAll("#tutorial-dots .dot").forEach((d, i) => d.classList.toggle("active", i + 1 === currentTutStep));
    btnTutPrev.disabled = currentTutStep === 1;
    btnTutNext.textContent = currentTutStep === 4 ? "Entendi!" : "Próximo";
  }
  btnTutorial.addEventListener("click", openTutorial);
  btnTutPrev.addEventListener("click", () => { if (currentTutStep > 1) { currentTutStep--; updateTutorialSlide(); } });
  btnTutNext.addEventListener("click", () => { if (currentTutStep < 4) { currentTutStep++; updateTutorialSlide(); } else closeModal("tutorial-modal"); });

  // ------------------------------------------------------------------------
  // 9. GRIMÓRIO (receitas + conquistas)
  // ------------------------------------------------------------------------
  document.querySelectorAll(".grimoire-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".grimoire-tab").forEach(t => { t.classList.toggle("active", t === tab); t.setAttribute("aria-selected", t === tab); });
      document.querySelectorAll(".grimoire-panel").forEach(p => p.classList.toggle("active", p.dataset.panel === tab.dataset.tab));
    });
  });

  function renderGrimoire() {
    recipeBookGrid.innerHTML = "";
    phases.forEach((p, idx) => {
      const isUnlocked = idx <= state.maxUnlockedPhaseIndex;
      const isDiscovered = state.discoveredPotionNames.includes(p.recipe.name);
      const ratioStr = p.recipe.ingredients.map(i => i.base).join(" : ");
      const div = document.createElement("div");
      div.className = `recipe-book-item ${isDiscovered ? "discovered" : isUnlocked ? "unlocked" : "locked"}`;
      div.innerHTML = `
        <div class="rb-visual"><img src="assets/img/${p.bottle}" alt=""></div>
        <div class="recipe-book-header">
          <span class="recipe-book-icon">${getIconHTML(p.recipe.iconKey)}</span>
          <div>
            <h4 class="recipe-book-title">${isDiscovered ? p.recipe.name : (isUnlocked ? p.recipe.name : "???")}</h4>
            <span class="recipe-book-unlock">Fase ${p.phase} &bull; ${p.rank}</span>
          </div>
        </div>
        ${isDiscovered
          ? `<p class="recipe-book-ratio">Proporção: ${ratioStr}</p><p class="recipe-book-unlock">${p.recipe.ingredients.length} ingredientes</p>`
          : `<p class="recipe-book-silhouette">${isUnlocked ? "Prepare esta poção para revelar a receita." : "Bloqueada — avance no grimório para desbloquear."}</p>`}
      `;
      recipeBookGrid.appendChild(div);
    });

    achievementsGrid.innerHTML = "";
    achievementDefs.forEach(a => {
      const unlocked = state.achievementsUnlocked.includes(a.id);
      const div = document.createElement("div");
      div.className = `achievement-item ${unlocked ? "unlocked" : ""}`;
      div.innerHTML = `
        <div class="achv-seal">${getIconHTML(unlocked ? a.icon : "cadeado")}</div>
        <div class="achv-body"><h5>${a.title}</h5><p>${a.desc}</p></div>
      `;
      achievementsGrid.appendChild(div);
    });
  }

  function checkAchievements() {
    achievementDefs.forEach(a => {
      if (!state.achievementsUnlocked.includes(a.id) && a.check(state)) {
        state.achievementsUnlocked.push(a.id);
        achievementQueue.push(a);
      }
    });
    processAchievementQueue();
  }

  function processAchievementQueue() {
    if (achievementToastBusy || achievementQueue.length === 0) return;
    achievementToastBusy = true;
    const a = achievementQueue.shift();
    achvToastIcon.innerHTML = getIconHTML(a.icon);
    achvToastTitle.textContent = a.title;
    achievementToastEl.classList.remove("hidden");
    if (!prefersReducedMotion) {
      gsap.fromTo(achievementToastEl, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.6)" });
    }
    setTimeout(() => {
      const hide = () => { achievementToastEl.classList.add("hidden"); achievementToastBusy = false; processAchievementQueue(); };
      if (!prefersReducedMotion) gsap.to(achievementToastEl, { y: 30, opacity: 0, duration: 0.3, onComplete: hide });
      else hide();
    }, 3200);
  }

  // ------------------------------------------------------------------------
  // 10. TOAST DE FEEDBACK
  // ------------------------------------------------------------------------
  function showToast(htmlMessage, kind, iconKey) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toastMsg.innerHTML = htmlMessage;
    toastIconSlot.innerHTML = getIconHTML(iconKey || (kind === "success" ? "check" : "alerta"));
    toastFeedback.className = `toast-feedback toast-${kind}`;
    toastFeedback.classList.remove("hidden");

    if (!prefersReducedMotion) {
      gsap.fromTo(toastFeedback, { y: -40, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
    }
    toastTimeout = setTimeout(() => {
      if (!prefersReducedMotion) {
        gsap.to(toastFeedback, { y: -24, opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => toastFeedback.classList.add("hidden") });
      } else {
        toastFeedback.classList.add("hidden");
      }
    }, 4800);
  }

  // ------------------------------------------------------------------------
  // 11. CARREGAMENTO DE FASE
  // ------------------------------------------------------------------------
  function loadPhase(index) {
    currentPhaseIndex = index;
    state.currentPhaseIndex = index;
    explosionsThisAttempt = 0;

    const phaseObj = phases[index];
    const recipe = phaseObj.recipe;

    phaseTitleEl.textContent = phaseObj.title;
    playerRankEl.textContent = phaseObj.rank;
    phaseBadgeEl.textContent = `FASE ${phaseObj.phase}`;
    missionBadgeTextEl.textContent = `FASE ${phaseObj.phase} • ${phaseObj.rank.toUpperCase()}`;

    const ratioString = recipe.ingredients.map(i => i.base).join(" : ");
    missionTitleEl.textContent = recipe.name;
    missionDescEl.textContent = `Prepare ${recipe.targetQty} unidades mantendo a proporção ${ratioString}.`;
    missionRewardTextEl.textContent = `${recipe.ingredients.length} ingredientes`;

    $("mission-avatar-wrapper").innerHTML = getIconHTML(recipe.iconKey);

    targetQuantity = recipe.targetQty;
    currentPotionNameEl.textContent = recipe.name.toUpperCase();
    currentPotionIconEl.innerHTML = getIconHTML(recipe.iconKey);
    currentPotionRatioEl.textContent = ratioString;

    potionPngBase.src = `assets/img/${phaseObj.bottle}`;
    potionLiquidOverlay.style.setProperty("--potion-mask", `url('assets/img/${phaseObj.bottle}')`);

    playerInputs = new Array(recipe.ingredients.length).fill(0);
    renderIngredientCards(recipe.ingredients);

    const mult2 = recipe.ingredients.map(i => i.base * 2).join(" : ");
    const mult4 = recipe.ingredients.map(i => i.base * 4).join(" : ");
    mathFormulaEl.textContent = `${ratioString} = ${mult2} = ${mult4}`;
    codeFormulaEl.textContent = recipe.ingredients.length === 2
      ? `qtdA · ${recipe.ingredients[1].base} = qtdB · ${recipe.ingredients[0].base}`
      : `Para cada ingrediente i: qtd[0] · base[i] = qtd[i] · base[0]`;

    renderRecipeList();
    updateCounters();
  }

  function renderIngredientCards(ingredients) {
    ingredientRowsContainer.innerHTML = "";
    ingredients.forEach((ingr, idx) => {
      const card = document.createElement("div");
      card.className = "ingredient-card";
      card.id = `ing-card-${idx}`;
      card.innerHTML = `
        <div class="ing-info">
          <div class="ing-icon-wrapper">${getIconHTML(ingr.iconKey)}</div>
          <span class="ing-name">${ingr.name}</span>
        </div>
        <div class="counter-controls">
          <button class="btn-counter btn-ing-minus" data-index="${idx}" aria-label="Diminuir ${ingr.name}">−</button>
          <span class="counter-value" id="val-ing-${idx}">0</span>
          <button class="btn-counter btn-ing-plus" data-index="${idx}" aria-label="Aumentar ${ingr.name}">+</button>
        </div>`;
      ingredientRowsContainer.appendChild(card);
    });

    ingredientRowsContainer.querySelectorAll(".btn-ing-minus").forEach(btn => btn.addEventListener("click", e => {
      const idx = parseInt(e.currentTarget.dataset.index);
      if (playerInputs[idx] > 0) { playerInputs[idx]--; pulseCard(idx); updateCounters(); }
    }));
    ingredientRowsContainer.querySelectorAll(".btn-ing-plus").forEach(btn => btn.addEventListener("click", e => {
      const idx = parseInt(e.currentTarget.dataset.index);
      playerInputs[idx]++; pulseCard(idx); updateCounters();
    }));
  }

  function pulseCard(idx) {
    const card = $(`ing-card-${idx}`);
    if (!card) return;
    card.classList.remove("card-pulse");
    void card.offsetWidth;
    card.classList.add("card-pulse");
  }

  function renderRecipeList() {
    recipeListEl.innerHTML = "";
    phases.forEach((p, index) => {
      const isUnlocked = index <= state.maxUnlockedPhaseIndex;
      const isCurrent = index === currentPhaseIndex;
      const ratioStr = p.recipe.ingredients.map(i => i.base).join(":");
      const li = document.createElement("li");
      li.className = `recipe-item ${isCurrent ? "active" : ""} ${!isUnlocked ? "locked" : ""}`;

      let statusBadge = "";
      if (isCurrent) statusBadge = `<span class="mission-tag tag-active">ATUAL</span>`;
      else if (isUnlocked) statusBadge = `<span class="mission-tag tag-unlocked">CONCLUÍDA</span>`;
      else statusBadge = `<span class="mission-tag tag-next">BLOQUEADA</span>`;

      li.innerHTML = `
        <span class="recipe-icon">${getIconHTML(p.recipe.iconKey)}</span>
        <div class="recipe-info">
          <div class="recipe-title-row">
            <h4>${p.phase}. ${p.recipe.name}</h4>
            ${statusBadge}
          </div>
          <p>Proporção ${ratioStr} &bull; ${p.recipe.ingredients.length} ingredientes</p>
        </div>
        ${!isUnlocked ? `<span class="lock-badge">${getIconHTML("cadeado")}</span>` : (isCurrent ? '<span class="active-diamond">✦</span>' : "")}
      `;

      if (isUnlocked) li.addEventListener("click", () => loadPhase(index));
      else li.addEventListener("click", () => li.classList.add("locked"));
      recipeListEl.appendChild(li);
    });

    setTimeout(() => {
      const active = recipeListEl.querySelector(".recipe-item.active");
      if (active) active.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
    }, 120);
  }

  // ------------------------------------------------------------------------
  // 12. ANEL DE PROPORÇÃO (elemento assinatura)
  // ------------------------------------------------------------------------
  function isProportionCorrect(inputs, ingredients) {
    if (inputs.some(v => v <= 0)) return false;
    const base0 = ingredients[0].base, in0 = inputs[0];
    for (let i = 1; i < ingredients.length; i++) {
      if (in0 * ingredients[i].base !== inputs[i] * base0) return false;
    }
    return true;
  }

  function buildRatioRing(recipe, inputs) {
    const targetGroup = $("ratio-ring-target"), fillGroup = $("ratio-ring-fill");
    targetGroup.innerHTML = ""; fillGroup.innerHTML = "";

    const ingredients = recipe.ingredients;
    const baseSum = ingredients.reduce((s, i) => s + i.base, 0);
    const inputSum = inputs.reduce((s, v) => s + v, 0);
    const RT = 92, RF = 74;
    const CT = 2 * Math.PI * RT, CF = 2 * Math.PI * RF;
    const NS = "http://www.w3.org/2000/svg";

    let cum = 0;
    ingredients.forEach(i => {
      const len = (i.base / baseSum) * CT;
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", 110); c.setAttribute("cy", 110); c.setAttribute("r", RT);
      c.setAttribute("stroke", i.color);
      c.setAttribute("stroke-dasharray", `${len} ${CT - len}`);
      c.setAttribute("stroke-dashoffset", -cum);
      targetGroup.appendChild(c);
      cum += len;
    });

    if (inputSum > 0) {
      let cumF = 0;
      ingredients.forEach((i, idx) => {
        const frac = inputs[idx] / inputSum;
        if (frac <= 0) return;
        const len = frac * CF;
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", 110); c.setAttribute("cy", 110); c.setAttribute("r", RF);
        c.setAttribute("stroke", i.color);
        c.setAttribute("stroke-dasharray", `${len} ${CF - len}`);
        c.setAttribute("stroke-dashoffset", -cumF);
        fillGroup.appendChild(c);
        cumF += len;
      });
    }

    $("ratio-ring").classList.toggle("aligned", inputSum > 0 && isProportionCorrect(inputs, ingredients));
  }

  // ------------------------------------------------------------------------
  // 13. CONTADORES, LÍQUIDO E DICA CONTEXTUAL
  // ------------------------------------------------------------------------
  function updateCounters() {
    targetQtyEl.textContent = targetQuantity;
    playerInputs.forEach((v, idx) => { const el = $(`val-ing-${idx}`); if (el) el.textContent = v; });

    const recipe = phases[currentPhaseIndex].recipe;
    const totalMix = playerInputs.reduce((s, v) => s + v, 0);
    totalPartsEl.textContent = totalMix;
    targetPartsNeededEl.textContent = targetQuantity;

    const fillPct = Math.min(100, Math.max(0, Math.round((totalMix / targetQuantity) * 85)));
    potionLiquidFill.style.height = `${fillPct}%`;
    updateLiquidColor(totalMix, recipe);

    buildRatioRing(recipe, playerInputs);

    const correct = totalMix > 0 && isProportionCorrect(playerInputs, recipe.ingredients);
    ingredientRowsContainer.querySelectorAll(".ingredient-card").forEach(c => c.classList.toggle("state-correct", correct));

    if (totalMix === 0) mixHintEl.textContent = "";
    else if (correct && totalMix === targetQuantity) mixHintEl.textContent = "Proporção e volume perfeitos — prepare a poção!";
    else if (correct) mixHintEl.textContent = "Proporção correta — continue na mesma escala.";
    else mixHintEl.textContent = "Ajuste os ingredientes para respeitar a proporção.";
  }

  function updateLiquidColor(totalMix, recipe) {
    if (totalMix === 0) {
      potionLiquidFill.style.background = "transparent";
      potionPngBase.style.filter = "drop-shadow(0 0 22px rgba(138,79,209,0.4))";
      return;
    }
    potionLiquidFill.style.background = `linear-gradient(180deg, ${recipe.color} 0%, #150624 100%)`;
    potionPngBase.style.filter = `drop-shadow(0 0 28px ${recipe.color})`;
  }

  function getRecipeBaseSum() {
  const recipe = phases[currentPhaseIndex].recipe;

  return recipe.ingredients.reduce(
    (sum, ingredient) => sum + ingredient.base,
    0
  );
}

targetMinusBtn.addEventListener("click", () => {
  const step = getRecipeBaseSum();

  if (targetQuantity > step) {
    targetQuantity -= step;
    updateCounters();
  }
});

targetPlusBtn.addEventListener("click", () => {
  const step = getRecipeBaseSum();

  targetQuantity += step;
  updateCounters();
});

  // ------------------------------------------------------------------------
  // 14. EXPLOSÃO (feedback de erro)
  // ------------------------------------------------------------------------
  function triggerExplosion() {
    explosionFlash.classList.remove("hidden");

    if (prefersReducedMotion) {
      setTimeout(() => explosionFlash.classList.add("hidden"), 500);
      potionPngBase.style.filter = "brightness(0.5) grayscale(0.6)";
      setTimeout(() => potionPngBase.style.filter = "drop-shadow(0 0 22px rgba(138,79,209,0.4))", 500);
      return;
    }

    gsap.fromTo(explosionFlash, { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => explosionFlash.classList.add("hidden") });

    gsap.timeline()
      .to(gameScreen, { x: -22, y: 14, duration: 0.04, repeat: 7, yoyo: true })
      .to(gameScreen, { x: 0, y: 0, duration: 0.1 });

    gsap.timeline()
      .to(potionPngBase, { scale: 1.3, filter: "brightness(2.6) contrast(1.8) drop-shadow(0 0 40px #FF4D4D)", duration: 0.08 })
      .to(potionPngBase, { scale: 0.88, filter: "brightness(0.3) grayscale(1)", duration: 0.22 })
      .to(potionPngBase, { scale: 1, filter: "drop-shadow(0 0 22px rgba(138,79,209,0.4))", duration: 0.35 });

    explosionParticlesContainer.innerHTML = "";
    const rect = potionStage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const colors = ["#F0796A", "#FFB703", "#FFD166", "#D65C4A", "#B98CF0"];

    for (let i = 0; i < 46; i++) {
      const p = document.createElement("div");
      p.className = "explosion-particle";
      const size = Math.random() * 18 + 5;
      p.style.width = `${size}px`; p.style.height = `${size}px`;
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = `${cx}px`; p.style.top = `${cy}px`;
      explosionParticlesContainer.appendChild(p);

      const angle = Math.random() * Math.PI * 2, dist = Math.random() * 380 + 100;
      gsap.to(p, {
        x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: Math.random() * 2 + 0.3,
        duration: Math.random() * 0.8 + 0.35, ease: "power2.out", onComplete: () => p.remove()
      });
    }
  }

  // ------------------------------------------------------------------------
  // 15. PREPARAR POÇÃO
  // ------------------------------------------------------------------------
  btnBrew.addEventListener("click", () => {
    const phaseObj = phases[currentPhaseIndex];
    const recipe = phaseObj.recipe;
    const totalMix = playerInputs.reduce((s, v) => s + v, 0);
    const ratioOk = isProportionCorrect(playerInputs, recipe.ingredients);
    const totalOk = totalMix === targetQuantity;

    if (ratioOk && totalOk) {
      const wasFirstTimeFrontier = currentPhaseIndex === state.maxUnlockedPhaseIndex;
      const playerRatio = playerInputs.join(" : ");
      const baseRatio = recipe.ingredients.map(i => i.base).join(" : ");

      showToast(`<strong>Poção criada com sucesso!</strong> A proporção ${playerRatio} corresponde exatamente à receita (${baseRatio}).`, "success", "check");

      potionLiquidFill.style.background = `linear-gradient(180deg, #9BE168 0%, #6FBE44 100%)`;
      potionPngBase.style.filter = `drop-shadow(0 0 30px #9BE168)`;
      if (!prefersReducedMotion) {
        gsap.timeline().to(potionStage, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.28 }).to(potionStage, { scale: 1, duration: 0.18 });
      }

      // streak & XP
      state.streak++;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      const streakBonus = Math.min(state.streak, 10) * 10;
      const xpGained = 150 + streakBonus;
      state.xp += xpGained;

      if (wasFirstTimeFrontier && explosionsThisAttempt === 0) state.perfectPhaseCleared = true;

      addToInventory(recipe);
      xpCountEl.textContent = state.xp;
      updateStreakUI();
      persist();
      checkAchievements();

      setTimeout(() => openRewardModal(phaseObj, xpGained), 700);

    } else {
      state.streak = 0;
      explosionsThisAttempt++;
      updateStreakUI();

      const playerRatio = playerInputs.join(" : ");
      const baseRatio = recipe.ingredients.map(i => i.base).join(" : ");

      let message;
      if (!totalOk && ratioOk) {
        message = `<strong>Proporção certa, volume errado!</strong> A razão está exata (${playerRatio}), mas o total no frasco deu ${totalMix} em vez de ${targetQuantity}.`;
      } else {
        message = `<strong>Receita incorreta — a poção explodiu!</strong> ${recipe.name} exige a proporção ${baseRatio}. Você usou ${playerRatio}.`;
      }
      showToast(message, "error", "alerta");
      triggerExplosion();
      persist();
    }
  });

  function updateStreakUI() {
    streakCountEl.textContent = state.streak;
    streakBadgeEl.classList.toggle("hot", state.streak >= 3);
  }

  function addToInventory(recipe) {
    if (!state.inventory[recipe.name]) state.inventory[recipe.name] = { count: 0, iconKey: recipe.iconKey };
    state.inventory[recipe.name].count += targetQuantity;
    state.totalPotionsCreated += targetQuantity;
    state.potionsBrewedCount += 1;
    if (!state.discoveredPotionNames.includes(recipe.name)) state.discoveredPotionNames.push(recipe.name);
    potionsCountEl.textContent = state.totalPotionsCreated;
    renderInventory();
  }

  function renderInventory() {
    const keys = Object.keys(state.inventory);
    if (keys.length === 0) {
      inventoryGrid.innerHTML = `<p class="empty-inventory">Nenhuma poção preparada ainda. Prepare sua primeira receita para começar sua coleção.</p>`;
      return;
    }
    inventoryGrid.innerHTML = "";
    keys.forEach(name => {
      const item = state.inventory[name];
      const div = document.createElement("div");
      div.className = "inventory-item";
      div.innerHTML = `${getIconHTML(item.iconKey)}<span class="inventory-name">${name}</span><span class="inventory-badge">${item.count}</span>`;
      inventoryGrid.appendChild(div);
      if (!prefersReducedMotion) gsap.from(div, { scale: 0.5, opacity: 0, duration: 0.35, ease: "back.out(1.7)" });
    });
  }
  renderInventory();

  function openRewardModal(phaseObj, xpGained) {
    rewardMissionName.textContent = `Você dominou a ${phaseObj.recipe.name}!`;
    rewardTextDesc.innerHTML = `${getIconHTML("trofeu")} +${xpGained} XP`;
    rewardStreakLine.textContent = state.streak > 1 ? `Sequência atual: ${state.streak} poções sem explodir 🔥` : "";
    btnClaimLabel.textContent = currentPhaseIndex + 1 < phases.length ? "AVANÇAR PARA A PRÓXIMA FASE" : "CONCLUIR O GRIMÓRIO";
    openModal("reward-modal");
  }

  btnClaimReward.addEventListener("click", () => {
    closeModal("reward-modal");
    if (currentPhaseIndex + 1 < phases.length) {
      if (currentPhaseIndex === state.maxUnlockedPhaseIndex) state.maxUnlockedPhaseIndex = currentPhaseIndex + 1;
      persist();
      checkAchievements();
      loadPhase(currentPhaseIndex + 1);
    } else {
      if (currentPhaseIndex === state.maxUnlockedPhaseIndex) persist();
      checkAchievements();
      renderRecipeList();
      showToast("Você completou todo o Grimório do Alquimista! Reviva qualquer fase pela lista à esquerda.", "success", "trofeu");
    }
  });

  // ------------------------------------------------------------------------
  // 16. FAÍSCAS DE FUNDO
  // ------------------------------------------------------------------------
  function initSparksCanvas() {
    if (prefersReducedMotion) return;
    const canvas = $("sparks-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth), height = (canvas.height = window.innerHeight);
    window.addEventListener("resize", () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });

    const particles = [];
    class Spark {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width; this.y = Math.random() * height;
        this.radius = Math.random() * 1.8 + 0.6; this.alpha = Math.random() * 0.7 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.35; this.speedY = (Math.random() - 0.7) * 0.4;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.008;
        if (this.y < -10 || this.x < -10 || this.x > width + 10) { this.reset(); this.y = height + 10; }
      }
      draw() {
        ctx.save(); ctx.globalAlpha = Math.max(0.08, Math.min(1, this.alpha));
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#F0E6D2"; ctx.shadowBlur = 8; ctx.shadowColor = "#B98CF0"; ctx.fill();
        ctx.restore();
      }
    }
    for (let i = 0; i < 38; i++) particles.push(new Spark());
    (function animate() { ctx.clearRect(0, 0, width, height); particles.forEach(s => { s.update(); s.draw(); }); requestAnimationFrame(animate); })();
  }

  // ------------------------------------------------------------------------
  // 17. INICIALIZAÇÃO
  // ------------------------------------------------------------------------
  renderGrimoire();
  loadPhase(currentPhaseIndex);
  updateStreakUI();
  xpCountEl.textContent = state.xp;
  potionsCountEl.textContent = state.totalPotionsCreated;
  checkAchievements();
});