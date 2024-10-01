import { Header } from "./components/Header";
import { RecentAds } from "./components/RecentAds";
import "./App.css";

export function App() {
  return (
    <body>
      <main className="main-content">
        <Header />
        <RecentAds />
      </main>
    </body>
  );
}
