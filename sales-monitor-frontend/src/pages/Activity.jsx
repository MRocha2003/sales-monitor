import React, { useState, useEffect } from 'react';
import { Activity as ActivityIcon, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import { formatDateTime } from '../utils/helpers';

export default function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await api.get('/activity/my_activity/');
      setActivities(response.data);
    } catch (error) {
      toast.error('Error al cargar actividades');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Actividad</h1>
        <p className="text-gray-600 mt-2">Historial de tus acciones en el sistema</p>
      </div>

      {activities.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <ActivityIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hay actividades registradas</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ActivityIcon className="w-5 h-5 text-primary-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {activity.action_display}
                      </h3>
                      {activity.description && (
                        <p className="text-gray-600 mt-1">{activity.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateTime(activity.timestamp)}</span>
                    </div>
                    {activity.ip_address && (
                      <span className="text-gray-400">IP: {activity.ip_address}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
