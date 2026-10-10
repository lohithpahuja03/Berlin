'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, QrCode, Shield, Smartphone, ArrowRight, Loader2 } from 'lucide-react';
import { PaymentMethod } from '../../types/index';
import { Button } from '../ui/Button';

export interface PaymentGatewayModalProps {
  isOpen: boolean;
  method: PaymentMethod;
  amount: number;
  orderNumber: string;
  onSuccess: () => void;
  onFailure: (reason: string) => void;
  onClose: () => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  method,
  amount,
  orderNumber,
  onSuccess,
  onFailure,
  onClose,
}) => {
  const [step, setStep] = useState<'scan' | 'processing' | 'success' | 'failed'>('scan');
  const [upiId, setUpiId] = useState('');
  const [timer, setTimer] = useState(180); // 3 mins timeout

  useEffect(() => {
    if (isOpen) {
      setStep('scan');
      setTimer(180);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || step !== 'scan') return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const handleSimulatePayment = (willSucceed: boolean) => {
    setStep('processing');
    setTimeout(() => {
      if (willSucceed) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setStep('failed');
      }
    }, 2000);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Gateway Dialog */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs ${
                method === 'PAYTM'
                  ? 'bg-sky-600 shadow-sky-600/30'
                  : 'bg-emerald-600 shadow-emerald-600/30'
              }`}
            >
              {method === 'PAYTM' ? 'Paytm' : 'GPay'}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {method === 'PAYTM' ? 'Paytm Payment Gateway' : 'Google Pay (UPI Gateway)'}
              </h3>
              <p className="text-[11px] text-zinc-400">Order: {orderNumber}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount bar */}
        <div className="px-6 py-3 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-400">Amount Payable:</span>
          <span className="text-base font-black text-white">₹{amount}</span>
        </div>

        {/* Content States */}
        <div className="p-6">
          {step === 'scan' && (
            <div className="space-y-5 text-center">
              {/* QR Code Display */}
              <div className="relative w-44 h-44 mx-auto bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="w-full h-full border-4 border-dashed border-zinc-400 rounded-xl flex flex-col items-center justify-center p-2 text-zinc-900">
                  <QrCode className="w-20 h-20 text-zinc-900 mb-1" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-red-600">
                    BERLIN SECURE UPI
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-zinc-300">
                  Scan QR with any UPI App or enter VPA
                </p>
                <p className="text-[11px] text-zinc-500">
                  Session expires in: <strong className="text-red-400">{formatTimer(timer)}</strong>
                </p>
              </div>

              {/* Dev Simulation Controls */}
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-left">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase">
                  <Shield className="w-3.5 h-3.5 text-red-500" />
                  <span>Development Payment Sandbox</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Real credentials are not exposed. Test payment completion below:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleSimulatePayment(true)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Authorize (Success)</span>
                  </button>
                  <button
                    onClick={() => handleSimulatePayment(false)}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-red-950 hover:text-red-300 text-zinc-300 font-bold text-xs transition-colors border border-zinc-700"
                  >
                    Simulate Failure
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto" />
              <h4 className="text-base font-bold text-white">Communicating with Bank...</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Please do not refresh or close this window while the transaction is being verified.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-white">Payment Verified!</h4>
              <p className="text-xs text-zinc-400">
                ₹{amount} captured successfully. Redirecting to live tracking...
              </p>
            </div>
          )}

          {step === 'failed' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-white">Payment Declined</h4>
              <p className="text-xs text-zinc-400">
                Transaction was not approved. Please try again or switch to another method.
              </p>
              <div className="pt-2 flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => setStep('scan')} className="w-full">
                  Try Again
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} className="w-full">
                  Change Method
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
