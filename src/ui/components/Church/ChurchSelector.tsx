import React, { useEffect, useState } from 'react';
import type { ChurchSimpleDTO } from '../../../api/dtos/church.dto';
import { ChurchService } from '../../../api/services/church.service';

interface ChurchSelectorProps {
  value: number;
  onChange: (churchId: number) => void;
  conferenceId?: number;
}

const ChurchSelector: React.FC<ChurchSelectorProps> = ({ value, onChange, conferenceId }) => {
  const [churches, setChurches] = useState<ChurchSimpleDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChurches = async () => {
      try {
        const service = new ChurchService();
        let data: ChurchSimpleDTO[];

        if (conferenceId) {
          data = await service.GetChurchesByConferenceAsync(conferenceId);
        } else {
          data = await service.GetAllChurchesAsync();
        }

        setChurches(data);
      } catch (err) {
        setError('Failed to fetch churches');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChurches();
  }, [conferenceId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-1">
      <label className="label">
        <span className="label-text">Seleccione una Iglesia</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={0} disabled>
          Escoge una iglesia
        </option>
        {churches.map((church) => (
          <option key={church.id} value={church.id}>
            {church.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChurchSelector;
