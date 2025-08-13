import React, { useEffect, useState } from 'react';
import { PaymentService } from '../../../api/services/payment.service';
import type { CreatePaymentDto, PaymentDto } from '../../../api/dtos/payment.dto';
import CreatePaymentModal from './CreatePaymentModal';

const PaymentTable: React.FC = () => {
  const [payments, setPayments] = useState<PaymentDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchPayments = async () => {
    try {
      const service = new PaymentService();
      const data = await service.getAllPaymentsAsync();
      setPayments(data);
    } catch (err) {
      setError('Error al cargar los pagos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleCreatePayment = async (dto: CreatePaymentDto) => {
    try {
      const service = new PaymentService();
      await service.createPaymentAsync(dto);
      setShowCreateModal(false);
      await fetchPayments();
    } catch (err) {
      console.error('Error al crear pago', err);
    }
  };

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-error">{error}</div>;

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Registro de Pagos</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Registrar Pago
        </button>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Campista</th>
            <th>Monto</th>
            <th>Banco</th>
            <th>Comprobante</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={`${payment.camper.id}-${payment.banksInformation.id}`}>
              <td>{payment.camper.name} {payment.camper.lastName}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.banksInformation.bankName}</td>
              <td>
                {payment.evidenceURL ? (
                  <a 
                    href={payment.evidenceURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    Ver comprobante
                  </a>
                ) : 'N/A'}
              </td>
              <td>{payment.coments || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateModal && (
        <CreatePaymentModal
          onSubmit={handleCreatePayment}
          onCancel={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default PaymentTable;