// utils/receiptGenerator.ts
import { Receipt, ManualPaymentReceipt, TelebirrReceipt, CustomerInfo, ReceiptItem, BankDetails, PaymentProof } from '../types/receipt'

export class ReceiptGenerator {
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `ORD-${timestamp}${random}`
  }

  generateManualReceipt(
    customerInfo: CustomerInfo,
    items: ReceiptItem[],
    totalAmount: number,
    paymentMethod: 'bank_transfer' | 'telegram' | 'whatsapp',
    bankDetails?: BankDetails
  ): ManualPaymentReceipt {
    return {
      id: `receipt_${Date.now()}`,
      orderNumber: this.generateOrderNumber(),
      type: 'manual',
      customerInfo,
      items,
      totalAmount,
      paymentMethod,
      bankDetails,
      orderDate: new Date().toISOString(),
      status: 'pending_payment'
    }
  }

  generateTelebirrReceipt(
    customerInfo: CustomerInfo,
    items: ReceiptItem[],
    totalAmount: number,
    transactionId: string
  ): TelebirrReceipt {
    return {
      id: `telebirr_${Date.now()}`,
      orderNumber: this.generateOrderNumber(),
      type: 'telebirr',
      customerInfo,
      items,
      totalAmount,
      transactionId,
      orderDate: new Date().toISOString(),
      paymentDate: new Date().toISOString(),
      status: 'pending_payment',
      paymentConfirmed: false
    }
  }

  confirmTelebirrPayment(receipt: TelebirrReceipt, transactionId: string): TelebirrReceipt {
    return {
      ...receipt,
      paymentConfirmed: true,
      status: 'confirmed',
      transactionId,
      paymentDate: new Date().toISOString()
    }
  }

  addPaymentProof(receipt: ManualPaymentReceipt, imageUrl: string): ManualPaymentReceipt {
    return {
      ...receipt,
      paymentProof: {
        imageUrl,
        uploadedAt: new Date().toISOString(),
        verified: false
      },
      status: 'pending_approval'
    }
  }

  approveManualPayment(receipt: ManualPaymentReceipt, adminName: string): ManualPaymentReceipt {
    if (!receipt.paymentProof) {
      throw new Error('No payment proof available for approval')
    }

    return {
      ...receipt,
      paymentProof: {
        ...receipt.paymentProof,
        verified: true,
        verifiedBy: adminName,
        verifiedAt: new Date().toISOString()
      },
      status: 'confirmed'
    }
  }

  rejectManualPayment(receipt: ManualPaymentReceipt, adminName: string, notes: string): ManualPaymentReceipt {
    return {
      ...receipt,
      status: 'rejected',
      adminNotes: notes
    }
  }
}