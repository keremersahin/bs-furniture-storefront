import { PaytrCheckoutForm } from "@/components/checkout/paytr-checkout-form";

export default function CheckoutPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <PaytrCheckoutForm />
      </div>
    </section>
  );
}
