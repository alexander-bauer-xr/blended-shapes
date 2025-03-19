// src/js/menuBackground.ts

export default function initMenuBackgroundScrollEffect(): void {
    const menu = document.querySelector('.menu') as HTMLElement | null;
  
    function handleMenuBackground(scrollY: number): void {
      const scrollPercentage = (scrollY / window.innerHeight) * 100;
  
      if (menu) {
        menu.style.backgroundColor =
          scrollPercentage >= 5 ? 'rgba(255, 255, 255, 0.85)' : 'transparent';
      }
    }
  
    function onScroll(): void {
      requestAnimationFrame(() => handleMenuBackground(window.scrollY));
    }
  
    window.addEventListener('scroll', onScroll);
    handleMenuBackground(window.scrollY);
  }
  