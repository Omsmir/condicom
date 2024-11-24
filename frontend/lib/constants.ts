import { Calendar, Home, Inbox, Search, Settings ,FilePlus,User} from "lucide-react"

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

// Menu items.
export const sideItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Create",
    url: "/dashboard/create",
    icon: FilePlus,
    private:true
  },
  {
    title: "Calendar",
    url: "/dashboard/calender",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
export const gender = [
  {
    title:"Male",
    image:"/assets/icons/male.png"
  },
  {
    title:"Female",
    image:"/assets/icons/female.png"
  }
  ,  {
    title:"Other",
    image:"/assets/icons/more.png"
  }
]


export const Days = ['Sat','Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];