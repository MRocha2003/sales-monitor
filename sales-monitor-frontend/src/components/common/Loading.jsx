import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading({ text = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
}