import React, { useState } from 'react';
import type { CreatePaymentDto } from '../../../api/dtos/payment.dto';

interface CreatePaymentModalProps {
  onSubmit: (dto: CreatePaymentDto) => Promise<void>;
  onCancel: () => void;
}

const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<CreatePaymentDto, 'evidence'>>({
    amount: 0,
    coments: '',
    banksInformationId: 0,
    camperId: 0
  });
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'banksInformationId' || name === 'camperId' 
        ? Number(value) 
        : value
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
    try {
      await onSubmit({
        ...formData,
        evidence: evidenceFile || undefined
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Registrar Nuevo Pago</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">ID del Campista</span>
            </label>
            <input
              type="number"
              name="camperId"
              value={formData.camperId}
              onChange={handleChange}
              className="input input-bordered"
              required
              min="1"
            />
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
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">ID de Información Bancaria</span>
            </label>
            <input
              type="number"
              name="banksInformationId"
              value={formData.banksInformationId}
              onChange={handleChange}
              className="input input-bordered"
              required
              min="1"
            />
          </div>

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
              {isSubmitting ? 'Registrando...' : 'Registrar Pago'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePaymentModal;