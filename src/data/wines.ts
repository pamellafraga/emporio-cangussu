export type Wine = {
  id: string
  name: string
  producer: string
  region: string
  country: string
  vintage: number
  grape: string
  type: 'tinto' | 'branco' | 'rosé' | 'espumante'
  price: number
  description: string
  tastingNotes: string[]
  glassColor: string
  liquidColor: string
  foilColor: string
  labelTint: string
}

export const wines: Wine[] = [
  {
    id: 'onca-reserva',
    name: 'Onça Reserva',
    producer: 'Empório Cangussu',
    region: 'Vale dos Vinhedos',
    country: 'Brasil',
    vintage: 2020,
    grape: 'Cabernet Sauvignon',
    type: 'tinto',
    price: 189,
    description:
      'Tinto encorpado com taninos sedosos e final longo de amora e especiarias — a assinatura da casa.',
    tastingNotes: ['Amora', 'Cedro', 'Pimenta-do-reino'],
    glassColor: '#1a1210',
    liquidColor: '#4a0e12',
    foilColor: '#a83226',
    labelTint: '#f2ead3',
  },
  {
    id: 'selva-pinot',
    name: 'Selva Pinot Noir',
    producer: 'Casa das Folhas',
    region: 'Campanha Gaúcha',
    country: 'Brasil',
    vintage: 2022,
    grape: 'Pinot Noir',
    type: 'tinto',
    price: 142,
    description:
      'Elegante e fresco, com notas de cereja silvestre e um toque herbáceo que ecoa a mata atlântica.',
    tastingNotes: ['Cereja', 'Folha de chá', 'Terra úmida'],
    glassColor: '#141810',
    liquidColor: '#6b1c24',
    foilColor: '#1e4d2b',
    labelTint: '#e6d5b8',
  },
  {
    id: 'aurora-chardonnay',
    name: 'Aurora Chardonnay',
    producer: 'Quinta do Cerrado',
    region: 'Serra do Sudeste',
    country: 'Brasil',
    vintage: 2023,
    grape: 'Chardonnay',
    type: 'branco',
    price: 118,
    description:
      'Branco mineral com passagem breve em carvalho — manteiga, pera e acidez vibrante.',
    tastingNotes: ['Pera', 'Manteiga', 'Baunilha'],
    glassColor: '#1c1812',
    liquidColor: '#d4b86a',
    foilColor: '#d4a25f',
    labelTint: '#f7f1e4',
  },
  {
    id: 'jaspe-malbec',
    name: 'Jaspe Malbec',
    producer: 'Bodega Horizonte',
    region: 'Mendoza',
    country: 'Argentina',
    vintage: 2021,
    grape: 'Malbec',
    type: 'tinto',
    price: 165,
    description:
      'Malbec de altitude com fruta madura, violetas e um final aveludado de cacau.',
    tastingNotes: ['Ameixa', 'Violeta', 'Cacau'],
    glassColor: '#120e0c',
    liquidColor: '#3d0a12',
    foilColor: '#7a2219',
    labelTint: '#f2ead3',
  },
  {
    id: 'orvalho-rose',
    name: 'Orvalho Rosé',
    producer: 'Vinícola Litoral',
    region: 'Provença',
    country: 'França',
    vintage: 2024,
    grape: 'Grenache',
    type: 'rosé',
    price: 98,
    description:
      'Rosé seco e luminoso — melancia, flor de laranjeira e um toque salino de brisa.',
    tastingNotes: ['Melancia', 'Flor de laranjeira', 'Sal'],
    glassColor: '#1a1612',
    liquidColor: '#e8a0a8',
    foilColor: '#8da399',
    labelTint: '#f7f1e4',
  },
  {
    id: 'cangussu-brut',
    name: 'Cangussu Brut Nature',
    producer: 'Empório Cangussu',
    region: 'Pinto Bandeira',
    country: 'Brasil',
    vintage: 2019,
    grape: 'Chardonnay / Pinot Noir',
    type: 'espumante',
    price: 210,
    description:
      'Espumante método tradicional, bolha fina e cremosa, com brioche e citrus confitado.',
    tastingNotes: ['Brioche', 'Limão siciliano', 'Amêndoa'],
    glassColor: '#161410',
    liquidColor: '#e8d9a8',
    foilColor: '#d4a25f',
    labelTint: '#f2ead3',
  },
]

export function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
