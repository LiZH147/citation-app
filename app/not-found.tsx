import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-7xl font-extrabold text-blue-600/20 select-none">
          404
        </div>
        <h1 className="text-xl font-bold text-slate-800">页面未找到</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          您访问的页面不存在或已被移除。请检查 URL 是否正确，或返回首页使用参考文献格式转换工具。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}