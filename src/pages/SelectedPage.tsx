import { useEffect, useState } from "react";

const SelectedPage = () => {
  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedSatellites");
    if (stored) {
      setSelected(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Selected Satellites</h2>
      <ul className="space-y-2">
        {selected.map((item) => (
          <li key={item.noradCatId} className="border p-2 rounded">
            {item.name} (NORAD ID: {item.noradCatId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedPage;
