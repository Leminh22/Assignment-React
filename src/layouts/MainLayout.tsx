import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_top,_#e8eff8_0%,_#f5f8fc_42%,_#f5f8fc_100%)]">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-7">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
