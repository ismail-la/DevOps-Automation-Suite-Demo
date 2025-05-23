import { Cloud, GitCompare, BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FeatureCard } from "@/components/feature-card";

export default function Home() {
  return (
    <div className="container pb-16 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <PageHeader
          title="DevOps Automation Suite Demo"
          description="Streamline your infrastructure provisioning, CI/CD pipelines, and monitoring with our comprehensive DevOps automation platform."
        />
        
        <div className="my-8 max-w-[750px]">
          <p className="text-muted-foreground">
            Our solution provides a unified interface for managing the entire DevOps lifecycle, 
            from infrastructure provisioning to continuous integration and deployment, 
            with real-time monitoring and alerting capabilities.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="One-Click Provisioning"
          description="Instantly deploy infrastructure using Terraform and Ansible with automated configurations and compliance checks."
          icon={Cloud}
          href="/provision"
          buttonText="Start Provisioning"
        />
        <FeatureCard
          title="CI/CD Pipeline Status"
          description="Monitor and manage your deployment pipelines with real-time status updates and failure notifications."
          icon={GitCompare}
          href="/status"
          buttonText="Check Status"
        />
        <FeatureCard
          title="Monitoring Dashboard"
          description="Visualize system performance, set custom alerts, and receive notifications for critical infrastructure events."
          icon={BarChart3}
          href="/dashboard"
          buttonText="View Metrics"
        />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Why Choose Our DevOps Suite?</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-medium">Automated Infrastructure</h3>
            <p className="text-muted-foreground">
              Deploy compliant, secure infrastructure in minutes instead of days with our 
              Infrastructure as Code templates and approval workflows.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-medium">Continuous Delivery</h3>
            <p className="text-muted-foreground">
              Streamline your deployment process with automated testing, staging, and production 
              rollouts with easy rollback capabilities.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-medium">Intelligent Monitoring</h3>
            <p className="text-muted-foreground">
              Detect and resolve issues before they impact users with predictive analytics 
              and automated remediation workflows.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-medium">Compliance & Security</h3>
            <p className="text-muted-foreground">
              Maintain security and compliance with automated policy enforcement, vulnerability 
              scanning, and audit-ready reporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}