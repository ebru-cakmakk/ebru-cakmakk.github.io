// Detaylı Başvuru Formu'nun Word (.docx) sürümlerini üretir (TR + EN):
//   node scripts/form-docx.js
// İçerik: scripts/detayli-form.json (PDF ile aynı kaynak). Gereken: npm "docx" paketi.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, AlignmentType, CheckBox, Footer, PageNumber, Tab, TabStopType, HeightRule, VerticalAlign, TableLayoutType,
} = require('docx');
// jszip, docx paketinin kendi bağımlılığı; onun yanından yüklenir.
const JSZip = require(require.resolve('jszip', { paths: [path.dirname(require.resolve('docx'))] }));

const HERE = __dirname;
const OUT = path.join(HERE, '..', 'files');
const DATA = JSON.parse(fs.readFileSync(path.join(HERE, 'detayli-form.json'), 'utf8'));

const C = { dark: '18230F', green: '255F38', accent: '1F7D53', cream: 'F1EEE3', soft: 'D9D6C8',
  mint: '8FBF9F', field: 'F2F5EF', line: '9FB3A2', rule: 'CFCBB9', note: '5F6B55', hint: '7B8672', text: '1D2A14' };
const SERIF = 'Georgia';
const SANS = 'Arial';
const PAGE_W = 11906, MARGIN = 1080, W = PAGE_W - 2 * MARGIN; // A4, 0,75"
const GAP = 340;

const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: none, bottom: none, left: none, right: none };
const fieldBorders = { top: none, left: none, right: none, bottom: { style: BorderStyle.SINGLE, size: 8, color: C.line } };

const run = (text, o = {}) => new TextRun({ text, font: o.font || SANS, size: o.size || 20, color: o.color || C.text,
  bold: o.bold, italics: o.italics, characterSpacing: o.spacing });

function labelPara(f, L) {
  const kids = [run(f[L], { size: 17, bold: true, color: C.green })];
  if (f.req) kids.push(run(' *', { size: 17, bold: true, color: C.accent }));
  if (f.hint) kids.push(run('  ·  ' + f.hint[L], { size: 16, color: C.hint }));
  return new Paragraph({ children: kids, spacing: { before: 0, after: 50 }, keepNext: true, keepLines: true });
}

function box() { return new CheckBox({ checked: false, checkedState: { value: '2612', font: 'MS Gothic' },
  uncheckedState: { value: '2610', font: 'MS Gothic' } }); }

function optionsPara(f, L) {
  const kids = [];
  f.opts.forEach((o, i) => {
    if (i) kids.push(run('     ', { size: 19 }));
    kids.push(box());
    kids.push(run('\u00A0' + o[L].replace(/ /g, '\u00A0'), { size: 19 })); // seçenek satır sonunda bölünmesin
  });
  return new Paragraph({ children: kids, spacing: { before: 20, after: 0, line: 300 } });
}

// Bir satırdaki alanları yan yana koyan tablo: üstte etiketler, altta yazma alanları.
function rowTable(fields, L) {
  const n = fields.length;
  const fw = Math.floor((W - (n - 1) * GAP) / n);
  const widths = [];
  fields.forEach((_, i) => { if (i) widths.push(GAP); widths.push(fw); });
  widths[widths.length - 1] += W - widths.reduce((a, b) => a + b, 0);
  const spacer = () => new TableCell({ width: { size: GAP, type: WidthType.DXA }, borders: noBorders, children: [new Paragraph('')] });
  const labels = [], answers = [];
  let hasInput = false;
  fields.forEach((f, i) => {
    const w = widths[i * 2];
    if (i) { labels.push(spacer()); answers.push(spacer()); }
    if (f.t === 'choice') {
      labels.push(new TableCell({ width: { size: w, type: WidthType.DXA }, borders: noBorders,
        margins: { top: 0, bottom: 0, left: 0, right: 0 }, children: [labelPara(f, L), optionsPara(f, L)] }));
      answers.push(new TableCell({ width: { size: w, type: WidthType.DXA }, borders: noBorders, children: [new Paragraph('')] }));
    } else {
      hasInput = true;
      labels.push(new TableCell({ width: { size: w, type: WidthType.DXA }, borders: noBorders,
        margins: { top: 0, bottom: 0, left: 0, right: 0 }, children: [labelPara(f, L)] }));
      answers.push(new TableCell({ width: { size: w, type: WidthType.DXA }, borders: fieldBorders,
        shading: { fill: C.field, type: ShadingType.CLEAR, color: 'auto' },
        margins: { top: 60, bottom: 60, left: 110, right: 110 }, verticalAlign: VerticalAlign.TOP,
        children: [new Paragraph({ children: [run('', { size: 21 })] })] }));
    }
  });
  const isArea = fields.some(f => f.t === 'area');
  const rows = [new TableRow({ cantSplit: true, children: labels })];
  if (hasInput) {
    rows.push(new TableRow({ cantSplit: true, children: answers,
      height: { value: isArea ? 320 * (fields[0].lines || 3) : 400, rule: HeightRule.ATLEAST } }));
  }
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED,
    borders: { ...noBorders, insideHorizontal: none, insideVertical: none }, rows });
}

const gapPara = (after = 120) => new Paragraph({ children: [], spacing: { before: 0, after, line: 120 } });

