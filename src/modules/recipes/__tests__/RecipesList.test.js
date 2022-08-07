import { render, screen } from '@testing-library/react';
import RecipesList from '../RecipesList';
import React from 'react';
import '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import useFetchHelloFreshBox from '../../../hooks/useFetchHelloFreshBox';
import { act } from 'react-dom/test-utils';
beforeAll(async () => {
  await act(async () => {
    render(<RecipesList />);
    const { result, waitForValueToChange } = renderHook(() => useFetchHelloFreshBox());
    await waitForValueToChange(() => result.current.loading, { timeout: false });
  });
});
test('renders ', () => {
  const priceElement = screen.getByTestId('total-price');
  const headlineElement = screen.getByTestId('headline');
  expect(priceElement).toBeInTheDocument();
  expect(headlineElement).toBeInTheDocument();
});
