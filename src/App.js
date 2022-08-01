import routes from "./routes";
import { useRoutes } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";

export default function App() {
  let router = useRoutes(routes);
  return (
    <>
      <TopBar />

      <div className="main">
        <Sidebar />
        {router}
      </div>
    </>
  );
}
