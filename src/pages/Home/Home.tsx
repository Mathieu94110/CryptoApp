import TopSevenTrending from "../../components/TopHeightTrending/TopHeightTrending";
import Bitcoin from "../../components/Bitcoin/Bitcoin";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import "./Home.scss";
import Carousel from "../../components/Banner/Carousel";
import { HomeLoader } from "../../types/coins.interface";

function Home() {
  const { bitcoinData, sevenTrendsData } = useLoaderData() as HomeLoader;

  return (
    <div className="home">
      <Suspense fallback={<small>Loading</small>}>
        <Await resolve={[bitcoinData, sevenTrendsData]}>
          <div className="home__wrapper">
            <Carousel />
            <div className="home__tables">
              <TopSevenTrending sevenTrends={sevenTrendsData} />
              <Bitcoin bitcoin={bitcoinData} />
            </div>
          </div>
        </Await>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default Home;
