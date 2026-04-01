"use client";
import { useState, useEffect, useRef } from 'react';
import { Cite, plugins } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-csl';

export default function FixedConverter() {
  //   const [input, setInput] = useState(`@article{example2026,
  //   author = {张三 and 李四},
  //   title = {Next.js 在 SEO 自动化中的应用研究},
  //   journal = {软件学报},
  //   year = {2026},
  //   volume = {37},
  //   pages = {1-15}
  // }`);  
  const [input, setInput] = useState(``);
  const [output, setOutput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const hasRegistered = useRef(false);

  useEffect(() => {
    async function initCSL() {
      try {
        // 1. 获取 CSL 文件
        const resStyle = await fetch('/gb7714.csl');
        const cslText = await resStyle.text();

        // 2. 获取中文语言包 (这是解决 'strings' undefined 的关键)
        // citation-js 需要知道如何处理“页”、“卷”等中文词汇
        const resLocale = await fetch('https://raw.githubusercontent.com/citation-style-language/locales/master/locales-zh-CN.xml');
        const localeText = await resLocale.text();

        const config = plugins.config.get('@csl');

        if (config && !hasRegistered.current) {
          // 3. 注册语言包
          config.locales.add('zh-CN', localeText);
          // 4. 注册模版
          config.templates.add('gb7714', cslText);

          hasRegistered.current = true;
          console.log("语言包与模版注册成功");
        }
        setIsReady(true);
      } catch (err) {
        console.error("初始化失败:", err);
      }
    }
    initCSL();
  }, []);

  // 在原有 useState 中增加格式状态
  const [outFormat, setOutFormat] = useState('gb7714'); // 默认输出国标

  const handleConvert = () => {
    if (!isReady) return;
    try {
      // Citation-js 强大之处在于它可以自动识别输入的文本是 BibTeX 还是其他格式
      const cite = new Cite(input);

      const result = cite.format('bibliography', {
        format: 'html',
        template: outFormat, // 动态选择模版：'gb7714', 'apa', 或 'mla'
        lang: outFormat === 'gb7714' ? 'zh-CN' : 'en-US'
      });

      setOutput(result);
    } catch (e: any) {
      console.error("转换出错:", e);
      alert("转换失败。请确保输入的是标准的 BibTeX、APA 或 MLA 引用文本。");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">

        {/* Header: 包含核心关键词 */}
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 p-10 text-white text-center">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            学术论文参考文献格式转换工具
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            支持 <strong>APA</strong>、<strong>MLA</strong>、<strong>BibTeX</strong> 一键转换为中国国家标准 <strong>GB/T 7714-2015</strong>。
          </p>
        </header>

        <main className="p-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* 输入端 */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold text-slate-800">1. 输入原始文献</h2>
                <span className="text-sm text-slate-500">支持自动识别格式</span>
              </div>
              <textarea
                className="w-full h-80 p-5 border-2 border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-mono text-sm"
                placeholder="请粘贴 BibTeX 源码，或 APA/MLA 格式的文本..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* 输出端 */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <h2 className="text-xl font-bold text-slate-800">2. 选择输出目标</h2>
                <select
                  className="bg-white border border-slate-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                  value={outFormat}
                  onChange={(e) => setOutFormat(e.target.value)}
                >
                  <option value="gb7714">GB/T 7714 (国标数字制)</option>
                  <option value="apa">APA (第7版)</option>
                  <option value="mla">MLA (第9版)</option>
                </select>
              </div>
              <div className="relative group">
                <div
                  className="w-full h-80 p-5 bg-blue-50/30 border-2 border-dashed border-blue-200 rounded-2xl overflow-y-auto prose prose-blue"
                  dangerouslySetInnerHTML={{ __html: output || '<p class="text-slate-400 italic">转换结果将在此实时预览...</p>' }}
                />
                {output && (
                  <button
                    onClick={() => {/* 复制逻辑 */ }}
                    className="absolute top-4 right-4 bg-white shadow-md hover:bg-slate-50 p-2 rounded-lg text-xs font-bold text-blue-600 transition"
                  >
                    复制结果
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleConvert}
            className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl text-xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98]"
          >
            立即开始格式转换
          </button>
        </main>

        {/* SEO 深度内容区 - 这部分对 Google 排名极其重要 */}
        <article className="bg-slate-50 p-10 border-t border-slate-200 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">为什么需要进行参考文献格式转换？</h2>
            <p className="text-slate-600 leading-relaxed">
              在学术写作中，不同的期刊和学校对引用格式有严格要求。<strong>APA 格式</strong>（美国心理学会）常用于社会科学领域；<strong>MLA 格式</strong>（美国现代语言协会）则多见于人文学科；而 <strong>GB/T 7714</strong> 是中国学术界通用的国家标准。手动修改这些格式不仅费时费力，还容易出现标点符号错误。
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-blue-800 mb-2">APA 转 GB/T 7714</h3>
              <p className="text-slate-500">自动将 (Author, Year) 格式转换为国标所需的顺序编码制 [1]。</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-blue-800 mb-2">MLA 转 GB/T 7714</h3>
              <p className="text-slate-500">处理作者名缩写、出版项位置，确保符合国标 GB/T 7714-2015 规范。</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-blue-800 mb-2">批量转换 BibTeX</h3>
              <p className="text-slate-500">支持从 Zotero 或知网导出的 BibTeX 数据进行大规模格式清洗。</p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}