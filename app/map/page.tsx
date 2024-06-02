import MapContainer from "../_components/MapContainer";

export default function Home(): JSX.Element {
  return (
      <div className="absolute overflow-hidden inset-0 bg-mapBg">
        <MapContainer />
      </div>
  );
}
