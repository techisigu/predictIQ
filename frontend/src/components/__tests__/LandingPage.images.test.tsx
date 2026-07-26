import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../LandingPage';
import { api } from '../../lib/api/client';

describe('LandingPage image loading', () => {
  beforeEach(() => {
    jest
      .spyOn(api, 'getStatistics')
      .mockResolvedValue({ totalMarkets: 128, totalVolume: 45000, activeUsers: 512 });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('lazy-loads the below-the-fold feature icons', () => {
    const { container } = render(<LandingPage />);

    const icons = [
      container.querySelector('img[src="/icons/decentralized.svg"]'),
      container.querySelector('img[src="/icons/secure.svg"]'),
      container.querySelector('img[src="/icons/fast.svg"]'),
    ];

    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('loading', 'lazy');
    });
  });

  it('does not lazy-load the above-the-fold logo', () => {
    render(<LandingPage />);

    const logo = screen.getByAltText('PredictIQ Logo');
    expect(logo).not.toHaveAttribute('loading', 'lazy');
  });
});
