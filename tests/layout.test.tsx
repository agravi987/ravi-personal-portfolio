import { render } from '@testing-library/react';
import RootLayout from '@/app/layout';

test('layout contains responsive container wrapper', () => {
  const { container } = render(<RootLayout>Test content</RootLayout>);
  const wrapper = container.querySelector('.container.mx-auto');
  expect(wrapper).toBeInTheDocument();
});
