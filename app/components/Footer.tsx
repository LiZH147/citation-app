export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* 关于 */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">ConvertGB</h4>
            <p className="text-xs leading-relaxed">
              免费在线参考文献格式转换工具，支持 BibTeX、APA、MLA 转换为国标
              GB/T 7714-2015。纯前端解析，保障学术隐私安全。
            </p>
          </div>

          {/* 导航 */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">快速链接</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#converter" className="hover:text-white transition-colors">
                  格式转换
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-white transition-colors">
                  使用指南
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-white transition-colors">
                  网站地图
                </a>
              </li>
            </ul>
          </div>

          {/* 免责声明 */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">免责声明</h4>
            <p className="text-xs leading-relaxed">
              本工具仅供参考，请以学校或期刊的官方格式要求为准。
              GB/T 7714-2015 标准内容版权归国家标准化管理委员会所有。
              我们不收集、存储或传输您的任何数据。
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {year} ConvertGB. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Next.js
            </a>{" "}
            &amp;{" "}
            <a
              href="https://citation.js.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Citation.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}