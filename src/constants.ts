import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Áo Sơ Mi Lụa Premium",
    price: 850000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=800",
    category: "Áo",
    gender: "Nữ",
    description: "Chất liệu lụa cao cấp, mềm mại và thoáng mát. Thiết kế thanh lịch phù hợp cho công sở và dạo phố.",
    colors: ["Trắng", "Be", "Đen"],
    sizes: ["S", "M", "L"],
    isSale: true
  },
  {
    id: 2,
    name: "Quần Tây Form Suông",
    price: 650000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
    category: "Quần",
    gender: "Nữ",
    description: "Quần tây ống suông tôn dáng, chất vải đứng form, ít nhăn.",
    colors: ["Đen", "Xám"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true
  },
  {
    id: 3,
    name: "Blazer Modern Classic",
    price: 1550000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    category: "Áo Khoác",
    gender: "Unisex",
    description: "Thiết kế tối giản, đường may tinh tế. Một item không thể thiếu trong tủ đồ hiện đại.",
    colors: ["Be", "Đen", "Nâu"],
    sizes: ["M", "L", "XL"],
    isNew: true
  },
  {
    id: 4,
    name: "Váy Lụa Satin Dự Tiệc",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    category: "Váy",
    gender: "Nữ",
    description: "Váy lụa satin bóng nhẹ, ôm sát đường cong quyến rũ.",
    colors: ["Đỏ Rượu", "Đen", "Vàng Đồng"],
    sizes: ["S", "M"],
    isSale: false
  },
  {
    id: 5,
    name: "Áo Polo Cotton Mercerized",
    price: 450000,
    originalPrice: 550000,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=800",
    category: "Áo",
    gender: "Nam",
    description: "Chất liệu cotton mercerized cao cấp, bề mặt mịn màng, bền màu.",
    colors: ["Xanh Navy", "Trắng", "Xám"],
    sizes: ["M", "L", "XL", "XXL"],
    isSale: true
  },
  {
    id: 6,
    name: "Quần Jean Slim Fit",
    price: 750000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    category: "Quần",
    gender: "Nam",
    description: "Chất jean co giãn nhẹ, form slim fit hiện đại.",
    colors: ["Xanh Sáng", "Xanh Đậm"],
    sizes: ["29", "30", "31", "32"],
    isNew: false
  }
];

export const CATEGORIES = [
  { name: "Áo Nam", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800" },
  { name: "Áo Nữ", image: "https://images.unsplash.com/photo-1539109132314-3477524c8d95?auto=format&fit=crop&q=80&w=800" },
  { name: "Quần", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800" },
  { name: "Váy", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800" },
  { name: "Set Đồ", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" },
  { name: "Phụ Kiện", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800" }
];
