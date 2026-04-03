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
  // 新增：基本的 APA 文本解析器（启发式，适用于常见期刊条目）
  const parseAPA = (text: string) => {
    const entries = text
      .split(/\n{2,}|(?=\r?\n●|\r?\n-\s)/) // 支持以空行或列表分隔
      .map((s) => s.trim())
      .filter(Boolean);

    const items: any[] = [];

    for (const entry of entries) {
      // 顶层：Authors. (Year[, Month[ Day]]). Rest
      const m = entry.match(/^(.+?)\s*\(\s*([^)]+)\s*\)\.\s*(.+)$/);
      if (!m) {
        continue;
      }

      let authorsPart = m[1].trim();
      const dateStr = m[2].trim();
      const rest = m[3].trim();

      // 处理作者省略号或 et al.
      authorsPart = authorsPart.replace(/(\.{3,}|…|et al\.?)/gi, '');

      // 提取年份和可选的月份/日
      let year: number | undefined;
      let month: number | undefined;
      const dateMatch = dateStr.match(/(\d{4})(?:\s*,\s*([A-Za-z]+)(?:\s*(\d{1,2}))?)?/);
      if (dateMatch) {
        year = parseInt(dateMatch[1], 10);
        if (dateMatch[2]) {
          // 尝试把月份文字转换为数字（简短映射）
          const months: any = { january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12 };
          const mname = dateMatch[2].toLowerCase();
          month = months[mname] || undefined;
        }
      }

      // 先提取 title（第一个句号之前）
      let title = '';
      let remainder = rest;
      const firstDot = rest.indexOf('.');
      if (firstDot !== -1) {
        title = rest.slice(0, firstDot).trim();
        remainder = rest.slice(firstDot + 1).trim();
      } else {
        title = rest;
        remainder = '';
      }

      // 识别会议/Proceedings 类型
      let container = '';
      let pages: string | undefined;
      let itemType = 'article-journal';

      if (/\bIn\b/i.test(remainder) || /Proceedings|Conference|Symposium|Proceeding/i.test(remainder)) {
        itemType = 'paper-conference';

        // 尝试抽取 container 名称
        const inMatch = remainder.match(/In\s+([^().,]+(?:[^()]*?))(?:\(|,|$)/i);
        if (inMatch) {
          container = inMatch[1].trim();
        } else {
          // 兜底把 remainder 整体作为 container
          container = remainder.replace(/^In\s+/i, '').trim();
        }

        // 提取 pp. 页码（可能在括号或直接出现）
        const ppMatch = remainder.match(/pp\.?\s*([0-9\-–—]+)/i) || remainder.match(/\((?:pp\.?\s*)?([0-9\-–—]+)\)/i);
        if (ppMatch) {
          pages = ppMatch[1].trim();
        }
      } else {
        // 期刊式条目：尝试从 remainder 中抽取 container, volume, issue, pages
        const jMatch = remainder.match(/^([^,]+),\s*([0-9]+)(?:\s*\(\s*([0-9]+)\s*\))?,?\s*(?:pp\.?\s*)?([0-9\-–—]+)?\.?$/);
        if (jMatch) {
          container = jMatch[1].trim();
          const volume = jMatch[2];
          const issue = jMatch[3];
          pages = jMatch[4];
          // pack volume/issue into remainder container if needed
          if (volume) container = container + (issue ? `, ${volume}(${issue})` : `, ${volume}`);
        } else {
          // 作为兜底，尝试从 remainder 中找到 pages
          const ppMatch = remainder.match(/pp\.?\s*([0-9\-–—]+)/i) || remainder.match(/([0-9\-–—]+)\.?$/);
          if (ppMatch) pages = ppMatch[1].trim();
          container = remainder.replace(/\(.*pp\.?[^)]*\)/i, '').trim();
        }
      }

      // 清理 pages 前缀
      if (pages) pages = pages.replace(/^pp\.?\s*/i, '');

      // 提取作者：匹配 "Last, F. M." 或用 &/and 分割
      const authors: any[] = [];
      const authorRegex = /([A-Za-z\\u4e00-\\u9fa5'`·-]+(?:\\s+[A-Za-z\\u4e00-\\u9fa5'`·-]+)*),\s*([^,;&]+)(?:,|&| and|$)/g;
      let aMatch;
      while ((aMatch = authorRegex.exec(authorsPart + ',')) !== null) {
        const family = aMatch[1].trim();
        const given = (aMatch[2] || '').replace(/\s+/g, ' ').replace(/\.$/, '').trim();
        authors.push({ family, given });
      }
      if (authors.length === 0) {
        const fallback = authorsPart.split(/\s+(?:&|and)\s+/).map((s) => s.trim()).filter(Boolean);
        for (const name of fallback) {
          const parts = name.split(/\s+/);
          const family = parts.pop() || name;
          const given = parts.join(' ');
          authors.push({ family, given });
        }
      }

      const item: any = {
        id: String(items.length + 1),
        type: itemType,
        title: title.replace(/\.$/, '').trim(),
        author: authors,
        'container-title': container || undefined,
        issued: year ? { 'date-parts': [[year].concat(month ? [month] : [])] } : undefined
      };
      if (pages) item.page = pages;

      items.push(item);
    }

    return items;
  };

  const handleConvert = () => {
    if (!isReady) return;
    try {
      // 优先尝试让 citation-js 自动识别输入（BibTeX 等）
      const cite = new Cite(input);
      const result = cite.format('bibliography', {
        format: 'html',
        template: outFormat,
        lang: outFormat === 'gb7714' ? 'zh-CN' : 'en-US'
      });
      setOutput(result);
      return;
    } catch (err) {
      // 如果自动识别失败，尝试解析为 APA 文本并转换
      try {
        const cslItems = parseAPA(input);
        if (cslItems.length === 0) throw new Error('无法解析 APA 条目');
        const cite = new Cite(cslItems);
        const result = cite.format('bibliography', {
          format: 'html',
          template: outFormat,
          lang: outFormat === 'gb7714' ? 'zh-CN' : 'en-US'
        });
        setOutput(result);
        return;
      } catch (e: any) {
        console.error("转换出错:", e);
        alert("转换失败。请确保输入的是标准的 BibTeX、APA 或 MLA 引用文本，或格式接近常见 APA 期刊条目。");
      }
    }
  };

  // 复制结果相关状态与方法
  const [copied, setCopied] = useState(false);

  const copyResult = async () => {
    if (!output) return;

    try {
      // Create a temporary element to extract plaintext from the HTML output
      const temp = document.createElement('div');
      temp.style.position = 'fixed';
      temp.style.left = '-9999px';
      temp.innerHTML = output;
      document.body.appendChild(temp);

      const text = temp.innerText || temp.textContent || output;

      // Prefer modern clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const range = document.createRange();
        range.selectNodeContents(temp);
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
        // execCommand may be deprecated but works as a fallback
        document.execCommand('copy');
        if (sel) sel.removeAllRanges();
      }

      document.body.removeChild(temp);

      // show transient confirmation
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制失败：浏览器不支持剪贴板写入或发生错误。');
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
            支持 <strong>BibTeX</strong> 一键转换为中国国家标准 <strong>GB/T 7714-2015</strong>、 <strong>APA</strong>、<strong>MLA</strong>。
            {/* 支持 <strong>APA</strong>、<strong>MLA</strong>、<strong>BibTeX</strong> 一键转换为中国国家标准 <strong>GB/T 7714-2015</strong>。 */}
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
                  {/* <option value="mla">MLA (第9版)</option> */}
                </select>
              </div>
              <div className="relative group">
                <div
                  className="w-full h-80 p-5 bg-blue-50/30 border-2 border-dashed border-blue-200 rounded-2xl overflow-y-auto prose prose-blue"
                  dangerouslySetInnerHTML={{ __html: output || '<p class="text-slate-400 italic">转换结果将在此实时预览...</p>' }}
                />
                {output && (
                  <button
                    onClick={copyResult}
                    className="absolute top-4 right-4 bg-white shadow-md hover:bg-slate-50 p-2 rounded-lg text-xs font-bold text-blue-600 transition"
                    aria-pressed={copied}
                    aria-live="polite"
                  >
                    {copied ? '已复制' : '复制结果'}
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

          {/* SEO 增强与用户指南板块 */}
          <section className="mt-12 border-t border-gray-200 pt-8 max-w-4xl mx-auto text-gray-600 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              GB/T 7714-2015 参考文献格式在线转换指南
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 左侧：专业知识介绍 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">为什么需要转换国标格式？</h3>
                <p className="text-sm leading-relaxed">
                  在撰写**毕业论文**或向国内核心期刊投稿时，**GB/T 7714-2015** 是强制要求的参考文献著录规则。
                  许多学术搜索引擎（如 Google Scholar）默认提供 **APA** 或 **MLA** 格式，
                  直接使用会导致论文格式审查不通过。使用 <strong>ConvertGB.shop</strong>，
                  您可以一键将 BibTeX、APA 文本转换为符合规范的[J]期刊、[M]专著等格式。
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-sm mb-2 text-blue-800">支持的文献类型标签：</h4>
                  <ul className="text-xs grid grid-cols-2 gap-2">
                    <li>• [J] 期刊文章 (Journal)</li>
                    <li>• [M] 普通图书 (Monograph)</li>
                    <li>• [D] 学位论文 (Dissertation)</li>
                    <li>• [N] 报纸文章 (Newspaper)</li>
                  </ul>
                </div>
              </div>

              {/* 右侧：操作步骤与引流词 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-600">如何获取 BibTeX 源码？</h3>
                <div className="space-y-3 text-sm">
                  <p><strong>知网 (CNKI)：</strong>进入文献详情页 → 点击“引用” → 选择 “BibTeX” 导出。</p>
                  <p><strong>百度学术：</strong>搜索文献 → 点击下方“引用” → 选择 “BibTeX”。</p>
                  <p><strong>Zotero/EndNote：</strong>右键点击文献 → 选择“导出条目” → 格式选择 BibTeX。</p>
                </div>
                <p className="text-xs text-gray-400 mt-4 italic">
                  * 提示：本工具采用纯前端解析技术，您的学术隐私数据绝不上传服务器，请放心使用。
                </p>
              </div>
            </div>

            {/* 底部 FAQ 增加长尾关键词覆盖 */}
            <div className="mt-8 border-t border-dashed border-gray-200 pt-6 mb-12">
              <h3 className="text-center font-bold mb-4">常见问题 (FAQ)</h3>
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <span className="bg-gray-100 px-3 py-1 rounded-full">#APA转国标2026最新</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">#MLA转GB7714</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">#BibTeX在线预览</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">#论文参考文献格式清洗</span>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}