import { useRouteError } from "react-router-dom";

type ErrorRoute = {
  message: string;
  statusText: string;
};

function ErrorPage() {
  const error = useRouteError() as ErrorRoute;
  console.log(error);
  return (
    <div className="full-size content-center">
      <h2>Erreur concernant la page</h2>
      <p>{error.message || error.statusText}</p>
    </div>
  );
}

export default ErrorPage;
