// types/receipt.ts
export interface ReceiptItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface CustomerInfo {
  fullName: string
  phone: string
  email: string
  address: string
}

export interface BankDetails {
  id: string
  name: string
  logo: string
  accountNumber: string
  accountName: string
  branch?: string
}

export interface PaymentProof {
  imageUrl: string
  uploadedAt: string
  verified: boolean
  verifiedBy?: string
  verifiedAt?: string
}

export interface BaseReceipt {
  id: string
  orderNumber: string
  customerInfo: CustomerInfo
  items: ReceiptItem[]
  totalAmount: number
  orderDate: string
  status: 'pending_payment' | 'pending_approval' | 'confirmed' | 'completed' | 'cancelled' | 'rejected'
}

export interface ManualPaymentReceipt extends BaseReceipt {
  type: 'manual'
  paymentMethod: 'bank_transfer' | 'telegram' | 'whatsapp'
  bankDetails?: BankDetails
  paymentProof?: PaymentProof
  adminNotes?: string
}

export interface TelebirrReceipt extends BaseReceipt {
  type: 'telebirr'
  transactionId: string
  paymentConfirmed: boolean
  paymentDate: string
}

export type Receipt = ManualPaymentReceipt | TelebirrReceipt