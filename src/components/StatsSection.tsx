import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Grape, MapPinned, Wine } from 'lucide-react'
import { useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

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
  const [expanded, setExpanded] = useState<string | null>(null)

  useGSAP(
    () => {
      const section = root.current
      if (!section) return

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const counters = Array.from(section.querySelectorAll<HTMLElement>('[data-counter]'))
      const cards = section.querySelectorAll<HTMLElement>('[data-stat-card]')

      gsap.set(cards, { opacity: 1, y: 0, clearProps: 'transform' })

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
          if (tween.progress() === 0 && tween.paused()) tween.play(0)
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 92%',
          once: true,
          onEnter: play,
        })

        if (section.getBoundingClientRect().top < window.innerHeight * 0.92) play()
      })

      requestAnimationFrame(() => ScrollTrigger.refresh())
    },
    { scope: root, dependencies: [] },
  )

  return (
    <section
      ref={root}
      id="numeros"
      className="relative w-full max-w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-10"
      aria-label="Números do Empório Cangussu"
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-stretch gap-3 sm:grid-cols-3 sm:gap-3 md:gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          const isOpen = expanded === stat.id

          return (
            <Card
              key={stat.id}
              data-stat-card
              className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg border-olive/30 bg-cream p-4 shadow-sm sm:p-4 md:p-5"
            >
              <div className="mb-3 flex size-9 items-center justify-center rounded-md bg-forest/10 text-forest sm:size-10">
                <Icon className="size-4 sm:size-5" aria-hidden />
              </div>

              <p className="font-sans text-3xl font-bold tracking-tight text-wine tabular-nums sm:text-3xl md:text-4xl lg:text-5xl">
                <span data-counter data-target={String(stat.value)} data-suffix={stat.suffix}>
                  0{stat.suffix}
                </span>
              </p>

              <p className="mt-3 line-clamp-2 text-sm leading-snug font-medium text-ink">
                {stat.title}
              </p>

              <div
                className={cn(
                  'grid transition-[grid-template-rows] duration-300 ease-out',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="space-y-2 pt-2">
                    <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
                      {stat.subtitle}
                    </p>

                    {stat.id === 'localidades' ? (
                      <ul className="flex flex-wrap gap-1 pt-1">
                        {SERRA_CITIES.map((city) => (
                          <li key={city}>
                            <Badge
                              variant="outline"
                              className="border-olive/35 bg-parchment/80 px-1.5 py-0 text-[10px] font-medium text-forest"
                            >
                              {city}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <p className="font-mono text-[10px] tracking-wide text-olive lowercase sm:text-[11px]">
                      fonte: {stat.fonte}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-auto flex items-center gap-1 pt-3 text-xs font-medium text-wine"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : stat.id)}
              >
                {isOpen ? 'Ver menos' : 'Ver mais'}
                <ChevronDown
                  className={cn('size-3.5 transition-transform', isOpen && 'rotate-180')}
                />
              </button>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
