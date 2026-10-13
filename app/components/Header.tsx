"use client";
import { useState } from "react";

interface HeaderProps {
  onScrollToFAQ?: () => void;
}

export default function Header({ onScrollToFAQ }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="/"
          className="text-lg font-extrabold tracking-tight hover:text-blue-100 transition-colors"
          aria-label="ConvertGB 首页"
        >
          <span className="inline-flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            ConvertGB
          </span>
        </a>

        {/* 桌面导航 */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#converter" className="hover:text-blue-200 transition-colors">
            格式转换
          </a>
          <a href="#guide" className="hover:text-blue-200 transition-colors">
            使用指南
          </a>
          <button
            onClick={onScrollToFAQ}
            className="hover:text-blue-200 transition-colors"
          >
            常见问题
          </button>
        </div>

        {/* 移动端汉堡菜单 */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="切换菜单"
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 text-sm font-medium">
          <a
            href="#converter"
            className="block py-2 hover:text-blue-200 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            格式转换
          </a>
          <a
            href="#guide"
            className="block py-2 hover:text-blue-200 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            使用指南
          </a>
          <button
            className="block py-2 hover:text-blue-200 transition-colors w-full text-left"
            onClick={() => {
              setMenuOpen(false);
              onScrollToFAQ?.();
            }}
          >
            常见问题
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          参考文献格式转换器
        </h1>
        <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          支持 <strong>BibTeX</strong>、<strong>APA</strong>、<strong>MLA</strong>{" "}
          一键转换为中国国家标准{" "}
          <strong>GB/T 7714-2015</strong>。兼容知网、百度学术、Zotero、
          EndNote 导出的引用格式，纯前端解析保障学术隐私安全。
        </p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <a
            href="#converter"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all"
          >
            开始转换
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
          <a
            href="#guide"
            className="inline-flex items-center gap-2 bg-white/10 text-white font-medium px-6 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
          >
            查看使用指南
          </a>
        </div>
      </div>
    </header>
  );
}