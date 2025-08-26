import React, { useState } from "react";
import type { CreatePaymentDto } from "../../../api/dtos/payment.dto";
import CamperSelector from "../../components/Camper/CamperSelector.tsx";
import BankSelector from "../BankInformation/BankSelector.tsx";

interface CreatePaymentModalProps {
  onSubmit: (dto: CreatePaymentDto) => Promise<void>;
  onCancel: () => void;
}

const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<CreatePaymentDto, "evidence">>({
    amount: 0,
    coments: "",
    banksInformationId: 0,
    camperId: 0,
    isCash: false,
  });

  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount" || name === "banksInformationId" || name === "camperId"
          ? Number(newValue)
          : newValue,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setValidationErrors({});

    try {
      await onSubmit({
        ...formData,
        evidence: evidenceFile || undefined,
      });
    } catch (err: any) {
      if (err.response?.status === 400 && err.response.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError("Error al registrar el pago");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getError = (field: string) => validationErrors[field]?.[0];

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Registrar Nuevo Pago</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <CamperSelector
              value={formData.camperId}
              onChange={(id) => setFormData((prev) => ({ ...prev, camperId: id }))}
            />
            {getError("Payment.CamperId") && (
              <p className="text-red-500 text-sm">{getError("Payment.CamperId")}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Monto</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input input-bordered"
              required
              min="0.01"
              step="0.01"
            />
            {getError("Payment.Amount") && (
              <p className="text-red-500 text-sm">{getError("Payment.Amount")}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">¿Pago en efectivo?</span>
              <input
                type="checkbox"
                name="isCash"
                className="toggle toggle-primary"
                checked={formData.isCash}
                onChange={handleChange}
              />
            </label>
          </div>

          {!formData.isCash && (
            <div className="form-control">
              <BankSelector
                value={formData.banksInformationId ?? 0}
                onChange={(id) =>
                  setFormData((prev) => ({ ...prev, banksInformationId: id }))
                }
              />
              {getError("Payment.BanksInformationId") && (
                <p className="text-red-500 text-sm">
                  {getError("Payment.BanksInformationId")}
                </p>
              )}
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Comprobante (Opcional)</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
              accept="image/*,.pdf"
            />
            {getError("Payment.Evidence") && (
              <p className="text-red-500 text-sm">{getError("Payment.Evidence")}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Comentarios (Opcional)</span>
            </label>
            <textarea
              name="coments"
              value={formData.coments}
              onChange={handleChange}
              className="textarea textarea-bordered"
              rows={3}
            />
            {getError("Payment.Coments") && (
              <p className="text-red-500 text-sm">{getError("Payment.Coments")}</p>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrar Pago"}
            </button>
          </div>
        </form>

        {error && <div className="alert alert-error mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default CreatePaymentModal;
