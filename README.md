# Ebru Çakmak — Portfolyo Sitesi

Tamamen statik bir site. Sunucuya, veritabanına ya da ücretli bir hizmete ihtiyacı yok.
GitHub Pages üzerinde **ücretsiz** yayınlanıyor.

**Yayındaki adres:** https://ebru-cakmakk.github.io

---

## Dosyalar

```
index.html        Tasarım ve çalışma mantığı. Buna dokunman gerekmiyor.
data/             TÜM İÇERİK burada, altı dosya hâlinde:
  site.json         Adın, e-posta, sosyal medya, renk ayarı
  categories.json   Fotoğraf kategorileri
  photos.json       Fotoğraf listesi
  videos.json       Video listesi
  posts.json        Günlük yazıları
  text.json         Sitedeki her yazı
images/           Fotoğraflar
.pages.yml        Düzenleme panelinin ayarları
README.md         Bu dosya
CLAUDE.md         Proje bağlamı (Claude için)
.nojekyll         GitHub Pages için teknik dosya, silme
```

---

## 1. Düzenleme paneli (önerilen yol)

İçeriği görsel bir panelden düzenleyebilirsin — kod görmeden, sürükle bırakla.

### İlk giriş

1. **[app.pagescms.org](https://app.pagescms.org)** adresine git
2. **Sign in with GitHub** → GitHub hesabınla giriş yap
3. İzin ekranında `ebru-cakmakk.github.io` deposuna erişimi onayla
4. Listeden depoyu seç

Panel açılır. Ücretsiz, kurulum gerektirmiyor.

### Panelde ne var

| Bölüm | Ne yapar |
|---|---|
| **Fotoğraflar** | Fotoğraf ekle, sil, sırala, kategorisini değiştir |
| **Kategoriler** | Yeni seri aç, adını değiştir |
| **Günlük yazıları** | Yazı yaz, düzenle |
| **Videolar** | Vimeo/YouTube bağlantısı ekle |
| **Site ayarları** | Ad, e-posta, sosyal medya, renk uyumu |
| **Site yazıları** | Menüden form etiketlerine kadar her cümle |

Her değişiklikte **Save** diyorsun; site birkaç dakika içinde kendiliğinden güncelleniyor.

### Fotoğraf eklemek

**Fotoğraflar** → **Add an entry** → **Fotoğraf** alanına tıkla → bilgisayarından sürükle
bırak → kategorisini seç → **Save**.

Ana sayfadaki seçkiye de girsin istiyorsan *"Ana sayfadaki seçkide göster"* kutusunu
işaretle ve genişlik/oran seç.

> **Yüklemeden önce küçült:** uzun kenar 2200 piksel, JPEG, 400 KB altı.
> Ücretsiz araç: [squoosh.app](https://squoosh.app). Büyük dosyalar siteyi yavaşlatır.

> **Düzen ipucu:** ana sayfada *Geniş (8)* ile *Küçük (4)* yan yana tam oturur,
> *Orta (6)* + *Orta (6)* de öyle. *Tam sayfa (12)* tek başına bütün satırı kaplar.

### Yeni kategori açmak

**Kategoriler** → **Add an entry** → kısa ad (Türkçe karakter ve boşluk olmadan,
örn. `sokak`), Türkçe adı, İngilizce adı → **Save**.

Sonra fotoğraflara bu kategoriyi atayabilmen için panelin seçenek listesine de
eklenmesi gerekir — bunu Claude'a söylemen yeterli, tek satırlık bir iş.

### Günlük yazısı yazmak

**Günlük yazıları** → **Add an entry**. Paragrafları **boş satırla** ayır.
Yeni yazı en üstte görünsün istiyorsan listede en üste taşı.

**Kapak görseli:** *Kapak görseli* alanına bir fotoğraf seç. Yazı listesinde küçük
bir önizleme, yazıyı açtığında da en üstte büyük hâli görünür. Boş bırakabilirsin.

**Yazının içine fotoğraf koymak:** metnin içinde bir satıra **tek başına** dosya
yolunu yaz, boş satırlarla ayır:

```
Sabah ışığı için erken kalkmak gerekiyordu.

images/09.jpg

Çekimin ikinci yarısında bulutlandı.
```

Alt yazı da ekleyebilirsin:

```
images/09.jpg | Kadıköy, sabah yedi
```

Fotoğrafı önce **Fotoğraflar** bölümünden ya da doğrudan `images` klasörüne
yüklemen gerekir; buraya sadece yolunu yazıyorsun.

---

## 2. Elle düzenlemek (panel olmadan)

Panel çalışmazsa ya da hızlıca bir şey değiştirmek istersen, `data/` klasöründeki
JSON dosyalarını GitHub üzerinden de düzenleyebilirsin: dosyaya tıkla → kalem
simgesi → değiştir → **Commit changes**.

Daha rahat bir editör için: depo sayfasındayken klavyeden **nokta (.)** tuşuna bas.

---

## 3. Renk uyumu

Site, gösterdiği fotoğraflardan rengin **tonunu** alıp kendine uyarlar. Koyuluk ve
doygunluk sabit kalır, yani yazılar her zaman okunur ve tasarım bozulmaz.

- **Ana sayfa** açılış fotoğrafının tonunu alır
- **Fotoğraflar sayfasında** kategoriler arasında kaydırdıkça palet yumuşakça değişir

Bir fotoğrafı büyüttüğünde renk uyumu devreye girmez: orada sadece fotoğraf görünür,
nötr koyu bir zeminde.

Ayarı panelde **Site ayarları → Renk uyumu** altında:

| Şiddet | sonuç |
|---|---|
| `0` | hiç değişmez, site hep ana tonunda kalır |
| `0.6` | belirgin değişir ama kendi renk ailenden çıkmaz |
| `1` | tamamen fotoğrafın tonuna geçer |

---

## 4. Sitenin yapısı

Tek `index.html` dosyası ama **ayrı sayfalar gibi** çalışır:

```
#home          Ana sayfa — seçki, kısa tanıtım, son yazılar
#fotograflar   Tüm fotoğraflar, kategorilere ayrılmış
#video         Showreel ve videolar
#gunluk        Günlük yazıları
#modeller      Modeller için bilgilendirme ve başvuru
#hakkimda      Hakkımda
#iletisim      İletişim
```

Bu adresler paylaşılabilir — birine doğrudan `ebru-cakmakk.github.io/#fotograflar`
gönderebilirsin.

---

## 5. Bir şeyi bozarsan

Site bembeyaz kalmaz; "içerik yüklenemedi" diyen açıklayıcı bir sayfa çıkar.
GitHub'da ilgili dosyanın **History** (geçmiş) bölümünden son değişikliği geri al,
site anında eski hâline döner. Hiçbir şey kaybolmaz.

---

## 6. İleride

- **Kendi alan adın:** Al, sonra Settings → Pages → Custom domain. Barındırma
  yine ücretsiz kalır.
- **Video:** Vimeo veya YouTube'a yükle, bağlantısını panele gir. Video dosyasını
  siteye koyma, siteyi çok yavaşlatır.

## Menü ve sayfalar

Panelde **Menü ve sayfalar** bölümü sitenin üstündeki menüyü yönetir.

- **Sırayı değiştirmek:** Öğeleri sürükleyerek yerlerini değiştir. Menü aynı sırayla görünür.
- **Adını değiştirmek:** "Menüdeki adı" kutularını düzenle.
- **Gizlemek:** "Menüde görünsün" kutusunun işaretini kaldır. Sayfa silinmez, sadece menüden kalkar.
- **Yeni sayfa eklemek** (örneğin Denemeler): Listeye yeni bir öğe ekle. Kısa ada `denemeler` gibi küçük harfli, Türkçe karaktersiz bir ad yaz, sonra "YENİ SAYFA İÇİN" alanlarını doldur. Metin, Günlük yazılarındaki kurallarla yazılır.
- Var olan sayfaların kısa adlarını (fotograflar, video, gunluk…) değiştirme, yoksa o sayfa açılmaz.

**Fotoğraf kategorileri** bölümü ise yalnızca Fotoğraflar sayfasındaki grupları (Portre, Doğa…) yönetir.

## Hakkımda fotoğrafı

**Site ayarları → Hakkımda fotoğrafı** alanından değiştirebilirsin.

## Fotoğraf serileri (yeni yöntem)

Panelde **Fotoğraf serileri** bölümünde her seri bir başlık. Başlığı aç, **Bu serinin fotoğrafları** listesine fotoğraf ekle. Yeni seri için listeye yeni bir öğe ekle ve adını yaz. Fotoğraflar artık başka seriye karışmaz.

Bir fotoğrafın ana sayfada da görünmesini istersen "Ana sayfadaki seçkide de göster" kutusunu işaretle ve boyutunu seç.

## Videolar

Panelde **Videolar** bölümüne YouTube ya da Vimeo'daki videonun adresini yapıştırman yeterli. Başlık isteğe bağlı. Video sitede kendi içinde oynar.

## Fotoğrafları küçültmek

Siteye koymadan önce fotoğrafları küçültmen gerekiyor. Bunun için kendi sitende bir araç var:

**https://ebru-cakmakk.github.io/kucult.html**

Fotoğrafları sayfaya sürükle, küçültülmüş hâllerini indir, sonra panele yükle. Ayarlar hazır geliyor (uzun kenar 2200, kalite 80), değiştirmene gerek yok. İstersen "seri" gibi bir ad yazıp dosyaları seri-01.jpg, seri-02.jpg diye numaralandırabilirsin.

Fotoğraflar internete yüklenmiyor, küçültme senin cihazında yapılıyor. Sayfayı yer imlerine ekle.

iPhone'dan HEIC dosyası gelirse tarayıcı açamayabilir. Telefonda **Ayarlar → Kamera → Biçimler → En Uyumlu** seçersen yeni fotoğraflar JPEG çekilir.

## Fotoğraflar sayfası nasıl çalışıyor

Her seri kapalı bir polaroid destesi olarak duruyor. Sayfayı kaydırdıkça kareler
desteden birer birer ayrılıp etrafa yayılıyor.
Hareket kaydırmaya bağlı: ne kadar kaydırırsan o kadar açılıyorlar, geri
kaydırınca geri toplanıyorlar. Bir polaroide dokununca fotoğraf tam ve
kırpılmamış hâliyle açılıyor; büyütme ekranında yalnızca o serinin
fotoğrafları arasında gezebilirsin.

Sayfanın üstündeki **Kolaj / Izgara** düğmesiyle görünümü değiştirebilirsin.
Izgara, tüm kareleri kırpmadan düz bir sıra hâlinde gösterir. Ziyaretçinin
seçimi o tarayıcıda hatırlanır.

Senin yapman gereken bir şey yok: panelden fotoğraf eklediğinde yerini, açısını
ve boyutunu site kendi hesaplıyor. Açılar rastgele görünse de sabittir, sayfayı
her açışta aynı durur.
