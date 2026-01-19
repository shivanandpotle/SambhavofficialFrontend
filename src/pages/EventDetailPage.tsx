import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Sparkles,
  ScrollText,
  BookOpen,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { DynamicFormRenderer } from "@/components/DynamicFormRenderer";
import { useRazorpay } from "@/hooks/useRazorpay";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { events } = useAdmin();

  const { payForEvent } = useRazorpay(
    import.meta.env.VITE_RAZORPAY_KEY_ID
  );

  const [isRegistering, setIsRegistering] = useState(false);
  const [userAcceptedTerms, setUserAcceptedTerms] = useState(false);

  /* ================= LOADING ================= */
  if (events.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#1a120b] text-[#d4af37]">
        <Sparkles className="animate-pulse h-12 w-12 mr-3" />
        Loading events…
      </div>
    );
  }

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-[#1a120b]">
        <Button onClick={() => navigate("/events")}>
          <ArrowLeft className="mr-2" /> Back to Events
        </Button>
      </div>
    );
  }

  /* ================= SUBMIT & PAYMENT ================= */
  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (!userAcceptedTerms) {
      toast({
        title: "Accept Terms",
        description: "Please accept terms to continue.",
        variant: "destructive",
      });
      return;
    }

    const userEmail = data.email as string;
    const userName = (data.name || "Guest") as string;

    if (!userEmail) {
      toast({
        title: "Email Required",
        description: "Email is required.",
        variant: "destructive",
      });
      return;
    }

    const finalAmount = Math.ceil(event.ticketPrice / 0.9764);

    try {
      const orderRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalAmount }),
        }
      );

      const orderJson = await orderRes.json();

      if (!orderJson.success) {
        toast({
          title: "Payment Error",
          description: "Unable to create order.",
          variant: "destructive",
        });
        return;
      }

      // ✅ CORRECT CALL (THIS FIXES EVERYTHING)
      payForEvent(
        event.title,
        finalAmount,
        { name: userName, email: userEmail },
        orderJson.order.id,
        data
      );

    } catch (err) {
      toast({
        title: "Server Error",
        description: "Unable to initiate payment.",
        variant: "destructive",
      });
    }
  };

  /* ================= UI ================= */
  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#1a120b]">
      <div className="container mx-auto px-4">

        <Button
          onClick={() => navigate("/events")}
          variant="ghost"
          className="mb-6 text-[#d4af37]"
        >
          <ArrowLeft className="mr-2" /> Back to Events
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
              {event.image ? (
                <img
                  src={`/assets/events/${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <ScrollText className="h-20 w-20 text-[#d4af37]/30" />
                </div>
              )}
            </div>

            <h1 className="text-4xl font-bold text-[#d4af37] mb-4">
              {event.title}
            </h1>

            <p className="text-[#f3e5ab] whitespace-pre-line">
              {event.description}
            </p>

            <Button
              asChild
              className="mt-6 bg-[#741b1b] text-[#f3e5ab]"
            >
              <a
                href="https://drive.google.com/drive/folders/1ouQZ2addLpdqgkKYBDkF7FnqAVt26uy7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="mr-2" /> Read Rule Book
              </a>
            </Button>
          </div>

          <div>
            <Card className="sticky top-28 bg-[#f3e5ab]">
              <CardHeader>
                <CardTitle>Register</CardTitle>
              </CardHeader>
              <CardContent>
                {!isRegistering ? (
                  <Button
                    className="w-full"
                    onClick={() => setIsRegistering(true)}
                  >
                    Enlist Now
                  </Button>
                ) : (
                  <>
                    <DynamicFormRenderer
                      fields={event.formFields}
                      onSubmit={handleFormSubmit}
                      submitLabel={
                        userAcceptedTerms
                          ? "Pay & Register"
                          : "Accept Terms to Continue"
                      }
                    />

                    <div className="flex items-center gap-2 mt-4">
                      <Checkbox
                        checked={userAcceptedTerms}
                        onCheckedChange={(v) =>
                          setUserAcceptedTerms(v as boolean)
                        }
                      />
                      <span className="text-sm">
                        I accept terms & conditions
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
