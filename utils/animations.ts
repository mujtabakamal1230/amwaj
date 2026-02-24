export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as any }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as any }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as any }
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as any }
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2
    }
  },
  viewport: { once: true, amount: 0.3 }
};

export const parallaxScroll = (scrollY: number, speed: number) => {
  return scrollY * speed;
};
