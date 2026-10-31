import AOS from 'aos'
import 'aos/dist/aos.css'

let observer: IntersectionObserver | null = null
let mutationObserver: MutationObserver | null = null

export const initAOS = () => {
  // 1. Initialize AOS standard library
  try {
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 40,
      delay: 0,
      anchorPlacement: 'top-bottom',
    })
  } catch (err) {
    console.warn('AOS library init fallback', err)
  }

  // 2. High-performance Native IntersectionObserver
  // Guarantees animations trigger reliably in React 19 even with async data fetching
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          const isOnce = el.getAttribute('data-aos-once') === 'true'

          if (entry.isIntersecting) {
            const delay = el.getAttribute('data-aos-delay')
            const duration = el.getAttribute('data-aos-duration') || '750'

            if (delay) {
              el.style.transitionDelay = `${delay}ms`
            }
            el.style.transitionDuration = `${duration}ms`

            el.classList.add('aos-animate')

            if (isOnce) {
              observer?.unobserve(el)
            }
          } else if (!isOnce) {
            // Re-arm animation when scrolled out of view so scrolling down triggers animation again
            el.classList.remove('aos-animate')
          }
        })
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: [0, 0.15],
      }
    )

    // Observe all existing elements with [data-aos]
    const elements = document.querySelectorAll('[data-aos]')
    elements.forEach((el) => observer?.observe(el))

    // Watch for dynamic DOM changes (e.g. after Supabase async data loads)
    if (!mutationObserver && 'MutationObserver' in window) {
      mutationObserver = new MutationObserver(() => {
        const currentElements = document.querySelectorAll('[data-aos]')
        currentElements.forEach((el) => {
          observer?.observe(el)
        })
        try {
          AOS.refresh()
        } catch {
          // ignore
        }
      })

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      })
    }
  }
}

export const refreshAOS = () => {
  if (observer) {
    const elements = document.querySelectorAll('[data-aos]')
    elements.forEach((el) => observer?.observe(el))
  }
  try {
    AOS.refresh()
  } catch {
    // ignore
  }
}

