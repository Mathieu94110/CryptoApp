import { CoinStatistic } from "@/types/coins.interface";
import { FaCloud, FaCoins, FaSmile, FaUser, FaUsers } from "react-icons/fa";

export const coinStatistics: CoinStatistic[] = [
  { icon: <FaUser />, label: "Nombre de possesseurs", key: "watchlist_portfolio_users" },
  { icon: <FaCoins />, label: "Score de liquidité", key: "liquidity_score" },
  { icon: <FaCloud />, label: "Plateforme", key: "asset_platform_id" },
  { icon: <FaSmile />, label: "Avis positifs", key: "sentiment_votes_up_percentage", suffix: "%" },
  { icon: <FaUsers />, label: "Score de la communauté", key: "community_score" }
];