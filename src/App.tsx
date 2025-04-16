import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routesConfig } from "./router";
import "./App.scss";

const router = createBrowserRouter(routesConfig);
function App() {
  return (
    <div className="app-container">
      <div
        role="document"
        className="flex-fill d-flex  flex-column"
      >
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </div>
    </div>
  );
}

export default App;
