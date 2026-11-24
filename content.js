/* =============================================================
   İÇERİK DOSYASI
   Sitedeki her yazı, her fotoğraf ve her kategori burada.
   index.html dosyasına hiç dokunmana gerek yok.

   KURALLAR (üçü de basit):
   1. Sadece tırnak içindeki yazıları değiştir.
   2. Virgülleri, süslü parantezleri ve köşeli parantezleri silme.
   3. Bir yazının içinde tırnak kullanman gerekirse eğik tırnak kullan: ’
   ============================================================= */


/* ---------------------------------------------------------------
   1) TEMEL BİLGİLER
   --------------------------------------------------------------- */
const SITE = {
  name:     'Ebru Çakmak',          // Menüde ve açılışta görünen ad
  project:  'Işık Düştüğünde',      // Devam eden serinin adı
  email:    'zekiyeebru02@proton.me',
  instagram:'',   // Örn: 'https://instagram.com/kullaniciadin' — boş bırakırsan düğme görünmez
  tiktok:   '',
  vimeo:    ''
};


/* ---------------------------------------------------------------
   2) GALERİ KATEGORİLERİ
   id : fotoğraf listesinde kullanacağın kısa ad (Türkçe karakter kullanma)
   Yeni kategori eklemek için aşağıya aynı biçimde bir satır ekle,
   sonra fotoğrafların cat değerine o id'yi yaz.
   --------------------------------------------------------------- */
const CATS = [
  {id:'portre', tr:'Portre',  en:'Portrait'},
  {id:'doga',   tr:'Doğa',    en:'Nature'},
  {id:'peyzaj', tr:'Peyzaj',  en:'Landscape'}
];


/* ---------------------------------------------------------------
   3) FOTOĞRAFLAR
   src   : images klasöründeki dosya adı
   cat   : yukarıdaki kategorilerden birinin id'si
   w     : genişlik — 4 küçük · 6 orta · 8 geniş · 12 tam sayfa
   ratio : oran — '3/2' yatay · '3/4' dikey · '1/1' kare · '21/9' sinema bandı
   tr/en : fotoğrafın adı

   DÜZEN İPUCU: w:8 ile w:4 yan yana tam oturur. w:6 + w:6 de öyle.
   w:12 tek başına tam genişlik kaplar.

   YENİ FOTOĞRAF: dosyayı images klasörüne yükle, aşağıya bir satır ekle.
   --------------------------------------------------------------- */
const PHOTOS = [
  {src:'images/01.jpg', cat:'portre', w:8,  ratio:'3/2',  tr:'Otların arasında', en:'Among the grasses'},
  {src:'images/02.jpg', cat:'portre', w:4,  ratio:'3/4',  tr:'Ayakta, gölgede',  en:'Standing, in shadow'},
  {src:'images/03.jpg', cat:'doga',   w:6,  ratio:'3/2',  tr:'Yaprak ve güneş',  en:'Leaf and sun'},
  {src:'images/04.jpg', cat:'doga',   w:6,  ratio:'3/2',  tr:'Kütük, yosun',     en:'Stump, moss'},
  {src:'images/05.jpg', cat:'portre', w:12, ratio:'21/9', tr:'Gölgeye yatmak',   en:'Lying into shadow'},
  {src:'images/06.jpg', cat:'portre', w:8,  ratio:'3/2',  tr:'Başını kaldırmak', en:'Head tilted up'},
  {src:'images/07.jpg', cat:'peyzaj', w:4,  ratio:'3/4',  tr:'Tek çam',          en:'A single pine'},
  {src:'images/08.jpg', cat:'peyzaj', w:12, ratio:'21/9', tr:'Tepedeki ev',      en:'House on the hill'}
];


/* ---------------------------------------------------------------
   4) GÜNLÜK YAZILARI — en yeni en üstte
   bodyTr / bodyEn : her tırnak bir paragraf
   --------------------------------------------------------------- */
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


/* ---------------------------------------------------------------
   5) SİTEDEKİ TÜM YAZILAR
   Soldaki ad (örn. 'hero.tagline') sitedeki yeri gösterir, onu değiştirme.
   Sadece tr ve en karşılıklarını düzenle.
   --------------------------------------------------------------- */
