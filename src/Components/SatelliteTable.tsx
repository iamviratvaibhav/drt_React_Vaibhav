// // src/components/SatelliteTable.tsx
// import { FixedSizeList as List } from 'react-window';
// // import { FixedSizeList as List } from "react-window";

// import { useState } from 'react';

// type Satellite = {
//   name: string;
//   noradCatId: string;
//   orbitCode: string;
//   objectType: string;
//   countryCode: string;
//   launchDate: string;
// };

// type Props = {
//   data: any[];
//   selected?: any[]; // make optional
//   onSelect?: (item: any) => void;
// };
// // type Props = {
// //   data: any[];
// //   selected: any[];
// //   onSelect: (item: any) => void;
// // }

// // const columns = [
// //   { key: 'name', label: 'Name' },
// //   { key: 'noradCatId', label: 'NORAD ID' },
// //   { key: 'orbitCode', label: 'Orbit' },
// //   { key: 'objectType', label: 'Type' },
// //   { key: 'countryCode', label: 'Country' },
// //   { key: 'launchDate', label: 'Launch Date' },
// // ];

// // const SatelliteTable = ({ data }: Props) => {
// const SatelliteTable = ({ data, selected, onSelect }: Props) => {
//   const [sortKey, setSortKey] = useState<keyof Satellite>('name');
//   const [sortAsc, setSortAsc] = useState(true);

//   const sortedData = [...data].sort((a, b) => {
//     const valA = a[sortKey] || '';
//     const valB = b[sortKey] || '';
//     return sortAsc
//       ? String(valA).localeCompare(String(valB))
//       : String(valB).localeCompare(String(valA));
//   });


//   const handleSort = (key: keyof Satellite) => {
//     if (key === sortKey) {
//       setSortAsc(!sortAsc);
//     } else {
//       setSortKey(key);
//       setSortAsc(true);
//     }
//   };

//   const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
//     const row = sortedData[index];
//     // const isChecked = selected.some(s => s.noradCatId === row.noradCatId);
//     const isChecked = selected?.some(s => s.noradCatId === row.noradCatId);


//     return (
//       <div
//         className={`grid grid-cols-7 items-center px-4 py-2 border-b text-sm ${isChecked ? 'bg-blue-50' : ''}`}
//         style={style}
//       >
//         <input
//           type="checkbox"
//           checked={isChecked}
//           onChange={() => onSelect(row)}
//         />
//         <div>{row.name}</div>
//         <div>{row.noradCatId}</div>
//         <div>{row.orbitCode}</div>
//         <div>{row.objectType}</div>
//         <div>{row.countryCode}</div>
//         <div>{row.launchDate}</div>
//       </div>
//     );
//   };


//   return (
//     // <div className="mt-6 max-w-6xl mx-auto">
//     //   <div className="grid grid-cols-6 bg-gray-100 px-4 py-2 font-semibold text-sm">
//     //     {columns.map((col) => (
//     //       <div
//     //         key={col.key}
//     //         onClick={() => handleSort(col.key as keyof Satellite)}
//     //         className="cursor-pointer hover:underline"
//     //       >
//     //         {col.label} {sortKey === col.key && (sortAsc ? '↑' : '↓')}
//     //       </div>
//     //     ))}
//     //   </div>
//     //   <List
//     //     height={400}
//     //     itemCount={sortedData.length}
//     //     itemSize={40}
//     //     width="100%"
//     //     className="border"
//     //   >
//     //     {Row}
//     //   </List>
//     // </div>


//      <div className="mt-6 max-w-6xl mx-auto">
//       <div className="grid grid-cols-7 bg-red-100 px-4 py-2 font-semibold text-sm">
//         <div>Select</div>
//         <div>Name</div>
//         <div>NORAD ID</div>
//         <div>Orbit</div>
//         <div>Type</div>
//         <div>Country</div>
//         <div>Launch</div>
//       </div>
//       <List
//         height={400}
//         itemCount={sortedData.length}
//         itemSize={40}
//         width="100%"
//       >
//         {Row}
//       </List>
//     </div>
//   );
// };

// export default SatelliteTable;



import { FixedSizeList as List } from 'react-window';
import { useState } from 'react';

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

const columns = [
  "Select", "Name", "NORAD ID", "Orbit", "Type", "Country", "Launch",
];

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

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = sortedData[index];
    const isChecked = selected.some((s) => s.noradCatId === item.noradCatId);

    return (
      <div
        className={`grid grid-cols-7 items-center px-4 py-2 border-b text-sm ${
          isChecked ? 'bg-blue-100' : ''
        }`}
        style={style}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onSelect(item)}
        />
        <div>{item.name}</div>
        <div>{item.noradCatId}</div>
        <div>{item.orbitCode}</div>
        <div>{item.objectType}</div>
        <div>{item.countryCode}</div>
        <div>{item.launchDate}</div>
      </div>
    );
  };

  return (
    <div className="mt-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-7 bg-gray-100 px-4 py-2 font-semibold text-sm">
        {columns.map((col, idx) => (
          <div
            key={col}
            onClick={() =>
              idx > 0 && idx < 6
                ? handleSort(
                    ['name', 'noradCatId', 'orbitCode', 'objectType', 'countryCode', 'launchDate'][
                      idx - 1
                    ] as keyof Satellite
                  )
                : undefined
            }
            className={`${idx > 0 ? 'cursor-pointer hover:underline' : ''}`}
          >
            {col}
            {idx > 0 &&
              sortKey ===
                (['name', 'noradCatId', 'orbitCode', 'objectType', 'countryCode', 'launchDate'][idx - 1] as keyof Satellite) &&
              (sortAsc ? ' ↑' : ' ↓')}
          </div>
        ))}
      </div>

      {sortedData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No satellite data found.</div>
      ) : (
        <List height={400} itemCount={sortedData.length} itemSize={40} width="100%">
          {Row}
        </List>
      )}
    </div>
  );
};

export default SatelliteTable;
