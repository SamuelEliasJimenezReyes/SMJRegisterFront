import React ,{ useEffect, useState} from 'react';
import type { CreateCamperDTO } from '../../../api/dtos/camper.dto';
import { CamperService } from '../../../api/services/camper.service';
import ChurchSelector from '../Church/ChurchSelector';

const CreateCamperForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateCamperDTO>({
    name: "",
    lastName: "",
    documentNumber: "",
    paidAmount: 0,
    isGrant: false,
    grantedAmount: 0,
    isPaid: false,
    gender: 0,
    condition: 0,
    churchId: 0,
    roomId: undefined,
    code: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedChurchId, setSelectedChurchId] = useState<number>(0);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await new CamperService().CreateCamperAsync(formData);
      setSuccess(true);
    } catch (error) {
      setError('Error al crear el campista');
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }

 const handleChurchChange = (churchId: number) => {
    setFormData((prev) => ({
      ...prev,
      churchId: churchId,
    }));
  };


    return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold">Registrar Campista</h2>

      <input
        name="name"
        type="text"
        placeholder="Nombre"
        className="input input-bordered w-full"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="lastName"
        type="text"
        placeholder="Apellido"
        className="input input-bordered w-full"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <input
        name="documentNumber"
        type="text"
        placeholder="Número de Documento"
        className="input input-bordered w-full"
        value={formData.documentNumber}
        onChange={handleChange}
        required
      />

      <input
        name="paidAmount"
        type="number"
        placeholder="Monto Pagado"
        className="input input-bordered w-full"
        value={formData.paidAmount}
        onChange={handleChange}
        required
      />

      <input
        name="grantedAmount"
        type="number"
        placeholder="Monto Otorgado"
        className="input input-bordered w-full"
        value={formData.grantedAmount}
        onChange={handleChange}
        required
      />

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">¿Becado?</span>
          <input
            type="checkbox"
            name="isGrant"
            className="toggle"
            checked={formData.isGrant}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">¿Pagado?</span>
          <input
            type="checkbox"
            name="isPaid"
            className="toggle"
            checked={formData.isPaid}
            onChange={handleChange}
          />
        </label>
      </div>

      <select
        name="gender"
        className="select select-bordered w-full"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value={0} disabled>
          Seleccione Género
        </option>
        <option value={1}>Hombre</option>
        <option value={2}>Mujer</option>
      </select>

      <select
        name="condition"
        className="select select-bordered w-full"
        value={formData.condition}
        onChange={handleChange}
        required
      >
        <option value={0} disabled>
          Seleccione Condición
        </option>
        <option value={1}>Campista</option>
        <option value={2}>Staff</option>
        <option value={3}>Directivo</option>
      </select>

    <ChurchSelector value={formData.churchId} onChange={handleChurchChange}/>

      <input
        name="roomId"
        type="number"
        placeholder="ID de Habitación (opcional)"
        className="input input-bordered w-full"
        value={formData.roomId ?? ""}
        onChange={handleChange}
      />

      <input
        name="code"
        type="text"
        placeholder="Código (opcional)"
        className="input input-bordered w-full"
        value={formData.code ?? ""}
        onChange={handleChange}
      />

      <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`}>
        {loading ? "Registrando..." : "Registrar"}
      </button>

      {success && <div className="alert alert-success mt-2">Campista registrado exitosamente.</div>}
      {error && <div className="alert alert-error mt-2">{error}</div>}
    </form>
  );
};

export default CreateCamperForm;