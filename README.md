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

## 2. İçeriği güncellemek

Bilgisayara program kurmana gerek yok. Her şey tarayıcıdan:

### Yazıları, isimleri, sosyal medya bağlantılarını değiştirmek
1. GitHub'da deponu aç → `content.js` dosyasına tıkla.
2. Sağ üstteki **kalem** simgesine bas.
3. Tırnak içindeki yazıları değiştir.
4. Aşağıda **Commit changes** → bir dakika içinde site güncellenir.

### Yeni fotoğraf eklemek
1. Fotoğrafı önce küçült: uzun kenarı **2200 piksel**, JPEG, **400 KB altı**.
   Ücretsiz araç: [squoosh.app](https://squoosh.app)
2. Dosya adında Türkçe karakter ve boşluk olmasın: `09.jpg` gibi.
3. GitHub'da `images` klasörünü aç → **Add file** → **Upload files** → sürükle bırak.
4. `content.js` içindeki `PHOTOS` listesine yeni bir satır ekle:

```js
{src:'images/09.jpg', cat:'portre', w:6, ratio:'3/2', tr:'Fotoğrafın adı', en:'Photo title'},
```

`cat` kategori: `portre` · `doga` · `peyzaj` (listeyi `CATS` bölümünden değiştirebilirsin)
`w` genişlik: **4** küçük · **6** orta · **8** geniş · **12** tam sayfa
`ratio` oran: **3/2** yatay · **3/4** dikey · **1/1** kare · **21/9** sinema bandı

### Yeni kategori eklemek
`content.js` içindeki `CATS` listesine bir satır ekle:

```js
{id:'sokak', tr:'Sokak', en:'Street'},
```

Sonra o kategoriye girecek fotoğrafların `cat` değerine `'sokak'` yaz. Galerinin
üstündeki filtre düğmeleri kendiliğinden güncellenir; fotoğrafı olmayan kategori
görünmez.

### Sitedeki herhangi bir yazıyı değiştirmek
`content.js` dosyasının **5. bölümünde** sitedeki bütün yazılar var — menü, açılış,
bölüm başlıkları, modeller için yazılan her cümle, form etiketleri. Soldaki ad
(örn. `'hero.tagline'`) yerini gösterir, onu değiştirme; sadece `tr:` ve `en:`
karşılıklarını düzenle. `index.html` dosyasına hiç dokunman gerekmez.

> Düzen ipucu: `w:8` ile `w:4` yan yana gelince yükseklikleri tam oturur.
> `w:6` + `w:6` de aynı şekilde. `w:12` tek başına tam genişlik kaplar.

### Yeni günlük yazısı eklemek
`content.js` içindeki `POSTS` listesinin **en üstüne** yeni bir blok ekle.
Mevcut bloklardan birini kopyalayıp içini değiştirmek en kolayı.

### Video eklemek
Videoyu Vimeo veya YouTube'a yükle. Bağlantısını bana ver, video bölümünü
gerçek bir oynatıcıya çeviririm.

---

## 3. Yardım

Takıldığın her noktada Claude'a bu klasörü ve ne yapmak istediğini söylemen yeterli;
dosyaları güncelleyip sana hazır hâlde verir.
