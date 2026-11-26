import type { LongformSet } from "./types";

const en: LongformSet = {
  "bibtex-to-gb7714": {
    slug: "bibtex-to-gb7714",
    keyword: "BibTeX to GB/T 7714",
    title: "BibTeX to GB/T 7714: Exact Field Mapping",
    description:
      "BibTeX to GB/T 7714, field by field: entry-type codes, the three-name cut, volume(issue) blocks, and the punctuation a .bib file never stores.",
    h1: "BibTeX to GB/T 7714: A Field-by-Field Conversion Guide",
    intro:
      "A .bib entry stores references as named fields; the GB/T 7714-2015 reference list expects a fixed element order with fixed punctuation. Almost every BibTeX to GB/T 7714 problem comes from that mismatch rather than from missing data. This guide shows which field lands where, which entry type gets which bracketed code, and what to check before you paste the result into a submission.",
    sections: [
      {
        h2: "BibTeX to GB/T 7714: what actually changes",
        paragraphs: [
          "Nothing inside @article{smith2020, author = {Smith, John}, journal = {...}, year = {2020}} says that the year belongs after the journal name, that the title must be followed by a type code, or that a page range takes a hyphen. The standard is the opposite: one element order, one punctuation set. A BibTeX to GB/T 7714 conversion is therefore a placement job, not a translation job.",
          "So the field labels, the equals signs and the periods after initials disappear, while a type code, a year-and-volume block and a three-name author list appear. Take author = {Li, Boming} with journal = {Library and Information Service}, year = {2008}, volume = {52}, number = {6}, pages = {6--12}. It becomes `Li B M. Korean library law[J]. Library and Information Service, 2008, 52(6): 6-12.` The BibTeX double hyphen turns into a single hyphen.",
        ],
        table: {
          headers: ["BibTeX field", "GB/T 7714-2015 element", "Output shape"],
          rows: [
            ["author", "Surname first, initials without periods, three names then et al", "Li B M, Wang X, et al"],
            ["title", "Immediately followed by the type code", "Korean library law[J]"],
            ["journal", "After the period, roman type", "Library and Information Service"],
            ["year, volume, number", "One block, issue in parentheses", "2008, 52(6)"],
            ["pages", "Colon, then a hyphenated range", ": 6-12."],
            ["address, publisher", "Place, colon, publisher", "Beijing: Science Press"],
            ["doi", "Last element of the record", "DOI: 10.1000/xyz."],
          ],
        },
      },
      {
        h2: "Entry types map to identifier codes",
        paragraphs: [
          "In any BibTeX to GB/T 7714 mapping, the entry type alone decides the bracketed code. A wrong code is the most visible error in a Chinese reference list, because it sits between the title and its period in every entry.",
          "@inproceedings always becomes [C], even when the proceedings volume has an ISBN, a volume number and a continuous page range: it is a collected paper, not a journal article. @phdthesis and @mastersthesis both become [D], because the standard has one code for theses and does not encode degree level.",
        ],
        table: {
          headers: ["Entry type", "Code", "Typical case"],
          rows: [
            ["@article", "[J]", "Journal paper"],
            ["@inproceedings", "[C]", "Conference paper"],
            ["@book", "[M]", "Monograph"],
            ["@phdthesis, @mastersthesis", "[D]", "Thesis"],
            ["@techreport", "[R]", "Report"],
            ["@standard", "[S]", "Standard"],
            ["@patent", "[P]", "Patent"],
            ["@incollection", "[M] plus //", "Chapter in a book"],
            ["@online", "[EB/OL]", "Web page"],
            ["@misc", "[Z]", "Anything else"],
          ],
        },
      },
      {
        h2: "Clean the author field before you convert",
        paragraphs: [
          "Every BibTeX to GB/T 7714 pass should start with the author field, because BibTeX joins authors with the literal word and. `author = {Smith, John and Jones, Ben and Wang, Lei and Chen, Yu}` is four authors, so deleting one and merges two people into one. The reverse trap is a corporate author: World Health Organization reads as three people unless you double-brace it as {{World Health Organization}}.",
          "Particles and suffixes need the same care. The comma form `van der Berg, Jan` keeps van der Berg as the family name, and `King, Jr., Martin Luther` puts the Jr. where the parser expects it. Get those commas wrong and the alphabetical sort of an author-date list goes wrong with them.",
        ],
        list: [
          "Search the .bib file for the string and, then count names in each author field.",
          "Double-brace every corporate author so it stays one name.",
          "Check names with van, von, de or der, and suffixes such as Jr.",
          "Leave the fourth author alone: the converter writes three and appends et al.",
        ],
      },
      {
        h2: "Punctuation the .bib file never stored",
        paragraphs: [
          "Three templates cover most BibTeX to GB/T 7714 submissions. Journal article: `Primary author. Title[J]. Journal Name, Year, Volume(Issue): pages.` Monograph: `Author. Title[M]. Place: Publisher, Year: pages.` Thesis: `Author. Title[D]. Place: Institution, Year.` Place precedes publisher with a colon between them, and pages are optional for a whole book.",
          "The type code sits between the title and its period, `Title[J].`, with no space before the bracket. A period and a space separate the author block from the title. Volume and issue share one set of parentheses, `52(6)`, and never appear as `52, 6`.",
          "A chapter in an edited book adds the double slash: `Chapter title[M]//Editor. Book title.` The // separates the part you cite from its container, and it is the element most often lost when the editor field is empty.",
        ],
      },
      {
        h2: "Check the converted entry against four points",
        paragraphs: [
          "Before you paste a converted BibTeX to GB/T 7714 entry anywhere, read it against four questions: at most three names before et al, exactly one bracketed code after the title, a year-and-volume block ending in colon-and-pages, and a DOI in bare form at the very end.",
          "A converted chapter gets the same four checks with one addition, since the // has to survive between the chapter title and the book title. If that separator is missing, the editor field was empty in the source record, not lost in the conversion.",
        ],
        list: [
          "Authors: surname first, initials without periods, three names maximum.",
          "Code: one pair of brackets, no space before it, a period after it.",
          "Numbers: year, volume, issue in parentheses, colon, hyphenated pages.",
          "DOI: last element, no resolver prefix, no angle brackets.",
        ],
      },
      {
        h2: "Keep the data you will need next time",
        paragraphs: [
          "Then settle the citation system. The numeric system numbers entries by first citation and marks the text with a superscript [1]; the author-date system keeps (Smith, 2020) in the text and sorts the list alphabetically. A converter can format either one, but only you know the order your paper actually cites.",
          "Keep the BibTeX download if a second submission is likely. A formatted string cannot be turned back into fields, while a .bib file converts again for another journal in seconds, and the .ris download carries the same records into EndNote or Zotero.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the BibTeX and separator survive conversion?",
        a: "Yes. The author field is split on and before formatting, so four BibTeX authors become three names plus et al rather than one person called Smith and Jones.",
      },
      {
        q: "Why is my volume number missing from the output?",
        a: "Usually because the entry has no volume field at all: many exports store only number, so the 52(6) block cannot form. Check the entry before blaming the converter.",
      },
      {
        q: "How do I cite more than three authors in GB/T 7714?",
        a: "List the first three names, then a comma and et al. A Chinese-language reference list uses 等 after the same third name.",
      },
      {
        q: "What happens to brace-protected capitals such as {DNA}?",
        a: "The braces are removed and the inner text is kept as written, so {DNA} prints as DNA rather than Dna. That is one reason to convert instead of retyping titles.",
      },
      {
        q: "Why does @inproceedings give [C] and not [J]?",
        a: "Because a paper in a proceedings volume is a collected paper. An ISBN, a volume number and a page range do not turn it into a journal article.",
      },
      {
        q: "Is my .bib file uploaded when I convert it?",
        a: "No. The BibTeX to GB/T 7714 conversion runs inside your browser tab, nothing is posted to a server, and no account is needed.",
      },
    ],
    relatedSlugs: ["gb7714-format", "zotero-gb7714", "doi-to-gb7714"],
    ctaPrimary: "Paste your BibTeX and get the GB/T 7714 list",
    ctaSecondary: "See all fifteen GB/T 7714-2015 type codes",
    updated: "2026-10-27",
  },

  "apa-to-gb7714": {
    slug: "apa-to-gb7714",
    keyword: "APA to GB/T 7714",
    title: "APA to GB/T 7714: Name, Year, Punctuation",
    description:
      "APA to GB/T 7714: how initials lose their periods, where the year moves, why an en dash becomes a hyphen, and how (Smith, 2020) turns into [1].",
    h1: "APA to GB/T 7714: Reference List Conversion in Practice",
    intro:
      "APA and GB/T 7714-2015 agree that a reference opens with the author, then disagree about nearly everything after that. An APA to GB/T 7714 conversion moves the year, strips the periods out of initials, and changes which punctuation survives. The differences are small enough to miss by eye and large enough to fail a journal's reference check.",
    sections: [
      {
        h2: "APA to GB/T 7714: five structural differences",
        paragraphs: [
          "Here is one article in both systems. APA 7th edition: `Smith, J. A., & Jones, B. (2020). Citation formats compared. Journal of Documentation, 12(3), 45\u201358. https://doi.org/10.1000/xyz`. GB/T 7714-2015: `Smith J A, Jones B. Citation formats compared[J]. Journal of Documentation, 2020, 12(3): 45-58. DOI: 10.1000/xyz.` Every row in the table below is visible in that pair.",
          "The ampersand and the parenthesised year are the two markers that let a reviewer spot an unconverted APA entry across a desk. A year in parentheses after the author block exists in no GB/T 7714 variant, because the standard always attaches the year to the journal name.",
        ],
        table: {
          headers: ["Element", "APA 7th edition", "GB/T 7714-2015"],
          rows: [
            ["Authors", "Smith, J. A., & Jones, B.", "Smith J A, Jones B"],
            ["Year", "In parentheses after the authors", "After the journal name"],
            ["Title", "Sentence case, no marker", "Sentence case, then [J]"],
            ["Container", "Journal name in italics", "Journal name in roman type"],
            ["Volume, issue", "12(3)", "12(3) after the year"],
            ["Pages", "45\u201358, en dash", "45-58, hyphen"],
            ["DOI", "https://doi.org/10.1000/xyz", "DOI: 10.1000/xyz"],
            ["In text", "(Smith & Jones, 2020)", "Superscript [1]"],
          ],
        },
      },
      {
        h2: "Author names: the periods come out",
        paragraphs: [
          "APA already writes the surname first, so the name order survives an APA to GB/T 7714 conversion; the initials do not. Smith, J. A. becomes Smith J A: the comma after the surname goes, the periods after each initial go, and one space separates the initials. Zhang, W. becomes Zhang W.",
          "Author count is where the systems really part. APA 7th lists up to twenty names; GB/T 7714-2015 stops after the third and appends , et al, or , 等 in a Chinese-language list. A four-author APA reference therefore loses its fourth name, and if you restore it by hand you must re-check whether et al is still needed.",
          "Group authors pass through unchanged but not untouched. APA closes a group author inside the parentheses, World Health Organization. (2020), while GB/T prints World Health Organization. and goes straight to the title. No abbreviation rule applies, so do not shorten it to WHO unless the source does.",
        ],
      },
      {
        h2: "In-text markers: (Smith, 2020) becomes [1]",
        paragraphs: [
          "Moving to the numeric system is the largest manual step in an APA to GB/T 7714 migration, because the list is numbered in order of first citation rather than alphabetically. Insert one source in paragraph two and every later number shifts by one, so this belongs in your last pass over the manuscript.",
          "GB/T 7714-2015 also permits the author-date system, and in that mode the marker looks much like APA's. The reference list does not change: you still get `Smith J A, Jones B. Citation formats compared[J]. Journal of Documentation, 2020, 12(3): 45-58.` Settle which system your target journal wants before you format anything.",
        ],
        list: [
          "Paste the full APA list into the converter, one reference per line or block.",
          "Read the numeric output and note the order the entries were assigned.",
          "Reorder the manuscript markers so the first work cited becomes [1].",
          "Renumber after any insertion, since a new [2] shifts every later reference.",
        ],
      },
      {
        h2: "Dashes, italics and other typographic damage",
        paragraphs: [
          "An APA to GB/T 7714 conversion has to survive the paste as well as the parser. APA page ranges use an en dash, 45\u201358, and GB/T uses a hyphen, 45-58. Word's AutoFormat turns a hyphen between digits back into an en dash as you type the closing digit, so text that was correct when copied can be wrong once pasted.",
          "Italics are the second trap. GB/T 7714 reference lists are set in roman type throughout: no italic journal title, no italics on book titles, no bold volume number. Convert a Word file whose APA entries use character formatting rather than a citation field, and the italics stay behind.",
          "Volume and issue are the third. APA writes 12(3) after the journal name; GB/T writes 2020, 12(3), with the year first. When a source genuinely has no volume, the block collapses to year and issue alone, so check your journal's own examples rather than inventing a volume.",
        ],
      },
      {
        h2: "Where APA parsing needs a human",
        paragraphs: [
          "The shape a parser recognises is author block, year in parentheses, period. Entries that break it include legal citations, web pages with no personal author, and anything whose date is a range such as (2020-2023). Those are faster to type into the manual entry form than to repair afterwards.",
          "A web page with no named author is the commonest of the three. Paste it, check the year, and switch the finished item to an online carrier so the APA to GB/T 7714 result carries [EB/OL] and the access date instead of a bracketed [J].",
        ],
        list: [
          "n.d. has no GB/T 7714 equivalent: supply a year, or cite the item as an online carrier with an access date.",
          "An edition pasted into the title, such as (2nd ed.), lands inside the title element and nothing removes it.",
          "Retrieved from strings are APA-specific and should be dropped before conversion.",
          "A DOI typed as https://doi.org/10.1000/xyz must print as DOI: 10.1000/xyz.",
        ],
      },
      {
        h2: "Run the same four checks as everyone else",
        paragraphs: [
          "Every APA to GB/T 7714 result faces the same review as any other submission: a three-name cap, a single bracketed code after each title, a year-and-volume block with colon-and-pages, and the DOI last. What changes is only your starting point, which is why APA conversions fail on different details than BibTeX ones.",
          "If the manuscript later goes to an English-language journal, keep the APA output beside the GB/T one. Producing an APA to GB/T 7714 pair costs one extra paste, and nothing has to be retyped either way.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to delete the ampersand before converting?",
        a: "No, the parser drops it. If you convert by hand, replace the ampersand with a comma first, because a leftover & is the clearest sign of a half-converted entry.",
      },
      {
        q: "Should I use an en dash or a hyphen for page ranges?",
        a: "A hyphen. GB/T 7714-2015 writes 45-58, and Word's AutoFormat restores the en dash if you type the range into a document, so re-check after pasting.",
      },
      {
        q: "Can GB/T 7714 use (Smith, 2020) instead of [1]?",
        a: "Yes. The standard defines both a numeric and an author-date system. Only the in-text marker changes; the reference list keeps the GB/T format either way.",
      },
      {
        q: "What do I do with an APA entry dated n.d.?",
        a: "GB/T 7714-2015 has no marker for an unknown year. Use the year from the publisher's page, or cite the item as [EB/OL] with the date you accessed it.",
      },
      {
        q: "Does the converter renumber references in citation order?",
        a: "No. It numbers the list in the order you paste it, so an APA to GB/T 7714 batch keeps its input order. Matching that numbering to first-citation order happens in your manuscript.",
      },
      {
        q: "Why did the journal title lose its italics?",
        a: "Because GB/T 7714-2015 sets references in roman type with no italic container titles and no bold volume numbers. Clear any character formatting your template reapplies.",
      },
    ],
    relatedSlugs: ["gb7714-format", "doi-to-gb7714", "bibtex-to-gb7714"],
    ctaPrimary: "Convert an APA reference list to GB/T 7714",
    ctaSecondary: "Read the GB/T 7714-2015 format reference",
    updated: "2026-10-27",
  },

  "gb7714-format": {
    slug: "gb7714-format",
    keyword: "GB/T 7714-2015 format",
    title: "GB/T 7714-2015 Format: Codes and Templates",
    description:
      "The GB/T 7714-2015 format in one page: all fifteen document type codes, the [J/OL] carrier rule, the three-name cut, and templates for journals and books.",
    h1: "GB/T 7714-2015 Format: Document Type Codes and Element Order",
    intro:
      "The GB/T 7714-2015 format is the Chinese national standard for references in journal articles, theses and grant applications, and most submission errors come from two places: the bracketed type code and the punctuation around it. This page collects the fifteen codes, the element order for the types you actually cite, and the rules university templates rarely spell out.",
    sections: [
      {
        h2: "What the GB/T 7714-2015 format regulates",
        paragraphs: [
          "The GB/T 7714-2015 format was issued in 2015 and replaced the 2005 edition. It fixes four things: the order of elements inside a reference, the punctuation between them, the document type identifier codes, and the treatment of electronic carriers. It does not fix typography, because font, line spacing and hanging indents belong to each journal's style sheet.",
          "Two citation systems live inside the GB/T 7714-2015 format. The numeric system numbers the list by first citation and marks the text with a superscript [1]. The author-date system marks the text with (Smith, 2020) and sorts the list alphabetically. A journal picks one; a thesis template almost always picks the numeric one.",
        ],
      },
      {
        h2: "Document type codes in the GB/T 7714-2015 format",
        paragraphs: [
          "The code follows the title in square brackets with no space before it. It is the element a reader uses to tell a journal article from a chapter, so a wrong code misleads even when everything else is right. The GB/T 7714-2015 format defines fifteen of them.",
          "Fifteen codes are less to memorise than they look, because a normal bibliography leans on four: [J], [M], [C] and [D]. The rest exist so that a deposited dataset is not forced into [Z], and so that a standard or a patent can be identified without a note in the text.",
        ],
        table: {
          headers: ["Code", "Document type", "Example"],
          rows: [
            ["[M]", "Monograph", "Book"],
            ["[C]", "Proceedings, collected papers", "Conference paper"],
            ["[N]", "Newspaper article", "Daily paper piece"],
            ["[J]", "Journal article", "Journal paper"],
            ["[D]", "Thesis or dissertation", "Master's or PhD"],
            ["[R]", "Report", "Technical report"],
            ["[S]", "Standard", "Published standard"],
            ["[P]", "Patent", "Granted patent"],
            ["[DB]", "Database", "Bibliographic database"],
            ["[CP]", "Computer program", "Software package"],
            ["[EB]", "Electronic bulletin", "Web page"],
            ["[A]", "Archive", "Archival material"],
            ["[CM]", "Map", "Printed or digital map"],
            ["[DS]", "Dataset", "Deposited dataset"],
            ["[Z]", "Other", "Anything else"],
          ],
        },
      },
      {
        h2: "Element order in the GB/T 7714-2015 format",
        paragraphs: [
          "The templates are short enough to keep on one screen. Each example below uses the exact punctuation the GB/T 7714-2015 format applies, so you can compare it character by character with your own list.",
          "Books and journals differ in one structural way. A journal article puts the year inside the number block, after the journal name; a book puts the year at the end of the imprint, after the publisher. That is why the two templates cannot be merged into a single pattern.",
        ],
        list: [
          "Journal article: `Primary author. Title[J]. Journal Name, Year, Volume(Issue): pages.` For example `Li B M. Korean library law[J]. Library and Information Service, 2008, 52(6): 6-12.`",
          "Monograph: `Author. Title[M]. Place: Publisher, Year: pages.` Pages are optional unless you cite a passage.",
          "Thesis: `Author. Title[D]. Place: Institution, Year.` No publisher appears.",
          "Chapter in an edited book: `Author. Chapter title[M]//Editor. Book title. Place: Publisher, Year: pages.`",
        ],
      },
      {
        h2: "Electronic carrier codes and the slash",
        paragraphs: [
          "A carrier code records how you read the item and is appended after a slash. The four carriers are magnetic tape [MT], disk [DK], CD-ROM [CD] and online [OL]. In practice you will use [OL], giving [J/OL] for a journal article read online and [EB/OL] for an electronic bulletin such as a web page.",
          "An online record carries two dates a print record does not: the version date in parentheses and the access date in square brackets. A working shape is `Title[EB/OL]. (2020-05-01)[2026-10-27]. https://example.org/page`. The access date is the element most often omitted, and it cannot be reconstructed later.",
          "Combinations such as [M/CD] and [DB/OL] are legal as well, and a dataset takes [DS] whether you downloaded it or queried it online. When an article has both a DOI and a URL, the DOI is the element that belongs in the entry.",
        ],
      },
      {
        h2: "Author rules and the three-name cut",
        paragraphs: [
          "Author handling is the part of the GB/T 7714-2015 format that trips up English-language manuscripts. Western names go surname first with given names abbreviated to initials and no periods: Einstein A, not Einstein, A. and not Albert Einstein. More than three authors means the first three followed by , et al, or , 等 in a Chinese-language list.",
          "Initials are the detail a reviewer notices first, because a period after an initial is the clearest trace of APA habits left in a Chinese reference list. Removing it changes nothing else about the name.",
        ],
        list: [
          "Surname first, then initials separated by single spaces and carrying no periods.",
          "Three names maximum, then et al, or 等 for a Chinese-language list.",
          "Corporate authors stay in full: World Health Organization, never WHO.",
          "An entry with no author starts with the title, which takes the author position.",
        ],
      },
      {
        h2: "Punctuation errors a template check will catch",
        paragraphs: [
          "Most rejected lists fail on punctuation rather than on missing data, because punctuation is what an automated check compares first. Each wrong form below comes from a real habit: copying APA, pasting from a PDF, or typing a DOI as a URL.",
          "Read the table as a checklist for the GB/T 7714-2015 format rather than as a matter of taste. Clearing the six rows below removes the errors reviewers report most often.",
        ],
        table: {
          headers: ["Wrong form", "Why it fails", "Correct form"],
          rows: [
            ["Title. [J] Journal.", "Space before the code, period before it", "Title[J]. Journal."],
            ["Li, B. M. (2008)", "APA commas and parentheses", "Li B M."],
            ["52(6): 6\u201312", "En dash in the page range", "52(6): 6-12"],
            ["https://doi.org/10.1000/xyz", "Resolver URL instead of the DOI", "DOI: 10.1000/xyz"],
            ["Five authors in full", "No three-name cut", "Three names, then et al"],
            ["Journal name in italics", "Container titles are roman", "Journal name plain"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "Is GB/T 7714-2015 still the current version?",
        a: "Yes. It replaced GB/T 7714-2005 and is the version Chinese journals and universities ask for, though some departments still hand out an older Word template.",
      },
      {
        q: "What does the [J/OL] code mean?",
        a: "It joins the journal code [J] to the online carrier code [OL], used when you cite an article you read online and want to record how you reached it.",
      },
      {
        q: "How do I cite more than three authors?",
        a: "Write the first three names, then a comma and et al, or 等 in a Chinese-language list. The truncation is part of the reference, not an abbreviation of it.",
      },
      {
        q: "Do books need page numbers in the reference?",
        a: "Not for the whole book. The page element is optional for monographs and normally appears only when you cite a specific chapter or passage.",
      },
      {
        q: "Should volume and issue be separated by a comma?",
        a: "No. They form one block, 52(6), separated from the year by a comma, with the pages following a colon.",
      },
      {
        q: "Which code do I use for a preprint?",
        a: "The GB/T 7714-2015 format has no preprint code. Use [Z] for the generic case, or cite the item as [EB/OL] with the repository URL and access date.",
      },
    ],
    relatedSlugs: ["bibtex-to-gb7714", "apa-to-gb7714", "zotero-gb7714"],
    ctaPrimary: "Format your references in GB/T 7714-2015",
    ctaSecondary: "Convert a BibTeX library to GB/T 7714",
    updated: "2026-10-27",
  },

  "zotero-gb7714": {
    slug: "zotero-gb7714",
    keyword: "Zotero GB/T 7714",
    title: "Zotero GB/T 7714: Install and Fix Fields",
    description:
      "Zotero GB/T 7714 setup for Windows, macOS and Word: where the style menu lives, why et al replaces 等, and the four fields that quietly break the output.",
    h1: "Zotero GB/T 7714: Installing the Style and Fixing Bad Fields",
    intro:
      "Zotero can format a reference list in GB/T 7714-2015, but the style is not there by default and the output depends on fields most users never open. The two usual complaints, 等 where et al should be, or [J] where [C] belongs, are both fixable without editing any CSL. This page covers where the Zotero GB/T 7714 menu lives on each platform and which fields drive the result.",
    sections: [
      {
        h2: "Zotero GB/T 7714: installing the style on each platform",
        paragraphs: [
          "A Zotero GB/T 7714 style lives in the shared CSL repository rather than in a separate add-on, so installation is the same one-dialog process as for any other style. On Windows and Linux the path is Edit, then Settings, then Cite, then Styles. On macOS it is Zotero, then Settings, then Cite, then Styles. Click the plus button, search for GB/T 7714, and install the variant you need.",
          "The list offers numeric and author-date builds, in separate 中文 and English versions. Choose numeric if your journal prints superscript [1], author-date if it prints (Smith, 2020). Choose the language build to match your manuscript rather than your sources, because an English paper cites Chinese work with et al while a Chinese paper cites English work with 等.",
        ],
        list: [
          "Windows and Linux: Edit, Settings, Cite, Styles, then plus.",
          "macOS: Zotero, Settings, Cite, Styles, then plus.",
          "Search the box for GB/T 7714 and install one variant.",
          "Confirm it appears in Word's Zotero tab under Document Preferences.",
        ],
      },
      {
        h2: "Zotero GB/T 7714: why one field decides 等 and et al",
        paragraphs: [
          "The Zotero GB/T 7714 styles branch on the Language field of each item. An item whose Language is zh-CN renders 等 with a full-width comma; an item with an empty Language field falls back to the English branch and prints et al. Nothing else about the item changes, which is why one library can produce both outputs.",
          "The field is per item, so a mixed library needs per-item editing or a bulk edit. In the item pane, Language sits near the bottom of the Info tab. To change many items at once, right-click the column header row in the centre pane, add a Language column, and paste one value down the selection.",
        ],
      },
      {
        h2: "Which fields become which elements",
        paragraphs: [
          "The mapping from Zotero to the standard is direct. Item type sets the bracketed code, so a proceedings paper imported from a DOI as Journal Article prints [J] and needs its type changed. Place must be filled for books, or the Place: Publisher pattern cannot form and the publisher prints alone.",
          "A Zotero GB/T 7714 list is therefore only as accurate as the library behind it, and the table below is the fastest way to find the field that is wrong. Read down the left column, compare with the item pane, and fix the library rather than the document.",
        ],
        table: {
          headers: ["Zotero item type or field", "GB/T 7714-2015 result"],
          rows: [
            ["Journal Article", "Journal article, [J]"],
            ["Conference Paper", "Collected paper, [C]"],
            ["Book", "Monograph, [M]"],
            ["Book Section", "Chapter, [M] with //"],
            ["Thesis, Type set to PhD or Master's", "Thesis, [D]"],
            ["Report", "Report, [R]"],
            ["Patent", "[P]"],
            ["Dataset", "[DS]"],
            ["Preprint", "[Z], or [EB/OL]"],
            ["Creator, last and first name", "Surname first, initials, no periods"],
            ["Place", "Before the publisher, after a colon"],
            ["Volume and Issue", "One block, 52(6)"],
            ["Pages", "Hyphenated range after a colon"],
            ["DOI", "DOI: at the end"],
            ["Language, zh-CN or empty", "等 or et al and punctuation width"],
          ],
        },
      },
      {
        h2: "Four fields that break a Zotero GB/T 7714 list",
        paragraphs: [
          "These four problems survive a correct installation, because each is a data problem rather than a formatting problem. All are repaired in the Info pane, never in the document: change the item, refresh the citation, and the Zotero GB/T 7714 output rebuilds itself.",
          "The last one is the most persistent, because a library built with Add Item by Identifier keeps whatever type the registration agency supplied. Check the item type of every conference paper you added from a DOI before you blame the style.",
        ],
        list: [
          "Single-field creators: every author lands in one slot, so the three-name cut never applies.",
          "Edition inside the title: (2nd ed.) typed into Title prints inside the title; use the Edition field.",
          "En dashes in Pages: a range copied from a PDF stays 45\u201358 until you retype it with a hyphen.",
          "Wrong item type: a proceedings paper created as Journal Article prints [J] instead of [C].",
        ],
      },
      {
        h2: "Exporting BibTeX when Zotero fights back",
        paragraphs: [
          "Sometimes the shortest route is to stop formatting inside Zotero. Right-click a collection and choose Export Collection, or use File and Export Library for everything, then pick BibTeX as the format. Leave the notes and files boxes unticked so the file carries reference data only.",
          "That file keeps field boundaries, so it converts once and re-converts later if a journal wants different output, or if your Zotero GB/T 7714 style produces 等 in places you did not want. Paste the text into a browser converter and the list comes back without touching the library.",
          "The reverse works too: the converter's BibTeX and RIS downloads import into Zotero, so a cleaned-up entry re-enters your library with its fields intact.",
        ],
      },
      {
        h2: "Turning the field into text before you submit",
        paragraphs: [
          "In Word, a bibliography is a field, not text. Typing over it leaves the field stale, and pressing Refresh in the Zotero tab rebuilds the entry from your library, discarding whatever you typed. Fix the library item first, then refresh.",
          "When the list is final, Unlink Citations turns the fields into plain text so the document behaves normally on a computer without Zotero. Do it last, because unlinking cannot be undone; keep a copy with the fields intact in case a reviewer asks for changes to the Zotero GB/T 7714 list.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my Zotero output say et al instead of 等?",
        a: "Because the item's Language field is empty. Set it to zh-CN on the items that need 等, and the same style prints the Chinese form with no change to the CSL.",
      },
      {
        q: "Can I use the GB/T 7714 style in Google Docs?",
        a: "Yes. The Google Docs plugin reads its style list from the desktop app, so install the Zotero GB/T 7714 style once and it appears in the Google Docs menu.",
      },
      {
        q: "Does Zotero renumber [1] and [2] when I add a source?",
        a: "Yes. Citations and the bibliography are fields, so adding or deleting one renumbers the rest; press Refresh in Word's Zotero tab if a document lags.",
      },
      {
        q: "Should I pick the numeric or the author-date style?",
        a: "Whichever your journal prints in the text: superscript [1] means numeric, (Smith, 2020) means author-date. The reference list format is identical either way.",
      },
      {
        q: "How do I hand in a plain-text bibliography?",
        a: "Use Unlink Citations in Word's Zotero tab to turn the fields into text. Do it last, because Zotero can no longer update the list afterwards.",
      },
      {
        q: "Why is the publisher missing from my book entry?",
        a: "Because Place is empty. GB/T 7714-2015 prints Place: Publisher, so a blank Place leaves the publisher standing alone; fill it in the Info tab and refresh.",
      },
    ],
    relatedSlugs: ["bibtex-to-gb7714", "gb7714-format"],
    ctaPrimary: "Convert your Zotero BibTeX export to GB/T 7714",
    ctaSecondary: "Check the type codes Zotero maps to",
    updated: "2026-10-27",
  },

  "doi-to-gb7714": {
    slug: "doi-to-gb7714",
    keyword: "DOI to citation",
    title: "DOI to Citation: GB/T 7714 From Crossref",
    description:
      "DOI to citation conversion with live Crossref metadata: which types map to [J] or [C], why 10.48550 DOIs need arXiv, and where the DOI belongs.",
    h1: "DOI to Citation: Turning an Identifier Into a GB/T 7714 Reference",
    intro:
      "A DOI is the cheapest way to get a complete citation and the one most likely to arrive with pieces missing. A DOI to citation conversion resolves the identifier against Crossref, reads the deposited metadata, and formats it for GB/T 7714-2015. That works well for modern journal deposits and needs a second look for everything else.",
    sections: [
      {
        h2: "What a DOI to citation lookup returns",
        paragraphs: [
          "The lookup is one request to the Crossref REST API for a single work identifier, asking for JSON. The response is the publisher's deposit rather than a curated catalogue record. From it the converter reads nine things: title, container title, authors split into family and given names, issued date, volume, issue, page, publisher and the identifier itself.",
          "Those nine fields are exactly what a GB/T 7714 entry needs, which is why a bare DOI often produces a finished reference. Everything else in the deposit, from abstracts to licence text to funder data, is discarded.",
          "The catch is deposit quality. Older records sometimes carry capitalised titles, a missing volume, or an author list without given names. A DOI to citation result can be structurally correct and still need two edits, and knowing which fields to inspect makes that fast.",
        ],
      },
      {
        h2: "Which types a DOI to citation lookup maps",
        paragraphs: [
          "Crossref labels every work with a type, and that type becomes the bracketed code. The mapping follows the document rather than the publisher, with one trap: posted-content is Crossref's name for a preprint, and its date is the posting date rather than a journal year, so confirm the year by hand.",
          "The code matters less than the element order around it, but a DOI to citation result that prints [J] for a book chapter sends readers looking for a journal that never existed. In the manual entry form, a container name containing conf or proc is treated as a proceedings and gets [C].",
        ],
        table: {
          headers: ["Crossref type", "Code", "Source"],
          rows: [
            ["journal-article", "[J]", "Journal DOI"],
            ["proceedings-article", "[C]", "Proceedings deposit"],
            ["book, monograph", "[M]", "Book DOI"],
            ["book-chapter", "[M] plus //", "Chapter DOI"],
            ["dissertation", "[D]", "Thesis repository"],
            ["report", "[R]", "Technical report"],
            ["standard", "[S]", "Standards body"],
            ["dataset", "[DS]", "Data repository"],
            ["posted-content", "[Z] or [EB/OL]", "Preprint"],
          ],
        },
      },
      {
        h2: "When the DOI is not registered with Crossref",
        paragraphs: [
          "Crossref is one registration agency among several, and a DOI to citation lookup can only read its own deposits. An arXiv DOI of the form 10.48550/arXiv.2301.00001 is registered with DataCite, so a Crossref request returns a not-found error however valid the identifier is. Paste the arXiv abs URL (e.g. https://arxiv.org/abs/2301.00001) or an arXiv:2301.00001 identifier instead: the pattern is recognised separately, the version suffix is stripped, and the record is read from the arXiv API.",
          "Zenodo, figshare and Dryad identifiers, including the 10.5281 family, are DataCite records too, so no DOI to citation lookup finds them at Crossref. Those describe datasets, so the code is [DS] and the container is the repository rather than a journal. If your template has no dataset code in use, cite the repository page as [EB/OL].",
          "A pasted URL works as well. The input is scanned for a DOI-shaped string and trailing punctuation such as a semicolon or full stop is removed before the request, which matters when the identifier came out of a PDF reference list with the sentence still attached.",
        ],
      },
      {
        h2: "Where the DOI to citation output puts the DOI",
        paragraphs: [
          "GB/T 7714 puts the DOI last, after the page range, prefixed with DOI: and holding the bare identifier, as in `DOI: 10.1000/xyz`. APA writes `https://doi.org/10.1000/xyz` instead. Both resolve to the same record, and only one matches the checker your journal runs.",
          "When there is no page range, because the item is a preprint, a dataset or an article published online ahead of print, the DOI still closes the entry and the colon-and-pages block is simply absent. Some publishers deposit only an article number such as e12345; the lookup reads the page field, so those entries arrive without that element and you add the number by hand.",
        ],
        list: [
          "Form: DOI: with the bare string, never the resolver URL.",
          "Article number: add e12345 after the colon only if your journal wants it.",
          "Year: preprint dates are posting dates, so confirm against the repository.",
          "Authors: given and family names arrive separately, so surname order survives.",
        ],
      },
      {
        h2: "DOI to citation at list scale",
        paragraphs: [
          "The DOI box resolves a single identifier: it reads the first DOI-shaped string or arXiv identifier in the input and returns one record. A list of forty identifiers would mean forty lookups, so use the other input modes when the references are already in front of you.",
          "Paste them as APA text, one reference per blank line, or as BibTeX, and both are parsed locally in a single pass. Keep the DOI box for the reference that is garbled at the source, where a title is missing or a page range was lost in a copy-paste. For a long list, one DOI to citation lookup per broken entry is usually the whole job.",
          "Lookups and conversions stay in your browser's local history, the most recent twenty, so an identifier you resolved yesterday is one click away. Output leaves as .bib, .ris or plain .txt, and the .ris route moves records into EndNote or Zotero without retyping.",
        ],
        list: [
          "Paste the identifier, or the whole reference if you only have that.",
          "Check the type code before you trust the bracket.",
          "Fix missing volume or pages in the source record, then reformat.",
          "Export as .ris if the list has to go back into a manager.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a DOI lookup give me the page numbers?",
        a: "Usually, because most publishers deposit a page range. Older records or article-number-only deposits have none, so the colon-and-pages element is missing and you add it.",
      },
      {
        q: "Why does an arXiv DOI return nothing?",
        a: "Because 10.48550 identifiers are registered with DataCite, not Crossref. Paste the arXiv abs URL or an arXiv:2301.00001 identifier instead, and the record is read from the arXiv API.",
      },
      {
        q: "How many DOIs can I convert at once?",
        a: "The DOI box resolves one identifier per lookup. For a longer list, paste it as APA text or BibTeX, which is parsed in a single pass.",
      },
      {
        q: "Where exactly does the DOI go in the reference?",
        a: "At the very end, after the page range, as DOI: 10.1000/xyz. The https://doi.org/ resolver form is APA practice, not GB/T 7714-2015.",
      },
      {
        q: "Is a DOI to citation lookup private?",
        a: "Only the identifier is sent, to the Crossref API, to fetch the publisher's metadata. There is no account, no upload of your bibliography, and no server-side copy of your list.",
      },
      {
        q: "Can I cite a dataset DOI as a journal article?",
        a: "No. A Zenodo or Dryad DOI describes a dataset, so it takes [DS] with the repository as container. Labelling it [J] is the commonest identifier error in student papers.",
      },
    ],
    relatedSlugs: ["gb7714-format", "bibtex-to-gb7714", "apa-to-gb7714"],
    ctaPrimary: "Paste a DOI and get the GB/T 7714 citation",
    ctaSecondary: "See which types get which codes",
    updated: "2026-10-27",
  },

  "bibtex-to-mla": {
    slug: "bibtex-to-mla",
    keyword: "BibTeX to MLA",
    title: "BibTeX to MLA: Author, Container, DOI",
    description:
      "BibTeX to MLA 9th edition, field by field: the first-author flip, et al. after two names, italic containers, vol. and no., and the DOI in short form.",
    h1: "BibTeX to MLA: A Field-by-Field Conversion Guide",
    intro:
      "A .bib entry stores references as named fields; the MLA 9th edition Works Cited list expects a fixed element order with fixed punctuation. Almost every BibTeX to MLA problem comes from that mismatch rather than from missing data. This guide shows which field lands where, how many author names survive, and what to check before you paste the result into a paper.",
    sections: [
      {
        h2: "BibTeX to MLA: what actually changes",
        paragraphs: [
          "Nothing inside @article{lecun2015deep, author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}, title = {Deep Learning}, journal = {Nature}, year = {2015}, volume = {521}, number = {7553}, pages = {436--444}, doi = {10.1038/nature14539}} says that only the first author keeps the surname-first order, that the title takes quotation marks, or that the journal name goes in italics. MLA 9th edition is the opposite: one element order, one punctuation set. A BibTeX to MLA conversion is therefore a placement job, not a translation job.",
          "So the field labels, the equals signs and the double hyphen disappear, while a quoted title, an italic container and a volume-and-issue block appear. The example above becomes `LeCun, Yann, et al. \"Deep Learning.\" Nature, vol. 521, no. 7553, 2015, pp. 436–44. https://doi.org/10.1038/nature14539.` The BibTeX double hyphen turns into an en dash, and the page range is shortened to 436–44.",
        ],
        table: {
          headers: ["BibTeX field", "MLA 9th edition element", "Output shape"],
          rows: [
            ["author", "First author surname first, then et al. for 3+", "LeCun, Yann, et al."],
            ["title", "In quotation marks, title case", "\"Deep Learning.\""],
            ["journal", "Container, in italics", "Nature,"],
            ["year", "After the issue number", "2015,"],
            ["volume, number", "vol. and no. abbreviations", "vol. 521, no. 7553,"],
            ["pages", "pp. with a shortened range", "pp. 436–44."],
            ["doi", "As a link, last element", "https://doi.org/10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "Author names: one flip, then et al.",
        paragraphs: [
          "MLA 9th edition inverts only the first author's name. `author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}` becomes LeCun, Yann, et al. — the second and third authors never appear, because MLA lists the first author plus et al. once a work has three or more authors. With two authors, both appear: `Doe, John, and Jane Smith.`",
          "The trap is a BibTeX file that already abbreviates authors, or one that stores a corporate author without double braces. World Health Organization reads as three people unless you write it as {{World Health Organization}}. The converter splits the author field on and before formatting, so a missing and merges two people into one.",
        ],
        list: [
          "Count the names in each author field before converting.",
          "Double-brace every corporate author so it stays one name.",
          "Two authors: both names, second in natural order after and.",
          "Three or more authors: first author only, then a comma and et al.",
        ],
      },
      {
        h2: "Containers: the title is quoted, the journal is not",
        paragraphs: [
          "MLA 9th edition wraps the title of a journal article in quotation marks and italicises the container that holds it. A BibTeX to MLA conversion therefore needs to know which field is the container: journal for @article, booktitle for @inproceedings, publisher for @book. A chapter title is quoted and its book title is italicised.",
          "Book entries follow the same rule with a different container. @book{goodfellow2016deep, author = {Goodfellow, Ian and Bengio, Yoshua and Courville, Aaron}, title = {Deep Learning}, publisher = {MIT Press}, year = {2016}} becomes `Goodfellow, Ian, et al. Deep Learning. MIT Press, 2016.` The book title is italicised and the publisher takes the container position.",
        ],
        table: {
          headers: ["Entry type", "Quoted title", "Italic container"],
          rows: [
            ["@article", "Article title", "Journal name"],
            ["@inproceedings", "Paper title", "Proceedings title"],
            ["@book", "Book title (italic, not quoted)", "Publisher"],
            ["@incollection", "Chapter title", "Book title"],
            ["@phdthesis", "Thesis title (italic, not quoted)", "University"],
            ["@online", "Page title", "Website name"],
          ],
        },
      },
      {
        h2: "Volume, issue, pages and the DOI",
        paragraphs: [
          "MLA 9th edition spells out its abbreviations: vol. 521, no. 7553, pp. 436–44. The volume and issue never appear as bare numbers, and the page range is shortened by the same rule Chicago uses, dropping repeated digits. When an entry has no issue number, the block collapses to vol. 521 on its own.",
          "The DOI closes the entry as a link, https://doi.org/10.1038/nature14539. MLA 9th edition prefers the DOI as a clickable link, so the resolver prefix stays. A URL is used only when no DOI exists, and it is printed without angle brackets.",
        ],
      },
      {
        h2: "Check the converted entry against four points",
        paragraphs: [
          "Before you paste a converted BibTeX to MLA entry anywhere, read it against four questions: at most one author name before et al., a quoted title followed by an italic container, vol. and no. in abbreviated form, and a short-form DOI at the very end.",
          "Keep the BibTeX download if a second submission is likely. A formatted string cannot be turned back into fields, while a .bib file converts again for another style in seconds, and the .ris download carries the same records into EndNote or Zotero.",
        ],
        list: [
          "Authors: first author surname first, et al. for three or more.",
          "Title: in quotation marks; container in italics.",
          "Numbers: vol., no., pp. with a shortened range.",
          "DOI: last element, as a full link.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many authors does MLA 9th edition list?",
        a: "One, then et al., once a work has three or more authors. Two authors are both listed, the second in natural order after and.",
      },
      {
        q: "Does MLA use a DOI link or the short form?",
        a: "The link: https://doi.org/10.1038/nature14539. MLA 9th edition prefers the DOI as a clickable link, so the resolver prefix stays.",
      },
      {
        q: "Why is the journal name in italics but the article title in quotes?",
        a: "MLA italicises containers and quotes the works inside them. The journal is the container; the article is the work it contains.",
      },
      {
        q: "What happens to brace-protected capitals such as {DNA}?",
        a: "The braces are removed and the inner text is kept as written, so {DNA} prints as DNA rather than Dna. That is one reason to convert instead of retyping titles.",
      },
      {
        q: "Does a BibTeX to MLA conversion keep the volume and issue?",
        a: "Yes, as vol. 521, no. 7553. If the entry has no number field, the block collapses to the volume alone.",
      },
      {
        q: "Is my .bib file uploaded when I convert it?",
        a: "No. The BibTeX to MLA conversion runs inside your browser tab, nothing is posted to a server, and no account is needed.",
      },
    ],
    relatedSlugs: ["apa-to-mla", "bibtex-to-chicago", "bibtex-to-ieee"],
    ctaPrimary: "Paste your BibTeX and get the MLA list",
    ctaSecondary: "See how Chicago handles the same entry",
    updated: "2026-11-12",
  },

  "apa-to-mla": {
    slug: "apa-to-mla",
    keyword: "APA to MLA",
    title: "APA to MLA: Authors, Quotes, Containers",
    description:
      "APA to MLA 9th edition: how the parenthesised year moves, why initials become full first names, and how (LeCun et al., 2015) turns into a Works Cited entry.",
    h1: "APA to MLA: Reference List Conversion in Practice",
    intro:
      "APA and MLA 9th edition agree that a reference opens with the author, then disagree about nearly everything after that. An APA to MLA conversion expands the initials back into first names, moves the year, quotes the title, and italicises the container. The differences are small enough to miss by eye and large enough to fail a paper's Works Cited check.",
    sections: [
      {
        h2: "APA to MLA: five structural differences",
        paragraphs: [
          "Here is one article in both systems. APA 7th edition: `LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539`. MLA 9th edition: `LeCun, Yann, et al. \"Deep Learning.\" Nature, vol. 521, no. 7553, 2015, pp. 436–44. https://doi.org/10.1038/nature14539.` Every row in the table below is visible in that pair.",
          "The ampersand and the parenthesised year are the two markers that let a reader spot an unconverted APA entry at a glance. A year in parentheses after the author block exists in no MLA variant, because MLA puts the year near the end of the entry, after the issue number.",
        ],
        table: {
          headers: ["Element", "APA 7th edition", "MLA 9th edition"],
          rows: [
            ["Authors", "LeCun, Y., Bengio, Y., & Hinton, G.", "LeCun, Yann, et al."],
            ["Year", "In parentheses after the authors", "After the issue number"],
            ["Title", "Sentence case, no marker", "Title case, in quotation marks"],
            ["Container", "Journal name in italics", "Journal name in italics"],
            ["Volume, issue", "521(7553)", "vol. 521, no. 7553"],
            ["Pages", "436–444, en dash", "pp. 436–44, shortened range"],
            ["DOI", "https://doi.org/10.1038/nature14539", "https://doi.org/10.1038/nature14539"],
            ["In text", "(LeCun et al., 2015)", "(LeCun et al. 436)"],
          ],
        },
      },
      {
        h2: "Author names: the initials expand again",
        paragraphs: [
          "APA already writes the surname first, so the name order survives an APA to MLA conversion; the initials do not. LeCun, Y. becomes LeCun, Yann: the initial expands to the full first name, and only the first author is listed when a work has three or more authors. APA 7th lists up to twenty names; MLA stops after the first and appends et al.",
          "Author count is where the systems really part. A four-author APA reference loses its second, third and fourth names in MLA, and if you restore them by hand you must re-check whether et al. is still needed. Group authors pass through unchanged: World Health Organization prints in full in both systems, never abbreviated to WHO unless the source does.",
        ],
      },
      {
        h2: "In-text markers: (LeCun et al., 2015) becomes a page number",
        paragraphs: [
          "MLA in-text citations point at a page, not a year. Where APA writes (LeCun et al., 2015), MLA writes (LeCun et al. 436) for a quotation from page 436, or (LeCun et al.) when the whole work is meant. The Works Cited list itself is alphabetical by author, so converting the list does not renumber anything the way a numeric system would.",
          "That makes an APA to MLA migration mostly mechanical: the list keeps its order, the markers change shape, and the only manual step is finding the page numbers your quotations actually came from.",
        ],
        list: [
          "Paste the full APA list into the converter, one reference per line or block.",
          "Check each entry's author count: three or more becomes first author plus et al.",
          "Replace every (Author, Year) marker with (Author page) in the text.",
          "Keep the DOI short form; the resolver URL is APA practice.",
        ],
      },
      {
        h2: "Dashes, italics and other typographic damage",
        paragraphs: [
          "An APA to MLA conversion has to survive the paste as well as the parser. APA page ranges use an en dash, 436–444, and MLA shortens the range to 436–44. Word's AutoFormat turns a hyphen between digits back into an en dash as you type the closing digit, so text that was correct when copied can be wrong once pasted.",
          "Title case is the second trap. APA writes article titles in sentence case, Deep learning, while MLA writes them in title case, \"Deep Learning.\" A converter cannot know which words stay lowercase in title case — short prepositions and articles do — so read the converted title once before submitting.",
        ],
      },
      {
        h2: "Where APA parsing needs a human",
        paragraphs: [
          "The shape a parser recognises is author block, year in parentheses, period. Entries that break it include legal citations, web pages with no personal author, and anything whose date is a range such as (2020-2023). Those are faster to type into the manual entry form than to repair afterwards.",
          "A web page with no named author is the commonest of the three. Paste it, check the year, and make sure the finished item names the site as its container so the APA to MLA result reads as a web source rather than a journal article.",
        ],
        list: [
          "n.d. has no MLA equivalent either: supply a year, or cite the item as a web source with an access date.",
          "An edition pasted into the title, such as (2nd ed.), lands inside the title element and nothing removes it.",
          "Retrieved from strings are APA-specific and should be dropped before conversion.",
          "A DOI typed as https://doi.org/10.1038/nature14539 prints as the same link in MLA.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to delete the ampersand before converting?",
        a: "No, the parser drops it. If you convert by hand, replace the ampersand with a comma first, because a leftover & is the clearest sign of a half-converted entry.",
      },
      {
        q: "Should I use an en dash or a hyphen for page ranges in MLA?",
        a: "A shortened range with an en dash: pp. 436–44. MLA 9th edition drops repeated digits, so 436–444 becomes 436–44.",
      },
      {
        q: "Why does MLA list only one author for a three-author paper?",
        a: "Because MLA 9th edition writes the first author plus et al. for three or more authors. APA lists up to twenty, so the same paper looks very different in the two lists.",
      },
      {
        q: "What do I do with an APA entry dated n.d.?",
        a: "MLA has no marker for an unknown year either. Use the year from the publisher's page, or cite the item as a web source with the date you accessed it.",
      },
      {
        q: "Does the converter renumber references in citation order?",
        a: "No. Both APA and MLA lists are alphabetical, so an APA to MLA batch keeps its input order. Only numeric styles renumber.",
      },
      {
        q: "Why did the article title change case?",
        a: "Because MLA uses title case for article titles while APA uses sentence case. Check short words by hand: prepositions and articles stay lowercase in title case.",
      },
    ],
    relatedSlugs: ["bibtex-to-mla", "bibtex-to-chicago", "bibtex-to-ieee"],
    ctaPrimary: "Convert an APA reference list to MLA",
    ctaSecondary: "Convert the same list from BibTeX to MLA",
    updated: "2026-11-12",
  },

  "bibtex-to-chicago": {
    slug: "bibtex-to-chicago",
    keyword: "BibTeX to Chicago",
    title: "BibTeX to Chicago: Author-Date in Practice",
    description:
      "BibTeX to Chicago 17th edition author-date: full author names, the year after the authors, quoted titles, and volume(issue) with a colon before the pages.",
    h1: "BibTeX to Chicago: A Field-by-Field Conversion Guide",
    intro:
      "A .bib entry stores references as named fields; the Chicago Manual of Style 17th edition author-date system expects a fixed element order with fixed punctuation. Almost every BibTeX to Chicago problem comes from that mismatch rather than from missing data. This guide shows which field lands where, how the year moves, and what to check before you paste the result into a paper.",
    sections: [
      {
        h2: "BibTeX to Chicago: what actually changes",
        paragraphs: [
          "Nothing inside @article{lecun2015deep, author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}, title = {Deep Learning}, journal = {Nature}, year = {2015}, volume = {521}, number = {7553}, pages = {436--444}, doi = {10.1038/nature14539}} says that all three authors are listed in full, that the year follows the author block, or that the page range takes a colon. Chicago author-date is the opposite: one element order, one punctuation set. A BibTeX to Chicago conversion is therefore a placement job, not a translation job.",
          "So the field labels, the equals signs and the double hyphen disappear, while a year, a quoted title and a volume-and-issue block appear. The example above becomes `LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton. 2015. \"Deep Learning.\" Nature 521 (7553): 436–44. https://doi.org/10.1038/nature14539.` The BibTeX double hyphen turns into an en dash, and the page range is shortened to 436–44.",
        ],
        table: {
          headers: ["BibTeX field", "Chicago 17th author-date element", "Output shape"],
          rows: [
            ["author", "All authors, first surname first, rest in natural order", "LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton."],
            ["year", "After the author block", "2015."],
            ["title", "In quotation marks, headline style", "\"Deep Learning.\""],
            ["journal", "In italics", "Nature"],
            ["volume, number", "One block, issue in parentheses", "521 (7553):"],
            ["pages", "After a colon, shortened range", "436–44."],
            ["doi", "Resolver URL, last element", "https://doi.org/10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "Author names: everyone is listed, in two orders",
        paragraphs: [
          "Chicago author-date lists every author, up to ten names, and inverts only the first. `author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}` becomes LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton. With eleven or more authors, Chicago lists the first seven followed by et al.",
          "The trap is a BibTeX file that already abbreviates authors, or one that stores a corporate author without double braces. World Health Organization reads as three people unless you write it as {{World Health Organization}}. The converter splits the author field on and before formatting, so a missing and merges two people into one.",
        ],
      },
      {
        h2: "Author-date or notes: pick the system first",
        paragraphs: [
          "Chicago defines two systems, and a BibTeX to Chicago conversion has to know which one you want. The author-date system, used here, puts (LeCun, Bengio, and Hinton 2015) in the text and a reference list at the end. The notes-and-bibliography system uses footnotes instead, and its entries start with the same author block but end with a period after the DOI rather than a URL in the text.",
          "Most science and social-science journals that ask for Chicago want author-date. If your style sheet says footnotes, convert with the same tool but check the output against the notes format: the first footnote for a work spells out all authors and ends with the page cited, while later notes shorten to author and title.",
        ],
        list: [
          "Author-date in text: (LeCun, Bengio, and Hinton 2015, 437).",
          "Notes first citation: full entry plus the cited page.",
          "Notes later citations: LeCun et al., \"Deep Learning,\" 437.",
          "Bibliography: one entry per work, alphabetical by author.",
        ],
      },
      {
        h2: "Volume, issue, pages and the DOI",
        paragraphs: [
          "Chicago writes the volume and issue as one block, 521 (7553), followed by a colon and the page range. The range is shortened by Chicago's rule: 436–444 becomes 436–44, dropping the repeated digits. When an entry has no issue number, the block collapses to the volume alone, 521: 436–44.",
          "The DOI closes the entry as a resolver URL, https://doi.org/10.1038/nature14539. A URL is used only when no DOI exists, and it is printed in full. Book entries follow the same pattern with a different container: place, colon, publisher, year, as in `Goodfellow, Ian, Yoshua Bengio, and Aaron Courville. 2016. Deep Learning. Cambridge, MA: MIT Press.`",
        ],
      },
      {
        h2: "Check the converted entry against four points",
        paragraphs: [
          "Before you paste a converted BibTeX to Chicago entry anywhere, read it against four questions: all authors listed with only the first inverted, the year directly after the author block, a quoted title with an italic container, and a volume(issue): pages block with a shortened range.",
          "Keep the BibTeX download if a second submission is likely. A formatted string cannot be turned back into fields, while a .bib file converts again for another style in seconds, and the .ris download carries the same records into EndNote or Zotero.",
        ],
        list: [
          "Authors: first inverted, rest in natural order, and before the last.",
          "Year: immediately after the author block, then a period.",
          "Title: in quotation marks; container in italics.",
          "Numbers: volume (issue): shortened page range, DOI last.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Chicago list all authors or use et al.?",
        a: "Author-date lists up to ten authors in full. With eleven or more, it lists the first seven followed by et al.",
      },
      {
        q: "What is the difference between author-date and notes?",
        a: "Author-date puts (LeCun, Bengio, and Hinton 2015) in the text and a reference list at the end. Notes-and-bibliography uses footnotes instead. Most science journals want author-date.",
      },
      {
        q: "Why is the page range 436–44 and not 436–444?",
        a: "Chicago shortens page ranges by dropping repeated digits: 436–444 becomes 436–44. The converter applies that rule automatically.",
      },
      {
        q: "Where does the year go in Chicago author-date?",
        a: "Directly after the author block, before the title: LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton. 2015. \"Deep Learning.\" That position is what makes the system author-date.",
      },
      {
        q: "Does Chicago use a DOI link or the short form?",
        a: "The resolver URL: https://doi.org/10.1038/nature14539. The short doi: form is MLA practice, not Chicago.",
      },
      {
        q: "Is my .bib file uploaded when I convert it?",
        a: "No. The BibTeX to Chicago conversion runs inside your browser tab, nothing is posted to a server, and no account is needed.",
      },
    ],
    relatedSlugs: ["bibtex-to-mla", "apa-to-mla", "bibtex-to-ieee"],
    ctaPrimary: "Paste your BibTeX and get the Chicago list",
    ctaSecondary: "See how IEEE numbers the same entry",
    updated: "2026-11-26",
  },

  "bibtex-to-ieee": {
    slug: "bibtex-to-ieee",
    keyword: "BibTeX to IEEE",
    title: "BibTeX to IEEE: Numbered References",
    description:
      "BibTeX to IEEE: initials before surnames, quoted titles, vol. and no., pp. ranges, and reference numbers [1], [2] in citation order.",
    h1: "BibTeX to IEEE: A Field-by-Field Conversion Guide",
    intro:
      "A .bib entry stores references as named fields; the IEEE reference list expects a fixed element order, numbered by first citation. Almost every BibTeX to IEEE problem comes from that mismatch rather than from missing data. This guide shows which field lands where, how the numbers are assigned, and what to check before you paste the result into a paper.",
    sections: [
      {
        h2: "BibTeX to IEEE: what actually changes",
        paragraphs: [
          "Nothing inside @article{lecun2015deep, author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}, title = {Deep Learning}, journal = {Nature}, year = {2015}, volume = {521}, number = {7553}, pages = {436--444}, doi = {10.1038/nature14539}} says that initials come before surnames, that the title takes quotation marks, or that the entry opens with a bracketed number. IEEE is the opposite: one element order, one punctuation set, and a number that depends on where the work is first cited. A BibTeX to IEEE conversion is therefore a placement job, not a translation job.",
          "So the field labels, the equals signs and the double hyphen disappear, while initials, a quoted title and a volume-and-issue block appear. The example above becomes `[1] Y. LeCun, Y. Bengio, and G. Hinton, \"Deep learning,\" Nature, vol. 521, no. 7553, pp. 436–444, May 2015, doi: 10.1038/nature14539.` The BibTeX double hyphen turns into an en dash.",
        ],
        table: {
          headers: ["BibTeX field", "IEEE element", "Output shape"],
          rows: [
            ["author", "Initials before surnames, and before the last", "Y. LeCun, Y. Bengio, and G. Hinton,"],
            ["title", "In quotation marks, sentence case, then a comma", "\"Deep learning,\""],
            ["journal", "In italics", "Nature,"],
            ["volume, number", "vol. and no. abbreviations", "vol. 521, no. 7553,"],
            ["pages", "pp. with an en-dash range", "pp. 436–444,"],
            ["year, month", "Month and year near the end", "May 2015,"],
            ["doi", "Short form, last element", "doi: 10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "Reference numbers follow first citation, not the alphabet",
        paragraphs: [
          "IEEE numbers entries in the order they are first cited in the text: the first work cited is [1], the second is [2], and the list is printed in that order. A BibTeX to IEEE conversion numbers the list in the order you paste it, so paste in citation order or renumber afterwards. Insert one source in paragraph two and every later number shifts by one, so this belongs in your last pass over the manuscript.",
          "In the text, the marker is the number in square brackets: `... as shown in [1].` The same work cited twice keeps the same number, and a range is written [1]–[3]. There is no author-date marker anywhere in IEEE, so (LeCun, 2015) never appears.",
        ],
        list: [
          "Paste references in the order they are first cited.",
          "Cite with [1], not with the author name or year.",
          "Renumber after any insertion, since a new [2] shifts every later reference.",
          "The same work always keeps the same number.",
        ],
      },
      {
        h2: "Author names: initials first, surnames last",
        paragraphs: [
          "IEEE writes every author as initials followed by the surname: Y. LeCun, Y. Bengio, and G. Hinton. All authors are listed, and the word and precedes the last name. A BibTeX to IEEE conversion therefore flips every name in the author field, not just the first one.",
          "The trap is a BibTeX file that stores a corporate author without double braces. World Health Organization reads as three people unless you write it as {{World Health Organization}}. The converter splits the author field on and before formatting, so a missing and merges two people into one.",
        ],
      },
      {
        h2: "Volume, issue, pages, month and DOI",
        paragraphs: [
          "IEEE spells out its abbreviations: vol. 521, no. 7553, pp. 436–444. The page range uses an en dash, unlike the hyphen MLA prefers. The month and year sit near the end of the entry, after the pages: May 2015. When the month is unknown, the year stands alone.",
          "The DOI closes the entry in short form, doi: 10.1038/nature14539. A URL is used only when no DOI exists. Book entries follow the same pattern with a different container: `I. Goodfellow, Y. Bengio, and A. Courville, Deep Learning. Cambridge, MA, USA: MIT Press, 2016.` The book title is italicised and the place and publisher take the container position.",
        ],
        table: {
          headers: ["Entry type", "IEEE shape"],
          rows: [
            ["@article", "[1] Initials Surnames, \"Title,\" Journal, vol., no., pp., Month Year, doi."],
            ["@inproceedings", "[1] Initials Surnames, \"Title,\" in Proc. Conf., City, Year, pp."],
            ["@book", "[1] Initials Surnames, Title. Place: Publisher, Year."],
            ["@phdthesis", "[1] Initials Surnames, \"Title,\" Ph.D. dissertation, Dept., Univ., City, Year."],
            ["@online", "[1] Initials Surnames, \"Title,\" Website, Year. [Online]. Available: URL"],
          ],
        },
      },
      {
        h2: "Check the converted entry against four points",
        paragraphs: [
          "Before you paste a converted BibTeX to IEEE entry anywhere, read it against four questions: a bracketed number at the start, initials before every surname, a quoted title with an italic container, and vol., no. and pp. in abbreviated form.",
          "Keep the BibTeX download if a second submission is likely. A formatted string cannot be turned back into fields, while a .bib file converts again for another style in seconds, and the .ris download carries the same records into EndNote or Zotero.",
        ],
        list: [
          "Number: [1], [2] in first-citation order, not alphabetical.",
          "Authors: initials first, and before the last name.",
          "Title: in quotation marks; container in italics.",
          "Numbers: vol., no., pp. with an en-dash range, DOI last.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does IEEE sort references alphabetically?",
        a: "No. IEEE numbers entries in first-citation order: the first work cited is [1] and the list is printed in that order. Inserting a source renumbers everything after it.",
      },
      {
        q: "How do I cite the same work twice in IEEE?",
        a: "With the same number, [1]. A range of works is written [1]–[3]. There is no author-date marker in IEEE.",
      },
      {
        q: "Does IEEE use a DOI link or the short form?",
        a: "The short form: doi: 10.1038/nature14539. The https://doi.org/ resolver URL is APA practice, not IEEE.",
      },
      {
        q: "Should page ranges use a hyphen or an en dash in IEEE?",
        a: "An en dash: pp. 436–444. MLA prefers a hyphen, so the same range looks different in the two styles.",
      },
      {
        q: "What happens to the month if my BibTeX entry has none?",
        a: "The entry ends with the year alone. IEEE prints the month only when the record carries one.",
      },
      {
        q: "Is my .bib file uploaded when I convert it?",
        a: "No. The BibTeX to IEEE conversion runs inside your browser tab, nothing is posted to a server, and no account is needed.",
      },
    ],
    relatedSlugs: ["bibtex-to-mla", "apa-to-mla", "bibtex-to-chicago"],
    ctaPrimary: "Paste your BibTeX and get the IEEE list",
    ctaSecondary: "See how MLA handles the same entry",
    updated: "2026-11-12",
  },

  "doi-to-bibtex": {
    slug: "doi-to-bibtex",
    keyword: "DOI to BibTeX",
    title: "DOI to BibTeX: Crossref to @article",
    description:
      "DOI to BibTeX in one lookup: paste a DOI, get a clean @article entry with a generated key and full fields — plus the arXiv cases Crossref misses.",
    h1: "DOI to BibTeX: Turning an Identifier Into a .bib Entry",
    intro:
      "A DOI is the fastest route to a .bib entry and the one most likely to arrive with pieces missing. A DOI to BibTeX lookup resolves the identifier against Crossref, reads the publisher's deposit, and writes it out as a BibTeX entry. That works well for modern journal deposits and needs a second look for everything else.",
    sections: [
      {
        h2: "DOI to BibTeX: what the lookup returns",
        paragraphs: [
          "The lookup is one request to the Crossref REST API for a single work identifier, asking for JSON. The response is the publisher's deposit rather than a curated catalogue record. From it the converter reads nine things: title, container title, authors split into family and given names, issued date, volume, issue, page, publisher and the identifier itself.",
          "Those nine fields are exactly what a BibTeX entry needs, which is why a bare DOI often produces a finished @article. Everything else in the deposit, from abstracts to licence text to funder data, is discarded. Take 10.1038/nature14539: the lookup returns the LeCun, Bengio and Hinton paper Deep learning, published in Nature in 2015, volume 521, issue 7553, pages 436–444.",
          "The catch is deposit quality. Older records sometimes carry capitalised titles, a missing volume, or an author list without given names. A DOI to BibTeX result can be structurally correct and still need two edits, and knowing which fields to inspect makes that fast.",
        ],
        table: {
          headers: ["Crossref field", "BibTeX field", "In the LeCun example"],
          rows: [
            ["title", "title", "Deep learning"],
            ["author[].family / given", "author, joined with and", "LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey"],
            ["container-title", "journal", "Nature"],
            ["issued date-parts", "year", "2015"],
            ["volume / issue", "volume / number", "521 / 7553"],
            ["page", "pages, double hyphen", "436--444"],
            ["DOI", "doi, plus a url field", "10.1038/nature14539"],
            ["type", "entry type", "journal-article becomes @article"],
          ],
        },
      },
      {
        h2: "The citation key: LeCun2015Deep",
        paragraphs: [
          "Every BibTeX entry needs a key, and the DOI lookup builds one from the record itself: the first author's surname, the year and the first word of the title. The LeCun paper becomes @article{LeCun2015Deep, ...}. The key never contains the DOI, so it stays short enough to type in a cite command and safe to use in every LaTeX setup.",
          "Rename the key freely before you save the file — it is plain text, and nothing else in the entry depends on it. The one rule is uniqueness: two entries in the same .bib file cannot share a key, and a second paper by the same first author in the same year gets a key from its own title word. If two titles start with the same word, rename one of them by hand.",
        ],
        list: [
          "Keys are built as SurnameYearFirstTitleWord, for example LeCun2015Deep.",
          "A key is only a label: renaming it changes no field in the entry.",
          "Two entries in one .bib file must never share a key.",
          "Check the key before citing it: a typo there is a missing reference in the PDF.",
        ],
      },
      {
        h2: "Which entry type the DOI becomes",
        paragraphs: [
          "Crossref labels every work with a type, and that type decides the BibTeX entry type. The mapping follows the document rather than the publisher, with one trap: posted-content is Crossref's name for a preprint, and it arrives as an @article whose container is the preprint server, so check the container before you cite it as a journal paper.",
          "A thesis DOI is the other edge case. Crossref calls it a dissertation and the converter has no way to know whether it was a PhD or a master's thesis, so it arrives as @misc. Change the type to @phdthesis by hand and add the school field; the rest of the entry is already correct.",
        ],
        table: {
          headers: ["Crossref type", "BibTeX entry type", "Note"],
          rows: [
            ["journal-article", "@article", "The common case"],
            ["proceedings-article", "@inproceedings", "Container is the proceedings title"],
            ["book", "@book", "Publisher takes the container position"],
            ["book-chapter", "@inbook", "Title is the chapter, container is the book"],
            ["report", "@techreport", "Institution goes in the institution field"],
            ["dataset", "@misc", "Repository is the howpublished note"],
            ["dissertation", "@misc", "Change to @phdthesis and add school"],
            ["posted-content", "@article", "Preprint: check the container first"],
          ],
        },
      },
      {
        h2: "When Crossref has no record for the DOI",
        paragraphs: [
          "Crossref is one registration agency among several, and a DOI to BibTeX lookup can only read its own deposits. An arXiv DOI of the form 10.48550/arXiv.2301.00001 is registered with DataCite, so a Crossref request returns a not-found error however valid the identifier is. Paste the arXiv abs URL (e.g. https://arxiv.org/abs/2301.00001) or an arXiv:2301.00001 identifier instead: the pattern is recognised separately, the version suffix is stripped, and the record is read from the arXiv API.",
          "Zenodo, figshare and Dryad identifiers, including the 10.5281 family, are DataCite records too, so no DOI to BibTeX lookup finds them at Crossref. Those describe datasets, so the entry type is @misc and the container is the repository rather than a journal. A pasted URL works as well: the input is scanned for a DOI-shaped string and trailing punctuation such as a semicolon or full stop is removed before the request, which matters when the identifier came out of a PDF reference list with the sentence still attached.",
        ],
      },
      {
        h2: "DOI to BibTeX at list scale",
        paragraphs: [
          "The DOI box resolves a single identifier: it reads the first DOI-shaped string or arXiv identifier in the input and returns one record. A list of forty identifiers would mean forty lookups, so use the other input modes when the references are already in front of you.",
          "Paste them as APA text, one reference per blank line, or as BibTeX, and both are parsed locally in a single pass. Keep the DOI box for the reference that is garbled at the source, where a title is missing or a page range was lost in a copy-paste. For a long list, one DOI to BibTeX lookup per broken entry is usually the whole job.",
          "Lookups and conversions stay in your browser's local history, the most recent twenty, so an identifier you resolved yesterday is one click away. Output leaves as .bib, .ris or plain .txt, and the .ris route moves records into EndNote or Zotero without retyping.",
        ],
        list: [
          "Paste the identifier, or the whole reference if you only have that.",
          "Check the entry type before you trust the @article label.",
          "Fix missing volume or pages in the source record, then re-export.",
          "Keep the .bib file: it is the source the other styles are generated from.",
        ],
      },
    ],
    faqs: [
      {
        q: "What citation key does a DOI to BibTeX conversion produce?",
        a: "The first author's surname, the year and the first word of the title — LeCun2015Deep for the LeCun 2015 paper. Rename it freely; it is only a label and nothing else in the entry depends on it.",
      },
      {
        q: "Why does an arXiv DOI return nothing?",
        a: "Because 10.48550 identifiers are registered with DataCite, not Crossref. Paste the arXiv abs URL or an arXiv:2301.00001 identifier instead, and the record is read from the arXiv API.",
      },
      {
        q: "Does the .bib entry keep the DOI?",
        a: "Yes, twice: once as the doi field and once as a url field holding the https://doi.org/ link. Both survive a round trip through a reference manager.",
      },
      {
        q: "What if Crossref has no page numbers?",
        a: "Some deposits carry only an article number or no page at all, so the pages field is missing and you add it by hand. Older records sometimes lack a volume too.",
      },
      {
        q: "Can I convert a list of DOIs at once?",
        a: "The DOI box resolves one identifier per lookup. For a longer list, paste it as APA text or BibTeX, which is parsed in a single pass.",
      },
      {
        q: "Is a DOI to BibTeX lookup private?",
        a: "Only the identifier is sent, to the Crossref API, to fetch the publisher's metadata. There is no account, no upload of your bibliography, and no server-side copy of your list.",
      },
    ],
    relatedSlugs: ["doi-to-apa", "bibtex-to-apa", "doi-to-mla"],
    ctaPrimary: "Paste a DOI and get the BibTeX entry",
    ctaSecondary: "See the same record as APA 7th",
    updated: "2026-11-18",
  },

  "bibtex-to-apa": {
    slug: "bibtex-to-apa",
    keyword: "BibTeX to APA 7th",
    title: "BibTeX to APA 7th: Field-by-Field Guide",
    description:
      "BibTeX to APA 7th edition, field by field: the twenty-author rule, sentence-case titles, the italic journal and volume block, and the DOI as a link.",
    h1: "BibTeX to APA 7th: A Field-by-Field Conversion Guide",
    intro:
      "A .bib entry stores references as named fields; the APA 7th edition reference list expects a fixed element order with fixed punctuation. Almost every BibTeX to APA 7th problem comes from that mismatch rather than from missing data. This guide shows which field lands where, how many author names survive, and what to check before you paste the result into a paper.",
    sections: [
      {
        h2: "BibTeX to APA 7th: what actually changes",
        paragraphs: [
          "Nothing inside @article{lecun2015deep, author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}, title = {Deep Learning}, journal = {Nature}, year = {2015}, volume = {521}, number = {7553}, pages = {436--444}, doi = {10.1038/nature14539}} says that the year belongs in parentheses after the authors, that the title drops to sentence case, or that the journal name and the volume go in italics. APA 7th edition is the opposite: one element order, one punctuation set. A BibTeX to APA 7th conversion is therefore a placement job, not a translation job.",
          "So the field labels, the equals signs and the double hyphen disappear, while a parenthesised year, an italic volume and a DOI link appear. The example above becomes `LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539`. The BibTeX double hyphen turns into an en dash, and the page range stays full length.",
        ],
        table: {
          headers: ["BibTeX field", "APA 7th edition element", "Output shape"],
          rows: [
            ["author", "Surname plus initials, & before the last", "LeCun, Y., Bengio, Y., & Hinton, G."],
            ["year", "In parentheses after the authors", "(2015)."],
            ["title", "Sentence case, no marker", "Deep learning."],
            ["journal", "In italics", "Nature,"],
            ["volume, number", "Volume italic, issue in parentheses", "521(7553),"],
            ["pages", "Full range with an en dash", "436–444."],
            ["doi", "As a link, last element", "https://doi.org/10.1038/nature14539"],
          ],
        },
      },
      {
        h2: "Author names: twenty, then an ellipsis",
        paragraphs: [
          "APA 7th edition lists up to twenty authors in the reference list. With twenty-one or more, it prints the first nineteen, an ellipsis, and then the final author — the names in between never appear. The in-text citation is stricter: three or more authors collapse to the first surname plus et al. from the very first mention, so (LeCun et al., 2015) is correct in the text while the list still shows all three names.",
          "Initials stay initials: Y. never expands back into Yann, because a .bib file that only stores initials has nothing to expand. A corporate author needs double braces, {{World Health Organization}}, or the converter reads it as three people. The ampersand before the last author is APA punctuation, not data, so it never appears in the BibTeX source.",
        ],
        list: [
          "Count the names in each author field before converting.",
          "Twenty or fewer: every name appears in the list.",
          "Twenty-one or more: first nineteen, an ellipsis, then the final author.",
          "Three or more authors: the in-text citation is first author plus et al.",
        ],
      },
      {
        h2: "Titles, italics and the volume block",
        paragraphs: [
          "APA 7th edition writes article titles in sentence case: only the first word and proper nouns keep a capital, so Deep Learning becomes Deep learning. Brace-protected capitals such as {DNA} survive because the braces tell the formatter to keep the inner text as written; without them, DNA would print as Dna.",
          "The journal name and the volume are italicised together, and the issue sits in parentheses right after the volume with no space: Nature, 521(7553). The page range keeps its full length, 436–444, with an en dash — APA never shortens ranges the way MLA does. When an entry has no issue number, the block collapses to the italic volume alone.",
        ],
        table: {
          headers: ["Entry type", "Title treatment", "Container"],
          rows: [
            ["@article", "Sentence case, plain", "Journal name and volume in italics"],
            ["@book", "Sentence case, in italics", "Publisher"],
            ["@inproceedings", "Sentence case, plain", "Proceedings title in italics"],
            ["@incollection", "Sentence case, plain", "Book title in italics, after In"],
            ["@phdthesis", "Sentence case, in italics", "University"],
            ["@online", "Sentence case, plain", "Website name"],
          ],
        },
      },
      {
        h2: "The DOI closes the entry as a link",
        paragraphs: [
          "APA 7th edition prints the DOI as a full link, https://doi.org/10.1038/nature14539, with no period after it and no DOI: prefix. A URL is used only when no DOI exists, and it is printed without angle brackets. Older entries that store the DOI without the resolver prefix still convert, because the formatter adds it.",
          "When there is no page range, because the item is a preprint, a dataset or an article published online ahead of print, the DOI still closes the entry and the volume-and-pages block is simply absent. Some publishers deposit only an article number such as e12345; the lookup reads the page field, so those entries arrive without that element and you add the number by hand.",
        ],
      },
      {
        h2: "Check the converted entry against four points",
        paragraphs: [
          "Before you paste a converted BibTeX to APA 7th entry anywhere, read it against four questions: at most twenty author names before any ellipsis, a sentence-case title followed by an italic journal and volume, a full-length page range with an en dash, and a DOI link at the very end.",
          "Keep the BibTeX download if a second submission is likely. A formatted string cannot be turned back into fields, while a .bib file converts again for another style in seconds, and the .ris download carries the same records into EndNote or Zotero.",
        ],
        list: [
          "Authors: initials, & before the last, twenty at most.",
          "Title: sentence case; journal and volume in italics.",
          "Numbers: volume(issue), full page range with an en dash.",
          "DOI: last element, as a full link.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many authors does APA 7th edition list?",
        a: "Up to twenty in the reference list. With twenty-one or more, it prints the first nineteen, an ellipsis, and the final author. In-text citations use first author plus et al. from three authors on.",
      },
      {
        q: "Why is the article title lowercase after conversion?",
        a: "Because APA 7th edition uses sentence case for article titles: only the first word and proper nouns keep capitals. Deep Learning becomes Deep learning.",
      },
      {
        q: "Where does the DOI go in APA 7th edition?",
        a: "At the very end, as a full link: https://doi.org/10.1038/nature14539. There is no DOI: prefix and no period after the link.",
      },
      {
        q: "What happens to brace-protected capitals such as {DNA}?",
        a: "The braces are removed and the inner text is kept as written, so {DNA} prints as DNA rather than Dna. That is one reason to convert instead of retyping titles.",
      },
      {
        q: "Does a BibTeX to APA 7th conversion keep the volume and issue?",
        a: "Yes, as an italic volume with the issue in parentheses: 521(7553). If the entry has no number field, the block collapses to the volume alone.",
      },
      {
        q: "Is my .bib file uploaded when I convert it?",
        a: "No. The BibTeX to APA 7th conversion runs inside your browser tab, nothing is posted to a server, and no account is needed.",
      },
    ],
    relatedSlugs: ["apa-to-bibtex", "doi-to-apa", "bibtex-to-harvard"],
    ctaPrimary: "Paste your BibTeX and get the APA list",
    ctaSecondary: "Turn the APA list back into BibTeX",
    updated: "2026-11-18",
  },

  "apa-to-bibtex": {
    slug: "apa-to-bibtex",
    keyword: "APA to BibTeX",
    title: "APA to BibTeX: Rebuilding the .bib File",
    description:
      "APA to BibTeX: paste the reference list and get @article entries back, with the right types, keys and page ranges — plus where a human has to step in.",
    h1: "APA to BibTeX: Turning a Reference List Back Into Fields",
    intro:
      "A formatted APA list is a finished product: the field boundaries it was built from are gone. An APA to BibTeX conversion has to rebuild them from punctuation and position alone, and it works because APA 7th edition is rigid enough to read back. This guide shows which shape the parser recognises, which field each element becomes, and where a human still has to step in.",
    sections: [
      {
        h2: "APA to BibTeX: the shape the parser recognises",
        paragraphs: [
          "The shape a parser recognises is author block, year in parentheses, period. LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539 splits exactly there: the author block ends at the year, the title ends at the first period after it, and the rest is container, volume, issue and pages. Paste one reference per blank line and the whole list is read in a single pass. One exception: a trailing DOI link is not a field the parser knows — strip it before pasting, or it is swallowed into the journal field (see the DOI row below).",
          "That shape is also the failure mode. Entries that break it include legal citations, web pages with no personal author, and anything whose date is a range such as (2020-2023). Those are faster to type into the manual entry form than to repair afterwards, and the parser says so instead of guessing.",
        ],
        table: {
          headers: ["APA element", "BibTeX field", "From the LeCun example"],
          rows: [
            ["Author block", "author, initials kept", "LeCun, Y. and Bengio, Y. and Hinton, G."],
            ["Year in parentheses", "year", "2015"],
            ["Title, sentence case", "title", "Deep learning"],
            ["Journal, volume(issue)", "journal, volume, number", "Nature, 521, 7553"],
            ["Page range", "pages, double hyphen", "436--444"],
            ["DOI link", "not kept — strip it first", "Without stripping: journal swallows the link, pages becomes 14539"],
          ],
        },
      },
      {
        h2: "The rebuilt entry and its key",
        paragraphs: [
          "The rebuilt entry is a plain @article with a generated key: the first author's surname, the year and the first word of the title, so the LeCun paper becomes @article{LeCun2015Deep, ...}. The key is only a label, so rename it freely — but keep it unique inside one .bib file, because two entries with the same key break the compile.",
          "Page ranges come back with a double hyphen, 436--444, which is the BibTeX way of writing an en dash. The DOI link is the one thing that does not survive the round trip. Pasted at the end of an APA entry, the link is swallowed into the journal field and its tail becomes the page number — the LeCun entry comes back with pages 14539 and no doi field at all. Strip the https://doi.org/ link before pasting; to keep the DOI, paste the DOI itself into the lookup box, which reads the record from Crossref.",
        ],
        list: [
          "Paste one reference per blank line; the list is read in one pass.",
          "Check the key: two papers by the same author in one year can collide.",
          "Page ranges return with a double hyphen, 436--444.",
          "Strip the DOI link before pasting: it is not kept, and its tail becomes the page number.",
        ],
      },
      {
        h2: "Author names: initials stay initials",
        paragraphs: [
          "APA writes LeCun, Y., and a BibTeX entry rebuilt from that cannot know the Y. stands for Yann. Initials stay initials: the rebuilt author field reads LeCun, Y. and Bengio, Y. and Hinton, G., which compiles fine but looks thinner than a hand-written .bib file. If the full names matter, add them in the .bib text afterwards — the ampersand is dropped and and takes its place.",
          "A reference list never uses et al.: APA 7th edition prints every name up to twenty, so an APA to BibTeX conversion of a list keeps the full author block. Et al. only appears in in-text citations such as (LeCun et al., 2015), and those do not parse — paste the reference list, not the body text. A corporate author arrives as a plain name; wrap it in double braces, {{World Health Organization}}, so BibTeX does not split it into people.",
        ],
      },
      {
        h2: "Types: journal articles and conference papers",
        paragraphs: [
          "The parser starts from @article and only moves when the text tells it to. A container that contains In or the words Proceedings, Conference, Symposium or Proceeding becomes @inproceedings, with the proceedings title as the booktitle field. Everything else stays @article, which is right for the great majority of pasted lists.",
          "Books have no distinct shape in APA text: a book entry reads like an article whose container is a publisher, so it arrives as @article and you change the type to @book by hand. The same is true of theses and reports. An entry dated n.d. has no year at all, so the year field is empty — fill it from the publisher's page or the entry compiles with a missing year.",
        ],
        table: {
          headers: ["APA text clue", "BibTeX entry type", "What to check"],
          rows: [
            ["Journal name, volume(issue)", "@article", "The default; usually right"],
            ["In, or Proceedings / Conference", "@inproceedings", "Container becomes booktitle"],
            ["Publisher, no journal", "@article (fix by hand)", "Change the type to @book"],
            ["University, thesis", "@article (fix by hand)", "Change the type to @phdthesis"],
            ["n.d. as the date", "@article, no year", "Supply the year from the source"],
          ],
        },
      },
      {
        h2: "Check the rebuilt .bib before compiling",
        paragraphs: [
          "Before you compile, read the rebuilt file against four questions: every entry has a unique key, the author block uses and between names, the title kept its capitals where they matter, and the page range uses a double hyphen. Titles are the weak point: APA prints them in sentence case, so a capitalised word such as DNA arrives lowercase unless you re-add the braces.",
          "Keep the APA list next to the .bib file until the PDF compiles once. A formatted string cannot be turned back into fields, but the .bib file you just rebuilt converts again for any other style in seconds, and the .ris download carries the same records into EndNote or Zotero.",
        ],
        list: [
          "Keys: unique in the file, rename on collision.",
          "Authors: and between names, initials stay initials.",
          "Titles: re-add {Braces} around capitals APA lowercased.",
          "Pages: double hyphen, 436--444.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can APA initials be expanded back into full names?",
        a: "No. APA prints Y. and the parser cannot know it stands for Yann. Add full names in the .bib text afterwards if they matter.",
      },
      {
        q: "What happens to et al. in an APA to BibTeX conversion?",
        a: "Nothing, because a reference list never contains it: APA prints every name up to twenty. Et al. only appears in in-text citations, which do not parse — paste the list, not the body text.",
      },
      {
        q: "Why did my book become an @article?",
        a: "Because a book has no distinct shape in APA text. The parser defaults to @article and only recognises conference papers by their container. Change the type to @book by hand.",
      },
      {
        q: "What do I do with an entry dated n.d.?",
        a: "The year field comes back empty, so fill it from the publisher's page. APA has no marker for an unknown year that BibTeX understands.",
      },
      {
        q: "Does the rebuilt entry keep the DOI?",
        a: "No. A DOI link pasted at the end of an APA entry is swallowed into the journal field and its tail becomes the page number, so the rebuilt entry has no doi field. Strip the https://doi.org/ link before pasting; to keep the DOI, paste the DOI itself into the lookup box, which reads the record from Crossref.",
      },
      {
        q: "Is my APA list uploaded when I convert it?",
        a: "No. The APA to BibTeX conversion runs inside your browser tab, nothing is posted to a server, and no account is needed.",
      },
    ],
    relatedSlugs: ["bibtex-to-apa", "doi-to-bibtex", "bibtex-to-mla"],
    ctaPrimary: "Paste the APA list and rebuild the .bib",
    ctaSecondary: "See how BibTeX turns into APA",
    updated: "2026-11-26",
  },

  "doi-to-apa": {
    slug: "doi-to-apa",
    keyword: "DOI to APA 7th",
    title: "DOI to APA 7th: Crossref to Reference",
    description:
      "DOI to APA 7th edition with live Crossref metadata: the twenty-author rule, sentence-case titles, the italic volume block and the DOI as a link.",
    h1: "DOI to APA 7th: Turning an Identifier Into a Reference",
    intro:
      "A DOI is the cheapest way to get a complete APA reference and the one most likely to arrive with pieces missing. A DOI to APA 7th lookup resolves the identifier against Crossref, reads the deposited metadata, and formats it for APA 7th edition. That works well for modern journal deposits and needs a second look for everything else.",
    sections: [
      {
        h2: "What a DOI to APA 7th lookup returns",
        paragraphs: [
          "The lookup is one request to the Crossref REST API for a single work identifier, asking for JSON. The response is the publisher's deposit rather than a curated catalogue record. From it the converter reads nine things: title, container title, authors split into family and given names, issued date, volume, issue, page, publisher and the identifier itself.",
          "Those nine fields are exactly what an APA 7th edition entry needs, which is why a bare DOI often produces a finished reference. Everything else in the deposit, from abstracts to licence text to funder data, is discarded. Take 10.1038/nature14539: the lookup returns the LeCun, Bengio and Hinton paper Deep learning, published in Nature in 2015, volume 521, issue 7553, pages 436–444.",
          "The catch is deposit quality. Older records sometimes carry capitalised titles, a missing volume, or an author list without given names. A DOI to APA 7th result can be structurally correct and still need two edits, and knowing which fields to inspect makes that fast.",
        ],
        table: {
          headers: ["Crossref field", "APA 7th edition element", "In the LeCun example"],
          rows: [
            ["author[].family / given", "Surname plus initials", "LeCun, Y., Bengio, Y., & Hinton, G."],
            ["issued date-parts", "Year in parentheses", "(2015)."],
            ["title", "Sentence case, no marker", "Deep learning."],
            ["container-title", "Journal, in italics", "Nature,"],
            ["volume / issue", "Volume italic, issue in parentheses", "521(7553),"],
            ["page", "Full range, en dash", "436–444."],
            ["DOI", "Link, last element", "https://doi.org/10.1038/nature14539"],
          ],
        },
      },
      {
        h2: "The APA 7th shape: authors, year, italics",
        paragraphs: [
          "APA 7th edition lists up to twenty authors in the reference list. With twenty-one or more, it prints the first nineteen, an ellipsis, and then the final author. The in-text citation is stricter: three or more authors collapse to the first surname plus et al. from the very first mention, so (LeCun et al., 2015) is correct in the text while the list still shows all three names.",
          "The title drops to sentence case — Deep Learning becomes Deep learning — while the journal name and the volume are italicised together and the issue sits in parentheses right after the volume with no space: Nature, 521(7553). The DOI closes the entry as a full link, https://doi.org/10.1038/nature14539, with no period after it and no DOI: prefix.",
        ],
      },
      {
        h2: "When the DOI is not registered with Crossref",
        paragraphs: [
          "Crossref is one registration agency among several, and a DOI to APA 7th lookup can only read its own deposits. An arXiv DOI of the form 10.48550/arXiv.2301.00001 is registered with DataCite, so a Crossref request returns a not-found error however valid the identifier is. Paste the arXiv abs URL (e.g. https://arxiv.org/abs/2301.00001) or an arXiv:2301.00001 identifier instead: the pattern is recognised separately, the version suffix is stripped, and the record is read from the arXiv API.",
          "Zenodo, figshare and Dryad identifiers, including the 10.5281 family, are DataCite records too, so no DOI to APA 7th lookup finds them at Crossref. Those describe datasets, so the entry is a dataset reference and the container is the repository rather than a journal. A pasted URL works as well: the input is scanned for a DOI-shaped string and trailing punctuation such as a semicolon or full stop is removed before the request.",
        ],
      },
      {
        h2: "In-text citations from the same record",
        paragraphs: [
          "The reference list is only half the job; the in-text citation has to match it. Three or more authors become (LeCun et al., 2015) in parentheses, or LeCun et al. (2015) in narrative form, where the year follows the names. Two authors keep both names with an ampersand in parentheses — (LeCun & Bengio, 2015) — and the word and in narrative text.",
          "A quotation needs a page number as well: (LeCun et al., 2015, p. 436) for a single page, or pp. 436–437 for a range. The page numbers come from the same Crossref deposit, so a record without a page field cannot produce one — check the entry before you quote from it.",
        ],
        list: [
          "Three or more authors: (LeCun et al., 2015) in parentheses.",
          "Two authors: (LeCun & Bengio, 2015), and in narrative text.",
          "Quotations: add p. or pp. with the page you quoted from.",
          "Narrative form: LeCun et al. (2015) argued …",
        ],
      },
      {
        h2: "DOI to APA 7th at list scale",
        paragraphs: [
          "The DOI box resolves a single identifier: it reads the first DOI-shaped string or arXiv identifier in the input and returns one record. A list of forty identifiers would mean forty lookups, so use the other input modes when the references are already in front of you.",
          "Paste them as APA text, one reference per blank line, or as BibTeX, and both are parsed locally in a single pass. Keep the DOI box for the reference that is garbled at the source, where a title is missing or a page range was lost in a copy-paste. For a long list, one DOI to APA 7th lookup per broken entry is usually the whole job.",
          "Lookups and conversions stay in your browser's local history, the most recent twenty, so an identifier you resolved yesterday is one click away. Output leaves as .bib, .ris or plain .txt, and the .ris route moves records into EndNote or Zotero without retyping.",
        ],
        list: [
          "Paste the identifier, or the whole reference if you only have that.",
          "Check the author count before you trust the list.",
          "Fix missing volume or pages in the source record, then reformat.",
          "Export as .ris if the list has to go back into a manager.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a DOI lookup give me the page numbers?",
        a: "Usually, because most publishers deposit a page range. Older records or article-number-only deposits have none, so the pages element is missing and you add it.",
      },
      {
        q: "Why does an arXiv DOI return nothing?",
        a: "Because 10.48550 identifiers are registered with DataCite, not Crossref. Paste the arXiv abs URL or an arXiv:2301.00001 identifier instead, and the record is read from the arXiv API.",
      },
      {
        q: "How many DOIs can I convert at once?",
        a: "The DOI box resolves one identifier per lookup. For a longer list, paste it as APA text or BibTeX, which is parsed in a single pass.",
      },
      {
        q: "Where exactly does the DOI go in the reference?",
        a: "At the very end, as a full link: https://doi.org/10.1038/nature14539. There is no DOI: prefix and no period after the link.",
      },
      {
        q: "Is a DOI to APA 7th lookup private?",
        a: "Only the identifier is sent, to the Crossref API, to fetch the publisher's metadata. There is no account, no upload of your bibliography, and no server-side copy of your list.",
      },
      {
        q: "How do I cite three authors in the text?",
        a: "As (LeCun et al., 2015) in parentheses, or LeCun et al. (2015) in narrative form. The reference list still shows all three names.",
      },
    ],
    relatedSlugs: ["doi-to-bibtex", "bibtex-to-apa", "doi-to-mla"],
    ctaPrimary: "Paste a DOI and get the APA reference",
    ctaSecondary: "Get the same record as BibTeX",
    updated: "2026-11-18",
  },

  "bibtex-to-harvard": {
    slug: "bibtex-to-harvard",
    keyword: "BibTeX to Harvard",
    title: "BibTeX to Harvard: Cite Them Right 11th",
    description:
      "BibTeX to Harvard (Cite Them Right 11th): the three-author cut, the quoted title, the italic journal and the doi: prefix — plus where Harvard varies.",
    h1: "BibTeX to Harvard: A Field-by-Field Conversion Guide",
    intro:
      "Harvard has no single official manual, which is the first thing to know about a BibTeX to Harvard conversion. This page follows Cite Them Right 11th edition, the Harvard variant the converter uses — and the one most UK universities base their guides on. If your institution publishes its own Harvard guide, check it against the four points at the end.",
    sections: [
      {
        h2: "BibTeX to Harvard: what actually changes",
        paragraphs: [
          "Nothing inside @article{lecun2015deep, author = {LeCun, Yann and Bengio, Yoshua and Hinton, Geoffrey}, title = {Deep Learning}, journal = {Nature}, year = {2015}, volume = {521}, number = {7553}, pages = {436--444}, doi = {10.1038/nature14539}} says that only three authors survive, that the title takes quotation marks, or that the DOI loses its link. Cite Them Right Harvard is the opposite: one element order, one punctuation set. A BibTeX to Harvard conversion is therefore a placement job, not a translation job.",
          "So the field labels, the equals signs and the double hyphen disappear, while a parenthesised year, a quoted title and a doi: prefix appear. The example above becomes `LeCun, Y., Bengio, Y. and Hinton, G. (2015) “Deep learning,” Nature, 521(7553), pp. 436–444. doi:10.1038/nature14539.` The journal name is italicised in the rendered page, the volume and issue sit together, and the DOI is a bare identifier rather than a link.",
        ],
        table: {
          headers: ["BibTeX field", "Harvard element (Cite Them Right 11th)", "Output shape"],
          rows: [
            ["author", "Surname plus initials, and before the last", "LeCun, Y., Bengio, Y. and Hinton, G."],
            ["year", "In parentheses after the authors", "(2015)"],
            ["title", "In quotation marks", "“Deep learning,”"],
            ["journal", "In italics", "Nature,"],
            ["volume, number", "Volume(issue), no space", "521(7553),"],
            ["pages", "pp. with a full range", "pp. 436–444."],
            ["doi", "doi: plus the bare identifier", "doi:10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "Author names: three, then et al.",
        paragraphs: [
          "Cite Them Right Harvard lists three authors and no more. With four or more authors, the reference list shows the first author followed by et al. — the second, third and fourth names never appear. The in-text citation follows the same cut: three authors are all named, (LeCun, Bengio and Hinton, 2015), and et al. appears only from four authors on.",
          "The word before the last author is and, never an ampersand — that is the quickest way to tell a Harvard list from an APA one at a glance. Initials stay initials, and a corporate author needs double braces, {{World Health Organization}}, or the converter reads it as three people. Other Harvard variants differ: some list every author in the reference list, so if your university's guide says so, follow it instead.",
        ],
        list: [
          "Count the names in each author field before converting.",
          "Three authors: all three, joined by and.",
          "Four or more authors: first author only, then et al.",
          "The separator is and, never &.",
        ],
      },
      {
        h2: "Titles, italics and the doi: prefix",
        paragraphs: [
          "The article title is wrapped in quotation marks and written in sentence case, so Deep Learning becomes “Deep learning,” — the comma sits inside the closing quote. The journal name is italicised and the volume and issue sit together with no space, 521(7553), followed by the page range with a pp. prefix and a full-length en dash, pp. 436–444.",
          "The DOI is the element that surprises people most: Cite Them Right Harvard prints it as doi:10.1038/nature14539, a bare identifier with no resolver prefix, no space after the colon and no link. Other Harvard guides print the full https://doi.org/ link instead, so check your institution's guide if the marker matters — the converter follows Cite Them Right 11th edition.",
        ],
      },
      {
        h2: "Entry types: @article, @book, @inproceedings",
        paragraphs: [
          "A book entry follows the same author-and-year opening with a different container. @book{goodfellow2016deep, author = {Goodfellow, Ian and Bengio, Yoshua and Courville, Aaron}, title = {Deep Learning}, publisher = {MIT Press}, year = {2016}} becomes `Goodfellow, I., Bengio, Y. and Courville, A. (2016) Deep Learning. MIT Press.` The book title is italicised and the publisher takes the container position.",
          "Conference papers keep the paper title in quotation marks and italicise the proceedings title after In. A chapter title is quoted and its book title is italicised. When the .bib entry has no place of publication for a book, the Harvard output shows the publisher alone — add the place by hand if your guide requires it.",
        ],
        table: {
          headers: ["Entry type", "Quoted title", "Italic container"],
          rows: [
            ["@article", "Article title", "Journal name"],
            ["@inproceedings", "Paper title", "Proceedings title"],
            ["@book", "Book title (italic, not quoted)", "Place and publisher"],
            ["@incollection", "Chapter title", "Book title"],
            ["@phdthesis", "Thesis title (italic, not quoted)", "University"],
            ["@online", "Page title", "Website name"],
          ],
        },
      },
      {
        h2: "Check the converted entry against four points",
        paragraphs: [
          "Before you paste a converted BibTeX to Harvard entry anywhere, read it against four questions: at most three author names before et al., a quoted title followed by an italic journal, a volume(issue) block with a pp. range, and a doi: prefix at the very end. If your institution's Harvard guide disagrees with any of them, follow the guide — Harvard is a family of styles, not one manual.",
          "Keep the BibTeX download if a second submission is likely. A formatted string cannot be turned back into fields, while a .bib file converts again for another style in seconds, and the .ris download carries the same records into EndNote or Zotero.",
        ],
        list: [
          "Authors: three at most, et al. from four on.",
          "Title: in quotation marks; journal in italics.",
          "Numbers: volume(issue), pp. with a full range.",
          "DOI: doi: plus the bare identifier, at the end.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which Harvard is this page about?",
        a: "Cite Them Right 11th edition, the variant the converter uses and the one most UK universities base their guides on. Harvard has no single official manual, so check your institution's guide if it differs.",
      },
      {
        q: "How many authors does Harvard list?",
        a: "Three. With four or more authors, Cite Them Right Harvard lists the first author followed by et al., in the reference list and in the text.",
      },
      {
        q: "Why is the DOI written as doi: instead of a link?",
        a: "Because Cite Them Right 11th edition prints the bare identifier after a doi: prefix, with no space and no resolver URL. Other Harvard guides use the full https://doi.org/ link.",
      },
      {
        q: "Does Harvard use single or double quotes for titles?",
        a: "The converter renders the article title in double quotation marks, with the comma inside the closing quote: “Deep learning,”. Some university guides use single quotes — follow yours if it says so.",
      },
      {
        q: "What happens to brace-protected capitals such as {DNA}?",
        a: "The braces are removed and the inner text is kept as written, so {DNA} prints as DNA rather than Dna. That is one reason to convert instead of retyping titles.",
      },
      {
        q: "Is my .bib file uploaded when I convert it?",
        a: "No. The BibTeX to Harvard conversion runs inside your browser tab, nothing is posted to a server, and no account is needed.",
      },
    ],
    relatedSlugs: ["bibtex-to-apa", "bibtex-to-mla", "doi-to-bibtex"],
    ctaPrimary: "Paste your BibTeX and get the Harvard list",
    ctaSecondary: "See the same entry as APA 7th",
    updated: "2026-11-18",
  },

  "doi-to-mla": {
    slug: "doi-to-mla",
    keyword: "DOI to MLA 9th",
    title: "DOI to MLA 9th: Crossref to Works Cited",
    description:
      "DOI to MLA 9th edition with live Crossref metadata: the one-author rule, the quoted title, the italic container and the DOI as a link.",
    h1: "DOI to MLA 9th: Turning an Identifier Into a Works Cited Entry",
    intro:
      "A DOI is the cheapest way to get a complete MLA entry and the one most likely to arrive with pieces missing. A DOI to MLA 9th lookup resolves the identifier against Crossref, reads the deposited metadata, and formats it for MLA 9th edition. That works well for modern journal deposits and needs a second look for everything else.",
    sections: [
      {
        h2: "What a DOI to MLA 9th lookup returns",
        paragraphs: [
          "The lookup is one request to the Crossref REST API for a single work identifier, asking for JSON. The response is the publisher's deposit rather than a curated catalogue record. From it the converter reads nine things: title, container title, authors split into family and given names, issued date, volume, issue, page, publisher and the identifier itself.",
          "Those nine fields are exactly what an MLA 9th edition entry needs, which is why a bare DOI often produces a finished Works Cited entry. Everything else in the deposit, from abstracts to licence text to funder data, is discarded. Take 10.1038/nature14539: the lookup returns the LeCun, Bengio and Hinton paper Deep learning, published in Nature in 2015, volume 521, issue 7553, pages 436–444.",
          "The catch is deposit quality. Older records sometimes carry capitalised titles, a missing volume, or an author list without given names. A DOI to MLA 9th result can be structurally correct and still need two edits, and knowing which fields to inspect makes that fast.",
        ],
        table: {
          headers: ["Crossref field", "MLA 9th edition element", "In the LeCun example"],
          rows: [
            ["author[].family / given", "First author only, then et al.", "LeCun, Yann, et al."],
            ["title", "In quotation marks, title case", "“Deep Learning.”"],
            ["container-title", "Container, in italics", "Nature,"],
            ["issued date-parts", "Year, after the issue number", "2015,"],
            ["volume / issue", "vol. and no. abbreviations", "vol. 521, no. 7553,"],
            ["page", "pp. with a shortened range", "pp. 436–44."],
            ["DOI", "As a link, last element", "https://doi.org/10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "The MLA 9th shape: one author, quotes, italics",
        paragraphs: [
          "MLA 9th edition inverts only the first author's name. LeCun, Yann, et al. — the second and third authors never appear, because MLA lists the first author plus et al. once a work has three or more authors. With two authors, both appear: Doe, John, and Jane Smith.",
          "The title takes quotation marks and title case — “Deep Learning.” — while the journal name is italicised as the container. Volume and issue become vol. 521, no. 7553, the page range is shortened to pp. 436–44, and the DOI closes the entry as a link. The year sits near the end, after the issue number, which is the detail that most often gives away an unconverted APA entry.",
        ],
      },
      {
        h2: "When the DOI is not registered with Crossref",
        paragraphs: [
          "Crossref is one registration agency among several, and a DOI to MLA 9th lookup can only read its own deposits. An arXiv DOI of the form 10.48550/arXiv.2301.00001 is registered with DataCite, so a Crossref request returns a not-found error however valid the identifier is. Paste the arXiv abs URL (e.g. https://arxiv.org/abs/2301.00001) or an arXiv:2301.00001 identifier instead: the pattern is recognised separately, the version suffix is stripped, and the record is read from the arXiv API.",
          "Zenodo, figshare and Dryad identifiers, including the 10.5281 family, are DataCite records too, so no DOI to MLA 9th lookup finds them at Crossref. Those describe datasets, so the entry is a dataset reference and the container is the repository rather than a journal. A pasted URL works as well: the input is scanned for a DOI-shaped string and trailing punctuation such as a semicolon or full stop is removed before the request.",
        ],
      },
      {
        h2: "In-text citations from the same record",
        paragraphs: [
          "MLA in-text citations point at a page, not a year. Where APA writes (LeCun et al., 2015), MLA writes (LeCun et al. 436) for a quotation from page 436, or (LeCun et al.) when the whole work is meant. The Works Cited list itself is alphabetical by author, so converting the list does not renumber anything the way a numeric system would.",
          "That makes a DOI to MLA 9th migration mostly mechanical: the list keeps its order, the markers change shape, and the only manual step is finding the page numbers your quotations actually came from. The page numbers come from the same Crossref deposit, so a record without a page field cannot produce one.",
        ],
        list: [
          "Three or more authors: (LeCun et al. 436) for a quotation.",
          "Whole work: (LeCun et al.) with no page.",
          "Two authors: (LeCun and Bengio 436).",
          "The list stays alphabetical; nothing is renumbered.",
        ],
      },
      {
        h2: "DOI to MLA 9th at list scale",
        paragraphs: [
          "The DOI box resolves a single identifier: it reads the first DOI-shaped string or arXiv identifier in the input and returns one record. A list of forty identifiers would mean forty lookups, so use the other input modes when the references are already in front of you.",
          "Paste them as APA text, one reference per blank line, or as BibTeX, and both are parsed locally in a single pass. Keep the DOI box for the reference that is garbled at the source, where a title is missing or a page range was lost in a copy-paste. For a long list, one DOI to MLA 9th lookup per broken entry is usually the whole job.",
          "Lookups and conversions stay in your browser's local history, the most recent twenty, so an identifier you resolved yesterday is one click away. Output leaves as .bib, .ris or plain .txt, and the .ris route moves records into EndNote or Zotero without retyping.",
        ],
        list: [
          "Paste the identifier, or the whole reference if you only have that.",
          "Check the author count before you trust the list.",
          "Fix missing volume or pages in the source record, then reformat.",
          "Export as .ris if the list has to go back into a manager.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a DOI lookup give me the page numbers?",
        a: "Usually, because most publishers deposit a page range. Older records or article-number-only deposits have none, so the pp. element is missing and you add it.",
      },
      {
        q: "Why does an arXiv DOI return nothing?",
        a: "Because 10.48550 identifiers are registered with DataCite, not Crossref. Paste the arXiv abs URL or an arXiv:2301.00001 identifier instead, and the record is read from the arXiv API.",
      },
      {
        q: "How many DOIs can I convert at once?",
        a: "The DOI box resolves one identifier per lookup. For a longer list, paste it as APA text or BibTeX, which is parsed in a single pass.",
      },
      {
        q: "Does MLA use a DOI link or the short form?",
        a: "The link: https://doi.org/10.1038/nature14539. MLA 9th edition prefers the DOI as a clickable link, so the resolver prefix stays.",
      },
      {
        q: "Why does MLA list only one author for a three-author paper?",
        a: "Because MLA 9th edition writes the first author plus et al. for three or more authors. APA lists up to twenty, so the same paper looks very different in the two lists.",
      },
      {
        q: "Is a DOI to MLA 9th lookup private?",
        a: "Only the identifier is sent, to the Crossref API, to fetch the publisher's metadata. There is no account, no upload of your bibliography, and no server-side copy of your list.",
      },
    ],
    relatedSlugs: ["doi-to-apa", "doi-to-bibtex", "bibtex-to-mla"],
    ctaPrimary: "Paste a DOI and get the MLA entry",
    ctaSecondary: "Get the same record as APA 7th",
    updated: "2026-11-18",
  },
  "arxiv-to-ieee": {
    slug: "arxiv-to-ieee",
    keyword: "arXiv to IEEE",
    title: "arXiv to IEEE: Preprint to Numbered [1]",
    description:
      "arXiv to IEEE: paste the abs URL or an arXiv: identifier, fetch metadata from the arXiv API, and get a numbered IEEE reference with an [Online] link.",
    h1: "arXiv to IEEE: Turning a Preprint Into a Numbered Reference",
    intro:
      "A preprint has no journal volume, no issue and no pages, so an arXiv to IEEE conversion is a different job from converting a published paper. The lookup reads the record from the arXiv API, and the IEEE style numbers it, quotes the title and closes with an [Online]. Available link. This guide shows what the lookup actually accepts, what the record contains, and what the finished entry looks like.",
    sections: [
      {
        h2: "What an arXiv to IEEE lookup returns",
        paragraphs: [
          "The lookup is one request to the arXiv API for a single identifier, asking for the Atom feed entry. The response is the preprint's own record rather than a publisher deposit. From it the converter reads six things: title, authors split into family and given names, the year the preprint was first published, the abs URL, the publisher arXiv, and the container label arXiv preprint.",
          "Those six fields are the whole record, which is why an arXiv to IEEE entry is short. There is no volume, no issue, no page range and no DOI to place, so the finished entry has fewer elements than a journal entry and nothing to invent. Take 1706.03762: the lookup returns the Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser and Polosukhin paper Attention is all you need, published on arXiv in 2017.",
          "The author split is mechanical: the last word of each name becomes the family name and the rest becomes the given names. That works for most Western names and misfires on names where the family name is not last, so check the author line before you trust it on a long list.",
        ],
        table: {
          headers: ["arXiv API field", "IEEE element", "In the Attention example"],
          rows: [
            ["title", "In quotation marks, sentence case", "“Attention is all you need,”"],
            ["author names", "First author plus et al. for a long list", "A. Vaswani et al.,"],
            ["published year", "Year, after the title", "2017,"],
            ["publisher", "Shown as the container", "arXiv."],
            ["abs URL", "[Online]. Available: link, last element", "https://arxiv.org/abs/1706.03762"],
            ["volume / issue / pages", "Absent: a preprint has none", "—"],
          ],
        },
      },
      {
        h2: "Paste the abs URL, not the bare ID",
        paragraphs: [
          "The DOI lookup box accepts two arXiv forms: the full abs URL, https://arxiv.org/abs/1706.03762, or the prefixed ID, arXiv:1706.03762. A bare ID on its own, 1706.03762, is not recognised: the box only understands DOI-shaped strings and those two arXiv forms, so a bare number comes back as an error instead of a record.",
          "A version suffix is stripped before the request, so 1706.03762v2 is looked up as 1706.03762 and returns the current version of the record. The other trap is the arXiv DOI itself: 10.48550/arXiv.1706.03762 is registered with DataCite, not Crossref, so a DOI lookup for it returns not found. Paste the arXiv URL instead and the record comes from the arXiv API.",
        ],
        list: [
          "Works: https://arxiv.org/abs/1706.03762",
          "Works: arXiv:1706.03762 (v2, v3 suffixes are stripped).",
          "Fails: a bare 1706.03762 with no prefix or URL.",
          "Fails at Crossref: 10.48550/arXiv.1706.03762 — use the arXiv URL.",
        ],
      },
      {
        h2: "The IEEE shape: [1], one author, [Online]",
        paragraphs: [
          "The finished entry for the Attention paper is exactly this: `[1] A. Vaswani et al., “Attention is all you need,” 2017, arXiv. [Online]. Available: https://arxiv.org/abs/1706.03762`. The bracketed number opens the entry, the title takes quotation marks, the year follows the title, and the container is the publisher arXiv rather than a journal name. Eight authors collapse to the first author plus et al., because the preprint arrives as a generic article record and the style shortens long author lists.",
          "That shortness is the point to check. A journal entry carries vol., no. and pp. to prove where it was published; a preprint entry carries the [Online]. Available link instead, because the URL is the only stable locator. If the paper was later published in a journal, convert the published DOI instead: the journal entry has the volume and pages, and the arXiv version is only for citing the preprint itself.",
        ],
      },
      {
        h2: "In-text citations and the reference list",
        paragraphs: [
          "IEEE numbers entries in the order they are first cited in the text: the first work cited is [1], the second is [2], and the list is printed in that order. An arXiv to IEEE conversion numbers the list in the order you paste it, so paste in citation order or renumber afterwards. The marker in the text is the number in square brackets: `... as shown in [1].` The same work cited twice keeps the same number, and a range is written [1]–[3].",
          "There is no author-date marker anywhere in IEEE, so (Vaswani, 2017) never appears. The list is not alphabetical either, which is the detail that most often gives away an unconverted APA list. Insert one source in paragraph two and every later number shifts by one, so numbering belongs in your last pass over the manuscript.",
        ],
        list: [
          "Paste references in the order they are first cited.",
          "Cite with [1], not with the author name or year.",
          "Renumber after any insertion, since a new [2] shifts every later reference.",
          "The same work always keeps the same number.",
        ],
      },
      {
        h2: "arXiv to IEEE at list scale",
        paragraphs: [
          "The DOI box resolves a single identifier: it reads the first DOI-shaped string or arXiv identifier in the input and returns one record. A reading list of forty preprints would mean forty lookups, so use the other input modes when the references are already in front of you.",
          "Paste them as BibTeX, one entry per @article block, and the whole list is parsed locally in a single pass. The .bib export of an arXiv record keeps the preprint as an @article with journal = {arXiv preprint} and the abs URL, and the citation key follows the surname-year-first-title-word pattern: Vaswani2017Attention. For a long list, one arXiv to IEEE lookup per preprint that only exists on arXiv is usually the whole job.",
          "Lookups and conversions stay in your browser's local history, the most recent twenty, so an identifier you resolved yesterday is one click away. Output leaves as .bib, .ris or plain .txt, and the .ris route moves records into EndNote or Zotero without retyping.",
        ],
        list: [
          "Paste the abs URL, or the arXiv: prefixed ID.",
          "Check the author line before you trust a long list.",
          "Fix the author split in the source record, then reformat.",
          "Export as .ris if the list has to go back into a manager.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I paste just the arXiv ID?",
        a: "No — paste the abs URL, https://arxiv.org/abs/1706.03762, or the prefixed form arXiv:1706.03762. A bare ID such as 1706.03762 is not recognised by the lookup box.",
      },
      {
        q: "What if the paper has a v2 or v3 version?",
        a: "The version suffix is stripped before the request, so 1706.03762v2 is looked up as 1706.03762 and returns the current version of the record.",
      },
      {
        q: "Why does the IEEE entry show only the first author?",
        a: "The arXiv record arrives as a generic article, and the IEEE rendering shortens long author lists to the first author plus et al. The eight-author Attention paper renders as A. Vaswani et al.",
      },
      {
        q: "Does the entry include a DOI?",
        a: "No — the arXiv record has no DOI, so the entry ends with [Online]. Available: and the abs URL. If the paper was later published, convert the published DOI for a journal entry with volume and pages.",
      },
      {
        q: "Can I convert several arXiv papers at once?",
        a: "The DOI box resolves one identifier per lookup. For a longer list, paste it as BibTeX, which is parsed in a single pass.",
      },
      {
        q: "Is an arXiv to IEEE lookup private?",
        a: "Only the identifier is sent, to the arXiv API, to fetch the preprint's metadata. There is no account, no upload of your bibliography, and no server-side copy of your list.",
      },
    ],
    relatedSlugs: ["bibtex-to-ieee", "doi-to-bibtex", "batch-convert-bibtex"],
    ctaPrimary: "Paste an arXiv URL and get the IEEE entry",
    ctaSecondary: "See the same record as BibTeX",
    updated: "2026-11-18",
  },
  "batch-convert-bibtex": {
    slug: "batch-convert-bibtex",
    keyword: "batch convert BibTeX",
    title: "Batch Convert BibTeX: Whole .bib in One Pass",
    description:
      "Batch convert BibTeX: paste a whole .bib file's text or upload it with Pro, convert every entry at once to APA, MLA, IEEE and more — no retyping.",
    h1: "Batch Convert BibTeX: A Whole .bib File in One Pass",
    intro:
      "A .bib file is already a batch: one file, dozens of entries, one format. A batch convert BibTeX job is therefore not a special mode — it is the normal converter fed the whole file at once, with every entry parsed in a single pass and formatted in the style you chose. This guide shows how to get the file out of your reference manager, what is free and what is Pro, and what to check before the list goes into a paper.",
    sections: [
      {
        h2: "What batch conversion means here",
        paragraphs: [
          "Paste the whole .bib text into the input box and the converter parses every @article, @book and @inproceedings block in one pass, then formats the entire list in the output style you selected. There is no per-entry button and no entry-count limit in the tool: the list goes in as text and comes out as a formatted reference list.",
          "The file-upload button does the same thing without the copy-paste step: it reads the .bib or .txt file in your browser and appends its contents to the input box. The file never leaves your computer — it is read with the browser's local file reader, and the conversion itself runs client-side. Switching the output format re-renders the same pasted list instantly, so one paste produces an APA list, an IEEE list and a fresh .bib export without re-entering anything.",
        ],
        table: {
          headers: ["Source", "How the list gets in", "What comes out"],
          rows: [
            ["Zotero library", "Export as BibTeX, then paste or upload the .bib", "The whole library in the chosen style"],
            ["JabRef database", "Save as .bib, then paste or upload", "Every entry, same order as the file"],
            ["Google Scholar", "Export one .bib per paper, paste them together", "A combined list in one pass"],
            ["A .bib from a co-author", "Paste the file text as-is", "Formatted list, no retyping"],
            ["Back into a manager", "Download the result as .bib or .ris", "Records ready for Zotero or EndNote"],
          ],
        },
      },
      {
        h2: "Export a .bib file from Zotero or JabRef",
        paragraphs: [
          "In Zotero, select the items (or the whole collection), open the export dialog and choose BibTeX as the format, then save the .bib file. In JabRef, the database already is a .bib file — save it and paste or upload it directly. Both exporters write one @entry block per reference, with the citation key in the first line and one field per line after it.",
          "Two details decide whether the batch parses cleanly. First, the file must be UTF-8: accented characters such as é or ü survive in UTF-8 and turn into replacement characters in a Latin-1 export, so re-export if names look wrong. Second, corporate authors need double braces — {{World Health Organization}} — or the converter reads them as three people. A missing and between two authors merges them into one, which is the most common silent error in a batch.",
        ],
        list: [
          "Zotero: select items, export as BibTeX, save the .bib file.",
          "JabRef: the database is already .bib — save and use it directly.",
          "Check the export is UTF-8 before pasting.",
          "Double-brace every corporate author.",
          "Search the file for and and count names in each author field.",
        ],
      },
      {
        h2: "Paste or upload: what is free and what is Pro",
        paragraphs: [
          "Pasting is free and unlimited by entry count: the whole .bib text goes into the input box and converts in one pass. The upload button is the Pro part — it lets you pick .bib or .txt files (several at once) instead of opening the file and copying its text. Pro also keeps 100 history items instead of 20, so a batch you converted last week is still one click away.",
          "Nothing about the conversion itself is gated: the same parser, the same output styles and the same .bib, .ris and .txt downloads work on the free plan. The Pro difference is convenience — no copy-paste for long files — plus the longer history. If the button shows a Pro label, clicking it scrolls to the Pro section instead of opening the file picker.",
        ],
        table: {
          headers: ["Action", "Free", "Pro"],
          rows: [
            ["Paste .bib text", "Yes, any number of entries", "Yes"],
            ["Upload .bib / .txt files", "No — the button is Pro-only", "Yes, several files at once"],
            ["Convert the whole list at once", "Yes", "Yes"],
            ["Download .bib / .ris / .txt", "Yes", "Yes"],
            ["Conversion history", "Most recent 20", "Most recent 100"],
          ],
        },
      },
      {
        h2: "One list, many formats",
        paragraphs: [
          "The pasted list is the source of truth, and the output format is just a view of it. Convert the same .bib text to APA 7th for a psychology submission, switch the dropdown to IEEE for an engineering one, and download the .bib again when a co-author needs the raw entries. Nothing is re-entered and nothing is re-parsed by hand.",
          "That is also why the .bib file is worth keeping after the conversion. A formatted string cannot be turned back into fields, while the .bib converts again for another style in seconds. The .ris download carries the same records into EndNote or Zotero, so the list survives the round trip between tools without anyone retyping author names.",
        ],
      },
      {
        h2: "Check the batch before you paste it anywhere",
        paragraphs: [
          "Before a converted batch goes into a manuscript, read it against four questions: does the output have the same number of entries as the input, is every author list complete, is there exactly one bracketed code or number pattern per entry in the chosen style, and does every entry end with its DOI or URL where the source had one. A count mismatch is the fastest signal that an entry broke in the parse.",
          "The usual causes are small: unbalanced braces, a missing comma after a field, or an author field without and between two names. Fix the entry in Zotero or in the pasted text and convert again — do not hand-edit the formatted output, because the next conversion overwrites it. A chapter in an edited book deserves one extra look, since the // separator between the chapter and the book title is the element most often lost when the editor field is empty.",
        ],
        list: [
          "Count entries: output count must match input count.",
          "Check every author list for merged or missing names.",
          "Look for unbalanced braces or a missing comma in the source.",
          "Fix the source entry, never the formatted output.",
          "Keep the .bib file for the next submission.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many entries can I convert at once?",
        a: "There is no entry-count limit in the tool: the whole pasted .bib text is parsed in a single pass. For a very long file, paste it in two chunks if the browser feels slow.",
      },
      {
        q: "Is the .bib file upload free?",
        a: "No — the upload button is a Pro feature. Pasting the .bib text into the input box is free and converts the same entries.",
      },
      {
        q: "Does the uploaded file leave my computer?",
        a: "No. The file is read with the browser's local file reader and the conversion runs client-side. Nothing is uploaded to any server.",
      },
      {
        q: "Can I upload several .bib files at once?",
        a: "Yes — the file picker accepts multiple files, and their contents are joined and converted together.",
      },
      {
        q: "What if one entry in the file is broken?",
        a: "Compare the entry count in the output with the input. A mismatch usually means unbalanced braces or a missing comma in the source entry — fix it in Zotero or in the pasted text and convert again.",
      },
      {
        q: "Can I get the batch back as .bib or .ris?",
        a: "Yes. The export buttons download the converted list as .bib, .ris or plain text, and the .ris file goes straight back into EndNote or Zotero.",
      },
    ],
    relatedSlugs: ["bibtex-to-apa", "bibtex-to-ieee", "arxiv-to-ieee"],
    ctaPrimary: "Paste a .bib file and convert it all",
    ctaSecondary: "Convert one DOI at a time instead",
    updated: "2026-11-18",
  },
  "doi-to-chicago": {
    slug: "doi-to-chicago",
    keyword: "DOI to Chicago",
    title: "DOI to Chicago: Author-Date in Practice",
    description:
      "DOI to Chicago 17th edition author-date: paste a DOI, read the Crossref record, and get a full author list, a quoted title, and a shortened page range.",
    h1: "DOI to Chicago: Turning an Identifier Into a Reference",
    intro:
      "A DOI is the cheapest way to get a complete Chicago reference and the one most likely to arrive with pieces missing. A DOI to Chicago lookup resolves the identifier against Crossref, reads the deposited metadata, and formats it for the Chicago Manual of Style 17th edition author-date system. That works well for modern journal deposits and needs a second look for everything else.",
    sections: [
      {
        h2: "What a DOI to Chicago lookup returns",
        paragraphs: [
          "The lookup is one request to the Crossref REST API for a single work identifier, asking for JSON. The response is the publisher's deposit, not a curated catalogue record, and the converter reads nine things from it: title, container title, authors split into family and given names, issued date, volume, issue, page, publisher and the identifier itself.",
          "Those nine fields are exactly what a Chicago 17th edition author-date entry needs, so a bare DOI often produces a finished reference; the rest of the deposit — abstracts, licence text, funder data — is discarded. Take 10.1038/nature14539: the LeCun, Bengio and Hinton paper Deep learning, published in Nature in 2015, volume 521, issue 7553, pages 436–444.",
          "The catch is deposit quality: older records sometimes carry capitalised titles, a missing volume, or an author list without given names. A result can be structurally correct and still need two edits.",
        ],
        table: {
          headers: ["Crossref field", "Chicago 17th author-date element", "In the LeCun example"],
          rows: [
            ["author[].family / given", "Full names, first surname first", "LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton."],
            ["issued date-parts", "Year after the author block", "2015."],
            ["title", "In quotation marks, headline style", "“Deep Learning.”"],
            ["container-title", "Journal, in italics", "Nature"],
            ["volume / issue", "Volume (issue), colon before pages", "521 (7553):"],
            ["page", "Shortened range after the colon", "436–44."],
            ["DOI", "Resolver URL, last element", "https://doi.org/10.1038/nature14539"],
          ],
        },
      },
      {
        h2: "The Chicago 17th author-date shape: full names, year first",
        paragraphs: [
          "The finished entry for the LeCun paper is exactly this: `LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton. 2015. “Deep Learning.” Nature 521 (7553): 436–44. https://doi.org/10.1038/nature14539.` All three authors appear in full — only the first surname first, the rest in natural order — the year follows the author block, the title is quoted in headline style, and the journal is italicised while the volume stays roman.",
          "Two details separate this from the APA entry for the same paper. Chicago shortens the page range — 436–444 becomes 436–44 — and the DOI keeps its trailing period, because the resolver URL is the entry's last element. With no issue number, the block collapses to the volume alone, 521: 436–44.",
        ],
        list: [
          "All authors in full, to ten; eleven or more list the first seven plus et al.",
          "Year directly after the author block, then a period.",
          "Title in quotation marks, headline style; journal in italics.",
          "Volume (issue): shortened page range, DOI last.",
        ],
      },
      {
        h2: "In-text citations: (LeCun, Bengio, and Hinton 2015)",
        paragraphs: [
          "The reference list is only half the job; the in-text citation has to match it. Chicago author-date names all three authors for a three-author work: (LeCun, Bengio, and Hinton 2015). No comma follows the names, none precedes the year — the detail that most often gives away an APA citation pasted into a Chicago paper.",
          "One author is (LeCun 2015), two are (LeCun and Bengio 2015), and from four on it shortens to (LeCun et al. 2015). A quotation adds the page — (LeCun, Bengio, and Hinton 2015, 437) — and the narrative form is LeCun, Bengio, and Hinton (2015) argued …",
        ],
        list: [
          "Three authors: (LeCun, Bengio, and Hinton 2015).",
          "Two authors: (LeCun and Bengio 2015), and in narrative text.",
          "Four or more authors: (LeCun et al. 2015) from the first mention.",
          "Quotations: add a comma and the page you quoted from.",
        ],
      },
      {
        h2: "Author-date or notes: pick the system first",
        paragraphs: [
          "Chicago defines two systems, and a DOI to Chicago conversion has to know which one you want. The converter uses author-date: a parenthetical citation in the text and a reference list at the end. Notes-and-bibliography uses footnotes instead, starting from the same author block with different punctuation.",
          "Most science and social-science journals that ask for Chicago want author-date. If your style sheet says footnotes, do not paste the author-date entry into a footnote: the first footnote spells out all authors and ends with the page cited, while later notes shorten to author and title. Convert with the same tool, then check the output against the notes format before it goes in.",
        ],
        list: [
          "Author-date in text: (LeCun, Bengio, and Hinton 2015, 437).",
          "Notes later citations: LeCun et al., “Deep Learning,” 437.",
        ],
      },
      {
        h2: "When the DOI is not registered with Crossref",
        paragraphs: [
          "Crossref is one registration agency among several, and a DOI to Chicago lookup can only read its own deposits. An arXiv DOI such as 10.48550/arXiv.2301.00001 is registered with DataCite, so Crossref returns not found however valid it is. Paste the arXiv abs URL (e.g. https://arxiv.org/abs/2301.00001) or an arXiv:2301.00001 identifier instead: the pattern is recognised separately, the version suffix stripped, and the record read from the arXiv API.",
          "Zenodo, figshare and Dryad identifiers, including the 10.5281 family, are DataCite records too, so no DOI to Chicago lookup finds them at Crossref. Those describe datasets, so the entry is a dataset reference and the container is the repository rather than a journal. A pasted URL works as well: the input is scanned for a DOI-shaped string and trailing punctuation is removed before the request.",
        ],
      },
      {
        h2: "DOI to Chicago at list scale",
        paragraphs: [
          "The DOI box resolves a single identifier — the first DOI-shaped string or arXiv identifier in the input — and returns one record. Forty identifiers would mean forty lookups, so use the other input modes when the references are already in front of you.",
          "Paste them as APA text, one reference per blank line, or as BibTeX, and both are parsed locally in a single pass. Chicago, Harvard, MLA and IEEE text cannot be parsed as input — only APA text can — so keep the DOI box for the reference that is garbled at the source. For a long list, one DOI to Chicago lookup per broken entry is usually the whole job.",
          "Lookups and conversions stay in your browser's local history, the most recent twenty, so yesterday's identifier is one click away. Output leaves as .bib, .ris or plain .txt, and .ris moves records into EndNote or Zotero without retyping. RIS is output only: it cannot be pasted back in as input.",
        ],
        list: [
          "Paste the identifier, or the whole reference.",
          "Check the author count before you trust the list.",
          "Fix missing volume or pages in the source, then reformat.",
          "Export as .ris if the list has to go back into a manager.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many authors does Chicago list in the reference list?",
        a: "Up to ten in full. With eleven or more, it lists the first seven followed by et al.",
      },
      {
        q: "What does the in-text citation look like for three authors?",
        a: "All three names: (LeCun, Bengio, and Hinton 2015). Et al. appears only from four authors on.",
      },
      {
        q: "Why is the page range 436–44 and not 436–444?",
        a: "Chicago shortens page ranges by dropping repeated digits: 436–444 becomes 436–44. The converter applies that rule automatically.",
      },
      {
        q: "Why does an arXiv DOI return nothing?",
        a: "Because 10.48550 identifiers are registered with DataCite, not Crossref. Paste the arXiv abs URL or an arXiv:2301.00001 identifier instead, and the record is read from the arXiv API.",
      },
      {
        q: "Does Chicago use author-date or footnotes?",
        a: "The converter uses author-date: (LeCun, Bengio, and Hinton 2015) in the text and a reference list at the end. Notes-and-bibliography uses footnotes instead, so check your style sheet first.",
      },
      {
        q: "Is a DOI to Chicago lookup private?",
        a: "Only the identifier is sent, to the Crossref API, to fetch the publisher's metadata. There is no account, no upload of your bibliography, and no server-side copy of your list.",
      },
    ],
    relatedSlugs: ["doi-to-apa", "bibtex-to-chicago", "doi-to-harvard"],
    ctaPrimary: "Paste a DOI and get the Chicago reference",
    ctaSecondary: "Get the same record as BibTeX",
    updated: "2026-11-26",
  },
  "doi-to-harvard": {
    slug: "doi-to-harvard",
    keyword: "DOI to Harvard",
    title: "DOI to Harvard: Cite Them Right 11th",
    description:
      "DOI to Harvard (Cite Them Right 11th): paste a DOI, read the Crossref record, and get a three-author list, a quoted title, and a doi: identifier.",
    h1: "DOI to Harvard: Turning an Identifier Into a Reference",
    intro:
      "A DOI is the cheapest way to get a complete Harvard reference and the one most likely to arrive with pieces missing. A DOI to Harvard lookup resolves the identifier against Crossref, reads the deposited metadata, and formats it for Cite Them Right 11th edition, the Harvard variant the converter uses. That works well for modern journal deposits and needs a second look for everything else.",
    sections: [
      {
        h2: "What a DOI to Harvard lookup returns",
        paragraphs: [
          "The lookup is one request to the Crossref REST API for a single work identifier, asking for JSON. The response is the publisher's deposit, not a curated catalogue record, and the converter reads nine things from it: title, container title, authors split into family and given names, issued date, volume, issue, page, publisher and the identifier itself.",
          "Those nine fields are exactly what a Cite Them Right Harvard entry needs, so a bare DOI often produces a finished reference; the rest of the deposit — abstracts, licence text, funder data — is discarded. Take 10.1038/nature14539: the LeCun, Bengio and Hinton paper Deep learning, published in Nature in 2015, volume 521, issue 7553, pages 436–444.",
          "The catch is deposit quality: older records sometimes carry capitalised titles, a missing volume, or an author list without given names. A result can be structurally correct and still need two edits.",
        ],
        table: {
          headers: ["Crossref field", "Harvard element (Cite Them Right 11th)", "In the LeCun example"],
          rows: [
            ["author[].family / given", "Surname plus initials, and before the last", "LeCun, Y., Bengio, Y. and Hinton, G."],
            ["issued date-parts", "Year in parentheses after the authors", "(2015)"],
            ["title", "In quotation marks, sentence case", "“Deep learning,”"],
            ["container-title", "Journal, in italics", "Nature,"],
            ["volume / issue", "Volume(issue), no space", "521(7553),"],
            ["page", "pp. with a full range", "pp. 436–444."],
            ["DOI", "doi: plus the bare identifier", "doi:10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "The Harvard shape: three authors, quoted title, doi:",
        paragraphs: [
          "The finished entry for the LeCun paper is exactly this: `LeCun, Y., Bengio, Y. and Hinton, G. (2015) “Deep learning,” Nature, 521(7553), pp. 436–444. doi:10.1038/nature14539.` Only three authors survive, the title is quoted in sentence case, and the journal is italicised while the volume stays roman.",
          "Two details separate this from the APA entry for the same paper. The page range keeps its full length with a pp. prefix — pp. 436–444, never shortened the way Chicago shortens it — and the DOI is a bare identifier with a doi: prefix, no resolver URL and no space after the colon. The year sits in parentheses directly after the authors.",
        ],
        list: [
          "Authors: three at most, et al. from four on.",
          "Title: in quotation marks; journal in italics.",
          "Numbers: volume(issue), pp. with a full range.",
          "DOI: doi: plus the bare identifier, at the end.",
        ],
      },
      {
        h2: "In-text citations: (LeCun, Bengio and Hinton, 2015)",
        paragraphs: [
          "The reference list is only half the job; the in-text citation has to match it. Cite Them Right Harvard names all three authors in the text for a three-author work: (LeCun, Bengio and Hinton, 2015). The separator is and, never an ampersand, and the year follows a comma after the names — the detail that most often gives away an APA citation pasted into a Harvard paper.",
          "One author is (LeCun, 2015), two are (LeCun and Bengio, 2015), and from four on it shortens to (LeCun et al., 2015). A quotation adds the page — (LeCun, Bengio and Hinton, 2015, p. 436) — and the narrative form is LeCun, Bengio and Hinton (2015) argued …",
        ],
        list: [
          "Three authors: (LeCun, Bengio and Hinton, 2015).",
          "Two authors: (LeCun and Bengio, 2015), and in narrative text.",
          "Four or more authors: (LeCun et al., 2015) from the first mention.",
          "Quotations: add a comma, p. or pp., and the page you quoted from.",
        ],
      },
      {
        h2: "Harvard is a family of styles, not one manual",
        paragraphs: [
          "Harvard has no single official manual, which is the first thing to know about a DOI to Harvard conversion. This page follows Cite Them Right 11th edition, the Harvard variant the converter uses — and the one most UK universities base their guides on. If your institution publishes its own Harvard guide, check it against the four points at the end of this section.",
          "The usual differences are small but visible: some guides print the DOI as a full https://doi.org/ link instead of the bare doi: identifier, some use single quotation marks instead of double, and some list every author instead of cutting at three. When a guide disagrees with this page, follow the guide.",
        ],
        list: [
          "DOI: doi: here; a full link in some guides.",
          "Title quotes: double here; single in some guides.",
          "Authors: three here; every author in some guides.",
          "Your institution's guide wins any disagreement.",
        ],
      },
      {
        h2: "When the DOI is not registered with Crossref",
        paragraphs: [
          "Crossref is one registration agency among several, and a DOI to Harvard lookup can only read its own deposits. An arXiv DOI such as 10.48550/arXiv.2301.00001 is registered with DataCite, so Crossref returns not found however valid it is. Paste the arXiv abs URL (e.g. https://arxiv.org/abs/2301.00001) or an arXiv:2301.00001 identifier instead: the pattern is recognised separately, the version suffix stripped, and the record read from the arXiv API.",
          "Zenodo, figshare and Dryad identifiers, including the 10.5281 family, are DataCite records too, so no DOI to Harvard lookup finds them at Crossref. Those describe datasets, so the entry is a dataset reference and the container is the repository rather than a journal. A pasted URL works as well: the input is scanned for a DOI-shaped string and trailing punctuation is removed before the request.",
        ],
      },
      {
        h2: "DOI to Harvard at list scale",
        paragraphs: [
          "The DOI box resolves a single identifier — the first DOI-shaped string or arXiv identifier in the input — and returns one record. Forty identifiers would mean forty lookups, so use the other input modes when the references are already in front of you.",
          "Paste them as APA text, one reference per blank line, or as BibTeX, and both are parsed locally in a single pass. Chicago, Harvard, MLA and IEEE text cannot be parsed as input — only APA text can — so keep the DOI box for the reference that is garbled at the source. For a long list, one DOI to Harvard lookup per broken entry is usually the whole job.",
          "Lookups and conversions stay in your browser's local history, the most recent twenty, so yesterday's identifier is one click away. Output leaves as .bib, .ris or plain .txt, and .ris moves records into EndNote or Zotero without retyping. RIS is output only: it cannot be pasted back in as input.",
        ],
        list: [
          "Paste the identifier, or the whole reference.",
          "Check the author count before you trust the list.",
          "Fix missing volume or pages in the source, then reformat.",
          "Export as .ris if the list has to go back into a manager.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which Harvard is this page about?",
        a: "Cite Them Right 11th edition, the variant the converter uses and the one most UK universities base their guides on. Harvard has no single official manual, so check your institution's guide if it differs.",
      },
      {
        q: "How many authors does Harvard list?",
        a: "Three. With four or more authors, Cite Them Right Harvard lists the first author followed by et al., in the reference list and in the text.",
      },
      {
        q: "Why is the DOI written as doi: instead of a link?",
        a: "Because Cite Them Right 11th edition prints the bare identifier after a doi: prefix, with no space and no resolver URL. Other Harvard guides use the full https://doi.org/ link.",
      },
      {
        q: "Why does an arXiv DOI return nothing?",
        a: "Because 10.48550 identifiers are registered with DataCite, not Crossref. Paste the arXiv abs URL or an arXiv:2301.00001 identifier instead, and the record is read from the arXiv API.",
      },
      {
        q: "How many DOIs can I convert at once?",
        a: "The DOI box resolves one identifier per lookup. For a longer list, paste it as APA text or BibTeX, which is parsed in a single pass.",
      },
      {
        q: "Is a DOI to Harvard lookup private?",
        a: "Only the identifier is sent, to the Crossref API, to fetch the publisher's metadata. There is no account, no upload of your bibliography, and no server-side copy of your list.",
      },
    ],
    relatedSlugs: ["doi-to-apa", "bibtex-to-harvard", "doi-to-ieee"],
    ctaPrimary: "Paste a DOI and get the Harvard reference",
    ctaSecondary: "See the same record as APA 7th",
    updated: "2026-11-26",
  },

  "doi-to-ieee": {
    slug: "doi-to-ieee",
    keyword: "DOI to IEEE",
    title: "DOI to IEEE: Crossref to Numbered [1]",
    description:
      "DOI to IEEE: paste a DOI, fetch the publisher metadata from Crossref, and get a numbered IEEE reference with vol., no., pp. and the short doi form.",
    h1: "DOI to IEEE: Turning an Identifier Into a Numbered Reference",
    intro:
      "A DOI is the shortest route to a complete IEEE reference and the one most likely to arrive with pieces missing. A DOI to IEEE lookup resolves the identifier against Crossref, reads the publisher's deposited metadata, and formats it as a numbered IEEE entry. That works well for modern journal deposits and needs a second look for everything else.",
    sections: [
      {
        h2: "What a DOI to IEEE lookup returns",
        paragraphs: [
          "The lookup is one request to the Crossref REST API for a single work identifier, asking for JSON. The response is the publisher's deposit rather than a curated catalogue record. From it the converter reads nine things: title, container title, authors split into family and given names, issued date, volume, issue, page, publisher and the identifier itself.",
          "Those nine fields are exactly what an IEEE entry needs, which is why a bare DOI often produces a finished reference. Everything else in the deposit, from abstracts to licence text to funder data, is discarded. Take 10.1038/nature14539: the lookup returns the LeCun, Bengio and Hinton paper Deep learning, published in Nature in 2015, volume 521, issue 7553, pages 436–444.",
          "The catch is deposit quality. Older records sometimes carry capitalised titles, a missing volume, or an author list without given names. A DOI to IEEE result can be structurally correct and still need two edits, and knowing which fields to inspect makes that fast.",
        ],
        table: {
          headers: ["Crossref field", "IEEE element", "In the LeCun example"],
          rows: [
            ["author[].family / given", "Initials before surnames", "Y. LeCun, Y. Bengio, and G. Hinton,"],
            ["title", "In quotation marks, sentence case", "“Deep learning,”"],
            ["container-title", "Journal, in italics", "Nature,"],
            ["volume / issue", "vol. and no. abbreviations", "vol. 521, no. 7553,"],
            ["page", "pp. with an en-dash range", "pp. 436–444,"],
            ["issued date-parts", "Month and year near the end", "May 2015,"],
            ["DOI", "Short form, last element", "doi: 10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "The finished entry, element by element",
        paragraphs: [
          "The finished entry for the LeCun paper is exactly this: `[1] Y. LeCun, Y. Bengio, and G. Hinton, “Deep learning,” Nature, vol. 521, no. 7553, pp. 436–444, May 2015, doi: 10.1038/nature14539.` The bracketed number opens the entry, the title takes quotation marks in sentence case, the journal is italicised, the volume and issue are spelled out as vol. and no., the page range uses an en dash, and the DOI closes the entry in short form.",
          "The month appears only when the deposit carries it: the Crossref record for this paper is issued 28 May 2015, so May 2015 prints after the pages. A year-only deposit prints the year alone, and there is nothing to add by hand. The number is [1] because this is the first entry rendered; in a list the numbers follow the order the works are first cited, not the alphabet.",
        ],
      },
      {
        h2: "When Crossref cannot find the DOI",
        paragraphs: [
          "Crossref is one registration agency among several, and a DOI to IEEE lookup can only read its own deposits. An arXiv DOI of the form 10.48550/arXiv.2301.00001 is registered with DataCite, so a Crossref request returns a not-found error however valid the identifier is. Paste the arXiv abs URL, https://arxiv.org/abs/2301.00001, or an arXiv:2301.00001 identifier instead: the pattern is recognised separately and the record is read from the arXiv API.",
          "Zenodo, figshare and Dryad identifiers, including the 10.5281 family, are DataCite records too, so no DOI to IEEE lookup finds them at Crossref. A pasted URL works as well: the input is scanned for the first DOI-shaped string, and trailing punctuation such as a semicolon or full stop is removed before the request.",
        ],
        list: [
          "Works: a bare DOI, 10.1038/nature14539.",
          "Works: the resolver URL, https://doi.org/10.1038/nature14539.",
          "Works: a DOI embedded in a pasted reference — the first one is read.",
          "Fails at Crossref: 10.48550/arXiv.2301.00001 — use the arXiv URL.",
          "Fails at Crossref: 10.5281/zenodo records — DataCite, not Crossref.",
        ],
      },
      {
        h2: "In-text citations and the reference list",
        paragraphs: [
          "IEEE numbers entries in the order they are first cited in the text: the first work cited is [1], the second is [2], and the list is printed in that order. A DOI to IEEE conversion numbers the list in the order you paste it, so paste in citation order or renumber afterwards. The marker in the text is the number in square brackets: `... as shown in [1].` The same work cited twice keeps the same number, and a range is written [1]–[3].",
          "There is no author-date marker anywhere in IEEE, so (LeCun, 2015) never appears. The list is not alphabetical either, which is the detail that most often gives away an unconverted APA list. Insert one source in paragraph two and every later number shifts by one, so numbering belongs in your last pass over the manuscript.",
        ],
        list: [
          "Paste references in the order they are first cited.",
          "Cite with [1], not with the author name or year.",
          "Renumber after any insertion, since a new [2] shifts every later reference.",
          "The same work always keeps the same number.",
        ],
      },
      {
        h2: "DOI to IEEE at list scale",
        paragraphs: [
          "The DOI box resolves a single identifier: it reads the first DOI-shaped string or arXiv identifier in the input and returns one record. A list of forty identifiers would mean forty lookups, so use the other input modes when the references are already in front of you.",
          "Paste them as BibTeX, one entry per @article block, or as APA text, one reference per blank line, and both are parsed locally in a single pass. Keep the DOI box for the reference that is garbled at the source, where a title is missing or a page range was lost in a copy-paste. For a long list, one DOI to IEEE lookup per broken entry is usually the whole job.",
          "Lookups and conversions stay in your browser's local history, the most recent twenty, so an identifier you resolved yesterday is one click away. Output leaves as .bib, .ris or plain .txt, and the .ris route moves records into EndNote or Zotero without retyping.",
        ],
        list: [
          "Paste the identifier, or the whole reference if you only have that.",
          "Check the author count before you trust the list.",
          "Fix missing volume or pages in the source record, then reformat.",
          "Export as .ris if the list has to go back into a manager.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I paste the DOI as a full URL?",
        a: "Yes. A bare 10.1038/nature14539, the https://doi.org/10.1038/nature14539 link, or a DOI embedded in a pasted reference all work: the first DOI-shaped string is read and trailing punctuation is stripped.",
      },
      {
        q: "Why does my entry have no volume or pages?",
        a: "The publisher's deposit did not carry them. Older records and article-number-only deposits often have no page range, so the pages element is missing and you add it from the publisher's page.",
      },
      {
        q: "Why does an arXiv DOI return nothing?",
        a: "Because 10.48550 identifiers are registered with DataCite, not Crossref. Paste the arXiv abs URL or an arXiv:2301.00001 identifier instead, and the record is read from the arXiv API.",
      },
      {
        q: "Does IEEE use a DOI link or the short form?",
        a: "The short form: doi: 10.1038/nature14539. The https://doi.org/ resolver URL is APA practice, not IEEE.",
      },
      {
        q: "How many DOIs can I convert at once?",
        a: "The DOI box resolves one identifier per lookup. For a longer list, paste it as BibTeX or APA text, which is parsed in a single pass.",
      },
      {
        q: "Is a DOI to IEEE lookup private?",
        a: "Only the identifier is sent, to the Crossref API, to fetch the publisher's metadata. There is no account, no upload of your bibliography, and no server-side copy of your list.",
      },
    ],
    relatedSlugs: ["doi-to-apa", "bibtex-to-ieee", "arxiv-to-ieee"],
    ctaPrimary: "Paste a DOI and get the IEEE entry",
    ctaSecondary: "See the same record as APA",
    updated: "2026-11-26",
  },

  "apa-to-chicago": {
    slug: "apa-to-chicago",
    keyword: "APA to Chicago",
    title: "APA to Chicago: Author-Date, Rebuilt",
    description:
      "APA to Chicago: paste the APA list and get Chicago 17th author-date back. Initials stay initials, and the DOI link must come off first.",
    h1: "APA to Chicago: Turning an APA List Into Author-Date References",
    intro:
      "A Chicago author-date entry is not an APA string with the punctuation swapped: the tool first parses the APA text back into a structured record, then renders that record with the Chicago 17th edition author-date template. That two-step job is why an APA to Chicago conversion mostly works, and why its failures look the way they do. This guide shows what the parser recognises, what the finished entry looks like, and where the DOI link breaks the parse.",
    sections: [
      {
        h2: "Not a rewrite: parse first, then re-render",
        paragraphs: [
          "The conversion runs in two steps: the APA text is parsed into fields — authors, year, title, container, volume, issue, pages — as a structured record, then rendered in Chicago 17th edition author-date. A field that never reaches the record cannot appear in the Chicago entry.",
          "APA text is the only formatted text the tool can parse as input: MLA, Harvard, Chicago and IEEE text cannot be pasted in and read back. Even that parser is a fallback — the citation library itself rejects APA text as unrecognised, so the converter falls back to a heuristic parser that reads the shape author block, year in parentheses, period.",
          "Entries that do not match that shape — legal citations, web pages with no personal author, in-text citations such as (LeCun et al., 2015), dates as a range like (2020-2023) — are skipped silently, with no error and no gap in the output. Count the entries before you trust the list.",
        ],
      },
      {
        h2: "The finished entry: same record, Chicago shape",
        paragraphs: [
          "From a complete record, the Chicago entry for the LeCun paper is exactly this: `LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton. 2015. “Deep Learning.” Nature 521 (7553): 436–44. https://doi.org/10.1038/nature14539.` Full names appear because the record carries them — this is the entry a DOI lookup produces.",
          "The author list is reordered: first author inverted, the rest in natural order, and before the last name where APA used an ampersand. The journal, volume and issue lose their labels — Nature 521 (7553) — and the page range is shortened, 436–44, where APA prints the full 436–444. The title is the one element that changes case: APA prints Deep learning in sentence case, Chicago prints “Deep Learning.”",
          "In-text, three authors become (LeCun, Bengio, and Hinton 2015), or LeCun, Bengio, and Hinton (2015) in narrative form — no comma before the year, and and instead of &. Two authors keep both names, (LeCun and Bengio 2015); a quotation adds the page: (LeCun, Bengio, and Hinton 2015, 436).",
        ],
        table: {
          headers: ["APA element", "Chicago author-date element", "In the LeCun example"],
          rows: [
            ["Author block", "First author inverted, rest natural, and", "LeCun, Yann, Yoshua Bengio, and Geoffrey Hinton."],
            ["Year in parentheses", "Year after the authors, then a period", "2015."],
            ["Title, sentence case", "Title case, in quotation marks", "“Deep Learning.”"],
            ["Journal, volume(issue)", "Journal volume (issue), no labels", "Nature 521 (7553):"],
            ["Page range", "Pages shortened", "436–44."],
            ["DOI link", "DOI link, last element", "https://doi.org/10.1038/nature14539."],
          ],
        },
      },
      {
        h2: "Strip the DOI link before you paste",
        paragraphs: [
          "Leaving the trailing DOI link on the pasted entry breaks the conversion: the parser's journal pattern expects the entry to end with the page range, so the link breaks the match and the fallback reads the DOI's trailing digits as the page number, swallowing the whole tail into the journal title.",
          "Paste `LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539` with the link attached and the Chicago entry comes back as `LeCun, Y., Y. Bengio, and G. Hinton. 2015. “Deep Learning.” Nature, 521(7553), 436–444. Https://Doi.Org/10.1038/Nature14539, 2015, 14539.` The pages became 14539 and the DOI was title-cased into the journal name.",
          "Delete the trailing DOI link before pasting — the DOI does not survive the APA parse, so nothing is lost. If the DOI has to appear in the finished entry, paste the DOI itself into the DOI lookup box: that route reads the full publisher record, DOI included.",
        ],
        list: [
          "Paste: LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444.",
          "Do not paste: the same entry with https://doi.org/10.1038/nature14539 attached.",
          "If the DOI matters, use the DOI lookup, not the APA paste.",
          "A page number like 14539 means the DOI leaked into the parse.",
        ],
      },
      {
        h2: "What the parse keeps, and what it loses",
        paragraphs: [
          "Initials stay initials: APA prints LeCun, Y., and the parser cannot know the Y. stands for Yann, so a Chicago entry built from APA text reads `LeCun, Y., Y. Bengio, and G. Hinton. 2015. “Deep Learning.” Nature, 521(7553), 2015, 436–44.` The doubled year and the volume inside the journal title are the other tell: the parser folds “Nature, 521(7553)” into one container field. Full names only come from a DOI or BibTeX source.",
          "Missing fields make an incomplete entry: the parser cannot invent them. An APA entry with no volume or pages parses to a container of “Nature, 436” and a page of “–444”, which renders as `LeCun, Y., Y. Bengio, and G. Hinton. 2015. “Deep Learning.” Nature, 436, 2015, 444.` — the range is gone and the start page is stuck to the journal name. Fill in the volume, issue and pages from the source before converting.",
          "Types are guessed from the text, and books have no distinct shape in APA: a book entry reads like an article whose container is a publisher, so check the container before you trust it. A container with In, or the words Proceedings, Conference, Symposium or Proceeding, becomes a conference paper, and an entry dated n.d. has no year at all.",
        ],
      },
      {
        h2: "Check the Chicago list before you paste it in",
        paragraphs: [
          "Before the list goes into a manuscript, check five things: entry count matches input, every author list is complete, every entry carries volume, issue and pages where the source had them, no page number looks like a DOI fragment, and every entry ends with its DOI link where wanted. A count mismatch is the fastest signal an entry was skipped.",
          "Fix problems in the source text and convert again — do not hand-edit the formatted output, because the next conversion overwrites it. Keep the APA list: a formatted string cannot be turned back into fields, but the .bib download converts again for any style, and .ris carries the same records into EndNote or Zotero.",
        ],
        list: [
          "Count entries: output count must match input count.",
          "Check pages for DOI digits such as 14539.",
          "Check authors: initials from APA, full names only from DOI or BibTeX.",
          "Re-add DOIs through the DOI lookup where they belong.",
          "In-text form is (Author Year), with and, not &.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I paste a whole APA list at once?",
        a: "Yes. Paste one reference per blank line and the whole list is read in a single pass. Entries that do not match the author-year-title shape are skipped silently, so count the output against the input.",
      },
      {
        q: "Why does my Chicago entry show initials, not full names?",
        a: "Because APA prints initials and the parser cannot expand them: Y. never becomes Yann. Full names need a DOI or BibTeX source, which carries given names as fields.",
      },
      {
        q: "Why did the DOI break my entry?",
        a: "A trailing https://doi.org/ link breaks the parser's journal pattern: the DOI's trailing digits become the page number and the whole tail is swallowed into the journal title. Strip the link before pasting, or use the DOI lookup instead.",
      },
      {
        q: "What if my APA entry has no volume or pages?",
        a: "The output is incomplete: the container and page fields come back garbled, for example a page of 444 from a 436–444 range with no volume. Fill in the volume, issue and pages from the source before converting.",
      },
      {
        q: "How do I cite three authors in the text?",
        a: "As (LeCun, Bengio, and Hinton 2015) in parentheses, or LeCun, Bengio, and Hinton (2015) in narrative form. There is no comma before the year, and and replaces the APA ampersand.",
      },
      {
        q: "Is my APA list uploaded when I convert it?",
        a: "No. The APA to Chicago conversion runs inside your browser tab, nothing is posted to a server, and no account is needed.",
      },
    ],
    relatedSlugs: ["apa-to-bibtex", "bibtex-to-chicago", "apa-to-harvard"],
    ctaPrimary: "Paste the APA list and get Chicago author-date",
    ctaSecondary: "See the same list as BibTeX",
    updated: "2026-11-26",
  },
  "apa-to-harvard": {
    slug: "apa-to-harvard",
    keyword: "APA to Harvard",
    title: "APA to Harvard: Cite Them Right in Practice",
    description:
      "APA to Harvard (Cite Them Right 11th): the & becomes and, the title takes quotes, and (LeCun et al., 2015) turns into a three-author in-text citation.",
    h1: "APA to Harvard: Reference List Conversion in Practice",
    intro:
      "APA 7th edition and Harvard (Cite Them Right 11th edition) look like twins: both open with the author, both put the year in parentheses, and both end with the journal and the pages. An APA to Harvard conversion is a small job with a long tail of punctuation — the ampersand becomes and, the title takes quotation marks, and the DOI loses its link. This guide shows it on one real article, explains how the converter reads APA text, and lists the checks it cannot do for you.",
    sections: [
      {
        h2: "APA to Harvard: one article, two entries",
        paragraphs: [
          "Here is the same article in both systems. APA 7th edition: `LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444.` Harvard (Cite Them Right 11th): `LeCun, Y., Bengio, Y. and Hinton, G. (2015) “Deep learning,” Nature, 521(7553), pp. 436–444.` Both are the Deep learning paper (Nature, 521(7553), 436–444, DOI 10.1038/nature14539), and every row of the table below is visible in that pair.",
          "Those two entries are exactly what the converter produces from the pasted APA text: the text is parsed into a structured record and re-rendered in Harvard. The DOI is the one element that does not survive that trip; the reason is in the DOI section below.",
        ],
        table: {
          headers: ["Element", "APA 7th edition", "Harvard (Cite Them Right 11th)"],
          rows: [
            ["Authors", "LeCun, Y., Bengio, Y., & Hinton, G.", "LeCun, Y., Bengio, Y. and Hinton, G."],
            ["Year", "In parentheses after the authors", "In parentheses after the authors"],
            ["Title", "Sentence case, no quotation marks", "Sentence case, in double quotation marks"],
            ["Journal", "In italics", "In italics"],
            ["Volume, issue", "521(7553), volume in italics", "521(7553), volume in roman type"],
            ["Pages", "436–444, no prefix", "pp. 436–444"],
            ["DOI", "Resolver URL: https://doi.org/10.1038/nature14539", "doi:10.1038/nature14539 (full record only)"],
            ["In text", "(LeCun et al., 2015)", "(LeCun, Bengio and Hinton, 2015)"],
          ],
        },
      },
      {
        h2: "How the converter reads APA text",
        paragraphs: [
          "The converter does not edit the APA string: it parses it into a structured record and renders that record in Harvard, so the conversion is only as good as the parse. The parser expects the APA shape — an author block, a year in parentheses, a period, then the title up to its first period, then journal, volume, issue and pages — and the LeCun entry above matches it exactly, which is why it converts cleanly.",
          "Paste one reference per block, separated by a blank line: the parser splits on blank lines, so two entries run together become one garbled record. Only APA text parses this way — MLA, Harvard, Chicago and IEEE text cannot be used as input, because none puts the year in parentheses after the author block.",
          "Author initials stay initials: the parser reads `LeCun, Y.` as family name LeCun and given name Y, so the Harvard output keeps Y. It cannot expand an initial into Yann — the full name is not in the input. If a style needs full first names, convert from BibTeX or a DOI lookup instead.",
        ],
        list: [
          "Paste APA text, one reference per block, blank line between entries.",
          "Check the author block first: surname, comma, initials, then (year).",
          "Fix missing volume, issue or pages in the pasted text before converting.",
        ],
      },
      {
        h2: "Authors: the ampersand becomes and, et al. moves",
        paragraphs: [
          "The most visible change is the smallest: APA joins the last author with an ampersand, Harvard with the word and. A leftover & is the clearest sign of a half-converted entry.",
          "The author count is where the two systems really part. Cite Them Right Harvard lists at most three authors: with four or more, the list shows the first author followed by et al. — a four-author test record renders as `Alpha, A. et al.` APA 7th lists up to twenty names, so the same paper can lose most of its authors. In text, Harvard names all three authors, (LeCun, Bengio and Hinton, 2015), and uses et al. only from four on — while APA writes (LeCun et al., 2015) for the same three authors.",
          "A corporate author needs a second look: `World Health Organization (2020). ...` has no comma after the name, so the parser's fallback reads the last word as the family name. Check the author line, and convert from BibTeX — where the name can be protected with double braces — if it comes out wrong.",
        ],
      },
      {
        h2: "Titles, italics and the missing DOI",
        paragraphs: [
          "The article title takes double quotation marks and stays in sentence case: Deep learning becomes “Deep learning,” with the comma inside the closing quote. The journal name is italicised in both systems. The volume differs quietly: APA italicises it, while Cite Them Right leaves it in roman type — not bold, whatever a university guide's description of Harvard suggests. The page range takes a pp. prefix and keeps its full length, pp. 436–444.",
          "The DOI is the element the APA-text route cannot carry: the parser reads authors, year, title, journal, volume, issue and pages, and nothing else — there is no field for a DOI or a URL. So the Harvard entry above ends at the pages. Convert the same paper from its DOI or BibTeX and the full record ends with the Cite Them Right form: `LeCun, Y., Bengio, Y. and Hinton, G. (2015) “Deep learning,” Nature, 521(7553), pp. 436–444. doi:10.1038/nature14539.` — doi: plus the bare identifier, no space, no resolver prefix, no link.",
          "Do not leave the DOI link on the end of the pasted APA text. With `https://doi.org/10.1038/nature14539` still attached, the parser misreads the tail: the journal field swallows the volume, pages and link, and the page range comes out as the last digits of the DOI. The mangled result renders as `LeCun, Y., Bengio, Y. and Hinton, G. (2015) “Deep learning,” Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539, p. 14539.` Strip the DOI link before pasting; add the DOI from a DOI lookup if your guide requires it.",
        ],
      },
      {
        h2: "Check the converted list before you submit",
        paragraphs: [
          "Before a converted list goes into a paper, check four things: every & is now an and, every title sits inside quotation marks, every entry ends with a pp. range where the source had pages, and every in-text citation names up to three authors before et al. A missing volume, issue or page range produces a short entry with no warning, so check against the source: if the APA entry had no pages, the Harvard entry has none either.",
          "Harvard is a family of styles, not one manual. This converter follows Cite Them Right 11th edition, the variant most UK universities base their guides on, but some institutions list every author, use single quotes, or print the DOI as a full https://doi.org/ link. If your institution's guide disagrees, follow the guide. The list downloads as .bib, .ris or plain text; history keeps the most recent twenty items, or one hundred on Pro.",
        ],
        list: [
          "Search the converted list for a leftover &.",
          "Count the authors: three at most before et al.",
          "Compare every entry's volume, issue and pages with the source.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which Harvard does this converter use?",
        a: "Cite Them Right 11th edition, the variant most UK universities base their guides on. Harvard has no single official manual, so if your institution publishes its own Harvard guide and it disagrees — on author counts, quote marks or the DOI — follow your institution's guide.",
      },
      {
        q: "Do I need to delete the ampersand before converting?",
        a: "No. The parser drops the & when it reads the author block, and the Harvard rendering joins the last author with and. If you convert by hand, replace & with and first — a leftover & is the clearest sign of a half-converted entry.",
      },
      {
        q: "Why does my Harvard entry have no DOI?",
        a: "Because the APA-text parser keeps authors, year, title, journal, volume, issue and pages only — it has no field for a DOI or a URL. Convert the same paper from its DOI or from BibTeX and the entry ends with doi:10.1038/nature14539.",
      },
      {
        q: "Why does Harvard name all three authors in the text, when APA writes et al.?",
        a: "Cite Them Right Harvard names up to three authors in the text — (LeCun, Bengio and Hinton, 2015) — and uses et al. only from four authors on. APA switches to et al. from three authors, so (LeCun et al., 2015) is correct APA and wrong Harvard for the same paper.",
      },
      {
        q: "Can I paste Harvard or MLA text in as the input?",
        a: "No. Only APA text parses as input, because only APA puts the year in parentheses directly after the author block. MLA, Harvard, Chicago and IEEE text do not match that shape, so paste the APA version, or the BibTeX, instead.",
      },
      {
        q: "What if my APA entry has no volume or pages?",
        a: "The Harvard entry comes out short with no warning — the parser cannot invent fields that are not in the text. Add the missing volume, issue or pages to the pasted APA text first, then convert again.",
      },
    ],
    relatedSlugs: ["apa-to-bibtex", "bibtex-to-harvard", "apa-to-ieee"],
    ctaPrimary: "Convert an APA list to Harvard",
    ctaSecondary: "See the same record as BibTeX",
    updated: "2026-11-26",
  },
  "apa-to-ieee": {
    slug: "apa-to-ieee",
    keyword: "APA to IEEE",
    title: "APA to IEEE: Author-Date to Numbered [1]",
    description:
      "APA to IEEE: paste APA text and get numbered [1] references in citation order — what the parser keeps, what it drops, and how to renumber.",
    h1: "APA to IEEE: Turning Author-Date References Into Numbers",
    intro:
      "APA 7th edition and IEEE could hardly be further apart: one cites by author and year, the other by number, and nothing in an APA entry says which number its work should get. An APA to IEEE conversion is two jobs at once — restyle every entry, then number the list in first-citation order. This guide shows it on one real article, explains how the converter reads APA text, and covers the renumbering that has to happen last.",
    sections: [
      {
        h2: "APA to IEEE: one article, two entries",
        paragraphs: [
          "Here is the same article in both systems. APA 7th edition: `LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444.` IEEE: `[1] Y. LeCun, Y. Bengio, and G. Hinton, “Deep learning,” Nature, 521(7553), pp. 436–444, 2015.` Both are the Deep learning paper by LeCun, Bengio and Hinton, published in Nature in 2015, volume 521, issue 7553, pages 436–444, DOI 10.1038/nature14539. Every row in the table below is visible in that pair.",
          "That IEEE entry is exactly what the converter produces from the pasted APA text. One detail deserves a second look: the volume and issue stay together as 521(7553), exactly as the APA text wrote them, because the parser folds them into the journal field as a single string. Convert the same paper from its DOI or from BibTeX, where volume and issue are separate fields, and the entry renders in the full IEEE shape: `[1] Y. LeCun, Y. Bengio, and G. Hinton, “Deep learning,” Nature, vol. 521, no. 7553, pp. 436–444, 2015, doi: 10.1038/nature14539.`",
        ],
        table: {
          headers: ["Element", "APA 7th edition", "IEEE"],
          rows: [
            ["In-text marker", "(LeCun et al., 2015)", "[1]"],
            ["Authors", "LeCun, Y., Bengio, Y., & Hinton, G.", "Y. LeCun, Y. Bengio, and G. Hinton"],
            ["Year", "In parentheses after the authors", "Near the end, before the DOI"],
            ["Title", "Sentence case, no quotation marks", "Sentence case, in double quotation marks"],
            ["Journal", "In italics", "In italics"],
            ["Volume, issue", "521(7553)", "vol. 521, no. 7553 (full record)"],
            ["Pages", "436–444, no prefix", "pp. 436–444"],
            ["DOI", "Resolver URL: https://doi.org/10.1038/nature14539", "doi: 10.1038/nature14539 (full record only)"],
            ["List order", "Alphabetical by author", "Order of first citation"],
          ],
        },
      },
      {
        h2: "How the converter reads APA text",
        paragraphs: [
          "The converter does not edit the APA string: it parses it into a structured record — authors, year, title, journal, volume, issue and pages — and renders that record in IEEE. The parser expects the APA shape: an author block, a year in parentheses, a period, then the title up to its first period, then journal, volume, issue and pages.",
          "Paste one reference per block, separated by a blank line, and paste them in the order they are first cited in your text. The parser splits the input on blank lines, and the converter numbers the list in pasted order — so the order you paste is the numbering you get. Only APA text parses this way: MLA, Harvard, Chicago and IEEE text cannot be used as input, because none of them puts the year in parentheses directly after the author block.",
        ],
        list: [
          "Paste APA text, one reference per block, in citation order.",
          "Check the author block first: surname, comma, initials, then (year).",
          "Fix missing volume, issue or pages in the pasted text before converting.",
          "Renumbering belongs in the last pass, after the text stops changing.",
        ],
      },
      {
        h2: "Numbers replace names: citation order, not alphabetical",
        paragraphs: [
          "IEEE numbers entries in the order they are first cited: the first work cited is [1], the second [2], and the list is printed in that order. An APA to IEEE conversion therefore cannot keep the APA list's alphabetical order — its first entry becomes [1] only if it is also the first work cited. Paste in citation order, or renumber afterwards.",
          "The marker in the text is the number in square brackets: `... as shown in [1].` The same work cited twice keeps the same number, and a range is written [1]–[3]. There is no author-date marker anywhere in IEEE, so (LeCun et al., 2015) never appears. Insert one source in paragraph two and every later number shifts by one, which is why numbering belongs in your last pass over the manuscript.",
        ],
        list: [
          "Paste references in the order they are first cited.",
          "Cite with [1], not with the author name or year.",
          "Renumber after any insertion, since a new [2] shifts every later reference.",
          "The same work always keeps the same number.",
        ],
      },
      {
        h2: "Authors, titles and pages in IEEE",
        paragraphs: [
          "Author names flip order: APA writes surname first with initials after it, `LeCun, Y.`, while IEEE writes initials first, `Y. LeCun`. IEEE lists up to six authors in full; a longer list collapses to the first author plus et al. — a four-author record renders with all four names, while the eight-author Attention paper renders as `A. Vaswani et al.` The word before the last author is and, never an ampersand.",
          "The title takes double quotation marks and stays in sentence case, “Deep learning,”, and the journal name is italicised. The year moves from directly after the authors to near the end of the entry, after the pages: `..., pp. 436–444, 2015.` The page range keeps its full length with a pp. prefix — IEEE does not shorten 436–444 to 436–44 the way MLA and Chicago do. The DOI, when the record has one, closes the entry as `doi: 10.1038/nature14539`, with a space after the colon.",
        ],
      },
      {
        h2: "What the parser drops, and how to keep it",
        paragraphs: [
          "The APA-text parser reads authors, year, title, journal, volume, issue and pages, and nothing else — there is no field for a DOI or a URL. So the IEEE entry above ends at the year, with no DOI; convert from the DOI or BibTeX for the doi: tail. A missing volume, issue or page range produces a short entry with no warning, so check the source text before converting.",
          "Do not leave the DOI link on the end of the pasted text to keep it: with `https://doi.org/10.1038/nature14539` still attached, the parser misreads the tail — the journal field swallows the volume, pages and link, and the page range comes out as the last digits of the DOI. The mangled result renders as `[1] Y. LeCun, Y. Bengio, and G. Hinton, “Deep learning,” Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539, p. 14539, 2015.` Strip the link before pasting, and use a DOI lookup if the DOI must appear.",
          "The converted list downloads as .bib, .ris or plain text, and the .ris file carries the records back into Zotero or EndNote. History keeps the most recent twenty items, or one hundred on Pro. Keep the .bib download too: a formatted string cannot be turned back into fields, while the .bib converts again for another style in seconds.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does converting renumber my references?",
        a: "Yes — the converter numbers the list in the order you paste it, so paste in the order the works are first cited in your text. An alphabetical APA list pasted as-is gets numbers in alphabetical order, which is not IEEE order.",
      },
      {
        q: "Why does my IEEE entry say 521(7553) instead of vol. 521, no. 7553?",
        a: "Because the APA-text parser folds the volume and issue into the journal field as one string, and the IEEE template prints that string as it stands. Convert the same paper from its DOI or from BibTeX, where volume and issue are separate fields, and the entry renders as vol. 521, no. 7553.",
      },
      {
        q: "Why is there no DOI in my IEEE entry?",
        a: "The APA-text parser keeps authors, year, title, journal, volume, issue and pages only — it has no field for a DOI or a URL. Convert from the DOI or from BibTeX and the entry ends with doi: 10.1038/nature14539.",
      },
      {
        q: "How many authors does IEEE list?",
        a: "Up to six in full. A longer author list collapses to the first author plus et al.: the eight-author Attention paper renders as A. Vaswani et al., while a four-author paper lists all four names.",
      },
      {
        q: "Can I paste IEEE text back in as the input?",
        a: "No. Only APA text parses as input, because only APA puts the year in parentheses directly after the author block. A [1]-numbered list does not match that shape, so paste the APA version, or the BibTeX, instead.",
      },
      {
        q: "I inserted a reference in the middle — what now?",
        a: "Renumber everything after it. IEEE numbers follow first-citation order, so one insertion shifts every later number, and the in-text markers must shift with them. Do the numbering in your last pass over the manuscript.",
      },
    ],
    relatedSlugs: ["apa-to-bibtex", "bibtex-to-ieee", "apa-to-chicago"],
    ctaPrimary: "Convert an APA list to IEEE",
    ctaSecondary: "Convert the same list from BibTeX to IEEE",
    updated: "2026-11-26",
  },
};

export default en;
