const fs = require('fs');
const dir = process.argv[2];            // site klasörü

const text = JSON.parse(fs.readFileSync(dir + '/data/text.json', 'utf8'));

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

  'photos.label':'Üst etiket','photos.title':'Sayfa başlığı','photos.lede':'Giriş yazısı','photos.viewCollage':'Kolaj düğmesi','photos.viewGrid':'Izgara düğmesi',

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
  'models.guideLabel':'Rehber kartı — üst etiket','models.guideH':'Rehber kartı — başlık','models.guideP':'Rehber kartı — metin','models.guideBtn':'Rehber kartı — düğme',

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
    let lab = L[g + '.' + k];
    if(!lab && g === 'form'){                      // form sorularını kendi metinlerinden etiketle
      const m = k.match(/^(.*?)(\d+)$/), base = m && text.form[m[1]];
      const cut = x => (x.length > 48 ? x.slice(0, 46) + '…' : x);
      lab = m && base ? cut(base.tr) + ' — seçenek ' + m[2] : cut(v.tr || k);
      if(/^sec[A-Z]H$/.test(k)) lab = 'Bölüm açıklaması: ' + lab;
      else if(/^sec[A-Z]$/.test(k)) lab = 'Bölüm başlığı: ' + lab;
    }
    T += `          - name: ${k}\n            label: ${q(lab || k)}\n            type: object\n            fields:\n`;
    T += `              - { name: tr, label: "Türkçe", type: ${ty} }\n`;
    T += `              - { name: en, label: "İngilizce", type: ${ty} }\n`;
  });
});

const yml = `# Pages CMS ayarları — https://pagescms.org
# Panelde görünen form alanlarını bu dosya belirler.

media:
  input: images
  output: images

content:
  - name: series
    label: "Fotoğraf serileri"
    type: file
    path: data/series.json
    format: json
    list: true
    fields:
      - { name: tr, label: "Serinin adı — Türkçe", type: string, required: true }
      - { name: en, label: "Serinin adı — İngilizce", type: string }
      - name: photos
        label: "Bu serinin fotoğrafları"
        type: object
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
          - name: feat
            label: "Ana sayfadaki seçkide de göster"
            type: boolean
          - name: size
            label: "Ana sayfadaki boyutu (sadece seçkideyse)"
            type: select
            options:
              values:
                - { name: "kucuk", label: "Küçük, dikey" }
                - { name: "orta", label: "Orta, yatay" }
                - { name: "buyuk", label: "Büyük, yatay" }
                - { name: "tam", label: "Tam genişlik, sinema bandı" }

  - name: pages
    label: "Menü ve sayfalar"
    type: file
    path: data/pages.json
    format: json
    list: true
    fields:
      - { name: id, label: "Kısa ad — adres çubuğunda görünür (küçük harf, Türkçe karakter ve boşluk yok). Var olanları değiştirme.", type: string, required: true }
      - { name: tr, label: "Menüdeki adı — Türkçe", type: string, required: true }
      - { name: en, label: "Menüdeki adı — İngilizce", type: string }
      - { name: show, label: "Menüde görünsün", type: boolean, default: true }
      - { name: titleTr, label: "YENİ SAYFA İÇİN · Başlık — Türkçe", type: string }
      - { name: titleEn, label: "YENİ SAYFA İÇİN · Başlık — İngilizce", type: string }
      - { name: introTr, label: "YENİ SAYFA İÇİN · Giriş cümlesi — Türkçe", type: text }
      - { name: introEn, label: "YENİ SAYFA İÇİN · Giriş cümlesi — İngilizce", type: text }
      - { name: bodyTr, label: "YENİ SAYFA İÇİN · Metin — Türkçe · paragrafları boş satırla ayır · fotoğraf için satıra tek başına images/09.jpg yaz", type: text }
      - { name: bodyEn, label: "YENİ SAYFA İÇİN · Metin — İngilizce", type: text }

  - name: posts
    label: "Günlük yazıları"
    type: file
    path: data/posts.json
    format: json
    list: true
    fields:
      - { name: date, label: "Tarih (2026-11 gibi)", type: string, required: true }
      - name: cover
        label: "Kapak görseli (isteğe bağlı)"
        type: image
        options:
          path: images
          extensions: [jpg, jpeg, png, webp]
          categories: [image]
      - { name: tr, label: "Başlık — Türkçe", type: string, required: true }
      - { name: en, label: "Başlık — İngilizce", type: string }
      - { name: exTr, label: "Özet — Türkçe", type: text }
      - { name: exEn, label: "Özet — İngilizce", type: text }
      - { name: bodyTr, label: "Yazı — Türkçe · paragrafları boş satırla ayır · araya fotoğraf koymak için satıra tek başına images/09.jpg yaz", type: text }
      - { name: bodyEn, label: "Yazı — İngilizce · aynı kurallar", type: text }

  - name: videos
    label: "Videolar"
    type: file
    path: data/videos.json
    format: json
    list: true
    fields:
      - { name: url, label: "YouTube veya Vimeo adresi (tarayıcıdaki adresi yapıştır)", type: string, required: true }
      - { name: tr, label: "Başlık — Türkçe (isteğe bağlı)", type: string }
      - { name: en, label: "Başlık — İngilizce (isteğe bağlı)", type: string }
      - { name: preview, label: "Önizleme döngüsü — kısa sessiz mp4 (ör. video/reels/x.mp4; boşsa doğrudan oynatıcı)", type: string }
      - { name: poster, label: "Önizleme kapak karesi — jpg (isteğe bağlı)", type: string }

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
      - name: aboutPhoto
        label: "Hakkımda fotoğrafı"
        type: image
        options:
          path: images
          extensions: [jpg, jpeg, png, webp]
          categories: [image]
      - name: guideTr
        label: "Modelliğe Hazırlık PDF'i — Türkçe (boşsa kart görünmez)"
        type: file
        options:
          path: files
          extensions: [pdf]
      - name: guideEn
        label: "Modelliğe Hazırlık PDF'i — İngilizce"
        type: file
        options:
          path: files
          extensions: [pdf]
      - { name: heroVideo, label: "Giriş videosu (boşsa sadece fotoğraf)", type: string }
      - { name: heroVideoSmall, label: "Giriş videosu — telefon için küçük hâli", type: string }
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
