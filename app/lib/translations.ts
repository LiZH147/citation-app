export type Lang = "zh" | "en";

export interface Translations {
  // Header
  siteTitle: string;
  navConvert: string;
  navGuide: string;
  navFAQ: string;
  heroTitle: string;
  heroDesc: string;
  heroCTA: string;
  heroGuide: string;

  // Converter
  converterTitle: string;
  converterSubtitle: string;
  outputFormat: string;
  gbt7714Label: string;
  apaLabel: string;
  clearBtn: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  converting: string;
  copyBtn: string;
  copiedBtn: string;

  // Privacy
  privacyTitle: string;
  privacyDesc: string;

  // Guide
  guideTitle: string;
  guideStep1Title: string;
  guideStep1Desc: string;
  guideStep2Title: string;
  guideStep2Desc: string;
  guideStep3Title: string;
  guideStep3Desc: string;
  formatTableTitle: string;
  formatTableInput: string;
  formatTableSource: string;
  formatTableOutput: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  faqRelatedSearch: string;
  faqs: { q: string; a: string }[];
  faqKeywords: string[];

  // Footer
  footerAbout: string;
  footerDesc: string;
  footerQuickLinks: string;
  footerDisclaimer: string;
  footerDisclaimerText: string;

  // Not found
  notFoundTitle: string;
  notFoundDesc: string;
  notFoundHome: string;

  // Error
  errorTitle: string;
  errorDesc: string;
  errorRetry: string;
  errorHome: string;

  // Loading
  loadingText: string;
}

