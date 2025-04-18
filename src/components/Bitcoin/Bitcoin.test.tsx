import { render, screen } from '@testing-library/react';
import { fakeBitcoin } from 'src/mocks/bitcoin';

jest.mock('../HistoryChart/HistoryChart', () => () => <div data-testid="mock-chart" />);

describe('Bitcoin', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should Bitcoin image displayed correctly', async () => {
    jest.doMock('@/hooks/useResize', () => ({
      useResize: () => ({ screenSize: 1024 })
    }));

    const { default: Bitcoin } = await import('./Bitcoin');
    render(<Bitcoin bitcoin={fakeBitcoin} />);

    const image = screen.getByAltText('Bitcoin');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://fakeurl.com/bitcoin.png');
    expect(image).toHaveClass('bitcoin__img');
  });

  test('should data table headers displayed correctly on large screen', async () => {
    jest.doMock('@/hooks/useResize', () => ({
      useResize: () => ({ screenSize: 1024 })
    }));
    // On below import is async in order to wait until the mock is active before loading the component
    const { default: Bitcoin } = await import('./Bitcoin');
    render(<Bitcoin bitcoin={fakeBitcoin} />);
    // Kpis keys
    expect(screen.getByText(/CAPITALISATION/i)).toBeInTheDocument();
    expect(screen.getByText(/JETON/i)).toBeInTheDocument();
    expect(screen.getByText(/volume.*24h/i)).toBeInTheDocument();
    expect(screen.getByText(/MAX 24H/i)).toBeInTheDocument();
    expect(screen.getByText(/MIN 24H/i)).toBeInTheDocument();
    expect(screen.getByText(/EN CIRCULATION/i)).toBeInTheDocument();
    // Kpis values
    expect(screen.getByText(/123.4 M€/)).toBeInTheDocument();
    expect(screen.getByText(/21 M/)).toBeInTheDocument();
    expect(screen.getByText(/987.6 M/)).toBeInTheDocument();
    expect(screen.getByText(/30 K€/)).toBeInTheDocument();
    expect(screen.getByText(/25 K€/)).toBeInTheDocument();
    expect(screen.getByText(/19 500 000/)).toBeInTheDocument();

    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

  test('should data table headers displayed correctly on small screen', async () => {
    jest.doMock('@/hooks/useResize', () => ({
      useResize: () => ({ screenSize: 400 })
    }));

    const { default: Bitcoin } = await import('./Bitcoin');
    render(<Bitcoin bitcoin={fakeBitcoin} />);

    expect(screen.getByText(/cap.*24h/i)).toBeInTheDocument();
    expect(screen.getByText(/JETON/i)).toBeInTheDocument();
    expect(screen.getByText(/vol/i)).toBeInTheDocument();
    expect(screen.getByText(/MAX/i)).toBeInTheDocument();
    expect(screen.getByText(/MIN/i)).toBeInTheDocument();
    expect(screen.getByText(/DISPO/i)).toBeInTheDocument();

    expect(screen.getByText(/123.4 M€/)).toBeInTheDocument();
    expect(screen.getByText(/21 M/)).toBeInTheDocument();
    expect(screen.getByText(/987.6 M/)).toBeInTheDocument();
    expect(screen.getByText(/30 K€/)).toBeInTheDocument();
    expect(screen.getByText(/25 K€/)).toBeInTheDocument();
    expect(screen.getByText(/19 500 000/)).toBeInTheDocument();

    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });
});
