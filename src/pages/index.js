import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/Map.js"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1>India Map</h1>
      <Map />
    </div>
  );
}
