/* ==========================================================
   מערכת העיצוב · סקריפט משותף
   1. סט אייקונים (מוזרק פעם אחת, משתמשים ב-<svg><use href="#i-check"/></svg>)
   2. קישורי וואטסאפ וטלפון ממקום אחד (BUSINESS)
   3. סליידר לפני/אחרי, כניסה בגלילה, טופס שנשלח לוואטסאפ
   ========================================================== */

/* פרטי העסק: ממלאים כאן בלבד. כרגע ערכי דוגמה. */
const BUSINESS = {
  name: "מקלחון תל אביב",
  phoneDisplay: "050-000-0000",
  phoneIntl: "972500000000",
  waText: "היי, אשמח להצעת מחיר לניקוי מקלחון",
};

const ICONS = {
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  star: '<path class="f" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/>',
  wa: '<path class="f" d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2z"/>',
  phone: '<path d="M5 3h3.5l2 5-2.5 1.5a11 11 0 005.5 5.5L15 12.5l5 2V18a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z"/>',
  drop: '<path d="M12 3s6 6.4 6 11a6 6 0 01-12 0c0-4.6 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 002.5 2.5"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M6.3 17.7l2.4-2.4M15.3 8.7l2.4-2.4"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  grid: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 12h17M12 3.5v17"/>',
  glass: '<rect x="5" y="2.5" width="14" height="19" rx="1.5"/><path d="M9 7l-2 2M14 7l-5 5M15 12l-3 3"/>',
  faucet: '<path d="M4 10h9a4 4 0 014 4v1"/><path d="M8 10V7h4v3M6 5h8"/><path d="M17 18v.5M17 21v.5"/>',
  toilet: '<path d="M6 3h7v7H6zM4 10h15a6 6 0 01-6 6h-2a6 6 0 01-6-6zM9 16l-1 5h8l-1-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6.1 7-11.5a7 7 0 00-14 0C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19l8-8"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  arrow: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  eco: '<path d="M7 20c-2-6 1-12 10-14-1 9-5 13-10 14z"/><path d="M7 20c1-4 3-7 6-9"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 007 0M9 9.5h.01M15 9.5h.01"/>',
};

(function injectSprite() {
  const symbols = Object.entries(ICONS)
    .map(([id, d]) => `<symbol id="i-${id}" viewBox="0 0 24 24">${d}</symbol>`)
    .join("");
  const holder = document.createElement("div");
  holder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none"><style>.f{fill:currentColor;stroke:none}</style>${symbols}</svg>`;
  document.body.prepend(holder.firstChild);
})();

/* קישורי פעולה: data-wa / data-tel / data-phone-text */
function waLink(text = BUSINESS.waText) {
  return `https://wa.me/${BUSINESS.phoneIntl}?text=${encodeURIComponent(text)}`;
}
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa || undefined);
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-tel]").forEach((a) => (a.href = `tel:+${BUSINESS.phoneIntl}`));
document.querySelectorAll("[data-phone-text]").forEach((el) => (el.textContent = BUSINESS.phoneDisplay));

/* לפני / אחרי */
document.querySelectorAll(".ba").forEach((ba) => {
  const range = ba.querySelector('input[type="range"]');
  if (!range) return;
  const set = () => ba.style.setProperty("--pos", range.value + "%");
  range.addEventListener("input", set);
  set();
});

/* כניסה בגלילה */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -10% 0px" })
  : null;
document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("is-in")));

/* טופס: לא שומר כלום, מרכיב הודעה ופותח וואטסאפ */
document.querySelectorAll("form[data-wa-form]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const lines = ["היי, אשמח להצעת מחיר"];
    for (const [k, v] of data.entries()) if (String(v).trim()) lines.push(`${k}: ${v}`);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });
});
