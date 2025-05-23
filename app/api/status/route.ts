import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for DevOps tools status
  const statusData = {
    terraform: "OK",
    ansible: "OK",
    kubernetes: "Running",
    monitoring: "Online"
  };

  return NextResponse.json(statusData);
}