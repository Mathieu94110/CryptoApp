import { Suspense } from "react";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import TopSevenTrends from "@/components/TopSevenTrends/TopSevenTrends";
import Bitcoin from "@/components/Bitcoin/Bitcoin";
import Carousel from "@/components/Carousel/Carousel";
import { HomeLoader } from "src/models/coins";
import "./Home.scss";

function Home(): JSX.Element {
  const { bitcoinData, sevenTrendsData } = useLoaderData() as HomeLoader;

  return (
    <div className="home">
      <Suspense fallback={<small>Chargement en cours ...</small>}>
        <Await resolve={[bitcoinData, sevenTrendsData]}>
          <Carousel />
          <div className="home__tables">
            <TopSevenTrends sevenTrends={sevenTrendsData} />
            <Bitcoin bitcoin={bitcoinData} />
          </div>
        </Await>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default Home;
