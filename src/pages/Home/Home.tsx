import TopSevenTrending from "../../components/TopSevenTrending/TopSevenTrending";
import Bitcoin from "../../components/Bitcoin/Bitcoin";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import "./Home.scss";
function Home() {
  const { bitcoinData, sevenTrendsData }: any = useLoaderData();

  return (
    <div className="home">
      <Suspense fallback={<small>Loading</small>}>
        <Await resolve={[bitcoinData, sevenTrendsData]}>
          <div className="home-wrapper">
            <TopSevenTrending sevenTrends={sevenTrendsData} />
            <Bitcoin bitcoin={bitcoinData} />
          </div>
        </Await>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default Home;
