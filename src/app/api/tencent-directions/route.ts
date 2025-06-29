import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const mode = searchParams.get('mode') || 'driving';
  
  if (!from || !to) {
    return NextResponse.json(
      { error: 'Missing required parameters: from, to' },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_TENCENT_MAP_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Tencent Maps API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Construct the Tencent Maps Direction API URL
    const apiUrl = `https://apis.map.qq.com/ws/direction/v1/${mode}/?from=${from}&to=${to}&output=json&key=${apiKey}`;
    
    console.log('Calling Tencent Maps API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Tencent Maps API response:', JSON.stringify(data, null, 2));

    // Check if the API returned an error
    if (data.status !== 0) {
      return NextResponse.json(
        { 
          error: 'Tencent Maps API error', 
          status: data.status,
          message: data.message || 'Unknown error'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Tencent Maps API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch directions from Tencent Maps API' },
      { status: 500 }
    );
  }
} 