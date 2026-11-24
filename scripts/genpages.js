const fs = require('fs');
const dir = process.argv[2];            // site klasörü

const text = JSON.parse(fs.readFileSync(dir + '/data/text.json', 'utf8'));
const cats = JSON.parse(fs.readFileSync(dir + '/data/categories.json', 'utf8'));

const GROUP = {
  nav:'Menü', hero:'Açılış ekranı', home:'Ana sayfa', photos:'Fotoğraflar sayfası',
  film:'Video sayfası', models:'Modeller İçin sayfası', form:'Başvuru formu',
  journal:'Günlük sayfası', about:'Hakkımda sayfası', contact:'İletişim sayfası',
  footer:'Alt bilgi', ui:'Düğme yazıları'
};

const L = {
  'nav.photos':'Fotoğraflar','nav.film':'Video','nav.journal':'Günlük',
  'nav.models':'Modeller İçin','nav.about':'Hakkımda','nav.contact':'İletişim',

  'hero.eyebrow':'Üst satır','hero.tagline':'Tanıtım cümlesi',
  'hero.ongoing':'“Devam eden proje” etiketi','hero.location':'Konum','hero.scroll':'Kaydırma yazısı',

  'home.selLabel':'Seçki üst etiketi','home.selTitle':'Seçki başlığı',
  'home.seeAll':'“Tüm fotoğrafları gör” bağlantısı','home.aboutLabel':'Tanıtım üst etiketi',
  'home.aboutP':'Kısa tanıtım metni','home.aboutLink':'Hakkımda bağlantısı',
  'home.journalLabel':'Günlük üst etiketi','home.journalLink':'“Tüm yazılar” bağlantısı',

  'photos.label':'Üst etiket','photos.title':'Sayfa başlığı','photos.lede':'Giriş yazısı',

  'film.label':'Üst etiket','film.title':'Sayfa başlığı',
  'film.h':'Video yokken başlık','film.p':'Video yokken açıklama',

  'models.label':'Üst etiket','models.title':'Sayfa başlığı','models.lede':'Giriş yazısı',
  'models.c1h':'Kart 1 — başlık','models.c1p':'Kart 1 — metin',
  'models.c2h':'Kart 2 — başlık','models.c2p':'Kart 2 — metin',
  'models.c3h':'Kart 3 — başlık','models.c3p':'Kart 3 — metin',
  'models.l1':'Güven listesi 1','models.l2':'Güven listesi 2','models.l3':'Güven listesi 3',
  'models.l4':'Güven listesi 4','models.l5':'Güven listesi 5','models.l6':'Güven listesi 6',
  'models.l7':'Güven listesi 7','models.l8':'Güven listesi 8',
  'models.noteH':'Dürüstlük notu — başlık','models.noteP':'Dürüstlük notu — metin',

  'form.label':'Bölüm etiketi','form.name':'“Adın” etiketi','form.contact':'İletişim etiketi',
  'form.city':'Şehir etiketi','form.exp':'Deneyim etiketi',
  'form.exp1':'Deneyim seçeneği 1','form.exp2':'Deneyim seçeneği 2','form.exp3':'Deneyim seçeneği 3',
  'form.idea':'Fikir alanı etiketi','form.submit':'Gönder düğmesi',
  'form.outH':'Sonuç başlığı','form.outP':'Sonuç açıklaması',

  'journal.label':'Üst etiket','journal.title':'Sayfa başlığı','journal.lede':'Giriş yazısı',

  'about.label':'Üst etiket','about.title':'Sayfa başlığı',
  'about.p1':'Birinci paragraf','about.p2':'İkinci paragraf',
  'about.k1':'Bilgi 1 — etiket','about.v1':'Bilgi 1 — değer',
  'about.k2':'Bilgi 2 — etiket','about.v2':'Bilgi 2 — değer',
  'about.k3':'Bilgi 3 — etiket','about.v3':'Bilgi 3 — değer',

  'contact.label':'Üst etiket','contact.title':'Sayfa başlığı','contact.lede':'Giriş yazısı',
  'footer.rights':'Alt bilgi yazısı',
  'ui.close':'Kapat','ui.copy':'Kopyala','ui.copied':'Kopyalandı'
};

