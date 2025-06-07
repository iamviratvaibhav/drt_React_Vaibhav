// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useEffect, useState } from "react";
import { fetchSatellites } from "./utils/api";
import SearchBar from "./Components/SearchBar";
import Filters from "./Components/Filter";
import SatelliteTable from './Components/SatelliteTable';
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import SelectedPage from "./pages/SelectedPage";
function App() {

  const [satellites, setSatellites] = useState([]);
  const [filters, setFilters] = useState<{ objectTypes: string[]; orbitCodes: string[] }>({
    objectTypes: [],
    orbitCodes: [],
  })

  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    try {
      const data = await fetchSatellites({
        objectTypes: filters.objectTypes,
        orbitCodes: filters.orbitCodes,
        search: searchQuery
      });
      // // Optional: filter manually based on name/noradCatId search
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
  }, [filters, searchQuery]);

  const handleSearch = (query: string) => {
    console.log("Searching for: ", query);
  };

  const handleFilters = (filters: { objectTypes: string[]; orbitCodes: string[] }) => {
    console.log("Filters Applied:", filters);
  };


  // return (
  //   <div className="p-6">
  //     <h1 className="text-2xl font-bold mb-4">🛰️ Digantara Satellite Tracker</h1>
  //     <SearchBar onSearch={handleSearch} />
  //     <Filters onApply={handleFilters} />
  //     <SatelliteTable data={satellites} />
  //   </div>
  // )

      return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/selected" element={<SelectedPage />} />
    </Routes>
  );
}
export default App  
