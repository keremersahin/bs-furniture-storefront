import { LegalPageShell } from "@/components/legal/legal-page-shell";

const sections = [
  {
    title: "1. Veri Isleme Amaci",
    paragraphs: [
      "BS Furniture, siparis olusturma, odeme onayi, teslimat planlama, iade sureci, musteri iletisim talepleri ve yasal yukumluluklerin yerine getirilmesi amaclariyla sinirli olmak uzere kisisel veri isler.",
      "Islenen veriler; ad soyad, iletisim bilgileri, teslimat adresi, siparis icerigi, odeme surecine iliskin teknik kayitlar ve mevzuatin gerektirdigi diger kayitlarla sinirlidir."
    ]
  },
  {
    title: "2. KVKK Kapsaminda Koruma",
    paragraphs: [
      "BS Furniture, 6698 sayili Kisisel Verilerin Korunmasi Kanunu kapsaminda veri sorumlusu sifatiyla hareket eder ve kisisel verilerin hukuka ve durustluk kurallarina uygun, dogru, guncel ve belirli amaclarla islenmesine dikkat eder.",
      "Kisisel veriler, ilgili mevzuatin ongordugu saklama sureleri boyunca tutulur; bu surelerin sona ermesi veya isleme amacinin ortadan kalkmasi halinde silme, yok etme veya anonimlestirme surecleri uygulanir."
    ]
  },
  {
    title: "3. Odeme Guvenligi ve Teknik Tedbirler",
    items: [
      "Web sitesi uzerindeki odeme sureclerinde 256-bit SSL guvenlik katmani kullanilir.",
      "Sanal POS ve odeme dogrulama surecleri PayTR altyapisi uzerinden yurutulur.",
      "Kart verileri, PCI DSS ve ilgili odeme guvenligi prensipleri dogrultusunda yetkisiz kisilerle paylasilmaz; tam kart verisi BS Furniture tarafinda saklanmaz."
    ]
  },
  {
    title: "4. Veri Aktarimi ve Ilgili Kisi Haklari",
    paragraphs: [
      "Kisisel veriler; siparisin ifasi, yasal yukumluluklerin yerine getirilmesi ve odeme/teslimat sureclerinin yurutulmesi amaclariyla anlasmali odeme kuruluslari, lojistik firmalari ve gerekli resmi mercilerle sinirli olarak paylasilabilir.",
      "Ilgili kisiler, KVKK kapsamindaki basvuru haklarini ersahinethem@gmail.com adresi uzerinden kullanabilir. Basvurular makul surede ve mevzuata uygun sekilde cevaplandirilir."
    ]
  }
] as const;

export default function PrivacySecurityPage() {
  return (
    <LegalPageShell
      eyebrow="Yasal Bilgilendirme"
      title="Gizlilik ve Guvenlik Politikasi"
      intro="Kisisel verilerinizin islenmesi, korunmasi ve odeme guvenligine iliskin temel ilkeler bu sayfada BS Furniture operasyonu ozelinde aciklanir."
      sections={sections}
    />
  );
}
