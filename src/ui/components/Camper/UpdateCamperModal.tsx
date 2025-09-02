import React, { useEffect, useState } from 'react';
import { CamperService } from '../../../api/services/camper.service';
import type { UpdateCamperDTO } from '../../../api/dtos/camper.dto';
import ChurchSelector from '../Church/ChurchSelector';
import RoomSelector from '../Room/RoomSelector';

interface UpdateCamperFormProps {
  camperId: number;
  onUpdated?: () => void;
}

const camperService = new CamperService();

const UpdateCamperForm: React.FC<UpdateCamperFormProps> = ({ camperId, onUpdated }) => {
  const initialFormState: UpdateCamperDTO = {
    name: '',
    lastName: '',
    age: 0,
    totalAmount: 0,
    isGrant: false,
    isPaid: false,
    gender: 1, // Valor por defecto
    condition: 1, // Valor por defecto
    payType: 1, // Valor por defecto
    shirtSize: 1, // Valor por defecto
    churchId: 0,
    roomId: null, // Inicializado como null
  };

  const [formData, setFormData] = useState<UpdateCamperDTO>(initialFormState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCamper = async () => {
      try {
        const camper = await camperService.GetCamperByIdAsync(camperId);
        
        setFormData({
          name: camper.name,
          lastName: camper.lastName,
          age: camper.age || 0,
          totalAmount: Number(camper.paidAmount),
          isGrant: camper.isGrant,
          isPaid: camper.isPaid,
          gender: parseInt(camper.gender) || 1,
          condition: parseInt(camper.condition) || 1,
          payType: parseInt(camper.payType) || 1,
          shirtSize: parseInt(camper.shirtSize) || 1,
          churchId: camper.church.id,
          roomId: camper.room?.id || null,
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading camper:", err);
        setError("Error cargando los datos del campista");
        setLoading(false);
      }
    };

    loadCamper();
  }, [camperId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => {
      let newValue: any = value;

      if (type === 'checkbox') {
        newValue = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        newValue = value === '' ? 0 : Number(value);
      } else if (name === 'roomId') {
        newValue = value === '' ? null : Number(value);
      } else if (type === 'select-one') {
        newValue = Number(value);
      }

      return {
        ...prev,
        [name]: newValue
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await camperService.UpdateCamperAsync(camperId, formData);
      alert("Campista actualizado con éxito");
      onUpdated?.();
    } catch (error) {
      console.error("Update error:", error);
      setError("Error al actualizar el campista");
    }
  };

  if (loading) return <div className="text-center py-4">Cargando datos del campista...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre y Apellido */}
        <div>
          <label className="block mb-2 font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Apellido</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Edad y Monto Pagado */}
        <div>
          <label className="block mb-2 font-medium">Edad</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Monto a Pagar</label>
          <input
            type="number"
            name="paidAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isGrant"
              checked={formData.isGrant}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span>Beca</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPaid"
              checked={formData.isPaid}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span>Pagado</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Selectores */}
        <div>
          <label className="block mb-2 font-medium">Género</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required>
              
            <option value={1}>Hombre</option>
            <option value={2}>Mujer</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Condición</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required>

            <option value={1}>Campista</option>
            <option value={2}>Staff</option>
            <option value={3}>Directivo</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Método de Pago</label>
          <select
            name="payType"
            value={formData.payType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value={1}>Mediante Directivo</option>
            <option value={2}>Transferencia Bancaria</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Talla de Camiseta</label>
          <select
            name="shirtSize"
            value={formData.shirtSize}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-2 font-medium">Iglesia</label>
          <ChurchSelector
            value={formData.churchId}
            onChange={(churchId) => setFormData(prev => ({ ...prev, churchId }))}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Habitación</label>
          <RoomSelector
            value={formData.roomId ?? null}
            onChange={(roomId) => setFormData(prev => ({ ...prev, roomId }))}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Actualizar Campista
        </button>
      </div>
    </form>
  );
};

export default UpdateCamperForm;