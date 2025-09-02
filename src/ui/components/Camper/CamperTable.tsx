import React, { useEffect, useState, useCallback } from 'react';
import { CamperService } from '../../../api/services/camper.service';
import type { CamperSimpleDto, CamperDTO } from '../../../api/dtos/camper.dto';
import CamperDetailModal from './CamperDetailModal';
import UpdateCamperForm from './UpdateCamperModal';

const CamperTable: React.FC = () => {
  const [campers, setCampers] = useState<CamperSimpleDto[]>([]);
  const [filteredCampers, setFilteredCampers] = useState<CamperSimpleDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCamper, setSelectedCamper] = useState<CamperDTO | null>(null);
  const [camperToUpdate, setCamperToUpdate] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [churchFilter, setChurchFilter] = useState<string>('all');
  const [uniqueChurches, setUniqueChurches] = useState<string[]>([]);
  const [isPhoneInput, setIsPhoneInput] = useState<boolean>(false);

  const fetchCampers = useCallback(async (filter?: string) => {
    try {
      setIsSearching(true);
      const service = new CamperService();
      let data;
      
      if (filter && filter.trim() !== '') {
        data = await service.SearchCampersAsync(filter);
      } else {
        data = await service.GetAllCampersAsync();
      }
      
      setCampers(data);
      setFilteredCampers(data);
      
      const churches = Array.from(
        new Set(data.map(camper => camper.church?.name).filter(Boolean))
      ) as string[];
      setUniqueChurches(churches);
      
      setError(null);
    } catch (err) {
      setError('No se pudieron obtener los campistas');
      console.error(err);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    let result = [...campers];
    
    if (searchTerm) {
      result = result.filter(camper => 
        camper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camper.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (camper.phoneNumber && camper.phoneNumber.includes(searchTerm.replace(/\D/g, ''))) ||
        (camper.church?.name && camper.church.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (camper.church?.conference && camper.church.conference.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (churchFilter !== 'all') {
      result = result.filter(camper => 
        camper.church?.name === churchFilter
      );
    }
    
    setFilteredCampers(result);
  }, [campers, searchTerm, churchFilter]);

  useEffect(() => {
    fetchCampers();
  }, [refresh, fetchCampers]);

  const formatPhoneInput = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned === '') return '';
    
    if (cleaned.length <= 3) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    const isStartingWithNumber = /^\d/.test(value);
    const isPhonePattern = /^[\(\d][\d\s\-\(\)]{0,}$/.test(value);
    
    if (isStartingWithNumber || isPhonePattern) {
      setIsPhoneInput(true);
      const formattedValue = formatPhoneInput(value);
      setSearchTerm(formattedValue);
    } else {
      setIsPhoneInput(false);
      setSearchTerm(value);
    }
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      const searchValue = isPhoneInput ? searchTerm.replace(/\D/g, '') : searchTerm;
      fetchCampers(searchValue);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsPhoneInput(false);
    setChurchFilter('all');
    fetchCampers();
  };

  const handleChurchFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChurchFilter(e.target.value);
  };

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Campistas</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="label">
            <span className="label-text">Buscar campistas</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={isPhoneInput ? "(XXX) XXX-XXXX" : "Buscar por nombre, teléfono..."}
              className="input input-bordered flex-1"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
            {searchTerm && (
              <button className="btn btn-ghost" onClick={handleClearSearch}>
                ✕
              </button>
            )}
            <button 
              className="btn btn-primary"
              onClick={handleSearchSubmit}
              disabled={isSearching}
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          <label className="label">
            <span className="label-text-alt">
              {isPhoneInput 
                ? "Formato de teléfono: (XXX) XXX-XXXX" 
                : "Puedes buscar por nombre, apellido, teléfono"}
            </span>
          </label>
        </div>

        <div className="w-full md:w-64">
          <label className="label">
            <span className="label-text">Filtrar por iglesia</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={churchFilter}
            onChange={handleChurchFilterChange}
          >
            <option value="all">Todas las iglesias</option>
            {uniqueChurches.map((church, index) => (
              <option key={index} value={church}>{church}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 text-sm">
        {filteredCampers.length === 0 ? (
          <p>
            No se encontraron campistas
            {searchTerm && ` que coincidan con "${searchTerm}"`}
            {churchFilter !== 'all' && ` de la iglesia "${churchFilter}"`}
          </p>
        ) : (
          <p>
            Mostrando {filteredCampers.length} de {campers.length} campistas
            {searchTerm && ` para "${searchTerm}"`}
            {churchFilter !== 'all' && ` de la iglesia "${churchFilter}"`}
          </p>
        )}
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Becado</th>
            <th>Género</th>
            <th>Condición</th>
            <th>Iglesia</th>
            <th>Total pagado</th>
            <th>Conferencia</th>
            <th>Hora llegada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampers.map((camper) => (
            <tr key={camper.id}>
              <td>{camper.name}</td>
              <td>{camper.lastName}</td>
              <td>{formatPhoneNumber(camper.phoneNumber)}</td>
              <td>{camper.isGrant ? 'Sí' : 'No'}</td>
              <td>{camper.gender}</td>
              <td>{camper.condition}</td>
              <td>{camper.church?.name || '-'}</td>
              <td>{camper.paidAmount}</td>
              <td>{camper.church?.conference || '-'}</td>
              <td>{formatArrivedTimeSlot(camper.arrivedTimeSlot)}</td>
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

      {filteredCampers.length === 0 && !loading && !searchTerm && churchFilter === 'all' && (
        <div className="text-center py-8">
          <p>No hay campistas registrados</p>
        </div>
      )}

      {selectedCamper && (
        <CamperDetailModal camper={selectedCamper} onClose={handleCloseModal} />
      )}
      
      {camperToUpdate && (
        <div className="modal modal-open backdrop-blur-[2px]">
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