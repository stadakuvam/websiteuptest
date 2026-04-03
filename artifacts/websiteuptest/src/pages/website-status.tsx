import { useEffect } from "react";
import { Link } from "wouter";
import { useCheckWebsite } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Clock, MapPin, ArrowLeft, Globe } from "lucide-react";
import type { LocationResult } from "@workspace/api-client-react";

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

export default function WebsiteStatus({ website }: { website?: string }) {
  const siteName = website || "";
  const target = `${siteName}.com`;
  
  const checkMutation = useCheckWebsite();
  
  useEffect(() => {
    if (website) {
      checkMutation.mutate({ data: { target } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [website]);

  const onRecheck = () => {
    checkMutation.mutate({ data: { target } });
  };

  const results = checkMutation.data;
  const isPending = checkMutation.isPending;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-background">
      
      <section className="bg-card border-b py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to home
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              <Globe className="h-10 w-10 text-primary" />
              Is {target} down?
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Real-time availability status for {target} from 5 global locations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {isPending && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="h-24 w-full bg-muted rounded-2xl animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="animate-pulse shadow-sm">
                      <CardContent className="p-6 flex flex-col items-center space-y-4">
                        <div className="h-4 w-20 bg-muted rounded" />
                        <div className="h-10 w-16 bg-muted rounded-full" />
                        <div className="h-3 w-24 bg-muted rounded" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {results && !isPending && (
              <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className={`p-8 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm ${results.isUp ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}>
                  <div className="flex items-center gap-5 text-center sm:text-left">
                    <div className={`p-4 rounded-full ${results.isUp ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      <Activity className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className={`text-3xl font-bold tracking-tight ${results.isUp ? 'text-success' : 'text-destructive'}`}>
                        {results.isUp ? "UP for everyone" : "DOWN for everyone"}
                      </h2>
                      <p className="text-muted-foreground mt-1 font-medium">
                        Last checked: {new Date(results.checkedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {results.avgResponseTime !== null && results.avgResponseTime !== undefined && (
                      <div className="px-5 py-2.5 rounded-xl bg-background border shadow-sm flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <span className="text-xs text-muted-foreground block leading-none font-medium mb-1">Avg Response</span>
                          <span className="font-bold text-lg leading-none">{results.avgResponseTime.toFixed(0)} ms</span>
                        </div>
                      </div>
                    )}
                    <Button onClick={onRecheck} variant="outline" className="shadow-sm">
                      Check Again
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {results.locations.map((loc: LocationResult, idx: number) => (
                    <Card key={idx} className="shadow-sm border-muted hover:border-primary/30 transition-colors">
                      <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary/70" />
                          {loc.location}
                        </div>
                        
                        <StatusIndicator isUp={loc.status === 'up'} large />
                        
                        <div className="space-y-1.5 w-full pt-3 border-t border-border/60">
                          {loc.responseTime > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Time</span>
                              <span className="font-semibold">{loc.responseTime} ms</span>
                            </div>
                          )}
                          {loc.statusCode && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">HTTP</span>
                              <span className="font-semibold">{loc.statusCode}</span>
                            </div>
                          )}
                          {loc.status === 'timeout' && (
                            <div className="text-sm text-destructive font-semibold">Timeout</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
