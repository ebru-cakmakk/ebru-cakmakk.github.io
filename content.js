/* ============================================================
   İÇERİK DOSYASI — siteyi güncellemek için SADECE burayı değiştir.
   Kod bilmene gerek yok: tırnak içindeki yazıları değiştir, kaydet.
   Virgülleri ve süslü parantezleri olduğu gibi bırak.
   ============================================================ */

const SITE = {
  name:     'Ebru Çakmak',          // Sitede ve menüde görünen isim
  project:  'Işık Düştüğünde',      // Devam eden serinin adı
  email:    'zekiyeebru02@proton.me',
  instagram:'',   // Örn: 'https://instagram.com/kullaniciadin'  (boş bırakırsan düğme görünmez)
  tiktok:   '',
  vimeo:    ''
};

/* ---------- FOTOĞRAFLAR ----------
   src   : images klasöründeki dosya adı
   w     : genişlik — 4 küçük · 6 orta · 8 geniş · 12 tam sayfa
   ratio : kutunun oranı — '3/2' yatay · '3/4' dikey · '1/1' kare · '21/9' sinema bandı
   tr/en : fotoğrafın adı (Türkçe / İngilizce)

   Yeni fotoğraf eklemek için: dosyayı images klasörüne yükle,
   sonra aşağıya aynı biçimde yeni bir satır ekle.
   ---------------------------------- */
const PHOTOS = [
  {src:'images/01.jpg', w:8,  ratio:'3/2',  tr:'Otların arasında', en:'Among the grasses'},
  {src:'images/02.jpg', w:4,  ratio:'3/4',  tr:'Ayakta, gölgede',  en:'Standing, in shadow'},
  {src:'images/03.jpg', w:6,  ratio:'3/2',  tr:'Yaprak ve güneş',  en:'Leaf and sun'},
  {src:'images/04.jpg', w:6,  ratio:'3/2',  tr:'Kütük, yosun',     en:'Stump, moss'},
  {src:'images/05.jpg', w:12, ratio:'21/9', tr:'Gölgeye yatmak',   en:'Lying into shadow'},
  {src:'images/06.jpg', w:8,  ratio:'3/2',  tr:'Başını kaldırmak', en:'Head tilted up'},
  {src:'images/07.jpg', w:4,  ratio:'3/4',  tr:'Tek çam',          en:'A single pine'},
  {src:'images/08.jpg', w:12, ratio:'21/9', tr:'Tepedeki ev',      en:'House on the hill'}
];

/* ---------- GÜNLÜK YAZILARI ----------
   En yeni yazı en üstte olsun.
   bodyTr / bodyEn : her tırnak bir paragraf. Yeni paragraf için virgülle ekle.
   -------------------------------------- */
const POSTS = [
  {
    date:'2026-11',
    tr:'İlk serimi kurarken öğrendiğim üç şey',
    en:'Three things I learned building my first series',
    exTr:'Dağınık bir arşivden tek bir fikre nasıl indim, hangi kareleri atmak zorunda kaldım.',
    exEn:'How I got from a messy archive down to one idea, and which frames I had to cut.',
    bodyTr:[
      'Buraya yazının tam metnini yaz. Bu paragrafı kendi notlarınla değiştir.',
      'İkinci paragraf.',
      'Üçüncü paragraf.'
    ],
    bodyEn:[
      'Write the full post here. Replace this paragraph with your own notes.',
      'Second paragraph.',
      'Third paragraph.'
    ]
  },
  {
    date:'2026-10',
    tr:'Doğal ışıkla çekerken saati beklemek',
    en:'Waiting for the hour when you shoot natural light',
    exTr:'Ekipman almak yerine sabretmeyi öğrenmek üzerine kısa bir not.',
    exEn:'A short note on learning to wait instead of buying gear.',
    bodyTr:['Buraya yazının tam metnini yaz.','İkinci paragraf.'],
    bodyEn:['Write the full post here.','Second paragraph.']
  },
  {
    date:'2026-09',
    tr:'Modelle ilk konuşma neden çekimden önemli',
    en:'Why the first conversation matters more than the shoot',
    exTr:'Güven kurulmadan iyi kare çıkmıyor. Nasıl bir ön görüşme yapıyorum.',
    exEn:'No good frame comes without trust. How I run the intro call.',
    bodyTr:['Buraya yazının tam metnini yaz.','İkinci paragraf.'],
    bodyEn:['Write the full post here.','Second paragraph.']
  }
];
