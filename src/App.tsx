import { useEffect, useState } from "react";
import { fetchSatellites } from "./utils/api";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import SelectedPage from "./pages/SelectedPage";
function App() {

  const [satellites, setSatellites] = useState([]);
  const [filters, setFilters] = useState<{ objectTypes: string[]; orbitCodes: string[] }>({
    objectTypes: [],
    orbitCodes: [],
  })
   const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    try {
      const data = await fetchSatellites({
        objectTypes: filters.objectTypes,
        orbitCodes: filters.orbitCodes,
        search: searchQuery
      });
      const filteredData = data.filter((item: any) => {
        const target = `${item.name} ${item.noradCatId}`.toLowerCase();
        return target.includes(searchQuery.toLowerCase());
      });

      setSatellites(filteredData);
    } catch (error) {
      console.log("Error fetching data:", error);
      setSatellites([]);
    }
  };

  useEffect(() => {
    loadData();
     const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [filters, searchQuery, darkMode]);

      return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/selected" element={<SelectedPage />} />
    </Routes>
  );
}
export default App  
