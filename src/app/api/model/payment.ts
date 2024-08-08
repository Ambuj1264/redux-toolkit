// models/Payment.ts
import mongoose, { Document, Model } from 'mongoose';

interface IPayment extends Document {
  amount: number;
  currency: string;
  transactionId: string;
  status: string;
}

const PaymentSchema = new mongoose.Schema<IPayment>({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
