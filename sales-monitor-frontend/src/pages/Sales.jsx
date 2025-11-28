import React, { useState, useEffect } from 'react';
import { Plus, Search, ShoppingCart } from 'lucide-react'; // ⭐ Agregué ShoppingCart
import toast from 'react-hot-toast';
import api from '../api/axios';
import SaleCard from '../components/sales/SaleCard';
import SaleForm from '../components/sales/SaleForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get('/sales/');
      // ⭐ VALIDAR Y FILTRAR DATOS VÁLIDOS
      const salesData = response.data.results || response.data || [];
      
      // Asegurar que solo guardemos ventas válidas
      const validSales = salesData.filter(sale => 
        sale && typeof sale === 'object' && sale.product_name
      );
      
      setSales(validSales);
      
      // ⭐ AGREGAR CONSOLE.LOG PARA DEBUG
      console.log('Ventas recibidas:', validSales);
      
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      toast.error('Error al cargar las ventas');
      setSales([]); // ⭐ Asegurar que sea array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedSale(null);
    setIsModalOpen(true);
  };

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const handleDelete = async (sale) => {
    if (!window.confirm('¿Estás seguro de eliminar esta venta?')) return;

    try {
      await api.delete(`/sales/${sale.id}/`);
      toast.success('Venta eliminada exitosamente');
      fetchSales();
    } catch (error) {
      toast.error('Error al eliminar la venta');
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
    fetchSales();
  };

  // ⭐ VALIDAR QUE SALE EXISTE ANTES DE FILTRAR
  const filteredSales = sales.filter(sale =>
    sale && 
    sale.product_name && 
    sale.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ventas</h1>
          <p className="text-gray-600 mt-2">Gestiona tus ventas</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-5 h-5" />
          Nueva Venta
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {filteredSales.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {sales.length === 0 
              ? 'No hay ventas registradas' 
              : 'No se encontraron ventas con ese término'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSales.map((sale) => (
            <SaleCard
              key={sale.id}
              sale={sale}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSale ? 'Editar Venta' : 'Nueva Venta'}
      >
        <SaleForm
          sale={selectedSale}
          onSuccess={handleSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}