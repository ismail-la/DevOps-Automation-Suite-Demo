import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { environment } = body;

    // Mock data for provisioning response
    const provisioningData = {
      requestId: `prov-${Date.now()}`,
      environment,
      status: "initiated",
      estimatedTimeSeconds: 120,
      timestamp: new Date().toISOString()
    };

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(provisioningData);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}