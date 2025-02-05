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