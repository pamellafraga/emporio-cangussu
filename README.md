# Empório Cangussu — Demo de Catálogo

Demo de catálogo de vinhos com identidade visual da marca, UI shadcn/ui e visualização 3D ultrarrealista (React Three Fiber).

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui (Button, Card, Badge, ScrollArea, Separator)
- [@react-three/fiber](https://r3f.docs.pmnd.rs/) + drei + postprocessing
- Paleta da marca: vinho, floresta, sage, oliva, ocre e creme

## Animações

- **GSAP + ScrollTrigger** — hero pin/parallax, revelas no catálogo e essência
- **Lenis** — scroll suave sincronizado com GSAP ticker
- Respeita `prefers-reduced-motion`

## Rodar

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — servidor local
- `npm run build` — build de produção
- `npm run preview` — preview do build
