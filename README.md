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
