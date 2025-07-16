// src/lib/send-invoice.ts
import nodemailer from 'nodemailer'
import { Order } from '../payload-types'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Server SMTP Google
  port: 465,
  secure: true, // Menggunakan SSL
  auth: {
    user: process.env.EMAIL_USER, // Email Anda dari .env
    pass: process.env.EMAIL_PASS, // App Password Anda dari .env
  },
})
export async function sendInvoiceEmail(order: Order) {
  const { customerDetails, orderedItems, totalAmount, invoiceNumber } = order

  // Membuat daftar item pesanan dengan pengecekan tipe
  const itemsHtml = orderedItems
    .map((item) => {
      let productName = 'Produk tidak diketahui'

      // === PERBAIKAN DI SINI ===
      // Periksa apakah 'product' adalah objek dan bukan hanya ID
      if (typeof item.product === 'object' && item.product !== null) {
        // Cek tipe relasi untuk mengakses properti yang benar
        switch (item.product.relationTo) {
          case 'hotel-rooms':
            // 'value' di sini adalah objek HotelRoom yang lengkap
            if (
              typeof item.product.value === 'object' &&
              item.product.value !== null &&
              'name' in item.product.value
            ) {
              productName = (item.product.value as { name: string }).name
            }
            break
          case 'golf-packages':
            // 'value' di sini adalah objek GolfPackage yang lengkap
            if (
              typeof item.product.value === 'object' &&
              item.product.value !== null &&
              'package' in item.product.value
            ) {
              productName = (item.product.value as { package: string }).package
            }
            break
          case 'yacht-charters':
            // 'value' di sini adalah objek YachtCharter yang lengkap
            if (
              typeof item.product.value === 'object' &&
              item.product.value !== null &&
              'name' in item.product.value
            ) {
              productName = (item.product.value as { name: string }).name
            }
            break
          case 'jet-charters':
            // 'value' di sini adalah objek JetCharter yang lengkap
            if (
              typeof item.product.value === 'object' &&
              item.product.value !== null &&
              'name' in item.product.value
            ) {
              productName = (item.product.value as { name: string }).name
            }
            break
        }
      }

      return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${productName}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${item.priceAtTimeOfPurchase.toLocaleString()}</td>
      </tr>
    `
    })
    .join('')

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Invoice untuk Pesanan #${invoiceNumber}</h2>
      <p>Halo ${customerDetails.firstName},</p>
      <p>Terima kasih telah melakukan pemesanan di Royal Travel. Berikut adalah rincian pesanan Anda:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Item</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Jumlah</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Harga</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>Total</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;"><strong>$${totalAmount.toLocaleString()}</strong></td>
          </tr>
        </tfoot>
      </table>
      <p style="margin-top: 20px;">Kami akan segera memproses pesanan Anda.</p>
      <p>Terima kasih!</p>
    </div>
  `

  try {
    const info = await transporter.sendMail({
      from: `"Royal Travel" <${process.env.EMAIL_USER}>`,
      to: customerDetails.email,
      subject: `Konfirmasi Pesanan Royal Travel #${invoiceNumber}`,
      html: emailHtml,
    })
    console.log(
      `Email invoice berhasil dikirim ke ${customerDetails.email}. Message ID: ${info.messageId}`,
    )
  } catch (error) {
    console.error('Gagal mengirim email invoice:', error)
  }
}
