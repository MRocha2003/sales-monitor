import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import StatsCard from '../components/dashboard/StatsCard';
import Loading from '../components/common/Loading';
import { formatCurrency } from '../utils/helpers';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/sales/statistics/');
      setStats(response.data);
    } catch (error) {
      toast.error('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Resumen de ventas y estadísticas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Ventas"
          value={stats?.total_sales || 0}
          icon={ShoppingCart}
          color="blue"
        />
        <StatsCard
          title="Ingresos Totales"
          value={formatCurrency(stats?.total_revenue || 0)}
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Venta Promedio"
          value={formatCurrency(stats?.average_sale || 0)}
          icon={TrendingUp}
          color="yellow"
        />
        <StatsCard
          title="Pendientes"
          value={stats?.pending_count || 0}
          icon={AlertCircle}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Estado de Ventas</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Completadas</span>
              <span className="font-bold text-green-600">{stats?.completed_count || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-gray-700">Pendientes</span>
              <span className="font-bold text-yellow-600">{stats?.pending_count || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-gray-700">Canceladas</span>
              <span className="font-bold text-red-600">{stats?.cancelled_count || 0}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <a
              href="/sales"
              className="block p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-primary-900">Ver todas las ventas</p>
              <p className="text-sm text-primary-600">Gestiona tu inventario de ventas</p>
            </a>
            <a
              href="/activity"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-gray-900">Ver actividad</p>
              <p className="text-sm text-gray-600">Revisa el historial de actividades</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
