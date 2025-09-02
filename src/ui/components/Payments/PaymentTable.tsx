import React, { useEffect, useState } from 'react';
import { PaymentService } from '../../../api/services/payment.service';
import type { PaymentDto } from '../../../api/dtos/payment.dto';
import CreatePaymentModal from './CreatePaymentModal';

const PaymentTable: React.FC = () => {
  const [payments, setPayments] = useState<PaymentDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const service = new PaymentService();
        const data = await service.getAllPaymentsAsync();
        setPayments(data);
      } catch (err) {
        setError('No se pudieron obtener los pagos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [refresh]);

  const handleCreatePayment = async (dto: any) => {
    try {
      const service = new PaymentService();
      await service.createPaymentAsync(dto);
      setRefresh(prev => !prev); 
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error al crear pago:', error);
      throw error; 
    }
  };

  const handleViewEvidence = (evidenceURL: string | null) => {
    if (evidenceURL) {
      window.open(evidenceURL, '_blank');
    } else {
      alert('No hay evidencia disponible para este pago');
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
          onClick={() => setIsCreateModalOpen(true)}
        >
          Registrar Nuevo Pago
        </button>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Método de Pago</th>
            <th>Banco</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.isCash ? 'Efectivo' : 'Transferencia'}</td>
              <td>
                {payment.isCash 
                  ? 'N/A' 
                  : (payment.banksInformation?.bankName || 'Banco no especificado')
                }
              </td>
              <td>{payment.coments || 'Sin comentarios'}</td>
              <td>
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleViewEvidence(payment.evidenceURL ?? 'No tiene')}
                    title="Ver evidencia"
                  >
                    Ver Evidencia
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <CreatePaymentModal
          onSubmit={handleCreatePayment}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PaymentTable;