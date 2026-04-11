import { LegalPageShell } from "@/components/legal/legal-page-shell";

const sections = [
  {
    title: "1. Sevkiyat Planlamasi",
    paragraphs: [
      "BS Furniture siparisleri, urunun stok durumu, uretim ihtiyaci, teslimat bolgesi ve lojistik planina gore sevk edilir.",
      "Mobilya urunlerinin hacmi ve tasima sekli nedeniyle teslimat sureleri standart kargoya gore degisebilir. Tahmini termin bilgisi siparis surecinde veya siparis sonrasinda musteriye bildirilir."
    ]
  },
  {
    title: "2. Lojistik ve Kat Teslimi",
    items: [
      "Teslimatlar, anlasmali lojistik veya nakliye firmalari araciligiyla yapilir.",
      "Kat teslimi, bina erisimi, asansor uygunlugu, merdiven boslugu ve tasima kosullari teslimat gunu oncesinde ayrica degerlendirilebilir.",
      "Bazi bolgelerde kurulum, kat teslimi veya oda yerlesimi hizmetleri ek planlama ve ucretlendirmeye tabi olabilir."
    ]
  },
  {
    title: "3. Teslimat Aninda Kontrol",
    paragraphs: [
      "Tuketici veya teslim almaya yetkili kisi, urunu teslim alirken ambalaj, doseme, yuzey ve parca butunlugunu kontrol etmelidir.",
      "Acik hasar veya eksiklik tespit edilmesi halinde, teslimat gorevlisi ile tutanak duzenlenmesi ve durumun ayni gun icinde BS Furniture'a bildirilmesi tavsiye edilir."
    ]
  },
  {
    title: "4. Gecikme ve Mucbir Sebepler",
    paragraphs: [
      "Hava kosullari, bolgesel sevkiyat sinirlari, tedarik sorunlari, uretim gecikmeleri, resmi makam kararlari veya diger mucbir sebep halleri teslimat surelerini etkileyebilir.",
      "Bu tur durumlarda BS Furniture, tuketiciyi makul surede bilgilendirir ve uygun bir yeni teslimat plani olusturmak icin iletisime gecer."
    ]
  }
] as const;

export default function DeliveryPage() {
  return (
    <LegalPageShell
      eyebrow="Yasal Bilgilendirme"
      title="Teslimat Sartlari"
      intro="Mobilya urunlerinin sevkiyat, kat teslimi, lojistik planlama ve teslim anindaki kontrol sureclerine iliskin temel esaslar bu sayfada yer alir."
      sections={sections}
    />
  );
}