const zh: Translations = {
  siteTitle: "ConvertGB",
  navConvert: "格式转换",
  navGuide: "使用指南",
  navFAQ: "常见问题",
  heroTitle: "参考文献格式转换器",
  heroDesc:
    "支持 BibTeX、APA、MLA 一键转换为中国国家标准 GB/T 7714-2015。兼容知网、百度学术、Zotero、EndNote 导出的引用格式，纯前端解析保障学术隐私安全。",
  heroCTA: "开始转换",
  heroGuide: "查看使用指南",

  converterTitle: "格式转换",
  converterSubtitle: "支持 BibTeX、APA、MLA 格式",
  outputFormat: "输出格式：",
  gbt7714Label: "GB/T 7714-2015（国标）",
  apaLabel: "APA（第7版）",
  clearBtn: "清空",
  inputPlaceholder: `请粘贴 BibTeX 源码或 APA/MLA 格式文本...

示例 BibTeX：
@article{zhang2026,
  author = {张三 and 李四},
  title = {深度学习在自然语言处理中的应用},
  journal = {软件学报},
  year = {2026},
  volume = {37},
  pages = {1-15}
}`,
  outputPlaceholder: "转换结果将在此显示...",
  converting: "转换中...",
  copyBtn: "复制结果",
  copiedBtn: "✓ 已复制",

  privacyTitle: "学术隐私安全保障",
  privacyDesc:
    "本工具采用纯前端解析技术，您的所有参考文献数据均在浏览器本地完成转换处理，绝不上传任何数据到服务器。您可以放心使用，无需担心学术隐私泄露。",

  guideTitle: "使用指南",
  guideStep1Title: "粘贴引用数据",
  guideStep1Desc:
    "将 Zotero、EndNote、百度学术或其他工具导出的 BibTeX / APA / MLA 格式文本粘贴至左侧输入区。",
  guideStep2Title: "选择目标格式",
  guideStep2Desc:
    "在顶部工具栏切换期望的输出格式：国标 GB/T 7714-2015 或 APA（第7版）。",
  guideStep3Title: "查看 / 复制结果",
  guideStep3Desc:
    "转换结果实时显示在右侧预览区，点击「复制结果」一键复制或直接参考。所有数据纯前端处理。",
  formatTableTitle: "支持的输入 / 输出格式",
  formatTableInput: "输入格式",
  formatTableSource: "来源 / 工具",
  formatTableOutput: "输出格式",

  faqTitle: "常见问题",
  faqSubtitle: "关于转换器使用的常见疑问",
  faqRelatedSearch: "相关搜索",
  faqs: [
    {
      q: "这个转换器支持哪些输入格式？",
      a: "目前支持 BibTeX（.bib 文件/文本）、APA（第7版）文本和 MLA 格式文本。您可以粘贴从 Zotero、EndNote、百度学术、Google Scholar 导出的引用数据，工具会自动识别并转换为目标格式。",
    },
    {
      q: "GB/T 7714-2015 和 APA 有什么区别？",
      a: "GB/T 7714-2015 是中国国家标准《信息与文献 参考文献著录规则》，广泛用于中文期刊和学位论文（如知网、万方、维普要求）。APA（American Psychological Association）第7版是英文论文常用的引用格式。两者在作者姓名展示、标点符号、著录顺序等方面有显著差异，本工具可在两者间一键切换。",
    },
    {
      q: "我的引用数据会被上传到服务器吗？",
      a: "不会。本工具采用纯前端处理技术，所有引用数据的解析和格式转换都在您的浏览器中完成，绝不将您的学术数据上传到任何服务器。您可以离线使用，学术隐私得到充分保障。",
    },
    {
      q: "如何处理包含中文作者的引用？",
      a: "中文姓名在 BibTeX 中通常以拼音或「姓, 名」的格式书写。本工具内置中文语言包，转换 GB/T 7714-2015 时能正确处理「等」「和」等中文称谓，以及「卷」「期」「页」等字段名称的本地化。",
    },
    {
      q: "输出结果可以复制到 Word 或 LaTeX 中吗？",
      a: "可以，点击「复制结果」按钮即可将格式化的参考文献复制到系统剪贴板，然后粘贴到 Word、WPS 或 LaTeX 编辑器中。输出的 HTML 格式保留粗体和斜体等排版标记。",
    },
    {
      q: "为什么转换后格式看起来不太对？",
      a: "请检查输入的引用数据是否完整——缺失的字段（如作者、期刊名、页码）会导致输出不完整。如果 BibTeX 文本格式不规范，请尝试在 Zotero 等工具中先做清理再粘贴。",
    },
  ],
  faqKeywords: [
    "#APA转国标",
    "#BibTeX转GB/T7714",
    "#MLA转GB7714",
    "#论文参考文献格式",
    "#国标参考文献",
    "#知网引用格式转换",
    "#Zotero国标输出",
    "#GB/T7714-2015",
    "#学术引用格式在线",
    "#参考文献排版工具",
  ],

  footerAbout: "ConvertGB",
  footerDesc:
    "免费在线参考文献格式转换工具，支持 BibTeX、APA、MLA 转换为国标 GB/T 7714-2015。纯前端解析，保障学术隐私安全。",
  footerQuickLinks: "快速链接",
  footerDisclaimer: "免责声明",
  footerDisclaimerText:
    "本工具仅供参考，请以学校或期刊的官方格式要求为准。GB/T 7714-2015 标准内容版权归国家标准化管理委员会所有。我们不收集、存储或传输您的任何数据。",

  notFoundTitle: "页面未找到",
  notFoundDesc:
    "您访问的页面不存在或已被移除。请检查 URL 是否正确，或返回首页使用参考文献格式转换工具。",
  notFoundHome: "返回首页",

  errorTitle: "页面出错了",
  errorDesc:
    "抱歉，页面加载过程中发生了一个错误。请尝试刷新页面，如果问题持续存在请联系我们。",
  errorRetry: "重试",
  errorHome: "返回首页",

  loadingText: "加载中...",
};

const en: Translations = {
  siteTitle: "ConvertGB",
  navConvert: "Converter",
  navGuide: "Guide",
  navFAQ: "FAQ",
  heroTitle: "Citation Format Converter",
  heroDesc:
    "Free online academic citation format converter. One-click conversion from BibTeX, APA, MLA to China National Standard GB/T 7714-2015. Compatible with CNKI, Google Scholar, Zotero, and EndNote exports. All processing happens locally — your academic privacy is protected.",
  heroCTA: "Start Converting",
  heroGuide: "View Guide",

  converterTitle: "Converter",
  converterSubtitle: "Supports BibTeX, APA, MLA formats",
  outputFormat: "Output:",
  gbt7714Label: "GB/T 7714-2015 (Chinese Standard)",
  apaLabel: "APA (7th Edition)",
  clearBtn: "Clear",
  inputPlaceholder: `Paste your BibTeX source or APA/MLA formatted text here...

Example BibTeX:
@article{doe2026,
  author = {Doe, John and Smith, Jane},
  title = {Deep Learning Applications in NLP},
  journal = {Journal of AI Research},
  year = {2026},
  volume = {37},
  pages = {1-15}
}`,
  outputPlaceholder: "Conversion result will appear here...",
  converting: "Converting...",
  copyBtn: "Copy Result",
  copiedBtn: "✓ Copied",

  privacyTitle: "Privacy Protected",
  privacyDesc:
    "This tool uses client-side processing only. All your citation data is converted locally in your browser — nothing is ever uploaded to any server. Use with confidence.",

  guideTitle: "How to Use",
  guideStep1Title: "Paste Citation Data",
  guideStep1Desc:
    "Paste BibTeX, APA, or MLA text exported from Zotero, EndNote, Google Scholar, or any reference manager into the left panel.",
  guideStep2Title: "Choose Output Format",
  guideStep2Desc:
    "Select your desired output format: GB/T 7714-2015 (Chinese National Standard) or APA (7th Edition).",
  guideStep3Title: "View & Copy Results",
  guideStep3Desc:
    "Results appear instantly in the right panel. Click \"Copy Result\" to copy all formatted references to your clipboard at once.",
  formatTableTitle: "Supported Input / Output Formats",
  formatTableInput: "Input Format",
  formatTableSource: "Source / Tool",
  formatTableOutput: "Output Format",

  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Common questions about the converter",
  faqRelatedSearch: "Related Searches",
  faqs: [
    {
      q: "What input formats does this converter support?",
      a: "It currently supports BibTeX (.bib files/text), APA (7th edition) text, and MLA formatted text. You can paste citation data exported from Zotero, EndNote, Google Scholar, and most reference managers — the tool will auto-detect the format and convert accordingly.",
    },
    {
      q: "What is the difference between GB/T 7714-2015 and APA?",
      a: "GB/T 7714-2015 is China's national standard \"Rules for Bibliographic Description of Information and Documentation\", widely used in Chinese-language journals and theses (CNKI, Wanfang, VIP databases). APA (7th edition) is the standard format for English-language academic papers. They differ significantly in author name presentation, punctuation, and entry ordering — this tool lets you switch between them with one click.",
    },
    {
      q: "Is my citation data uploaded to any server?",
      a: "No. This tool uses client-side processing exclusively. All citation parsing and formatting happens in your browser. No data is ever transmitted to any server. Your academic privacy is fully protected — the tool even works offline.",
    },
    {
      q: "How are Chinese author names handled?",
      a: "Chinese names in BibTeX are typically written in pinyin or as \"Family Name, Given Name\". The converter includes a Chinese locale pack and correctly handles Chinese conventions like \"等\" (et al.), \"和\" (and), as well as localized field labels like 卷 (Vol.), 期 (No.), 页 (pp.) when outputting GB/T 7714.",
    },
    {
      q: "Can I paste the output into Word or LaTeX?",
      a: "Yes. Click the \"Copy Result\" button to copy all formatted references to your clipboard, then paste directly into Word, Google Docs, WPS, or any LaTeX editor. The HTML output preserves formatting like bold and italics.",
    },
    {
      q: "Why does the output format look incorrect?",
      a: "Please check that your input citation data is complete — missing fields (author, journal name, pages) will result in incomplete output. If your BibTeX text has formatting issues, try cleaning it up in Zotero or another reference manager before pasting.",
    },
  ],
  faqKeywords: [
    "#APAtoGB7714",
    "#BibTeXtoChineseStandard",
    "#CitationFormatConverter",
    "#GB/T7714",
    "#AcademicReference",
    "#ReferenceFormatter",
  ],

  footerAbout: "ConvertGB",
  footerDesc:
    "Free online citation format converter — BibTeX, APA, MLA to GB/T 7714-2015. All processing happens locally in your browser.",
  footerQuickLinks: "Quick Links",
  footerDisclaimer: "Disclaimer",
  footerDisclaimerText:
    "This tool is for reference only. Please consult your institution's or journal's official formatting guidelines. GB/T 7714-2015 content copyright belongs to SAC. We do not collect, store, or transmit any of your data.",

  notFoundTitle: "Page Not Found",
  notFoundDesc:
    "The page you are looking for does not exist or has been removed. Please check the URL or return to the homepage.",
  notFoundHome: "Back to Home",

  errorTitle: "Something went wrong",
  errorDesc:
    "An error occurred while loading this page. Please try refreshing, or contact us if the issue persists.",
  errorRetry: "Try Again",
  errorHome: "Back to Home",

  loadingText: "Loading...",
};

const dict: Record<Lang, Translations> = { zh, en };

export function getTranslations(lang: string): Translations {
  return dict[lang as Lang] ?? zh;
}