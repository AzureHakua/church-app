import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CỘNG ĐOÀN THÁNH GIUSE',
  description: 'Welcome to our church community',
  appleWebApp: {
    title: 'St. Joseph Parish',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} bg-amber-50="true">
        <Banner />
        <Navbar />
        {children}
      </body>
    </html>
  )
}