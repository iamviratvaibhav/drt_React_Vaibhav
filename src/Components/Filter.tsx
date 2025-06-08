import Select from 'react-select';
import { useState, useEffect } from 'react';

type OptionType = { value: string; label: string };

type Props = {
  onApply: (filters: {
    objectTypes: string[];
    orbitCodes: string[];
  }) => void;
};

const objectTypeOptions: OptionType[] = [
  { value: 'ROCKET BODY', label: 'Rocket Body' },
  { value: 'DEBRIS', label: 'Debris' },
  { value: 'UNKNOWN', label: 'Unknown' },
  { value: 'PAYLOAD', label: 'Payload' },
];

const orbitCodeOptions: OptionType[] = [
  'LEO', 'LEO1', 'LEO2', 'LEO3', 'LEO4', 'MEO', 'GEO', 'HEO', 'IGO', 'EGO',
  'NSO', 'GTO', 'GHO', 'HAO', 'MGO', 'LMO', 'UFO', 'ESO', 'UNKNOWN',
].map((code) => ({ value: code, label: code }));

const Filters = ({ onApply }: Props) => {
  const [selectedObjectTypes, setSelectedObjectTypes] = useState<OptionType[]>([]);
  const [selectedOrbitCodes, setSelectedOrbitCodes] = useState<OptionType[]>([]);

  useEffect(() => {
    onApply({
      objectTypes: selectedObjectTypes.map((opt) => opt.value),
      orbitCodes: selectedOrbitCodes.map((opt) => opt.value),
    });
  }, [selectedObjectTypes, selectedOrbitCodes]);

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Object Type</label>
        <Select
          options={objectTypeOptions}
          isMulti
          value={selectedObjectTypes}
          onChange={(options) =>
            setSelectedObjectTypes((options as OptionType[]) || [])
          }
          placeholder="Select object types (run without enter press)"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Orbit Codes</label>
        <Select
          options={orbitCodeOptions}
          isMulti
          value={selectedOrbitCodes}
          onChange={(options) =>
            setSelectedOrbitCodes((options as OptionType[]) || [])
          }
          placeholder="Select orbit codes (run without enter press)"
        />
      </div>
    </div>
  );
};

export default Filters;
