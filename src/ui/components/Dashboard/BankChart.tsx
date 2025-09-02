import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { DashboardService } from "../../../api/services/dashboard.service";
import type { GetTotalByBankDto } from "../../../api/dtos/dashboard.dto";

const dashboardService = new DashboardService();

const BankChart: React.FC = () => {
  const [data, setData] = useState<GetTotalByBankDto[]>([]);

  useEffect(() => {
    dashboardService.GetTotalByBankAsync().then(setData);
  }, []);

  useEffect(() => {
    const filteredData = data.filter(d => d.totalAmount > 0);
    
    if (filteredData.length > 0) {
      const chartDom = document.getElementById("bankChart")!;
      const myChart = echarts.init(chartDom);

      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          valueFormatter: (value: number) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'DOP',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(value);
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: filteredData.map((d) => d.bankName),
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (value: number) => {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'DOP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(value);
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '60%',
            data: filteredData.map((d) => d.totalAmount),
            itemStyle: { 
              color: '#3b82f6',
              borderRadius: [3, 3, 0, 0]
            }
          }
        ]
      });

      const handleResize = () => myChart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        myChart.dispose();
      };
    }
  }, [data]);

  if (data.length === 0 || data.every(d => d.totalAmount === 0)) {
    return (
      <div className="card bg-base-200 shadow-lg p-4">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No hay datos de transacciones bancarias disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200 shadow-md p-4">
      <h2 className="text-lg font-bold mb-4 text-center">Total por Banco</h2>
      <div id="bankChart" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default BankChart;