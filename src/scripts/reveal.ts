export function initReveal(): void {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const targets = document.querySelectorAll<HTMLElement>('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const group = el.closest<HTMLElement>('[data-reveal-group]');
        const stagger = group ? Array.from(group.querySelectorAll('.reveal')).indexOf(el) : 0;
        window.setTimeout(() => el.classList.add('revealed'), stagger * 80);
        observer.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

export function initStickyWhatsApp(): void {
  const fab = document.querySelector<HTMLElement>('[data-sticky-whatsapp]');
  const footer = document.querySelector<HTMLElement>('footer');
  if (!fab) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const showAfter = 400;

  const updateVisibility = () => {
    const pastThreshold = window.scrollY > showAfter;
    let overlappingFooter = false;
    if (footer) {
      const rect = footer.getBoundingClientRect();
      overlappingFooter = rect.top < window.innerHeight;
    }
    const shouldShow = pastThreshold && !overlappingFooter;
    fab.classList.toggle('is-visible', shouldShow);
  };

  if (prefersReducedMotion) {
    fab.style.transition = 'none';
  }

  updateVisibility();
  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', updateVisibility);
}

export function initAccordion(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-faq-item]');
  items.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('[data-faq-trigger]');
    const panel = item.querySelector<HTMLElement>('[data-faq-panel]');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        panel.style.maxHeight = '0px';
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  });
}

initReveal();
initStickyWhatsApp();
initAccordion();
