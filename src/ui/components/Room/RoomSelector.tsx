import React, { useEffect, useState } from 'react';
import type { RoomSimpleDto } from '../../../api/dtos/room.dto';
import { RoomService } from '../../../api/services/room.services';

interface RoomSelectorProps {
  value: number | null;
  onChange: (roomId: number | null) => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ value, onChange }) => {
  const [rooms, setRooms] = useState<RoomSimpleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const service = new RoomService();
        const data = await service.GetAllRoomsAsync();
        setRooms(data);
      } catch (err) {
        setError('Error al cargar las habitaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <div>Cargando habitaciones...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-1">
      <label className="label">
        <span className="label-text">Seleccione una Habitación</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={value ?? 0}
        onChange={(e) => {
          const selectedValue = e.target.value;
          onChange(selectedValue !== "0" ? Number(selectedValue) : null);
        }}
      >
        <option value={0} disabled>
          Escoge una habitación
        </option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id} className='bold'>
            {room.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoomSelector;