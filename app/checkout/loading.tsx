import { LoadingScreen } from "@/components/feedback/loading-screen";

export default function CheckoutLoading() {
  return (
    <LoadingScreen
      title="Odeme ekrani hazirlaniyor"
      description="Sepet ve odeme verileri guvenli sekilde yukleniyor."
      tone="store"
    />
  );
}
