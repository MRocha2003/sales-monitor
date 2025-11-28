import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import Input from '../common/Input';
import Button from '../common/Button';

export default function SaleForm({ sale, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_name: '',
    quantity: 1,
    unit_price: 0,
    status: 'completada',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sale) {
      setFormData({
        product_name: sale.product_name,
        quantity: sale.quantity,
        unit_price: sale.unit_price,
        status: sale.status,
        notes: sale.notes || '',
      });
    }
  }, [sale]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (sale) {
        await api.put(`/sales/${sale.id}/`, formData);
        toast.success('Venta actualizada exitosamente');
      } else {
        await api.post('/sales/', formData);
        toast.success('Venta creada exitosamente');
      }
      onSuccess();
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        toast.error('Error al guardar la venta');
      }
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = formData.quantity * formData.unit_price;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre del Producto"
        type="text"
        name="product_name"
        value={formData.product_name}
        onChange={handleChange}
        error={errors.product_name}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Cantidad"
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          error={errors.quantity}
          required
        />

        <Input
          label="Precio Unitario (Bs)"
          type="number"
          name="unit_price"
          min="0"
          step="0.01"
          value={formData.unit_price}
          onChange={handleChange}
          error={errors.unit_price}
          required
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Total</p>
        <p className="text-2xl font-bold text-gray-900">
          Bs {totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="mb-4">
        <label className="label">Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input"
        >
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="label">Notas (opcional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="input"
          rows="3"
        />
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading}>
          <Save className="w-5 h-5" />
          {sale ? 'Actualizar' : 'Crear'} Venta
        </Button>
      </div>
    </form>
  );
}