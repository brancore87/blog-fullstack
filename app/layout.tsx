import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Bran Blog App 📝',
  description: 'This is a simple blog App created by Brandon N. Sangma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
