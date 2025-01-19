import './globals.css'

export const metadata = {
  title: 'Frontend Mentor | IP Address Tracker',
  icons: {
    icon: '/favicon-32x32.png',
  },
  description: 'IP Address tracker built with Next',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-mobile md:bg-desktop bg-contain bg-no-repeat">
        {children}
      </body>
    </html>
  )
}
