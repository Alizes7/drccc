/**
 * Sistema único de movimento do site.
 * Uma curva de easing própria (não a padrão do framework), usada em todas as
 * seções — em vez de cada arquivo definir sua própria variação de "fade up".
 */
export const EASE_SIGNATURE = [0.22, 1, 0.36, 1] as const;

export const fadeUp = (delay = 0, distance = 22) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.65, delay, ease: EASE_SIGNATURE },
});

export const fadeUpEager = (delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE_SIGNATURE },
});

export const fadeSide = (fromRight: boolean, delay = 0, distance = 24) => ({
  initial: { opacity: 0, x: fromRight ? distance : -distance },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, delay, ease: EASE_SIGNATURE },
});
