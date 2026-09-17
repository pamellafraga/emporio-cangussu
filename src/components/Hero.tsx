import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { SocialLinks } from '@/components/SocialLinks'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        gsap.set('[data-hero-reveal]', { opacity: 1, y: 0, clearProps: 'all' })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('[data-hero-nav]', { opacity: 0, y: -24, duration: 0.8 })
        .from(
          '[data-hero-bg]',
          { scale: 1.12, opacity: 0.65, duration: 1.5, ease: 'power2.out' },
          0,
        )
        .from(
          '[data-hero-foliage]',
          { scale: 1.08, opacity: 0, duration: 1.3, ease: 'power2.out' },
          0.15,
        )
        .from(
          '[data-hero-reveal]',
          { opacity: 0, y: 48, duration: 0.9, stagger: 0.12 },
          0.35,
        )

      gsap.to('[data-hero-bg]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('[data-hero-foliage]', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('[data-hero-content]', {
        yPercent: 8,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <header ref={root} className="relative w-full max-w-full h-dvh overflow-hidden">
      <div className="relative h-full w-full max-w-full overflow-hidden">
        <img
          data-hero-bg
          src="/hero-cellar-hq.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.08] contrast-[1.05] will-change-transform sm:scale-105"
          decoding="async"
          fetchPriority="high"
        />
        <img
          data-hero-foliage
          src="/hero-foliage-parallax.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-20 mix-blend-soft-light will-change-transform"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-forest-deep/40 via-forest-deep/15 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-forest-deep/15"
          aria-hidden
        />

        <nav
          data-hero-nav
          className="relative z-20 flex w-full max-w-full flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5 lg:px-12"
        >
          <a href="#topo" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src="/logo-cangussu.jpg"
              alt=""
              className="size-9 shrink-0 rounded-full object-cover ring-1 ring-cream/35 sm:size-10"
            />
            <span className="font-display text-base font-semibold tracking-wide text-cream drop-shadow-md sm:text-lg">
              Empório Cangussu
            </span>
          </a>
          <div className="flex flex-wrap items-center gap-2">
            <SocialLinks className="hidden sm:flex" />
            <Button asChild variant="outline" className="border-cream/50 bg-forest-deep/30 text-cream backdrop-blur-sm hover:bg-cream/15">
              <a href="#catalogo">Catálogo</a>
            </Button>
          </div>
        </nav>

        <div
          data-hero-content
          className="relative z-10 flex h-[calc(100dvh-5rem)] w-full max-w-3xl flex-col justify-end px-4 pb-10 pt-8 will-change-transform sm:px-8 sm:pb-12 sm:pt-10 lg:px-12"
        >
          <p
            data-hero-reveal
            className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-ochre drop-shadow sm:mb-4 sm:text-sm sm:tracking-[0.35em]"
          >
            Vinhos com alma tropical
          </p>
          <h1
            data-hero-reveal
            className="font-display text-4xl leading-[0.95] font-bold text-cream drop-shadow-lg sm:text-6xl lg:text-8xl"
          >
            Empório
            <span className="mt-1 block text-ochre">Cangussu</span>
          </h1>
          <p
            data-hero-reveal
            className="mt-4 max-w-md text-sm leading-relaxed text-cream drop-shadow sm:mt-6 sm:text-lg"
          >
            Catálogo artesanal de vinhos selecionados — da mata ao cálice, com a força da onça e o
            sabor da terra.
          </p>
          <div data-hero-reveal className="mt-6 flex w-full max-w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="w-full bg-wine hover:bg-wine-deep sm:w-auto">
              <a href="#catalogo">
                Explorar catálogo
                <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-cream/50 bg-forest-deep/25 text-cream backdrop-blur-sm hover:bg-cream/15 sm:w-auto"
            >
              <a href="#sobre">Nossa essência</a>
            </Button>
          </div>
          <div data-hero-reveal className="mt-5 sm:hidden">
            <SocialLinks />
          </div>
        </div>
      </div>
    </header>
  )
}
