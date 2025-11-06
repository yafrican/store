// types/ticket.ts
export interface CustomerInfo {
  fullName: string
  phone: string
  email: string
  address: string
}

export interface TicketItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

export interface BankDetails {
  name: string
  accountNumber: string
  accountName: string
  branch?: string
}

export interface OrderTicket {
  id: string
  orderNumber: string
  customerInfo: CustomerInfo
  items: TicketItem[]
  totalAmount: number
  paymentMethod: string
  bankDetails?: BankDetails
  timestamp: string
status: string
  paymentProof?: {
    imageUrl: string
    uploadedAt: string
    verified?: boolean
    verifiedBy?: string
    verifiedAt?: string
  }
  adminVerified?: boolean // Add this field
  adminVerifiedAt?: string // Add this field
}