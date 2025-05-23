export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for dashboard metrics
  const dashboardData = {
    cpu: {
      current: 45,
      average: 52,
      peak: 78,
      history: [42, 45, 50, 55, 60, 58, 52, 48, 45],
    },
    memory: {
      current: 65,
      average: 60,
      peak: 82,
      history: [58, 62, 65, 70, 75, 72, 68, 65, 62],
    },
    disk: {
      current: 72,
      average: 68,
      peak: 75,
      history: [65, 68, 70, 72, 74, 73, 72, 70, 68],
    },
    network: {
      inbound: 25,
      outbound: 18,
      peak: 42,
      history: [20, 22, 28, 35, 42, 38, 30, 25, 22],
    },
  };

  return NextResponse.json(dashboardData);
}
