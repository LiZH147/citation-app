import type { LongformSet } from "./types";

/**
 * 中文长尾落地页正文（一页一词）。
 * 事实基准：GB/T 7714-2015《信息与文献 参考文献著录规则》。
 * 只描述本站真实能力：BibTeX / APA / DOI / arXiv 输入，
 * GB/T 7714-2015（顺序编码制）、APA（第7版）、MLA（第9版）、
 * Chicago（第17版·作者-日期）、Harvard、IEEE、BibTeX 输出；纯前端解析。
 */
const zh: LongformSet = {
  "bibtex-to-gb7714": {
    slug: "bibtex-to-gb7714",
    keyword: "BibTeX 转 GB/T 7714",
    title: "BibTeX 转 GB/T 7714：字段与标识码对照",
    description:
      "BibTeX 转 GB/T 7714 的卡点全在 author、pages、year 三处。附 @article、@book 到 [J]、[M] 的标识码映射表与字段对照表，可逐条自查。",
    h1: "BibTeX 转 GB/T 7714：字段逐项拆解",
    intro:
      "从 Zotero、EndNote 或 Google Scholar 导出的 .bib 文件，字段名跟国标不是一一对应的。BibTeX 转 GB/T 7714 真正要处理四件事：类型换标识码、作者串重排、页码双连字符改单短横、期刊补卷期。",
    sections: [
      {
        h2: "BibTeX 转 GB/T 7714 最容易错位的地方",
        paragraphs: [
          "author 字段用 and 连接多位作者，标准要写成「李炳穆, 张三」这种逗号分隔形态，把 and 直译成「和」是最高频的错误。",
          "pages = {6--12} 的双连字符要改成单短横 6-12，这是 BibTeX 转 GB/T 7714 里最容易被忽略的一处。citation key 如 li2008korea 在标准里没有位置，整条丢弃，别塞进题名或 note。",
        ],
      },
      {
        h2: "条目类型到文献类型标识码的对应关系",
        paragraphs: [
          "标识码写在题名之后、出版项之前，方括号内单个大写字母，前后不加空格。转换器判定类型看的是 @ 后面的条目名，不是 title 里出现的词。",
          "同一份 .bib 里混着 @article、@inproceedings、@phdthesis 是常态，BibTeX 转 GB/T 7714 时按表逐条核对比通读全文快得多。",
        ],
        table: {
          headers: ["BibTeX 条目", "对应文献", "标识码", "题名后写法"],
          rows: [
            ["@article", "期刊论文", "[J]", "题名[J]"],
            ["@inproceedings", "会议录中析出文献", "[C]", "题名[C]"],
            ["@book", "专著", "[M]", "题名[M]"],
            ["@phdthesis", "学位论文", "[D]", "题名[D]"],
            ["@techreport", "科技报告", "[R]", "题名[R]"],
            ["@misc / @online", "电子公告、其他", "[EB/OL] 或 [Z]", "题名[EB/OL]"],
          ],
        },
      },
      {
        h2: "字段级映射：BibTeX 字段落到哪个著录项",
        paragraphs: [
          "著录项顺序是固定的：主要责任者. 题名[标识码]. 出版项. 每个字段只能落进一个坑位，落错位置比写错标点更难查。",
          "volume 和 number 要合并成卷(期)，52 卷 6 期写作 52(6)，中间没有空格。doi 不属于出版项，统一放到整条末尾。",
        ],
        table: {
          headers: ["BibTeX 字段", "GB/T 7714 著录位", "写法要点"],
          rows: [
            ["author", "主要责任者", "超过 3 人取前 3，其后加「, 等」"],
            ["title", "题名", "首词首字母大写，不加引号"],
            ["journal", "刊名", "期刊条目必填"],
            ["booktitle", "会议录名", "[C] 条目用它替代刊名"],
            ["volume / number", "卷 / 期", "写作 52(6)"],
            ["pages", "起止页码", "单短横，如 6-12"],
            ["address / publisher", "出版地 / 出版者", "专著条目必需"],
            ["doi", "条目末尾", "写作 DOI: 10.xxxx/xxxx"],
          ],
        },
      },
      {
        h2: "从 .bib 到成稿的四步操作",
        paragraphs: [
          "整条流程在浏览器里就能走完，.bib 内容不上传服务器、不进数据库，也不需要注册账号。",
          "转换器同时支持 BibTeX、APA 文本、DOI、arXiv 四种输入，输出 GB/T 7714-2015 顺序编码制、APA、BibTeX 三种。",
        ],
        list: [
          "在 Zotero 里选中条目，右键「导出条目…」，格式选 BibTeX，只勾元数据，不勾笔记和附件。",
          "把 .bib 全文粘进 BibTeX 输入框，@ 开头的行和末尾大括号都要保留。",
          "输出制式选「GB/T 7714-2015 顺序编码制」，转换后逐条看题名后缀的标识码。",
          "下载 .txt 贴进 Word，或导出 .ris 回到文献管理软件继续排版。",
        ],
      },
      {
        h2: "责任者：三个人以上怎么截断",
        paragraphs: [
          "超过 3 个时只著录前 3 个，其后加「, 等」；英文文献对应加「, et al」。",
          "姓名带 von、Jr.，或者干脆是机构名的，要在 .bib 里用花括号保护，否则会被 and 规则拆开，出现半个作者名。",
        ],
        list: [
          "3 位以内全部著录，用逗号分隔。",
          "超过 3 位取前 3 位，中文加「, 等」。",
          "英文文献加「, et al」，al 后面不加缩写点。",
          "西文著者姓前名后、名用缩写不加缩写点，写 Smith J 而非 Smith J.。",
        ],
      },
      {
        h2: "转换器补不回来的部分",
        paragraphs: [
          "中文期刊在 Google Scholar 导出时常只给 year，不给 volume 和 number，这种情况只能回原刊页面手工补。",
          "在线优先出版、暂时没有页码的，保留 DOI 并把标识码改成 [J/OL]，这是标准里唯一能表达「只有网络版」的写法。",
        ],
      },
    ],
    faqs: [
      {
        q: "BibTeX 里的 and 会不会被吃掉？",
        a: "不会。and 会被识别成作者分隔符并替换为逗号；但如果作者名本身含 and（例如机构名 Bell and Howell），必须在 .bib 里用花括号包住，否则会被拆成两个作者。",
      },
      {
        q: "作者超过三个人，转换时会自动加「等」吗？",
        a: "会。中文文献补「, 等」，英文文献补「, et al」，缩写点只出现在 al 之前，al 之后不加点。",
      },
      {
        q: "arXiv 预印本怎么标注？",
        a: "标准没有专门的预印本标识码。常见做法是按 @misc 转成 [EB/OL]，在题名后补 arXiv 编号与引用日期，例如 arXiv:2301.00001[EB/OL]。",
      },
      {
        q: "@article 里没有 pages 字段怎么办？",
        a: "期刊条目必须著录起止页码，缺了就回原文补；确实没有页码的在线优先出版，把标识码改成 [J/OL] 并保留 DOI。",
      },
      {
        q: "转换出来的 [J] 上标序号怎么排？",
        a: "顺序编码制按正文首次引用先后编号，正文用上标 [1]，文后列表同序排列，不要按作者姓氏字母重排。",
      },
      {
        q: ".bib 里中文作者是拼音，能自动还原成汉字吗？",
        a: "不能。拼音和汉字之间没有可逆映射，需要逐条改回汉字姓名后再转换。",
      },
    ],
    relatedSlugs: ["gb7714-format", "zotero-gb7714", "doi-to-gb7714"],
    ctaPrimary: "粘贴 .bib，直接转成 GB/T 7714",
    ctaSecondary: "看 GB/T 7714-2015 格式完整说明",
    updated: "2026-10-27",
  },

  "apa-to-gb7714": {
    slug: "apa-to-gb7714",
    keyword: "APA 转 GB/T 7714",
    title: "APA 转 GB/T 7714：作者与年份改法",
    description:
      "APA 转 GB/T 7714 的关键在作者串与年份位置。逐项对照替换分隔符、补 [J]/[M] 标识码、区分 en dash 与短横，附三种成品范例。",
    h1: "APA 转 GB/T 7714：逐项对照表",
    intro:
      "APA 第 7 版和国标是两套逻辑。APA 把年份提到作者后面用括号夹住，顺序编码制把年份放回出版项，正文只留上标序号。APA 转 GB/T 7714 改的不是排版，是著录项次序和标点约定。",
    sections: [
      {
        h2: "APA 转 GB/T 7714 要动的六个位置",
        paragraphs: [
          "作者串是第一处。APA 写 Smith, J., & Lee, K.，姓在前、名缩写带点、末位前加 &；标准要 Smith J, Lee K，去掉缩写点，用逗号分隔，不用 &。",
          "年份是第二处，APA 的 (2020) 紧跟作者，标准里年份属于出版项。第三处是题名：标准只要求首词首字母大写，且题名后必须紧跟 [J]、[M] 这类标识码。",
        ],
      },
      {
        h2: "APA 与 GB/T 7714 逐项对照",
        paragraphs: [
          "两套格式放进一张表最快，这也是 APA 转 GB/T 7714 手工核对时最省事的自查方式。",
          "注意 APA 的页码用 en dash（6–12），标准用普通短横（6-12），肉眼几乎看不出区别，但字符编码不同，Word 里搜「–」能全部找出来。",
        ],
        table: {
          headers: ["著录项", "APA 第 7 版", "GB/T 7714-2015"],
          rows: [
            ["主要责任者", "Smith, J., & Lee, K.", "Smith J, Lee K"],
            ["年份位置", "(2020). 紧跟作者", "放进出版项：北京: 科学出版社, 2020"],
            ["题名", "句首大写，无标识码", "首词大写，题名后加 [J]/[M]"],
            ["期刊卷期", "52(6)", "52(6)"],
            ["页码连接符", "6–12（en dash）", "6-12（短横）"],
            ["DOI 写法", "https://doi.org/10.xxxx", "DOI: 10.xxxx/xxxx"],
            ["文献表排序", "按作者姓氏字母", "顺序编码制按引用先后"],
          ],
        },
      },
      {
        h2: "三种常见文献的成品长什么样",
        paragraphs: [
          "标准对不同类型要求不同，对着成品抄比自己推规则可靠。学位论文的出版项位置放的是保存地和保存者，不是出版社。",
          "这一条最常被从 APA 迁移过来的作者写错，一旦写成出版社就整条不合规。",
        ],
        list: [
          "期刊：李炳穆. 韩国图书馆法[J]. 图书情报工作, 2008, 52(6): 6-12.",
          "专著：主要责任者. 题名[M]. 出版地: 出版者, 出版年: 页码.",
          "学位论文：主要责任者. 题名[D]. 保存地: 保存者, 年份.",
        ],
      },
      {
        h2: "把 APA 文本喂进转换器的三步",
        paragraphs: [
          "APA 转 GB/T 7714 的输入框只认纯文本，参考文献列表按条换行粘贴即可，条目之间的空行不影响解析。",
          "转换完重点看三样：& 有没有清干净、en dash 有没有换成短横、题名后有没有补上标识码。",
        ],
        list: [
          "复制论文末尾的参考文献段落，每条占一行。",
          "输出制式选「GB/T 7714-2015 顺序编码制」，点转换。",
          "用浏览器查找功能搜「& 」和「–」，确认两类字符都已消失。",
          "下载 .txt 贴回 Word，再用查找替换把上标序号统一成 [1] 形式。",
        ],
      },
      {
        h2: "作者数量：APA 的 20 人规则与前 3 人",
        paragraphs: [
          "APA 第 7 版文后文献表最多列 20 位作者，超过 20 位列前 19 位、加省略号、再列最后一位。GB/T 7714-2015 只列前 3 位，其后加「, 等」或「, et al」。",
          "从 APA 转过来时作者列表几乎一定要截断。判断用「等」还是「et al」看文献语种，不看作者国籍。",
        ],
      },
      {
        h2: "顺序编码制还是著者-出版年制",
        paragraphs: [
          "标准允许两种编排。顺序编码制正文用上标 [1]，文后按引用先后排；著者-出版年制正文写 (李炳穆, 2008)，文后按著者字顺排。",
          "APA 天然接近著者-出版年制，很多人因此选错。国内期刊和学位论文九成要顺序编码制，投稿前先翻投稿须知那一行字。",
        ],
      },
    ],
    faqs: [
      {
        q: "APA 里的 & 转成国标后还要保留吗？",
        a: "不保留。GB/T 7714-2015 用逗号分隔责任者，& 不应出现在标准条目里。",
      },
      {
        q: "年份到底放作者后面还是出版项里？",
        a: "顺序编码制放出版项（刊名或出版者之后）；著者-出版年制才把年份跟在著者之后并加圆括号。两种编排不能混。",
      },
      {
        q: "作者 5 个人，APA 全列，国标只列 3 个，会丢信息吗？",
        a: "不算丢。标准就是这样规定的，前 3 位加「, 等」即为完整著录，读者可凭题名和刊名回查原文。",
      },
      {
        q: "APA 的页码横线和国标的短横有区别吗？",
        a: "有。APA 用 en dash（U+2013），标准用普通连字符，长度和字符编码都不同，Word 里搜「–」就能找出来替换。",
      },
      {
        q: "在线优先出版的 APA 条目怎么转？",
        a: "保留 DOI，把标识码写成 [J/OL]，并按标准补引用日期和获取路径。",
      },
    ],
    relatedSlugs: ["gb7714-format", "bibtex-to-gb7714", "doi-to-gb7714"],
    ctaPrimary: "粘贴 APA 文本，转成 GB/T 7714",
    ctaSecondary: "对照 GB/T 7714-2015 著录项",
    updated: "2026-10-27",
  },

  "gb7714-format": {
    slug: "gb7714-format",
    keyword: "GB/T 7714-2015 格式",
    title: "GB/T 7714-2015 格式：标识码与著录项",
    description:
      "GB/T 7714-2015 格式速查：十五个文献类型标识码、载体标识、四类成品范例，以及顺序编码制与著者-出版年制的区别和标点细节。",
    h1: "GB/T 7714-2015 格式：一页看懂",
    intro:
      "GB/T 7714-2015 格式的全称是《信息与文献 参考文献著录规则》，2015 年 12 月 1 日实施。它只规定两件事：一条参考文献由哪些著录项构成，这些著录项按什么顺序、用什么标点排。",
    sections: [
      {
        h2: "GB/T 7714-2015 格式的著录项骨架",
        paragraphs: [
          "期刊条目结构：主要责任者. 题名[J]. 刊名, 年, 卷(期): 起止页码. 著录项之间用「. 」或「, 」连接，句点后留一个西文空格。",
          "专著换成：主要责任者. 题名[M]. 出版地: 出版者, 出版年: 页码. 学位论文的出版项放保存地和保存者，前面的责任者与题名结构完全一致。",
        ],
      },
      {
        h2: "文献类型标识码全表",
        paragraphs: [
          "标识码写在题名之后，方括号内单个大写字母，前后不加空格。它是判断文献类型的唯一依据，写错标识码比写错标点更致命。",
          "常用的是 [J]、[M]、[D]、[C]，但 GB/T 7714-2015 格式里一共列了十五种，[DB]、[CP]、[DS] 这几类是近年才用得多起来的。",
        ],
        table: {
          headers: ["标识码", "文献类型", "典型场景"],
          rows: [
            ["[M]", "专著", "图书、编著"],
            ["[C]", "论文集、会议录", "会议论文集中的析出文献"],
            ["[N]", "报纸", "报纸文章"],
            ["[J]", "期刊", "期刊论文"],
            ["[D]", "学位论文", "硕士学位论文、博士学位论文"],
            ["[R]", "报告", "科技报告、技术报告"],
            ["[S]", "标准", "国家标准、行业标准"],
            ["[P]", "专利", "专利申请公开文献"],
            ["[DB]", "数据库", "书目数据库、事实数据库"],
            ["[CP]", "计算机程序", "软件"],
            ["[EB]", "电子公告", "网页、在线文档"],
            ["[A]", "档案", "档案文献"],
            ["[CM]", "舆图", "地图、海图"],
            ["[DS]", "数据集", "科研数据集合"],
            ["[Z]", "其他", "无法归入上述类型的文献"],
          ],
        },
      },
      {
        h2: "载体标识：纸质之外的补充位",
        paragraphs: [
          "电子资源要在类型码后加斜线和载体标识。联机网络用 [OL]，这是最常用的一个；磁带、磁盘、光盘分别是 [MT]、[DK]、[CD]。",
          "斜线前后都不留空格。[J/OL] 是联机期刊，[EB/OL] 是联机电子公告，[M/CD] 是随书光盘。只写 [OL] 而不带类型码属于错误写法。",
        ],
        table: {
          headers: ["载体标识", "含义", "组合示例"],
          rows: [
            ["[OL]", "联机网络", "[J/OL]、[EB/OL]、[DB/OL]"],
            ["[CD]", "光盘", "[M/CD]"],
            ["[DK]", "磁盘", "[CP/DK]"],
            ["[MT]", "磁带", "[DS/MT]"],
          ],
        },
      },
      {
        h2: "四类文献的完整成品范例",
        paragraphs: [
          "对着 GB/T 7714-2015 格式的成品抄比背规则快。注意每条末尾收在句点上，年份后面接逗号，起止页码紧跟冒号。",
          "下面四条覆盖了硕士论文写作里九成场景，抄完只需替换内容，标点一个都别动。",
        ],
        list: [
          "期刊：李炳穆. 韩国图书馆法[J]. 图书情报工作, 2008, 52(6): 6-12.",
          "专著：主要责任者. 题名[M]. 出版地: 出版者, 出版年: 页码.",
          "学位论文：主要责任者. 题名[D]. 保存地: 保存者, 年份.",
          "电子资源：主要责任者. 题名[EB/OL]. 出版地: 出版者, 出版年[引用日期]. 获取路径.",
        ],
      },
      {
        h2: "顺序编码制与著者-出版年制",
        paragraphs: [
          "两种正文标注方式选哪种由期刊或学校规定，不是作者自由发挥。选错制式等于年份位置和正文标注全错。",
          "顺序编码制把年份放在出版项里，著者-出版年制要把年份移到著者之后并加圆括号，文后排序规则也不同。",
        ],
        list: [
          "顺序编码制：正文用上标方括号序号 [1]，文后按正文首次引用先后排列。",
          "著者-出版年制：正文写 (李炳穆, 2008)，文后按著者姓氏字顺排列。",
          "著者-出版年制下同一年同一著者有多条时，年份后加 a、b、c 区分。",
          "西文按姓氏字母排、中文按拼音或笔画排，同一篇论文内不能混用两套排序依据。",
        ],
      },
      {
        h2: "标点与空格：查重系统真的会标红",
        paragraphs: [
          "责任者之间用逗号，最后一个责任者后接句点。题名后紧跟标识码，标识码后面才是句点，顺序不能颠倒。",
          "西文标点用半角并后接一个空格，中文标点用全角不加空格。页码之间用短横，两侧不留空格。",
        ],
      },
    ],
    faqs: [
      {
        q: "GB/T 7714-2015 是强制的吗？",
        a: "它是推荐性国家标准，但国内绝大多数期刊、学位论文和基金结题都把它写进投稿须知，实质上等同强制。",
      },
      {
        q: "网络资源一定要写引用日期吗？",
        a: "要。[EB/OL]、[J/OL] 这类联机资源需要著录引用日期，用方括号包住年月日，紧跟在出版年之后。",
      },
      {
        q: "没有作者的文献怎么著录？",
        a: "题名直接提到最前面，后接标识码，责任者位置留空，不要写「佚名」或「Anonymous」。",
      },
      {
        q: "标识码能不能写成 [J/OL] 以外的组合？",
        a: "可以，斜线两边是文献类型和载体标识，例如 [M/CD]、[DB/OL]，但两部分都必须取自标准的取值表。",
      },
      {
        q: "卷和期都没有，只写年份可以吗？",
        a: "期刊条目原则上要有卷(期)，确实缺卷期的用 DOI 补充说明，或改标 [J/OL]，不能悄悄省掉。",
      },
    ],
    relatedSlugs: ["bibtex-to-gb7714", "apa-to-gb7714", "zotero-gb7714"],
    ctaPrimary: "用转换器直接生成合规条目",
    ctaSecondary: "看 BibTeX 字段怎么对应",
    updated: "2026-10-27",
  },

  "zotero-gb7714": {
    slug: "zotero-gb7714",
    keyword: "Zotero GB/T 7714",
    title: "Zotero GB/T 7714：样式安装与字段修正",
    description:
      "Zotero GB/T 7714 样式默认没装，需手动获取 numeric 或 author-date。给出精确安装路径、字段对照表，以及语言字段决定输出「等」还是「et al」的原因。",
    h1: "Zotero GB/T 7714：从装样式到改字段",
    intro:
      "Zotero GB/T 7714 样式不在默认列表里，第一次用国标的人常在「添加引文」里翻半天找不到。装好样式只是开始，字段填错位置照样输出不了合规条目。",
    sections: [
      {
        h2: "Zotero GB/T 7714 样式怎么装",
        paragraphs: [
          "官方样式库里有两个中文国标样式，全名是 China National Standard GB/T 7714-2015，分 numeric（顺序编码制）和 author-date（著者-出版年制）版本。",
          "装错版本，正文标注形式会跟学校要求对不上。装完回 Word 点 Refresh 刷新文档域，已插入的引文会跟着变。",
        ],
        list: [
          "打开 Zotero，菜单「编辑」→「设置」→「引用」（Zotero 6 里这一项叫「首选项」）。",
          "在「样式」一栏点「获取更多样式…」，搜索框输入 7714。",
          "选 China National Standard GB/T 7714-2015 (numeric, 中文)，点 OK。",
          "回到 Word，Zotero 标签页点 Refresh 刷新文档域。",
          "学校要求著者-出版年制时，重复一遍并改选 author-date 版本。",
        ],
      },
      {
        h2: "Zotero 字段与著录项的对应关系",
        paragraphs: [
          "Zotero GB/T 7714 输出不对，多半是字段落错位：最常见的两个是把期刊名填进「出版社」、把「第 6 期」整个塞进期字段。",
          "按表核对一遍，比事后逐条改条目划算得多，尤其条目上百条的时候。",
        ],
        table: {
          headers: ["Zotero 字段", "GB/T 7714 著录位", "注意事项"],
          rows: [
            ["作者 / 编者", "主要责任者", "用单行模式，顺序不能乱"],
            ["标题", "题名", "不要带句末句号"],
            ["出版物", "刊名", "会议论文填会议录名"],
            ["卷 / 期", "卷(期)", "只填数字，去掉「第」和「期」"],
            ["页码", "起止页码", "单短横，如 6-12"],
            ["出版地 / 出版社", "出版地: 出版者", "中文条目两项都要填"],
            ["日期", "出版年", "只保留四位年份"],
            ["语言", "决定「等」或「et al」", "中文条目填 zh-CN"],
            ["DOI", "条目末尾", "只填 10.xxxx 部分"],
          ],
        },
      },
      {
        h2: "语言字段决定输出「等」还是「et al」",
        paragraphs: [
          "这是最常见的翻车点。样式的截断词由条目的「语言」字段驱动，中文文献留空或者填 Chinese，输出会用 et al 而不是「等」。",
          "把语言统一填成 zh-CN，中文条目就稳定输出「, 等」。英文条目保持 en 或留空，输出「, et al」。",
        ],
      },
      {
        h2: "批量修字段：Zotero 的 JavaScript 入口",
        paragraphs: [
          "条目有几百条时逐条点太慢。Zotero 7 内置脚本执行器，菜单「工具」→「开发者」→「运行 JavaScript」，可对资料库批量处理字段。",
          "典型用途是把期字段里的「第 6 期」清成 6、把页码里的 en dash 换成短横。跑之前先备份资料库，脚本没有撤销。",
        ],
      },
      {
        h2: "从 Zotero 到 Word 的三条路",
        paragraphs: [
          "Zotero GB/T 7714 插件域的好处是随时能改样式、自动重排序号，缺点是换期刊要重新套一次样式。",
          "纯文本和导出转换把结果固定下来，适合投稿前定稿，定稿后不要再让插件重新生成。",
        ],
        list: [
          "插件域：Zotero 标签页 → Add/Edit Citation 插入引文，Add/Edit Bibliography 生成文献表。",
          "纯文本：右键文献表 →「从条目创建参考文献表」，粘成不带域的普通文本。",
          "导出转换：导出 BibTeX，用转换器输出 GB/T 7714-2015 顺序编码制，再贴回 Word。",
        ],
      },
      {
        h2: "输出还是不对，先查这三项",
        paragraphs: [
          "第一查条目类型：期刊论文建成「文档」或「网页」，样式找不到刊名，标识码会变成 [Z]。第二查刊名是否填进了「出版社」。",
          "第三查卷期格式，期字段里写中文会原样输出成 52(第6期)。三项修完，绝大多数异常都会消失。",
        ],
      },
    ],
    faqs: [
      {
        q: "Zotero 里搜 7714 搜不到样式怎么办？",
        a: "多半是样式库没加载成功。在「获取更多样式」窗口重试，或从 Zotero Style Repository 网页下载 .csl 文件后拖进首选项窗口。",
      },
      {
        q: "为什么中文文献输出了 et al 而不是「等」？",
        a: "条目的「语言」字段没填 zh-CN。样式靠这个字段判断语种，填 Chinese 或不填都会走英文分支。",
      },
      {
        q: "numeric 和 author-date 该选哪个？",
        a: "国内期刊和学位论文通常要 numeric（正文上标 [1]）；只有少数社科刊物要 author-date。以投稿须知为准。",
      },
      {
        q: "Zotero 导出的 BibTeX 能直接转国标吗？",
        a: "能，把 .bib 全文粘进 BibTeX 输入框即可。注意 citation key 会被丢弃，中文作者如果是拼音需先改回汉字。",
      },
      {
        q: "Word 里的文献表能只保留纯文本吗？",
        a: "可以，右键文献表选「从条目创建参考文献表」，会生成不带域的副本，之后可以随意编辑。",
      },
      {
        q: "中英文文献混排，排序会乱吗？",
        a: "顺序编码制按正文引用先后排，不受语种影响；用著者-出版年制时，中英文混排的排序依据必须在全篇统一。",
      },
    ],
    relatedSlugs: ["gb7714-format", "bibtex-to-gb7714", "apa-to-gb7714"],
    ctaPrimary: "把 Zotero 导出的 .bib 直接转国标",
    ctaSecondary: "看 GB/T 7714-2015 标识码全表",
    updated: "2026-10-27",
  },

  "doi-to-gb7714": {
    slug: "doi-to-gb7714",
    keyword: "DOI 转参考文献格式",
    title: "DOI 转参考文献格式：Crossref 字段补全",
    description:
      "DOI 转参考文献格式靠 Crossref 反查书目信息，中文期刊、学位论文等四类常拿不全。附字段映射表、缺失字段的应对办法与 DOI 的正确位置。",
    h1: "DOI 转参考文献格式：字段从哪来",
    intro:
      "DOI 转参考文献格式之所以可行，是因为每个 DOI 背后有一份注册元数据，通过 Crossref 公开接口能换回题名、作者、刊名、卷期页码。但这份元数据不是为国标设计的，字段要重新映射。",
    sections: [
      {
        h2: "DOI 转参考文献格式，Crossref 能给什么",
        paragraphs: [
          "DOI 是 10. 开头的注册号，前缀标识注册机构，后缀由出版方自定义，整串大小写不敏感。Crossref 返回 JSON，字段名用的是它自己的词典。",
          "刊名在 Crossref 里叫 container-title，还是个数组；出版年在 published-print.date-parts 里，只有存在印刷版时才有值。",
        ],
      },
      {
        h2: "Crossref 字段到 GB/T 7714 著录项的映射",
        paragraphs: [
          "DOI 转参考文献格式时最该盯 type 字段，它直接决定输出 [J]、[C] 还是 [M]。journal-article 对应 [J]，proceedings-article 对应 [C]。",
          "page 缺失最麻烦，只能用 DOI 顶上，条目会比别人短一截，评审一眼就能看出来。",
        ],
        table: {
          headers: ["Crossref 字段", "GB/T 7714 著录位", "缺失时的后果"],
          rows: [
            ["author[].family / given", "主要责任者", "只能留空或手工补"],
            ["title[0]", "题名", "无法生成条目"],
            ["container-title[0]", "刊名", "期刊条目缺刊名"],
            ["volume", "卷", "卷期写不全"],
            ["issue", "期", "卷期写不全"],
            ["page", "起止页码", "只能用 DOI 替代"],
            ["published-print.date-parts", "出版年", "退而取 published-online"],
            ["type", "决定 [J]/[C]/[M]", "标识码判断错误"],
            ["DOI", "条目末尾", "元数据本身拿不到"],
          ],
        },
      },
      {
        h2: "四类文献 Crossref 拿不全",
        paragraphs: [
          "不是所有 DOI 都存在 Crossref。DOI 转参考文献格式时如果查不到记录，先看前缀：10.48550 开头的 arXiv DOI 由 DataCite 注册，改用 arXiv ID 输入更稳。",
          "另外版权页信息常不全，页码缺失尤其常见，不少出版社只登记了起始页。",
        ],
        list: [
          "中文期刊：很多只有拼音题名，或根本没注册 DOI。",
          "学位论文：Crossref 基本不收录，保存地和保存者必须手填。",
          "标准与专利：标识用的是标准号、专利号，Crossref 字段对不上。",
          "会议论文：container-title 常写成会议全称，要人工改成会议录名。",
        ],
      },
      {
        h2: "批量转换的实际操作路径",
        paragraphs: [
          "一次投十几条 DOI 是常规操作，逐条查网页太慢。整批粘贴按行分隔，解析失败的会单独标出，不拖累其它条目。",
          "粘 https://doi.org/ 开头的完整链接也能识别，不用手工裁前缀。",
        ],
        list: [
          "从出版商页面或文献管理软件里把 DOI 复制出来，一行一条。",
          "粘贴进 DOI 输入框，输出制式选「GB/T 7714-2015 顺序编码制」。",
          "逐条核对作者数量和卷期页码，Crossref 给不全的位置用手动录入表单补齐。",
          "下载 .ris 回到 Zotero，或导出 .txt 贴进 Word。",
        ],
      },
      {
        h2: "DOI 在条目末尾怎么写",
        paragraphs: [
          "标准要求 DOI 置于条目末尾，形式为 DOI: 10.xxxx/xxxx，前面用句点收尾上一个著录项。不要写成小写 doi:，也不要保留 https://doi.org/ 前缀。",
          "有些期刊要求保留完整链接形式，以投稿须知为准。转换器输出标准写法，需要时改一处比逐条手打省事。",
        ],
      },
      {
        h2: "解析失败但确实有 DOI 的情况",
        paragraphs: [
          "最常见两种：一是 DOI 抄漏字符，后缀可能含斜杠、点、连字符，少一位就查不到；二是出版商还没把元数据同步给 Crossref，新上线论文尤其常见。",
          "两类都可以走手动录入表单，填完作者、题名、刊名、年卷期页码，输出格式跟自动解析完全一致。",
        ],
      },
    ],
    faqs: [
      {
        q: "arXiv 的 DOI（10.48550）为什么查不到？",
        a: "10.48550 由 DataCite 注册而非 Crossref，Crossref 元数据里没有这条记录。改用 arXiv ID 或文章链接作为输入即可。",
      },
      {
        q: "Crossref 返回的刊名是全称，能改成期刊要求的缩写吗？",
        a: "不能自动改，刊名缩写没有统一映射表。转换后手动替换，或按投稿须知保留全称。",
      },
      {
        q: "页码只有起始页怎么办？",
        a: "Crossref 常只登记起始页。回原文补全起止页码；实在没有页码的在线优先出版，保留 DOI 并把标识码改成 [J/OL]。",
      },
      {
        q: "DOI 大小写会影响查询吗？",
        a: "不影响，DOI 解析大小写不敏感。但输出到条目末尾时建议统一小写，跟出版方登记形式保持一致。",
      },
      {
        q: "一条 DOI 能同时输出 APA 和 BibTeX 吗？",
        a: "可以，转换器支持 GB/T 7714-2015 顺序编码制、APA、MLA、Chicago、Harvard、IEEE、BibTeX 输出，换一次输出制式重新生成即可，不用重新粘贴。",
      },
    ],
    relatedSlugs: ["gb7714-format", "bibtex-to-gb7714", "apa-to-gb7714"],
    ctaPrimary: "粘一条 DOI，生成 GB/T 7714 条目",
    ctaSecondary: "看 GB/T 7714-2015 著录项结构",
    updated: "2026-10-27",
  },

  "bibtex-to-mla": {
    slug: "bibtex-to-mla",
    keyword: "BibTeX 转 MLA",
    title: "BibTeX 转 MLA：作者、容器与 DOI",
    description:
      "BibTeX 转 MLA 第 9 版：首位作者姓前名后、三人以上只列一人加 et al.、题名加引号、刊名斜体、卷期页码与 DOI 简写。",
    h1: "BibTeX 转 MLA：字段逐项拆解",
    intro:
      "写英文论文投人文社科期刊，常被要求用 MLA 第 9 版。BibTeX 转 MLA 真正要处理四件事：作者只留首位加 et al.、题名加引号、刊名变斜体、卷期页码换缩写。这篇按字段拆开讲，拿 LeCun 等人 2015 年 Nature 文章作例子。",
    sections: [
      {
        h2: "BibTeX 转 MLA：字段落到哪里",
        paragraphs: [
          "以 LeCun 等人 2015 年发表在 Nature 521 卷 7553 期 436–444 页的 Deep Learning 为例，BibTeX 是 @article{lecun2015deep, author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}, title = {Deep Learning}, journal = {Nature}, year = {2015}, volume = {521}, number = {7553}, pages = {436--444}, doi = {10.1038/nature14539}}。MLA 第 9 版输出是 LeCun, Yann, et al. “Deep Learning.” Nature, vol. 521, no. 7553, 2015, pp. 436–44. https://doi.org/10.1038/nature14539.",
          "页码按 MLA 规则缩写，436–444 写作 436–44。DOI 写成完整链接 https://doi.org/10.1038/nature14539，MLA 第 9 版要求 DOI 是可点击的链接。",
        ],
        table: {
          headers: ["BibTeX 字段", "MLA 第 9 版著录位", "写法要点"],
          rows: [
            ["author", "首位作者姓前名后", "三人以上只列一人，加 et al."],
            ["title", "题名加引号", "实词首字母大写"],
            ["journal", "容器名斜体", "刊名斜体，题名不斜体"],
            ["volume / number", "卷 / 期", "写作 vol. 521, no. 7553"],
            ["pages", "起止页码", "写作 pp. 436–44"],
            ["doi", "条目末尾", "链接 https://doi.org/10.xxxx/xxxx"],
          ],
        },
      },
      {
        h2: "作者：只留首位，其余用 et al.",
        paragraphs: [
          "MLA 第 9 版只翻转第一位作者的姓名，三位以上作者只列第一位，其后加 et al.。两位作者则两人全列，第二位按正常语序写在 and 之后。APA 能列二十位作者，MLA 不行，同一篇论文在两种格式下差别很大。",
          "机构作者要双重大括号保护，写成 {{World Health Organization}}，否则会被拆成三个人。author 字段用 and 连接，缺一个 and 就会把两个人并成一个人。",
        ],
      },
      {
        h2: "题名加引号，容器斜体",
        paragraphs: [
          "MLA 的规则是容器斜体、被容纳的作品加引号：期刊文章题名加引号，刊名斜体；专著题名斜体不加引号，出版社取容器位。会议论文题名加引号，会议录名斜体。",
          "专著的例子：Goodfellow 等人 2016 年 MIT Press 出版的 Deep Learning，MLA 写作 Goodfellow, Ian, et al. Deep Learning. MIT Press, 2016. 书名斜体，出版社之后直接跟年份。",
        ],
      },
      {
        h2: "转换后逐条自查",
        paragraphs: [
          "贴进论文之前按四点检查：et al. 前面只有一位作者、题名有引号、刊名斜体、卷期页码用了 vol.、no.、pp. 缩写、DOI 在末尾用简写。",
          "留着 .bib 原文件，下次投别的期刊换个格式就能重新生成；下载的 .ris 可以导回 Zotero 或 EndNote，不用重新录入。",
        ],
        list: [
          "作者：首位姓前名后，三人以上加 et al.",
          "题名：加引号；容器：斜体。",
          "数字：vol.、no.、pp.，页码缩写。",
          "DOI：末尾写完整链接。",
        ],
      },
    ],
    faqs: [
      {
        q: "MLA 第 9 版列几位作者？",
        a: "三位以上只列第一位加 et al.，两位作者全列，第二位按正常语序写在 and 之后。",
      },
      {
        q: "DOI 写链接还是简写？",
        a: "写完整链接 https://doi.org/10.1038/nature14539。MLA 第 9 版要求 DOI 是可点击的链接。",
      },
      {
        q: "为什么刊名斜体、题名加引号？",
        a: "MLA 把容器斜体、被容纳的作品加引号。期刊是容器，文章是被容纳的作品。",
      },
      {
        q: "页码用短横还是长破折号？",
        a: "缩写范围加长破折号，写作 pp. 436–44。MLA 第 9 版会省掉重复数字，436–444 写作 436–44。",
      },
      {
        q: ".bib 文件会被上传吗？",
        a: "不会。BibTeX 转 MLA 全程在浏览器本地完成，不上传服务器，也不用注册账号。",
      },
    ],
    relatedSlugs: ["apa-to-mla", "bibtex-to-chicago", "bibtex-to-ieee"],
    ctaPrimary: "粘贴 BibTeX，生成 MLA 参考文献",
    ctaSecondary: "看同一篇论文的 Chicago 格式",
    updated: "2026-11-12",
  },

  "apa-to-mla": {
    slug: "apa-to-mla",
    keyword: "APA 转 MLA",
    title: "APA 转 MLA：作者、年份与引号",
    description:
      "APA 转 MLA 第 9 版：括号里的年份挪到后面、姓名缩写展开成全名、题名加引号、DOI 改简写，同一篇论文两种写法的对照。",
    h1: "APA 转 MLA：两种格式逐项对照",
    intro:
      "APA 和 MLA 都以作者开头，之后几乎处处不同。APA 转 MLA 要做四件事：把姓名缩写展开成全名、把括号里的年份挪到后面、给题名加引号、把 DOI 改成简写。这篇用同一篇 Nature 文章对照两种写法。",
    sections: [
      {
        h2: "APA 转 MLA：五处结构差别",
        paragraphs: [
          "同一篇文章两种写法。APA 第 7 版：LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539。MLA 第 9 版：LeCun, Yann, et al. “Deep Learning.” Nature, vol. 521, no. 7553, 2015, pp. 436–44. https://doi.org/10.1038/nature14539。",
          "最显眼的两处是 & 符号和作者后的括号年份。MLA 没有括号年份，年份挪到卷期之后；& 符号在 MLA 里也不存在，三位以上作者只留首位加 et al.。",
        ],
        table: {
          headers: ["著录项", "APA 第 7 版", "MLA 第 9 版"],
          rows: [
            ["作者", "LeCun, Y., Bengio, Y., & Hinton, G.", "LeCun, Yann, et al."],
            ["年份", "作者后括号内", "卷期之后"],
            ["题名", "句首大写，无标记", "实词大写，加引号"],
            ["刊名", "斜体", "斜体"],
            ["卷期", "521(7553)", "vol. 521, no. 7553"],
            ["页码", "436–444，长破折号", "pp. 436–44，缩写范围"],
            ["DOI", "https://doi.org/ 链接", "https://doi.org/ 链接"],
            ["文内引用", "(LeCun et al., 2015)", "(LeCun et al. 436)"],
          ],
        },
      },
      {
        h2: "作者：缩写展开，全名只留首位",
        paragraphs: [
          "APA 写 LeCun, Y.，MLA 写 LeCun, Yann：缩写要展开成全名。APA 最多列二十位作者，MLA 三位以上只列首位加 et al.，同一篇论文的作者块在两种格式下差别最大。",
          "机构作者两种格式都写全称，不缩写成 WHO。文内引用也随之变化：APA 写 (LeCun et al., 2015)，MLA 写 (LeCun et al. 436)，指向引用页码而非年份。",
        ],
      },
      {
        h2: "题名大小写与破折号",
        paragraphs: [
          "APA 的文章题名用句首大写 Deep learning，MLA 用实词大写 “Deep Learning.”。转换器无法判断哪些短词在实词大写里保持小写，贴进论文前通读一遍题名。",
          "页码按 MLA 规则缩写为 436–44。Word 的自动更正会在输入数字后把短横变回长破折号，粘贴之后再检查一遍。",
        ],
      },
      {
        h2: "APA 文本解析需要人工复核的地方",
        paragraphs: [
          "解析器认的是「作者块、括号年份、句点」这个形状。没有个人作者的网页、日期是区间的条目、法律文献都认不出来，直接用手动录入表单更快。",
          "没有年份的条目 APA 写 n.d.，MLA 同样没有对应写法：去出版方页面找年份，或者按网页来源著录并写访问日期。edition 写进题名的 (2nd ed.) 不会自动剥离，转换前删掉。",
        ],
        list: [
          "n.d. 没有对应写法，补年份或按网页著录。",
          "题名里的 (2nd ed.) 要用 Edition 字段，转换前处理。",
          "Retrieved from 是 APA 特有表述，转换前删掉。",
          "DOI 保持链接形式 https://doi.org/10.1038/nature14539。",
        ],
      },
    ],
    faqs: [
      {
        q: "转换前要删掉 & 符号吗？",
        a: "不用，解析器会去掉。手工转换时先把 & 换成逗号，残留的 & 是半成品最明显的标志。",
      },
      {
        q: "MLA 页码用短横还是长破折号？",
        a: "缩写范围加长破折号，写作 pp. 436–44。MLA 第 9 版会省掉重复数字。",
      },
      {
        q: "三位作者 MLA 为什么只列一位？",
        a: "MLA 第 9 版规定三位以上作者只列首位加 et al.，APA 最多列二十位，同一篇论文两种写法差别很大。",
      },
      {
        q: "APA 的 n.d. 怎么处理？",
        a: "MLA 同样没有未知年份的标记。去出版方页面找年份，或者按网页来源著录并写访问日期。",
      },
      {
        q: "转换器会按引用顺序重排吗？",
        a: "不会。APA 和 MLA 的文献表都按作者字母顺序排列，转换保持粘贴顺序，只有数字制式才重排。",
      },
    ],
    relatedSlugs: ["bibtex-to-mla", "bibtex-to-chicago", "bibtex-to-ieee"],
    ctaPrimary: "把 APA 文献表转成 MLA",
    ctaSecondary: "同一批文献从 BibTeX 转 MLA",
    updated: "2026-11-12",
  },

  "bibtex-to-chicago": {
    slug: "bibtex-to-chicago",
    keyword: "BibTeX 转 Chicago",
    title: "BibTeX 转 Chicago：作者-日期制实操",
    description:
      "BibTeX 转 Chicago 第 17 版作者-日期制：全部作者列出、年份紧跟作者块、题名加引号、卷(期)后冒号接页码。",
    h1: "BibTeX 转 Chicago：字段逐项拆解",
    intro:
      "投社科期刊常被要求用 Chicago 第 17 版。BibTeX 转 Chicago 真正要处理四件事：作者全部列出、年份挪到作者块之后、题名加引号、卷期页码用冒号连接。这篇拿 LeCun 等人 2015 年 Nature 文章作例子。",
    sections: [
      {
        h2: "BibTeX 转 Chicago：字段落到哪里",
        paragraphs: [
          "同一篇文章的 Chicago 作者-日期制写法是 LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton. 2015. “Deep Learning.” Nature 521 (7553): 436–44. https://doi.org/10.1038/nature14539. 页码按 Chicago 规则缩写，436–444 写作 436–44。",
          "DOI 用解析链接形式 https://doi.org/10.1038/nature14539，写在条目末尾。没有 DOI 时写完整 URL。",
        ],
        table: {
          headers: ["BibTeX 字段", "Chicago 作者-日期制著录位", "写法要点"],
          rows: [
            ["author", "全部作者，首位姓前名后", "其余按正常语序，末位前加 and"],
            ["year", "作者块之后", "紧跟作者，年份后加句点"],
            ["title", "题名加引号", "标题式大写"],
            ["journal", "刊名斜体", "刊名斜体"],
            ["volume / number", "卷(期)", "写作 521 (7553):"],
            ["pages", "冒号后页码", "缩写范围，如 436–44"],
            ["doi", "条目末尾", "解析链接形式"],
          ],
        },
      },
      {
        h2: "作者-日期制与注释制，先选制式",
        paragraphs: [
          "Chicago 有两个制式，转换前要先确定。作者-日期制文内写 (LeCun et al. 2015)，文末是参考文献表；注释制用脚注，首次引用写全条目加引用页码，之后简写为作者加题名。社科和理工期刊大多要求作者-日期制。",
          "作者-日期制最多列十位作者，十一位以上列前七位加 et al.。注释制首次脚注同样处理，之后的简短脚注写作 LeCun et al., “Deep Learning,” 437。",
        ],
      },
      {
        h2: "卷期页码与 DOI",
        paragraphs: [
          "卷期写作 521 (7553)，其后冒号接页码。没有期号时只写卷，521: 436–44。专著的写法不同：Goodfellow 等人 2016 年 Deep Learning，写作 Goodfellow, Ian, Yoshua Bengio, and Aaron Courville. 2016. Deep Learning. Cambridge, MA: MIT Press. 出版地、冒号、出版社、年份依次排列。",
          "页码缩写是 Chicago 最容易错的地方：436–444 省略重复数字写作 436–44，100–104 写作 100–104（百位不省），以 0 结尾的数字也不省。",
        ],
      },
      {
        h2: "转换后逐条自查",
        paragraphs: [
          "贴进论文之前按四点检查：作者全部列出且只有首位翻转、年份紧跟作者块、题名有引号、卷(期)冒号页码且页码已缩写。",
          "留着 .bib 原文件，下次投别的期刊换个格式就能重新生成；下载的 .ris 可以导回 Zotero 或 EndNote，不用重新录入。",
        ],
        list: [
          "作者：首位翻转，其余正常语序，末位前加 and。",
          "年份：紧跟作者块，其后加句点。",
          "题名：加引号；容器：斜体。",
          "数字：卷(期): 缩写页码，DOI 在末尾。",
        ],
      },
    ],
    faqs: [
      {
        q: "Chicago 列全部作者还是用 et al.？",
        a: "作者-日期制最多列十位全名，十一位以上列前七位加 et al.。",
      },
      {
        q: "作者-日期制和注释制怎么选？",
        a: "看期刊要求：文内写 (LeCun et al. 2015) 是作者-日期制，用脚注的是注释制。社科和理工期刊大多要作者-日期制。",
      },
      {
        q: "页码 436–444 为什么变成 436–44？",
        a: "Chicago 的页码缩写规则会省掉重复数字。转换器自动处理，手工核对时注意百位和以 0 结尾的数字不省。",
      },
      {
        q: "年份放在哪里？",
        a: "紧跟作者块，在题名之前：LeCun, Yann, et al. 2015. “Deep Learning.” 这是作者-日期制的标志。",
      },
      {
        q: ".bib 文件会被上传吗？",
        a: "不会。BibTeX 转 Chicago 全程在浏览器本地完成，不上传服务器，也不用注册账号。",
      },
    ],
    relatedSlugs: ["bibtex-to-mla", "apa-to-mla", "bibtex-to-ieee"],
    ctaPrimary: "粘贴 BibTeX，生成 Chicago 参考文献",
    ctaSecondary: "看同一篇论文的 IEEE 格式",
    updated: "2026-11-12",
  },

  "bibtex-to-ieee": {
    slug: "bibtex-to-ieee",
    keyword: "BibTeX 转 IEEE",
    title: "BibTeX 转 IEEE：编号制参考文献",
    description:
      "BibTeX 转 IEEE：姓名缩写在前、题名加引号、vol. 与 no. 缩写、pp. 页码、参考文献按引用顺序编号 [1]、[2]。",
    h1: "BibTeX 转 IEEE：字段逐项拆解",
    intro:
      "投工程类期刊常被要求用 IEEE 格式。BibTeX 转 IEEE 真正要处理四件事：姓名改成缩写在前、题名加引号、卷期页码换缩写、文献表按引用顺序编号。这篇拿 LeCun 等人 2015 年 Nature 文章作例子。",
    sections: [
      {
        h2: "BibTeX 转 IEEE：字段落到哪里",
        paragraphs: [
          "同一篇文章的 IEEE 写法是 [1] Y. LeCun, Y. Bengio, and G. Hinton, “Deep learning,” Nature, vol. 521, no. 7553, pp. 436–444, May 2015, doi: 10.1038/nature14539. 编号 [1] 写在条目开头，姓名是缩写在前、姓氏在后。",
          "页码用长破折号，写作 pp. 436–444，这点和 MLA 的单短横不同。月份和年份写在页码之后，没有月份时只写年份。",
        ],
        table: {
          headers: ["BibTeX 字段", "IEEE 著录位", "写法要点"],
          rows: [
            ["author", "缩写在前、姓氏在后", "Y. LeCun, Y. Bengio, and G. Hinton,"],
            ["title", "题名加引号", "句首大写，其后加逗号"],
            ["journal", "刊名斜体", "刊名斜体"],
            ["volume / number", "卷 / 期", "写作 vol. 521, no. 7553,"],
            ["pages", "起止页码", "写作 pp. 436–444,"],
            ["year / month", "月份与年份", "写作 May 2015,"],
            ["doi", "条目末尾", "简写 doi: 10.1038/nature14539"],
          ],
        },
      },
      {
        h2: "编号按引用顺序，不按字母顺序",
        paragraphs: [
          "IEEE 的文献表按首次引用顺序编号：正文里第一个引用的工作是 [1]，第二个是 [2]，文献表按这个顺序排列。转换器按粘贴顺序编号，所以粘贴时按引用顺序粘，或者转换后手动重排。",
          "正文里引用写 [1]，同一篇工作重复引用仍用同一个编号，一组引用写作 [1]–[3]。IEEE 没有 (LeCun, 2015) 这种作者-日期标记。",
        ],
        list: [
          "按首次引用顺序粘贴参考文献。",
          "正文引用写 [1]，不用作者名或年份。",
          "中间插入新文献后，后面的编号要重排。",
          "同一篇工作永远用同一个编号。",
        ],
      },
      {
        h2: "作者与卷期页码",
        paragraphs: [
          "IEEE 的作者全部列出，写作缩写加姓氏，末位前加 and。机构作者要双重大括号保护，否则会被拆成多个人。",
          "专著的写法是 I. Goodfellow, Y. Bengio, and A. Courville, Deep Learning. Cambridge, MA, USA: MIT Press, 2016. 书名斜体，出版地、出版社、年份依次排列。会议论文写作 [1] Y. LeCun, et al., “Deep learning,” in Proc. Conf., City, Year, pp. 1–8.",
        ],
      },
      {
        h2: "转换后逐条自查",
        paragraphs: [
          "贴进论文之前按四点检查：条目开头有 [1]、[2] 编号、姓名是缩写在前、题名有引号、卷期页码用了 vol.、no.、pp. 缩写、DOI 在末尾用简写。",
          "留着 .bib 原文件，下次投别的期刊换个格式就能重新生成；下载的 .ris 可以导回 Zotero 或 EndNote，不用重新录入。",
        ],
        list: [
          "编号：按引用顺序，不按字母顺序。",
          "作者：缩写在前，末位前加 and。",
          "题名：加引号；容器：斜体。",
          "数字：vol.、no.、pp.，页码长破折号，DOI 在末尾。",
        ],
      },
    ],
    faqs: [
      {
        q: "IEEE 的文献表按字母顺序排吗？",
        a: "不按。按首次引用顺序编号，第一个引用的工作是 [1]，文献表按这个顺序排列，中间插入新文献要重排。",
      },
      {
        q: "同一篇工作引用两次怎么写？",
        a: "用同一个编号 [1]。一组引用写作 [1]–[3]，IEEE 没有作者-日期标记。",
      },
      {
        q: "DOI 写链接还是简写？",
        a: "简写 doi: 10.1038/nature14539。https://doi.org/ 形式的解析链接是 APA 的写法，不是 IEEE。",
      },
      {
        q: "页码用短横还是长破折号？",
        a: "长破折号，写作 pp. 436–444。MLA 用单短横，同一组页码两种格式写法不同。",
      },
      {
        q: ".bib 文件会被上传吗？",
        a: "不会。BibTeX 转 IEEE 全程在浏览器本地完成，不上传服务器，也不用注册账号。",
      },
    ],
    relatedSlugs: ["bibtex-to-mla", "apa-to-mla", "bibtex-to-chicago"],
    ctaPrimary: "粘贴 BibTeX，生成 IEEE 参考文献",
    ctaSecondary: "看同一篇论文的 MLA 格式",
    updated: "2026-11-12",
  },

  "doi-to-bibtex": {
    slug: "doi-to-bibtex",
    keyword: "DOI 转 BibTeX",
    title: "DOI 转 BibTeX：Crossref 生成条目",
    description:
      "DOI 转 BibTeX 一次查一条：粘贴 DOI 就能拿到干净的 @article 条目，引用键、字段、页码都对好；再讲 arXiv 的 DOI 为什么查不到、数据集 DOI 该怎么处理。",
    h1: "DOI 转 BibTeX：从标识符到 .bib 条目",
    intro:
      "DOI 是拿到 .bib 条目最快的办法，也是最容易缺字段的办法。DOI 转 BibTeX 靠 Crossref 反查出版方登记的元数据，再写成 BibTeX 条目。现代期刊的登记一般很全，其它文献就要多看一眼。",
    sections: [
      {
        h2: "DOI 转 BibTeX：一次查找能拿到什么",
        paragraphs: [
          "一次查找就是向 Crossref 的 REST 接口发一次请求，拿回出版方登记的 JSON。从里面读九个字段：题名、刊名、作者（姓和名分开）、出版日期、卷、期、页码、出版社和 DOI 本身。",
          "这九个字段正好就是一条 BibTeX 条目需要的全部，所以只给一个 DOI 常常就能拿到完整的 @article。摘要、许可、资助信息这些用不上的字段直接丢掉。以 10.1038/nature14539 为例，查到的是 LeCun 等人 2015 年发表在 Nature 521 卷 7553 期 436–444 页的 Deep learning。",
          "麻烦在登记质量。老记录常有全大写题名、缺卷期、作者没有名，只有姓。DOI 转 BibTeX 的结果结构正确、仍需改两处的情况很常见，知道盯哪几个字段就快了。",
        ],
        table: {
          headers: ["Crossref 字段", "BibTeX 字段", "LeCun 的例子"],
          rows: [
            ["title", "title", "Deep learning"],
            ["author[].family / given", "author，用 and 连接", "LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey"],
            ["container-title", "journal", "Nature"],
            ["issued date-parts", "year", "2015"],
            ["volume / issue", "volume / number", "521 / 7553"],
            ["page", "pages，双短横", "436--444"],
            ["DOI", "doi，外加 url 字段", "10.1038/nature14539"],
            ["type", "条目类型", "journal-article 变成 @article"],
          ],
        },
      },
      {
        h2: "引用键：LeCun2015Deep",
        paragraphs: [
          "每条 BibTeX 都要一个引用键，DOI 查找按记录本身生成：首位作者的姓、年份、题名的第一个词。LeCun 那篇就是 @article{LeCun2015Deep, ...}。键里没有 DOI，又短又好打，写引用命令时不会出错。",
          "保存前随便改键，纯文本而已，条目里其它字段不依赖它。唯一规则是同一个 .bib 文件里键不能重复：同一年同一位作者的第二篇论文会按自己的题名首词生成不同的键，题名首词也一样就手工改一个。",
        ],
        list: [
          "引用键按「姓 + 年份 + 题名首词」生成，例如 LeCun2015Deep。",
          "键只是个标签，改了不影响条目里的任何字段。",
          "同一个 .bib 文件里两个条目不能共用一个键。",
          "写引用命令之前核对键，写错就等于正文里丢了一条引用。",
        ],
      },
      {
        h2: "DOI 变成哪种条目类型",
        paragraphs: [
          "Crossref 给每篇作品打一个类型，类型决定 BibTeX 的条目类型。按文献本身判断，不看出版社。留神 posted-content：这是 Crossref 对预印本的叫法，查到的会是 @article，容器是预印本平台，引用成期刊论文之前先看容器。",
          "学位论文是另一个边界情况。Crossref 叫它 dissertation，转换器分不出博士还是硕士论文，所以先给 @misc。手工改成 @phdthesis，再补一个 school 字段，其余内容都是对的。",
        ],
        table: {
          headers: ["Crossref 类型", "BibTeX 条目类型", "备注"],
          rows: [
            ["journal-article", "@article", "最常见"],
            ["proceedings-article", "@inproceedings", "容器是会议录名"],
            ["book", "@book", "出版社取容器位"],
            ["book-chapter", "@inbook", "题名是章节，容器是书名"],
            ["report", "@techreport", "机构写进 institution 字段"],
            ["dataset", "@misc", "仓储库写进备注"],
            ["dissertation", "@misc", "改成 @phdthesis 再补 school"],
            ["posted-content", "@article", "预印本：先看容器"],
          ],
        },
      },
      {
        h2: "Crossref 里没有这条 DOI",
        paragraphs: [
          "Crossref 只是注册机构之一，DOI 转 BibTeX 只能读它自己的登记。10.48550/arXiv.2301.00001 这种 arXiv DOI 由 DataCite 注册，Crossref 再怎么查都是查无此号。改贴 arXiv ID，例如 2301.00001，或者 abs 链接：系统另外认这个格式，版本号去掉，从 arXiv 接口读记录。",
          "Zenodo、figshare、Dryad 的标识，包括 10.5281 这一家，也都是 DataCite 的记录，Crossref 里没有。它们是数据集，条目类型是 @misc，容器是仓储库而不是期刊。直接粘 https://doi.org/ 开头的链接也能识别，系统会先扫出 DOI 形状的字串，句末的分号、句点先去掉再查，从 PDF 参考文献里复制出来带句子的情况就靠这个。",
        ],
      },
      {
        h2: "DOI 转 BibTeX 的批量做法",
        paragraphs: [
          "DOI 输入框一次只解析一个标识符：读输入里第一个 DOI 形状的字串或 arXiv 标识符，返回一条记录。四十条 DOI 就是四十次查找，文献已经在手里的时候换别的输入方式更快。",
          "整批粘贴 APA 文本，一条空一行，或者直接粘 BibTeX，两种都是一次解析。DOI 输入框留给源头就坏掉的那条：题名丢了、页码在复制里丢了。长列表里通常每条坏掉的文献查一次 DOI 就够了。",
          "查找和转换记录留在浏览器本地历史里，最近二十条，昨天查过的标识符一点就回来。输出能下 .bib、.ris 或纯文本，.ris 可以导回 EndNote 或 Zotero，不用重新录入。",
        ],
        list: [
          "粘 DOI，或者只有整条参考文献就粘整条。",
          "先看条目类型再信 @article 这个标签。",
          "卷期页码缺失先在源记录里补，再重新导出。",
          "留着 .bib 文件：其它格式都是从它再生成的。",
        ],
      },
    ],
    faqs: [
      {
        q: "DOI 转 BibTeX 生成的引用键是什么？",
        a: "首位作者的姓、年份、题名的第一个词，LeCun 2015 年那篇就是 LeCun2015Deep。随便改，只是标签，不影响条目里的其它字段。",
      },
      {
        q: "arXiv 的 DOI（10.48550）为什么查不到？",
        a: "10.48550 由 DataCite 注册而非 Crossref，Crossref 元数据里没有这条记录。改用 arXiv ID 或文章链接作为输入即可。",
      },
      {
        q: ".bib 条目里还留着 DOI 吗？",
        a: "留着，而且留了两处：doi 字段和存 https://doi.org/ 链接的 url 字段。导进文献管理软件再导出来也不会丢。",
      },
      {
        q: "Crossref 没有页码怎么办？",
        a: "有些登记只有文章编号、没有页码，pages 字段就是空的，自己补上。老记录缺卷期也很常见。",
      },
      {
        q: "一次能转多少条 DOI？",
        a: "DOI 输入框一次解析一个标识符。长列表粘 APA 文本或 BibTeX，一次解析完。",
      },
      {
        q: "DOI 转 BibTeX 会上传我的文献吗？",
        a: "不会。只把标识符发给 Crossref 查出版方元数据，不用注册账号，不上传文献列表，服务器也不留副本。",
      },
    ],
    relatedSlugs: ["doi-to-apa", "bibtex-to-apa", "doi-to-mla"],
    ctaPrimary: "粘一条 DOI，生成 BibTeX 条目",
    ctaSecondary: "同一条记录看 APA 第 7 版",
    updated: "2026-11-18",
  },

  "bibtex-to-apa": {
    slug: "bibtex-to-apa",
    keyword: "BibTeX 转 APA 第 7 版",
    title: "BibTeX 转 APA 第 7 版：字段对照",
    description:
      "BibTeX 转 APA 第 7 版按字段对照着讲：二十位作者规则、句首大写题名、斜体的刊名与卷、DOI 写完整链接，附 LeCun 2015 年 Nature 文章的完整例子。",
    h1: "BibTeX 转 APA 第 7 版：字段逐项拆解",
    intro:
      "写英文论文投社科、心理、教育期刊，常被要求用 APA 第 7 版。BibTeX 转 APA 第 7 版真正要处理四件事：作者最多列二十位、题名改句首大写、刊名和卷变斜体、DOI 写完整链接。这篇按字段拆开讲，拿 LeCun 等人 2015 年 Nature 文章作例子。",
    sections: [
      {
        h2: "BibTeX 转 APA 第 7 版：字段落到哪里",
        paragraphs: [
          "以 LeCun 等人 2015 年发表在 Nature 521 卷 7553 期 436–444 页的 Deep Learning 为例，BibTeX 是 @article{lecun2015deep, author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}, title = {Deep Learning}, journal = {Nature}, year = {2015}, volume = {521}, number = {7553}, pages = {436--444}, doi = {10.1038/nature14539}}。APA 第 7 版输出是 LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539。",
          "页码保持完整长度，436–444 不缩写。DOI 写成完整链接 https://doi.org/10.1038/nature14539，后面不加句点，前面也不加 DOI: 前缀。",
        ],
        table: {
          headers: ["BibTeX 字段", "APA 第 7 版著录位", "写法要点"],
          rows: [
            ["author", "姓加缩写，最后一位前加 &", "LeCun, Y., Bengio, Y., & Hinton, G."],
            ["year", "作者后括号内", "(2015)."],
            ["title", "句首大写，无标记", "Deep learning."],
            ["journal", "斜体", "Nature,"],
            ["volume / number", "卷斜体，期放括号", "521(7553),"],
            ["pages", "完整范围，长破折号", "436–444."],
            ["doi", "条目末尾", "链接 https://doi.org/10.xxxx/xxxx"],
          ],
        },
      },
      {
        h2: "作者：二十位，之后用省略号",
        paragraphs: [
          "APA 第 7 版的文献表最多列二十位作者。二十一位以上只印前十九位、一个省略号、最后一位作者，中间的都不出现。正文里的引用更严：三位以上作者从第一次出现就写成首位作者加 et al.，所以正文里 (LeCun et al., 2015) 是对的，文献表里三位全列也是对的。",
          "缩写就是缩写：Y. 不会变回 Yann，因为只存缩写的 .bib 文件没东西可展开。机构作者要双重大括号保护，写成 {{World Health Organization}}，否则会被拆成三个人。最后一位作者前的 & 是 APA 的标点，不是数据，BibTeX 源文件里没有它。",
        ],
        list: [
          "转换前数一数每个 author 字段有几个人。",
          "二十位以下：文献表里全列。",
          "二十一位以上：前十九位、省略号、最后一位。",
          "三位以上作者：正文引用是首位加 et al.",
        ],
      },
      {
        h2: "题名大小写、斜体与卷期",
        paragraphs: [
          "APA 第 7 版的文章题名用句首大写：只有第一个词和专有名词保留大写，Deep Learning 变成 Deep learning。大括号保护的大写 {DNA} 不受影响，括号告诉格式化程序按原样保留，没有它 DNA 会印成 Dna。",
          "刊名和卷一起斜体，期紧跟在卷后面放括号，中间没有空格：Nature, 521(7553)。页码保持完整长度，436–444，用长破折号，APA 不像 MLA 那样缩写范围。没有期号的条目只剩斜体的卷。",
        ],
        table: {
          headers: ["条目类型", "题名处理", "容器"],
          rows: [
            ["@article", "句首大写，不加标记", "刊名与卷斜体"],
            ["@book", "句首大写，斜体", "出版社"],
            ["@inproceedings", "句首大写，不加标记", "会议录名斜体"],
            ["@incollection", "句首大写，不加标记", "书名斜体，前面加 In"],
            ["@phdthesis", "句首大写，斜体", "大学"],
            ["@online", "句首大写，不加标记", "网站名"],
          ],
        },
      },
      {
        h2: "DOI 写在条目末尾，用完整链接",
        paragraphs: [
          "APA 第 7 版把 DOI 写成完整链接 https://doi.org/10.1038/nature14539，后面不加句点，前面不加 DOI:。没有 DOI 才用 URL，写出来不加尖括号。老条目里 DOI 没带解析前缀也能转，格式化程序会补上。",
          "预印本、数据集、在线优先出版没有页码，DOI 仍然收尾，卷期页码那一块直接没有。有些出版社只登记文章编号 e12345，查找读的是 page 字段，这类条目拿不到编号，手工补上。",
        ],
      },
      {
        h2: "转换后逐条自查",
        paragraphs: [
          "贴进论文之前按四点检查：作者最多二十位、题名句首大写、刊名和卷斜体、页码完整加长破折号、DOI 在末尾用完整链接。",
          "留着 .bib 原文件，下次投别的期刊换个格式就能重新生成；下载的 .ris 可以导回 Zotero 或 EndNote，不用重新录入。",
        ],
        list: [
          "作者：缩写，最后一位前加 &，最多二十位。",
          "题名：句首大写；刊名与卷：斜体。",
          "数字：卷（期），页码完整加长破折号。",
          "DOI：末尾写完整链接。",
        ],
      },
    ],
    faqs: [
      {
        q: "APA 第 7 版列几位作者？",
        a: "文献表最多二十位。二十一位以上印前十九位、省略号、最后一位。正文引用三位以上作者从第一次就用首位加 et al.",
      },
      {
        q: "题名为什么转完变小写了？",
        a: "APA 第 7 版的文章题名用句首大写，只有第一个词和专有名词保留大写，Deep Learning 变成 Deep learning。",
      },
      {
        q: "DOI 在 APA 里写在哪？",
        a: "条目末尾，写完整链接 https://doi.org/10.1038/nature14539。前面不加 DOI:，后面不加句点。",
      },
      {
        q: "大括号保护的大写 {DNA} 会怎样？",
        a: "括号去掉，里面的文字按原样保留，{DNA} 印成 DNA 而不是 Dna。这也是用转换器而不是手打的原因之一。",
      },
      {
        q: "BibTeX 转 APA 第 7 版保留卷和期吗？",
        a: "保留，写成斜体的卷加括号里的期：521(7553)。没有 number 字段的条目只剩卷。",
      },
      {
        q: ".bib 文件会被上传吗？",
        a: "不会。BibTeX 转 APA 第 7 版全程在浏览器本地完成，不上传服务器，也不用注册账号。",
      },
    ],
    relatedSlugs: ["apa-to-bibtex", "doi-to-apa", "bibtex-to-harvard"],
    ctaPrimary: "粘贴 BibTeX，生成 APA 参考文献",
    ctaSecondary: "把 APA 文献表转回 BibTeX",
    updated: "2026-11-18",
  },

  "apa-to-bibtex": {
    slug: "apa-to-bibtex",
    keyword: "APA 转 BibTeX",
    title: "APA 转 BibTeX：文献表还原 .bib",
    description:
      "APA 转 BibTeX：把文献表粘进来，@article 条目就回来了，类型、引用键、页码都对好；再讲哪几类条目还得手工处理、哪些形状解析器认不出来。",
    h1: "APA 转 BibTeX：把文献表变回字段",
    intro:
      "排好版的 APA 文献表是成品：生成它用的字段边界已经没了。APA 转 BibTeX 要靠标点和位置把字段重建回来，好在 APA 第 7 版足够死板，读得回去。这篇讲解析器认什么形状、每个部分变成哪个字段、哪几处还得人工处理。",
    sections: [
      {
        h2: "APA 转 BibTeX：解析器认什么形状",
        paragraphs: [
          "解析器认的形状是「作者块、括号年份、句点」。LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539 正好按这个拆：作者块在年份处结束，题名在年份后的第一个句点处结束，剩下的是刊名、卷、期、页码。一条空一行粘进来，整张表一次读完。",
          "形状之外就是失效模式：法律文献、没有个人作者的网页、日期是区间 (2020-2023) 的条目都认不出来。直接用手动录入表单填，比修解析结果更快，解析器遇到也会明说，而不是瞎猜。",
        ],
        table: {
          headers: ["APA 著录项", "BibTeX 字段", "LeCun 的例子"],
          rows: [
            ["作者块", "author，缩写保留", "LeCun, Y. and Bengio, Y. and Hinton, G."],
            ["括号里的年份", "year", "2015"],
            ["题名，句首大写", "title", "Deep learning"],
            ["刊名、卷（期）", "journal、volume、number", "Nature、521、7553"],
            ["页码范围", "pages，双短横", "436--444"],
            ["DOI 链接", "doi", "10.1038/nature14539"],
          ],
        },
      },
      {
        h2: "重建的条目和它的引用键",
        paragraphs: [
          "重建出来是一条普通的 @article，引用键按记录生成：首位作者的姓、年份、题名的第一个词，LeCun 那篇就是 @article{LeCun2015Deep, ...}。键只是个标签，随便改，但同一个 .bib 文件里不能重复，两个条目共用一个键编译会报错。",
          "页码回来是双短横 436--444，BibTeX 就是用双短横写长破折号。DOI 链接剥回裸标识符放进 doi 字段，解析链接另外留作 url 字段，一来一回什么都不丢。",
        ],
        list: [
          "一条空一行粘进来，整张表一次读完。",
          "核对引用键：同一年同一位作者的两篇论文可能撞键。",
          "页码回来是双短横 436--444。",
          "DOI 留在 doi 字段，链接另外留作 url 字段。",
        ],
      },
      {
        h2: "作者：缩写就是缩写",
        paragraphs: [
          "APA 写 LeCun, Y.，重建的 BibTeX 没法知道 Y. 是 Yann。缩写就是缩写：重建的 author 字段是 LeCun, Y. and Bengio, Y. and Hinton, G.，编译没问题，只是比手写的 .bib 文件单薄。全名重要的话事后在 .bib 文本里补上，& 去掉换成 and。",
          "文献表里没有 et al.：APA 第 7 版二十位以内全列，APA 转 BibTeX 转换整张表时作者块是完整的。et al. 只出现在正文引用 (LeCun et al., 2015) 里，那种粘进来解析不了——粘文献表，别粘正文。机构作者直接出来是普通名字，套双重大括号 {{World Health Organization}}，BibTeX 才不会把它拆成三个人。",
        ],
      },
      {
        h2: "类型：期刊文章和会议论文",
        paragraphs: [
          "解析器默认 @article，只有文字告诉它才换类型。容器里出现 In 或者 Proceedings、Conference、Symposium、Proceeding 这些词就变成 @inproceedings，会议录名进 booktitle 字段。其余都留在 @article，粘进来的大列表多数情况是对的。",
          "专著在 APA 文本里没有独立形状：专著条目读起来像容器是出版社的文章，所以先出来是 @article，手工改成 @book。学位论文、报告也一样。日期是 n.d. 的条目没有年份，year 字段是空的，去出版方页面找年份补上，不然编译出来缺年份。",
        ],
        table: {
          headers: ["APA 文本里的线索", "BibTeX 条目类型", "核对什么"],
          rows: [
            ["刊名、卷（期）", "@article", "默认，通常是对的"],
            ["In，或 Proceedings / Conference", "@inproceedings", "容器变成 booktitle"],
            ["出版社，没有刊名", "@article（手工改）", "把类型改成 @book"],
            ["大学、学位论文", "@article（手工改）", "把类型改成 @phdthesis"],
            ["日期是 n.d.", "@article，没有年份", "去源头找年份补上"],
          ],
        },
      },
      {
        h2: "编译之前检查重建的 .bib",
        paragraphs: [
          "编译之前按四点检查：每个条目引用键唯一、作者之间用 and 连接、题名里该大写的地方大写、页码用双短横。题名最弱：APA 印句首大写，DNA 这种词回来是小写，重新加大括号保护。",
          "APA 文献表留着，等 PDF 编译过一次再删。排好版的字符串变不回字段，但刚重建的 .bib 文件换个格式马上能再生成一遍，下载的 .ris 可以导回 Zotero 或 EndNote。",
        ],
        list: [
          "引用键：文件里唯一，撞了就改名。",
          "作者：and 连接，缩写就是缩写。",
          "题名：APA 压小写的大写词重新加大括号。",
          "页码：双短横 436--444。",
        ],
      },
    ],
    faqs: [
      {
        q: "APA 的缩写能展开回全名吗？",
        a: "不能。APA 印 Y.，解析器没法知道是 Yann。全名重要的话事后在 .bib 文本里补上。",
      },
      {
        q: "APA 转 BibTeX 时 et al. 怎么处理？",
        a: "不用处理：文献表里没有它，APA 二十位以内全列。et al. 只出现在正文引用里，那种粘进来解析不了，粘文献表。",
      },
      {
        q: "专著为什么变成 @article 了？",
        a: "专著在 APA 文本里没有独立形状。解析器默认 @article，只有会议论文靠容器认得出来。手工把类型改成 @book。",
      },
      {
        q: "日期是 n.d. 的条目怎么办？",
        a: "year 字段回来是空的，去出版方页面找年份补上。APA 的 n.d. 在 BibTeX 里没有对应写法。",
      },
      {
        q: "重建的条目还留着 DOI 吗？",
        a: "留着，doi 字段是裸标识符，另外还有个 url 字段存 https://doi.org/ 链接。导进文献管理软件再导出来也不会丢。",
      },
      {
        q: "APA 文献表会被上传吗？",
        a: "不会。APA 转 BibTeX 全程在浏览器本地完成，不上传服务器，也不用注册账号。",
      },
    ],
    relatedSlugs: ["bibtex-to-apa", "doi-to-bibtex", "bibtex-to-mla"],
    ctaPrimary: "把 APA 文献表转回 .bib",
    ctaSecondary: "看 BibTeX 怎么转成 APA",
    updated: "2026-11-18",
  },

  "doi-to-apa": {
    slug: "doi-to-apa",
    keyword: "DOI 转 APA 第 7 版",
    title: "DOI 转 APA 第 7 版：Crossref 查元数据",
    description:
      "DOI 转 APA 第 7 版靠 Crossref 反查书目信息：二十位作者规则、句首大写题名、斜体的刊名与卷、DOI 写完整链接，附正文引用写法与批量做法。",
    h1: "DOI 转 APA 第 7 版：从标识符到参考文献",
    intro:
      "DOI 是拿到完整 APA 参考文献最省事的办法，也是最容易缺字段的办法。DOI 转 APA 第 7 版靠 Crossref 反查出版方登记的元数据，再按 APA 第 7 版排版。现代期刊的登记一般很全，其它文献就要多看一眼。",
    sections: [
      {
        h2: "DOI 转 APA 第 7 版：一次查找能拿到什么",
        paragraphs: [
          "一次查找就是向 Crossref 的 REST 接口发一次请求，拿回出版方登记的 JSON。从里面读九个字段：题名、刊名、作者（姓和名分开）、出版日期、卷、期、页码、出版社和 DOI 本身。",
          "这九个字段正好就是 APA 第 7 版一条参考文献需要的全部，所以只给一个 DOI 常常就能拿到成品。摘要、许可、资助信息这些用不上的字段直接丢掉。以 10.1038/nature14539 为例，查到的是 LeCun 等人 2015 年发表在 Nature 521 卷 7553 期 436–444 页的 Deep learning。",
          "麻烦在登记质量。老记录常有全大写题名、缺卷期、作者没有名，只有姓。DOI 转 APA 第 7 版的结果结构正确、仍需改两处的情况很常见，知道盯哪几个字段就快了。",
        ],
        table: {
          headers: ["Crossref 字段", "APA 第 7 版著录位", "LeCun 的例子"],
          rows: [
            ["author[].family / given", "姓加缩写", "LeCun, Y., Bengio, Y., & Hinton, G."],
            ["issued date-parts", "作者后括号里的年份", "(2015)."],
            ["title", "句首大写，无标记", "Deep learning."],
            ["container-title", "刊名斜体", "Nature,"],
            ["volume / issue", "卷斜体，期放括号", "521(7553),"],
            ["page", "完整范围，长破折号", "436–444."],
            ["DOI", "末尾写链接", "https://doi.org/10.1038/nature14539"],
          ],
        },
      },
      {
        h2: "APA 第 7 版的形状：作者、年份、斜体",
        paragraphs: [
          "APA 第 7 版的文献表最多列二十位作者。二十一位以上只印前十九位、一个省略号、最后一位作者。正文里的引用更严：三位以上作者从第一次出现就写成首位作者加 et al.，所以正文里 (LeCun et al., 2015) 是对的，文献表里三位全列也是对的。",
          "题名改句首大写，Deep Learning 变成 Deep learning；刊名和卷一起斜体，期紧跟在卷后面放括号，中间没有空格：Nature, 521(7553)。DOI 收尾写完整链接 https://doi.org/10.1038/nature14539，后面不加句点，前面不加 DOI:。",
        ],
      },
      {
        h2: "Crossref 里没有这条 DOI",
        paragraphs: [
          "Crossref 只是注册机构之一，DOI 转 APA 第 7 版只能读它自己的登记。10.48550/arXiv.2301.00001 这种 arXiv DOI 由 DataCite 注册，Crossref 再怎么查都是查无此号。改贴 arXiv ID，例如 2301.00001，或者 abs 链接：系统另外认这个格式，版本号去掉，从 arXiv 接口读记录。",
          "Zenodo、figshare、Dryad 的标识，包括 10.5281 这一家，也都是 DataCite 的记录，Crossref 里没有。它们是数据集，条目是数据集参考文献，容器是仓储库而不是期刊。直接粘 https://doi.org/ 开头的链接也能识别，系统会先扫出 DOI 形状的字串，句末的分号、句点先去掉再查。",
        ],
      },
      {
        h2: "同一条记录的正文引用",
        paragraphs: [
          "文献表只是一半工作，正文引用要对得上。三位以上作者括号里写 (LeCun et al., 2015)，叙述式写 LeCun et al. (2015)，年份跟在名字后面。两位作者括号里两个都写，中间用 &：(LeCun & Bengio, 2015)，叙述式用 and。",
          "引用原话还要加页码：单页 (LeCun et al., 2015, p. 436)，多页 pp. 436–437。页码来自同一份 Crossref 登记，没有 page 字段的记录写不出页码，引用之前先看条目。",
        ],
        list: [
          "三位以上作者：括号里 (LeCun et al., 2015)。",
          "两位作者：括号里 (LeCun & Bengio, 2015)，叙述式用 and。",
          "引用原话：加上 p. 或 pp. 和引用的页码。",
          "叙述式：LeCun et al. (2015) 认为……",
        ],
      },
      {
        h2: "DOI 转 APA 第 7 版的批量做法",
        paragraphs: [
          "DOI 输入框一次只解析一个标识符：读输入里第一个 DOI 形状的字串或 arXiv 标识符，返回一条记录。四十条 DOI 就是四十次查找，文献已经在手里的时候换别的输入方式更快。",
          "整批粘贴 APA 文本，一条空一行，或者直接粘 BibTeX，两种都是一次解析。DOI 输入框留给源头就坏掉的那条：题名丢了、页码在复制里丢了。长列表里通常每条坏掉的文献查一次 DOI 就够了。",
          "查找和转换记录留在浏览器本地历史里，最近二十条，昨天查过的标识符一点就回来。输出能下 .bib、.ris 或纯文本，.ris 可以导回 EndNote 或 Zotero，不用重新录入。",
        ],
        list: [
          "粘 DOI，或者只有整条参考文献就粘整条。",
          "先看作者数量再信文献表。",
          "卷期页码缺失先在源记录里补，再重新排版。",
          "要导回管理软件就下 .ris。",
        ],
      },
    ],
    faqs: [
      {
        q: "DOI 查找能拿到页码吗？",
        a: "多数能，因为多数出版社登记了起止页码。老记录或只有文章编号的没有，页码那一项就是空的，自己补上。",
      },
      {
        q: "arXiv 的 DOI（10.48550）为什么查不到？",
        a: "10.48550 由 DataCite 注册而非 Crossref，Crossref 元数据里没有这条记录。改用 arXiv ID 或文章链接作为输入即可。",
      },
      {
        q: "一次能转多少条 DOI？",
        a: "DOI 输入框一次解析一个标识符。长列表粘 APA 文本或 BibTeX，一次解析完。",
      },
      {
        q: "DOI 在参考文献里写在哪？",
        a: "条目末尾，写完整链接 https://doi.org/10.1038/nature14539。前面不加 DOI:，后面不加句点。",
      },
      {
        q: "DOI 转 APA 第 7 版会上传我的文献吗？",
        a: "不会。只把标识符发给 Crossref 查出版方元数据，不用注册账号，不上传文献列表，服务器也不留副本。",
      },
      {
        q: "三位作者正文里怎么写？",
        a: "括号里 (LeCun et al., 2015)，叙述式 LeCun et al. (2015)。文献表里三位全列。",
      },
    ],
    relatedSlugs: ["doi-to-bibtex", "bibtex-to-apa", "doi-to-mla"],
    ctaPrimary: "粘一条 DOI，生成 APA 参考文献",
    ctaSecondary: "同一条记录拿 BibTeX",
    updated: "2026-11-18",
  },

  "bibtex-to-harvard": {
    slug: "bibtex-to-harvard",
    keyword: "BibTeX 转 Harvard",
    title: "BibTeX 转 Harvard：Cite Them Right",
    description:
      "BibTeX 转 Harvard（Cite Them Right 第 11 版）：三位作者规则、题名加引号、刊名斜体、doi: 前缀；再讲 Harvard 各校版本不一样的地方与自查四点。",
    h1: "BibTeX 转 Harvard：字段逐项拆解",
    intro:
      "Harvard 没有统一的官方手册，这是 BibTeX 转 Harvard 首先要知道的事。这篇按 Cite Them Right 第 11 版讲，转换器用的就是这个版本，也是多数英国大学指南的底本。你学校如果发了自己的 Harvard 指南，按文末四点对照着看。",
    sections: [
      {
        h2: "BibTeX 转 Harvard：字段落到哪里",
        paragraphs: [
          "以 LeCun 等人 2015 年发表在 Nature 521 卷 7553 期 436–444 页的 Deep Learning 为例，BibTeX 是 @article{lecun2015deep, author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}, title = {Deep Learning}, journal = {Nature}, year = {2015}, volume = {521}, number = {7553}, pages = {436--444}, doi = {10.1038/nature14539}}。Harvard 输出是 LeCun, Y., Bengio, Y. and Hinton, G. (2015) “Deep learning,” Nature, 521(7553), pp. 436–444. doi:10.1038/nature14539.",
          "刊名在渲染出的页面里是斜体，卷和期连在一起写，页码前面加 pp.、保持完整长度。DOI 是裸标识符，前面加 doi:，没有 https://doi.org/ 前缀，冒号后面也没有空格。",
        ],
        table: {
          headers: ["BibTeX 字段", "Harvard 著录位（Cite Them Right 第 11 版）", "写法要点"],
          rows: [
            ["author", "姓加缩写，最后一位前用 and", "LeCun, Y., Bengio, Y. and Hinton, G."],
            ["year", "作者后括号内", "(2015)"],
            ["title", "加引号", "“Deep learning,”"],
            ["journal", "斜体", "Nature,"],
            ["volume / number", "卷（期），没有空格", "521(7553),"],
            ["pages", "pp. 加完整范围", "pp. 436–444."],
            ["doi", "doi: 加裸标识符", "doi:10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "作者：三位，之后用 et al.",
        paragraphs: [
          "Cite Them Right 的 Harvard 最多列三位作者。四位以上作者只列首位加 et al.，第二、第三、第四位都不出现。正文引用同一个分界：三位作者全写出来，(LeCun, Bengio and Hinton, 2015)，四位以上才用 et al.",
          "最后一位作者前面是 and，绝不是 &，这是 Harvard 文献表和 APA 一眼能分出来的地方。缩写就是缩写，机构作者要双重大括号保护，写成 {{World Health Organization}}，否则会被拆成三个人。其它 Harvard 版本不一样：有的文献表里全列作者，你学校指南如果这么说，按学校的来。",
        ],
        list: [
          "转换前数一数每个 author 字段有几个人。",
          "三位作者：三位全列，中间用 and 连接。",
          "四位以上作者：只列首位加 et al.",
          "分隔词是 and，绝不是 &。",
        ],
      },
      {
        h2: "题名引号、斜体与 doi: 前缀",
        paragraphs: [
          "文章题名加引号、写句首大写，Deep Learning 变成 “Deep learning,”，逗号在右引号里面。刊名斜体，卷和期连在一起写 521(7553)，页码前面加 pp.、保持完整长度，pp. 436–444。",
          "DOI 最容易让人意外：Cite Them Right 的 Harvard 写成 doi:10.1038/nature14539，裸标识符前面加 doi:，冒号后面没有空格，也没有链接。其它 Harvard 指南有的写完整 https://doi.org/ 链接，学校指南如果要求链接，按学校的来，转换器按 Cite Them Right 第 11 版输出。",
        ],
      },
      {
        h2: "条目类型：@article、@book、@inproceedings",
        paragraphs: [
          "专著的开头一样是作者加年份，容器不同。@book{goodfellow2016deep, author = {Goodfellow, Ian and Bengio, Yoshua and Courville, Aaron}, title = {Deep Learning}, publisher = {MIT Press}, year = {2016}} 变成 Goodfellow, I., Bengio, Y. and Courville, A. (2016) Deep Learning. MIT Press. 书名斜体，出版社取容器位，没有卷期那一块。",
          "会议论文题名加引号，会议录名斜体、前面加 In。章节题名加引号，书名斜体。专著的 .bib 条目里没有出版地，Harvard 输出就只有出版社，学校指南要求出版地的话手工补上。",
        ],
        table: {
          headers: ["条目类型", "加引号的题名", "斜体的容器"],
          rows: [
            ["@article", "文章题名", "刊名"],
            ["@inproceedings", "论文题名", "会议录名"],
            ["@book", "书名（斜体，不加引号）", "出版地与出版社"],
            ["@incollection", "章节题名", "书名"],
            ["@phdthesis", "论文题名（斜体，不加引号）", "大学"],
            ["@online", "页面题名", "网站名"],
          ],
        },
      },
      {
        h2: "转换后逐条自查",
        paragraphs: [
          "贴进论文之前按四点检查：et al. 前面最多三位作者、题名有引号、刊名斜体、卷（期）加 pp. 范围、DOI 在末尾写 doi: 前缀。学校指南跟其中任何一点不一样，按学校指南来，Harvard 是一族格式，不是一本手册。",
          "留着 .bib 原文件，下次投别的期刊换个格式就能重新生成；下载的 .ris 可以导回 Zotero 或 EndNote，不用重新录入。",
        ],
        list: [
          "作者：最多三位，四位以上加 et al.",
          "题名：加引号；刊名：斜体。",
          "数字：卷（期），pp. 加完整范围。",
          "DOI：末尾写 doi: 加裸标识符。",
        ],
      },
    ],
    faqs: [
      {
        q: "这篇讲的是哪个 Harvard？",
        a: "Cite Them Right 第 11 版，转换器用的版本，也是多数英国大学指南的底本。Harvard 没有统一的官方手册，学校指南不一样就按学校的来。",
      },
      {
        q: "Harvard 列几位作者？",
        a: "三位。四位以上作者只列首位加 et al.，文献表和正文都一样。",
      },
      {
        q: "DOI 为什么写 doi: 而不是链接？",
        a: "Cite Them Right 第 11 版印裸标识符，前面加 doi:，冒号后面没有空格，也没有解析链接。其它 Harvard 指南有的写完整链接。",
      },
      {
        q: "题名用单引号还是双引号？",
        a: "转换器输出双引号，逗号在右引号里面：“Deep learning,”。有的学校指南用单引号，按学校的来。",
      },
      {
        q: "大括号保护的大写 {DNA} 会怎样？",
        a: "括号去掉，里面的文字按原样保留，{DNA} 印成 DNA 而不是 Dna。这也是用转换器而不是手打的原因之一。",
      },
      {
        q: ".bib 文件会被上传吗？",
        a: "不会。BibTeX 转 Harvard 全程在浏览器本地完成，不上传服务器，也不用注册账号。",
      },
    ],
    relatedSlugs: ["bibtex-to-apa", "bibtex-to-mla", "doi-to-bibtex"],
    ctaPrimary: "粘贴 BibTeX，生成 Harvard 参考文献",
    ctaSecondary: "同一条目看 APA 第 7 版",
    updated: "2026-11-18",
  },

  "doi-to-mla": {
    slug: "doi-to-mla",
    keyword: "DOI 转 MLA 第 9 版",
    title: "DOI 转 MLA 第 9 版：Crossref 生成条目",
    description:
      "DOI 转 MLA 第 9 版靠 Crossref 反查书目信息：只列一位作者加 et al.、题名加引号、刊名斜体、DOI 写链接，附正文引用写法与批量做法。",
    h1: "DOI 转 MLA 第 9 版：从标识符到 Works Cited",
    intro:
      "DOI 是拿到完整 MLA 条目最省事的办法，也是最容易缺字段的办法。DOI 转 MLA 第 9 版靠 Crossref 反查出版方登记的元数据，再按 MLA 第 9 版排版。现代期刊的登记一般很全，其它文献就要多看一眼。",
    sections: [
      {
        h2: "DOI 转 MLA 第 9 版：一次查找能拿到什么",
        paragraphs: [
          "一次查找就是向 Crossref 的 REST 接口发一次请求，拿回出版方登记的 JSON。从里面读九个字段：题名、刊名、作者（姓和名分开）、出版日期、卷、期、页码、出版社和 DOI 本身。",
          "这九个字段正好就是 MLA 第 9 版一条 Works Cited 需要的全部，所以只给一个 DOI 常常就能拿到成品。摘要、许可、资助信息这些用不上的字段直接丢掉。以 10.1038/nature14539 为例，查到的是 LeCun 等人 2015 年发表在 Nature 521 卷 7553 期 436–444 页的 Deep learning。",
          "麻烦在登记质量。老记录常有全大写题名、缺卷期、作者没有名，只有姓。DOI 转 MLA 第 9 版的结果结构正确、仍需改两处的情况很常见，知道盯哪几个字段就快了。",
        ],
        table: {
          headers: ["Crossref 字段", "MLA 第 9 版著录位", "LeCun 的例子"],
          rows: [
            ["author[].family / given", "只列首位加 et al.", "LeCun, Yann, et al."],
            ["title", "加引号，实词大写", "“Deep Learning.”"],
            ["container-title", "容器名斜体", "Nature,"],
            ["issued date-parts", "年份在卷期之后", "2015,"],
            ["volume / issue", "vol.、no. 缩写", "vol. 521, no. 7553,"],
            ["page", "pp. 加缩写范围", "pp. 436–44."],
            ["DOI", "末尾写链接", "https://doi.org/10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "MLA 第 9 版的形状：一位作者、引号、斜体",
        paragraphs: [
          "MLA 第 9 版只翻转第一位作者的姓名。LeCun, Yann, et al.，第二、第三位作者不出现，因为三位以上作者只列首位加 et al.。两位作者两人全列：Doe, John, and Jane Smith。",
          "题名加引号、实词大写，写成 “Deep Learning.”，刊名斜体作容器。卷和期写成 vol. 521, no. 7553，页码缩写成 pp. 436–44，DOI 在末尾写完整链接。年份在靠后的位置，卷期之后，这是没转干净的 APA 条目最容易露馅的地方。",
        ],
      },
      {
        h2: "Crossref 里没有这条 DOI",
        paragraphs: [
          "Crossref 只是注册机构之一，DOI 转 MLA 第 9 版只能读它自己的登记。10.48550/arXiv.2301.00001 这种 arXiv DOI 由 DataCite 注册，Crossref 再怎么查都是查无此号。改贴 arXiv ID，例如 2301.00001，或者 abs 链接：系统另外认这个格式，版本号去掉，从 arXiv 接口读记录。",
          "Zenodo、figshare、Dryad 的标识，包括 10.5281 这一家，也都是 DataCite 的记录，Crossref 里没有。它们是数据集，条目是数据集参考文献，容器是仓储库而不是期刊。直接粘 https://doi.org/ 开头的链接也能识别，系统会先扫出 DOI 形状的字串，句末的分号、句点先去掉再查。",
        ],
      },
      {
        h2: "同一条记录的正文引用",
        paragraphs: [
          "MLA 的正文引用指向页码，不是指向年份。APA 写 (LeCun et al., 2015) 的地方，MLA 引用 436 页的原话写 (LeCun et al. 436)，整篇作品写 (LeCun et al.)。Works Cited 按作者字母顺序排，转换不改变任何编号，数字制式才重排。",
          "所以 DOI 转 MLA 第 9 版基本是机械活：列表顺序不变，引用标记换形状，唯一手工步骤是找到你引用的原话到底在哪一页。页码来自同一份 Crossref 登记，没有 page 字段的记录写不出页码。",
        ],
        list: [
          "三位以上作者：引用原话写 (LeCun et al. 436)。",
          "整篇作品：(LeCun et al.)，不加页码。",
          "两位作者：(LeCun and Bengio 436)。",
          "列表按字母顺序排，不重排。",
        ],
      },
      {
        h2: "DOI 转 MLA 第 9 版的批量做法",
        paragraphs: [
          "DOI 输入框一次只解析一个标识符：读输入里第一个 DOI 形状的字串或 arXiv 标识符，返回一条记录。四十条 DOI 就是四十次查找，文献已经在手里的时候换别的输入方式更快。",
          "整批粘贴 APA 文本，一条空一行，或者直接粘 BibTeX，两种都是一次解析。DOI 输入框留给源头就坏掉的那条：题名丢了、页码在复制里丢了。长列表里通常每条坏掉的文献查一次 DOI 就够了。",
          "查找和转换记录留在浏览器本地历史里，最近二十条，昨天查过的标识符一点就回来。输出能下 .bib、.ris 或纯文本，.ris 可以导回 EndNote 或 Zotero，不用重新录入。",
        ],
        list: [
          "粘 DOI，或者只有整条参考文献就粘整条。",
          "先看作者数量再信列表。",
          "卷期页码缺失先在源记录里补，再重新排版。",
          "要导回管理软件就下 .ris。",
        ],
      },
    ],
    faqs: [
      {
        q: "DOI 查找能拿到页码吗？",
        a: "多数能，因为多数出版社登记了起止页码。老记录或只有文章编号的没有，pp. 那一项就是空的，自己补上。",
      },
      {
        q: "arXiv 的 DOI（10.48550）为什么查不到？",
        a: "10.48550 由 DataCite 注册而非 Crossref，Crossref 元数据里没有这条记录。改用 arXiv ID 或文章链接作为输入即可。",
      },
      {
        q: "一次能转多少条 DOI？",
        a: "DOI 输入框一次解析一个标识符。长列表粘 APA 文本或 BibTeX，一次解析完。",
      },
      {
        q: "DOI 写链接还是简写？",
        a: "写完整链接 https://doi.org/10.1038/nature14539。MLA 第 9 版要求 DOI 是可点击的链接。",
      },
      {
        q: "三位作者 MLA 为什么只列一位？",
        a: "MLA 第 9 版规定三位以上作者只列首位加 et al.，APA 最多列二十位，同一篇论文两种写法差别很大。",
      },
      {
        q: "DOI 转 MLA 第 9 版会上传我的文献吗？",
        a: "不会。只把标识符发给 Crossref 查出版方元数据，不用注册账号，不上传文献列表，服务器也不留副本。",
      },
    ],
    relatedSlugs: ["doi-to-apa", "doi-to-bibtex", "bibtex-to-mla"],
    ctaPrimary: "粘一条 DOI，生成 MLA 条目",
    ctaSecondary: "同一条记录看 APA 第 7 版",
    updated: "2026-11-18",
  },
  "arxiv-to-ieee": {
    slug: "arxiv-to-ieee",
    keyword: "arXiv 转 IEEE",
    title: "arXiv 转 IEEE：预印本变编号引用",
    description:
      "arXiv 转 IEEE：贴 abs 链接或 arXiv 编号，从 arXiv 接口抓元数据，生成带编号的 IEEE 引用和 [Online] 链接。",
    h1: "arXiv 转 IEEE：预印本变编号引用",
    intro:
      "预印本没有期刊卷、期和页码，所以 arXiv 转 IEEE 和转已发表论文不是一回事。查找从 arXiv 接口读记录，IEEE 排版给它编号、题名加引号，末尾写 [Online]. Available 链接。这篇讲查找到底接受什么输入、记录里有什么、成品长什么样。",
    sections: [
      {
        h2: "arXiv 转 IEEE：一次查找能拿到什么",
        paragraphs: [
          "一次查找就是向 arXiv 接口发一次请求，拿回一条预印本记录。从里面读六个字段：题名、作者（姓和名分开）、首次发布年份、abs 链接、出版社 arXiv 和容器名 arXiv preprint。",
          "这六个字段就是记录的全部，所以 arXiv 转 IEEE 的条目很短。没有卷、期、页码和 DOI 可以放，成品比期刊条目少几个元素，也没什么可编的。以 1706.03762 为例，查到的是 Vaswani、Shazeer、Parmar、Uszkoreit、Jones、Gomez、Kaiser、Polosukhin 2017 年发在 arXiv 上的 Attention is all you need。",
          "作者拆分是机械的：名字最后一个词作姓，前面作名。多数西方人名没问题，姓不在最后的名字会拆错，长列表先看一眼作者行再信。",
        ],
        table: {
          headers: ["arXiv 接口字段", "IEEE 著录位", "Attention 的例子"],
          rows: [
            ["title", "加引号，小写句首", "“Attention is all you need,”"],
            ["author names", "作者多只列首位加 et al.", "A. Vaswani et al.,"],
            ["published year", "年份在题名之后", "2017,"],
            ["publisher", "作容器出现", "arXiv."],
            ["abs URL", "[Online]. Available 链接，末尾", "https://arxiv.org/abs/1706.03762"],
            ["volume / issue / pages", "没有：预印本没有这些", "—"],
          ],
        },
      },
      {
        h2: "贴 abs 链接，不要只贴裸 ID",
        paragraphs: [
          "DOI 查找框接受两种 arXiv 输入：完整 abs 链接 https://arxiv.org/abs/1706.03762，或者带前缀的编号 arXiv:1706.03762。只贴裸 ID 1706.03762 识别不到：查找框只认 DOI 形状的字串和这两种 arXiv 写法，裸数字会直接报错，而不是返回记录。",
          "版本号后缀在查之前去掉，1706.03762v2 按 1706.03762 查，返回当前版本的记录。另一个坑是 arXiv 自己的 DOI：10.48550/arXiv.1706.03762 由 DataCite 注册而非 Crossref，DOI 查找查无此号。改贴 arXiv 链接，记录从 arXiv 接口来。",
        ],
        list: [
          "能用：https://arxiv.org/abs/1706.03762。",
          "能用：arXiv:1706.03762（v2、v3 后缀自动去掉）。",
          "不能用：只贴裸数字 1706.03762。",
          "Crossref 查不到：10.48550/arXiv.1706.03762，改贴 arXiv 链接。",
        ],
      },
      {
        h2: "IEEE 的形状：[1]、一位作者、[Online]",
        paragraphs: [
          "Attention 这篇的成品就是这样：`[1] A. Vaswani et al., “Attention is all you need,” 2017, arXiv. [Online]. Available: https://arxiv.org/abs/1706.03762`。开头是方括号编号，题名加引号，年份在题名之后，容器是出版社 arXiv 而不是刊名。八位作者只剩首位加 et al.，因为预印本是以通用 article 记录进来的，长作者列表会被缩写。",
          "短是正常的，要盯的就是这个。期刊条目靠 vol.、no.、pp. 证明出处，预印本条目靠 [Online]. Available 链接，因为链接是唯一的稳定定位。如果这篇论文后来正式发表了，改转发表版的 DOI：期刊条目有卷和页码，arXiv 版只用来引用预印本本身。",
        ],
      },
      {
        h2: "正文引用与参考文献表",
        paragraphs: [
          "IEEE 按正文首次引用顺序编号：第一次引用的文献是 [1]，第二次是 [2]，列表按这个顺序排。arXiv 转 IEEE 按你粘贴的顺序编号，所以按引用顺序粘，或者转完再重排。正文里的标记就是方括号数字：`... as shown in [1].` 同一篇文献第二次引用还是同一个号，一串写 [1]–[3]。",
          "IEEE 里没有作者-年份标记，(Vaswani, 2017) 不会出现。列表也不按字母顺序排，这是没转干净的 APA 列表最容易露馅的地方。第二段插进一篇新文献，后面所有号都往后挪一位，所以编号放在改稿最后一步做。",
        ],
        list: [
          "按首次引用顺序粘贴参考文献。",
          "正文引用写 [1]，不写作者名或年份。",
          "插进新文献后重排，后面的号都会变。",
          "同一篇文献永远是同一个号。",
        ],
      },
      {
        h2: "arXiv 转 IEEE 的批量做法",
        paragraphs: [
          "DOI 输入框一次只解析一个标识符：读输入里第一个 DOI 形状的字串或 arXiv 标识符，返回一条记录。四十篇预印本就是四十次查找，文献已经在手里的时候换别的输入方式更快。",
          "整批粘贴 BibTeX，一条 @article 一块，一次解析完。arXiv 记录导出的 .bib 保持 @article，journal = {arXiv preprint}，带 abs 链接，引用键按姓-年-题名首词的规则生成：Vaswani2017Attention。长列表里通常只有纯 arXiv 预印本才需要逐条查 DOI 输入框。",
          "查找和转换记录留在浏览器本地历史里，最近二十条，昨天查过的标识符一点就回来。输出能下 .bib、.ris 或纯文本，.ris 可以导回 EndNote 或 Zotero，不用重新录入。",
        ],
        list: [
          "粘 abs 链接，或者带 arXiv: 前缀的编号。",
          "长列表先看作者行再信。",
          "作者拆错在源记录里改，再重新排版。",
          "要导回管理软件就下 .ris。",
        ],
      },
    ],
    faqs: [
      {
        q: "只贴 arXiv ID 能查吗？",
        a: "不能。贴 abs 链接 https://arxiv.org/abs/1706.03762，或者带前缀的 arXiv:1706.03762。只贴裸数字 1706.03762 查找框不认。",
      },
      {
        q: "论文有 v2、v3 版本怎么办？",
        a: "版本号后缀在查之前去掉，1706.03762v2 按 1706.03762 查，返回当前版本的记录。",
      },
      {
        q: "IEEE 条目为什么只列一位作者？",
        a: "arXiv 记录以通用 article 类型进来，IEEE 排版把长作者列表缩写成首位加 et al.。八位作者的 Attention 一文写成 A. Vaswani et al.。",
      },
      {
        q: "条目里有 DOI 吗？",
        a: "没有。arXiv 记录没有 DOI，条目末尾写 [Online]. Available 加 abs 链接。论文后来正式发表的话，改转发表版 DOI，拿带卷和页码的期刊条目。",
      },
      {
        q: "一次能转多少篇 arXiv 论文？",
        a: "DOI 输入框一次解析一个标识符。长列表粘 BibTeX，一次解析完。",
      },
      {
        q: "arXiv 转 IEEE 会上传我的文献吗？",
        a: "不会。只把标识符发给 arXiv 接口查预印本元数据，不用注册账号，不上传文献列表，服务器也不留副本。",
      },
    ],
    relatedSlugs: ["bibtex-to-ieee", "doi-to-bibtex", "batch-convert-bibtex"],
    ctaPrimary: "贴个 arXiv 链接，生成 IEEE 条目",
    ctaSecondary: "同一条记录看 BibTeX",
    updated: "2026-11-18",
  },
  "batch-convert-bibtex": {
    slug: "batch-convert-bibtex",
    keyword: "批量转换 BibTeX",
    title: "批量转换 BibTeX：整个 .bib 一次转完",
    description:
      "批量转换 BibTeX：整段 .bib 文本一次粘贴、全部解析，Pro 可直接上传文件，转 APA、MLA、IEEE 不用重录。",
    h1: "批量转换 BibTeX：整个 .bib 一次转完",
    intro:
      ".bib 文件本身就是批量：一份文件，几十条文献，一个格式。批量转换 BibTeX 不是什么特殊模式，就是把整份文件一次喂给普通转换器，全部条目一次解析、按选定的格式一次排版。这篇讲怎么从文献管理软件里导出文件、哪些免费哪些是 Pro、贴进论文前要检查什么。",
    sections: [
      {
        h2: "批量转换到底是什么",
        paragraphs: [
          "把整段 .bib 文本粘贴进输入框，转换器一次解析里面全部 @article、@book、@inproceedings，一次按选定的输出格式排版。没有逐条按钮，也没有条数上限：列表以文本进去，以排好的参考文献表出来。",
          "上传文件按钮做的事一样，只是省了复制粘贴：它在浏览器本地读 .bib 或 .txt 文件，把内容追加进输入框。文件不离开你的电脑——浏览器本地读文件，转换也在本地跑。换个输出格式，同一份粘贴列表立刻重排，一次粘贴就能出 APA 列表、IEEE 列表，还能再下一个新的 .bib，不用重新录入。",
        ],
        table: {
          headers: ["来源", "列表怎么进来", "出来是什么"],
          rows: [
            ["Zotero 文献库", "导出 BibTeX，再粘贴或上传 .bib", "整个库按选定格式排版"],
            ["JabRef 数据库", "保存为 .bib，直接粘贴或上传", "全部条目，顺序和文件一致"],
            ["Google Scholar", "一篇导一个 .bib，合在一起粘", "合并列表一次转完"],
            ["合作者给的 .bib", "文件文本原样粘贴", "排好格式的列表，不用重录"],
            ["导回管理软件", "结果下载为 .bib 或 .ris", "可直接进 Zotero 或 EndNote 的记录"],
          ],
        },
      },
      {
        h2: "从 Zotero、JabRef 导出 .bib 文件",
        paragraphs: [
          "Zotero 里选中条目（或整个分类），打开导出对话框，格式选 BibTeX，保存 .bib 文件。JabRef 的数据库本身就是 .bib 文件，保存后直接粘贴或上传。两种导出都是一条文献一个 @entry 块，第一行是引用键，后面一行一个字段。",
          "两个细节决定批量解析顺不顺。第一，文件必须是 UTF-8：é、ü 这类带音符的字母在 UTF-8 里没事，Latin-1 导出会变成乱码，人名看着不对就重新导出。第二，机构作者要双花括号——{{World Health Organization}}——不然转换器会把它当成三个人。作者之间缺了 and 会把两个人并成一个，这是批量里最常见的静默错误。",
        ],
        list: [
          "Zotero：选中条目，导出 BibTeX，保存 .bib 文件。",
          "JabRef：数据库本身就是 .bib，保存后直接用。",
          "粘贴前确认导出是 UTF-8。",
          "机构作者一律双花括号。",
          "搜一遍 and，数一数每个作者字段里有几个人。",
        ],
      },
      {
        h2: "粘贴还是上传：哪些免费、哪些是 Pro",
        paragraphs: [
          "粘贴免费且不限条数：整段 .bib 文本进输入框，一次转换完。上传按钮是 Pro 的部分：可以选 .bib 或 .txt 文件（一次多个），不用打开文件复制文本。Pro 历史记录也从 20 条延长到 100 条，上周转过的批量一点就回来。",
          "转换本身没有任何限制：同一个解析器、同样的输出格式、同样的 .bib、.ris、.txt 下载，免费版全有。Pro 的差别是方便——长文件不用复制粘贴——加上更长的历史。如果按钮上标着 Pro，点了会滚动到 Pro 区域，而不是打开文件选择器。",
        ],
        table: {
          headers: ["操作", "免费版", "Pro"],
          rows: [
            ["粘贴 .bib 文本", "可以，条数不限", "可以"],
            ["上传 .bib / .txt 文件", "不行，按钮仅限 Pro", "可以，一次多个文件"],
            ["整批一次转换", "可以", "可以"],
            ["下载 .bib / .ris / .txt", "可以", "可以"],
            ["转换历史", "最近 20 条", "最近 100 条"],
          ],
        },
      },
      {
        h2: "一份列表，多种格式",
        paragraphs: [
          "粘贴的列表是原始数据，输出格式只是它的一个视图。同一份 .bib 文本，投心理学刊物转 APA 第 7 版，投工程刊物切到 IEEE，再下一个 .bib 给合作者用原始条目。什么都不用重新录入，也不用手工重新解析。",
          "所以转换完 .bib 文件值得留着。排好格式的字符串变不回字段，.bib 下次换个格式几秒就转好。.ris 下载把同样的记录带进 EndNote 或 Zotero，列表在工具之间来回走，不用人重新录作者名。",
        ],
      },
      {
        h2: "贴进论文前先检查这批结果",
        paragraphs: [
          "批量结果进论文之前，对照四个问题读一遍：输出条数和输入条数对不对，每条作者列表全不全，选定格式下每条是不是只有一个编号或括号模式，有 DOI 或链接的条目末尾还在不在。条数对不上是解析出错最快的信号。",
          "常见原因都很小：花括号不配对、字段后面少了逗号、作者之间缺了 and。在 Zotero 或粘贴文本里把那条修好再转一次，不要手工改排好的输出，下次转换会把它覆盖掉。编辑书里的章节多看一眼，章节题名和书名之间的 // 最容易丢，原因是 editor 字段空着。",
        ],
        list: [
          "数条数：输出条数必须和输入条数一致。",
          "检查每条作者列表有没有合并或缺人。",
          "找花括号不配对、字段后缺逗号的地方。",
          "在源条目里修，不要改排好的输出。",
          "留着 .bib 文件，下次投稿还用得上。",
        ],
      },
    ],
    faqs: [
      {
        q: "一次能转多少条？",
        a: "工具没有条数上限：整段粘贴的 .bib 文本一次解析完。文件特别长、浏览器感觉慢，就分两次粘。",
      },
      {
        q: "上传 .bib 文件免费吗？",
        a: "不免费，上传按钮是 Pro 功能。粘贴 .bib 文本进输入框免费，转的是同样的条目。",
      },
      {
        q: "上传的文件会离开我的电脑吗？",
        a: "不会。文件由浏览器本地读取，转换也在本地跑，不上传到任何服务器。",
      },
      {
        q: "能一次上传多个 .bib 文件吗？",
        a: "可以，文件选择器支持多选，内容合在一起一次转换。",
      },
      {
        q: "文件里有一条坏了怎么办？",
        a: "对照输出条数和输入条数。条数对不上一般是花括号不配对或字段后缺逗号，在 Zotero 或粘贴文本里修好那条再转。",
      },
      {
        q: "批量结果能下回 .bib 或 .ris 吗？",
        a: "可以。导出按钮把转换后的列表下载为 .bib、.ris 或纯文本，.ris 直接进 EndNote 或 Zotero。",
      },
    ],
    relatedSlugs: ["bibtex-to-apa", "bibtex-to-ieee", "arxiv-to-ieee"],
    ctaPrimary: "粘贴 .bib 文本，一次全部转完",
    ctaSecondary: "一次只转一条 DOI 也行",
    updated: "2026-11-18",
  },
};

export default zh;
