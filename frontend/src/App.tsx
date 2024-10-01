import { Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { AdDetails } from "./pages/AdDetails";
import "./App.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="ads/:id" element={<AdDetails />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
