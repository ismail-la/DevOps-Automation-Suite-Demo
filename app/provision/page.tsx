"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Check, Server, Database, Cloud } from "lucide-react";

export default function ProvisionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [provisionStatus, setProvisionStatus] = useState<Record<string, string>>({});

  const handleProvision = async (environment: string) => {
    setIsLoading(true);
    setProvisionStatus({});
    
    // Simulate API call
    try {
      // Simulate steps with delays
      const steps = [
        { name: "terraform_init", label: "Initializing Terraform" },
        { name: "terraform_plan", label: "Planning Infrastructure" },
        { name: "terraform_apply", label: "Applying Infrastructure" },
        { name: "ansible_config", label: "Configuring Servers" },
        { name: "kubernetes_deploy", label: "Deploying Applications" },
      ];
      
      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProvisionStatus(prev => ({ ...prev, [step.name]: step.label + "..." }));
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProvisionStatus(prev => ({ 
        ...prev, 
        complete: `${environment} environment provisioned successfully!` 
      }));
    } catch (error) {
      setProvisionStatus({ error: "Provisioning failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <PageHeader
        title="One-Click Provisioning"
        description="Deploy compliant infrastructure in minutes with our automated provisioning system."
      />

      <div className="mt-8 space-y-6">
        <Tabs defaultValue="development" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="staging">Staging</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
          </TabsList>
          
          {["development", "staging", "production"].map((env) => (
            <TabsContent key={env} value={env} className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5" />
                      {env.charAt(0).toUpperCase() + env.slice(1)} Environment
                    </CardTitle>
                    <CardDescription>
                      Deploy a complete {env} environment with all required services.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Cloud className="h-4 w-4" />
                        <span>Cloud Provider: AWS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span>Database: PostgreSQL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4" />
                        <span>Kubernetes Cluster: EKS</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleProvision(env)} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {!isLoading && "Provision Environment"}
                      {isLoading && "Provisioning..."}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Provisioning Status</CardTitle>
                    <CardDescription>
                      Track the progress of your infrastructure deployment.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(provisionStatus).length === 0 ? (
                        <p className="text-muted-foreground">
                          Click &quot;Provision Environment&quot; to start the deployment process.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {Object.entries(provisionStatus).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2 rounded-md bg-secondary/50 p-2">
                              {key === "complete" ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : key === "error" ? (
                                <span className="text-destructive">⚠️</span>
                              ) : (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              )}
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}