"use client";

import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Activity, PieChart as PieChartIcon } from "lucide-react";

// Mock data for charts
const performanceData = [
  { name: "00:00", cpu: 45, memory: 30, network: 20 },
  { name: "04:00", cpu: 50, memory: 35, network: 25 },
  { name: "08:00", cpu: 65, memory: 45, network: 35 },
  { name: "12:00", cpu: 85, memory: 60, network: 60 },
  { name: "16:00", cpu: 70, memory: 55, network: 45 },
  { name: "20:00", cpu: 60, memory: 50, network: 30 },
  { name: "24:00", cpu: 45, memory: 35, network: 25 },
];

const deploymentData = [
  { name: "Success", value: 78 },
  { name: "Failed", value: 12 },
  { name: "Cancelled", value: 10 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

const alertsData = [
  { day: "Mon", critical: 2, warning: 5, info: 12 },
  { day: "Tue", critical: 1, warning: 3, info: 8 },
  { day: "Wed", critical: 0, warning: 2, info: 10 },
  { day: "Thu", critical: 3, warning: 6, info: 15 },
  { day: "Fri", critical: 1, warning: 4, info: 9 },
  { day: "Sat", critical: 0, warning: 1, info: 5 },
  { day: "Sun", critical: 0, warning: 0, info: 3 },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <div className="container py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="Monitoring Dashboard"
          description="Real-time visualization of system performance and status."
        />

        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last hour</SelectItem>
            <SelectItem value="6h">Last 6 hours</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.95%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Alert Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Normal</div>
              <p className="text-xs text-muted-foreground">No critical alerts</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="system" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="system">
              <Activity className="mr-2 h-4 w-4" />
              System Performance
            </TabsTrigger>
            <TabsTrigger value="deployments">
              <PieChartIcon className="mr-2 h-4 w-4" />
              Deployments
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <BarChart3 className="mr-2 h-4 w-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>
                  CPU, memory, and network usage over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="cpu" 
                        stroke="hsl(var(--chart-1))" 
                        name="CPU Usage (%)" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="memory" 
                        stroke="hsl(var(--chart-2))" 
                        name="Memory Usage (%)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="network" 
                        stroke="hsl(var(--chart-3))" 
                        name="Network Usage (Mbps)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployments">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Status</CardTitle>
                <CardDescription>
                  Success and failure rates for recent deployments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deploymentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {deploymentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Number of alerts by severity level over the past week.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={alertsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="critical" stackId="a" fill="hsl(var(--destructive))" name="Critical" />
                      <Bar dataKey="warning" stackId="a" fill="hsl(var(--chart-4))" name="Warning" />
                      <Bar dataKey="info" stackId="a" fill="hsl(var(--chart-5))" name="Info" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Integration with External Monitoring Tools</CardTitle>
            <CardDescription>
              Embed external monitoring tools like Grafana or Prometheus dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-muted p-8 text-center">
              <p className="text-muted-foreground">
                External monitoring dashboard integration placeholder. In a production environment, 
                this would be an iframe displaying a Grafana dashboard or other monitoring tool.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}