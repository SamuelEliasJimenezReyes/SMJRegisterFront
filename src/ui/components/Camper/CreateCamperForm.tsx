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
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

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
    setValidationErrors({});

    try {
      await new CamperService().CreateCamperAsync(formData);
      setSuccess(true);
    } catch (err: any) {
      if (err.response?.status === 400 && err.response.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError("Error al crear el campista");
      }
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

  const getError = (field: string) => {
    return validationErrors[field]?.[0];
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
      />
      {getError("Camper.Name") && <p className="text-red-500 text-sm">{getError("Camper.Name")}</p>}

      <input
        name="lastName"
        type="text"
        placeholder="Apellido"
        className="input input-bordered w-full"
        value={formData.lastName}
        onChange={handleChange}
      />
      {getError("Camper.LastName") && <p className="text-red-500 text-sm">{getError("Camper.LastName")}</p>}

      <input
        name="phoneNumber"
        type="text"
        placeholder="Número de Teléfono"
        className="input input-bordered w-full"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      {getError("Camper.PhoneNumber") && <p className="text-red-500 text-sm">{getError("Camper.PhoneNumber")}</p>}

      <input
        name="age"
        type="text"
        placeholder="Edad"
        pattern="[0-9]*"
        className="input input-bordered w-full mb-4"
        value={formData.age}
        onChange={handleChange}
        required
      />
      {getError("Camper.Age") && <p className="text-red-500 text-sm">{getError("Camper.Age")}</p>}

      <select
        name="shirtSize"
        className="select select-bordered w-full"
        value={formData.shirtSize}
        onChange={handleChange}
        required
      >
        <option value={0} disabled>Seleccione un tamaño de camiseta</option>
        <option value={1}>10</option>
        <option value={2}>12</option>
        <option value={3}>14</option>
        <option value={4}>16</option>
        <option value={5}>XS</option>
        <option value={6}>S</option>
        <option value={7}>M</option>
        <option value={8}>L</option>
        <option value={9}>XL</option>
        <option value={10}>XXL</option>
        <option value={11}>XXXL</option>
      </select>
      {getError("Camper.ShirtSize") && <p className="text-red-500 text-sm">{getError("Camper.ShirtSize")}</p>}

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
        <>
          <input
            name="code"
            type="text"
            placeholder="Código de cupon"
            className="input input-bordered w-full"
            value={formData.code ?? ""}
            onChange={handleChange}
            required
          />
          {getError("Camper.Code") && <p className="text-red-500 text-sm">{getError("Camper.Code")}</p>}
        </>
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
      {getError("Camper.ArrivedTimeSlot") && <p className="text-red-500 text-sm">{getError("Camper.ArrivedTimeSlot")}</p>}

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
      {getError("Camper.Gender") && <p className="text-red-500 text-sm">{getError("Camper.Gender")}</p>}

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
      {getError("Camper.Condition") && <p className="text-red-500 text-sm">{getError("Camper.Condition")}</p>}

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
      {getError("Camper.ChurchId") && <p className="text-red-500 text-sm">{getError("Camper.ChurchId")}</p>}

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
      {getError("Camper.PayType") && <p className="text-red-500 text-sm">{getError("Camper.PayType")}</p>}

      <textarea
        name="coments"
        placeholder="Comentarios"
        className="textarea textarea-bordered w-full"
        style={{ resize: 'none' }}
        value={formData.coments}
        onChange={handleChange}
      />
      {getError("Camper.Coments") && <p className="text-red-500 text-sm">{getError("Camper.Coments")}</p>}

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
      {getError("Camper.Document") && <p className="text-red-500 text-sm">{getError("Camper.Document")}</p>}

      <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`}>
        {loading ? "Registrando..." : "Registrar"}
      </button>

      {success && <div className="alert alert-success mt-2">Campista registrado exitosamente.</div>}
      {error && <div className="alert alert-error mt-2">{error}</div>}
    </form>
  );
};

export default CreateCamperForm;
