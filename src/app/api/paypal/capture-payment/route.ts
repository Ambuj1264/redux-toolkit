// app/api/paypal/capture-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dbConnect from '@/app/api/lib/mongodb';
import Payment from '@/app/api/model/payment'; 

export async function POST(req: NextRequest) {
  const { orderId } = await req.json();

  try {
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID as string,
          password: process.env.PAYPAL_SECRET as string,
        },
      }
    );

    const { id, status, purchase_units } = response.data;
    const amount = purchase_units[0].amount.value;
    const currency = purchase_units[0].amount.currency_code;

    await dbConnect();
    const payment = new Payment({
      amount,
      currency,
      transactionId: id,
      status,
    });
    await payment.save();

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
