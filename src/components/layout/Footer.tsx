export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/images/logo/full-logo.png"
            alt="Titi Amanda"
            className="h-auto max-w-32 object-contain opacity-80"
          />
          <p className="text-gray-medium text-center text-sm leading-relaxed">
            Copyright &copy; 2025 Titi Amanda Babysitter Services. All Rights
            Reserved.
          </p>
          <p className="text-gray-dark text-center text-sm font-bold">
            Quality childcare with love in Puerto Rico. ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
