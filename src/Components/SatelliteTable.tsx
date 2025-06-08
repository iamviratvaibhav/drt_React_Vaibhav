import { useState } from 'react';
import SatelliteCard from './SatelliteCard';

type Satellite = {
  name: string;
  noradCatId: string;
  orbitCode: string;
  objectType: string;
  countryCode: string;
  launchDate: string;
};

type Props = {
  data: Satellite[];
  selected?: Satellite[];
  onSelect?: (item: Satellite) => void;
};

const sortKeys: (keyof Satellite)[] = ['name', 'noradCatId', 'orbitCode', 'objectType', 'countryCode', 'launchDate'];

const SatelliteTable = ({
  data,
  selected = [],
  onSelect = () => {},
}: Props) => {
  const [sortKey, setSortKey] = useState<keyof Satellite>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const sortedData = [...data].sort((a, b) => {
    const valA = a[sortKey] ?? '';
    const valB = b[sortKey] ?? '';
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (key: keyof Satellite) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="flex flex-wrap gap-3 mb-6">
        {sortKeys.map((key) => (
          <button
            key={key}
            onClick={() => handleSort(key)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition
              ${
                sortKey === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            {sortKey === key && (sortAsc ? ' ↑' : ' ↓')}
          </button>
        ))}
      </div>

      {sortedData.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">No satellite data found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedData.map((sat) => (
            <SatelliteCard
              key={sat.noradCatId}
              satellite={sat}
              isSelected={selected.some((s) => s.noradCatId === sat.noradCatId)}
              onSelect={() => onSelect(sat)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SatelliteTable;
