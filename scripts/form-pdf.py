# Detaylı Başvuru Formu'nun doldurulabilir PDF'lerini üretir (TR + EN):
#   python3 scripts/form-pdf.py
# İçerik: scripts/detayli-form.json. Gerekenler: weasyprint, pikepdf, Lora ve Inter yazı tipleri.
# -*- coding: utf-8 -*-
import html
import json
import os

import pikepdf
from weasyprint import HTML

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'files')
DATA = json.load(open(os.path.join(HERE, 'detayli-form.json'), encoding='utf-8'))

CSS = """
@page { size: A4; margin: 15mm 17mm 17mm 17mm;
  @bottom-left { content: "%(foot)s"; font: 7.8pt Inter, sans-serif; color:#8E8B7B; }
  @bottom-right { content: counter(page) " / " counter(pages); font: 7.8pt Inter, sans-serif; color:#8E8B7B; } }
html { font-family: Inter, 'DejaVu Sans', sans-serif; font-size: 9pt; line-height: 1.45; color:#1d2a14; }
.head { background:#18230F; color:#F1EEE3; padding:8mm 10mm 7mm; margin:0 0 6mm; }
.head .k { font-size:7.6pt; letter-spacing:.24em; color:#8fbf9f; margin:0 0 4mm; }
.head h1 { font-family: Lora, serif; font-weight:400; font-size:26pt; line-height:1.05; margin:0 0 4mm; letter-spacing:-.01em; }
.head p { margin:0 0 1.6mm; color:#d9d6c8; font-size:8.8pt; max-width:150mm; }
.head p.s { color:#F1EEE3; }
.head .rule { width:22mm; height:.9mm; background:#1F7D53; margin:0 0 4mm; }
section { margin:0 0 5mm; }
section:last-of-type { break-inside: avoid; }
h2 { font-family: Lora, serif; font-weight:500; font-size:13pt; color:#18230F; margin:0 0 1mm;
     padding-bottom:1.6mm; border-bottom:.3mm solid #cfcbb9; break-after: avoid; }
h2 .n { font-family: Inter, sans-serif; font-size:7.5pt; color:#1F7D53; font-weight:600; margin-right:2.4mm; letter-spacing:.06em; }
.note { font-size:8.2pt; color:#5f6b55; margin:1.6mm 0 0; }
.row { display:flex; gap:6mm; margin-top:2.6mm; break-inside: avoid; }
.note { break-after: avoid; }
.f { flex:1; min-width:0; }
.l { display:block; font-size:8pt; font-weight:600; color:#255F38; margin:0 0 1.1mm; }
.l .req { color:#1F7D53; }
.h { font-weight:400; color:#7b8672; }
input.t { display:block; width:100%%; height:7mm; box-sizing:border-box; border:0; border-bottom:.35mm solid #9fb3a2;
          background:#F2F5EF; font-size:9.5pt; padding:0 2mm; }
textarea { display:block; width:100%%; box-sizing:border-box; border:0; border-bottom:.35mm solid #9fb3a2; background:#F2F5EF;
           font-size:9.5pt; padding:1.5mm 2mm; }
.opts { display:block; line-height:5.6mm; }
.o { display:inline; white-space:nowrap; font-size:8.8pt; margin-right:5.5mm; }
.o input { display:inline-block; width:3.4mm; height:3.4mm; margin:0 1.6mm 0 0; vertical-align:-.6mm; }
.photo { display:flex; gap:7mm; margin-top:3mm; align-items:flex-start; break-inside: avoid; }
.pbox { position:relative; width:38mm; height:48mm; flex:none; border:.35mm dashed #9fb3a2; background:#F2F5EF; }
.pbox .ph { position:absolute; left:3mm; right:3mm; top:19mm; text-align:center; font-size:7.6pt; color:#7b8672; line-height:1.35; }
.pbox input { position:absolute; left:0; top:0; width:38mm; height:48mm; border:0; background:transparent; }
.ptext { font-size:8.6pt; color:#3c4934; padding-top:1mm; }
.chk { break-inside: avoid; display:flex; gap:2.4mm; align-items:flex-start; margin-top:3.2mm; font-size:8.8pt; }
.chk input { width:3.6mm; height:3.6mm; margin:.3mm 0 0; flex:none; }
.end { break-before: avoid; margin-top:5mm; font-size:8.4pt; color:#5f6b55; border-top:.3mm solid #cfcbb9; padding-top:3mm; }
.end b { color:#18230F; font-weight:600; }
"""


def e(s):
    return html.escape(s, quote=True)


def field_html(f, L):
    lab = e(f[L])
    if f.get('req'):
        lab += ' <span class="req">*</span>'
    if f.get('hint'):
        lab += ' <span class="h">· %s</span>' % e(f['hint'][L])
    t = f['t']
    if t == 'text':
        return '<div class="f"><span class="l">%s</span><input class="t" type="text" name="%s"></div>' % (lab, f['id'])
    if t == 'area':
        h = 5.6 * f.get('lines', 3)
        return ('<div class="f"><span class="l">%s</span><textarea name="%s" style="height:%.1fmm"></textarea></div>'
                % (lab, f['id'], h))
    if t == 'choice':
        parts = []
        for i, o in enumerate(f['opts'], 1):
            if f.get('multi'):
                inp = '<input type="checkbox" name="%s_%d">' % (f['id'], i)
            else:
                inp = '<input type="radio" name="%s" value="%d">' % (f['id'], i)
            parts.append('<span class="o">%s%s</span>' % (inp, e(o[L])))
        return '<div class="f"><span class="l">%s</span><div class="opts">%s</div></div>' % (lab, ''.join(parts))
    if t == 'check':
        return '<div class="chk"><input type="checkbox" name="%s"><span>%s</span></div>' % (f['id'], lab)
    raise ValueError(t)


def build_html(L):
    m = DATA['meta'][L]
    out = ['<html lang="%s"><head><meta charset="utf-8"><style>%s</style></head><body>' % (L, CSS % {'foot': m['foot']})]
    out.append('<div class="head"><p class="k">%s</p><h1>%s</h1><div class="rule"></div>'
               '<p>%s</p><p>%s</p><p class="s">%s</p></div>'
               % (e(m['kicker']), e(m['title']), e(m['intro']), e(m['privacy']), e(m['send'])))
    for n, s in enumerate(DATA['sections'], 1):
        out.append('<section><h2><span class="n">%02d</span>%s</h2>' % (n, e(s[L])))
        if s.get('note'):
            out.append('<p class="note">%s</p>' % e(s['note'][L]))
        if s.get('photo'):
            out.append('<div class="photo"><div class="pbox"><div class="ph">%s</div>'
                       '<input type="text" name="foto"></div><div class="ptext">%s</div></div>'
                       % (e(m['photoHint']), e(s['photo'][L])))
        for row in s['rows']:
            if len(row) == 1 and row[0]['t'] == 'check':
                out.append(field_html(row[0], L))
            else:
                out.append('<div class="row">%s</div>' % ''.join(field_html(f, L) for f in row))
        out.append('</section>')
    out.append('<p class="end">%s <b>%s</b></p>' % (e(m['send']), e(m['sign'])))
    out.append('</body></html>')
    return '\n'.join(out)


def labels(L):
    """Alan adı → okunur etiket (ekran okuyucular ve araç ipucu için /TU)."""
    d = {'foto': DATA['meta'][L]['photoHint']}
    for s in DATA['sections']:
        for row in s['rows']:
            for f in row:
                if f['t'] == 'choice' and f.get('multi'):
                    for i, o in enumerate(f['opts'], 1):
                        d['%s_%d' % (f['id'], i)] = '%s: %s' % (f[L], o[L])
                else:
                    d[f['id']] = f[L]
    return d


def finish(path, L):
    """Yazı alanlarını Helvetica'ya çevirir (gömülü alt küme yazı tipi, yazılan Türkçe harfleri
    göstermeyebilir) ve foto alanını Acrobat'ta resim seçtiren bir düğmeye dönüştürür."""
    tips = labels(L)
    pdf = pikepdf.open(path, allow_overwriting_input=True)
    af = pdf.Root.AcroForm
    helv = pdf.make_indirect(pikepdf.Dictionary(Type=pikepdf.Name.Font, Subtype=pikepdf.Name.Type1,
                                                BaseFont=pikepdf.Name.Helvetica, Encoding=pikepdf.Name.WinAnsiEncoding))
    af.DR = pikepdf.Dictionary(Font=pikepdf.Dictionary(Helv=helv))
    af.DA = pikepdf.String('/Helv 0 Tf 0 g')
    af.NeedAppearances = True
    # weasyprint radyo düğmelerinin her parçasını (widget) ayrı bir alan gibi /T ile Fields'e de koyuyor;
    # Acrobat'ta grup bozulmasın diye parçaları saf widget'a çevir, üst listeden çıkar.
    kids = set()
    for f in af.Fields:
        if '/Kids' in f:
            for k in f.Kids:
                kids.add(k.objgen)
                for key in ('/T', '/FT', '/TU', '/Ff'):
                    if key in k:
                        del k[key]
    af.Fields = pikepdf.Array([f for f in af.Fields if f.objgen not in kids])
    for f in af.Fields:
        name = str(f.get('/T', ''))
        if name in tips:
            f.TU = pikepdf.String(tips[name])
        if f.get('/FT') == pikepdf.Name.Tx:
            multiline = int(f.get('/Ff', 0)) & 4096
            f.DA = pikepdf.String('/Helv %s Tf 0.11 0.16 0.08 rg' % ('9.5' if multiline else '10'))
            if '/AP' in f:
                del f['/AP']
        if name == 'foto':
            f.FT = pikepdf.Name.Btn
            f.Ff = 65536  # düğme
            for k in ('/DA', '/V', '/DV', '/MaxLen'):
                if k in f:
                    del f[k]
            f.MK = pikepdf.Dictionary(TP=1, IF=pikepdf.Dictionary(SW=pikepdf.Name.A, S=pikepdf.Name.P,
                                                                  A=[0.5, 0.5], FB=True))
            empty = pdf.make_stream(b'')
            empty.Type = pikepdf.Name.XObject
            empty.Subtype = pikepdf.Name.Form
            empty.BBox = [0, 0, float(f.Rect[2]) - float(f.Rect[0]), float(f.Rect[3]) - float(f.Rect[1])]
            f.AP = pikepdf.Dictionary(N=empty)
            f.A = pikepdf.Dictionary(S=pikepdf.Name.JavaScript, JS=pikepdf.String('event.target.buttonImportIcon();'))
    pdf.Root.Lang = pikepdf.String(L)
    pdf.docinfo['/Title'] = DATA['meta'][L]['title']
    pdf.docinfo['/Author'] = 'ebbylumi'
    pdf.save(path)


if __name__ == '__main__':
    for L in ('tr', 'en'):
        path = os.path.join(OUT, DATA['meta'][L]['file_pdf'])
        HTML(string=build_html(L), base_url=HERE).write_pdf(path, pdf_forms=True)
        finish(path, L)
        print('yazildi:', os.path.relpath(path, os.path.join(HERE, '..')))
