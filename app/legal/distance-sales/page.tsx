import { LegalPageShell } from "@/components/legal/legal-page-shell";

const sections = [
  {
    title: "1. Taraflar ve Konu",
    paragraphs: [
      "Isbu Mesafeli Satis Sozlesmesi, 6502 sayili Tuketicinin Korunmasi Hakkinda Kanun ve Mesafeli Sozlesmeler Yonetmeligi uyarinca, BS Furniture ile internet sitesi uzerinden siparis veren tuketici arasinda elektronik ortamda kurulmustur.",
      "Sozlesmenin konusu; tuketicinin, BS Furniture tarafindan satisa sunulan mobilya ve tamamlayici dekorasyon urunlerini satin almasina iliskin taraflarin hak ve yukumluluklerinin belirlenmesidir."
    ]
  },
  {
    title: "2. Siparis ve Odeme Sureci",
    items: [
      "Tuketici, siparis olusturmadan once urunun temel nitelikleri, toplam satis bedeli, teslimat kosullari ve odeme adimlari hakkinda bilgilendirildigini kabul eder.",
      "Siparis onayi, odeme adiminin tamamlanmasi ve ilgili siparis bedelinin tahsil edilebilir olmasi ile kesinlesir.",
      "Odeme, anlasmali sanal POS ve PayTR altyapisi uzerinden guvenli sekilde alinabilir. Kart verileri, BS Furniture sistemlerinde tam kart numarasi olarak saklanmaz."
    ]
  },
  {
    title: "3. Teslimat ve Ifa Yukumlulugu",
    paragraphs: [
      "BS Furniture, siparis konusu urunu yasal sureler icerisinde ve en gec otuz gun icinde tuketiciye veya gosterdigi adresteki kisi ya da kuruluslara teslim etmeyi hedefler. Uretime ozel veya siparise gore hazirlanan urunlerde tahmini termin suresi siparis ekraninda ayrica belirtilir.",
      "Teslimatin lojistik firma, kat teslimi, montaj ihtiyaci veya bolgesel sevkiyat planlamasi gibi nedenlerle farklilik gostermesi halinde, tuketici teslimat planina iliskin ayrintili olarak bilgilendirilir."
    ]
  },
  {
    title: "4. Cayma Hakki",
    paragraphs: [
      "Tuketici, on dort gun icinde herhangi bir gerekce gostermeksizin ve cezai sart odemeksizin cayma hakkina sahiptir. Bu sure, malin tuketiciye veya tuketicinin belirledigi ucuncu kisiye teslim edildigi gun baslar.",
      "Cayma hakkinin kullanilabilmesi icin bildirimin yazili olarak veya kalici veri saklayicisi yoluyla BS Furniture'a iletilmesi gerekir. Bildirimin ersahinethem@gmail.com adresine gonderilmesi yeterlidir."
    ],
    items: [
      "Tuketici, cayma hakkini kullandiginda urunu mutat kullanim sinirlari icinde muhafaza etmekle yukumludur.",
      "Cayma bildiriminin ulasmasindan sonra iade sureci baslatilir ve ilgili mevzuattaki sureler dahilinde bedel iadesi yapilir.",
      "Mobilya urunlerinde kurulum, tasima veya ozel olculendirme sebebiyle iade sureci lojistik planlamaya bagli olarak ayrica organize edilebilir."
    ]
  },
  {
    title: "5. Ayipli Mal ve Sorumluluk",
    paragraphs: [
      "Teslim edilen urunun hasarli, eksik veya ayipli oldugunun tespiti halinde tuketici durumu makul surede BS Furniture'a bildirmelidir. Acik ayiplarin teslim aninda sevk evraki veya kargo gorevlisi nezaretinde tutanak altina alinmasi tavsiye edilir.",
      "Ayipli mal halinde tuketici, mevzuattan dogan secimlik haklarini kullanabilir. BS Furniture, somut olaya gore onarim, degisim, bedel indirimi veya iade sureclerini ilgili mevzuata uygun bicimde yurutur."
    ]
  },
  {
    title: "6. Uygulanacak Hukumler ve Yetki",
    paragraphs: [
      "Bu sozlesmede duzenlenmeyen hallerde 6502 sayili Kanun, Mesafeli Sozlesmeler Yonetmeligi, Turk Borclar Kanunu ve ilgili diger mevzuat hukumleri uygulanir.",
      "Uyusmazliklarda, Ticaret Bakanligi'nca her yil ilan edilen sinirlar dahilinde tuketici hakem heyetleri ve tuketici mahkemeleri gorevlidir."
    ]
  }
] as const;

export default function DistanceSalesPage() {
  return (
    <LegalPageShell
      eyebrow="Yasal Bilgilendirme"
      title="Mesafeli Satis Sozlesmesi"
      intro="Bu sozlesme, BS Furniture uzerinden verilen siparislerde tuketici ile satici arasindaki mesafeli satis iliskisinin temel kurallarini aciklar."
      sections={sections}
    />
  );
}
