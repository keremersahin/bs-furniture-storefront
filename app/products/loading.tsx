import { LoadingScreen } from "@/components/feedback/loading-screen";

export default function ProductsLoading() {
  return (
    <LoadingScreen
      title="Urunler yukleniyor"
      description="Kategori filtreleri ve vitrin urunleri veritabanindan getiriliyor."
      tone="store"
    />
  );
}
