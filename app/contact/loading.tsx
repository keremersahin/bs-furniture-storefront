import { LoadingScreen } from "@/components/feedback/loading-screen";

export default function ContactLoading() {
  return (
    <LoadingScreen
      title="Iletisim sayfasi yukleniyor"
      description="Iletisim bilgileri ve sayfa icerikleri hazirlaniyor."
      tone="store"
    />
  );
}
