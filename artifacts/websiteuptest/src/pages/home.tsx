import { useState, FormEvent } from "react";
import { useCheckWebsite, useGetRecentChecks, getGetRecentChecksQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Globe, Clock, Server, ArrowRight, Activity, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Link } from "wouter";
import { CheckResponse, LocationResult } from "@workspace/api-client-react/src/generated/api.schemas";

function StatusIndicator({ isUp, large = false }: { isUp: boolean, large?: boolean }) {
  if (isUp) {
    return (
      <div className={`inline-flex items-center justify-center font-bold text-success ${large ? 'text-3xl' : 'text-sm'}`}>
        UP
      </div>
    );
  }
  return (
    <div className={`inline-flex items-center justify-center font-bold text-destructive ${large ? 'text-3xl' : 'text-sm'}`}>
      DOWN
    </div>
  );
}

export default function Home() {
  const [target, setTarget] = useState("");
  const checkMutation = useCheckWebsite();
  
  const { data: recentChecksData } = useGetRecentChecks({
    query: {
      queryKey: getGetRecentChecksQueryKey(),
      refetchInterval: 10000
    }
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!target.trim()) return;
    checkMutation.mutate({ data: { target } });
  };

  const results = checkMutation.data;

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-card border-b py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Activity className="h-4 w-4" />
              <span>Global Availability Checker</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Is it down or <br className="hidden md:block" /> is it just you?
            </h1>
            <p className="text-xl text-muted-foreground">
              Check if a website or IP is online right now from 5 independent global locations. Fast, precise, and completely free.
            </p>

            <form onSubmit={onSubmit} className="mt-8 relative max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter website URL or IP address (e.g., google.com or 8.8.8.8)"
                  className="pl-12 h-14 text-lg rounded-xl shadow-sm border-2 focus-visible:ring-primary/20 bg-background"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  disabled={checkMutation.isPending}
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="h-14 px-8 rounded-xl text-lg font-semibold shadow-md"
                disabled={checkMutation.isPending || !target.trim()}
              >
                {checkMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Checking
                  </span>
                ) : (
                  "Check Now"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {checkMutation.isPending && (
        <section className="py-12 bg-background border-b animate-in fade-in slide-in-from-bottom-4">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="h-10 w-64 bg-muted rounded-md animate-pulse mx-auto" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="animate-pulse shadow-sm">
                    <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                      <div className="h-4 w-20 bg-muted rounded" />
                      <div className="h-10 w-16 bg-muted rounded-full" />
                      <div className="h-3 w-24 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {results && !checkMutation.isPending && (
        <section className="py-12 bg-card border-b animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-8">
              
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">
                  Results for <span className="text-primary">{results.target}</span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-3 ${results.isUp ? 'bg-success/10 border-success/20 text-success' : 'bg-destructive/10 border-destructive/20 text-destructive'}`}>
                    <Activity className="h-6 w-6" />
                    <span className="text-2xl font-bold tracking-tight">
                      {results.isUp ? "UP for everyone" : "DOWN for everyone"}
                    </span>
                  </div>
                  {results.avgResponseTime !== null && results.avgResponseTime !== undefined && (
                    <div className="px-6 py-3 rounded-2xl border-2 bg-muted/50 border-border/50 text-foreground flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-sm text-muted-foreground block leading-none">Avg Response</span>
                        <span className="font-semibold">{results.avgResponseTime.toFixed(0)} ms</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
                {results.locations.map((loc: LocationResult, idx: number) => (
                  <Card key={idx} className="shadow-sm hover:shadow-md transition-shadow border-muted">
                    <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {loc.location}
                      </div>
                      
                      <StatusIndicator isUp={loc.status === 'up'} large />
                      
                      <div className="space-y-1 w-full pt-2 border-t border-border/50">
                        {loc.responseTime > 0 && (
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Time</span>
                            <span className="font-medium">{loc.responseTime} ms</span>
                          </div>
                        )}
                        {loc.statusCode && (
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">HTTP</span>
                            <span className="font-medium">{loc.statusCode}</span>
                          </div>
                        )}
                        {loc.status === 'timeout' && (
                          <div className="text-xs text-destructive font-medium">Timeout</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Recent Checks Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Globe className="h-6 w-6 text-muted-foreground" />
                25 Recently Checked
              </h3>
            </div>
            
            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/30 text-sm font-medium text-muted-foreground">
                <div className="col-span-5 md:col-span-6">Target</div>
                <div className="col-span-3 md:col-span-2 text-center">Status</div>
                <div className="col-span-4 md:col-span-2 text-right">Response</div>
                <div className="hidden md:block col-span-2 text-right">Checked</div>
              </div>
              
              <div className="divide-y">
                {!recentChecksData?.checks?.length ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No recent checks yet. Be the first!
                  </div>
                ) : (
                  recentChecksData.checks.map((check) => (
                    <div key={check.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/10 transition-colors">
                      <div className="col-span-5 md:col-span-6 flex items-center gap-3 overflow-hidden">
                        <Server className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="font-medium truncate" title={check.target}>
                          {check.target}
                        </span>
                      </div>
                      <div className="col-span-3 md:col-span-2 flex justify-center">
                        <Badge variant={check.isUp ? "default" : "destructive"} className={check.isUp ? "bg-success hover:bg-success/90" : ""}>
                          {check.isUp ? "UP" : "DOWN"}
                        </Badge>
                      </div>
                      <div className="col-span-4 md:col-span-2 text-right text-sm font-medium">
                        {check.avgResponseTime ? `${check.avgResponseTime.toFixed(0)}ms` : '-'}
                      </div>
                      <div className="hidden md:block col-span-2 text-right text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(check.checkedAt), { addSuffix: true })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Popular Sites */}
      <section className="py-16 bg-muted/30 border-t">
         <div className="container mx-auto px-4 text-center max-w-4xl">
           <h3 className="text-lg font-semibold text-muted-foreground mb-6">Check Popular Services</h3>
           <div className="flex flex-wrap justify-center gap-3">
             {['google', 'youtube', 'facebook', 'twitter', 'netflix', 'github', 'openai', 'discord'].map(site => (
               <Link key={site} href={`/is-${site}-down`} className="px-4 py-2 bg-card border shadow-sm rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5">
                 {site}.com <ArrowRight className="h-3.5 w-3.5 opacity-50" />
               </Link>
             ))}
           </div>
         </div>
      </section>
      
    </div>
  );
}
