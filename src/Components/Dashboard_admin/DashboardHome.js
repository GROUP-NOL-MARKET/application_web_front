import React from "react";
import StatCard from "./StatCard";
import TrafficChart from "./TrafficChart";
import UsersTable from "./UsersTable";
import axios from "axios";


const DashboardHome = () => {

  // axios.get("http://localhost:8000/api/admin/me", {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  //   },
  // });

  // données d'exemple — remplacez par vos appels API
  const [stats, setStats] = React.useState({ users: 124, ventes: 76, revenus: '3 450 FCFA' });
  const [users, setUsers] = React.useState([
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'User' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Moderator' },
    { id: 3, name: 'Carole', email: 'carole@example.com', role: 'User' }
  ]);

  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Visites',
        data: [120, 200, 150, 220, 300, 250, 280],
        fill: false,
        tension: 0.4,
      }
    ]
  };

  // Exemple d'utilisation d'axios pour récupérer des données :
  // React.useEffect(() => {
  //   axios.get('/api/dashboard/stats').then(res => setStats(res.data));
  //   axios.get('/api/users').then(res => setUsers(res.data));
  // }, []);

  return (
    <div>
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <StatCard title="Utilisateurs inscrits" value={stats.users} />
        </div>
        <div className="col-md-4">
          <StatCard title="Ventes (ce mois)" value={stats.ventes} />
        </div>
        <div className="col-md-4">
          <StatCard title="Revenus" value={stats.revenus} small="Estimation" />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-8">
          <TrafficChart data={chartData} />
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h6 className="card-title">Activité récente</h6>
              <ul className="list-unstyled small mb-0">
                <li>Nouvel utilisateur: Alice</li>
                <li>Commande 234 validée</li>
                <li>Erreur système détectée</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <UsersTable users={users} />
        </div>
      </div>
    </div>
  );
};
export default DashboardHome;
