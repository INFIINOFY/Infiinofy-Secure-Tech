"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormValues } from "@/types/schedule";

type ScheduleStepFourProps = {
  date: string;
  time: string;
  formData: FormValues;
  onBack: () => void;
  onComplete: () => void;
  isSubmitting?: boolean;
};

export default function ScheduleStepFour({ date, time, formData, onBack, onComplete, isSubmitting }: ScheduleStepFourProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-6 bg-transparent"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="mb-4 rounded-full bg-transparent"
        initial={{ rotate: -20 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      </motion.div>

      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-white gradient-text mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Confirm Your Meeting
      </motion.h2>

      <motion.div
        className="w-full max-w-2xl mx-auto my-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-sm font-semibold text-cyan-400 mb-1">Date</p>
            <p className="text-gray-300">{date}</p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-sm font-semibold text-cyan-400 mb-1">Time</p>
            <p className="text-gray-300">{time}</p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-sm font-semibold text-cyan-400 mb-1">Name</p>
            <p className="text-gray-300">{formData.name}</p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-sm font-semibold text-cyan-400 mb-1">Email</p>
            <p className="text-gray-300">{formData.email}</p>
          </div>
          
          {formData.phone && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <p className="text-sm font-semibold text-cyan-400 mb-1">Phone</p>
              <p className="text-gray-300">{formData.phone}</p>
            </div>
          )}
          
          {formData.company && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <p className="text-sm font-semibold text-cyan-400 mb-1">Company</p>
              <p className="text-gray-300">{formData.company}</p>
            </div>
          )}
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-sm font-semibold text-cyan-400 mb-1">Service</p>
            <p className="text-gray-300">{formData.service}</p>
          </div>
          
          {formData.message && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:col-span-2">
              <p className="text-sm font-semibold text-cyan-400 mb-1">Message</p>
              <p className="text-gray-300">{formData.message}</p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="flex gap-4 mt-4">
        <Button onClick={onBack} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={onComplete} size="lg" disabled={!!isSubmitting} className="hover-glow bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600">
          {isSubmitting ? "Scheduling..." : "Confirm Meeting"}
        </Button>
      </div>
    </motion.div>
  );
}

