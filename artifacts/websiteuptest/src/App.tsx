import { Layout } from "@/components/layout";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import WebsiteStatus from "@/pages/website-status";
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function CatchAllRoute() {
  const [location] = useLocation();
  const match = location.match(/^\/is-(.+)-down\/?$/);
  if (match) {
    return <WebsiteStatus website={match[1]} />;
  }
  return <NotFound />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy-policy" component={Privacy} />
      <Route path="/terms-of-use" component={Terms} />
      <Route component={CatchAllRoute} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
