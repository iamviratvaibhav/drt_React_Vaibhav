// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { fetchSatellites } from "../utils/api";
import SearchBar from "../Components/SearchBar";
import Filters from "../Components/Filter";
import SatelliteTable from '../Components/SatelliteTable';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
    const [satellites, setSatellites] = useState([]);
    const [filters, setFilters] = useState<{ objectTypes: string[]; orbitCodes: string[] }>({
        objectTypes: [],
        orbitCodes: [],
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState<any[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resultCount, setResultCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;


    useEffect(() => {
        loadData();
    }, [filters, searchQuery]);

    const handleSelect = (item: any) => {
        const alreadySelected = selected.find((s) => s.noradCatId === item.noradCatId);

        if (alreadySelected) {
            setSelected(selected.filter((s) => s.noradCatId !== item.noradCatId));
        } else {
            if (selected.length >= 10) {
                // alert("You can select a maximum of 10 satellites.");
                toast.error('Please select 10 satellites at a time');
                return;
            }
            setSelected([...selected, item]);
        }
    };

    const handleProceed = () => {
        localStorage.setItem("selectedSatellites", JSON.stringify(selected));
        navigate("/selected");
    };

    const paginatedData = satellites.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

  const loadData = async () => {
  setLoading(true);
  setError('');
  try {
    const responseData = await fetchSatellites({
      objectTypes: filters.objectTypes,
    });

    const filteredData = responseData.filter((item: any) => {
      const search = searchQuery.trim().toLowerCase();
      const name = item.name?.toLowerCase() || "";
      const id = item.noradCatId?.toLowerCase() || "";
      const matchesSearch = name.includes(search) || id.includes(search);
      const satelliteOrbitCode = (item.orbitCode || "").replace(/[{}]/g, "").toUpperCase();
    const matchesOrbit =
    filters.orbitCodes.length === 0 ||
    filters.orbitCodes.map((code) => code.toUpperCase()).includes(satelliteOrbitCode);

        
    const matchesType =
    filters.objectTypes.length === 0 || filters.objectTypes.includes(item.objectType);
    return matchesSearch && matchesOrbit && matchesType;
  });

    setResultCount(filteredData.length);
    setSatellites(filteredData); 
    setCurrentPage(1); 
  } catch (error) {
    setError("Failed to load satellite data.");
    setSatellites([]);
  } finally {
    setLoading(false);
  }
};

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">🛰️ Digantara Satellite Tracker</h1>
            <SearchBar onSearch={setSearchQuery} />
            <Filters onApply={setFilters} />
            {!loading && !error && (
                <div className="text-sm text-gray-700 mb-2">
                    Results: {resultCount} satellite{resultCount !== 1 ? 's' : ''} found
                </div>
            )}
            {loading && (
            <div className="w-full my-4">
              <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full animate-loading-bar bg-blue-500"></div>
              </div>
              <p className="text-center text-blue-500 mt-2">Loading satellites...</p>
            </div>
          )}

            {error && <div className="text-center text-red-500 py-4">{error}</div>}
            {!loading && !error &&
            <SatelliteTable data={paginatedData} selected={selected} onSelect={handleSelect} />}
            <div className="mt-4 flex items-center gap-4">
                <span>Selected: {selected.length}</span>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={handleProceed}
                >
                    Proceed
                </button>
                <Toaster />
            </div>

          {!loading && !error && resultCount > itemsPerPage && (
  <div className="flex justify-center items-center gap-4 mt-4">
    <button
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span>Page {currentPage} of {Math.ceil(resultCount / itemsPerPage)}</span>
    <button
      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      onClick={() =>
        setCurrentPage((p) => Math.min(p + 1, Math.ceil(resultCount / itemsPerPage)))
      }
      disabled={currentPage >= Math.ceil(resultCount / itemsPerPage)}
    >
      Next
    </button>
  </div>
)}
        </div>
    );
};

export default Home;



// import { useEffect, useMemo, useState } from "react";
// import { fetchSatellites } from "../utils/api";
// import SearchBar from "../Components/SearchBar";
// import Filters from "../Components/Filter";
// import SatelliteTable from "../Components/SatelliteTable";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// const Home = () => {
//   const [allSatellites, setAllSatellites] = useState<any[]>([]); // only from API
//   const [filters, setFilters] = useState<{ objectTypes: string[]; orbitCodes: string[] }>({
//     objectTypes: [],
//     orbitCodes: [],
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selected, setSelected] = useState<any[]>([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch from API only when objectTypes change
//   useEffect(() => {
//     const load = async () => {
//       if (filters.objectTypes.length === 0) {
//         setAllSatellites([]);
//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         const data = await fetchSatellites({
//           objectTypes: filters.objectTypes,
//         });
//         setAllSatellites(data);
//       } catch (err) {
//         setError("Failed to fetch satellite data.");
//         setAllSatellites([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [filters.objectTypes]);

// //   // Fast filtering using useMemo
// //   const filteredSatellites = useMemo(() => {
// //     const search = searchQuery.trim().toLowerCase();

// //     return allSatellites.filter((item) => {
// //       const name = item.name?.toLowerCase() || "";
// //       const id = item.noradCatId?.toLowerCase() || "";
// //       const orbitCode = item.orbitCode?.toUpperCase() || "";
// //       const matchesSearch = name.includes(search) || id.includes(search);
// //       const matchesOrbit =
// //         filters.orbitCodes.length === 0 ||
// //         filters.orbitCodes.map((code) => code.toUpperCase()).includes(orbitCode);

// //       return matchesSearch && matchesOrbit;
// //     });
// //   }, [allSatellites, filters.orbitCodes, searchQuery]);


  

// const handleSelect = (item: any) => {
//     const alreadySelected = selected.find((s) => s.noradCatId === item.noradCatId);
//     if (alreadySelected) {
//       setSelected(selected.filter((s) => s.noradCatId !== item.noradCatId));
//     } else {
//       if (selected.length >= 10) {
//         toast.error("Please select up to 10 satellites only.");
//         return;
//       }
//       setSelected([...selected, item]);
//     }
//   };

//   const handleProceed = () => {
//     localStorage.setItem("selectedSatellites", JSON.stringify(selected));
//     navigate("/selected");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">🛰️ Digantara Satellite Tracker</h1>
//       <SearchBar onSearch={setSearchQuery} />
//       <Filters onApply={setFilters} />

//       {!loading && !error && (
//         <div className="text-sm text-gray-700 mb-2">
//           Results: {filteredSatellites.length} satellite{filteredSatellites.length !== 1 ? "s" : ""} found
//         </div>
//       )}

//       {loading && <div className="text-center text-blue-500 py-4">Loading satellites...</div>}
//       {error && <div className="text-center text-red-500 py-4">{error}</div>}

//       {!loading && !error && (
//         <SatelliteTable data={filteredSatellites} selected={selected} onSelect={handleSelect} />
//       )}

//       <div className="mt-4 flex items-center gap-4">
//         <span>Selected: {selected.length}</span>
//         <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleProceed}>
//           Proceed
//         </button>
//         <Toaster />
//       </div>
//     </div>
//   );
// };

// export default Home;
