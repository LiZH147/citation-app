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
  mlaLabel: string;
  chicagoLabel: string;
  harvardLabel: string;
  ieeeLabel: string;
  clearBtn: string;
  inputPlaceholder: string;
  outputPlaceholder: string;
  converting: string;
  copyBtn: string;
  copiedBtn: string;
  downloadBib: string;
  downloadRis: string;
  downloadTxt: string;
  doiPlaceholder: string;
  doiLookupBtn: string;
  doiLooking: string;
  inputFormatBibtex: string;
  inputFormatApa: string;
  inputFormatDoi: string;
  inputFormatCsl: string;
  inputFormatUnknown: string;
  manualEntryBtn: string;
  formTitle: string;
  formAuthor: string;
  formTitleField: string;
  formJournal: string;
  formYear: string;
  formVolume: string;
  formIssue: string;
  formPages: string;
  formGenerate: string;
  formCancel: string;
  recentTitle: string;
  recentEmpty: string;
  recentClearBtn: string;
  errorEmpty: string;
  errorParse: string;
  errorDoi: string;
  errorNetwork: string;
  viewFormatTabs: string;
  viewFormatGB: string;
  viewFormatAPA: string;
  viewFormatMLA: string;
  viewFormatChicago: string;
  viewFormatHarvard: string;
  viewFormatIEEE: string;
  viewFormatBibtex: string;

  // Pro
  proTitle: string;
  proSubtitle: string;
  proFreeName: string;
  proFreePrice: string;
  proFreeNote: string;
  proMonthlyName: string;
  proMonthlyPrice: string;
  proMonthlyNote: string;
  proLifetimeName: string;
  proLifetimePrice: string;
  proLifetimeNote: string;
  proFreeFeature1: string;
  proFreeFeature2: string;
  proFreeFeature3: string;
  proFeature1: string;
  proFeature2: string;
  proFeature3: string;
  proMonthlyBtn: string;
  proLifetimeBtn: string;
  proActivateTitle: string;
  proKeyPlaceholder: string;
  proActivateBtn: string;
  proActivating: string;
  proWhereKey: string;
  proActiveTitle: string;
  proActiveDesc: string;
  proRemoveBtn: string;
  proErrorInvalidKey: string;
  proErrorLimit: string;
  proErrorServer: string;
  proErrorNetwork: string;
  proErrorUnknown: string;
  proExpiredMsg: string;
  proInvalidMsg: string;
  proVerifyErrorMsg: string;
  proUploadBib: string;
  proUploadProOnly: string;
  proCurrentFree: string;
  proCurrentPro: string;

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
    "支持 BibTeX、APA 一键转换为中国国家标准 GB/T 7714-2015，也可直接输入 DOI 或 arXiv 编号自动抓取文献元数据。兼容知网、百度学术、Zotero、EndNote 导出的引用格式，纯前端解析保障学术隐私安全。",
  heroCTA: "开始转换",
  heroGuide: "查看使用指南",

  converterTitle: "格式转换",
  converterSubtitle: "支持 BibTeX / APA / DOI / arXiv 输入",
  outputFormat: "输出格式：",
  gbt7714Label: "GB/T 7714-2015（国标）",
  apaLabel: "APA（第7版）",
  mlaLabel: "MLA（第9版）",
  chicagoLabel: "Chicago（第17版·作者-日期）",
  harvardLabel: "Harvard",
  ieeeLabel: "IEEE",
  clearBtn: "清空",
  inputPlaceholder: `请粘贴 BibTeX 源码或 APA 格式文本...

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
  downloadBib: "下载 BibTeX",
  downloadRis: "下载 RIS",
  downloadTxt: "下载纯文本",
  doiPlaceholder: "粘贴 DOI 或论文 URL 自动查找...",
  doiLookupBtn: "查找",
  doiLooking: "查找中...",
  inputFormatBibtex: "BibTeX 格式",
  inputFormatApa: "APA 格式",
  inputFormatDoi: "DOI 标识",
  inputFormatCsl: "CSL-JSON 格式",
  inputFormatUnknown: "未知格式",
  manualEntryBtn: "手动录入",
  formTitle: "手动录入文献信息",
  formAuthor: "作者（逗号分隔格式：姓, 名）",
  formTitleField: "标题",
  formJournal: "期刊 / 会议名称",
  formYear: "发表年份",
  formVolume: "卷",
  formIssue: "期",
  formPages: "页码",
  formGenerate: "生成引用",
  formCancel: "取消",
  recentTitle: "最近转换",
  recentEmpty: "暂无转换记录",
  recentClearBtn: "清空记录",
  errorEmpty: "输入内容为空，请粘贴引用数据。",
  errorParse: "格式无法识别，请检查输入是否正确。",
  errorDoi: "未找到该 DOI 的文献信息。",
  errorNetwork: "网络请求失败，请检查网络后重试。",
  viewFormatTabs: "格式预览：",
  viewFormatGB: "GB/T 7714",
  viewFormatAPA: "APA",
  viewFormatMLA: "MLA",
  viewFormatChicago: "Chicago",
  viewFormatHarvard: "Harvard",
  viewFormatIEEE: "IEEE",
  viewFormatBibtex: "BibTeX",

  proTitle: "升级 Pro",
  proSubtitle: "批量转换 .bib 文件，保留更长的转换记录。",
  proFreeName: "免费版",
  proFreePrice: "$0",
  proFreeNote: "免费使用，无需注册",
  proMonthlyName: "Pro 按月",
  proMonthlyPrice: "$4.99/月",
  proMonthlyNote: "按月续费，随时取消",
  proLifetimeName: "Pro 买断",
  proLifetimePrice: "$19",
  proLifetimeNote: "一次付清，永久使用",
  proFreeFeature1: "全部 6 种输出格式",
  proFreeFeature2: "DOI 与 arXiv 查找",
  proFreeFeature3: "复制与下载（.bib / .ris / .txt）",
  proFeature1: "免费版全部功能",
  proFeature2: "批量转换：直接上传 .bib 文件",
  proFeature3: "100 条转换记录（免费版 20 条）",
  proMonthlyBtn: "按月订阅",
  proLifetimeBtn: "一次买断",
  proActivateTitle: "已有 Pro？输入激活码",
  proKeyPlaceholder: "粘贴你的激活码",
  proActivateBtn: "激活 Pro",
  proActivating: "激活中...",
  proWhereKey:
    "付款后，激活码会显示在订单确认页和邮箱收据里。粘贴到这里即可开通 Pro。",
  proActiveTitle: "Pro 已激活",
  proActiveDesc: "当前浏览器已解锁 Pro 功能。",
  proRemoveBtn: "移除激活码",
  proErrorInvalidKey:
    "激活码无效，请检查订单确认页或邮箱收据里的激活码后重试。",
  proErrorLimit:
    "该激活码已达到激活数量上限，请先在其他设备上移除，或联系客服。",
  proErrorServer: "服务器尚未配置激活功能，请稍后再试。",
  proErrorNetwork: "网络请求失败，请检查网络后重试。",
  proErrorUnknown: "激活失败，请稍后再试。",
  proExpiredMsg: "你的激活码已过期或被撤销，Pro 已关闭。",
  proInvalidMsg: "你的激活码已失效，Pro 已关闭。",
  proVerifyErrorMsg: "暂时无法验证激活码，Pro 保持开启（仅限本次浏览）。",
  proUploadBib: "上传 .bib 文件",
  proUploadProOnly: "上传 .bib 文件是 Pro 功能，请先升级。",
  proCurrentFree: "当前方案：免费版",
  proCurrentPro: "当前方案：Pro",

  privacyTitle: "学术隐私安全保障",
  privacyDesc:
    "本工具采用纯前端解析技术，您的所有参考文献数据均在浏览器本地完成转换处理，绝不上传任何数据到服务器。您可以放心使用，无需担心学术隐私泄露。",

  guideTitle: "使用指南",
  guideStep1Title: "粘贴引用数据",
  guideStep1Desc:
    "将 Zotero、EndNote、百度学术或其他工具导出的 BibTeX / APA 格式文本粘贴至左侧输入区。",
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
      a: "目前支持 BibTeX（.bib 文件/文本）、APA（第7版）文本，以及 DOI 和 arXiv 编号直接抓取。您可以粘贴从 Zotero、EndNote、百度学术、Google Scholar 导出的文献数据，工具会自动识别格式并转换为 GB/T 7714-2015 或 APA。",
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
    {
      q: "BibTeX 怎么免费转 APA 第 7 版？",
      a: "把 BibTeX 粘贴进转换器，输出格式选 APA（第 7 版），直接复制结果，不用注册也不用下载。@article、@book、@inproceedings 等条目类型一次解析完。字段对照和步骤见指南 convertgb.shop/zh/bibtex-to-apa。",
    },
    {
      q: "DOI 怎么自动转成 APA 引用？",
      a: "把 DOI（例如 10.1038/nature14539）粘贴到 DOI 查找框，工具自动向 Crossref 查询元数据，按 APA 第 7 版排版：作者、年份、题名、刊名、卷、期、页码和 DOI 链接一次生成。步骤见指南 convertgb.shop/zh/doi-to-apa。",
    },
    {
      q: "arXiv 论文怎么转成 IEEE 引用？",
      a: "可以。把 arXiv 文章页链接（例如 https://arxiv.org/abs/1706.03762）或 arXiv:1706.03762 粘贴到 DOI 查找框，工具从 arXiv 接口读取元数据，按 IEEE 排版：带编号的引用和 [Online]. Available 链接。只贴裸 ID（例如 1706.03762）识别不到，要带链接或 arXiv: 前缀。详细步骤见指南 convertgb.shop/zh/arxiv-to-ieee。",
    },
    {
      q: "怎么批量转换 BibTeX 文献？",
      a: "把整段 .bib 文本粘贴进转换器，一次解析全部条目，按选定的输出格式一次出结果。如果想直接上传文件，上传 .bib 文件按钮是 Pro 功能，Pro 历史记录也从 20 条延长到 100 条。批量做法见指南 convertgb.shop/zh/batch-convert-bibtex。",
    },
    {
      q: "ConvertGB 能替代 Zotero 吗？",
      a: "不能——它不是文献管理软件，不替代 Zotero。ConvertGB 是一个免安装的格式转换器，只做一件事：把 BibTeX、APA 文本、DOI 和 arXiv 链接转成 APA、MLA、Chicago、Harvard、IEEE 或 GB/T 7714。它和 Zotero 配合用：从 Zotero 导出 BibTeX，在这里转换，再把结果下载为 .bib 或 .ris 导回 Zotero 或 EndNote。",
    },
  ],
  faqKeywords: [
    "#APA转国标",
    "#BibTeX转GB/T7714",
    "#DOI转国标",
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
    "免费在线参考文献格式转换工具，支持 BibTeX、APA 转换为国标 GB/T 7714-2015，也可用 DOI / arXiv 自动抓取元数据。纯前端解析，保障学术隐私安全。",
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
    "Free online citation format converter. One-click conversion from BibTeX or APA to APA 7th, MLA 9th, Chicago 17th (Author-Date), Harvard, IEEE, or China National Standard GB/T 7714-2015, with DOI and arXiv lookup. Compatible with Google Scholar, Zotero, and EndNote exports. All processing happens locally — your academic privacy is protected.",
  heroCTA: "Start Converting",
  heroGuide: "View Guide",

  converterTitle: "Converter",
  converterSubtitle: "Accepts BibTeX, APA, DOI and arXiv",
  outputFormat: "Output:",
  gbt7714Label: "GB/T 7714-2015 (Chinese Standard)",
  apaLabel: "APA (7th Edition)",
  mlaLabel: "MLA (9th Edition)",
  chicagoLabel: "Chicago (17th ed., Author-Date)",
  harvardLabel: "Harvard",
  ieeeLabel: "IEEE",
  clearBtn: "Clear",
  inputPlaceholder: `Paste your BibTeX source or APA formatted text here...

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
  downloadBib: "Download BibTeX",
  downloadRis: "Download RIS",
  downloadTxt: "Download Text",
  doiPlaceholder: "Paste DOI or paper URL to auto-lookup...",
  doiLookupBtn: "Lookup",
  doiLooking: "Looking up...",
  inputFormatBibtex: "BibTeX",
  inputFormatApa: "APA Format",
  inputFormatDoi: "DOI",
  inputFormatCsl: "CSL-JSON",
  inputFormatUnknown: "Unknown Format",
  manualEntryBtn: "Manual Entry",
  formTitle: "Enter Citation Details",
  formAuthor: "Authors (comma-separated: Family, Given)",
  formTitleField: "Title",
  formJournal: "Journal / Conference",
  formYear: "Year",
  formVolume: "Volume",
  formIssue: "Issue",
  formPages: "Pages",
  formGenerate: "Generate Citation",
  formCancel: "Cancel",
  recentTitle: "Recent Conversions",
  recentEmpty: "No conversion history yet",
  recentClearBtn: "Clear History",
  errorEmpty: "Input is empty. Please paste citation data.",
  errorParse: "Unable to parse the input format. Please check and try again.",
  errorDoi: "Could not find metadata for this DOI.",
  errorNetwork: "Network request failed. Please check your connection.",
  viewFormatTabs: "Preview: ",
  viewFormatGB: "GB/T 7714",
  viewFormatAPA: "APA",
  viewFormatMLA: "MLA",
  viewFormatChicago: "Chicago",
  viewFormatHarvard: "Harvard",
  viewFormatIEEE: "IEEE",
  viewFormatBibtex: "BibTeX",

  proTitle: "Upgrade to Pro",
  proSubtitle: "Batch-convert .bib files and keep a longer conversion history.",
  proFreeName: "Free",
  proFreePrice: "$0",
  proFreeNote: "Free forever, no sign-up",
  proMonthlyName: "Pro Monthly",
  proMonthlyPrice: "$4.99/mo",
  proMonthlyNote: "Billed monthly, cancel anytime",
  proLifetimeName: "Pro Lifetime",
  proLifetimePrice: "$19",
  proLifetimeNote: "One-time payment, yours forever",
  proFreeFeature1: "All 6 output styles",
  proFreeFeature2: "DOI & arXiv lookup",
  proFreeFeature3: "Copy & download (.bib / .ris / .txt)",
  proFeature1: "Everything in Free",
  proFeature2: "Batch conversion — upload .bib files directly",
  proFeature3: "100-item conversion history (Free keeps 20)",
  proMonthlyBtn: "Subscribe monthly",
  proLifetimeBtn: "Buy lifetime",
  proActivateTitle: "Already bought Pro? Enter your license key",
  proKeyPlaceholder: "Paste your license key",
  proActivateBtn: "Activate Pro",
  proActivating: "Activating...",
  proWhereKey:
    "After checkout, your license key appears on the order confirmation page and in your email receipt. Paste it here to unlock Pro.",
  proActiveTitle: "Pro is active",
  proActiveDesc: "This browser has Pro unlocked.",
  proRemoveBtn: "Remove license key",
  proErrorInvalidKey:
    "This license key is invalid. Check the key on your order confirmation page or email receipt and try again.",
  proErrorLimit:
    "This license key has reached its activation limit. Remove it from another device first, or contact support.",
  proErrorServer:
    "License activation is not configured on the server yet. Please try again later.",
  proErrorNetwork: "Network request failed. Please check your connection.",
  proErrorUnknown: "Activation failed. Please try again later.",
  proExpiredMsg:
    "Your license key was revoked or expired, so Pro has been turned off.",
  proInvalidMsg:
    "Your license key is no longer valid, so Pro has been turned off.",
  proVerifyErrorMsg:
    "Could not verify your license key right now. Pro stays on for this session only.",
  proUploadBib: "Upload .bib file",
  proUploadProOnly: "Uploading .bib files is a Pro feature — upgrade below.",
  proCurrentFree: "Current plan: Free",
  proCurrentPro: "Current plan: Pro",

  privacyTitle: "Privacy Protected",
  privacyDesc:
    "This tool uses client-side processing only. All your citation data is converted locally in your browser — nothing is ever uploaded to any server. Use with confidence.",

  guideTitle: "How to Use",
  guideStep1Title: "Paste Citation Data",
  guideStep1Desc:
    "Paste BibTeX or APA text exported from Zotero, EndNote, Google Scholar, or any reference manager into the left panel.",
  guideStep2Title: "Choose Output Format",
  guideStep2Desc:
    "Select your desired output format: APA (7th Edition), MLA (9th Edition), Chicago 17th (Author-Date), Harvard, IEEE, or GB/T 7714-2015.",
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
      a: "It currently supports BibTeX (.bib files/text) and APA (7th edition) text, plus DOI and arXiv IDs that are fetched automatically. You can paste reference data exported from Zotero, EndNote, Google Scholar, and most reference managers — the tool detects the format and converts it to APA, MLA, Chicago, Harvard, IEEE, or GB/T 7714-2015.",
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
    {
      q: "How do I convert BibTeX to APA 7th format online for free?",
      a: "Paste your BibTeX into the converter, choose APA (7th edition) as the output format, and copy the result — no account or download needed. @article, @book, @inproceedings and other entry types are parsed in one pass. For a field-by-field walkthrough, see the guide at convertgb.shop/en/bibtex-to-apa.",
    },
    {
      q: "How do I convert a DOI to an APA citation automatically?",
      a: "Paste the DOI (for example 10.1038/nature14539) into the DOI lookup box. The tool fetches the metadata from Crossref and formats it as APA 7th edition automatically — author, year, title, journal, volume, issue, pages and the DOI link. The step-by-step guide is at convertgb.shop/en/doi-to-apa.",
    },
    {
      q: "Can I convert arXiv papers into IEEE citations?",
      a: "Yes. Paste the arXiv page URL (for example https://arxiv.org/abs/1706.03762) or arXiv:1706.03762 into the DOI lookup box — the tool reads the metadata from the arXiv API and formats it as IEEE, with a numbered reference and an [Online]. Available link. A bare ID alone (1706.03762) is not recognised. The full walkthrough is at convertgb.shop/en/arxiv-to-ieee.",
    },
    {
      q: "How do I batch convert BibTeX references?",
      a: "Paste your whole .bib text into the converter and it converts every entry in one pass, in whichever output format you choose. If you would rather upload the file itself, the .bib file upload button is a Pro feature — Pro also keeps 100 history items instead of 20. The batch guide is at convertgb.shop/en/batch-convert-bibtex.",
    },
    {
      q: "Is ConvertGB an alternative to Zotero?",
      a: "No — it is not a reference manager and does not replace Zotero. ConvertGB is a no-install format converter for one job: turning BibTeX, APA text, DOIs and arXiv links into APA, MLA, Chicago, Harvard, IEEE or GB/T 7714 output. It works alongside Zotero: export BibTeX from Zotero, convert it here, and download the result as .bib or .ris to bring it back into Zotero or EndNote.",
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
    "Free online citation converter — BibTeX or APA to APA, MLA, Chicago, Harvard, IEEE, or GB/T 7714-2015, with DOI and arXiv lookup. All processing happens locally in your browser.",
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