/* src/data/categories.js */
export const categories = [
  { title: "Electrical & Wiring", icon: "🔌" },
  { title: "Electronics & Appliances", icon: "📺" },
  { title: "Home & Furniture", icon: "🛋️" },
  { title: "Plumbing", icon: "🚰" },
  { title: "Automotive", icon: "🚗" },
  { title: "IT & Software", icon: "💻" },
  { title: "Tools & Miscellaneous", icon: "🛠️" },
];

export const categoriesWithSubs = [
  {
    title: "Electrical & Wiring",
    icon: "🔌",
    subcategories: [
      { name: "Fan Installation", icon: "🌀" },
      { name: "Switchboard Repair", icon: "🎛️" },
      { name: "Wiring Issues", icon: "🧵" },
      { name: "Lighting Setup", icon: "💡" },
    ],
  },
  {
    title: "Electronics & Appliances",
    icon: "📺",
    subcategories: [
      { name: "TV Repair", icon: "📺" },
      { name: "AC Service", icon: "❄️" },
      { name: "Fridge Repair", icon: "🧊" },
      { name: "Washing Machine", icon: "🧺" },
    ],
  },
  {
    title: "Home & Furniture",
    icon: "🛋️",
    subcategories: [
      { name: "Carpentry", icon: "🪚" },
      { name: "Bed Repair", icon: "🛏️" },
      { name: "Modular Setup", icon: "🏗️" },
    ],
  },
  {
    title: "Plumbing",
    icon: "🚰",
    subcategories: [
      { name: "Leak Fix", icon: "💧" },
      { name: "Pipe Fitting", icon: "🪠" },
      { name: "Sink Installation", icon: "🚿" },
    ],
  },
  {
    title: "Automotive",
    icon: "🚗",
    subcategories: [
      { name: "Car Battery", icon: "🔋" },
      { name: "Bike Servicing", icon: "🏍️" },
      { name: "Oil Change", icon: "🛢️" },
    ],
  },
  {
    title: "IT & Software",
    icon: "💻",
    subcategories: [
      { name: "Laptop Repair", icon: "💻" },
      { name: "PC Setup", icon: "🖥️" },
      { name: "WiFi Installation", icon: "📶" },
    ],
  },
  {
    title: "Tools & Miscellaneous",
    icon: "🛠️",
    subcategories: [
      { name: "Tool Rental", icon: "🔧" },
      { name: "Ladder Fix", icon: "🪜" },
      { name: "Other Services", icon: "❓" },
    ],
  },
];
