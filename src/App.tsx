import type { Route } from '@/routes'

import { ContactDrawerProvider } from '@/components/ContactDrawer'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import FaqPage from '@/components/pages/FaqPage'
import ServicePage from '@/components/pages/ServicePage'
import AboutSection from '@/components/sections/AboutSection'
import ActivitiesSection from '@/components/sections/ActivitiesSection'
import ContactSection from '@/components/sections/ContactSection'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { RouteProvider } from '@/hooks/useRoute'

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ActivitiesSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}

export default function App({ route }: { route: Route }) {
  useDocumentMeta(route)

  return (
    <RouteProvider value={route}>
      <ContactDrawerProvider>
        <div className="bg-cream min-h-screen">
          <Header />
          <main>
            {route.kind === 'home' && <HomePage />}
            {route.kind === 'service' && route.serviceId && (
              <ServicePage lng={route.lng} serviceId={route.serviceId} />
            )}
            {route.kind === 'faq' && <FaqPage lng={route.lng} />}
          </main>
          <Footer />
        </div>
      </ContactDrawerProvider>
    </RouteProvider>
  )
}
