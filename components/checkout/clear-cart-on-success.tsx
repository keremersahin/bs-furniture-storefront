"use client";

import { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/stores/cart-store";

type CheckoutStatus = "PENDING" | "PAID" | "FAILED" | "UNKNOWN";

type ClearCartOnSuccessProps = {
  merchantOid?: string;
};

export function ClearCartOnSuccess({ merchantOid }: ClearCartOnSuccessProps) {
  const clearCart = useCartStore((state) => state.clearCart);
  const [status, setStatus] = useState<CheckoutStatus>(merchantOid ? "PENDING" : "UNKNOWN");
  const hasClearedCartRef = useRef(false);

  useEffect(() => {
    if (!merchantOid) {
      setStatus("UNKNOWN");
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const pollOrderStatus = async () => {
      try {
        const response = await fetch(
          `/api/orders/status?merchant_oid=${encodeURIComponent(merchantOid)}`,
          {
            method: "GET",
            cache: "no-store"
          }
        );

        if (!response.ok) {
          throw new Error("Siparis durumu alinamadi.");
        }

        const payload = (await response.json()) as {
          status?: CheckoutStatus;
        };

        if (cancelled) {
          return;
        }

        const nextStatus = payload.status ?? "UNKNOWN";
        setStatus(nextStatus);

        if (nextStatus === "PAID") {
          if (!hasClearedCartRef.current) {
            clearCart();
            hasClearedCartRef.current = true;
          }
          return;
        }

        if (nextStatus === "FAILED" || nextStatus === "UNKNOWN") {
          return;
        }

        timeoutId = setTimeout(pollOrderStatus, 4000);
      } catch {
        if (!cancelled) {
          timeoutId = setTimeout(pollOrderStatus, 4000);
        }
      }
    };

    pollOrderStatus();

    return () => {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [clearCart, merchantOid]);

  if (!merchantOid) {
    return null;
  }

  if (status === "PAID") {
    return (
      <div className="mb-6 rounded-[2rem] border border-emerald-200 bg-emerald-50 px-6 py-5 text-sm text-emerald-800">
        Odeme callback ile dogrulandi. Sepetiniz guvenle temizlendi.
      </div>
    );
  }

  if (status === "FAILED") {
    return (
      <div className="mb-6 rounded-[2rem] border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
        Odeme callback tarafinda basarisiz gorunuyor. Sepetiniz korunuyor; odemeyi yeniden deneyebilirsiniz.
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-800">
      PayTR callback onayi bekleniyor. Sepetiniz, odeme kesinlesmeden temizlenmez.
    </div>
  );
}
