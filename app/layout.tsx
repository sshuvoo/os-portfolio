import type { Metadata } from 'next'
import './globals.css'
import { Taskbar } from './components/taskbar'
import { ReduxProvider } from './providers/redux-provider'
import { Topbar } from './components/topbar'

export const metadata: Metadata = {
  title: 'Don’t panic.',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-primary bg-center bg-cover bg-no-repeat">
        <ReduxProvider>
          <Topbar />
          {children}
          <Taskbar />
        </ReduxProvider>
      </body>
    </html>
  )
}
