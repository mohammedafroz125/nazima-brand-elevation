import Layout from "@/components/layout/Layout";
import { useLocation, Link } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const ThankYou = () => {
  const query = useQuery();
  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");

  return (
    <Layout>
      <section className="section-padding bg-brand-cream min-h-[60vh] flex items-center">
        <div className="section-container">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-caption mb-4 block">Payment Successful</span>
            <h1 className="heading-display mb-6">Thank You</h1>
            <p className="text-body mb-2">Your payment has been received.</p>
            {orderId && <p className="text-body">Order ID: <span className="font-medium">{orderId}</span></p>}
            {paymentId && <p className="text-body">Payment ID: <span className="font-medium">{paymentId}</span></p>}
            <div className="mt-8">
              <Link to="/shop" className="btn-hero inline-flex">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ThankYou;
