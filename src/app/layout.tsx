import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from './auth/components/AuthProvider'
import { GlobalToaster } from './components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos',
  description: 'Sistema Integral de Recursos Humanos - Consulta de Recibos de Nómina INJUVE',
  manifest: '/manifest.json',
  themeColor: '#6e1e2a',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SIRH INJUVE',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="es">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="SIRH INJUVE" />
          <meta name="msapplication-TileColor" content="#6e1e2a" />
          <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        </head>
        <body className={inter.className}>
          {children}
          <GlobalToaster />
        </body>
      </html>
    </AuthProvider>
  )
}
