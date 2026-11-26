# Modelliğe Hazırlık PDF'lerini üretir: python3 scripts/guide-pdf.py  (weasyprint, Lora ve Inter yazı tipleri gerekir)
# -*- coding: utf-8 -*-
import sys
import os
from weasyprint import HTML
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'files')

CSS = """
@page { size: A4; margin: 20mm 19mm 22mm 19mm; background:#F1EEE3;
  @bottom-center { content: counter(page); font: 8.5pt Inter, sans-serif; color:#8E8B7B; } }
@page :first { margin:0; background:#18230F; @bottom-center { content:none } }
html { font-family: Inter, 'DejaVu Sans', sans-serif; font-size: 9.7pt; line-height: 1.58; color:#1d2a14; }
.cover { height:297mm; padding:30mm 24mm 24mm; box-sizing:border-box; color:#F1EEE3; position:relative; page-break-after:always;
  background:#18230F; }
.cover .k { font-size:8.5pt; letter-spacing:.28em; text-transform:uppercase; color:#8fbf9f; }
.cover h1 { font-family: Lora, serif; font-weight:400; font-size:44pt; line-height:1.05; margin:18mm 0 8mm; letter-spacing:-.01em; }
.cover .sub { font-family: Lora, serif; font-style:italic; font-size:14pt; line-height:1.5; max-width:120mm; color:#d9d6c8; }
.cover .rule { width:34mm; height:1.2mm; background:#1F7D53; margin:14mm 0 0; }
.cover .foot { position:absolute; left:24mm; right:24mm; bottom:22mm; font-size:9pt; color:#bfbaa6; line-height:1.7; }
.cover .foot b { color:#F1EEE3; font-weight:500; letter-spacing:.02em; }
h2 { font-family: Lora, serif; font-weight:500; font-size:19pt; margin:0 0 3mm; color:#18230F; letter-spacing:-.005em; line-height:1.2; }
.kick { font-size:8pt; letter-spacing:.24em; text-transform:uppercase; color:#255F38; margin:0 0 2.5mm; font-weight:600; }
h3 { font-family: Lora, serif; font-weight:600; font-size:11.5pt; margin:5mm 0 1.5mm; color:#18230F; }
p { margin:0 0 2.6mm; }
.lead { font-family: Lora, serif; font-size:12pt; line-height:1.6; color:#27391C; }
section { margin-bottom:9mm; }
.pb { page-break-before: always; }
.box { border-left:1.2mm solid #1F7D53; background:rgba(31,125,83,.09); padding:4mm 5mm; margin:4mm 0; page-break-inside:avoid; }
.box b { color:#18230F; }
.steps { margin:3mm 0 0; padding:0; list-style:none; counter-reset:s; }
.steps li { position:relative; padding:0 0 3.4mm 12mm; counter-increment:s; page-break-inside:avoid; }
.steps li::before { content:counter(s); position:absolute; left:0; top:-.4mm; width:7.5mm; height:7.5mm; border-radius:50%; background:#18230F; color:#F1EEE3;
  font:600 8.5pt/7.5mm Inter,sans-serif; text-align:center; }
.steps b { font-family:Lora,serif; font-size:10.8pt; color:#18230F; }
.two { display:flex; gap:9mm; }
.two > div { flex:1; }
ul.chk, ul.dot { margin:1.5mm 0 0; padding:0; list-style:none; }
ul.chk li, ul.dot li { position:relative; padding:0 0 1.9mm 7mm; page-break-inside:avoid; }
ul.chk li::before { content:''; position:absolute; left:0; top:1.1mm; width:3.2mm; height:3.2mm; border:.35mm solid #255F38; border-radius:.6mm; }
ul.dot li::before { content:''; position:absolute; left:.8mm; top:2mm; width:1.8mm; height:1.8mm; border-radius:50%; background:#1F7D53; }
table { width:100%; border-collapse:collapse; margin:2.5mm 0 3mm; page-break-inside:avoid; }
td, th { text-align:left; vertical-align:top; padding:2.2mm 3mm 2.2mm 0; border-bottom:.3mm solid #cfcbb9; }
th { font-size:8pt; letter-spacing:.14em; text-transform:uppercase; color:#255F38; font-weight:600; }
td.t { width:22mm; font-weight:600; color:#18230F; white-space:nowrap; }
.sw { display:flex; gap:2mm; margin:2mm 0 3mm; }
.sw i { display:block; width:14mm; height:9mm; border-radius:1mm; }
.say p { font-family:Lora,serif; font-style:italic; font-size:10.6pt; margin:0 0 2mm; padding-left:4mm; border-left:.5mm solid #8fbf9f; color:#27391C; }
.small { font-size:8.2pt; color:#6d6a5b; line-height:1.5; }
.end { margin-top:8mm; padding:7mm 8mm; background:#18230F; color:#F1EEE3; page-break-inside:avoid; }
.end h2 { color:#F1EEE3; font-size:16pt; }
.end p { color:#d9d6c8; margin:0 0 1.5mm; }
.end b { color:#F1EEE3; }
"""

