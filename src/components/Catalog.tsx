import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Grape, MapPin, Wine as WineIcon } from 'lucide-react'
import { lazy, Suspense, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { formatPrice, type Wine, wines } from '@/data/wines'
import { whatsappLink } from '@/data/social'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const BottleScene = lazy(() =>
  import('@/components/scene/BottleScene').then((m) => ({ default: m.BottleScene })),
)

type CatalogProps = {
  selected: Wine
  onSelect: (wine: Wine) => void
}

const typeLabel: Record<Wine['type'], string> = {
  tinto: 'Tinto',
  branco: 'Branco',
  rosé: 'Rosé',
  espumante: 'Espumante',
}

export function Catalog({ selected, onSelect }: CatalogProps) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      gsap.from('[data-catalog-intro]', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('[data-catalog-list]', {
        opacity: 0,
        x: -32,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-catalog-list]',
          start: 'top 85%',
          once: true,
        },
      })

      gsap.from('[data-catalog-stage]', {
        opacity: 0,
        x: 36,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-catalog-stage]',
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="catalogo" className="relative px-4 py-12 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p
            data-catalog-intro
            className="mb-2 text-sm font-medium uppercase tracking-[0.28em] text-wine"
          >
            Catálogo
          </p>
          <h2
            data-catalog-intro
            className="font-display text-4xl font-semibold text-ink sm:text-5xl"
          >
            Selecione um vinho e gire a garrafa
          </h2>
          <p data-catalog-intro className="mt-3 text-base text-muted-foreground sm:text-lg">
            Visualização 3D com materiais de vidro físico — cada rótulo muda a cápsula, o líquido e
            o tom da etiqueta.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
          <ScrollArea
            data-catalog-list
            className="h-[32rem] rounded-lg border border-border bg-card/70 pr-3 backdrop-blur-sm"
          >
            <div className="space-y-3 p-3">
              {wines.map((wine) => {
                const active = wine.id === selected.id
                return (
                  <button
                    key={wine.id}
                    type="button"
                    onClick={() => onSelect(wine)}
                    className={cn(
                      'w-full rounded-lg border px-4 py-4 text-left transition-all',
                      active
                        ? 'border-wine bg-cream shadow-md shadow-wine/10'
                        : 'border-transparent bg-transparent hover:border-olive/30 hover:bg-cream/50',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-semibold text-ink">{wine.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {wine.producer} · {wine.vintage}
                        </p>
                      </div>
                      <Badge variant={active ? 'default' : 'outline'}>{typeLabel[wine.type]}</Badge>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {wine.description}
                    </p>
                    <p className="mt-3 font-medium text-forest">{formatPrice(wine.price)}</p>
                  </button>
                )
              })}
            </div>
          </ScrollArea>

          <div data-catalog-stage className="space-y-5">
            <div className="overflow-hidden rounded-lg border border-border bg-forest-deep shadow-xl shadow-forest/20">
              <Suspense
                fallback={
                  <div className="flex h-[22rem] items-center justify-center text-cream/70 sm:h-[28rem]">
                    Carregando garrafa 3D…
                  </div>
                }
              >
                <BottleScene
                  wine={selected}
                  className="h-[22rem] w-full sm:h-[28rem]"
                  interactive
                />
              </Suspense>
            </div>

            <Card className="border-olive/25 bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{typeLabel[selected.type]}</Badge>
                  <Badge variant="ochre">{selected.grape}</Badge>
                </div>
                <CardTitle className="mt-2">{selected.name}</CardTitle>
                <CardDescription className="text-base">{selected.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 text-sm sm:grid-cols-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4 text-wine" />
                    <span>
                      {selected.region}, {selected.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Grape className="size-4 text-forest" />
                    <span>{selected.grape}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <WineIcon className="size-4 text-ochre" />
                    <span>Safra {selected.vintage}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-olive">
                    Notas de degustação
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.tastingNotes.map((note) => (
                      <Badge key={note} variant="outline">
                        {note}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <p className="font-display text-3xl font-semibold text-ink">
                    {formatPrice(selected.price)}
                  </p>
                  <Button asChild size="lg">
                    <a
                      href={whatsappLink(
                        `Olá! Tenho interesse no ${selected.name} (${selected.vintage}).`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reservar no WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
