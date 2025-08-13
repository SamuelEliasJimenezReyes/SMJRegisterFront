import React, { useEffect } from 'react';
import type { CamperDTO } from '../../../api/dtos/camper.dto';

interface CamperDetailModalProps {
  camper: CamperDTO;
  onClose: () => void;
}

const CamperDetailModal: React.FC<CamperDetailModalProps> = ({ camper, onClose }) => {
   useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] ">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4 relative">
          <h2 className="text-lg font-bold">Detalles del Campista</h2>
          <button className="btn neutral absolute right-0" onClick={onClose}>
            X
          </button>
        </div>

        <div className="space-y-2">
          <p><strong>Nombre:</strong> {camper.name} {camper.lastName}</p>
          <p><strong>Documento:</strong> {camper.phoneNumber}</p>
          <p><strong>Becado:</strong> {camper.isGrant ? 'Sí' : 'No'}</p>
          <p><strong>Género:</strong> {camper.gender}</p>
          <p><strong>Condición:</strong> {camper.condition}</p>
          <p><strong>Iglesia:</strong> {camper.church?.name || 'No especificada'}</p>
          <p><strong>Conferencia:</strong> {camper.church?.conference || 'No especificada'}</p>
          <p><strong>Hora de llegada:</strong> {camper.arrivedTimeSlot}</p>
          <p><strong>Habitacion:</strong> {camper.room?.name || 'No asignada'}</p>

          <div>
            <strong>Documentos:</strong>
            {camper.documentsURL && camper.documentsURL.length > 0 ? (
              <ul className="list-disc ml-5 mt-1">
                {camper.documentsURL.map((url, index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Documento {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay documentos disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailModal;