TR = dict(
 lang='tr', title='Modelliğe Hazırlık',
 cover_k='Z. Ebru Çakmak · Fotoğraf ve Video', cover_h='Modelliğe<br>Hazırlık',
 cover_sub='Kamera karşısına geçmeden önce bilmek isteyebileceğin her şey: nasıl çalışıyoruz, nasıl hazırlanırsın, sınırların ve izinlerin nerede durur.',
 cover_foot='<b>ebru-cakmakk.github.io</b><br>ebbylumi@proton.me',
 body='''
<section>
<p class="kick">Hoş geldin</p>
<h2>Bu rehber ne için?</h2>
<p class="lead">Kamera karşısına ilk kez geçecek olsan da, daha önce yüzlerce kez geçmiş olsan da: iyi bir çekim iki kişinin ortak işi. Senin rahatın, kareye en çok yansıyan şey.</p>
<p>Ben hâlâ öğrenciyim ve bu seriyi kurarken öğrenmeye devam ediyorum. Bu yüzden her şeyi olduğu gibi, açık açık yazdım: çekim nasıl ilerliyor, ne hazırlarsın, neye evet ya da hayır dersin. Hepsini okumak zorunda değilsin; ihtiyacın olan bölüme atlayabilirsin.</p>
<div class="box"><b>Üç şey her zaman geçerli.</b> Yanında istediğin bir kişiyi getirebilirsin. Ne çekilip ne çekilmeyeceğine önceden birlikte karar veriyoruz. İstediğin an durdurabilirsin.</div>
</section>

<section>
<p class="kick">Süreç</p>
<h2>Çekim nasıl ilerliyor?</h2>
<ol class="steps">
<li><b>Yazışma.</b> Sitedeki formu doldurursun ya da e-posta atarsın. Hepsi isteğe bağlı; doldurduğun kadarı yeter.</li>
<li><b>Tanışma.</b> Kısa bir görüşme yaparız; istersen halka açık bir yerde (kafe gibi) yüz yüze de olabilir. Birbirimizi tanımadan çekime başlamak zorunda değiliz.</li>
<li><b>Plan.</b> Referans görsellerle birlikte net bir fikir paylaşırım. Tarih, saat ve mekân yazılı olarak gelir. Sürpriz yok.</li>
<li><b>İzin formu.</b> Yazılı izin formunu (model release) çekimden <u>önce</u> birlikte okuyup imzalarız. Çekim sırasında ya da sonrasında imza istenmez.</li>
<li><b>Çekim günü.</b> 1–2 saat sürer. Müziği, temposu ve molaları birlikte ayarlarız.</li>
<li><b>Seçki ve onay.</b> 7–10 gün içinde seçilmiş ve renklenmiş kareleri yüksek çözünürlükte gönderirim. Hangi karelerin yayınlanacağını sen onaylarsın.</li>
</ol>
</section>

<section class="pb">
<p class="kick">Hazırlık</p>
<h2>Çekimden önceki günler</h2>
<ul class="dot">
<li><b>Uyku ve su.</b> Çekimden önceki gece iyi uyumak ve gün boyu su içmek yüze ve enerjiye en çok yansıyan iki şeydir.</li>
<li><b>Yeni bir şey deneme.</b> Yeni saç kesimi, yeni boya, yeni bir cilt ürünü ya da yoğun bir bakım için çekimden birkaç gün önce bir pay bırak. Çekim günü “ilk kez” denemelerin günü değil.</li>
<li><b>İzleri düşün.</b> Sıkı iç çamaşırı, çorap lastiği ve dar pantolon deride iz bırakır. Çekimden birkaç saat önce rahat kıyafetler giy.</li>
<li><b>Referansları bak.</b> Sana gönderdiğim görselleri bir kez gözden geçir; beğenmediğin ya da çekinceli olduğun bir şey varsa çekimden önce söyle, değiştiririz.</li>
<li><b>Programı yaz.</b> Yer, saat ve ulaşım planını bir yere not et. Ulaşım için biraz erken çık.</li>
<li><b>Birine haber ver.</b> Nereye, kiminle ve ne zaman gittiğini güvendiğin birine söyle. Canlı konum paylaşmak da iyi bir alışkanlık.</li>
</ul>
</section>

<section>
<p class="kick">Çanta</p>
<h2>Çekim günü çantan</h2>
<div class="two">
<div><ul class="chk">
<li>Su ve küçük bir atıştırmalık</li>
<li>2–3 kıyafet seçeneği (yedekle)</li>
<li>Ayakkabı seçenekleri; doğa için rahat bir çift</li>
<li>Hırka, şal ya da ince bir mont</li>
<li>Telefon şarjı / powerbank</li>
</ul></div>
<div><ul class="chk">
<li>Tarak, dudak balmı, küçük bir ayna</li>
<li>Güneş kremi; doğa için böcek spreyi</li>
<li>Müzik listesi (çalmak istediğin şarkılar)</li>
<li>Varsa kendi aksesuarların</li>
<li>Çekime eşlik edecek kişi, isterse</li>
</ul></div>
</div>
</section>

<section class="pb">
<p class="kick">Kıyafet</p>
<h2>Ne giymeli?</h2>
<p>Doğru kıyafet seni “iyi göstermekten” çok, rahat ettirmeli. Rahat olduğun kıyafet kareye de öyle yansıyor.</p>
<h3>Renk ve doku</h3>
<p>Doğa çekimlerinde toprak, krem, yeşil, kahve ve sönük mavi tonlar çevreyle uyum kurar. Parlak ve yazılı kıyafetler (logolar, sloganlar) gözü kareden koparır. Doku konuşur: keten, yün, pamuk, ipek ya da hareketle akan kumaşlar özellikle iyi çalışır.</p>
<div class="sw"><i style="background:#18230F"></i><i style="background:#255F38"></i><i style="background:#8a8f5c"></i><i style="background:#b9a27a"></i><i style="background:#6b4f3a"></i><i style="background:#F1EEE3;border:.3mm solid #cfcbb9"></i></div>
<h3>Hareket edebilmen için</h3>
<p>Çömelip yürüyüp dönebileceğin, rüzgârda uçuşabilecek parçalar seç. Yanına en az bir “güvenli” kıyafet al: içinde kendini en çok sen hissettiğin parça. Çekimi onunla başlatmak ısınmayı kolaylaştırır.</p>
<h3>Saç, makyaj, cilt</h3>
<p>Makyaj tamamen senin tercihin; yok ya da çok az olması da kareye yakışır. Saçını çekim günü nasıl bırakacağını önceden konuşabiliriz. Çekim öncesi yeni bir şey denemekten kaçın, günlük halinle gel.</p>
</section>

<section>
<p class="kick">Kamera karşısında</p>
<h2>Poz değil, niyet</h2>
<p>“Nasıl durmalıyım?” sorusunun cevabı çoğu zaman bir şeyi yapıyor olmak: yürümek, bir şeye bakmak, bir şeyi dinlemek. Hareketin bir sebebi olduğunda beden kendiliğinden rahatlıyor.</p>
<ul class="dot">
<li><b>Nefes ver.</b> Omuzların kulaklarına çıkmışsa bırak. Her yeni kareden önce derin bir nefes.</li>
<li><b>Ellerine görev ver.</b> Saçına, kumaşa, yanındaki bir yaprağa dokunmak elleri doğal yapar.</li>
<li><b>Gözünü oynat.</b> Kameraya bakmak zorunda değilsin. Uzağa bak, aşağı bak, gözlerini kapatıp aç.</li>
<li><b>Yavaşla.</b> Yavaş hareket, hem kareyi netleştirir hem seni sakinleştirir.</li>
<li><b>Mükemmel olmaya çalışma.</b> En iyi kareler çoğu zaman iki pozun arasında çıkıyor.</li>
</ul>
<h3>Çekimde söyleyebileceklerin</h3>
<div class="say">
<p>“Bir mola alabilir miyiz?”</p>
<p>“Bunu denemek istemiyorum.”</p>
<p>“Önce bir örnek gösterir misin?”</p>
<p>“Karelere bakabilir miyim?”</p>
</div>
<p class="small">Bunların hiçbiri için açıklama yapman gerekmiyor.</p>
</section>

<section class="pb">
<p class="kick">Çekim günü</p>
<h2>Örnek bir akış (1,5 saat)</h2>
<table>
<tr><th>Zaman</th><th>Ne oluyor</th></tr>
<tr><td class="t">0:00</td><td>Buluşma, su, kısa sohbet. Planı ve referansları birlikte gözden geçiriyoruz.</td></tr>
<tr><td class="t">0:10</td><td>Isınma kareleri: sadece yürüyorsun, ben deniyorum. Bu kareler çoğu zaman sürpriz olur.</td></tr>
<tr><td class="t">0:25</td><td>Birinci görünüm / birinci mekân.</td></tr>
<tr><td class="t">0:55</td><td>Mola: su, atıştırmalık, kıyafet değişimi (özel bir köşede, gerekirse örtüyle).</td></tr>
<tr><td class="t">1:05</td><td>İkinci görünüm. Burada daha serbest ve denemeye açık davranırız.</td></tr>
<tr><td class="t">1:25</td><td>Kapanış: birkaç kareye birlikte bakarız, sonraki adımı konuşuruz.</td></tr>
</table>
<p class="small">Hava ve ışığa göre akış değişebilir. Dış mekân çekimlerinde yağmur ya da kötü hava için yedek tarih konuşuruz.</p>
</section>

<section>
<p class="kick">Güvenlik</p>
<h2>Kendini güvende hissetmen için</h2>
<p>İyi bir çekim, güvende hissettiğin bir çekimdir. Bu, benimle çalışırken de, başka biriyle çalışırken de geçerli olan birkaç alışkanlık:</p>
<ul class="dot">
<li><b>Yanında biri olabilir.</b> Bir arkadaşını ya da yakınını getirmek normaldir. Bunu sana zor gösteren biriyle çalışma.</li>
<li><b>İlk buluşma halka açık olsun.</b> Kafe gibi yerler ilk tanışma için iyi bir seçenek.</li>
<li><b>Her şey yazılı olsun.</b> Yer, saat, süre, ne çekileceği, karşılığı ve fotoğrafların kullanımı yazılı olarak netleşmeli.</li>
<li><b>Çekim anında karar vermek zorunda değilsin.</b> Baskı hissettiren bir istek olursa “sonra konuşalım” demek hakkın.</li>
<li><b>Hassas bilgileri düşünerek paylaş.</b> Kimlik numarası, banka bilgisi gibi şeyleri yalnızca gerçekten gerektiğinde ve nedenini anlayarak ver.</li>
<li><b>İçgüdülerine güven.</b> Bir şey ters gelirse çekimi durdurmak ya da hiç başlamamak her zaman bir seçenektir.</li>
</ul>
<div class="box"><b>18 yaş altı için:</b> veli onayı ve velinin çekimde bulunması zorunlu. Bu bir kural değil, bir güvence.</div>
</section>

<section class="pb">
<p class="kick">İzinler</p>
<h2>Fotoğraflarının kullanımı</h2>
<p>Bir fotoğrafta yüzün göründüğünde bu bir kişisel veridir. Türkiye’de kişisel verinin yayınlanması için çoğu durumda açık rıza gerekir; bu rıza belirli bir konuya, belirli bir amaca ilişkin olmalı ve istediğin zaman geri çekebilmelisin. Ben de bu yüzden her çekimde yazılı izin formu kullanıyorum ve kare kare onay vermene izin veriyorum.</p>
<h3>Çekimden önce şunları netleştiririz</h3>
<table>
<tr><th>Konu</th><th>Seçeneklerin</th></tr>
<tr><td class="t" style="white-space:normal;width:38mm">Nerede görünür?</td><td>Portfolyo sitesi · Instagram / TikTok · sergi ya da basılı iş · yalnızca seninle paylaşılsın</td></tr>
<tr><td class="t" style="white-space:normal">Yüzün</td><td>Görünebilir · bazı kareler yüzsüz ya da kısmi · yüzün hiç görünmesin</td></tr>
<tr><td class="t" style="white-space:normal">Adın</td><td>Hesabın etiketlensin · adınla anılsın, etiketsiz · isimsiz yayın</td></tr>
<tr><td class="t" style="white-space:normal">Yayından önce</td><td>Seçilen kareleri görüp onaylamak · sadece haber almak · gerek yok</td></tr>
<tr><td class="t" style="white-space:normal">Karşılığı</td><td>Karşılıklı portfolyo çalışması (TFP) · ücret görüşmesi · henüz bilmiyorum</td></tr>
</table>
<div class="box"><b>TFP ne demek?</b> “Time for prints”: sen zamanını veriyorsun, karşılığında kareleri kendi portfolyonda kullanıyorsun; ben de kendi arşivimde. Şu aşamada çoğu çekim böyle. Ticari işler için ayrı konuşuruz.</div>
<p>Fikrini değiştirirsen, yayınlanmış bir kareyi kaldırmamı istemen yeterli: bana yaz. Ham dosyalar kimseyle paylaşılmaz.</p>
</section>

<section class="pb">
<p class="kick">Okul projeleri</p>
<h2>Gönüllü katılım (isteğe bağlı)</h2>
<p class="lead">Model olarak çalışmanın yanı sıra, bir öğrenci olarak okul projelerim için de kamera önünde ya da arkasında yardım edecek kişilere ihtiyaç duyuyorum. Bu tamamen gönüllülüğe bağlı ve katkın için gerçekten minnettar olurum.</p>
<div class="box"><b>Hayır demek serbest.</b> Okul projesine katılmak istemezsen bu, model çekimlerini ya da başvurunu hiçbir şekilde etkilemez. Evet dedikten sonra da vazgeçebilirsin.</div>
<h3>Model çekiminden farkı ne?</h3>
<table>
<tr><th></th><th>Model çekimi</th><th>Okul projesi</th></tr>
<tr><td class="t" style="white-space:normal">Amaç</td><td>Portfolyo çalışması (TFP)</td><td>Ders kapsamında bir proje; öğretmen ya da jüri değerlendirir</td></tr>
<tr><td class="t" style="white-space:normal">Karşılığı</td><td>Kareler, karşılıklı</td><td>Ücret yok; istersen jenerikte ya da teşekkürlerde adın ve çalışmanın bir kopyası</td></tr>
<tr><td class="t" style="white-space:normal">Kimler görür</td><td>Seçtiğin yayın alanları</td><td>Okulda öğretmen ve jüri; gösterim kapsamını birlikte belirleriz</td></tr>
<tr><td class="t" style="white-space:normal">Süre</td><td>1–2 saat</td><td>Projeye göre; baştan konuşulur</td></tr>
</table>
<h3>Katılmadan önce şunları netleştiririz</h3>
<ul class="dot">
<li><b>Proje ve beklenti.</b> Konusu ve senden ne beklendiği (rol, sahne, yardım edeceğin iş).</li>
<li><b>Plan.</b> Süre, tarih ve mekân yazılı olarak.</li>
<li><b>Gösterim.</b> Çalışmanın yalnızca okul içinde mi, yoksa festival, sergi ya da çevrimiçi de mi gösterilebileceği. Okul dışı gösterim için ayrıca izin sorulur.</li>
<li><b>Jenerik.</b> Adınla mı, takma adınla mı yoksa isimsiz mi yer almak istediğin.</li>
<li><b>Yazılı izin.</b> Görüntülerin kullanımı için izin formu burada da çekimden <u>önce</u> birlikte okunup imzalanır.</li>
<li><b>Onay.</b> Hangi görüntülerin kullanılacağını görüp onaylama hakkın burada da geçerli; teslim tarihlerini birlikte planlarız.</li>
</ul>
<div class="box"><b>Güvenlik ve sınırlar aynen geçerli.</b> Yanında biri olabilir, ne yapılıp yapılmayacağı baştan konuşulur, istediğin an durdurabilirsin. 18 yaş altı için veli onayı ve velinin çekimde bulunması zorunlu.</div>
</section>

<section>
<p class="kick">Sık sorulanlar</p>
<h2>Aklına takılabilecekler</h2>
<h3>Hiç deneyimim yok, sorun olur mu?</h3>
<p>Olmaz. İlk kez kamera karşısına geçenlerle çalışmayı seviyorum; çoğu zaman en dürüst kareler oradan çıkıyor.</p>
<h3>“Fotojenik” değilim.</h3>
<p>Fotojenik olmak çoğu zaman rahat olmak demek. Işığı, açıyı ve zamanı ben ayarlıyorum; sen sadece orada ol.</p>
<h3>Bir kareyi sevmezsem?</h3>
<p>Söylemen yeterli. Sevmediğin kareler yayınlanmaz.</p>
<h3>Ne kadar süre alır?</h3>
<p>Çekimin kendisi 1–2 saat. Seçilmiş kareler 7–10 gün içinde sana ulaşır.</p>
</section>

<div class="end">
<h2>Hazırsan yazalım</h2>
<p>Siteden formu doldurabilirsin: <b>ebru-cakmakk.github.io/#modeller</b></p>
<p>Ya da doğrudan e-posta: <b>ebbylumi@proton.me</b></p>
<p style="margin-top:3mm;font-size:8pt;color:#9fb8a8">Bu rehber bilgilendirme amaçlıdır; hukuki metin değildir. Çekim öncesi imzalanan yazılı izin formu esastır.</p>
</div>
''')

