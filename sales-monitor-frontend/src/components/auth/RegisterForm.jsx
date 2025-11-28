import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import Input from '../common/Input';
import Button from '../common/Button';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone: '',
    role: 'vendedor',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password2) {
      setErrors({ password2: 'Las contraseñas no coinciden' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.post('/auth/register/', formData);
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión');
      navigate('/login');
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        toast.error('Error al registrar usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nombre"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.first_name}
          required
        />

        <Input
          label="Apellido"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          error={errors.last_name}
          required
        />
      </div>

      <Input
        label="Usuario"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        required
      />

      <Input
        label="Correo Electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        label="Teléfono"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <Input
        label="Confirmar Contraseña"
        type="password"
        name="password2"
        value={formData.password2}
        onChange={handleChange}
        error={errors.password2}
        required
      />

      <Button type="submit" loading={loading} className="w-full">
        <UserPlus className="w-5 h-5" />
        Registrarse
      </Button>
    </form>
  );
}