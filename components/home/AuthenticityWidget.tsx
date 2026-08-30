"use client";

import React, { useState } from "react";
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, FileText, FlaskConical, Award } from "lucide-react";
import { LabReport } from "@/data/labReports";

export default function AuthenticityWidget() {
  const [batchCode, setBatchCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<LabReport | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerify = async (codeToVerify?: string) => {
    const code = (codeToVerify || batchCode).trim().toUpperCase();
    if (!code) {
      setErrorMsg("Please enter a valid batch number");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setReport(null);

    try {
      const res = await fetch("/api/verify-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchCode: code }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReport(data.data);
      } else {
        setErrorMsg(data.error || "Batch code not found in lab registry.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred while querying lab database.");
    } finally {
      setLoading(false);
    }
  };

  const demoCodes = ["AG-WHEY-2026", "AG-CREAT-8841", "AG-PRE-5510", "AG-PEP-9021"];

  return (
    <section className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#f7f7f8] to-[#ffffff] border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Third-Party Lab Transparency</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight">
              Verify Product Authenticity &amp; Lab Report
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto">
              Every genuine Alpha Gains supplement tub carries an official batch number. Enter your batch code below to view independent laboratory HPLC analysis reports.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={batchCode}
                  onChange={(e) => {
                    setBatchCode(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="Enter Batch Number (e.g. AG-WHEY-2026)"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 text-sm font-mono uppercase focus:outline-none focus:border-red-600"
                  maxLength={30}
                />
              </div>
              <button
                type="button"
                onClick={() => handleVerify()}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
              >
                <FlaskConical className="w-4 h-4" />
                <span>{loading ? "Searching..." : "Verify Batch"}</span>
              </button>
            </div>

            {/* Quick Demo Chips */}
            <div className="flex items-center gap-2 flex-wrap justify-center text-xs text-neutral-600">
              <span>Try test batches:</span>
              {demoCodes.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setBatchCode(code);
                    handleVerify(code);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-50 hover:bg-red-50 text-red-600 border border-neutral-200 text-[11px] font-mono transition-colors"
                >
                  {code}
                </button>
              ))}
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Verified Lab Report Card */}
            {report && (
              <div className="mt-6 bg-white border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-neutral-900 text-sm uppercase">{report.productName}</h4>
                      <p className="text-xs text-emerald-600 font-bold font-mono">Batch #{report.batchCode}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs uppercase tracking-wider self-start sm:self-auto">
                    {report.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-600 block text-[10px] uppercase font-bold">Tested Purity Level</span>
                    <span className="text-red-600 font-bold text-sm">{report.purityPercentage}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-600 block text-[10px] uppercase font-bold">Protein Content / Active Doses</span>
                    <span className="text-neutral-900 font-bold">{report.proteinContent}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-600 block text-[10px] uppercase font-bold">Heavy Metals Screen</span>
                    <span className="text-emerald-600 font-bold">{report.heavyMetalsStatus}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-600 block text-[10px] uppercase font-bold">Microbiological Test</span>
                    <span className="text-emerald-600 font-bold">{report.microbialStatus}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-600 block text-[10px] uppercase font-bold">Manufacturing / Expiry</span>
                    <span className="text-neutral-700">Mfg: {report.manufactureDate} • Exp: {report.expiryDate}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span className="text-neutral-600 block text-[10px] uppercase font-bold">Accredited Laboratory</span>
                    <span className="text-neutral-700">{report.labName} ({report.certificateNumber})</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-neutral-600 text-center flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5 text-red-600" />
                  <span>ISO/IEC 17025 Accredited Laboratory Testing Certificate</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
