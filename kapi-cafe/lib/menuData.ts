export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  tag?: "veg" | "non-veg" | "special";
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "pearl-infusions",
    name: "Pearl Infusions",
    icon: "🧋",
    tagline: "Popping pearls, bursting flavours",
    items: [
      { name: "Orange Popping", price: 139 },
      { name: "Berry Popping", price: 149 },
      { name: "Green Apple Popping", price: 149 },
      { name: "Pineapple Popping", price: 139 },
    ],
  },
  {
    id: "lime-time",
    name: "Lime Time",
    icon: "🍋",
    tagline: "Zesty, refreshing & bold",
    items: [
      { name: "Fresh Lime", price: 39 },
      { name: "Mint Lime", price: 49 },
      { name: "Mint Mojito", price: 89 },
      { name: "Lime Soda", price: 49 },
      { name: "Chilly Soda", price: 69 },
      { name: "Kapi Spl Lime", price: 99, tag: "special" },
      { name: "Grape Lime", price: 99 },
      { name: "Pineapple Lime", price: 99 },
      { name: "Apple Lime", price: 99 },
      { name: "Watermelon Lime", price: 99 },
    ],
  },
  {
    id: "shake-bar",
    name: "The Shake Bar",
    icon: "🥤",
    tagline: "Thick, creamy & indulgent",
    items: [
      { name: "Chikoo", price: 169 },
      { name: "Mango", price: 189 },
      { name: "Strawberry", price: 159 },
      { name: "Apple", price: 159 },
      { name: "Oreo", price: 169 },
      { name: "Chocolate", price: 159 },
      { name: "Butterscotch", price: 159 },
      { name: "Cold Coffee", price: 140 },
      { name: "Kitkat", price: 139 },
      { name: "Nutella", price: 139 },
    ],
  },
  {
    id: "toasted-delights",
    name: "Toasted Delights",
    icon: "🥪",
    tagline: "Crispy outside, flavourful inside",
    items: [
      { name: "Veg Grill Sandwich", price: 119, tag: "veg" },
      { name: "Veg Cheese Grill Sandwich", price: 149, tag: "veg" },
      { name: "Chicken Grill Sandwich", price: 139, tag: "non-veg" },
      { name: "Chicken Grill Cheese Sandwich", price: 169, tag: "non-veg" },
      { name: "Veg Tandoor Grill Sandwich", price: 129, tag: "veg" },
      { name: "Chicken Tandoor Grill Sandwich", price: 149, tag: "non-veg" },
      { name: "Veg Tandoor Cheese Grill", price: 149, tag: "veg" },
      { name: "Chicken Tandoor Cheese Grill", price: 179, tag: "non-veg" },
      { name: "Veg Wrap", price: 119, tag: "veg" },
      { name: "Chicken Wrap", price: 139, tag: "non-veg" },
      { name: "Veg Cheese Wrap", price: 139, tag: "veg" },
      { name: "Chicken Cheese Wrap", price: 159, tag: "non-veg" },
    ],
  },
  {
    id: "loaded-buns",
    name: "Loaded Buns",
    icon: "🍔",
    tagline: "Stacked high, full of joy",
    items: [
      { name: "Kapi Spl Veg Burger", price: 179, tag: "special" },
      { name: "Kapi Spl Chicken Burger", price: 209, tag: "special" },
      { name: "Veg Burger", price: 129, tag: "veg" },
      { name: "Chicken Burger", price: 149, tag: "non-veg" },
      { name: "Cheeze Burger Veg", price: 159, tag: "veg" },
      { name: "Cheeze Burger Chicken", price: 179, tag: "non-veg" },
      { name: "Sizzling Special Burger", price: 299, tag: "special" },
      { name: "Extra Cheese", price: 40 },
    ],
  },
  {
    id: "say-cheese",
    name: "Say Cheese",
    icon: "🍕",
    tagline: "Thin crust, big flavours",
    items: [
      { name: "Veg Pizza", price: 149, tag: "veg" },
      { name: "Margarita", price: 139, tag: "veg" },
      { name: "Paneer", price: 179, tag: "veg" },
      { name: "Chicken Pizza", price: 179, tag: "non-veg" },
      { name: "Mushroom", price: 169, tag: "veg" },
    ],
  },
  {
    id: "natures-bowl",
    name: "Natures Bowl",
    icon: "🥗",
    tagline: "Fresh, vibrant & wholesome",
    items: [
      { name: "Mixed Fruits Salad", price: 139, tag: "veg" },
      { name: "Mixed Fruits Salad with Icecream", price: 169, tag: "veg" },
    ],
  },
  {
    id: "brain-freeze",
    name: "Brain Freeze",
    icon: "🍦",
    tagline: "Cool down in style",
    items: [
      { name: "Ice Cream Single", price: 39 },
      { name: "Ice Cream Double", price: 79 },
      { name: "Ice Cream with Dry Fruits", price: 99 },
    ],
  },
  {
    id: "kapi-edits",
    name: "The Kapi Edits",
    icon: "✨",
    tagline: "Curated house specialties",
    items: [
      { name: "Chocolate Sundae", price: 149 },
      { name: "Oreo Sundae", price: 149 },
      { name: "Berry Sundae", price: 149 },
      { name: "Fruit Carnival", price: 149 },
      { name: "Special Veg Maggi", price: 70, tag: "veg" },
      { name: "Spl. Cheese Maggi", price: 85, tag: "veg" },
      { name: "Spl. Cheese Corn Maggi", price: 90, tag: "veg" },
    ],
  },
  {
    id: "avil-delights",
    name: "Kapi Signature Avil Delights",
    icon: "🌺",
    tagline: "A Kerala-inspired signature creation",
    items: [
      { name: "Normal", price: 115 },
      { name: "Kapi Special", price: 189, tag: "special" },
      { name: "Mixed Fruit", price: 149 },
      { name: "Mixed Dry Fruit", price: 169 },
    ],
  },
  {
    id: "layered-delights",
    name: "Layered Delights",
    icon: "🌈",
    tagline: "Layer after layer of pleasure",
    items: [
      { name: "Normal Falooda", price: 149 },
      { name: "Kapi Spl Falooda", price: 189, tag: "special" },
      { name: "Mixed Fruit Falooda", price: 169 },
      { name: "Mixed Dryfruit Falooda", price: 179 },
      { name: "Chocolate Falooda", price: 179 },
    ],
  },
];
