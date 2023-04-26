import TopSevenTrending from "../../components/TopSevenTrending/TopSevenTrending";
import Bitcoin from "../../components/Bitcoin/Bitcoin";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import "./Home.scss";
import Carousel from "../../components/Banner/Carousel";
function Home() {
  const { bitcoinData, sevenTrendsData }: any = useLoaderData();

  return (
    <div className="home">
      <Suspense fallback={<small>Loading</small>}>
        <Await resolve={[bitcoinData, sevenTrendsData]}>
          <div className="home__wrapper">
            {/* <Carousel /> */}
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
