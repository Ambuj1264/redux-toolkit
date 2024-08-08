import PayPalButton from '@/components/paymentbutton'
import React from 'react'

const page = ({ amount, currency }: { amount: string; currency: string }) => {
  return (
    <div>
    <h1>PayPal Payment Integration</h1>
    <PayPalButton amount="10.00" currency="USD" />
  </div>
  )
}

export default page
