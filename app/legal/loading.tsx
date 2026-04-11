import { LoadingScreen } from "@/components/feedback/loading-screen";

export default function LegalLoading() {
  return (
    <LoadingScreen
      title="Yasal icerikler yukleniyor"
      description="Sozlesmeler ve politika metinleri ekrana getiriliyor."
      tone="store"
    />
  );
}
