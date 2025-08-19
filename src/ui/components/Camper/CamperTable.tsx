import React, { useEffect, useState } from 'react';
import { CamperService } from '../../../api/services/camper.service';
import type { CamperSimpleDto, CamperDTO } from '../../../api/dtos/camper.dto';
import CamperDetailModal from './CamperDetailModal';
import UpdateCamperForm from './UpdateCamperModal'; 

const CamperTable: React.FC = () => {
  const [campers, setCampers] = useState<CamperSimpleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCamper, setSelectedCamper] = useState<CamperDTO | null>(null);
  const [camperToUpdate, setCamperToUpdate] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        const service = new CamperService();
        const data = await service.GetAllCampersAsync();
        setCampers(data);
      } catch (err) {
        setError('No se pudieron obtener los campistas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampers();
  }, [refresh]);

  const handleViewDetails = async (id: number) => {
    try {
      const service = new CamperService();
      const camper = await service.GetCamperByIdAsync(id);
      setSelectedCamper(camper);
    } catch (err) {
      console.error('Error obteniendo detalles del campista', err);
    }
  };

  const handleOpenUpdate = (id: number) => {
    setCamperToUpdate(id);
  };

  const handleCloseModal = () => {
    setSelectedCamper(null);
    setCamperToUpdate(null);
  };

  const handleUpdated = () => {
    setRefresh(prev => !prev);
    setCamperToUpdate(null);
  };

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-error">{error}</div>;

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-4">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Becado</th>
            <th>Género</th>
            <th>Condición</th>
            <th>Iglesia</th>
            <th>Conferencia</th>
            <th>Hora llegada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {campers.map((camper) => (
            <tr key={camper.id}>
              <td>{camper.name}</td>
              <td>{camper.lastName}</td>
              <td>{camper.phoneNumber}</td>
              <td>{camper.isGrant ? 'Sí' : 'No'}</td>
              <td>{camper.gender}</td>
              <td>{camper.condition}</td>
              <td>{camper.church?.name || '-'}</td>
              <td>{camper.church?.conference || '-'}</td>
              <td>{camper.arrivedTimeSlot}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={() => handleViewDetails(camper.id)}
                >
                  Detalles
                </button>
                <button
                  className="btn btn-sm btn-outline btn-warning"
                  onClick={() => handleOpenUpdate(camper.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCamper && (
        <CamperDetailModal camper={selectedCamper} onClose={handleCloseModal} />
      )}
      
      {camperToUpdate && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Editar Campista</h3>
            <UpdateCamperForm 
              camperId={camperToUpdate} 
              onUpdated={handleUpdated}
            />
            <div className="modal-action">
              <button className="btn" onClick={handleCloseModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CamperTable;