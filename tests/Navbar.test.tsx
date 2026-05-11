import { render, fireEvent } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));
import { Navbar } from '@/components/Navbar';

test('mobile menu toggles and shows mobile nav element', () => {
  // simulate mobile screen width
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
  const { container } = render(<Navbar />);
  const toggle = container.querySelector('button[aria-label="Toggle navigation"]');
  if (!toggle) throw new Error('Toggle button not found');
  fireEvent.click(toggle);
  const mobileNav = container.querySelector('#mobile-nav');
  expect(mobileNav).toBeTruthy();
});
