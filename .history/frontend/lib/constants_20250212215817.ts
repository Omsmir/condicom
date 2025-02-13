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

export const items = [
  {
    title: "Features",
    listItems: [
      "Multiple strap configurations",
      "Spacious interior with top zip",
      "Leather handle and tabs",
      "Interior dividers",
      "Stainless strap loops",
      "Double stitched construction",
      "Water-resistant",
    ],
  },
  {
    title: "Care",
    listItems: [
      "Spot clean as needed",
      "Hand wash with mild soap",
      "Machine wash interior dividers",
      "Treat handle and tabs with leather conditioner",
    ],
  },
  {
    title: "Shipping",
    listItems: [
      "Free shipping on orders over $300",
      "International shipping available",
      "Expedited shipping options",
      "Signature required upon delivery",
    ],
  },
  {
    title: "Returns",
    listItems: [
      "Easy return requests",
      " Pre-paid shipping label included",
      "10% restocking fee for returns",
      "60 day return window",
    ],
  },
];

const navitems =[
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
    isActive: true,
  },
  {
    title: "Appointments",
    url: "/dashboard/appointments",
    icon: Calendar,
  
    items: [
      {
        title: "Month View",
        url: "#",
      },
      {
        title: "Week View",
        url: "#",
      },
      {
        title: "Day View",
        url: "#",
      },
    ],
  },
  {
    title: "Doctors",
    url: "/dashboard/doctors",
    icon: UserCheck,
    private: true,
  },
  {
    title: "Patients",
    url: "/dashboard/patients",
    icon: User,
  },
  {
    title: "Nurses",
    url: "#",
    icon: User,
  },
  {
    title: "Pharmacy",
    url: "/dashboard/pharmacy",
    icon: Medication,
  },
 
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    items: [
      {
        title: "General",
        url: "#",
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
]
// Menu items.
export const sideItems = [
  
  {
    title: "Create",
    url: "/dashboard/create",
    icon: FilePlus,
    private: true,
  },
 
 
  
];
export const gender = [
  {
    title: "Male",
    image: "/assets/icons/male.png",
  },
  {
    title: "Female",
    image: "/assets/icons/female.png",
  },
  {
    title: "Transgender",
    image: "/assets/icons/trans.png",
  },
];

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
    description: "Focuses on allergies, asthma, and immune system disorders.",
  },
  {
    specialty: "Anesthesiologist",
    description: "Manages anesthesia during surgeries and pain management.",
  },
  {
    specialty: "Cardiologist",
    description: "Specializes in heart and cardiovascular diseases.",
  },
  {
    specialty: "Dermatologist",
    description: "Treats skin, hair, and nail conditions.",
  },
  {
    specialty: "Emergency Medicine Specialist",
    description: "Provides care for acute illnesses and injuries.",
  },
  {
    specialty: "Endocrinologist",
    description: "Focuses on hormonal and metabolic disorders.",
  },
  {
    specialty: "Gastroenterologist",
    description: "Treats digestive system disorders.",
  },
  {
    specialty: "Geriatrician",
    description: "Specializes in the care of elderly patients.",
  },
  {
    specialty: "Hematologist",
    description: "Treats blood disorders like anemia and leukemia.",
  },
  {
    specialty: "Hepatologist",
    description: "Specializes in liver, gallbladder, and pancreas diseases.",
  },
  {
    specialty: "Infectious Disease Specialist",
    description: "Focuses on infectious diseases like HIV/AIDS, TB, etc.",
  },
  {
    specialty: "Internist (Internal Medicine)",
    description: "Manages chronic diseases in adults.",
  },
  {
    specialty: "Nephrologist",
    description: "Treats kidney-related conditions.",
  },
  {
    specialty: "Neurologist",
    description: "Specializes in the nervous system (brain, spine, nerves).",
  },
  {
    specialty: "Neurosurgeon",
    description: "Performs surgeries on the brain, spinal cord, and nerves.",
  },
  {
    specialty: "Obstetrician/Gynecologist (OB/GYN)",
    description:
      "Focuses on pregnancy, childbirth, and female reproductive health.",
  },
  {
    specialty: "Oncologist",
    description: "Treats cancer.",
  },
  {
    specialty: "Ophthalmologist",
    description: "Specializes in eye care and eye surgery.",
  },
  {
    specialty: "Orthopedic Surgeon",
    description: "Treats bone, joint, and musculoskeletal issues.",
  },
  {
    specialty: "Otolaryngologist (ENT)",
    description: "Treats ear, nose, and throat conditions.",
  },
  {
    specialty: "Pathologist",
    description:
      "Diagnoses diseases through laboratory analysis of tissue and blood.",
  },
  {
    specialty: "Pediatrician",
    description: "Provides medical care for infants, children, and teenagers.",
  },
  {
    specialty: "Plastic Surgeon",
    description: "Performs cosmetic and reconstructive surgeries.",
  },
  {
    specialty: "Psychiatrist",
    description: "Specializes in mental health conditions and therapy.",
  },
  {
    specialty: "Pulmonologist",
    description: "Treats lung and respiratory disorders.",
  },
  {
    specialty: "Radiologist",
    description:
      "Diagnoses diseases using imaging techniques like X-ray, MRI, CT scans.",
  },
  {
    specialty: "Rheumatologist",
    description: "Treats autoimmune diseases like arthritis and lupus.",
  },
  {
    specialty: "Surgeon",
    description: "General surgery specialist for various body systems.",
  },
  {
    specialty: "Sports Medicine Specialist",
    description: "Treats sports-related injuries and promotes fitness.",
  },
  {
    specialty: "Urologist",
    description: "Specializes in urinary tract and male reproductive issues.",
  },
  {
    specialty: "Vascular Surgeon",
    description: "Treats vascular (blood vessel) diseases.",
  },
  {
    specialty: "Interventional Cardiologist",
    description: "Performs minimally invasive heart procedures.",
  },
  {
    specialty: "Neonatologist",
    description: "Specializes in the care of newborn infants.",
  },
  {
    specialty: "Reproductive Endocrinologist",
    description: "Treats infertility and hormone disorders in reproduction.",
  },
  {
    specialty: "Pain Management Specialist",
    description: "Manages chronic pain conditions.",
  },
  {
    specialty: "Palliative Care Specialist",
    description: "Focuses on improving quality of life for terminal illnesses.",
  },
  {
    specialty: "Medical Geneticist",
    description: "Studies and treats genetic disorders.",
  },
  {
    specialty: "Sleep Medicine Specialist",
    description: "Treats sleep disorders like insomnia and sleep apnea.",
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
