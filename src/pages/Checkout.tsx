import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Checkout = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(1999); // INR, simulate cart total in test mode
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRazorpay();
  }, []);

  const proceedToPayment = useCallback(async () => {
    try {
      setLoading(true);
      const ok = await loadRazorpay();
      if (!ok) {
        alert("Failed to load Razorpay SDK");
        setLoading(false);
        return;
      }
      let keyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
      if (!keyId) {
        const keyResp = await fetch("/api/public-key").catch(() => undefined);
        const keyData = await (keyResp?.ok ? keyResp.json() : Promise.resolve({}));
        keyId = keyData?.key_id;
        if (!keyId) {
          alert("Missing VITE_RAZORPAY_KEY_ID in frontend environment.");
          setLoading(false);
          return;
        }
      }
      const createResp = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount, 
          currency: "INR",
          customerName: name,
          customerEmail: email,
          productName: "StyledByNazima Fashion Item"
        }),
      });
      const data = await createResp.json().catch(() => ({}));
      if (!createResp.ok) {
        alert(`Order creation failed: ${data?.error || "Unknown error"}`);
        setLoading(false);
        return;
      }
      if (!data.order_id) {
        throw new Error("Order creation failed");
      }

      const options = {
        key: keyId,
        amount: amount * 100,
        currency: "INR",
        name: "StyledByNazima",
        description: "Order Payment",
        order_id: data.order_id,
        prefill: { name, email, contact: phone },
        theme: { color: "#C8A96A" },
        handler: async (response: any) => {
          const verifyResp = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verify = await verifyResp.json();
          if (verify.success) {
            localStorage.removeItem("cart"); // placeholder: clear your cart state if used
            navigate(`/thank-you?order_id=${encodeURIComponent(response.razorpay_order_id)}&payment_id=${encodeURIComponent(response.razorpay_payment_id)}`);
          } else {
            alert("Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      alert("Unable to proceed to payment");
    } finally {
      setLoading(false);
    }
  }, [amount, email, name, navigate, phone]);

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="section-container max-w-xl">
          <div className="mb-8 text-center">
            <span className="text-caption mb-4 block">Secure Checkout</span>
            <h1 className="heading-display">Proceed to Payment</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-body mb-1">Name</label>
              <input className="w-full border border-border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body mb-1">Email</label>
                <input className="w-full border border-border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-body mb-1">Phone</label>
                <input className="w-full border border-border px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-body mb-1">Amount (INR)</label>
              <input
                type="number"
                min={1}
                className="w-full border border-border px-3 py-2"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value || "0", 10))}
              />
              <p className="text-xs text-brand-warm-gray mt-1">Test mode: enter any amount for demo.</p>
            </div>
            <button
              onClick={proceedToPayment}
              disabled={loading || !name || !email || !phone || !amount}
              className="btn-hero inline-flex"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
