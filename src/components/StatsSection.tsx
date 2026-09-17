import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Grape, MapPinned, Wine } from 'lucide-react'
import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SERRA_CITIES = [
  'Bento Gonçalves',
  'Garibaldi',
  'Caxias do Sul',
  'Flores da Cunha',
  'Pinto Bandeira',
  'Farroupilha',
  'Monte Belo do Sul',
  'Nova Pádua',
  'Antônio Prado',
  'São Marcos',
  'Carlos Barbosa',
  'Cotiporã',
]

const STATS = [
  {
    id: 'safras',
    value: 48,
    suffix: '+',
    title: 'Safras selecionadas no catálogo do Empório Cangussu',
    subtitle:
      'Safras selecionadas mão a mão — cada colheita escolhida pelo caráter do terroir e pela história na garrafa.',
    fonte: 'catálogo interno',
    icon: Grape,
  },
  {
    id: 'garrafas',
    value: 12840,
    suffix: '',
    title: 'Garrafas vendidas desde a abertura da casa',
    subtitle:
      'Não vendemos só garrafas, vendemos encontros, memórias e o sabor da Serra Gaúcha em cada cálice.',
    fonte: 'vendas · mock',
    icon: Wine,
  },
  {
    id: 'localidades',
    value: 12,
    suffix: '',
    title: 'Localidades das garrafas selecionadas',
    subtitle: 'Vinhedos e cantinas espalhados pela Serra Gaúcha.',
    fonte: 'Serra Gaúcha',
    icon: MapPinned,
  },
] as const

function formatCount(value: number) {
  return value.toLocaleString('pt-BR')
}

export function StatsSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = root.current
      if (!section) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const counters = Array.from(section.querySelectorAll<HTMLElement>('[data-counter]'))
      const cards = section.querySelectorAll<HTMLElement>('[data-stat-card]')

      gsap.set(cards, { opacity: 1, y: 0 })

      if (prefersReduced) {
        counters.forEach((el) => {
          const target = Number(el.dataset.target ?? 0)
          const suffix = el.dataset.suffix ?? ''
          el.textContent = `${formatCount(target)}${suffix}`
        })
        return
      }

      gsap.from(cards, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      counters.forEach((el) => {
        const target = Number(el.dataset.target ?? 0)
        const suffix = el.dataset.suffix ?? ''
        const state = { value: 0 }

        el.textContent = `0${suffix}`

        const tween = gsap.to(state, {
          value: target,
          duration: 1.7,
          ease: 'power2.out',
          paused: true,
          onUpdate: () => {
            el.textContent = `${formatCount(Math.round(state.value))}${suffix}`
          },
          onComplete: () => {
            el.textContent = `${formatCount(target)}${suffix}`
          },
        })

        const play = () => {
          if (tween.progress() === 0 && tween.paused()) {
            tween.play(0)
          }
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 92%',
          once: true,
          onEnter: play,
        })

        if (section.getBoundingClientRect().top < window.innerHeight * 0.92) {
          play()
        }
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    },
    { scope: root, dependencies: [] },
  )

  return (
    <section
      ref={root}
      id="numeros"
      className="relative px-4 py-8 sm:px-6 sm:py-10 lg:px-10"
      aria-label="Números do Empório Cangussu"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-3 items-stretch gap-2 sm:gap-3 md:gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.id}
              data-stat-card
              className="flex h-full min-h-0 flex-col rounded-lg border-olive/30 bg-cream p-3 shadow-sm sm:p-4 md:p-5"
            >
              <div className="mb-3 flex size-9 items-center justify-center rounded-md bg-forest/10 text-forest sm:mb-4 sm:size-10">
                <Icon className="size-4 sm:size-5" aria-hidden />
              </div>

              <p className="font-sans text-2xl font-bold tracking-tight text-wine tabular-nums sm:text-3xl md:text-4xl lg:text-5xl">
                <span
                  data-counter
                  data-target={String(stat.value)}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </span>
              </p>

              <div className="mt-3 flex flex-1 flex-col space-y-2 sm:mt-4">
                <p className="text-[11px] leading-snug font-medium text-ink sm:text-sm md:text-[15px]">
                  {stat.title}
                </p>
                <p className="text-[10px] leading-snug text-muted-foreground sm:text-xs md:text-sm">
                  {stat.subtitle}
                </p>

                {stat.id === 'localidades' ? (
                  <ul className="flex flex-wrap gap-1 pt-1">
                    {SERRA_CITIES.map((city) => (
                      <li key={city}>
                        <Badge
                          variant="outline"
                          className="border-olive/35 bg-parchment/80 px-1.5 py-0 text-[9px] font-medium text-forest sm:text-[10px]"
                        >
                          {city}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <p className="mt-auto pt-3 font-mono text-[9px] tracking-wide text-olive lowercase sm:text-[11px]">
                  fonte: {stat.fonte}
                </p>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
