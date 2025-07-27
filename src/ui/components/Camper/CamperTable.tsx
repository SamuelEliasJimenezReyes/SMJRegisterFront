import React , { useEffect, useState} from 'react';
import type { CamperDTO } from '../../../api/dtos/camper.dto';
import { CamperService } from '../../../api/services/camper.service';

const CamperTable: React.FC = () => {
  const [campers , setCampers] = useState<CamperDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        const service = new CamperService();
        const data = await service.GetAllCampersAsync();
        setCampers(data);
      } catch (err) {
        setError('Failed to fetch campers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
   return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Document</th>
            <th>Paid</th>
            <th>Gender</th>
            <th>Condition</th>
            <th>Church</th>
            <th>Conference</th>
            <th>Code</th>
            <th>Grant Amount</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {campers.map((camper, index) => (
            <tr key={index}>
              <td>{camper.name}</td>
              <td>{camper.lastName}</td>
              <td>{camper.documentNumber}</td>
              <td>{camper.paidAmount}</td>
              <td>{camper.isGrant ? "Yes" : "No"}</td>
              <td>{camper.gender}</td>
              <td>{camper.condition}</td>
              <td>{camper.church?.name || "-"}</td>
              <td>{camper.church?.conference || "-"}</td>
              <td>{camper.room?.Name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}
export default CamperTable;