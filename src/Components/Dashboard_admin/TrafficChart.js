import { Line } from 'react-chartjs-2';



const TrafficChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h6 className="card-title">Trafic (7 jours)</h6>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
export default TrafficChart;