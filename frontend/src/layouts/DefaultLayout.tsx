import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const DefaultLayout = () => {
  return (
    <main className="main-content">
      <Header />
      <Outlet />
    </main>
  );
};
