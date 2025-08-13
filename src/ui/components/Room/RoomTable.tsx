import React, { useEffect, useState } from 'react';
import { RoomService } from '../../../api/services/room.services';
import type { RoomSimpleDto, RoomDTO } from '../../../api/dtos/room.dto';
import RoomDetailModal from './RoomDetailModal.tsx';

const RoomTable: React.FC = () => {
  const [rooms, setRooms] = useState<RoomSimpleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomDTO | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const service = new RoomService();
        const data = await service.GetAllRoomsAsync();
        setRooms(data);
      } catch (err) {
        setError('No se pudieron obtener las habitaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleViewDetails = async (id: number) => {
    try {
      const service = new RoomService();
      const room = await service.GetRoomByIdAsync(id);
      setSelectedRoom(room);
    } catch (err) {
      console.error('Error obteniendo detalles de la habitación', err);
    }
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  if (loading) return <div className="text-center py-8">Cargando habitaciones...</div>;
  if (error) return <div className="text-center text-error py-8">{error}</div>;

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-4">
      <h2 className="text-xl font-bold mb-4">Listado de Habitaciones</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Genero</th>
            <th>Capacidad Máxima</th>
            <th>Ocupación Actual</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.gender}</td>
              <td>{room.maxCapacity}</td>
              <td>{room.currentCapacity}</td>
              <td>
                {room.currentCapacity < room.maxCapacity ? (
                  <span className="badge badge-success">Disponible</span>
                ) : (
                  <span className="badge badge-error">Llena</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={() => handleViewDetails(room.id)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRoom && (
        <RoomDetailModal 
          room={selectedRoom} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default RoomTable;