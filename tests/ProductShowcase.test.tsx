import { render, waitFor } from '@testing-library/react';
import { ProductShowcase } from '@/components/ProductShowcase';

class VisibleIntersectionObserver {
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target, intersectionRatio: 0.6 } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
  root = null;
  rootMargin = '0px';
  thresholds = [0.35];
}

describe('ProductShowcase', () => {
  it('tracks when product proof becomes visible', async () => {
    window.dataLayer = [];
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: VisibleIntersectionObserver,
    });
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      writable: true,
      value: VisibleIntersectionObserver,
    });

    render(<ProductShowcase />);

    await waitFor(() => {
      expect(window.dataLayer).toContainEqual({ event: 'product_showcase_view' });
    });
  });
});
