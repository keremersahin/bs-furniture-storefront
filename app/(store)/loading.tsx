import { LoadingScreen } from "@/components/feedback/loading-screen";

export default function StoreLoading() {
  return (
    <LoadingScreen
      title="Vitrin hazirlaniyor"
      description="Koleksiyonlar ve urun detaylari veritabanindan yukleniyor."
      tone="store"
    />
  );
}
