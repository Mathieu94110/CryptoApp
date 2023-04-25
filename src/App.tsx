import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.scss";

function App() {
  return (
    <div className="app-container">
      <div className="flex-fill">
        <Suspense>
          <NavBar />
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
