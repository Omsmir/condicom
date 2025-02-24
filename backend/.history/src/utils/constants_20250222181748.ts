export const MedicalStuffRegex = [
    // C
      {
        regex: /B(1)[1](C)[0-9]{5}/,
        role: "Admin",
        assignedTo: ["AdminOnly","AdminsFromAll","All"]
      },
      {
        regex: /B(1)[2](C)[0-9]{5}/,
        role: "Senior Consultant",
        assignedTo: ["seniorConsultantOnly","All"]
      },
      {
        regex: /B(1)[3](C)[0-9]{5}/,
        role: "Resident Doctor",
        assignedTo: ["residentDoctorOnly","All"]
      },
      {
        regex: /B(1)[4](C)[0-9]{5}/,
        role: "Intern Doctor" ,
       assignedTo: "internDoctorOnly"
      },
      // E
      {
        regex: /B(1)[1](E)[0-9]{5}/,
        role: "Head Secretary",
        assignedTo: "headSecretaryOnly"
      },
      {
        regex: /B(1)[2](E)[0-9]{5}/,
        role: "Charge Secretary",
        assignedTo: "chargeSecretaryOnly"
      }, 
    //  D
      {
        regex: /B(1)[1](D)[0-9]{5}/,
        role: "Head Nurse",
        assignedTo: "headNurseOnly"
      },
      {
        regex: /B(1)[2](D)[0-9]{5}/,
        role: "Charge Nurse",
        assignedTo: "chargeNurseOnly"
      }
    ]
  
  
  
    export const genders =  [
      "Male",
      "Female",
      "Non-Binary",
      "Genderfluid",
      "Genderqueer",
      "Agender",
      "Bigender",
      "Two-Spirit",
      "Demiboy",
      "Demigirl",
      "Androgynous",
      "Neutrois",
      "Transgender Male",
      "Transgender Female",
      "Intersex",
      "Pangender",
      "Third Gender",
      "Maverique",
      "Polygender",
      "Omnigender",
      "Xenogender",]
  
      
  export const medicationStrengths = [
    "other",
    "50mg", "100mg", "150mg", "200mg", "250mg", "300mg", "400mg", "500mg", "600mg", "800mg", "1000mg",
    "2.5mg", "5mg", "7.5mg", "10mg", "12.5mg", "20mg", "25mg", "30mg", "35mg", "40mg", "60mg",
    "75mg", "80mg", "90mg", "120mg",
    "500mcg", "750mcg", "1mcg", "2mcg", "5mcg", "10mcg", "20mcg", "50mcg", "100mcg",
    "0.5mg", "1mg", "2mg", "15mg",
    "125mg/5ml", "250mg/5ml", "500mg/5ml", "1000mg/5ml",
    "100U/ml", "200U/ml", "300U/ml", "500U/ml",
    "1g", "2g", "5g", "10g", "50g", "100g",
    "0.5% w/v", "1% w/v", "2% w/v", "5% w/v"
  ] 
  export const medicationRoutes = [
    "other",
    "Oral",
    "Intravenous (IV)",
    "Intramuscular (IM)",
    "Subcutaneous (SC)",
    "Inhalation",
    "Topical",
    "Sublingual",
    "Buccal",
    "Rectal",
    "Vaginal",
    "Ophthalmic",
    "Otic",
    "Transdermal",
    "Intranasal",
    "Intradermal",
    "Epidural",
    "Intrathecal",
    "Enteral",
  ]
  
  export const medicationForms = [
    "other",
    "Tablet",
    "Capsule",
    "Liquid",
    "Syrup",
    "Suspension",
    "Injection",
    "Inhaler",
    "Patch",
    "Cream",
    "Ointment",
    "Gel",
    "Lotion",
    "Suppository",
    "Drops",
    "Powder",
    "Granules",
    "Implant",
    "Spray",
    "Lozenge",
    "Effervescent Tablet",
    "Solution",
    "Emulsion",
  ] as const;
  export  const medicationCategories = [
    "other",
    "Analgesic", "Antibiotic", "Antifungal", "Antiviral", "Antihypertensive", "Antidiabetic",
    "Antidepressant", "Antipsychotic", "Anticonvulsant", "Anticoagulant", "Antiplatelet",
    "Beta Blocker", "Calcium Channel Blocker", "Diuretic", "Bronchodilator", "Corticosteroid",
    "NSAID", "Opioid", "Proton Pump Inhibitor", "H2 Receptor Antagonist", "Antiemetic",
    "Antihistamine", "Antiparasitic", "Muscle Relaxant", "Sedative", "Hypnotic",
    "Antineoplastic", "Hormone Therapy", "Immunosuppressant", "Immunomodulator",
    "Lipid-Lowering Agent", "Osteoporosis Treatment", "Antispasmodic", "Thyroid Hormone",
    "Vasodilator", "Anticholinergic", "Antimigraine"
  ] as const
  