EN = dict(
 lang='en', title='Preparing to Model',
 cover_k='Z. Ebru Çakmak · Photography & Video', cover_h='Preparing<br>to Model',
 cover_sub='Everything you might want to know before stepping in front of the camera: how we work, how to prepare, and where your boundaries and permissions stand.',
 cover_foot='<b>ebru-cakmakk.github.io</b><br>ebbylumi@proton.me',
 body='''
<section>
<p class="kick">Welcome</p>
<h2>What is this guide for?</h2>
<p class="lead">Whether it is your first time in front of a camera or your hundredth, a good shoot is made by two people. Your ease is what shows most in the frame.</p>
<p>I am still a student, and I keep learning while building this series. So I have written everything plainly: how a shoot runs, what to prepare, and what you can say yes or no to. You do not have to read it all; jump to the part you need.</p>
<div class="box"><b>Three things always hold.</b> You can bring someone with you. We agree in advance on what will and will not be shot. You can stop at any moment.</div>
</section>

<section>
<p class="kick">The process</p>
<h2>How does a shoot work?</h2>
<ol class="steps">
<li><b>Writing.</b> You fill in the form on the site or send an email. Everything is optional; as much as you like is enough.</li>
<li><b>Meeting.</b> We have a short call; if you prefer, we can meet somewhere public, like a café. You never have to start a shoot with someone you have not met.</li>
<li><b>Plan.</b> I share a clear idea with reference images. Date, time and location come in writing. No surprises.</li>
<li><b>Release form.</b> We read and sign the written model release <u>before</u> the shoot together. Nobody asks for a signature on set or afterwards.</li>
<li><b>Shoot day.</b> It takes 1–2 hours. We set the music, pace and breaks together.</li>
<li><b>Selection and approval.</b> Within 7–10 days I send the selected, colour-graded frames in high resolution. You approve which frames get published.</li>
</ol>
</section>

<section class="pb">
<p class="kick">Preparation</p>
<h2>The days before</h2>
<ul class="dot">
<li><b>Sleep and water.</b> A good night’s sleep and plenty of water through the day show in your face and energy more than anything else.</li>
<li><b>Skip new experiments.</b> Leave a few days between the shoot and a new haircut, colour, skin product or intensive treatment. Shoot day is not the day for firsts.</li>
<li><b>Mind the marks.</b> Tight underwear, sock elastic and snug trousers can leave marks. Wear loose clothes in the hours before.</li>
<li><b>Look at the references.</b> Go through the images I send once; if something does not feel right, tell me before the shoot and we will change it.</li>
<li><b>Write down the plan.</b> Note the place, time and travel in one spot. Leave a little early.</li>
<li><b>Tell someone.</b> Let someone you trust know where you are going, with whom, and when. Sharing your live location is a good habit.</li>
</ul>
</section>

<section>
<p class="kick">Your bag</p>
<h2>What to bring</h2>
<div class="two">
<div><ul class="chk">
<li>Water and a small snack</li>
<li>2–3 outfit options (a spare)</li>
<li>Shoe options; comfortable ones for nature</li>
<li>A cardigan, shawl or light jacket</li>
<li>Phone charger / power bank</li>
</ul></div>
<div><ul class="chk">
<li>Comb, lip balm, small mirror</li>
<li>Sunscreen; insect spray for nature</li>
<li>A playlist of songs you want played</li>
<li>Your own accessories, if any</li>
<li>Someone to accompany you, if you like</li>
</ul></div>
</div>
</section>

<section class="pb">
<p class="kick">Clothing</p>
<h2>What to wear</h2>
<p>The right outfit should make you comfortable more than make you look good. What feels right to you shows in the frame.</p>
<h3>Colour and texture</h3>
<p>For nature shoots, earth, cream, green, brown and muted blue tones sit well with the surroundings. Bright colours and printed text (logos, slogans) pull the eye out of the frame. Texture speaks: linen, wool, cotton, silk or fabrics that flow with movement work especially well.</p>
<div class="sw"><i style="background:#18230F"></i><i style="background:#255F38"></i><i style="background:#8a8f5c"></i><i style="background:#b9a27a"></i><i style="background:#6b4f3a"></i><i style="background:#F1EEE3;border:.3mm solid #cfcbb9"></i></div>
<h3>So that you can move</h3>
<p>Choose pieces you can crouch, walk and turn in, and that can lift in the wind. Bring at least one “safe” outfit: the piece you feel most yourself in. Starting with it makes warming up easier.</p>
<h3>Hair, makeup, skin</h3>
<p>Makeup is entirely your choice; little or none suits the frame too. We can talk in advance about how to leave your hair. Avoid trying something new beforehand and come as your everyday self.</p>
</section>

<section>
<p class="kick">In front of the camera</p>
<h2>Intention, not posing</h2>
<p>The answer to “how should I stand?” is often to be doing something: walking, looking at something, listening for something. When movement has a reason, the body relaxes on its own.</p>
<ul class="dot">
<li><b>Breathe out.</b> If your shoulders have crept up to your ears, let them go. Take a deep breath before each new frame.</li>
<li><b>Give your hands a task.</b> Touching your hair, the fabric, a leaf nearby makes hands look natural.</li>
<li><b>Move your eyes.</b> You do not have to look into the lens. Look far, look down, close your eyes and open them.</li>
<li><b>Slow down.</b> Slow movement sharpens the frame and settles you.</li>
<li><b>Do not try to be perfect.</b> The best frames often appear between two poses.</li>
</ul>
<h3>Things you can say on set</h3>
<div class="say">
<p>“Can we take a break?”</p>
<p>“I’d rather not try that.”</p>
<p>“Could you show me an example first?”</p>
<p>“Can I look at the frames?”</p>
</div>
<p class="small">You never need to explain any of these.</p>
</section>

<section class="pb">
<p class="kick">Shoot day</p>
<h2>A sample flow (1.5 hours)</h2>
<table>
<tr><th>Time</th><th>What happens</th></tr>
<tr><td class="t">0:00</td><td>Meeting, water, a short chat. We go over the plan and references together.</td></tr>
<tr><td class="t">0:10</td><td>Warm-up frames: you just walk, I experiment. These often turn out to be the surprises.</td></tr>
<tr><td class="t">0:25</td><td>First look / first location.</td></tr>
<tr><td class="t">0:55</td><td>Break: water, a snack, outfit change (in a private corner, with a cover if needed).</td></tr>
<tr><td class="t">1:05</td><td>Second look. Here we are freer and more open to trying things.</td></tr>
<tr><td class="t">1:25</td><td>Closing: we look at a few frames together and talk about next steps.</td></tr>
</table>
<p class="small">The flow can change with weather and light. For outdoor shoots we agree on a backup date in case of rain or bad weather.</p>
</section>

<section>
<p class="kick">Safety</p>
<h2>So that you feel safe</h2>
<p>A good shoot is one where you feel safe. These habits apply when working with me and with anyone else:</p>
<ul class="dot">
<li><b>Someone can be with you.</b> Bringing a friend or relative is normal. Do not work with anyone who makes this difficult.</li>
<li><b>Meet somewhere public first.</b> A café is a good choice for a first meeting.</li>
<li><b>Keep everything in writing.</b> Place, time, length, what will be shot, the exchange and how the photographs are used should all be clear in writing.</li>
<li><b>You do not have to decide on the spot.</b> If a request feels pressuring, “let’s talk later” is your right.</li>
<li><b>Share sensitive details thoughtfully.</b> Give ID numbers, bank details and the like only when truly needed and when you understand why.</li>
<li><b>Trust your instincts.</b> If something feels off, stopping the shoot or never starting it is always an option.</li>
</ul>
<div class="box"><b>If you are under 18:</b> a guardian’s consent and presence on set are required. It is not a hurdle; it is a safeguard.</div>
</section>

<section class="pb">
<p class="kick">Permissions</p>
<h2>How your photographs are used</h2>
<p>When your face appears in a photograph, it is personal data. In Turkey, publishing personal data generally requires explicit consent, which must be tied to a specific subject and purpose, and which you can withdraw. That is why I use a written release for every shoot and let you approve frames one by one.</p>
<h3>We settle these before the shoot</h3>
<table>
<tr><th>Topic</th><th>Your options</th></tr>
<tr><td class="t" style="white-space:normal;width:38mm">Where it appears</td><td>Portfolio website · Instagram / TikTok · exhibitions or print · shared only with you</td></tr>
<tr><td class="t" style="white-space:normal">Your face</td><td>Visible · some frames faceless or partial · never visible</td></tr>
<tr><td class="t" style="white-space:normal">Your name</td><td>Account tagged · named without a tag · no name</td></tr>
<tr><td class="t" style="white-space:normal">Before publishing</td><td>See and approve the selected frames · just be told · no need</td></tr>
<tr><td class="t" style="white-space:normal">The exchange</td><td>Portfolio exchange (TFP) · a fee discussion · not sure yet</td></tr>
</table>
<div class="box"><b>What does TFP mean?</b> “Time for prints”: you give your time, and in return you use the frames in your own portfolio; I use them in mine. At this stage most shoots work this way. Commercial work is discussed separately.</div>
<p>If you change your mind, just ask me to take a published frame down: write to me. Raw files are never shared with anyone.</p>
</section>

<section class="pb">
<p class="kick">School projects</p>
<h2>Volunteering (optional)</h2>
<p class="lead">Besides working as a model, as a student I also need people to help in front of or behind the camera for my school projects. This is entirely voluntary, and I would be truly grateful for your help.</p>
<div class="box"><b>Saying no is fine.</b> If you do not want to join a school project, it does not affect your model shoots or your application in any way. And even after saying yes, you can step back.</div>
<h3>How is it different from a model shoot?</h3>
<table>
<tr><th></th><th>Model shoot</th><th>School project</th></tr>
<tr><td class="t" style="white-space:normal">Purpose</td><td>Portfolio work (TFP)</td><td>A project for a course; a teacher or jury assesses it</td></tr>
<tr><td class="t" style="white-space:normal">In return</td><td>Frames, mutually</td><td>No fee; if you like, your name in the credits or thanks and a copy of the work</td></tr>
<tr><td class="t" style="white-space:normal">Who sees it</td><td>The places you choose</td><td>Teacher and jury at school; we set the scope of screening together</td></tr>
<tr><td class="t" style="white-space:normal">Length</td><td>1–2 hours</td><td>Depends on the project; agreed up front</td></tr>
</table>
<h3>What we settle before you join</h3>
<ul class="dot">
<li><b>Project and expectations.</b> The subject and what is asked of you (role, scene, the work you would help with).</li>
<li><b>Plan.</b> Length, date and location in writing.</li>
<li><b>Screening.</b> Whether the work is shown only within school, or also at festivals, exhibitions or online. Showing it outside school needs your separate permission.</li>
<li><b>Credits.</b> Whether you would like to appear under your name, a nickname or anonymously.</li>
<li><b>Written permission.</b> The release for how footage is used is read and signed together <u>before</u> the shoot here too.</li>
<li><b>Approval.</b> Your right to see and approve which footage is used applies here as well; we plan delivery dates together.</li>
</ul>
<div class="box"><b>Safety and boundaries apply exactly the same.</b> Someone can be with you, what will and will not happen is discussed first, and you can stop at any moment. If you are under 18, a guardian’s consent and presence on set are required.</div>
</section>

<section>
<p class="kick">Common questions</p>
<h2>What might be on your mind</h2>
<h3>I have no experience. Is that a problem?</h3>
<p>No. I like working with people facing a camera for the first time; the most honest frames often come from there.</p>
<h3>I’m not “photogenic”.</h3>
<p>Being photogenic usually means being at ease. I take care of light, angle and timing; you just need to be there.</p>
<h3>What if I dislike a frame?</h3>
<p>Just say so. Frames you do not like are not published.</p>
<h3>How long does it take?</h3>
<p>The shoot itself is 1–2 hours. The selected frames reach you within 7–10 days.</p>
</section>

<div class="end">
<h2>Ready? Let’s write</h2>
<p>You can fill in the form on the site: <b>ebru-cakmakk.github.io/#modeller</b></p>
<p>Or email directly: <b>ebbylumi@proton.me</b></p>
<p style="margin-top:3mm;font-size:8pt;color:#9fb8a8">This guide is for information only and is not a legal document. The written release signed before the shoot is what counts.</p>
</div>
''')

def build(D, out):
    html = f'''<!doctype html><html lang="{D['lang']}"><head><meta charset="utf-8"><title>{D['title']}</title>
<style>{CSS}</style></head><body>
<div class="cover"><div class="k">{D['cover_k']}</div><h1>{D['cover_h']}</h1><div class="sub">{D['cover_sub']}</div><div class="rule"></div><div class="foot">{D['cover_foot']}</div></div>
{D['body']}
</body></html>'''
    HTML(string=html, base_url=HERE).write_pdf(out)

build(TR, os.path.join(OUT, 'Modellige-Hazirlik.pdf'))
build(EN, os.path.join(OUT, 'Preparing-to-Model.pdf'))
print('ok')
