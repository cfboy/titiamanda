import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import AboutSection from '@/components/sections/AboutSection'
import ActivitiesSection from '@/components/sections/ActivitiesSection'
import ContactSection from '@/components/sections/ContactSection'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export default function App() {
  useDocumentMeta()

  return (
    <div className="bg-cream min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ActivitiesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
