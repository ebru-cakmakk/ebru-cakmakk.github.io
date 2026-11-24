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

**İsim:** Mahlas kullanmayı düşünüyor (bir ara "Ebby Lace" gündeme geldi).
Şu an site gerçek adıyla. Karar verilmedi, açık konu. Gerekçe: küratörler gerçek
isimle çalışır, ama kamuya açık yüzünde (Instagram, TikTok) mahlas makul.

---

## Nerede yaşıyor

| Ne | Nerede |
|---|---|
| Depo | `github.com/ebru-cakmakk/ebru-cakmakk.github.io` |
| Yayındaki site | `https://ebru-cakmakk.github.io` |
| Barındırma | GitHub Pages — ücretsiz, kendiliğinden yayınlanıyor |
| E-posta | `zekiyeebru02@proton.me` |

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
  site.json         Ad, e-posta, sosyal medya, theme{auto,base,strength}
  categories.json   [{id, tr, en, hue}]
  photos.json       [{src, cat, feat, w, ratio}] — w ve ratio sadece ana sayfa seçkisi için
  videos.json       [{url, poster, meta, tr, en}] — boşsa Video sayfasında "hazırlanıyor"
  posts.json        [{date, tr, en, exTr, exEn, bodyTr, bodyEn}] — gövde düz metin,
                    boş satır = yeni paragraf
  text.json         Sitedeki her yazı: {grup: {anahtar: {tr, en}}}
images/           Fotoğraflar (uzun kenar ~2200px, JPEG, ~400-700 KB)
.pages.yml        Pages CMS panel ayarları (üretilmiş — scripts/genpages.js)
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
#fotograflar   Tüm kareler, kategori başlıkları altında, doğal oranlarıyla
#video         Showreel (henüz boş — VIDEOS listesi dolunca kartlara dönüşür)
#gunluk        Günlük yazıları
#modeller      Nasıl çalışıyor + güven listesi + başvuru formu
#hakkimda      Biyografi
#iletisim      E-posta ve sosyal medya
```

**Kategoriler:** Portre · Yan Yana · Doğa · Peyzaj

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

**Büyütme ekranında renk YOK.** Önce fotoğrafın etrafında renkli bir çerçeve
vardı, Ebru rahatsız edici buldu ve kaldırıldı. Şimdi nötr koyu zemin, sadece
fotoğraf. Bunu geri getirme.

**Fotoğraf isimleri yok.** Her kareye başlık yazmak istemedi. Galeri isimsiz;
sadece kategori başlıkları var.

**Fotoğraf eklemek iki alana indirildi:** `{src, cat}`. Ana sayfadaki seçkiye
girecekse ayrıca `feat:true` ve `w`/`ratio`. Bu sadeleştirme bilinçli.

**Pages CMS paneli.** `app.pagescms.org` üzerinden, ücretsiz ve barındırmasız.
`.pages.yml` form alanlarını Türkçe etiketlerle tanımlar. WordPress değerlendirildi
ve elendi (ücretli, siteyi yeniden yapmayı gerektirirdi).

**Hata güvenlik ağı.** `data/` dosyalarından biri okunamazsa sayfa bembeyaz kalmaz;
açıklayıcı bir uyarı çıkar ve GitHub geçmişinden nasıl geri alınacağını anlatır.

---

## Çalışma biçimi

Ebru kod yazmıyor. Birincil yolu **Pages CMS paneli** (app.pagescms.org);
yedek yol `data/*.json` dosyalarını GitHub web editöründen düzenlemek. Yeni fotoğraf gönderdiğinde iş akışı:

1. Uzun kenarı 2200px'e düşür, JPEG kalite 80 (`scripts/prep.py` benzeri bir adım)
2. `images/` klasörüne koy
3. `data/photos.json` listesine `{src, cat}` ekle
4. Commit + push → birkaç dakikada yayında

**Ton:** Açıklamaları Türkçe ve sade tut. Teknik ayrıntıyı ancak gerektiği kadar
ver. Kendi başına yapabileceği şeyleri söyle — amacı siteyi kendi yönetebilmek.

---

## Açık konular

- [ ] **İsim kararı** — gerçek ad mı, mahlas mı. Önerilenler: Karşı Işık,
      Gölgelik, Düşen Işık, Pus, Yosun, Rakım. Karar verilince site başlığı,
      menü ve footer tek satırda güncellenir (`SITE.name`).
- [x] ~~Pages CMS kurulumu~~ — tamamlandı. Ebru'nun ilk girişi yapması kaldı.
- [ ] **Günlük yazıları** — üç başlık var ama içerikleri yer tutucu. Gerçek
      metinler yazılmalı. Küratörler için en değerli bölüm burası.
- [ ] **Showreel** — video bölümü boş. Vimeo veya YouTube bağlantısı gelince
      `data/videos.json` doldurulacak.
- [ ] **Sosyal medya** — Instagram ve TikTok hesapları aynı kullanıcı adıyla
      açılacak, bağlantıları `data/site.json`'a eklenecek.
- [ ] **Kategori → panel seçeneği** — `.pages.yml` içindeki kategori seçenekleri
      elle tutuluyor (Pages CMS'in `reference` alanı yalnızca koleksiyonlara bakıyor,
      dosya listelerine değil). Yeni kategori eklenince `.pages.yml`'ye de eklenmeli.
      `scripts/genpages.js` dosyayı `data/`'dan yeniden üretir.
- [ ] **Alan adı** — opsiyonel. Alınırsa Settings → Pages → Custom domain.

---

## Teknik kısıtlar (bilinmezse vakit kaybettirir)

- Bu oturumdan **yeni GitHub deposu açılamıyor**, depo adı değiştirilemiyor,
  ayar yazılamıyor (Pages ayarları dahil). Push çalışıyor.
- `gh repo create` GraphQL kullandığı için reddediliyor; REST uçları kullanılmalı.
- Push sırasında `push negotiation failed` uyarısı normaldir, başarısızlık değil.
- Fotoğraf onayları: Ebru fotoğrafladığı herkesle yayın öncesi konuşuyor ve
  gönderdiği tüm fotoğrafların hakkına sahip. Bu konuyu tekrar açmaya gerek yok.
