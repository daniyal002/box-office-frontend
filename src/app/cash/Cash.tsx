'use client'
import React, { useState } from 'react'
import CashTable from './CashTable';
import { useCashData } from '@/hook/cashHook';
import CashModal from './CashModal';

export default function Cash() {
    const { cashData } = useCashData();
    const [type, setType] = useState<"Deposite" | "Withdraw">("Deposite");
    const [cashId, setCashId] = useState<number>();
  
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const onDeposite = (id: number) => {
      setCashId(id);
      setType("Deposite");
      setIsModalOpen(true);
    };
  
    const onWithdraw = (id: number) => {
      setCashId(id);
      setType("Withdraw");
      setIsModalOpen(true);
    };
  
    return (
      <div className="container">
        <CashModal
          type={type}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cashId={cashId}
        />
        <CashTable cashData={cashData} onDeposite={onDeposite} onWithdraw={onWithdraw} />
      </div>
    );
}
