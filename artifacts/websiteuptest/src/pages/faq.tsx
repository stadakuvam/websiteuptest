import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "What does WebsiteUpTest check?",
      a: "WebsiteUpTest sends an HTTP or network request to the target URL or IP address you provide. It verifies if the server responds successfully within a reasonable timeframe and records the response time and HTTP status code."
    },
    {
      q: "Why check from multiple locations?",
      a: "The internet is a complex network. A website might be accessible in the US but unreachable in Asia due to local ISP issues, routing problems, or CDN failures. By checking from 5 distinct global locations, we can definitively tell you if a site is completely down or just experiencing regional outages."
    },
    {
      q: "Can I check an IP address?",
      a: "Yes! You can enter either a standard website URL (like https://google.com or simply google.com) or a raw IP address (like 8.8.8.8). Our system will automatically parse and test it."
    },
    {
      q: "Is the website down for everyone or just me?",
      a: "If our tool shows 'UP' across all 5 locations but you still can't access it, the issue is likely on your end (your ISP, DNS cache, router, or browser). If we show 'DOWN', the server itself is experiencing issues."
    },
    {
      q: "How often can I check?",
      a: "You can check as often as you need to. However, to prevent abuse, we do implement standard rate limiting. If you trigger too many checks in a short period, you may be temporarily blocked."
    },
    {
      q: "How accurate are the results?",
      a: "Highly accurate. We run live, real-time tests the moment you click 'Check Now' using our independent server nodes. We don't rely on cached data for active checks."
    },
    {
      q: "Is this service free?",
      a: "Yes, WebsiteUpTest is 100% free to use for manual checking."
    },
    {
      q: "How do I contact support?",
      a: "You can reach us anytime at contact@websiteuptest.com with questions, bug reports, or feature requests."
    }
  ];

  return (
    <div className="flex-1 bg-background py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about how WebsiteUpTest works.
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-2 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
