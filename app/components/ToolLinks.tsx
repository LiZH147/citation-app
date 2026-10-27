import type { NavLink } from "@/app/components/Header";

interface Props {
  heading: string;
  subtitle?: string;
  items: NavLink[];
}

/**
 * 站内工具页内链区块。
 * 知识库：「内页与首页互链，让权重流动」「每一个内页都可以有三个到首页的链接」，
 * 同时提升「人均访问页面次数」这一用户行为指标。
 */
export default function ToolLinks({ heading, subtitle, items }: Props) {
  return (
    <section id="tools" className="max-w-5xl mx-auto px-4 py-12 md:py-16 border-t border-slate-200" aria-labelledby="tools-heading">
      <h2 id="tools-heading" className="text-2xl md:text-3xl font-extrabold text-center mb-3">{heading}</h2>
      {subtitle && <p className="text-center text-slate-500 mb-10 text-sm">{subtitle}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
          >
            <span className="block font-bold text-slate-800 mb-1 text-sm">{item.label}</span>
            <span className="block text-xs text-blue-600 font-medium">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
