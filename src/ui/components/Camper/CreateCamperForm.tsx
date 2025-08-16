import React, { useEffect, useState } from 'react';
import type { CreateCamperDTO } from '../../../api/dtos/camper.dto';
import { CamperService } from '../../../api/services/camper.service';
import ChurchSelector from '../Church/ChurchSelector';
import BankInfoDisplay from '../BankInformation/BankInfoDisplay';

const CreateCamperForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateCamperDTO>({
    name: "",
    lastName: "",
    phoneNumber: "",
    coments: "",
    age: undefined,
    paidAmount: 0,
    isGrant: false,
    grantedAmount: 0,
    isPaid: false,
    gender: 0,
    condition: 0,
    churchId: 0,
    roomId: undefined,
    code: "",
    payType: 0,
    document: undefined,
    shirtSize: 0,
    arrivedTimeSlot: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedConferenceId, setSelectedConferenceId] = useState<number | null>(null);
  const [conferences, setConferences] = useState<{ id: number; name: string }[]>([]);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;
  const newValue = type === 'checkbox' 
    ? (e.target as HTMLInputElement).checked 
    : value;

  setFormData((prev) => ({
    ...prev,
    [name]: type === 'number' ? Number(newValue) : newValue,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setConferences([
      { id: 1, name: 'Noroeste' },
      { id: 2, name: 'Sureste' },
      { id: 3, name: 'Central' },
    ]);
  }, []);

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
        name="phoneNumber"
        type="text"
        placeholder="Número de Teléfono"
        className="input input-bordered w-full"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />

      <input
        name="age"
        type="number"
        placeholder="Edad"
        pattern="[0-9]*" 
        inputMode="numeric"
        className="input input-bordered w-full"
        value={formData.age}
        onChange={handleChange}
        required
      />

    <select
        name="shirtSize"
        className="select select-bordered w-full"
        value={formData.shirtSize}
        onChange={handleChange}
        required
      >
        <option value={0} disabled>Seleccione un tamaño de camiseta</option>
        <option value={1}>XS</option>
        <option value={2}>S</option>
        <option value={3}>M</option>
        <option value={4}>L</option>
        <option value={5}>XL</option>
        <option value={6}>XXL</option>
        <option value={7}>XXXL</option>
      </select>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">¿Tiene código de cupon?</span>
          <input
            type="checkbox"
            name="isGrant"
            className="toggle"
            checked={formData.isGrant}
            onChange={handleChange}
          />
        </label>
      </div>
      {formData.isGrant && (
          <input
            name="code"
            type="text"
            placeholder="Código de cupon"
            className="input input-bordered w-full"
            value={formData.code ?? ""}
            onChange={handleChange}
            required
          />
        )}

        <select
        name="arrivedTimeSlot"
        className="select select-bordered w-full"
        value={formData.arrivedTimeSlot}
        onChange={handleChange}
        required
      >
        <option value={0} disabled>Seleccione un dia de llegada</option>
        <option value={1}>Sabado Mañana</option>
        <option value={2}>Sabado Tarde</option>
        <option value={3}>Domingo</option>
        <option value={4}>Lunes</option>
      </select>
      <select
        name="gender"
        className="select select-bordered w-full"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value={0} disabled>Seleccione Género</option>
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
        <option value={0} disabled>Seleccione Condición</option>
        <option value={1}>Campista</option>
        <option value={2}>Staff</option>
        <option value={3}>Directivo</option>
        <option value={4}>Danzarina</option>
      </select>

       
      <div className="mt-4">
        <label className="label font-semibold">Seleccione una conferencia:</label>
        <select
          className="select select-bordered w-full"
          value={selectedConferenceId ?? ''}
          onChange={(e) => setSelectedConferenceId(Number(e.target.value))}
        >
          <option value="" disabled>Seleccione una conferencia</option>
          {conferences.map(conf => (
            <option key={conf.id} value={conf.id}>{conf.name}</option>
          ))}
        </select>

      <ChurchSelector
        value={formData.churchId}
        onChange={handleChurchChange}
        conferenceId={selectedConferenceId ?? undefined}
      />
      </div>

      <select
        name="payType"
        className="select select-bordered w-full"
        value={formData.payType}
        onChange={handleChange}
        required
      >
        <option value={0} disabled>Seleccione un método de pago</option>
        <option value={1}>Transferencia</option>
        <option value={2}>A través de un directivo</option>
      </select>

      <textarea
        name="coments"
        placeholder="Comentarios"
        className="textarea textarea-bordered w-full"
        style={{ resize: 'none' }}
        value={formData.coments}
        onChange={handleChange}
      />
        <BankInfoDisplay conferenceId={selectedConferenceId} />

       <input
        type="file"
        name="document"
        accept=".pdf,.jpg,.jpeg,.png"
        className="file-input file-input-success w-full"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFormData((prev) => ({
            ...prev,
            document: file,
          }));
        }}
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
