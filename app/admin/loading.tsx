import { LoadingScreen } from "@/components/feedback/loading-screen";

export default function AdminLoading() {
  return (
    <LoadingScreen
      title="Admin paneli yukleniyor"
      description="Urunler, siparisler ve yonetim verileri hazirlaniyor."
      tone="admin"
    />
  );
}
