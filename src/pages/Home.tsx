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


    // const loadData = async () => {
    //     try {
    //         const data = await fetchSatellites({ objectTypes: filters.objectTypes, orbitCodes: filters.orbitCodes });

    //         const filteredData = data.filter((item: any) => {
    //             const target = `${item.name} ${item.noradCatId}`.toLowerCase();
    //             return target.includes(searchQuery.toLowerCase());
    //         });

    //         setSatellites(filteredData);
    //     } catch (error) {
    //         console.log("Error fetching data:", error);
    //         setSatellites([]);
    //     }
    // };

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




    // const loadData = async () => {
    //     setLoading(true);
    //     setError('');

    //     try {
    //         const data = await fetchSatellites({ objectTypes: filters.objectTypes, orbitCodes: filters.orbitCodes });

    //         const filteredData = data.filter((item: any) => {
    //             const target = `${item.name} ${item.noradCatId}`.toLowerCase();
    //             return target.includes(searchQuery.toLowerCase());
    //         });

    //         setSatellites(filteredData);
    //     } catch (error) {
    //         setError("Failed to load satellite data. Please try again later.");
    //         setSatellites([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const loadData = async () => {
        setLoading(true);
        setError('');

        try {
            const responseData = await fetchSatellites({
                objectTypes: filters.objectTypes,
                orbitCodes: filters.orbitCodes,
            });

            // const filteredData = responseData.filter((item: any) => {
            //     const search = searchQuery.trim().toLowerCase();
            //     const name = item.name?.toLowerCase() || '';
            //     const id = item.noradCatId?.toLowerCase() || '';
            //     const matchesSearch = name.includes(search) || id.includes(search);

            //     const matchesOrbit =
            //         filters.orbitCodes.length === 0 || filters.orbitCodes.includes(item.orbitCode);

            //     return matchesSearch && matchesOrbit;
            // });


            const filteredData = responseData.filter((item: any) => {
                const search = searchQuery.trim().toLowerCase();
                const name = item.name?.toLowerCase() || "";
                const id = item.noradCatId?.toLowerCase() || "";

                const matchesSearch = name.includes(search) || id.includes(search);
                const matchesOrbit =
                    filters.orbitCodes.length === 0 || filters.orbitCodes.includes(item.orbitCode);
                const matchesType =
                    filters.objectTypes.length === 0 || filters.objectTypes.includes(item.objectType);

                return matchesSearch && matchesOrbit && matchesType;
            });


            setSatellites(filteredData);
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
            {loading && <div className="text-center text-blue-500 py-4">Loading satellites...</div>}
            {error && <div className="text-center text-red-500 py-4">{error}</div>}
            {!loading && !error &&
                <SatelliteTable data={satellites} selected={selected} onSelect={handleSelect} />}


            {/* <SatelliteTable data={satellites} selected={selected} onSelect={handleSelect} /> */}

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
        </div>
    );
};

export default Home;
