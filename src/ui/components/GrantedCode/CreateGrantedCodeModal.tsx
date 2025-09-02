import React, { useState } from 'react';
import type { CreateGrantedCodeDTO } from '../../../api/dtos/granted-code.dto';

interface CreateGrantedCodeModalProps {
  onSubmit: (dto: CreateGrantedCodeDTO) => Promise<void>;
  onCancel: () => void;
}

const CreateGrantedCodeModal: React.FC<CreateGrantedCodeModalProps> = ({ 
  onSubmit, 
}) => {
  const [formData, setFormData] = useState<CreateGrantedCodeDTO>({
    grantAmount: 0,
    isUsed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Monto de Beca</span>
        </label>
        <input
          type="number"
          name="grantAmount"
          value={formData.grantAmount}
          onChange={handleChange}
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">¿Está usado?</span>
          <input
            type="checkbox"
            name="isUsed"
            checked={formData.isUsed}
            onChange={handleChange}
            className="checkbox"
          />
        </label>
      </div>

      <div className="modal-action">
        <button type="submit" className="btn btn-primary">
          Crear Código
        </button>
      </div>
    </form>
  );
};

export default CreateGrantedCodeModal;