import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { LoginModal, Navbar, ResigsterModal } from './components'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './action/getCurrentUser'
import RentModal from './components/Modal/RentModal'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TravelNest',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider/>
        <RentModal/>
        <ResigsterModal/>
        <LoginModal/>
        <Navbar currentUser={currentUser}/>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}