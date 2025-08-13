import React, { useEffect, useState } from 'react';
import type { RoomSimpleDto } from '../../../api/dtos/room.dto';
import { RoomService } from '../../../api/services/room.services';

interface RoomSelectorProps {
  value: number | null;
  onChange: (roomId: number | null) => void;
  className?: string;
  disabled?: boolean;
  showGender?: boolean;
  showCapacity?: boolean;
  filterByGender?: number;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ 
  value, 
  onChange, 
  className = '', 
  disabled = false,
  showGender = true,
  showCapacity = false,
  filterByGender
}) => {
  const [rooms, setRooms] = useState<RoomSimpleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const roomService = new RoomService();
    let isMounted = true;

    const fetchRooms = async () => {
      try {
        const data = await roomService.GetAllRoomsAsync();
        if (isMounted) {
          const filteredRooms = filterByGender 
            ? data.filter(room => room.gender === (filterByGender === 1 ? 'Masculino' : 'Femenino'))
            : data;
          setRooms(filteredRooms);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar las habitaciones');
          console.error('Error fetching rooms:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRooms();

    return () => {
      isMounted = false;
    };
  }, [filterByGender]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue !== "0" ? parseInt(selectedValue) : null);
  };

  const getRoomDisplayText = (room: RoomSimpleDto) => {
    let text = room.name;
    
    if (showGender && room.gender) {
      text += ` (${room.gender})`;
    }
    
    if (showCapacity) {
      text += ` - ${room.currentCapacity}/${room.maxCapacity}`;
    }
    
    return text;
  };

  if (loading) {
    return (
      <div className={`p-1 ${className}`}>
        <label className="label">
          <span className="label-text">Cargando habitaciones...</span>
        </label>
        <select className="select select-bordered w-full" disabled>
          <option>Cargando...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-1 ${className}`}>
        <label className="label">
          <span className="label-text text-error">{error}</span>
        </label>
        <select className="select select-bordered w-full" disabled>
          <option>Error al cargar</option>
        </select>
      </div>
    );
  }

  return (
    <div className={`p-1 ${className}`}>
      <label className="label">
        <span className="label-text">Seleccione una Habitación</span>
      </label>
      <select
        className={`select select-bordered w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        value={value ?? 0}
        onChange={handleChange}
        disabled={disabled || rooms.length === 0}
      >
        <option value={0} disabled>
          {rooms.length === 0 ? 'No hay habitaciones disponibles' : 'Seleccione una habitación'}
        </option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {getRoomDisplayText(room)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoomSelector;