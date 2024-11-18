import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { AdDetails } from "./pages/AdDetails";
import { CategoryAds } from "./pages/CategoryAds";
import { NewAdEditor } from "./pages/NewAdEditor";
import { UpdateAdEditor } from "./pages/UpdateAdEditor";
import "./App.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/ads/new-ad" element={<NewAdEditor />} />
        <Route path="ads/updateAd/:id" element={<UpdateAdEditor />} />
        <Route path="/ads/:id" element={<AdDetails />} />
        <Route path="/categories/:id" element={<CategoryAds />} />
        <Route path="*" Component={() => <Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
