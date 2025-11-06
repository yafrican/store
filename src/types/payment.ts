// types/payment.ts
export interface PaymentReceipt {
  _id: string
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  amount: number
  paymentProof: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
  items?: Array<{
    id: string
    name: string
    quantity: number
    price: number
    image: string
  }>
  paymentMethod?: string
  totalAmount?: number
}