import { Activity, Shield, Globe, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="flex-1 bg-background py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
            <Activity className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">About WebsiteUpTest</h1>
          <p className="text-xl text-muted-foreground">
            The precise, reliable way to know if a website is down for everyone or just you.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mt-0 mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" /> Global Testing Infrastructure
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              When a website won't load, the first question is always: "Is it me or them?" 
              WebsiteUpTest answers this definitively by checking website availability from 
              <strong> 5 independent global locations</strong> simultaneously:
            </p>
            <ul className="grid grid-cols-2 gap-3 mt-4 mb-0 not-prose">
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-2 w-2 rounded-full bg-primary" /> New York, USA</li>
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-2 w-2 rounded-full bg-primary" /> London, UK</li>
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-2 w-2 rounded-full bg-primary" /> Singapore</li>
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-2 w-2 rounded-full bg-primary" /> Sydney, Australia</li>
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-2 w-2 rounded-full bg-primary" /> São Paulo, Brazil</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <Zap className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Fast & Free</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We believe basic network diagnostics should be accessible to everyone. Our tool is completely free to use, instant, and requires no registration.
              </p>
            </div>
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <Shield className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">URL & IP Support</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you're a standard user checking a domain name, or a sysadmin debugging a specific IP address, our tool handles both seamlessly.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center pt-8 border-t">
            <h2 className="text-xl font-bold mb-4">Need to get in touch?</h2>
            <p className="text-muted-foreground">
              For support, feedback, or business inquiries, please email us at:
            </p>
            <a href="mailto:contact@websiteuptest.com" className="inline-block mt-4 text-primary font-medium hover:underline">
              contact@websiteuptest.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
