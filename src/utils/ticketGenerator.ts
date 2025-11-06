// utils/ticketGenerator.ts
import { OrderTicket, CustomerInfo, TicketItem, BankDetails } from '../types/ticket'

export class TicketGenerator {
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `YAF${timestamp}${random}`
  }

  generateOrderTicket(
    customerInfo: CustomerInfo,
    items: TicketItem[],
    totalAmount: number,
    paymentMethod: string,
    bankDetails?: BankDetails
  ): OrderTicket {
    return {
      id: `ticket_${Date.now()}`,
      orderNumber: this.generateOrderNumber(),
      customerInfo,
      items,
      totalAmount,
      paymentMethod,
      bankDetails,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
  }

  addPaymentProof(ticket: OrderTicket, imageUrl: string): OrderTicket {
    return {
      ...ticket,
      paymentProof: {
        imageUrl,
        uploadedAt: new Date().toISOString(),
        verified: false
      },
      status: 'confirmed'
    }
  }
}