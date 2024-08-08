// app/api/paypal/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { amount, currency } = await req.json();

  try {
    const response = await axios.post(
      'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount,
            },
          },
        ],
      },
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID as string,
          password: process.env.PAYPAL_SECRET as string,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
