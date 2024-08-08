// components/PayPalButton.tsx
"use client";// components/PayPalButton.tsx
import { useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

interface PayPalButtonProps {
  amount: string;
  currency: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, currency }) => {
  // const [{ isPending }, dispatch] = usePayPalScriptReducer();

  // useEffect(() => {
  //   dispatch({
  //     type: 'resetOptions',
  //     value: {
  //       'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  //       currency,
  //     },
  //   });
  // }, [currency, dispatch]);

  const createOrder = async () => {
    const { data } = await axios.post('/api/paypal/create-order', {
      amount,
      currency,
    });
    return data.id;
  };

  const onApprove = async (data: any) => {
    await axios.post('/api/paypal/capture-payment', {
      orderId: data.orderID,
    });
  };

  return (
    <div>
      {/* {isPending ? <div>Loading...</div> : null} */}
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};

export default PayPalButton;
