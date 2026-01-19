import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface UserDetails {
  name: string;
  email: string;
}

export const useRazorpay = (key: string) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.Razorpay) {
      setReady(true);
      return;
    }

    if (document.getElementById("razorpay-script")) {
      const check = setInterval(() => {
        if (window.Razorpay) {
          setReady(true);
          clearInterval(check);
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => setReady(true);
    script.onerror = () => {
      console.error("Razorpay SDK failed to load");
      setReady(false);
    };

    document.body.appendChild(script);
  }, []);

  const payForEvent = (
    title: string,
    amount: number,
    user: UserDetails,
    orderId: string,
    formData?: any
  ) => {
    if (!ready || !window.Razorpay) {
      alert("Payment system is still loading. Please wait a moment.");
      return;
    }

    const options = {
      key,
      amount: amount * 100,
      currency: "INR",
      name: "Sambhav",
      description: title,
      order_id: orderId,

      prefill: {
        name: user.name,
        email: user.email,
      },

      handler: async (response: any) => {
        try {
          const verifyRes = await fetch(
            `${import.meta.env.VITE_API_URL}/api/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                eventTitle: title,
                name: user.name,
                email: user.email,
                formData: formData || {},
              }),
            }
          );

          const text = await verifyRes.text();
          const result = text ? JSON.parse(text) : { success: false };

          if (!result.success) {
            alert("Payment verification failed. Please contact support.");
            return;
          }

          console.log("Payment verified. Ticket ID:", result.ticketId);
        } catch (err) {
          console.error("Payment verification error:", err);
          alert("Payment verification failed. Please contact support.");
        }
      },

      modal: {
        ondismiss: () => {
          console.warn("Razorpay checkout closed by user");
        },
      },

      theme: {
        color: "#7c3aed",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return { payForEvent };
};
