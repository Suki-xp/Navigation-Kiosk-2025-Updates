import Header from "@/app/components/Header";
import MapComponent from "./components/MapView";
import NearbyFooter from "./components/NearbyFooter";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MapComponent />
      <NearbyFooter />
    </div>
  );
}
