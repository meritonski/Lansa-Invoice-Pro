const dict = {
  sv: {
    title: "Support",
    subtitle: "Hjälp, felsökning och kontakt för Lansa Invoice Pro.",
    quickTitle: "Snabbhjälp",
    quickDesc: "Här är de vanligaste frågorna vi får.",
    contactTitle: "Kontakt",
    contactDesc: "Skicka gärna med version och vad som hände.",
    faqTitle: "Vanliga frågor (FAQ)",
    faq1q: "Hur når jag support?",
    faq1a: "Skicka ett mail via knappen 'Kontakta support' och bifoga gärna skärmdumpar.",
    faq2q: "Var hittar jag appversionen?",
    faq2a: "Öppna Inställningar → Om. Version visas högst upp.",
    faq3q: "Jag ser problem med iCloud/Sync",
    faq3a: "Kontrollera att iCloud är på för appen i iOS-inställningar. Prova även att starta om appen.",
    faq4q: "Köp/Pro — återställ köp?",
    faq4a: "Gå till Profil → Återställ. Om det inte hjälper: kontrollera att du är inloggad på rätt Apple-ID.",
    versionLabel: "Version",
    statusLabel: "Status",
    statusOk: "Allt ser bra ut",
    mailBtn: "Kontakta support",
    privacyBtn: "Integritetspolicy",
    footer: "© Lansa Invoice Pro. Den här sidan är hostad via GitHub Pages."
  },
  en: {
    title: "Support",
    subtitle: "Help, troubleshooting and contact for Lansa Invoice Pro.",
    quickTitle: "Quick help",
    quickDesc: "These are the most common questions we get.",
    contactTitle: "Contact",
    contactDesc: "Please include app version and what happened.",
    faqTitle: "Frequently asked questions (FAQ)",
    faq1q: "How do I reach support?",
    faq1a: "Send an email using the 'Contact support' button and attach screenshots if possible.",
    faq2q: "Where do I find the app version?",
    faq2a: "Open Settings → About. The version is shown at the top.",
    faq3q: "I see issues with iCloud/Sync",
    faq3a: "Make sure iCloud is enabled for the app in iOS Settings. Try restarting the app as well.",
    faq4q: "Purchase/Pro — restore purchases?",
    faq4a: "Go to Profile → Restore. If it still fails: verify you're signed into the correct Apple ID.",
    versionLabel: "Version",
    statusLabel: "Status",
    statusOk: "All systems operational",
    mailBtn: "Contact support",
    privacyBtn: "Privacy policy",
    footer: "© Lansa Invoice Pro. This page is hosted on GitHub Pages."
  }
};

// ====== CONFIG (ändra dessa när du vill) ======
const SUPPORT_EMAIL = "support@lansa.se";  // <-- byt till din riktiga
const PRIVACY_URL = "#";                   // <-- lägg in riktig länk när klar
const APP_VERSION_TEXT = "1.0";            // <-- uppdatera vid release
// =============================================

function setLang(lang){
  const d = dict[lang] ?? dict.sv;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (d[key]) el.textContent = d[key];
  });

  const svBtn = document.getElementById("btnSv");
  const enBtn = document.getElementById("btnEn");
  if (svBtn && enBtn){
    svBtn.setAttribute("aria-pressed", lang === "sv" ? "true":"false");
    enBtn.setAttribute("aria-pressed", lang === "en" ? "true":"false");
  }

  localStorage.setItem("lang", lang);
}

function init(){
  // Bind language buttons
  document.getElementById("btnSv")?.addEventListener("click", ()=>setLang("sv"));
  document.getElementById("btnEn")?.addEventListener("click", ()=>setLang("en"));

  // Fill dynamic values
  document.getElementById("appVersion").textContent = APP_VERSION_TEXT;

  const mail = document.getElementById("mailLink");
  if (mail){
    const subject = encodeURIComponent("Lansa Invoice Pro – Support");
    const body = encodeURIComponent("Beskriv problemet:\n\nAppversion: " + APP_VERSION_TEXT + "\nEnhet/iOS:\n\n");
    mail.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }

  const privacy = document.getElementById("privacyLink");
  if (privacy) privacy.href = PRIVACY_URL;

  // Default language
  const saved = localStorage.getItem("lang");
  const preferred = saved || (navigator.language || "").toLowerCase().startsWith("sv") ? "sv" : "en";
  setLang(preferred);
}

document.addEventListener("DOMContentLoaded", init);
