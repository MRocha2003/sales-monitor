import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put('/auth/users/update_profile/', formData);
      updateUser(response.data);
      toast.success('Perfil actualizado exitosamente');
    } catch (error) {
      toast.error('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <h2 className="text-xl font-semibold">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="text-gray-600 capitalize">{user?.role}</p>
            <p className="text-sm text-gray-500 mt-2">@{user?.username}</p>
          </div>

          <div className="mt-6 pt-6 border-t space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{user?.email}</span>
            </div>
            {user?.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">{user?.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 capitalize">{user?.role}</span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Actualizar Información</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nombre"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <Input
                label="Apellido"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Teléfono"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <div className="flex justify-end">
              <Button type="submit" loading={loading}>
                <Save className="w-5 h-5" />
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}