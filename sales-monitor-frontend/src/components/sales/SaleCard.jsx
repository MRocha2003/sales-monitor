import React from 'react';
import { Edit, Trash2, Calendar, DollarSign } from 'lucide-react';
import { formatDateTime, formatCurrency } from '../../utils/helpers';
import { SALE_STATUS_LABELS, SALE_STATUS_COLORS } from '../../utils/constants';

export default function SaleCard({ sale, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {sale.product_name}
          </h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${SALE_STATUS_COLORS[sale.status]}`}>
            {SALE_STATUS_LABELS[sale.status]}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>Cantidad: {sale.quantity} x Bs {sale.unit_price}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDateTime(sale.sale_date)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-primary-600">
            {formatCurrency(sale.total_amount)}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(sale)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(sale)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {sale.notes && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">{sale.notes}</p>
        </div>
      )}
    </div>
  );
}