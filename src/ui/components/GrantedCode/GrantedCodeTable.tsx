import React, { useEffect, useState } from 'react';
import { GrantedCodeService } from '../../../api/services/grantedCode.service';
import type { CreateGrantedCodeDTO, GrantedCodeDTO } from '../../../api/dtos/granted-code.dto';
import CreateGrantedCodeModal from './CreateGrantedCodeModal';

const GrantedCodeTable: React.FC = () => {
  const [grantedCodes, setGrantedCodes] = useState<GrantedCodeDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchGrantedCodes = async () => {
      try {
        const service = new GrantedCodeService();
        const data = await service.getAllGrantedCodesAsync();
        setGrantedCodes(data);
      } catch (err) {
        setError('No se pudieron obtener los códigos de beca');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrantedCodes();
  }, [refresh]);

  const handleCreateCode = async (dto: CreateGrantedCodeDTO) => {
    try {
      const service = new GrantedCodeService();
      await service.createGrantedCodeAsync(dto);
      setRefresh(prev => !prev);
      setShowCreateModal(false);
    } catch (err) {
      console.error('Error creando código de beca', err);
    }
  };

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-error">{error}</div>;

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Códigos de Beca</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Crear Nuevo Código
        </button>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Código</th>
            <th>Monto de Beca</th>
            <th>Estado</th>
            <th>Campista</th>
            <th>Iglesia</th>
          </tr>
        </thead>
        <tbody>
          {grantedCodes.map((code) => (
            <tr key={code.code}>
              <td>{code.code}</td>
              <td>{code.grantAmount}</td>
              <td>
                <span className={`badge ${code.isUsed ? 'badge-error' : 'badge-success'}`}>
                  {code.isUsed ? 'Usado' : 'Disponible'}
                </span>
              </td>
              <td>
                {code.camper 
                  ? `${code.camper.name} ${code.camper.lastName}` 
                  : 'No asignado'}
              </td>
              <td>
                {code.camper?.church?.name || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateModal && (
        <div className="modal modal-open backdrop-blur-[2px]">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Crear Nuevo Código de Beca</h3>
            <CreateGrantedCodeModal 
              onSubmit={handleCreateCode}
              onCancel={() => setShowCreateModal(false)}
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowCreateModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrantedCodeTable;