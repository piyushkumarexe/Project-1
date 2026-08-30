export interface LabReport {
  batchCode: string;
  productName: string;
  manufactureDate: string;
  expiryDate: string;
  proteinContent: string;
  purityPercentage: string;
  heavyMetalsStatus: "PASSED (Below LOD)" | "FAILED";
  microbialStatus: "PASSED (Zero Pathogens)" | "FAILED";
  labName: string;
  certificateNumber: string;
  status: "Verified Authentic" | "Warning";
}

export const LAB_REPORTS: Record<string, LabReport> = {
  "AG-WHEY-2026": {
    batchCode: "AG-WHEY-2026",
    productName: "Alpha Gains 100% Whey Gold Isolate",
    manufactureDate: "2026-06-15",
    expiryDate: "2028-06-14",
    proteinContent: "26.4g per 30g scoop (88.0% Purity)",
    purityPercentage: "99.4%",
    heavyMetalsStatus: "PASSED (Below LOD)",
    microbialStatus: "PASSED (Zero Pathogens)",
    labName: "Eurofins Food & Pharma Analytics Lab",
    certificateNumber: "EF-IND-2026-8894",
    status: "Verified Authentic",
  },
  "AG-CREAT-8841": {
    batchCode: "AG-CREAT-8841",
    productName: "Alpha Gains Pure Micronized Creatine Monohydrate",
    manufactureDate: "2026-07-02",
    expiryDate: "2028-07-01",
    proteinContent: "N/A (Pure Creatine)",
    purityPercentage: "99.98% Micronized Mesh 200",
    heavyMetalsStatus: "PASSED (Below LOD)",
    microbialStatus: "PASSED (Zero Pathogens)",
    labName: "SGS India Analytical Testing Services",
    certificateNumber: "SGS-DEL-99210",
    status: "Verified Authentic",
  },
  "AG-PRE-5510": {
    batchCode: "AG-PRE-5510",
    productName: "Alpha Gains Preworkout High Focus & Intensity",
    manufactureDate: "2026-05-20",
    expiryDate: "2028-05-19",
    proteinContent: "L-Citrulline 6000mg, Beta-Alanine 3200mg, Caffeine 350mg",
    purityPercentage: "99.8%",
    heavyMetalsStatus: "PASSED (Below LOD)",
    microbialStatus: "PASSED (Zero Pathogens)",
    labName: "TUV SUD South Asia Labs",
    certificateNumber: "TUV-SA-2026-4412",
    status: "Verified Authentic",
  },
  "AG-PEP-9021": {
    batchCode: "AG-PEP-9021",
    productName: "Innova Pharma Genesis IGF-1 Peptides",
    manufactureDate: "2026-06-10",
    expiryDate: "2028-06-09",
    proteinContent: "Active IGF-1 Bioactive Peptide Complex 50mcg",
    purityPercentage: "99.7% HPLC Tested",
    heavyMetalsStatus: "PASSED (Below LOD)",
    microbialStatus: "PASSED (Zero Pathogens)",
    labName: "Intertek Testing Services UK & India",
    certificateNumber: "INT-PEP-78190",
    status: "Verified Authentic",
  },
  "AG-LIVO-3304": {
    batchCode: "AG-LIVO-3304",
    productName: "Alpha Gains Livoguard (Liver Detox & Appetite)",
    manufactureDate: "2026-07-18",
    expiryDate: "2028-07-17",
    proteinContent: "Milk Thistle 80% Silymarin, NAC 600mg, TUDCA 250mg",
    purityPercentage: "99.6%",
    heavyMetalsStatus: "PASSED (Below LOD)",
    microbialStatus: "PASSED (Zero Pathogens)",
    labName: "Eurofins Food & Pharma Analytics Lab",
    certificateNumber: "EF-LIV-2026-1049",
    status: "Verified Authentic",
  },
  "AG-SEX-7712": {
    batchCode: "AG-SEX-7712",
    productName: "Alpha Gains Sexcharge : Ultimate Performance Booster",
    manufactureDate: "2026-06-25",
    expiryDate: "2028-06-24",
    proteinContent: "Tongkat Ali 200:1, Fadogia Agrestis, Ashwagandha KSM-66",
    purityPercentage: "99.5%",
    heavyMetalsStatus: "PASSED (Below LOD)",
    microbialStatus: "PASSED (Zero Pathogens)",
    labName: "SGS India Analytical Testing Services",
    certificateNumber: "SGS-MALE-3381",
    status: "Verified Authentic",
  },
};