function header(m) {
  const cell = new TableCell({
    width: { size: W, type: WidthType.DXA }, borders: noBorders,
    shading: { fill: C.dark, type: ShadingType.CLEAR, color: 'auto' },
    margins: { top: 420, bottom: 380, left: 520, right: 520 },
    children: [
      new Paragraph({ children: [run(m.kicker, { size: 15, color: C.mint, spacing: 40 })], spacing: { after: 160 } }),
      new Paragraph({ children: [run(m.title, { font: SERIF, size: 50, color: C.cream })], spacing: { after: 160 } }),
      new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: C.accent, space: 1 } },
        spacing: { after: 160 }, indent: { right: W - 520 * 2 - 1250 } }),
      new Paragraph({ children: [run(m.intro, { size: 18, color: C.soft })], spacing: { after: 80, line: 280 } }),
      new Paragraph({ children: [run(m.privacy, { size: 18, color: C.soft })], spacing: { after: 80, line: 280 } }),
      new Paragraph({ children: [run(m.send, { size: 18, color: C.cream })], spacing: { after: 0, line: 280 } }),
    ],
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], rows: [new TableRow({ children: [cell] })] });
}

function sectionHead(n, s, L) {
  return new Paragraph({
    children: [run(String(n).padStart(2, '0') + '   ', { size: 15, bold: true, color: C.accent }), run(s[L], { font: SERIF, size: 26, color: C.dark })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.rule, space: 4 } },
    spacing: { before: 300, after: 120 }, keepNext: true, keepLines: true,
  });
}

function photoTable(s, m, L) {
  const pw = 2160, ph = 2720;
  const dashed = { style: BorderStyle.DASHED, size: 8, color: C.line };
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [pw, GAP + 60, W - pw - GAP - 60], layout: TableLayoutType.FIXED,
    rows: [new TableRow({ cantSplit: true, height: { value: ph, rule: HeightRule.ATLEAST }, children: [
      new TableCell({ width: { size: pw, type: WidthType.DXA }, borders: { top: dashed, bottom: dashed, left: dashed, right: dashed },
        shading: { fill: C.field, type: ShadingType.CLEAR, color: 'auto' }, verticalAlign: VerticalAlign.CENTER,
        margins: { left: 120, right: 120 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [run(m.photoHintDocx, { size: 15, color: C.hint })] })] }),
      new TableCell({ width: { size: GAP + 60, type: WidthType.DXA }, borders: noBorders, children: [new Paragraph('')] }),
      new TableCell({ width: { size: W - pw - GAP - 60, type: WidthType.DXA }, borders: noBorders,
        children: [new Paragraph({ children: [run((s.photoDocx || s.photo)[L], { size: 18, color: '3C4934' })], spacing: { line: 290 } })] }),
    ] })],
  });
}

function build(L) {
  const m = DATA.meta[L];
  const body = [header(m)];
  DATA.sections.forEach((s, i) => {
    body.push(sectionHead(i + 1, s, L));
    if (s.note) body.push(new Paragraph({ children: [run(s.note[L], { size: 17, color: C.note })], spacing: { after: 120 }, keepNext: true }));
    if (s.photo) body.push(photoTable(s, m, L));
    s.rows.forEach((row, j) => {
      if (row.length === 1 && row[0].t === 'check') {
        body.push(new Paragraph({ children: [box(), run('  ' + row[0][L], { size: 19 })], spacing: { before: 40, after: 160 }, keepNext: true }));
        return;
      }
      body.push(rowTable(row, L));
      body.push(gapPara(j === s.rows.length - 1 ? 0 : 110));
    });
  });
  body.push(new Paragraph({
    children: [run(m.send + '  ', { size: 17, color: C.note }), run(m.sign, { size: 17, bold: true, color: C.dark })],
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.rule, space: 6 } }, spacing: { before: 360 },
  }));

  const footer = new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: W }], children: [
    run(m.foot, { size: 15, color: '8E8B7B' }),
    new TextRun({ children: [new Tab(), PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES], font: SANS, size: 15, color: '8E8B7B' }),
  ] })] });

  return new Document({
    title: m.title, creator: 'ebbylumi', description: m.title,
    styles: { default: { document: { run: { font: SANS, size: 20, color: C.text } } } },
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 900, bottom: 1000, left: MARGIN, right: MARGIN, footer: 500 } } },
      footers: { default: footer },
      children: body,
    }],
  });
}

(async () => {
  for (const L of ['tr', 'en']) {
    const file = path.join(OUT, DATA.meta[L].file_docx);
    // docx paketi işaret kutularını <w:sym> ile yazıyor; LibreOffice bunları işaretli gösteriyor.
    // Word'ün kendi biçimine (MS Gothic ☐ metni + benzersiz w:id) çevir.
    const zip = await JSZip.loadAsync(await Packer.toBuffer(build(L)));
    let xml = await zip.file('word/document.xml').async('string');
    let id = 7000;
    xml = xml.replace(/<w:sdtPr><w14:checkbox>/g, () => `<w:sdtPr><w:id w:val="${id++}"/><w14:checkbox>`)
      .replace(/<w:r><w:sym w:char="2610" w:font="MS Gothic"\/><\/w:r>/g,
        '<w:r><w:rPr><w:rFonts w:ascii="MS Gothic" w:eastAsia="MS Gothic" w:hAnsi="MS Gothic" w:hint="eastAsia"/></w:rPr><w:t>\u2610</w:t></w:r>');
    zip.file('word/document.xml', xml);
    // Yalnız dosyaları yeni bir arşive koy: klasör girdileri bulut düzenleyicilerde sorun çıkarabiliyor.
    const out = new JSZip();
    for (const n of Object.keys(zip.files)) {
      if (!zip.files[n].dir) out.file(n, await zip.file(n).async('uint8array'), { createFolders: false });
    }
    fs.writeFileSync(file, await out.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
    console.log('yazildi:', path.relative(path.join(HERE, '..'), file));
  }
})();
