# Proje bağlamı — Ebru Çakmak portfolyo sitesi

Bu dosya, projeyi devralan herkesin (Claude dahil) hızla bağlama girmesi için.
Yeni bir sohbete başlarken bu depoyu göster, gerisini buradan okur.

---

## Kim, ne yapıyor

Ebru Çakmak — fotoğraf ve videografi üzerine çalışan bir öğrenci.
Site iki işe hizmet ediyor:

1. **Küratörlere ve kurumlara** işini göstermek
2. **Model olmak isteyenlere** nasıl çalıştığını anlatmak ve başvuru almak

Henüz sergi, yayın ya da ödül yok. Site bunu saklamıyor; "öğrenciyim, ilk ciddi
serimi kuruyorum" diyen dürüst bir ton tercih edildi. Bu bilinçli bir karar —
sahte bir geçmiş kurmaktansa, gelişimi göstermek.

**İsim:** **Z. Ebru Çakmak** (karar verildi; mahlas elendi, ayrıntı en altta Açık konular'da).
Sosyal medya kullanıcı adı ayrı bir karar.

*Son güncelleme: 25 Kasım 2026.*

---

## Nerede yaşıyor

| Ne | Nerede |
|---|---|
| Depo | `github.com/ebru-cakmakk/ebru-cakmakk.github.io` |
| Yayındaki site | `https://ebru-cakmakk.github.io` |
| Barındırma | GitHub Pages — ücretsiz, kendiliğinden yayınlanıyor |
| E-posta | `giauzar.arrakis@gmail.com` |
| Fotoğraf küçültücü | `https://ebru-cakmakk.github.io/kucult.html` |

| Düzenleme paneli | `app.pagescms.org` — GitHub ile giriş, ücretsiz |

Alan adı satın alınmadı. Sosyal medya hesapları henüz açılmadı (eskisi kişiseldi,
kapatıldı). `data/site.json` içindeki `instagram`, `tiktok`, `vimeo` alanları boş;
doldurulduğunda düğmeler kendiliğinden görünür.

**Önemli:** `main` dalına push edilen her şey birkaç dakika içinde yayına girer.

---

## Dosyalar

```
index.html        Tasarım + çalışma mantığı. Ebru buna dokunmuyor.
data/             TÜM içerik, JSON olarak. index.html bunları fetch ile okur.
  site.json         Ad, e-posta, sosyal medya, aboutPhoto, heroVideo, theme{auto,base,strength}
  series.json       [{tr, en, hue?, photos:[{src, feat, size}]}] — fotoğraflar serinin altında.
                    size: kucuk|orta|buyuk|tam (sadece ana sayfa seçkisi). Kodda CATS/PHOTOS
                    buradan türetilir (id = s0, s1…). photos.json/categories.json kaldırıldı.
  videos.json       [{url, tr, en}] — YouTube/Vimeo adresi, sayfaya gömülü; boşsa "Showreel hazırlanıyor"
  posts.json        [{date, cover, tr, en, exTr, exEn, bodyTr, bodyEn}] — tarih ISO
                    ("2025-01-17" ya da "2025-11"); sayfada "17 Ocak 2025" / "January 17, 2025"
                    olarak yazılır (fmtDate) ve yazılar yeniden eskiye sıralanır (sortPosts).
                    Gövde düz
                    metin, boş satır = yeni paragraf. Tek başına duran
                    "images/09.jpg" satırı oraya fotoğraf koyar, "| alt yazı"
                    ekiyle alt yazılı. cover boşsa liste ve okuyucu küçülmez,
                    küçük resim sütunu hiç çizilmez.
  pages.json        Menü: [{id, tr, en, show, titleTr/En, introTr/En, bodyTr/En}] — sıra =
                    menü sırası; yerleşik olmayan id → #page-ozel şablonunda yeni sayfa
  text.json         Sitedeki her yazı (menü adları artık burada değil): {grup: {anahtar: {tr, en}}}
video/            Giriş videosu: hero.mp4 (1080p) + hero-720.mp4 (telefon), sessiz, ~1-2 MB
images/           Fotoğraflar (uzun kenar ~2200px, JPEG, ~400-700 KB)
.pages.yml        Pages CMS panel ayarları (üretilmiş — scripts/genpages.js)
kucult.html       Ebru'nun kendi fotoğraf küçültücüsü (tarayıcıda çalışır, canvas ile;
                  2200px/q80 varsayılan). Artifact olarak değil siteye konuldu çünkü
                  artifact kumbarasında dosya indirme engelli.
files/            Modeller sayfasındaki PDF'ler: Modellige-Hazirlik.pdf (TR), Preparing-to-Model.pdf (EN)
scripts/          genpages.js (.pages.yml üretir), prep.py (fotoğraf küçültme),
                  guide-pdf.py (iki PDF'i yeniden üretir — weasyprint, Lora/Inter yazı tipleri)
favicon-*.png, apple-touch-icon.png   Sekme logosu
README.md         Ebru için kullanım kılavuzu (Türkçe, adım adım)
CLAUDE.md         Bu dosya
.nojekyll         GitHub Pages için teknik dosya
```

`index.html` içinde `data-k="grup.anahtar"` taşıyan her öğe `text.json`'dan doldurulur.
Yeni bir metin alanı eklerken hem HTML'e `data-k` hem `text.json`'a karşılığını ekle,
yoksa alan boş görünür.

**content.js artık yok** — Pages CMS kurulurken `data/*.json` dosyalarına ayrıldı.

---

## Site yapısı

Tek `index.html` dosyası, hash yönlendirmesiyle ayrı sayfalar gibi çalışıyor:

```
#home          Seçki (feat:true olan kareler), kısa tanıtım, son iki yazı
#fotograflar   Seri başlıkları altında polaroid kolaj (kaydırdıkça açılır) ya da Izgara (kare, sıkı)
#video         Showreel (henüz boş — VIDEOS listesi dolunca kartlara dönüşür)
#gunluk        Günlük yazıları
#modeller      Nasıl çalışıyor + güven listesi + başvuru formu
#hakkimda      Biyografi
#iletisim      E-posta ve sosyal medya
```

**Seriler:** Etheral Space · Yan Yana · Doğa (eski Peyzaj kareleri Doğa'da)

**Model formu** e-posta taslağı üretir (mailto + kopyala). Altı bölüm (`fieldset.fs`): Seni tanıyalım ·
Kamera önünde · Sınırlar ve rahatlık · Fotoğrafların kullanımı · **Okul projeleri (gönüllü)** · Pratik
detaylar (~45 soru; yalnızca ad ve iletişim zorunlu). Okul projeleri bölümü: Ebru öğrenci, ders projeleri
için kamera önü/arkası gönüllü arıyor; tamamen isteğe bağlı, "hayır" başvuruyu etkilemez; ücret yok,
karşılık = jenerik/teşekkür ve çalışmanın kopyası; gösterim kapsamı (yalnız okul içi mi, festival/çevrimiçi
de mi) ayrıca sorulur. Soruları internetteki fotoğrafçı/model başvuru formları, güvenlik rehberleri ve KVKK
notlarından derleyip uyarladık. `buildMsg` **genel**: her `.field`'in etiketini ve değerini okuyup bölüm
başlıklarıyla mesaja döker; yeni soru eklenince koda dokunmak gerekmez. Metinler text.json → form
grubunda (soru anahtarı + `1,2,3…` seçenekleri); yeni seçenek HTML'e de eklenmeli. **Bilerek sorulmayanlar:**
çıplaklık, beden ölçüsü, sağlık bilgisi, kimlik/adres/IBAN — "dikkat etmemi istediğin bir şey" alanı
isteğe bağlı ve sağlık bilgisi vermek zorunda olmadığını söyler.
"Beni nereden buldun?" seçenekleri: Instagram · arkadaş · web sitesi · **kartvizit/kart** (Ebru QR kodlu
kartvizit dağıtacak) · başka.

**Modelliğe Hazırlık PDF'i** (`files/Modellige-Hazirlik.pdf`, `files/Preparing-to-Model.pdf`, 8 sayfa;
7. sayfa "Okul projeleri: gönüllü katılım" — model çekimiyle farkı, netleştirilecekler, güvenlik aynen geçerli):
Modeller sayfasında form üstünde indirme kartı. Bağlantı `site.json` → `guideTr` / `guideEn`
(panelden PDF değiştirilebilir; alan boşsa kart gizlenir). İçerik Ebru'nun sitedeki taahhütleriyle
(yanına biri gelebilir, yazılı izin formu, yayın onayı, TFP, 1–2 saat, 7–10 gün, 18 yaş altı veli)
tutarlı yazıldı; bunlar değişirse PDF de güncellenmeli. Okul projesi bölümünde "görüntüleri görüp onaylama
hakkı burada da geçerli" ve "hayır demek model çekimlerini etkilemez" sözleri Ebru'nun taahhüdü olarak yazıldı
(onaya Ebru'nun teslim tarihleri izin vermezse güncellenmeli). weasyprint + Lora/Inter ile üretildi.

**Dikkat:** `.vid` sınıfı Video sayfası kartlarına ait; giriş videosu `.playing` kullanır.

---

## Tasarım kararları (ve neden)

**Palet:** Koyu yeşil ailesi (temel ton 140). Ebru'nun verdiği colorhunt
paletinden: `#18230F` `#27391C` `#255F38` `#1F7D53`. Krem metin (`#F1EEE3`).

**Fotoğrafa göre renk uyumu.** Site, gösterdiği fotoğraflardan rengin *tonunu*
alıp kendine uyarlar; koyuluk ve doygunluk sabit tutulur, böylece okunabilirlik
hiç bozulmaz. `site.json` içindeki `theme.strength` (0–1) etkinin şiddetini ayarlar, şu an `0.6`.

> Not: Ebru'nun fotoğraflarının hâkim tonu aslında **sarı-yeşil** (otlar), sevdiği
> koyu orman yeşili değil. `strength: 1` yapılırsa site zeytin yeşiline kayar.
> `0.6` değeri bu yüzden seçildi — kimliği korurken seriler arası fark hissettiriyor.

**Modeller sayfasının rengi sabit petrol yeşili** (`themeForPage`, hue 168, `exact:true`
→ fotoğraflardan karıştırılmaz). Önce tüm fotoğrafların ortalaması alınıyordu, hue 100'e
(sarı-yeşil) kayıp fazla açık duruyordu; Ebru Hakkımda'daki daha soğuk tona yakın,
"çok minik petrol" istedi. Daha mavi/yeşil için hue'yu oynat (160–180).

**Büyütme ekranında renk YOK.** Önce fotoğrafın etrafında renkli bir çerçeve
vardı, Ebru rahatsız edici buldu ve kaldırıldı. Şimdi nötr koyu zemin, sadece
fotoğraf. Bunu geri getirme.

**Girişte portreden videoya geçiş.** Ana sayfa açılışında hero.jpg 1 sn
görünür (HOLD; önce 3,5 sn, sonra 2 sn, sonra 1 sn — Ebru kaydırmadan önce
hem fotoğrafın hem videonun fark edilmesini istedi), sonra video (site.json → heroVideo / heroVideoSmall) yavaşça belirir,
bitmeden fotoğrafa döner, ~7 sn sonra tekrar. Ekran dışındayken durur; hareket
azaltma veya veri tasarrufu açıksa sadece fotoğraf. Yeni video: sessiz, H.264,
30 fps, CRF 27, +faststart; 1920 ve 1280 genişlikte iki sürüm. Kaynak 100 fps
Sony klibi (C0017) 172 MB'tı — ham video asla depoya konmaz (100 MB dosya sınırı).

**Galeri polaroid destesi** (`layoutPols`). Önce CSS sütunları vardı (tırtıklı
diye elendi), sonra hizalı satırlar; Ebru bir dergi sayfasından esinlenip
polaroid kolajı istedi. Her seri kapalı bir deste olarak durur ve **kaydırmaya bağlı** olarak dağılır
(`scrub`, rAF döngüsü). Tetiklenip biten bir CSS geçişi DEĞİL: her karenin
blok ilerleyişi içinde kendi aralığı var, konum ve açı kaydırma
oranından hesaplanıp inline transform olarak yazılıyor; geri kaydırınca geri
toplanıyorlar. Önce kaydırmada tetiklenen geçiş, sonra imleçle açılan deste
denendi — ikisini de beğenmedi, "kaydırma hareketiyle beraber" olmasını
istedi. Değerler `el.p` içinde sayı olarak durur. Döngü yalnız
`#fotograflar` etkinken çalışır (`startScrub`).
Konum/açı dosya adından türetilir (`jit`), yani her açılışta aynı. Sütun
sayısı 1/2/3. Oran JPEG/PNG başlığından Range isteğiyle okunur (`learnRatio`),
fotoğraf yüklenince EXIF döndürmesine karşı düzeltilir (`onShotLoad`);
polaroid görünümü için 0.78–1.34 arasına sıkıştırılır, yani kutuda hafif
kırpma olur — büyütme ekranında kare tam ve kırpılmamış açılır.
Hareket azaltma açıksa desteler baştan açık gelir.
Büyütme ekranı **yalnız tıklanan serinin** karelerini gezer (`SETS['c:<seriId>']`;
önce tüm seriler tek dizideydi, Ebru hata olarak bildirdi). Açılma aralığı
sonradan kısaltıldı (blok başı ekranın %92'sine gelince başlar, kare başına 0,45 aralık).
**Kolaj/Izgara düğmesi** (`.viewtog`, `setView`, seçim localStorage'da): Izgara
ana sayfa seçkisi gibi sıkı **kare** kutular (`object-fit:cover`, 4/3/2 sütun, 5–6px aralık);
önce kırpmasız + şeritli (contain) idi, Ebru şeritleri istemedi; `#catWrap.flat` sınıfı CSS ile
polaroid konumlarını ezer. Kolaja dönünce `layoutPols()` çağrılır.
Fotoğraflar her zaman görünür: kareler desteden çıkarken solgundan netliğe
geçen bir "develop" efekti vardı, Ebru deste topluyken boş sanılacağı için
kaldırttı. Geri eklenecekse `scrub()` içinde img opacity/filter satırları.
Sayfa gizliyken genişlik 0 olduğu için `route()` içinde `#fotograflar`'a
geçişte `layoutPols` yeniden çağrılır — bu olmazsa düzen kurulmaz.

**Sekme logosu:** krem zeminde koyu Fraunces Z (16/32/48 px PNG +
apple-touch-icon 180). Önce koyu zeminli, genel bir serifle çizilmiş hâli
yapıldı, Ebru beğenmedi; altı seçenek sunuldu, bunu seçti. Harf sitenin kendi
yazı tipiyle tarayıcıda çizildi — Fraunces bu ortamdan indirilemiyor
(fonts.googleapis.com engelli), gerekirse yine tarayıcıda üretilmeli.

**Addan sonraki süs noktası kaldırıldı** (eskiden `.dot` span'i vardı). Geri
isterse marka ve açılış başlığına geri eklenir.

**Fotoğraf isimleri yok.** Her kareye başlık yazmak istemedi. Galeri isimsiz;
sadece kategori başlıkları var.

**Fotoğraf eklemek iki alana indirildi:** seri + `{src}`. Ana sayfadaki seçkiye
girecekse ayrıca `feat:true` ve `size`. Bu sadeleştirme bilinçli.

**Ana sayfa seçkisi telefonda** iki eşit sütun ve kare kutu (760px altı);
farklı oranlar satırları tırtıklı gösteriyordu. Satır içi `aspect-ratio`'yu
ezmek için `!important` şart. Tek sayıda kare varsa sonuncusu tam genişlik.

**Ebru'nun fotoğrafı** `images/ebru.jpg` — hem Hakkımda hem ana sayfadaki
"Kısaca" bölümünde (`SITE.aboutPhoto`, panelden değiştirilebilir).

**Pages CMS paneli.** `app.pagescms.org` üzerinden, ücretsiz ve barındırmasız.
`.pages.yml` form alanlarını Türkçe etiketlerle tanımlar. WordPress değerlendirildi
ve elendi (ücretli, siteyi yeniden yapmayı gerektirirdi).

**Hata güvenlik ağı.** `data/` dosyalarından biri okunamazsa sayfa bembeyaz kalmaz;
açıklayıcı bir uyarı çıkar ve GitHub geçmişinden nasıl geri alınacağını anlatır.

---

## Çalışma biçimi

Ebru kod yazmıyor. Birincil yolu **Pages CMS paneli** (app.pagescms.org);
yedek yol `data/*.json` dosyalarını GitHub web editöründen düzenlemek. Yeni fotoğraf gönderdiğinde iş akışı:

1. Uzun kenarı 2200px'e düşür, JPEG kalite 80 (`scripts/prep.py`; Ebru kendisi
   `kucult.html` sayfasını kullanıyor)
2. `images/` klasörüne koy
3. `data/series.json` içinde ilgili serinin `photos` listesine `{src}` ekle
4. Commit + push → birkaç dakikada yayında

**Push döngüsü (şart):** Ebru panelden de commit atıyor, bu yüzden her push öncesi
`git fetch -q origin main && git rebase -q FETCH_HEAD`, sonra
`git -c push.negotiate=true push -q origin HEAD:main`; reddedilirse tekrarla.
**Panel alanı değişince:** `text.json`'a anahtar ya da `site.json`'a alan eklendiyse
`node scripts/genpages.js .` çalıştır (sonundaki `.` şart), `.pages.yml` değişikliğini de commit'le.
**PDF'ler:** içerik `scripts/guide-pdf.py` içinde; metni değiştirip çalıştır, çıkan PDF'leri `files/`'a koy.

**Ton:** Açıklamaları Türkçe ve sade tut. Teknik ayrıntıyı ancak gerektiği kadar
ver. Kendi başına yapabileceği şeyleri söyle — amacı siteyi kendi yönetebilmek.

---

## Açık konular

- [x] ~~İsim kararı~~ — **Z. Ebru Çakmak**. Mahlas elendi; gerçek ad korunuyor
      ama baştaki harf mesafe koyuyor. Sosyal medya kullanıcı adı ayrı karar
      (z.ebrucakmak gibi; "zebrucakmak" yazımından kaçın).
- [x] ~~Pages CMS kurulumu~~ — tamamlandı. Ebru'nun ilk girişi yapması kaldı.
- [x] ~~Günlük yazıları~~ — Ebru kendi deneme yazılarını panelden girdi. Dört yazı:
      Ölüler ve Değersiz Eşyaları, Sevgi, Kendi Yankımız, Hareket Et ve Azal.
      Son ikisi tek yazı olarak girilmişti, ayrıldı; tarihleri "2026-11", gerçek
      tarihleri bilinmiyor.
- [x] ~~QR kodlu kartvizit~~ — "Sis" seçildi: dikey 55×85 mm, ön yüz 07.jpg yeşil–krem çift ton + gren,
      arka krem zemin, yazılar Cormorant Garamond (Ebru Inter'i sıkıcı buldu; Fraunces/Instrument/daktilo
      seçenekleri arasından bunu seçti): ince ad, italik slogan iki satır (ortada Z YOK — Ebru sevmedi),
      QR → ana sayfa, altta FOTOĞRAF · VİDEO. 3 mm taşma, CMYK PDF + kesim işaretli PDF (Ghostscript).
      Alan adı alınırsa QR yeni adrese güncellenmeli (github.io yine de yönlendirir).
- [ ] **Sanatçı bildirimi** — slogan yayında: "Ten de taş da aynı ışıktan yapılmış." / "Skin and stone
      are made of the same light." (25 Kasım 2026'da değişti. Eski cümle "İnsanla doğanın birbirine
      karıştığı yerleri arıyorum" insan ile doğayı ayıran bir dil gibi geldiği için bırakıldı; Ebru her şeyin
      bir olduğuna inanıyor, yeni metinlerde "insan/doğa" karşıtlığı kurma.) Önerilen ama siteye **yazılmamış**: "çok yönlülük"
      vurgulayan ikinci satır, Hakkımda cümlesi, deneme bölümü adı (öneri: Kenar Notları / Margin Notes;
      `pages.json`'da menü adı olarak değişir). Ebru onayı bekliyor.
- [ ] **Küçük ayarlar** — giriş videosunun belirme süresi (şu an 1,8 sn), polaroid açılma hızı
      (Ebru "geç/erken" derse `scrub()` içindeki aralık), günlükteki iki yazının gerçek tarihleri.
- [ ] **Showreel** — video bölümü boş. Vimeo veya YouTube bağlantısı gelince
      `data/videos.json` doldurulacak.
- [ ] **Sosyal medya** — Instagram ve TikTok hesapları aynı kullanıcı adıyla
      açılacak, bağlantıları `data/site.json`'a eklenecek.
- [ ] **Alan adı** — opsiyonel. Alınırsa Settings → Pages → Custom domain.

---

## Teknik kısıtlar (bilinmezse vakit kaybettirir)

- Bu oturumdan **yeni GitHub deposu açılamıyor**, depo adı değiştirilemiyor,
  ayar yazılamıyor (Pages ayarları dahil). Push çalışıyor.
- `gh repo create` GraphQL kullandığı için reddediliyor; REST uçları kullanılmalı.
- Push sırasında `push negotiation failed` uyarısı normaldir, başarısızlık değil.
- Fotoğraf onayları: Ebru fotoğrafladığı herkesle yayın öncesi konuşuyor ve
  gönderdiği tüm fotoğrafların hakkına sahip. Bu konuyu tekrar açmaya gerek yok.
- Bu ortamda siteye `curl`/WebFetch ile ulaşılamayabilir (proxy). Yerelde test için:
  `python3 -m http.server` + Playwright (`/usr/bin/google-chrome`, `--no-sandbox`). Canlıyı
  görmek için tarayıcı aracı gerekir; yoksa push sonrası Ebru'dan kontrol iste.
- Gizli onay kutularını (`.chip input`) test ederken `input`'a değil yanındaki `span`'a tıkla.
