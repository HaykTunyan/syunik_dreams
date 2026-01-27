import { NextResponse } from 'next/server';
import { EmailService } from '@/services/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await EmailService.sendContactEmail(body);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
