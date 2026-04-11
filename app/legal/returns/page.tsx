import { LegalPageShell } from "@/components/legal/legal-page-shell";

const sections = [
  {
    title: "1. Genel Ilkeler",
    paragraphs: [
      "BS Furniture, tuketici memnuniyetini esas alir ve iade sureclerini 6502 sayili Kanun ile Mesafeli Sozlesmeler Yonetmeligi'ne uygun olarak yurutur.",
      "Tuketici, urunun tesliminden itibaren on dort gun icinde herhangi bir gerekce gostermeksizin cayma hakkini kullanabilir. Cayma talebi ersahinethem@gmail.com adresine e-posta gonderilerek iletilebilir."
    ]
  },
  {
    title: "2. Cayma Hakkinin Kullanimi",
    items: [
      "Cayma hakki bildirimi, on dort gunluk sure dolmadan BS Furniture'a ulasmalidir.",
      "Iade edilecek urun, yeniden satisa uygun halde, varsa tum aksesuar, montaj parcasi ve belgeleriyle birlikte teslim edilmelidir.",
      "Tuketici, urunu mutat kullanim sinirlari icinde inceleyebilir; bu sinirlarin asildigi hallerde urunde olusan deger kaybindan sorumlu olabilir."
    ]
  },
  {
    title: "3. Mobilya Urunlerine Ozel Durumlar",
    paragraphs: [
      "Mobilya urunleri hacimli ve lojistik planlama gerektiren urunler oldugu icin, iade surecinde nakliye ve geri alim organizasyonu ayrica planlanir.",
      "Teslimatta hasar, kirik, yirtik doseme, eksik parca veya uretim kusuru tespit edilirse tuketicinin teslimat aninda veya en kisa surede gorsel ve aciklama ile bildirim yapmasi onemle tavsiye edilir."
    ],
    items: [
      "Hasarli veya kusurlu urunlerde inceleme sonucuna gore onarim, degisim veya iade secenekleri BS Furniture tarafindan tuketiciye sunulur.",
      "Kisisel olcu, ozel renk, ozel doseme veya tuketiciye ozel uretim talepleriyle hazirlanan urunlerde cayma hakki mevzuattaki istisnalar kapsaminda sinirli olabilir.",
      "Kurulumu tamamlanmis, tuketici kusuruyla zarar gormus veya yeniden satisa uygunlugunu kaybetmis urunlerde iade kosullari somut olay bazinda degerlendirilir."
    ]
  },
  {
    title: "4. Bedel Iadesi ve Surec Yonetimi",
    paragraphs: [
      "Iade talebinin kabul edilmesi halinde, urunun geri alinmasi ve kontrolunun tamamlanmasindan sonra ilgili mevzuattaki sureler dahilinde odeme araci uzerinden bedel iadesi yapilir.",
      "Banka veya kart kurulusundan kaynaklanan gecikmeler BS Furniture'in dogrudan sorumlulugu disinda olabilir; ancak surecin takibi konusunda musterimize destek verilir."
    ]
  }
] as const;

export default function ReturnsPage() {
  return (
    <LegalPageShell
      eyebrow="Yasal Bilgilendirme"
      title="Iptal ve Iade Kosullari"
      intro="Siparis iptali, cayma hakki ve mobilya urunlerinde hasar veya kusur halinde izlenecek temel surecler bu sayfada aciklanir."
      sections={sections}
    />
  );
}
