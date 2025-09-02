import React, { useEffect, useState } from "react";
import type { CamperSimpleDto } from "../../../api/dtos/camper.dto";
import { CamperService } from "../../../api/services/camper.service";

interface CamperSelectorProps {
  value: number;
  onChange: (camperId: number) => void;
}

const CamperSelector: React.FC<CamperSelectorProps> = ({ value, onChange }) => {
  const [campers, setCampers] = useState<CamperSimpleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchCampers = async () => {
      if (!search.trim()) {
        setCampers([]);
        return;
      }

      setLoading(true);
      try {
        const service = new CamperService();
        const data = await service.SearchCampersAsync(search);
        setCampers(data);
        setError(null);
      } catch (err) {
        setError("Error al obtener campistas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchCampers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="p-1">
      <label className="label">
        <span className="label-text">Buscar campista</span>
      </label>
      <input
        type="text"
        placeholder="Escribe nombre o teléfono..."
        className="input input-bordered w-full mb-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <div>Buscando campistas...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={campers.length === 0}
      >
        <option value={0} disabled>
          Escoge un campista
        </option>
        {campers.map((camper) => (
          <option key={camper.id} value={camper.id}>
            {camper.name} {camper.lastName} - {camper.church.name} - {camper.phoneNumber}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CamperSelector;
