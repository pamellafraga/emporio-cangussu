export const SOCIAL = {
  instagram: {
    handle: '@emporio_cangassu',
    href: 'https://www.instagram.com/emporio_cangassu/',
  },
  whatsapp: {
    label: '+55 (51) 99913-8586',
    phone: '5551999138586',
    href: 'https://wa.me/5551999138586?text=Ol%C3%A1!%20Vim%20pelo%20cat%C3%A1logo%20do%20Emp%C3%B3rio%20Cangussu.',
  },
} as const

export function whatsappLink(message: string) {
  return `https://wa.me/${SOCIAL.whatsapp.phone}?text=${encodeURIComponent(message)}`
}
