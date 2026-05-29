const links = ['Privacy Policy', 'Terms of Service', 'Technical Requirements', 'Contact Support']

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-container-lowest py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-12">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-lime font-mono text-sm font-bold text-on-lime">
              C7
            </span>
            <span className="font-display text-lg font-bold text-primary">
              Engineering Accelerator
            </span>
          </div>
          <p className="mt-2 text-sm text-on-surface-variant">
            © 2026 Engineering Accelerator Program. AI-Native Learning.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-on-surface-variant transition-colors hover:text-lime"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
