import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { DashboardService } from "../../../api/services/dashboard.service";
import type { GetCampersByConferenceDto } from "../../../api/dtos/dashboard.dto";

const dashboardService = new DashboardService();

const CampersByConferenceChart: React.FC = () => {
  const [data, setData] = useState<GetCampersByConferenceDto[]>([]);

  useEffect(() => {
    dashboardService.GetCampersByConferenceAsync().then(setData);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const chartDom = document.getElementById("conferenceChart")!;
      const myChart = echarts.init(chartDom);

      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          top: '5%',
          left: 'center',
          type: 'scroll'
        },
        series: [
          {
            name: 'Campistas por Conferencia',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data.map((d) => ({
              value: d.camperCount,
              name: d.conference
            }))
          }
        ]
      });

      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return (
    <div className="card bg-base-200 shadow-md p-4">
      <div id="conferenceChart" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default CampersByConferenceChart;