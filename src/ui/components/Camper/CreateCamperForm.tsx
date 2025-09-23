import React, { useEffect, useState } from 'react';
import type { CreateCamperDTO } from '../../../api/dtos/camper.dto';
import { CamperService } from '../../../api/services/camper.service';
import ChurchSelector from '../Church/ChurchSelector';
import BankInfoDisplay from '../BankInformation/BankInfoDisplay';

const SuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={(e) => e.stopPropagation()} />
      <div className="relative bg-base-100 p-6 rounded-xl shadow-xl max-w-sm mx-4 z-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">¡Registro Exitoso!</h3>
          <p className="text-gray-600 mb-6">El campista ha sido registrado correctamente en el sistema.</p>
          <button onClick={onClose} className="btn btn-primary w-full" autoFocus>Entendido</button>
        </div>
      </div>
    </div>
  );
};

const CreateCamperForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateCamperDTO>({
  name: "",
  lastName: "",
  phoneNumber: "",
  coments: "",
  age: 0,
  paidAmount: 0,
  isGrant: false,
  grantedAmount: 0,
  isPaid: false,
  document: undefined,
  gender: 0, 
  condition: 0, 
  payType: 0, 
  shirtSize: 0, 
  arrivedTimeSlot: 0, 
  churchId: 0,
  roomId: undefined,
  code: undefined,
});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedConferenceId, setSelectedConferenceId] = useState<number | null>(null);
  const [conferences, setConferences] = useState<{ id: number; name: string }[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setConferences([
      { id: 1, name: 'Noroeste' },
      { id: 2, name: 'Sureste' },
      { id: 3, name: 'Central' },
    ]);
  }, []);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  
  // Lista de campos que deben ser números
  const numericFields = [
    'age', 'paidAmount', 'grantedAmount', 'gender', 'condition', 
    'payType', 'shirtSize', 'arrivedTimeSlot', 'churchId', 'roomId'
  ];

  let finalValue: any = value;

  if (type === 'checkbox') {
    finalValue = (e.target as HTMLInputElement).checked;
  } else if (numericFields.includes(name)) {
    // Convertir a número, usando 0 si está vacío
    finalValue = value === '' ? 0 : Number(value);
  }

  setFormData(prev => ({
    ...prev,
    [name]: finalValue,
  }));
};
  const formatPhone = (value: string) => {
    if (!value) return "";
    let rawValue = value.replace(/\D/g, "");
    if (rawValue.length > 10) rawValue = rawValue.slice(0, 10);

    if (rawValue.length > 6) {
      return `(${rawValue.slice(0, 3)}) ${rawValue.slice(3, 6)}-${rawValue.slice(6)}`;
    } else if (rawValue.length > 3) {
      return `(${rawValue.slice(0, 3)}) ${rawValue.slice(3)}`;
    } else if (rawValue.length > 0) {
      return `(${rawValue}`;
    }
    return rawValue;
  };

  const handleChurchChange = (churchId: number) => {
    setFormData(prev => ({ ...prev, churchId }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setValidationErrors({});
  setShowSuccessModal(false);
  console.log(formData);
  // Validación frontend
  if (!formData.name.trim()) {
    setError("El nombre es obligatorio");
    setLoading(false);
    return;
  }
  if (!formData.lastName.trim()) {
    setError("El apellido es obligatorio");
    setLoading(false);
    return;
  }
  if (!formData.phoneNumber || !/^\d+$/.test(formData.phoneNumber)) {
    setError("El número de teléfono es obligatorio y solo puede contener números");
    setLoading(false);
    return;
  }
  if (!formData.age) {
    setError("La edad es obligatoria");
    setLoading(false);
    return;
  }
  if (!formData.document) {
    setError("Debe subir un comprobante");
    setLoading(false);
    return;
  }

  // Validación de campos numéricos obligatorios
  const requiredNumericFields: { field: keyof CreateCamperDTO; label: string }[] = [
    { field: "gender", label: "Género" },
    { field: "condition", label: "Condición" },
    { field: "payType", label: "Método de pago" },
    { field: "shirtSize", label: "Tamaño de camiseta" },
    { field: "arrivedTimeSlot", label: "Día de llegada" },
  ];

  for (const { field, label } of requiredNumericFields) {
    const value = formData[field];
    if (typeof value !== "number" || value <= 0) {
      setError(`${label} es obligatorio`);
      setLoading(false);
      return;
    }
  }

  if (!formData.churchId || formData.churchId <= 0) {
    setError("Debe seleccionar una iglesia");
    setLoading(false);
    return;
  }

  if (formData.isGrant && (!formData.code || !formData.code.trim())) {
    setError("Debe colocar un código de cupon");
    setLoading(false);
    return;
  }

  try {
    // Pasamos directamente el DTO al servicio, que internamente crea FormData
    await new CamperService().CreateCamperAsync(formData);

    setShowSuccessModal(true);
  } catch (err: any) {
    if (err.response?.status === 400 && err.response.data?.errors) {
      setValidationErrors(err.response.data.errors);
    } else if (err.response?.status !== 500) {
      setError("Error al crear el campista");
    } else {
      setError("Error interno del servidor. Por favor, intente más tarde.");
    }
  } finally {
    setLoading(false);
  }
};



  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setFormData({
      name: "",
      lastName: "",
      phoneNumber: "",
      coments: "",
      age: 0,
      paidAmount: 0,
      isGrant: false,
      grantedAmount: 0,
      isPaid: false,
      document: undefined,
      gender: 0,
      condition: 0,
      payType: 0,
      shirtSize: 0,
      arrivedTimeSlot: 0,
      churchId: 0,
      roomId: undefined,
      code: undefined,
    });
    setSelectedConferenceId(null);
  };

  const getError = (field: string) => validationErrors[field]?.[0];

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-base-100 shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold">Registrar Campista</h2>

        <input name="name" type="text" placeholder="Nombre" className="input input-bordered w-full"
          value={formData.name} onChange={handleChange} />
        {getError("Camper.Name") && <p className="text-red-500 text-sm">{getError("Camper.Name")}</p>}

        <input name="lastName" type="text" placeholder="Apellido" className="input input-bordered w-full"
          value={formData.lastName} onChange={handleChange} />
        {getError("Camper.LastName") && <p className="text-red-500 text-sm">{getError("Camper.LastName")}</p>}

        <input
          name="phoneNumber"
          type="text"
          placeholder="Número de Teléfono"
          className="input input-bordered w-full"
          value={formatPhone(formData.phoneNumber)}
          onChange={(e) => {
            let rawValue = e.target.value.replace(/\D/g, "");
            if (rawValue.length > 10) rawValue = rawValue.slice(0, 10);
            setFormData(prev => ({ ...prev, phoneNumber: rawValue }));
          }}
        />
        {getError("Camper.PhoneNumber") && <p className="text-red-500 text-sm">{getError("Camper.PhoneNumber")}</p>}

        <input name="age" type="number" placeholder="Edad" className="input input-bordered w-full"
          value={formData.age} onChange={handleChange} />

        <select name="shirtSize" className="select select-bordered w-full" value={formData.shirtSize} onChange={handleChange}>
          <option value={0} disabled>Seleccione un tamaño de camiseta</option>
          <option value={1}>10</option><option value={2}>12</option><option value={3}>14</option><option value={4}>16</option>
          <option value={5}>XS</option><option value={6}>S</option><option value={7}>M</option><option value={8}>L</option>
          <option value={9}>XL</option><option value={10}>XXL</option><option value={11}>XXXL</option>
        </select>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">¿Tiene código de cupon?</span>
            <input type="checkbox" name="isGrant" className="toggle" checked={formData.isGrant} onChange={handleChange} />
          </label>
        </div>

        {formData.isGrant && (
          <input name="code" type="text" placeholder="Código de cupon" className="input input-bordered w-full"
            value={formData.code ?? ""} onChange={handleChange} />
        )}

        <select name="arrivedTimeSlot" className="select select-bordered w-full" value={formData.arrivedTimeSlot} onChange={handleChange}>
          <option value={0} disabled>Seleccione un dia de llegada</option>
          <option value={1}>Sabado Mañana</option>
          <option value={2}>Sabado Tarde</option>
          <option value={3}>Domingo</option>
          <option value={4}>Lunes</option>
        </select>

        <select name="gender" className="select select-bordered w-full" value={formData.gender} onChange={handleChange}>
          <option value={0} disabled>Seleccione Género</option>
          <option value={1}>Hombre</option>
          <option value={2}>Mujer</option>
        </select>

        <select name="condition" className="select select-bordered w-full" value={formData.condition} onChange={handleChange}>
          <option value={0} disabled>Seleccione Condición</option>
          <option value={1}>Campista</option>
          <option value={2}>Staff</option>
          <option value={3}>Directivo</option>
          <option value={4}>Danzarina</option>
        </select>

        <div className="mt-4">
          <label className="label font-semibold">Seleccione una conferencia:</label>
          <select className="select select-bordered w-full" value={selectedConferenceId ?? ''} onChange={(e) => setSelectedConferenceId(Number(e.target.value))}>
            <option value="" disabled>Seleccione una conferencia</option>
            {conferences.map(conf => <option key={conf.id} value={conf.id}>{conf.name}</option>)}
          </select>

          <ChurchSelector
            value={formData.churchId}
            onChange={handleChurchChange}
            conferenceId={selectedConferenceId ?? undefined}
          />
        </div>

        <select name="payType" className="select select-bordered w-full" value={formData.payType} onChange={handleChange}>
          <option value={0} disabled>Seleccione un método de pago</option>
          <option value={1}>Transferencia</option>
          <option value={2}>A través de un directivo</option>
        </select>

        <textarea name="coments" placeholder="Comentarios" className="textarea textarea-bordered w-full"
          style={{ resize: 'none' }} value={formData.coments} onChange={handleChange} />

        <BankInfoDisplay conferenceId={selectedConferenceId} />

        <input type="file" name="document" accept=".pdf,.jpg,.jpeg,.png" className="file-input file-input-success w-full"
          onChange={(e) => { const file = e.target.files?.[0]; setFormData(prev => ({ ...prev, document: file })); }} />

        <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`}>
          {loading ? "Registrando..." : "Registrar"}
        </button>

        {error && <div className="alert alert-error mt-2">{error}</div>}
      </form>
      {showSuccessModal && <SuccessModal onClose={handleSuccessModalClose} />}
    </>
  );
};

export default CreateCamperForm;
