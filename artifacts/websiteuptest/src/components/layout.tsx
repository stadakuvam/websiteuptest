import { Link } from "wouter";
import { Activity } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">WebsiteUpTest</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 opacity-90">
                <Activity className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">WebsiteUpTest</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                A fast, reliable tool that lets anyone check if a website or IP is online right now, tested from 5 independent global locations.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold tracking-tight">Company</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold tracking-tight">Legal</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-use" className="hover:text-foreground transition-colors">Terms of Use</Link></li>
                <li><a href="mailto:contact@websiteuptest.com" className="hover:text-foreground transition-colors">contact@websiteuptest.com</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WebsiteUpTest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
