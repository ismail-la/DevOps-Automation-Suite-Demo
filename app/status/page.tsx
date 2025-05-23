"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, GitCompare, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type StatusData = {
  terraform: string;
  ansible: string;
  kubernetes: string;
  monitoring: string;
};

type PipelineData = {
  id: string;
  name: string;
  status: string;
  branch: string;
  commit: string;
  time: string;
};

const mockPipelines: PipelineData[] = [
  {
    id: "1",
    name: "Frontend CI/CD",
    status: "success",
    branch: "main",
    commit: "f8a23c5",
    time: "10 min ago",
  },
  {
    id: "2",
    name: "Backend API",
    status: "running",
    branch: "develop",
    commit: "7de93b1",
    time: "3 min ago",
  },
  {
    id: "3",
    name: "Database Migration",
    status: "failed",
    branch: "feature/db-schema",
    commit: "2ab67f4",
    time: "1 hour ago",
  },
  {
    id: "4",
    name: "Infrastructure Update",
    status: "pending",
    branch: "main",
    commit: "9c54e2d",
    time: "Just now",
  },
];

export default function StatusPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [pipelines, setPipelines] = useState<PipelineData[]>(mockPipelines);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setStatusData(data);
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ok':
        return <Badge className="bg-green-500">OK</Badge>;
      case 'running':
        return <Badge className="bg-blue-500">Running</Badge>;
      case 'online':
        return <Badge className="bg-green-500">Online</Badge>;
      case 'success':
        return <Badge className="bg-green-500">Success</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <PageHeader
          title="CI/CD Pipeline Status"
          description="Monitor the health and status of your deployment pipelines."
        />
        <Button 
          variant="outline" 
          onClick={fetchData} 
          disabled={isRefreshing} 
          size="sm"
          className="h-9"
        >
          <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="mt-8 space-y-8">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5" />
                  System Status
                </CardTitle>
                <CardDescription>
                  Current status of all DevOps components.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {statusData && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(statusData).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium capitalize">{key}</TableCell>
                          <TableCell>{getStatusBadge(value)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Pipelines</TabsTrigger>
                <TabsTrigger value="success">Success</TabsTrigger>
                <TabsTrigger value="running">Running</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
              
              {["all", "success", "running", "failed"].map((status) => (
                <TabsContent key={status} value={status}>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>
                        {status.charAt(0).toUpperCase() + status.slice(1)} Pipelines
                      </CardTitle>
                      <CardDescription>
                        View and manage your {status === "all" ? "" : status} deployment pipelines.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Pipeline</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Branch</TableHead>
                            <TableHead className="hidden md:table-cell">Commit</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pipelines
                            .filter(pipeline => status === "all" || pipeline.status === status)
                            .map((pipeline) => (
                              <TableRow key={pipeline.id}>
                                <TableCell className="font-medium">{pipeline.name}</TableCell>
                                <TableCell>{getStatusBadge(pipeline.status)}</TableCell>
                                <TableCell className="hidden md:table-cell">{pipeline.branch}</TableCell>
                                <TableCell className="hidden md:table-cell">{pipeline.commit}</TableCell>
                                <TableCell className="text-right">{pipeline.time}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}