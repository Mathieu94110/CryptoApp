import { findAllByAltText, render, screen, waitFor } from '@testing-library/react';
import Carousel from './Carousel';
import { getTrendingCoins } from '../../apis/coinGecko';
import { fakeTrendingCoins } from 'src/mocks/carousel';
import { MemoryRouter } from 'react-router-dom';
import CarouselItem from './CarouselItem';

jest.mock('../../apis/coinGecko', () => ({
  getTrendingCoins: jest.fn()
}));

describe('Carousel', () => {
  beforeEach(() => {
    (getTrendingCoins as jest.Mock).mockResolvedValue(fakeTrendingCoins);
  });

  test('should trending coins render correctly in carousel', async () => {
    render(<MemoryRouter>
      <Carousel />
    </MemoryRouter>);
    //texts
    expect((await screen.findAllByText('Bitcoin'))[0]).toBeInTheDocument();
    expect((await screen.findAllByText('Solana'))[0]).toBeInTheDocument();
    expect((await screen.findAllByText('Pepe'))[0]).toBeInTheDocument();
    // images
    expect((await screen.findAllByAltText('Bitcoin'))[0]).toHaveAttribute('src', 'https://fakeurl.com/bitcoin.png');
    expect((await screen.findAllByAltText('Solana'))[0]).toHaveAttribute('src', 'https://fakeurl.com/solana.png');
    expect((await screen.findAllByAltText('Pepe'))[0]).toHaveAttribute('src', 'https://fakeurl.com/pepe.png');

    // symbols
    expect((await screen.findAllByText('btc'))[0]).toBeInTheDocument();
    expect((await screen.findAllByText('sol'))[0]).toBeInTheDocument();
    expect((await screen.findAllByText('pepe'))[0]).toBeInTheDocument();


    // prices
    const btcPriceElements = await screen.findAllByText((content) =>
      content.replace(/\s/g, '').includes('30000,00')
    );

    const pepePriceElements = await screen.findAllByText((content) =>
      content.replace(/\s/g, '').includes('0,05')
    );
    const solanaPriceElements = await screen.findAllByText((content) =>
      content.replace(/\s/g, '').includes('112')
    );
    expect(btcPriceElements.length).toBeGreaterThan(0);
    expect(pepePriceElements.length).toBeGreaterThan(0);
    expect(solanaPriceElements.length).toBeGreaterThan(0);

    // links
    expect(
      screen.getByRole('link', { name: /bitcoin/i })
    ).toHaveAttribute('href', '/Details/bitcoin');
    expect(screen.getByRole('link', { name: /go to bitcoin details/i })).toBeInTheDocument();
  });
  test('should display "Unknown" when coin name is missing', () => {
    const coinWithoutName = { ...fakeTrendingCoins[0], name: undefined };
    render(
      <MemoryRouter>
        <CarouselItem coin={coinWithoutName} />
      </MemoryRouter>
    );
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
})

