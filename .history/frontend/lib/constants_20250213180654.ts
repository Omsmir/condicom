
import { ObjectType } from "@/types";
import { BellOutlined } from "@ant-design/icons";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  FilePlus,
  UserCheck,
  CircleUser,
  User,
} from "lucide-react";
import { Medication } from "@mui/icons-material";

export const SideBarItems =[
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
    group:false,
    sideItemTitle:"Dashboard"
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: Calendar,
    group:true,
    isActive:true,
    items: [
      {
        title: "Month View",
        url: "/dashboard/appointments/#monthview",
        viewport:1
      },
      {
        title: "Week View",
        url: "/dashboard/appointments/#weekview",
        viewport:2
      },
      {
        title: "Day View",
        url: "/dashboard/appointments/#dayview",
        viewport:3
      },
    ],
  },
  {
    title: "Doctors",
    url: "/dashboard/doctors",
    icon: UserCheck,
    private: true,
    group:false

  },
  {
    title: "Patients",
    url: "/dashboard/patients",
    icon: User,
    group:false

  },
  {
    title: "Nurses",
    url: "#",
    icon: User,
    group:false

  },
  {
    title: "Pharmacy",
    url: "/dashboard/pharmacy",
    icon: Medication,
    group:false,
    sideItemTitle:"Pharmcay"

  },
 
  
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    group:true,
    isActive:true,
    sideItemTitle:"Dashboard",

    items: [
      {
        title: "profile",
        url: "/dashboard/profile",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: BellOutlined,
    group:false
  },
]

export const Days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const medicalSpecialties = [
  {
    specialty: "Allergist/Immunologist",
  },
  {
    specialty: "Anesthesiologist",
  },
  {
    specialty: "Cardiologist",
  },
  {
    specialty: "Dermatologist",
  },
  {
    specialty: "Emergency Medicine Specialist",
  },
  {
    specialty: "Endocrinologist",
  },
  {
    specialty: "Gastroenterologist",
  },
  {
    specialty: "Geriatrician",
  },
  {
    specialty: "Hematologist",
  },
  {
    specialty: "Hepatologist",
  },
  {
    specialty: "Infectious Disease Specialist",
  },
  {
    specialty: "Internist (Internal Medicine)",
  },
  {
    specialty: "Nephrologist",
  },
  {
    specialty: "Neurologist",
  },
  {
    specialty: "Neurosurgeon",
  },
  {
    specialty: "Obstetrician/Gynecologist (OB/GYN)",
   
  },
  {
    specialty: "Oncologist",
  },
  {
    specialty: "Ophthalmologist",
  },
  {
    specialty: "Orthopedic Surgeon",
  },
  {
    specialty: "Otolaryngologist (ENT)",
  },
  {
    specialty: "Pathologist",
  },
  {
    specialty: "Pediatrician",
  },
  {
    specialty: "Plastic Surgeon",
  },
  {
    specialty: "Psychiatrist",
  },
  {
    specialty: "Pulmonologist",
  },
  {
    specialty: "Radiologist",
 
  },
  {
    specialty: "Rheumatologist",
  },
  {
    specialty: "Surgeon",
  },
  {
    specialty: "Sports Medicine Specialist",
  },
  {
    specialty: "Urologist",
  },
  {
    specialty: "Vascular Surgeon",
  },
  {
    specialty: "Interventional Cardiologist",
  },
  {
    specialty: "Neonatologist",
  },
  {
    specialty: "Reproductive Endocrinologist",
  },
  {
    specialty: "Pain Management Specialist",
  },
  {
    specialty: "Palliative Care Specialist",
  },
  {
    specialty: "Medical Geneticist",
  },
  {
    specialty: "Sleep Medicine Specialist",
  },
];

