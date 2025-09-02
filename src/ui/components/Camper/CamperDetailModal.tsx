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

  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return '-';
    
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    }
    
    return phoneNumber;
  };

  const formatArrivedTimeSlot = (timeSlot: string) => {
    if (!timeSlot) return '-';
    
    const timeMap: Record<string, string> = {
      'SaturdayMorning': 'Sábado Mañana',
      'SaturdayAfternoon': 'Sábado Tarde',
      'Sunday': 'Domingo',
      'Monday': 'Lunes'
    };
    
    return timeMap[timeSlot] || timeSlot;
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 relative">
          <h2 className="text-lg font-bold">Detalles del Campista</h2>
          <button className="btn btn-sm btn-circle absolute right-0 top-0" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <p><strong>Nombre:</strong> {camper.name} {camper.lastName}</p>
          <p><strong>Teléfono:</strong> {formatPhoneNumber(camper.phoneNumber)}</p>
          <p><strong>Becado:</strong> {camper.isGrant ? 'Sí' : 'No'}</p>
          <p><strong>Género:</strong> {camper.gender}</p>
          <p><strong>Condición:</strong> {camper.condition}</p>
          <p><strong>Iglesia:</strong> {camper.church?.name || 'No especificada'}</p>
          <p><strong>Conferencia:</strong> {camper.church?.conference || 'No especificada'}</p>
          <p><strong>Hora de llegada:</strong> {formatArrivedTimeSlot(camper.arrivedTimeSlot)}</p>
          <p><strong>Habitación:</strong> {camper.room?.name || 'No asignada'}</p>
          <p><strong>Total Pagado:</strong> {formatMoney(camper.paidAmount)}</p>
          <p><strong>Total a Pagar:</strong> {formatMoney(camper.totalAmount)}</p>
          <div>
            <strong>Documento:</strong>
            {camper.documentsURL ? (
              <p>
                <a
                  href={camper.documentsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Ver documento
                </a>
              </p>
            ) : (
              <p>No hay documento disponible.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailModal;