export const MedicalStuffRegex = [
  // C
    {
      regex: /B(1)[1](C)[0-9]{5}/,
      role: "Admin"
    },
    {
      regex: /B(1)[2](C)[0-9]{5}/,
      role: "Senior Consultant"
    },
    {
      regex: /B(1)[3](C)[0-9]{5}/,
      role: "Resident Doctor"
    },
    {
      regex: /B(1)[4](C)[0-9]{5}/,
      role: "Intern Doctor"  
    },
    // E
    {
      regex: /B(1)[1](E)[0-9]{5}/,
      role: "Head Secretary"
    },
    {
      regex: /B(1)[2](E)[0-9]{5}/,
      role: "Charge Secretary"
    }, 
  //  D
    {
      regex: /B(1)[1](D)[0-9]{5}/,
      role: "Head Nurse"
    },
    {
      regex: /B(1)[2](D)[0-9]{5}/,
      role: "Charge Nurse"
    }
  ]