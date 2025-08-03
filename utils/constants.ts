const NAVBAR_ITEMS = [
  // {
  //   id: "home",
  //   title: "home",
  // },
  {
    id: "about",
    title: "About Us",
  },
  {
    id: "events",
    title: "Events",
  },
  { id: "community", title: "Community" },
  { id: "faq", title: "FAQ" },
  {
    id: "contact",
    title: "Contact us",
  },
];
const featureLists = [
  "Active Noise Cancellation",
  "Adaptive Transparency Mode",
  "Spatial Audio with Dynamic Head Tracking",
  "Customizable Silicone Ear Tips",
];
const goodLists = [
  "Apple-designed H2 chip for smarter noise control",
  "Up to 6 hours of listening time on a single charge",
  "MagSafe Charging Case with Precision Finding",
  "Sweat and Water Resistance (IPX4)",
];

const storeInfo = {
  heading: "Where to Find Us",
  address: "Algeria, Laghouat",
  contact: {
    phone: "+(213) 712345678",
    email: "ferhattaher00@gmail.com",
  },
};

const openingHours = [
  { day: "Mon–Thu", time: "11:00am – 12am" },
  { day: "Fri", time: "11:00am – 2am" },
  { day: "Sat", time: "9:00am – 2am" },
  { day: "Sun", time: "9:00am – 1am" },
];

const socials = [
  {
    name: "Instagram",
    icon: "/images/insta.png",
    url: "#",
  },
  {
    name: "X (Twitter)",
    icon: "/images/x.png",
    url: "#",
  },
  {
    name: "Facebook",
    icon: "/images/fb.png",
    url: "#",
  },
];
const sliderLists = [
  {
    id: 1,
    name: "Apple AirPods Pro - White",
    image: "/images/product1.png",
    title: "Iconic Sound. Pure White Elegance.",
    description:
      "Experience immersive sound and active noise cancellation in a sleek white finish. Perfect for those who appreciate classic, minimalist design.",
  },
  {
    id: 2,
    name: "Apple AirPods Pro - Black",
    image: "/images/product2.png",
    title: "Bold. Sleek. Powerful.",
    description:
      "A stealthy matte black design with the same crystal-clear audio and adaptive transparency you love. Make a statement without saying a word.",
  },
  {
    id: 3,
    name: "Apple AirPods Pro Neon - Orange",
    image: "/images/product3.png",
    title: "Turn Up the Volume in Neon Orange.",
    description:
      "Vibrant and energetic, this limited edition brings fun to function. Eye-catching style meets signature AirPods Pro performance.",
  },
  {
    id: 4,
    name: "Apple AirPods Pro - Violet",
    image: "/images/product4.png",
    title: "Style Meets Serenity in Violet.",
    description:
      "A calm and elegant take on wireless audio. The violet finish adds personality while delivering the high-fidelity sound AirPods Pro are known for.",
  },
];

export {
  featureLists,
  goodLists,
  NAVBAR_ITEMS,
  openingHours,
  sliderLists,
  socials,
  storeInfo,
};
