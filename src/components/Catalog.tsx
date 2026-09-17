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
        y: 28,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="catalogo"
      className="relative w-full max-w-full overflow-x-clip px-4 py-10 sm:px-6 sm:py-14 lg:px-10"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p
            data-catalog-intro
            className="mb-2 text-sm font-medium uppercase tracking-[0.28em] text-wine"
          >
            Catálogo
          </p>
          <h2
            data-catalog-intro
            className="font-display text-3xl font-semibold break-words text-ink sm:text-4xl md:text-5xl"
          >
            Selecione um vinho e gire a garrafa
          </h2>
          <p data-catalog-intro className="mt-3 text-sm text-muted-foreground sm:text-base md:text-lg">
            Visualização 3D com materiais de vidro físico — cada rótulo muda a cápsula, o líquido e
            o tom da etiqueta.
          </p>
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          {/* 3D primeiro no mobile para não ficar cortado fora da vista */}
          <div data-catalog-stage className="order-1 min-w-0 space-y-4 lg:order-2">
            <div className="w-full min-w-0 overflow-hidden rounded-lg border border-border bg-forest-deep shadow-xl shadow-forest/20">
              <Suspense
                fallback={
                  <div className="flex aspect-[4/5] w-full items-center justify-center text-cream/70 sm:aspect-auto sm:h-[28rem]">
                    Carregando garrafa 3D…
                  </div>
                }
              >
                <BottleScene
                  wine={selected}
                  className="aspect-[4/5] w-full max-w-full sm:aspect-auto sm:h-[28rem]"
                  interactive
                />
              </Suspense>
            </div>

            <Card className="w-full min-w-0 overflow-hidden border-olive/25 bg-card/90 backdrop-blur-sm">
              <CardHeader className="space-y-3 p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{typeLabel[selected.type]}</Badge>
                  <Badge variant="ochre" className="max-w-full truncate">
                    {selected.grape}
                  </Badge>
                </div>
                <CardTitle className="text-xl break-words sm:text-2xl">{selected.name}</CardTitle>
                <CardDescription className="text-sm break-words sm:text-base">
                  {selected.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 pt-0 sm:p-5 sm:pt-0">
                <div className="grid gap-3 text-sm">
                  <div className="flex min-w-0 items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-wine" />
                    <span className="break-words">
                      {selected.region}, {selected.country}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-start gap-2 text-muted-foreground">
                    <Grape className="mt-0.5 size-4 shrink-0 text-forest" />
                    <span className="break-words">{selected.grape}</span>
                  </div>
                  <div className="flex min-w-0 items-start gap-2 text-muted-foreground">
                    <WineIcon className="mt-0.5 size-4 shrink-0 text-ochre" />
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

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {formatPrice(selected.price)}
                  </p>
                  <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
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

          <div
            data-catalog-list
            className="order-2 w-full min-w-0 space-y-3 lg:order-1 lg:max-h-[40rem] lg:overflow-y-auto lg:rounded-lg lg:border lg:border-border lg:bg-card/70 lg:p-3 lg:pr-2 lg:backdrop-blur-sm"
          >
            {wines.map((wine) => {
              const active = wine.id === selected.id
              return (
                <button
                  key={wine.id}
                  type="button"
                  onClick={() => onSelect(wine)}
                  className={cn(
                    'w-full min-w-0 rounded-lg border px-3 py-3 text-left transition-all sm:px-4 sm:py-4',
                    active
                      ? 'border-wine bg-cream shadow-md shadow-wine/10'
                      : 'border-olive/20 bg-card/60 hover:border-olive/40 hover:bg-cream/50',
                  )}
                >
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-lg font-semibold break-words text-ink sm:text-xl">
                        {wine.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {wine.producer} · {wine.vintage}
                      </p>
                    </div>
                    <Badge variant={active ? 'default' : 'outline'} className="shrink-0">
                      {typeLabel[wine.type]}
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm break-words text-muted-foreground">
                    {wine.description}
                  </p>
                  <p className="mt-3 font-medium text-forest">{formatPrice(wine.price)}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
