"use client";

interface LanguageSwitcherProps {
  currentLang: string;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const isZh = currentLang === "zh";
  const targetLang = isZh ? "en" : "zh";

  // Simple client-side navigation to switch language
  const switchLang = () => {
    const path = window.location.pathname.replace(
      new RegExp(`^/${currentLang}`),
      `/${targetLang}`
    );
    window.location.href = path + window.location.search;
  };

  return (
    <button
      onClick={switchLang}
      className="text-xs font-bold px-3 py-1 rounded-full border transition-colors hover:bg-white/10 border-white/30 text-white"
      aria-label={`Switch to ${isZh ? "English" : "中文"}`}
      title={isZh ? "Switch to English" : "切换到中文"}
    >
      {isZh ? "EN" : "中文"}
    </button>
  );
}