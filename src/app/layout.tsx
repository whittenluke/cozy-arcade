import './globals.css'
import { Inter, Exo_2 } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const exo2 = Exo_2({ 
  subsets: ['latin'],
  variable: '--font-exo'
})

export const metadata = {
  title: 'CozyArcade - Your Cosmic Gaming Haven',
  description: 'Discover beautifully crafted browser games in an intergalactic space.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${exo2.variable}`}>
      <body className="bg-space text-star-dim font-inter antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
