import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { whatsappLink } from '@/data/social'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      gsap.from('[data-about-media]', {
        opacity: 0,
        y: 36,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 78%',
          once: true,
        },
      })

      gsap.from('[data-about-copy]', {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          once: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="sobre" className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div
          data-about-media
          className="grid overflow-hidden rounded-sm shadow-2xl shadow-forest/25 ring-1 ring-olive/20 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <img
            src="/about-vineyard.png"
            alt="Vinhedo ao entardecer — Empório Cangussu"
            className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-[28rem]"
          />

          <div className="relative flex flex-col justify-between bg-cream px-7 py-8 sm:px-9 sm:py-10">
            <div>
              <p
                data-about-copy
                className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-wine"
              >
                Essência
              </p>
              <h2
                data-about-copy
                className="font-display text-3xl font-semibold text-ink sm:text-4xl"
              >
                Da selva ao cálice
              </h2>
              <p
                data-about-copy
                className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Entre araucárias e fileiras de videiras, o Empório Cangussu celebra o terroir
                brasileiro — vinhos escolhidos com a mesma intensidade da onça que guarda a marca.
              </p>
              <blockquote
                data-about-copy
                className="mt-8 border-l-2 border-wine pl-4 font-display text-lg italic leading-relaxed text-ink sm:text-xl"
              >
                “Vai, pois, come com alegria o teu pão e bebe gostosamente o teu vinho, pois Deus já
                de antemão se agrada das tuas obras.”
                <footer className="mt-3 font-sans text-sm not-italic tracking-wide text-olive">
                  Eclesiastes 9:7
                </footer>
              </blockquote>
            </div>

            <div data-about-copy className="mt-8 flex items-end justify-between gap-4">
              <p className="max-w-[12rem] text-sm leading-snug text-olive">
                Tradição, floresta e cálice — o encontro do selvagem com o artesanal.
              </p>
              <img
                src="/logo-cangussu.jpg"
                alt="Logo Cangussu"
                className="size-20 shrink-0 rounded-full object-cover ring-2 ring-olive/20 shadow-md sm:size-24"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-olive/25 bg-forest-deep px-4 py-10 text-cream sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3 sm:items-center">
        <div>
          <p className="font-display text-xl font-semibold sm:text-2xl">Empório Cangussu</p>
        </div>

        <p className="text-center text-sm text-cream/60">
          © {new Date().getFullYear()} Empório Cangussu — desenvolvido por{' '}
          <a
            href="https://www.xpresssolutions.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/85 underline-offset-2 transition-colors hover:text-ochre hover:underline"
          >
            Xpress Solutions
          </a>
        </p>

        <div className="sm:justify-self-end">
          <a
            href={whatsappLink('Olá! Quero uma garrafa do Empório Cangussu.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cream transition-colors hover:text-ochre"
          >
            Quero uma garrafa
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
