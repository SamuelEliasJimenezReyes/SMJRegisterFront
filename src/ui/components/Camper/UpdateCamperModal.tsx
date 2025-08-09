import React, { useEffect, useState } from 'react';
import { CamperService } from '../../../api/services/camper.service';
import type { UpdateCamperDTO, CamperDTO } from '../../../api/dtos/camper.dto';
import ChurchSelector from '../Church/ChurchSelector';
import RoomSelector from '../Room/RoomSelector';

interface UpdateCamperFormProps {
  camperId: number;
  onUpdated?: () => void;
}

const camperService = new CamperService();

const UpdateCamperForm: React.FC<UpdateCamperFormProps> = ({ camperId, onUpdated }) => {
  const [formData, setFormData] = useState<UpdateCamperDTO>({
    name: '',
    lastName: '',
    paidAmount: 0,
    isGrant: false,
    isPaid: false,
    gender: 0, 
    condition: 0, 
    payType: 0, 
    shirtSize: 0, 
    churchId: 0,
    roomId: 0, 
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCamper = async () => {
      try {
        const camper: CamperDTO = await camperService.GetCamperByIdAsync(camperId);
        setFormData({
          name: camper.name,
          lastName: camper.lastName,
          paidAmount: Number(camper.paidAmount),
          isGrant: camper.isGrant,
          isPaid: camper.isPaid ?? false,
          gender: camper.gender ? parseInt(camper.gender) : 1, // Conversión segura con valor por defecto
          condition: camper.condition ? parseInt(camper.condition) : 1,
          payType: camper.payType ? parseInt(camper.payType) : 1,
          shirtSize: camper.shirtSize ? parseInt(camper.shirtSize) : 1,
          churchId: camper.church.id,
          roomId: camper.room?.id ?? null, // Mantenemos null si no hay habitación
        });
        setLoading(false);
      } catch (err) {
        setError("Error cargando el camper");
        setLoading(false);
      }
    };

    loadCamper();
  }, [camperId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    let finalValue: string | number | boolean | null = value;

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = value === '' ? 0 : Number(value);
    } else if (type === 'select-one') {
      // Manejo especial para roomId que puede ser null
      if (name === 'roomId') {
        finalValue = value === '' ? null : Number(value);
      } else {
        // Para otros selects, asegurar siempre un valor numérico válido
        finalValue = value === '' ? 1 : Number(value);
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        gender: formData.gender || 1,
        condition: formData.condition || 1,
        payType: formData.payType || 1,
        shirtSize: formData.shirtSize || 1
      };
      
      await camperService.UpdateCamperAsync(camperId, payload);
      alert("Camper actualizado con éxito");
      if (onUpdated) onUpdated();
    } catch (error) {
      console.error(error);
      alert("Error actualizando camper");
    }
  };

  if (loading) return <div className="text-center py-4">Cargando camper...</div>;
  if (error) return <div className="text-center text-error py-4">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Apellido</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Cantidad Pagada</span>
          </label>
          <input
            type="number"
            name="paidAmount"
            value={formData.paidAmount}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="0"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isGrant"
              checked={formData.isGrant}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">Beca</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isPaid"
              checked={formData.isPaid}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">Pagado</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Género</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value={1}>Hombre</option>
            <option value={2}>Mujer</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Condición</span>
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value={1}>Campista</option>
            <option value={2}>Staff</option>
            <option value={3}>Directivo</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Método de Pago</span>
          </label>
          <select
            name="payType"
            value={formData.payType}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value={1}>Mediante Directivo</option>
            <option value={2}>Transferencia Bancaria</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Talla de Camiseta</span>
          </label>
          <select
            name="shirtSize"
            value={formData.shirtSize}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value={1}>XS - Extra Pequeño</option>
            <option value={2}>S - Pequeño</option>
            <option value={3}>M - Mediano</option>
            <option value={4}>L - Grande</option>
            <option value={5}>XL - Extra Grande</option>
            <option value={6}>XXL - Doble Extra Grande</option>
            <option value={7}>XXXL - Triple Extra Grande</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Iglesia</span>
          </label>
          <ChurchSelector
            value={formData.churchId}
            onChange={(churchId) => setFormData(prev => ({ ...prev, churchId }))}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Habitación</span>
          </label>
          <RoomSelector
            value={formData.roomId ?? 0}
            onChange={(roomId) => setFormData(prev => ({ ...prev, roomId }))}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button type="submit" className="btn btn-primary w-full md:w-auto">
          Actualizar Campista
        </button>
      </div>
    </form>
  );
};

export default UpdateCamperForm;