const q = s => '"' + String(s).replace(/"/g, '\\"') + '"';

/* ---- text.json alanlari ---- */
let T = '';
Object.keys(text).forEach(g => {
  T += `      - name: ${g}\n        label: ${q(GROUP[g] || g)}\n        type: object\n        fields:\n`;
  Object.keys(text[g]).forEach(k => {
    const v = text[g][k];
    const long = (v.tr || '').length > 90 || (v.en || '').length > 90;
    const ty = long ? 'text' : 'string';
    T += `          - name: ${k}\n            label: ${q(L[g + '.' + k] || k)}\n            type: object\n            fields:\n`;
    T += `              - { name: tr, label: "Türkçe", type: ${ty} }\n`;
    T += `              - { name: en, label: "İngilizce", type: ${ty} }\n`;
  });
});

/* ---- kategori secenekleri ---- */
const catOpts = cats.map(c =>
  `              - { name: ${c.id}, label: ${q(c.tr)} }`).join('\n');

const yml = `# Pages CMS ayarları — https://pagescms.org
# Panelde görünen form alanlarını bu dosya belirler.
# Yeni bir KATEGORİ eklediğinde aşağıdaki "Kategori" seçeneklerine de eklemen gerekir.

media:
  input: images
  output: images

content:
  - name: photos
    label: "Fotoğraflar"
    type: file
    path: data/photos.json
    format: json
    list: true
    fields:
      - name: src
        label: "Fotoğraf"
        type: image
        required: true
        options:
          path: images
          extensions: [jpg, jpeg, png, webp]
          categories: [image]
      - name: cat
        label: "Kategori"
        type: select
        required: true
        options:
          values:
${catOpts}
          placeholder: "Kategori seç"
      - name: feat
        label: "Ana sayfadaki seçkide göster"
        type: boolean
      - name: w
        label: "Ana sayfadaki genişlik"
        type: select
        options:
          values:
            - { name: "4",  label: "Küçük (4)" }
            - { name: "6",  label: "Orta (6)" }
            - { name: "8",  label: "Geniş (8)" }
            - { name: "12", label: "Tam sayfa (12)" }
      - name: ratio
        label: "Ana sayfadaki kutu oranı"
        type: select
        options:
          values:
            - { name: "3/2",  label: "Yatay (3/2)" }
            - { name: "3/4",  label: "Dikey (3/4)" }
            - { name: "1/1",  label: "Kare (1/1)" }
            - { name: "21/9", label: "Sinema bandı (21/9)" }

  - name: categories
    label: "Kategoriler"
    type: file
    path: data/categories.json
    format: json
    list: true
    fields:
      - { name: id, label: "Kısa ad (Türkçe karakter kullanma)", type: string, required: true }
      - { name: tr, label: "Adı — Türkçe", type: string, required: true }
      - { name: en, label: "Adı — İngilizce", type: string, required: true }
      - { name: hue, label: "Renk tonu (boş bırak: fotoğraflardan hesaplanır)", type: number }

  - name: posts
    label: "Günlük yazıları"
    type: file
    path: data/posts.json
    format: json
    list: true
    fields:
      - { name: date, label: "Tarih (2026-11 gibi)", type: string, required: true }
      - { name: tr, label: "Başlık — Türkçe", type: string, required: true }
      - { name: en, label: "Başlık — İngilizce", type: string }
      - { name: exTr, label: "Özet — Türkçe", type: text }
      - { name: exEn, label: "Özet — İngilizce", type: text }
      - { name: bodyTr, label: "Yazı — Türkçe (paragrafları boş satırla ayır)", type: text }
      - { name: bodyEn, label: "Yazı — İngilizce (paragrafları boş satırla ayır)", type: text }

  - name: videos
    label: "Videolar"
    type: file
    path: data/videos.json
    format: json
    list: true
    fields:
      - { name: url, label: "Vimeo veya YouTube adresi", type: string, required: true }
      - name: poster
        label: "Kapak görseli"
        type: image
        options:
          path: images
          extensions: [jpg, jpeg, png, webp]
          categories: [image]
      - { name: meta, label: "Süre ya da kısa not", type: string }
      - { name: tr, label: "Başlık — Türkçe", type: string }
      - { name: en, label: "Başlık — İngilizce", type: string }

  - name: site
    label: "Site ayarları"
    type: file
    path: data/site.json
    format: json
    fields:
      - { name: name, label: "Adın (menüde ve açılışta görünür)", type: string, required: true }
      - { name: project, label: "Devam eden serinin adı", type: string }
      - { name: email, label: "E-posta", type: string, required: true }
      - { name: instagram, label: "Instagram adresi (boşsa düğme görünmez)", type: string }
      - { name: tiktok, label: "TikTok adresi (boşsa düğme görünmez)", type: string }
      - { name: vimeo, label: "Vimeo adresi (boşsa düğme görünmez)", type: string }
      - name: theme
        label: "Renk uyumu"
        type: object
        fields:
          - { name: auto, label: "Fotoğraflara göre renk uyumu açık", type: boolean }
          - { name: base, label: "Ana ton (0 kırmızı · 30 turuncu · 60 sarı · 140 yeşil · 240 mavi)", type: number }
          - { name: strength, label: "Şiddet (0 hiç · 0.6 önerilen · 1 tamamen)", type: number }

  - name: text
    label: "Site yazıları"
    type: file
    path: data/text.json
    format: json
    fields:
${T}`;

fs.writeFileSync(dir + '/.pages.yml', yml);
console.log('.pages.yml yazildi —', yml.split('\n').length, 'satir');