const TEXT = {

  /* --- menü --- */
  'nav.work':    {tr:'İşler',          en:'Work'},
  'nav.film':    {tr:'Video',          en:'Film'},
  'nav.models':  {tr:'Modeller İçin',  en:'For Models'},
  'nav.journal': {tr:'Günlük',         en:'Journal'},
  'nav.about':   {tr:'Hakkımda',       en:'About'},
  'nav.contact': {tr:'İletişim',       en:'Contact'},

  /* --- açılış ekranı --- */
  'hero.eyebrow':  {tr:'Fotoğraf &amp; Videografi', en:'Photography &amp; Videography'},
  'hero.tagline':  {tr:'Işık, doku ve insan üzerine çalışan bir göz.',
                    en:'An eye working on light, texture and the human form.'},
  'hero.ongoing':  {tr:'Devam eden proje', en:'Ongoing project'},
  'hero.location': {tr:'Türkiye',          en:'Türkiye'},
  'hero.scroll':   {tr:'Kaydır',           en:'Scroll'},

  /* --- 01 İşler --- */
  'work.label': {tr:'Seçilmiş İşler', en:'Selected Work'},
  'work.lede':  {tr:'Bir bahar sabahı, aynı alçak güneşin altında çekildi. Hepsi tek bir şeyin peşinde: ışık bir yaprağa, bir taşa ya da bir yüze düştüğünde neyi görünür kılıyor, neyi karanlıkta bırakıyor? Seri üzerinde çalışmaya devam ediyorum.',
                 en:'Shot across a single spring morning under the same low sun. Every frame chases one thing: when light falls on a leaf, a stone or a face, what does it make visible, and what does it leave in the dark? The series is ongoing.'},
  'work.all':   {tr:'Hepsi', en:'All'},

  /* --- 02 Video --- */
  'film.label': {tr:'Hareketli Görüntü', en:'Moving Image'},
  'film.title': {tr:'Video',             en:'Film'},
  'film.h':     {tr:'Showreel hazırlanıyor', en:'Showreel in progress'},
  'film.p':     {tr:'Fotoğraf serisiyle aynı sabahta çekilen görüntüleri kurguluyorum. Hazır olduğunda ilk olarak burada yayınlanacak — bu arada bir proje için konuşmak isterseniz yazmanız yeterli.',
                 en:'I’m cutting footage shot on the same morning as the photo series. It will appear here first once it’s ready — in the meantime, write to me if you’d like to talk about a project.'},

  /* --- 03 Modeller İçin --- */
  'models.label': {tr:'Modeller İçin',      en:'For Models'},
  'models.title': {tr:'Birlikte çalışalım', en:'Let’s work together'},
  'models.lede':  {tr:'Deneyimli olman gerekmiyor. İlk kez kamera karşısına geçecek olanlarla çalışmayı seviyorum — çoğu zaman en dürüst kareler oradan çıkıyor. Aşağıda nasıl çalıştığımı olduğu gibi anlattım.',
                   en:'You don’t need experience. I like working with people facing a camera for the first time — the most honest frames often come from there. Below is exactly how I work.'},

  'models.c1h': {tr:'Ne çekiyoruz', en:'What we shoot'},
  'models.c1p': {tr:'Portre, doğal ışıkta dış mekân ve konsept çekimler. Her çekim öncesi referans görsellerle birlikte net bir fikir paylaşıyorum — sürpriz olmuyor.',
                 en:'Portraits, natural-light outdoor work and concept shoots. Before every shoot I share a clear idea with reference images — no surprises.'},
  'models.c2h': {tr:'Nasıl ilerliyor', en:'How it works'},
  'models.c2p': {tr:'Kısa bir tanışma görüşmesi, sonra tarih ve mekân. Çekim 1–2 saat sürüyor. 7–10 gün içinde seçilmiş ve renklenmiş kareleri yüksek çözünürlükte gönderiyorum.',
                 en:'A short intro call, then date and location. Shoots run 1–2 hours. Within 7–10 days you get the selected, colour-graded frames in high resolution.'},
  'models.c3h': {tr:'Karşılığı', en:'The exchange'},
  'models.c3p': {tr:'Şu aşamada çoğu çekim karşılıklı portfolyo çalışması (TFP): sen kareleri kendi portfolyonda kullanıyorsun, ben de kendi arşivimde. Ticari işler için ayrı konuşuyoruz.',
                 en:'At this stage most shoots are portfolio exchanges (TFP): you use the images for your own book, I use them in mine. Commercial work is discussed separately.'},

  'models.l1': {tr:'Yanında istediğin bir kişiyi getirebilirsin.', en:'You’re welcome to bring someone with you.'},
  'models.l2': {tr:'Ne çekilip ne çekilmeyeceğine önceden birlikte karar veriyoruz.', en:'We agree in advance on what will and won’t be shot.'},
  'models.l3': {tr:'Her çekimde yazılı bir izin formu (model release) imzalıyoruz.', en:'We sign a written model release for every shoot.'},
  'models.l4': {tr:'Hangi karelerin yayınlanacağını onaylama hakkın var.', en:'You have the right to approve which frames get published.'},
  'models.l5': {tr:'İstediğin an bir kareyi geri çekebilirsin.', en:'You can withdraw any image at any time.'},
  'models.l6': {tr:'Çekim planı, saat ve mekân yazılı olarak paylaşılır.', en:'The shoot plan, time and location are shared in writing.'},
  'models.l7': {tr:'18 yaş altı için veli onayı ve katılımı zorunlu.', en:'Under 18 requires guardian consent and presence.'},
  'models.l8': {tr:'Ham dosyalar kimseyle paylaşılmaz.', en:'Raw files are never shared with anyone.'},

  'models.noteH': {tr:'Dürüst olmak gerekirse', en:'To be straight with you'},
  'models.noteP': {tr:'Hâlâ öğrenciyim ve bu seriyi kurarken öğrenmeye devam ediyorum. Yani beraber çalışırsak, deneyen ve soran biriyle çalışıyor olacaksın. Karşılığında sana zamanımı, sabrımı ve işin her adımında şeffaflığı veriyorum.',
                   en:'I’m still a student, and I’m still learning while building this series. So if we work together, you’re working with someone who experiments and asks questions. In return you get my time, my patience and transparency at every step.'},

  /* --- başvuru formu --- */
  'form.label':   {tr:'Başvuru',    en:'Apply'},
  'form.name':    {tr:'Adın',       en:'Your name'},
  'form.contact': {tr:'İletişim (e-posta veya Instagram)', en:'Contact (email or Instagram)'},
  'form.city':    {tr:'Şehir',      en:'City'},
  'form.exp':     {tr:'Deneyim',    en:'Experience'},
  'form.exp1':    {tr:'İlk kez olacak',      en:'This would be my first time'},
  'form.exp2':    {tr:'Birkaç çekim yaptım', en:'I’ve done a few shoots'},
  'form.exp3':    {tr:'Deneyimliyim',        en:'I’m experienced'},
  'form.idea':    {tr:'Aklındaki bir fikir var mı?', en:'Any idea in mind?'},
  'form.submit':  {tr:'Mesajı Hazırla',      en:'Prepare Message'},
  'form.outH':    {tr:'Mesajın hazır',       en:'Your message is ready'},
  'form.outP':    {tr:'Bu form doğrudan gönderim yapmıyor. Aşağıdaki metni kopyalayıp e-posta ile bana ilet — en kısa sürede dönüş yapıyorum.',
                   en:'This form does not send anything by itself. Copy the text below and send it to me by email — I reply as soon as I can.'},

  /* --- 04 Günlük --- */
  'journal.label': {tr:'Günlük',        en:'Journal'},
  'journal.title': {tr:'Süreç notları', en:'Process notes'},
  'journal.lede':  {tr:'Öğrendiklerimi, hatalarımı ve çekim arkası notlarımı burada tutuyorum. Bitmiş işten çok, nasıl oraya gidildiğiyle ilgili.',
                    en:'I keep what I learn, what I get wrong and my behind-the-scenes notes here. Less about finished work, more about how one gets there.'},

  /* --- 05 Hakkımda --- */
  'about.label': {tr:'Hakkımda', en:'About'},
  'about.title': {tr:'Kısaca',   en:'In short'},
  'about.p1':    {tr:'Fotoğraf ve videografi üzerine çalışan bir öğrenciyim. Doğal ışıkla, kalabalıktan uzak mekânlarda ve mümkün olduğunca az ekipmanla çekmeyi seviyorum.',
                  en:'I’m a student working in photography and videography. I like shooting with natural light, in quiet places, with as little gear as possible.'},
  'about.p2':    {tr:'Şu sıralar ilk ciddi serimi kuruyorum ve bu site onun kayıt defteri. Model olarak çalışmak, bir projede birlikte olmak ya da sadece konuşmak isterseniz yazın — her mesaja dönüş yapıyorum.',
                  en:'I’m currently building my first serious series, and this site is its logbook. If you’d like to model, collaborate on a project, or simply talk, write to me — I answer every message.'},
  'about.k1':    {tr:'Alan',   en:'Focus'},
  'about.v1':    {tr:'Portre, doğa, kısa film', en:'Portrait, nature, short film'},
  'about.k2':    {tr:'Durum',  en:'Status'},
  'about.v2':    {tr:'Öğrenci — yeni projelere açık', en:'Student — open to new projects'},
  'about.k3':    {tr:'Konum',  en:'Based in'},
  'about.v3':    {tr:'Türkiye', en:'Türkiye'},

  /* --- 06 İletişim --- */
  'contact.label': {tr:'İletişim',  en:'Contact'},
  'contact.title': {tr:'Konuşalım', en:'Let’s talk'},
  'footer.rights': {tr:'Tüm görseller sahibine aittir.', en:'All images belong to their author.'},

  /* --- küçük düğme yazıları --- */
  'ui.close':  {tr:'Kapat',         en:'Close'},
  'ui.copy':   {tr:'Metni Kopyala', en:'Copy Text'},
  'ui.copied': {tr:'Kopyalandı',    en:'Copied'}
};
