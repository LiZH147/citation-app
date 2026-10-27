"use client";
import { useState, type ReactNode } from "react";
import type { Translations } from "@/app/lib/translations";

export interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  t: Translations;
  langSwitcher: ReactNode;
  /** 站内工具页内链，用于树状结构与权重流动。 */
  navLinks?: NavLink[];
  /** 首页展示营销 hero（含全站唯一 h1）；内页关闭，避免与文章 h1 重复。 */
  showHero?: boolean;
}

export default function Header({ t, langSwitcher, navLinks = [], showHero = true }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const homeHref = `#converter`;

  return (
    <header className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href={homeHref}
          className="text-lg font-extrabold tracking-tight hover:text-blue-100 transition-colors"
          aria-label={`${t.siteTitle} - Home`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            {t.siteTitle}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#converter" className="hover:text-blue-200 transition-colors">{t.navConvert}</a>
          <a href="#guide" className="hover:text-blue-200 transition-colors">{t.navGuide}</a>
          <a href="#faq" className="hover:text-blue-200 transition-colors">{t.navFAQ}</a>
          {langSwitcher}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {navLinks.length > 0 && (
        <div className="hidden md:block border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-blue-100">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white hover:underline transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 text-sm font-medium">
          <a href="#converter" className="block py-2 hover:text-blue-200" onClick={() => setMenuOpen(false)}>{t.navConvert}</a>
          <a href="#guide" className="block py-2 hover:text-blue-200" onClick={() => setMenuOpen(false)}>{t.navGuide}</a>
          <a href="#faq" className="block py-2 hover:text-blue-200" onClick={() => setMenuOpen(false)}>{t.navFAQ}</a>
          {navLinks.length > 0 && (
            <div className="pt-2 border-t border-white/10 space-y-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="block py-1 text-blue-100 hover:text-white" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </div>
          )}
          <div className="pt-2">{langSwitcher}</div>
        </div>
      )}

      {showHero && (
      <div className="max-w-4xl mx-auto text-center px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">{t.heroTitle}</h1>
        <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{t.heroDesc}</p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <a
            href="#converter"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all"
          >
            {t.heroCTA}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a
            href="#guide"
            className="inline-flex items-center gap-2 bg-white/10 text-white font-medium px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
          >
            {t.heroGuide}
          </a>
        </div>
      </div>
      )}
    </header>
  );
}
