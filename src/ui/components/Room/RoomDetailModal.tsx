import React from 'react';
import type { RoomDTO } from '../../../api/dtos/room.dto';

interface RoomDetailModalProps {
  room: RoomDTO;
  onClose: () => void;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ 
  room, 
  onClose
}) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg">Detalles de Habitación: {room.name}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold">Información General</h4>
              <p><strong>Nombre:</strong> {room.name}</p>
              <p><strong>Capacidad Máxima:</strong> {room.maxCapacity}</p>
              <p><strong>Ocupación Actual:</strong> {room.campers.length}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mt-4">Estado</h4>
              {room.campers.length < room.maxCapacity ? (
                <span className="badge badge-success">Disponible</span>
              ) : (
                <span className="badge badge-error">Llena</span>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Campistas Asignados</h4>
            {room.campers.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                <table className="table table-xs">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Iglesia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {room.campers.map(camper => (
                      <tr key={camper.id}>
                        <td>{camper.name} {camper.lastName}</td>
                        <td>{camper.church?.name || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No hay campistas asignados a esta habitación</p>
            )}
          </div>
        </div>
        
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;