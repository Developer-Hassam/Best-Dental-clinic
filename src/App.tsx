import { useState, useEffect } from 'react'
import { siteConfig } from './siteConfig'
import { useScrollReveal } from './useScrollReveal'

const WHATSAPP_URL = `https://wa.me/${siteConfig.whatsapp.number}`
const PHONE_URL = `tel:${siteConfig.phone.tel}`

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-4 h-4" fill={i < n ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.5">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm border-b border-slate-100' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white" width="18" height="18">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight">{siteConfig.clinicShortName}</span>
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="px-3.5 py-2 text-sm text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all duration-150 font-medium">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm">
            <WhatsAppIcon className="w-4 h-4" />
            WhatsApp
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Menu">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-700" fill="none" strokeWidth="2" strokeLinecap="round">
              {open ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></> : <><path d="M3 8h18"/><path d="M3 16h18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-5 pt-2 pb-4">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-slate-700 border-b border-slate-50 last:border-0 font-medium">
              {l.label}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 bg-teal-600 text-white text-sm font-semibold py-3 rounded-lg">
            <WhatsAppIcon className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  const revealRef = useScrollReveal()

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden bg-white">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 70% 40%, #f0fdfa 0%, transparent 70%)"
      }} />

      <div ref={revealRef} className="reveal-on-scroll relative max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
          {/* Left Hero Content */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Stars n={5} />
              <span className="text-slate-500 text-sm font-medium">{siteConfig.reviews.rating} — {siteConfig.reviews.count} Google Reviews</span>
            </div>

            <h1 className="section-heading text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.05] text-slate-900 mb-5">
              {siteConfig.clinicName.split(' ')[0]} {siteConfig.clinicName.split(' ')[1]}<br />
              <span className="text-teal-600">{siteConfig.clinicName.split(' ').slice(2).join(' ')}</span>
            </h1>

            <p className="text-slate-500 text-lg sm:text-xl mb-3 font-light">{siteConfig.tagline} — {siteConfig.address.city}</p>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {siteConfig.subTagline}. Comprehensive oral care by {siteConfig.doctor.name} ({siteConfig.doctor.qualification}) at {siteConfig.address.line1}, {siteConfig.address.line2}.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href={PHONE_URL}
                className="flex items-center gap-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Call Now
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm">
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
              <a href="#appointment"
                className="flex items-center gap-2 border border-slate-200 text-slate-700 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm">
                Book Appointment
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 20 20" className="w-4 h-4 fill-teal-500 shrink-0"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                {siteConfig.address.line1}, {siteConfig.address.line2}
              </span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 20 20" className="w-4 h-4 fill-teal-500 shrink-0"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
                {siteConfig.hours.daily}
              </span>
            </div>
          </div>

          {/* Right — stats card */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-teal-600"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{siteConfig.doctor.name}</p>
                    <p className="text-slate-400 text-xs">{siteConfig.doctor.title}</p>
                  </div>
                </div>

                {siteConfig.doctor.specialties.map(s => (
                  <div key={s.label} className="flex items-center justify-between py-1">
                    <span className="text-slate-500 text-sm">{s.label}</span>
                    <span className="font-bold text-slate-900 text-sm">{s.value}</span>
                  </div>
                ))}

                <div className="pt-3 border-t border-slate-100">
                  <div className="bg-teal-600 rounded-2xl p-4 text-white">
                    <p className="font-semibold text-sm mb-1">Book an Appointment</p>
                    <p className="text-teal-200 text-xs">Call {siteConfig.phone.display} to reserve your slot today</p>
                  </div>
                </div>
              </div>

              {/* Ambient glow */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 bg-teal-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const revealRef = useScrollReveal()

  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-50">
      <div ref={revealRef} className="reveal-on-scroll max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-slate-200 aspect-[3/4] shadow-sm">
              <img
                src={siteConfig.doctor.photo}
                alt={`${siteConfig.doctor.name} at ${siteConfig.clinicName}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 right-5 bg-white rounded-2xl shadow-lg border border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <Stars n={5} />
                <span className="font-bold text-slate-900 text-sm">{siteConfig.reviews.rating}</span>
              </div>
              <p className="text-slate-400 text-xs">{siteConfig.reviews.count} Google Reviews</p>
            </div>
          </div>

          {/* Content */}
          <div className="pt-2 lg:pt-8">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">About the Doctor</p>
            <h2 className="section-heading text-4xl sm:text-5xl text-slate-900 leading-tight mb-6">
              {siteConfig.doctor.name}
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              {siteConfig.doctor.bio1}
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              {siteConfig.doctor.bio2}
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              {siteConfig.doctor.bio3}
            </p>

            <dl className="grid sm:grid-cols-2 gap-4 mb-8">
              {siteConfig.doctor.specialties.map(item => (
                <div key={item.label} className="bg-white border border-slate-100 rounded-xl px-4 py-3.5 shadow-2xs">
                  <dt className="text-slate-400 text-xs uppercase tracking-wider mb-1">{item.label}</dt>
                  <dd className="text-slate-800 font-semibold text-sm">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3">
              <a href={PHONE_URL}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm shadow-xs">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                {siteConfig.phone.display}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm shadow-xs">
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const revealRef = useScrollReveal()

  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div ref={revealRef} className="reveal-on-scroll max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl mb-14">
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">Our Specialized Services</p>
          <h2 className="section-heading text-4xl sm:text-5xl text-slate-900 leading-tight mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            From laser whitening and invisible aligners to pain-free root canals and dental implants — modern dentistry for all ages.
          </p>
        </div>

        <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.services.map((s) => (
            <div
              key={s.id}
              onClick={() => setExpanded(expanded === s.title ? null : s.title)}
              className="stagger-item bg-white border border-slate-200/80 hover:border-teal-400 rounded-2xl overflow-hidden text-left hover:shadow-lg transition-all duration-300 group flex flex-col cursor-pointer"
            >
              <div className="h-40 overflow-hidden relative bg-teal-900/10 w-full">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to stylized gradient if external image is blocked
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-teal-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  {s.badge}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors leading-snug mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600 group-hover:text-teal-700">
                  <span>Enquire Treatment</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-400 text-sm mt-10 text-center">Need advice on a specific treatment? Contact our team on WhatsApp for free consultation</p>
      </div>
    </section>
  )
}

function WhyUsSection() {
  const revealRef = useScrollReveal()

  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div ref={revealRef} className="reveal-on-scroll max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="section-heading text-4xl sm:text-5xl text-slate-900 leading-tight mb-6">
            {siteConfig.whyUs.title}
          </h2>
          <p className="text-slate-500 leading-relaxed text-lg mb-10">
            {siteConfig.whyUs.description}
          </p>

          <div className="space-y-5">
            {siteConfig.whyUs.points.map(item => (
              <div key={item.title} className="flex gap-4">
                <div className="w-1 rounded-full bg-teal-300 shrink-0 self-stretch min-h-[48px]" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats & Highlight Card */}
        <div className="grid grid-cols-2 gap-3">
          {siteConfig.whyUs.stats.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl p-4 sm:p-6 ${i === 0 ? 'bg-teal-600 text-white' : 'bg-white border border-slate-100 text-slate-900 shadow-2xs'}`}
            >
              <p className={`text-lg sm:text-2xl md:text-3xl font-bold mb-1 leading-tight ${i === 0 ? 'text-white' : 'text-teal-600'}`}>{s.big}</p>
              <p className={`font-semibold text-xs sm:text-sm ${i === 0 ? 'text-teal-100' : 'text-slate-800'}`}>{s.label}</p>
              <p className={`text-xs mt-0.5 ${i === 0 ? 'text-teal-300' : 'text-slate-400'}`}>{s.sub}</p>
            </div>
          ))}
          <div className="col-span-2 bg-amber-50/80 border border-amber-100 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Stars n={5} />
              </div>
              <div>
                <p className="text-slate-700 text-sm leading-relaxed italic">"{siteConfig.whyUs.quote}"</p>
                <p className="text-slate-400 text-xs mt-2">— {siteConfig.doctor.name}, {siteConfig.doctor.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GallerySection() {
  const revealRef = useScrollReveal()

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white">
      <div ref={revealRef} className="reveal-on-scroll max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-2">Clinic Gallery</p>
            <h2 className="section-heading text-4xl sm:text-5xl text-slate-900 leading-tight">Inside Our Clinic</h2>
          </div>
          <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors border border-slate-200 hover:border-teal-200 rounded-xl px-4 py-2.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.163 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            {siteConfig.social.instagram.handle}
          </a>
        </div>

        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteConfig.gallery.map((p) => (
            <div key={p.id} className={`stagger-item relative overflow-hidden rounded-2xl bg-teal-950/10 border border-slate-100 group shadow-2xs ${p.span}`}>
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-60 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="inline-block bg-teal-500/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5">
                  {p.category}
                </span>
                <p className="text-sm font-semibold leading-snug text-slate-100">
                  {p.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  const revealRef = useScrollReveal()

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-slate-50">
      <div ref={revealRef} className="reveal-on-scroll max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-start justify-between gap-6 mb-12 flex-wrap">
          <div>
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-2">Patient Testimonials</p>
            <h2 className="section-heading text-4xl sm:text-5xl text-slate-900 leading-tight">What Patients Say</h2>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl px-5 py-4 text-center shadow-xs">
            <p className="text-4xl font-bold text-slate-900">{siteConfig.reviews.rating}</p>
            <div className="flex justify-center my-1.5">
              <Stars n={5} />
            </div>
            <p className="text-slate-400 text-xs">{siteConfig.reviews.count} Google Reviews</p>
          </div>
        </div>

        <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`stagger-item rounded-2xl p-6 flex flex-col justify-between ${
                i === 0 ? 'bg-teal-600 text-white shadow-md' : 'bg-white border border-slate-200/80 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, k) => (
                      <svg key={k} viewBox="0 0 20 20" className="w-4 h-4" fill={i === 0 ? "#fbbf24" : "#f59e0b"}>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    i === 0 ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {t.treatment}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed mb-5 ${i === 0 ? 'text-teal-50' : 'text-slate-600'}`}>
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100/20">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i === 0 ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-700'
                }`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${i === 0 ? 'text-white' : 'text-slate-900'}`}>{t.name}</p>
                  <p className={`text-xs ${i === 0 ? 'text-teal-200' : 'text-slate-400'}`}>{t.area} • {t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={siteConfig.reviews.googleMapsUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors font-medium border border-slate-200 hover:border-teal-200 rounded-xl px-5 py-2.5 bg-white shadow-2xs">
            ⭐ Read 150+ Verified Google Reviews →
          </a>
        </div>
      </div>
    </section>
  )
}

function AppointmentSection() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', message: '' })
  const [sent, setSent] = useState(false)
  const revealRef = useScrollReveal()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Assalam o Alaikum! I'd like to book an appointment at ${siteConfig.clinicName}.\n\nName: ${form.name}\nPhone: ${form.phone}${form.date ? `\nDate: ${form.date}` : ''}${form.time ? `\nTime: ${form.time}` : ''}${form.message ? `\nNote: ${form.message}` : ''}`
    )
    window.open(`https://wa.me/${siteConfig.whatsapp.number}?text=${msg}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="appointment" className="py-20 sm:py-28 bg-white">
      <div ref={revealRef} className="reveal-on-scroll max-w-5xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_440px] gap-12 items-start">
        <div>
          <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">Book Appointment</p>
          <h2 className="section-heading text-4xl sm:text-5xl text-slate-900 leading-tight mb-5">
            Schedule Your Visit
          </h2>
          <p className="text-slate-500 leading-relaxed mb-8 text-lg">
            Fill the form below and we will send your appointment request directly to {siteConfig.clinicShortName} via WhatsApp for instant confirmation.
          </p>

          <div className="space-y-3">
            {[
              { icon: "phone", label: "Primary Phone", val: siteConfig.phone.display, href: PHONE_URL },
              { icon: "wa", label: "WhatsApp", val: siteConfig.whatsapp.display, href: WHATSAPP_URL },
            ].map(c => (
              <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-slate-100 hover:border-teal-200 rounded-xl transition-colors group">
                <div className="w-9 h-9 bg-teal-50 group-hover:bg-teal-100 rounded-lg flex items-center justify-center transition-colors">
                  {c.icon === 'wa'
                    ? <WhatsAppIcon className="w-4 h-4 text-teal-600" />
                    : <svg viewBox="0 0 24 24" className="w-4 h-4 fill-teal-600"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  }
                </div>
                <div>
                  <p className="text-slate-400 text-xs">{c.label}</p>
                  <p className="text-slate-800 font-semibold text-sm group-hover:text-teal-700 transition-colors">{c.val}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-7 shadow-xs">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-green-500"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Opening WhatsApp...</h3>
              <p className="text-slate-500 text-sm">Your appointment request is ready to send to {siteConfig.clinicShortName} on WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-0.5">Request a Visit</h3>
                <p className="text-slate-400 text-sm">Instant confirmation via WhatsApp</p>
              </div>

              {[
                { name: 'name', label: 'Your Full Name', type: 'text', placeholder: 'e.g. Ahmed Ali', req: true },
                { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '03xx-xxxxxxx', req: true },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-slate-700 text-sm font-medium mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    required={f.req}
                    placeholder={f.placeholder}
                    value={form[f.name as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-1.5">Preferred Date</label>
                  <input type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={form.date}
                    onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-1.5">Preferred Time</label>
                  <select value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all">
                    <option value="">Any time slot</option>
                    {["Morning (10–1)", "Afternoon (1–4)", "Evening (4–7)", "Night (7–10)"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-sm font-medium mb-1.5">Brief Note / Concern</label>
                <textarea rows={3} placeholder="Describe your dental issue or requested service..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all resize-none"
                />
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm text-sm cursor-pointer">
                <WhatsAppIcon className="w-4 h-4" />
                Send Request via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const revealRef = useScrollReveal()

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-50">
      <div ref={revealRef} className="reveal-on-scroll max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">Location & Hours</p>
        <h2 className="section-heading text-4xl sm:text-5xl text-slate-900 mb-10">Find Our Clinic</h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
              <p className="text-slate-800 font-semibold mb-1">{siteConfig.address.line1}</p>
              <p className="text-slate-600 text-sm">{siteConfig.address.line2}</p>
              <p className="text-slate-500 text-sm">{siteConfig.address.city}, {siteConfig.address.zip}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-medium">Phone</p>
                <a href={PHONE_URL} className="block text-slate-800 font-semibold text-sm hover:text-teal-600 transition-colors mb-1">{siteConfig.phone.display}</a>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-medium">Hours</p>
                <p className="text-slate-800 font-semibold text-sm">Open Daily</p>
                <p className="text-slate-500 text-sm">{siteConfig.hours.daily}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-3 font-medium">Connect With Us</p>
              <div className="flex gap-4">
                <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.163 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram
                </a>
                <span className="text-slate-200">|</span>
                <a href={siteConfig.social.facebook.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-100 shadow-2xs" style={{ minHeight: 380 }}>
            <iframe
              title={`${siteConfig.clinicName} location map`}
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <p className="font-bold text-white text-base mb-1">{siteConfig.clinicName}</p>
            <p className="text-teal-400 text-sm mb-4">{siteConfig.tagline}</p>
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              Professional dental care by {siteConfig.doctor.name} ({siteConfig.doctor.qualification}). {siteConfig.address.full}.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-300"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.163 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={siteConfig.social.facebook.url} target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-slate-300"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 bg-green-700 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm hover:text-teal-400 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-sm font-semibold mb-4">Contact Info</p>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-400">Call:</span> <a href={PHONE_URL} className="hover:text-teal-400">{siteConfig.phone.display}</a></li>
              <li><span className="text-slate-400">WhatsApp:</span> <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">{siteConfig.whatsapp.display}</a></li>
              <li className="leading-snug pt-1">{siteConfig.address.full}</li>
              <li className="text-teal-400">{siteConfig.hours.daily}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} {siteConfig.clinicName}. All rights reserved.</p>
          <p className="text-slate-600">{siteConfig.address.city}</p>
        </div>
      </div>
    </footer>
  )
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-13 h-13 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
      style={{ width: 52, height: 52 }}
    >
      <WhatsAppIcon className="w-6 h-6 text-white" />
    </a>
  )
}

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-white selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <GallerySection />
      <ReviewsSection />
      <AppointmentSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
