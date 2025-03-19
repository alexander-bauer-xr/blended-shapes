// src/js/grid.ts
import gsap from 'gsap';

export default function initGridEffects(): void {
  const items = document.querySelectorAll<HTMLDivElement>('.grid-item');

  function addHoverEffects(): void {
    items.forEach(item => {
      if (!item.classList.contains('hover-bound')) {
        item.classList.add('hover-bound');
        item.addEventListener('mouseenter', handleMouseEnter);
        item.addEventListener('mouseleave', handleMouseLeave);
      }
    });
  }

  function removeHoverEffects(): void {
    items.forEach(item => {
      if (item.classList.contains('hover-bound')) {
        item.classList.remove('hover-bound');
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      }
    });
  }

  function handleMouseEnter(e: Event): void {
    const item = e.currentTarget as HTMLDivElement;
    const isTopLeft = item.classList.contains('top-left');
    const isTopRight = item.classList.contains('top-right');
    const isBottomLeft = item.classList.contains('bottom-left');
    const isBottomRight = item.classList.contains('bottom-right');

    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'power3.out' } });

    items.forEach(other => {
      let tx = 1, ty = 1;
      let origin = other.style.transformOrigin;

      if (other === item) {
        tx = ty = 1.05;
      } else {
        if (isTopLeft) {
          if (other.classList.contains('top-right')) { tx = 0.95; ty = 1.05; origin = 'top right'; }
          else if (other.classList.contains('bottom-left')) { tx = 1.05; ty = 0.95; origin = 'bottom left'; }
          else if (other.classList.contains('bottom-right')) { tx = 0.95; ty = 0.95; origin = 'bottom right'; }
        } else if (isTopRight) {
          if (other.classList.contains('top-left')) { tx = 0.95; ty = 1.05; origin = 'top left'; }
          else if (other.classList.contains('bottom-right')) { tx = 1.05; ty = 0.95; origin = 'bottom right'; }
          else if (other.classList.contains('bottom-left')) { tx = 0.95; ty = 0.95; origin = 'bottom left'; }
        } else if (isBottomLeft) {
          if (other.classList.contains('bottom-right')) { tx = 0.95; ty = 1.05; origin = 'bottom right'; }
          else if (other.classList.contains('top-left')) { tx = 1.05; ty = 0.95; origin = 'top left'; }
          else if (other.classList.contains('top-right')) { tx = 0.95; ty = 0.95; origin = 'top right'; }
        } else if (isBottomRight) {
          if (other.classList.contains('bottom-left')) { tx = 0.95; ty = 1.05; origin = 'bottom left'; }
          else if (other.classList.contains('top-right')) { tx = 1.05; ty = 0.95; origin = 'top right'; }
          else if (other.classList.contains('top-left')) { tx = 0.95; ty = 0.95; origin = 'top left'; }
        }
      }

      other.style.transformOrigin = origin;
      tl.to(other, { scaleX: tx, scaleY: ty }, 0);
    });
  }

  function handleMouseLeave(): void {
    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'power3.inOut' } });
    items.forEach(other => {
      tl.to(other, { scaleX: 1, scaleY: 1 }, 0);
    });
  }

  function checkWindowSize(): void {
    if (window.innerWidth > 1024) {
      addHoverEffects();
    } else {
      removeHoverEffects();
    }
  }

  checkWindowSize();
  window.addEventListener('resize', checkWindowSize);
}
