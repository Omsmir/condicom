import { Inter, Lato, Poppins } from "next/font/google";

export const inter = Inter({
    weight:["300","400","500","600","700"],
    display:"swap",
    subsets:["latin"],
    preload:true
})


export const lato = Lato({
    weight:["300","400","700"],
    display:"swap",
    subsets:["latin"],
    preload:true
})

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "900"],
  subsets: ["latin"],
  display:"fallback",
  preload:true
});

