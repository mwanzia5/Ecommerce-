import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast || !toast.visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 bg-[#121316] text-white rounded-lg shadow-2xl border border-white/10 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="w-5 h-5 rounded-full bg-[#FF5500] flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
      </div>
      <span>{toast.message}</span>
    </div>
  );
};