export const weights = [
  { value: "50 kg (110.23 lbs)" },
  { value: "55 kg (121.25 lbs)" },
  { value: "60 kg (132.28 lbs)" },
  { value: "65 kg (143.3 lbs)" },
  { value: "70 kg (154.32 lbs)" },
  { value: "75 kg (165.35 lbs)" },
  { value: "80 kg (176.37 lbs)" },
  { value: "85 kg (187.39 lbs)" },
  { value: "90 kg (198.42 lbs)" },
  { value: "95 kg (209.44 lbs)" },
  { value: "100 kg (220.46 lbs)" },
  { value: "105 kg (231.49 lbs)" },
  { value: "110 kg (242.51 lbs)" },
  { value: "115 kg (253.53 lbs)" },
  { value: "120 kg (264.56 lbs)" },
  { value: "125 kg (275.58 lbs)" },
  { value: "130 kg (286.6 lbs)" },
  { value: "135 kg (297.62 lbs)" },
  { value: "140 kg (308.65 lbs)" },
  { value: "145 kg (319.67 lbs)" },
  { value: "150 kg (330.69 lbs)" },
];

export const heigths = [
  "150 cm (4 ft 11 in)",
  "155 cm (5 ft 1 in)",
  "160 cm (5 ft 3 in)",
  "165 cm (5 ft 5 in)",
  "170 cm (5 ft 7 in)",
  "175 cm (5 ft 9 in)",
  "180 cm (5 ft 11 in)",
  "185 cm (6 ft 1 in)",
  "190 cm (6 ft 3 in)",
  "195 cm (6 ft 5 in)",
  "200 cm (6 ft 7 in)",
];

export const notificationSounds = (tone: keyof ObjectType): string | null => {
  const systemSounds: ObjectType = {
    adminOnly: {
      title: "public",
      tone: "/assets/audio/airport-call-157168.mp3",
    },
    public: {
      title: "AdminOnly",
      tone: "/assets/audio/appointment.mp3",
    },
  };
  return systemSounds[tone].tone;
};

export const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const emergencyContactRelationships = [
  "Spouse",
  "Parent",
  "Sibling",
  "Child",
  "Grandparent",
  "Grandchild",
  "Aunt",
  "Uncle",
  "Cousin",
  "Niece",
  "Nephew",
  "Friend",
  "Guardian",
  "Partner",
  "Colleague",
  "Neighbor",
  "Caregiver",
  "In-Law",
  "Other",
];
export const allergies = {
  food: [
    "Other",
    "Peanuts",
    "Tree Nuts (Almonds, Walnuts, Cashews)",
    "Dairy (Milk, Cheese, Yogurt)",
    "Shellfish (Shrimp, Crab, Lobster)",
    "Eggs",
    "Soy",
    "Wheat (Gluten)",
    "Fish (Salmon, Tuna, Cod)",
  ],
  medicine: [
    "Penicillin",
    "Aspirin",
    "Ibuprofen",
    "Sulfa Drugs",
    "Codeine",
    "Insulin",
    "Antibiotics (Amoxicillin, Cephalosporins)",
  ],
  environmental: [
    "Pollen",
    "Dust Mites",
    "Mold",
    "Animal Dander",
    "Insect Stings (Bees, Wasps)",
    "Latex",
  ],
};

export const medicalConditions: string[] = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Cancer",
  "Chronic Kidney Disease",
  "Liver Disease",
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Epilepsy",
  "Thyroid Disorders",
  "Arthritis",
  "HIV/AIDS",
  "Tuberculosis",
  "Mental Health Disorders (Depression, Anxiety, Bipolar Disorder, etc.)",
  "Autoimmune Diseases (Lupus, Rheumatoid Arthritis, etc.)",
  "Stroke",
  "Obesity",
  "Gastroesophageal Reflux Disease (GERD)",
  "Anemia",
];

export const genders = [
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
  "Xenogender",
];

export const Frequencies = ["daily", "occasionally", "rarely", "never"];

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
] as const;
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
]as const;

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
