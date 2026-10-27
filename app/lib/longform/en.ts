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
          "Crossref is one registration agency among several, and a DOI to citation lookup can only read its own deposits. An arXiv DOI of the form 10.48550/arXiv.2301.00001 is registered with DataCite, so a Crossref request returns a not-found error however valid the identifier is. Paste the arXiv ID, such as 2301.00001, or the abs URL instead: the pattern is recognised separately, the version suffix is stripped, and the record is read from the arXiv API.",
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
        a: "Because 10.48550 identifiers are registered with DataCite, not Crossref. Paste the arXiv ID such as 2301.00001 or the abs URL instead, and the record is read from the arXiv API.",
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
};

export default en;
