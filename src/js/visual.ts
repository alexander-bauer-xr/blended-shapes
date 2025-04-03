// src/js/visual.ts

export default function initVisualScrollEffects(): void {
  // === GLOBAL ELEMENT REFERENCES ===
  const heroContainer = document.querySelector('.hero-container') as HTMLElement;
  const canvasContainer = document.getElementById('canvas-container') as HTMLElement;
  const heroTransformLeft = document.querySelector('.transform-frame-left') as HTMLElement;
  const heroTransformRight = document.querySelector('.transform-frame-right') as HTMLElement;
  const menu = document.querySelector('.menu') as HTMLElement;
  const CTAwraper = document.querySelector('.CTA-wraper') as HTMLElement;
  const CTA = document.querySelector('.CTA') as HTMLElement;
  const CTAspacer = document.querySelector('.CTA-spacer') as HTMLElement;
  const CTAhead = document.querySelector('.CTA-head') as HTMLElement;

  // === DEBOUNCE HELPER ===
  function debounce(fn: (...args: any[]) => void, delay = 200) {
    let timeout: number;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => fn(...args), delay);
    };
  }

  let ctaFrozen = false;
  let scrollRAF: number | null = null;

  // === SCROLL ANIMATION ===
  function handleScrollFrame() {
    const scrollY = window.scrollY;

    const scale = Math.max(1 - scrollY * 0.004, 0.7);
    const translateY = Math.min(scrollY * 0.7, 250);
    const opacity = Math.max(1 - scrollY * 0.004, 0);
    const scrollPercentage = (scrollY / window.innerHeight) * 100;

    heroContainer.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    canvasContainer.style.opacity = `${opacity}`;
    heroTransformLeft.style.opacity = `${opacity}`;
    heroTransformRight.style.opacity = `${opacity}`;
    menu.style.backgroundColor = scrollPercentage >= 90 ? 'rgba(255, 255, 255, 0.85)' : 'transparent';
    CTA.classList.toggle('scrolled-CTA', scrollPercentage >= 5);

    const triggerPointClip = document.documentElement.scrollHeight - (window.innerHeight * 0.15);
    if (scrollY + window.innerHeight >= triggerPointClip) {
      canvasContainer.style.opacity = '1';
      canvasContainer.style.transition = 'opacity 0.2s ease';
      const menuHeight = CTAhead.offsetHeight;
      heroContainer.style.transform = `scale(1) translateY(${menuHeight}px)`;
    }

    const triggerPoint = document.documentElement.scrollHeight - (window.innerHeight * 0.35);
    if (scrollY + window.innerHeight >= triggerPoint) {
      if (!ctaFrozen) {
        ctaFrozen = true;
        CTA.style.position = 'absolute';
        CTA.style.right = '50%';
        CTA.style.transform = 'translateX(50%)';
        CTAspacer.style.maxHeight = '40vh';
      }
    } else {
      if (ctaFrozen) {
        ctaFrozen = false;
        CTA.style.position = 'fixed';
        CTA.style.right = 'var(--spacing-m)';
        CTA.style.transform = 'translateX(0%)';
        CTAspacer.style.maxHeight = '0vh';
      }
    }

    const state = (window as any)._experienceState;
    if (!state) return;
    const { experiences, segmentRange, pinnedOffset, scrolly, stickyContainer, totalHeight } = state;
    if (!experiences) return;

    if (scrollY < pinnedOffset) {
      experiences.forEach((exp: HTMLElement) => {
        exp.style.height = `${exp.dataset.fullheight}px`;
        exp.querySelectorAll('p').forEach(p => (p as HTMLElement).style.maxHeight = `${(p as HTMLElement).dataset.height}px`);
      });
    } else {
      const localScroll = scrollY - pinnedOffset;
      experiences.forEach((exp: HTMLElement, index: number) => {
        const fullH = parseFloat(exp.dataset.fullheight!);
        const minH = parseFloat(exp.dataset.minheight!);
        const start = index * segmentRange;
        const end = (index + 1) * segmentRange;
        const experienceTextHeight = (exp.querySelector('.experience-text') as HTMLElement)?.dataset.height || 0;
        const paragraphs = exp.querySelectorAll('p');

        if (localScroll < start) {
          exp.style.height = `${fullH}px`;
          paragraphs.forEach(p => (p as HTMLElement).style.maxHeight = `${(p as HTMLElement).dataset.height}px`);
        } else if (localScroll > end) {
          exp.style.height = `${minH}px`;
          paragraphs.forEach(p => (p as HTMLElement).style.maxHeight = '0px');
        } else {
          const progress = (localScroll - start) / (end - start);
          const currentHeight = fullH - (fullH - minH) * progress;
          exp.style.height = `${currentHeight}px`;
          paragraphs.forEach(p => {
            (p as HTMLElement).style.maxHeight =
              currentHeight < Number(experienceTextHeight) ? '0px' : `${(p as HTMLElement).dataset.height}px`;
          });
        }
      });

      const bottomOfPage = scrollY + window.innerHeight;
      if (bottomOfPage >= scrolly.scrollHeight) {
        const stickyHeight = stickyContainer.offsetHeight;
        scrolly.style.height = `${totalHeight + stickyHeight}px`;
      }
    }

    scrollRAF = null;
  }

  function handleSmartScroll() {
    if (!scrollRAF) {
      scrollRAF = requestAnimationFrame(handleScrollFrame);
    }
  }

  function setupExperiences() {
    const scrolly = document.getElementById('experiencesScrolly')!;
    const experiences = document.querySelectorAll('.experience')!;
    const stickyContainer = document.querySelector('.sticky-container') as HTMLElement;
    const remGap = calculateRemGap();
    const totalHeight = prepareExperienceHeights(experiences, remGap);
    setScrollyHeight(scrolly, totalHeight, stickyContainer);
    positionStickyContainer(stickyContainer, menu, remGap);
    const segmentRange = totalHeight / experiences.length;
    const pinnedOffset = getPinnedOffset(scrolly);
    (window as any)._experienceState = {
      experiences,
      remGap,
      stickyContainer,
      scrolly,
      segmentRange,
      pinnedOffset,
      totalHeight,
    };
    handleScrollFrame();
  }

  function calculateRemGap(): number {
    const gapElement = document.createElement('div');
    gapElement.style.cssText = 'display:none;width:1px;height:1px;margin-top:clamp(0.5rem, 1vw, 1rem)';
    document.body.appendChild(gapElement);
    const remGap = parseFloat(getComputedStyle(gapElement).marginTop);
    document.body.removeChild(gapElement);
    return remGap;
  }

  function resetToUnscrolledState() {
    const { experiences } = (window as any)._experienceState || {};
    if (!experiences) return;
    experiences.forEach((exp: HTMLElement) => {
      exp.style.height = 'auto';
      exp.querySelectorAll('p').forEach(p => (p as HTMLElement).style.maxHeight = 'none');
    });
  }

  function measureParagraphHeight(p: HTMLElement): number {
    const originalMaxHeight = p.style.maxHeight;
    const originalDisplay = p.style.display;
    p.style.maxHeight = 'none';
    p.style.display = 'block';
    const height = p.scrollHeight;
    p.style.maxHeight = originalMaxHeight;
    p.style.display = originalDisplay;
    return height;
  }

  function measureExperienceFullHeight(exp: HTMLElement): number {
    const paragraphs = exp.querySelectorAll('p');
    const originalHeight = exp.style.height;
    const originalParagraphMaxHeights: string[] = [];
    paragraphs.forEach((p, i) => (originalParagraphMaxHeights[i] = (p as HTMLElement).style.maxHeight));
    paragraphs.forEach(p => ((p as HTMLElement).style.maxHeight = 'none'));
    exp.style.height = 'auto';
    const measuredHeight = exp.offsetHeight;
    exp.style.height = originalHeight;
    paragraphs.forEach((p, i) => ((p as HTMLElement).style.maxHeight = originalParagraphMaxHeights[i]));
    return measuredHeight;
  }

  function prepareExperienceHeights(experiences: NodeListOf<Element>, remGap: number): number {
    let totalHeight = 0;
    experiences.forEach(exp => {
      const el = exp as HTMLElement;
      const fullHeight = measureExperienceFullHeight(el);
      el.style.height = 'auto';
      const h3Height = el.querySelector('h3')?.offsetHeight || 0;
      const aHeight = el.querySelector('a')?.offsetHeight || 0;
      const minHeight = h3Height + aHeight + remGap;
      el.style.height = `${fullHeight}px`;
      const experienceText = el.querySelector('.experience-text') as HTMLElement;
      const expTextHeight = experienceText?.offsetHeight || 0;
      el.querySelectorAll('p').forEach(p => ((p as HTMLElement).dataset.height = measureParagraphHeight(p as HTMLElement).toString()));
      Object.assign(el.dataset, { fullheight: fullHeight, minheight: minHeight, segmentRange: fullHeight - minHeight });
      if (experienceText) experienceText.dataset.height = expTextHeight.toString();
      totalHeight += fullHeight;
    });
    return totalHeight;
  }

  function updateExperienceHeights(experiences: NodeListOf<Element>, remGap: number, stickyContainer: HTMLElement, scrolly: HTMLElement): number {
    let totalHeight = 0;
    experiences.forEach(exp => {
      const el = exp as HTMLElement;
      const fullHeight = measureExperienceFullHeight(el);
      el.style.height = 'auto';
      const h3Height = el.querySelector('h3')?.offsetHeight || 0;
      const aHeight = el.querySelector('a')?.offsetHeight || 0;
      const minHeight = h3Height + aHeight + remGap;
      el.style.height = `${fullHeight}px`;
      const experienceText = el.querySelector('.experience-text') as HTMLElement;
      const expTextHeight = experienceText?.offsetHeight || 0;
      el.querySelectorAll('p').forEach(p => ((p as HTMLElement).dataset.height = measureParagraphHeight(p as HTMLElement).toString()));
      Object.assign(el.dataset, { fullheight: fullHeight, minheight: minHeight, segmentRange: fullHeight - minHeight });
      if (experienceText) experienceText.dataset.height = expTextHeight.toString();
      totalHeight += fullHeight;
    });
    setScrollyHeight(scrolly, totalHeight, stickyContainer);
    positionStickyContainer(stickyContainer, menu, remGap);
    return totalHeight;
  }

  function setScrollyHeight(scrolly: HTMLElement, totalHeight: number, stickyContainer: HTMLElement): void {
    const stickyHeight = stickyContainer.offsetHeight;
    scrolly.style.height = `${totalHeight + stickyHeight}px`;
  }

  function positionStickyContainer(stickyContainer: HTMLElement, menu: HTMLElement, remGap: number): void {
    const menuHeight = menu.offsetHeight + remGap;
    stickyContainer.style.top = `${menuHeight}px`;
  }

  function heightCTA(): void {
    const menuHeight = window.innerHeight - menu.offsetHeight;
    CTAwraper.style.maxHeight = `${menuHeight}px`;
  }

  function getPinnedOffset(scrolly: HTMLElement): number {
    const rect = scrolly.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    return rect.top + scrollTop;
  }

  function updateScrollbarWidth(): void {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }

  // === INIT now directly invoked (React compatible)
  setupExperiences();
  updateScrollbarWidth();
  handleScrollFrame();
  heightCTA();

  window.addEventListener('scroll', handleSmartScroll);
  window.addEventListener('resize', debounce(() => {
    const { experiences, remGap, stickyContainer, scrolly } = (window as any)._experienceState;
    resetToUnscrolledState();
    const totalHeight = updateExperienceHeights(experiences, remGap, stickyContainer, scrolly);
    requestAnimationFrame(() => {
      setScrollyHeight(scrolly, totalHeight, stickyContainer);
      const pinnedOffset = getPinnedOffset(scrolly);
      const segmentRange = totalHeight / experiences.length;
      Object.assign((window as any)._experienceState, { totalHeight, pinnedOffset, segmentRange });
      handleScrollFrame();
    });
    heightCTA();
  }, 200));
}  