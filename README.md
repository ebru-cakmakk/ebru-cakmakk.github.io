# Ebru Çakmak — Portfolyo Sitesi

Tek sayfalık, tamamen statik bir site. Çalışması için sunucuya, veritabanına ya da
ücretli bir hizmete ihtiyacı yok. GitHub Pages üzerinde **ücretsiz** yayınlanır.

## Dosyalar

```
index.html     ← sitenin kendisi (tasarım ve çalışma mantığı — buna dokunmana gerek yok)
content.js     ← İÇERİK. İsim, fotoğraf listesi, günlük yazıları. Değiştireceğin tek dosya.
images/        ← fotoğraflar
.nojekyll      ← GitHub Pages için teknik bir dosya, silme
```

---

## 1. Siteyi ücretsiz yayına almak (GitHub Pages)

1. [github.com](https://github.com) üzerinden ücretsiz bir hesap aç.
   Kullanıcı adını siteye yansıyacağı için özenle seç (örn. `ebrucakmak`).
2. Sağ üstteki **+** → **New repository**.
   - **Repository name:** `kullaniciadin.github.io` (kendi kullanıcı adınla)
   - **Public** seçili olsun
   - **Create repository**
3. Açılan sayfada **uploading an existing file** bağlantısına tıkla.
4. Bu klasördeki her şeyi (`index.html`, `content.js`, `.nojekyll` ve `images` klasörü)
   sürükleyip bırak → **Commit changes**.
5. **Settings** → sol menüden **Pages** → *Branch* kısmında `main` ve `/ (root)` seçili
   olsun → **Save**.
6. Bir iki dakika sonra siten şu adreste yayında olur:
   **https://kullaniciadin.github.io**

Ücret yok, süre sınırı yok, reklam yok.

### İleride kendi alan adını bağlamak istersen
Alan adını (örn. `ebrucakmak.com`) bir kayıt firmasından al, sonra
**Settings → Pages → Custom domain** kısmına yaz. Sadece alan adının yıllık ücreti olur,
barındırma yine ücretsiz kalır.

---

## 2. Sitenin yapısı

Site tek bir `index.html` dosyasından oluşur ama **ayrı sayfalar gibi çalışır**:

```
#home          Ana sayfa — seçki, kısa tanıtım, son yazılar
#fotograflar   Tüm fotoğraflar, kategorilere ayrılmış
#video         Showreel ve videolar
#gunluk        Günlük yazıları
#modeller      Modeller için bilgilendirme ve başvuru
#hakkimda      Hakkımda
#iletisim      İletişim
```

Adres çubuğunda `ebru-cakmakk.github.io/#fotograflar` gibi görünür ve bu bağlantılar
paylaşılabilir — birine doğrudan fotoğraf sayfasını gönderebilirsin.

---

## 3. İçeriği güncellemek

Bilgisayara program kurmana gerek yok. Her şey tarayıcıdan, `content.js` dosyasından.

### Dosyayı açmak
GitHub'da deponu aç → `content.js` → sağ üstteki **kalem** simgesi → düzenle →
altta **Commit changes**. Site bir dakika içinde güncellenir.

Daha rahat bir editör istersen: depo sayfasındayken klavyeden **nokta (.)** tuşuna bas,
tarayıcıda tam bir kod editörü açılır.

### Yeni fotoğraf eklemek
1. Fotoğrafı küçült: uzun kenar **2200 piksel**, JPEG, **400 KB altı**.
   Ücretsiz araç: [squoosh.app](https://squoosh.app)
2. Dosya adında Türkçe karakter ve boşluk olmasın: `09.jpg` gibi.
3. GitHub'da `images` klasörünü aç → **Add file** → **Upload files** → sürükle bırak.
4. `content.js` içindeki `PHOTOS` listesine tek satır ekle:

```js
{src:'images/09.jpg', cat:'portre'},
```

Hepsi bu. İsim yazmana gerek yok, boyut belirtmene de — Fotoğraflar sayfasında
kendi doğal oranıyla görünür.

**Ana sayfadaki seçkiye koymak istersen** üç alan daha ekle:

```js
{src:'images/09.jpg', cat:'portre', feat:true, w:8, ratio:'3/2'},
```

`w` genişlik: **4** küçük · **6** orta · **8** geniş · **12** tam sayfa
`ratio` oran: **3/2** yatay · **3/4** dikey · **1/1** kare · **21/9** sinema bandı

> Düzen ipucu: `w:8` ile `w:4` yan yana tam oturur, `w:6` + `w:6` de öyle.
> `w:12` tek başına tam genişlik kaplar.

### Yeni kategori eklemek
`CATS` listesine bir satır ekle:

```js
{id:'sokak', tr:'Sokak', en:'Street'},
```

Sonra o kategoriye girecek fotoğrafların `cat` değerine `'sokak'` yaz. Fotoğraflar
sayfasında kendi başlığıyla görünür. Fotoğrafı olmayan kategori hiç görünmez.

### Video eklemek
Videoyu Vimeo veya YouTube'a yükle, sonra `VIDEOS` listesindeki örnek satırın
başındaki `//` işaretlerini kaldırıp doldur. Liste boş kaldığı sürece Video
sayfasında "hazırlanıyor" yazısı görünür.

### Yeni günlük yazısı eklemek
`POSTS` listesinin **en üstüne** yeni bir blok ekle. Mevcut bloklardan birini
kopyalayıp içini değiştirmek en kolayı.

### Sitedeki herhangi bir yazıyı değiştirmek
`content.js` dosyasının **6. bölümünde** sitedeki bütün yazılar var — menü, açılış,
sayfa başlıkları, modeller için yazılan her cümle, form etiketleri. Soldaki ad
(örn. `'hero.tagline'`) yerini gösterir, onu değiştirme; sadece `tr:` ve `en:`
karşılıklarını düzenle. `index.html` dosyasına hiç dokunman gerekmez.

### Bir şeyi bozarsan
Site bembeyaz kalmaz; "içerik dosyasında bir hata var" diyen bir sayfa çıkar.
GitHub'da `content.js` dosyasının **History** (geçmiş) bölümünden son değişikliği
geri al, site anında eski hâline döner. Hiçbir şey kaybolmaz.

---

## 3. Yardım

Takıldığın her noktada Claude'a bu klasörü ve ne yapmak istediğini söylemen yeterli;
dosyaları güncelleyip sana hazır hâlde verir.
