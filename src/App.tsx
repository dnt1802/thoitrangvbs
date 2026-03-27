/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Truck, 
  RefreshCcw, 
  ShieldCheck, 
  Headphones,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Filter,
  Trash2,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, View } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

// --- Components ---

const Navbar = ({ 
  cartCount, 
  setView, 
  currentView 
}: { 
  cartCount: number; 
  setView: (v: View) => void;
  currentView: View;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', view: 'home' as View },
    { name: 'Sản phẩm', view: 'shop' as View },
    { name: 'Bộ sưu tập', view: 'shop' as View },
    { name: 'Hàng mới về', view: 'shop' as View },
    { name: 'Sale', view: 'shop' as View },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className={isScrolled ? 'text-brand-dark' : 'text-white'} />
        </button>

        {/* Logo */}
        <div 
          className={`text-2xl font-serif font-bold tracking-widest cursor-pointer ${
            isScrolled ? 'text-brand-dark' : 'text-white'
          }`}
          onClick={() => setView('home')}
        >
          LUMINA
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setView(link.view)}
              className={`text-sm uppercase tracking-widest font-medium transition-colors hover:opacity-70 ${
                isScrolled ? 'text-brand-dark' : 'text-white'
              } ${currentView === link.view ? 'border-b border-current' : ''}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Icons */}
        <div className={`flex items-center space-x-5 ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
          <Search className="w-5 h-5 cursor-pointer hover:opacity-70" />
          <User className="w-5 h-5 cursor-pointer hover:opacity-70 hidden sm:block" />
          <Heart className="w-5 h-5 cursor-pointer hover:opacity-70 hidden sm:block" />
          <div 
            className="relative cursor-pointer hover:opacity-70"
            onClick={() => setView('cart')}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-serif font-bold tracking-widest">LUMINA</div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setView(link.view);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xl font-serif text-left border-b border-gray-100 pb-4"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ 
  product, 
  onViewDetail 
}: { 
  product: Product; 
  onViewDetail: (p: Product) => void;
}) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => onViewDetail(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-brand-dark text-white text-[10px] uppercase tracking-widest px-2 py-1">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] uppercase tracking-widest px-2 py-1">
            Sale
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <button className="w-full bg-white text-brand-dark py-3 text-xs uppercase tracking-widest font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Xem chi tiết
          </button>
        </div>
      </div>
      <h3 className="text-sm font-medium mb-1 group-hover:underline">{product.name}</h3>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-bold">{product.price.toLocaleString('vi-VN')}đ</span>
        {product.originalPrice && (
          <span className="text-xs text-brand-gray line-through">
            {product.originalPrice.toLocaleString('vi-VN')}đ
          </span>
        )}
      </div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="text-3xl font-serif font-bold tracking-widest mb-6">LUMINA</div>
          <p className="text-brand-gray text-sm leading-relaxed mb-8">
            Nâng tầm phong cách mỗi ngày với những thiết kế hiện đại, thanh lịch và tinh tế nhất.
          </p>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-white/70" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white/70" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-white/70" />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Mua sắm</h4>
          <ul className="space-y-4 text-sm text-brand-gray">
            <li className="hover:text-white cursor-pointer">Tất cả sản phẩm</li>
            <li className="hover:text-white cursor-pointer">Hàng mới về</li>
            <li className="hover:text-white cursor-pointer">Bộ sưu tập</li>
            <li className="hover:text-white cursor-pointer">Khuyến mãi</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Hỗ trợ</h4>
          <ul className="space-y-4 text-sm text-brand-gray">
            <li className="hover:text-white cursor-pointer">Chính sách đổi trả</li>
            <li className="hover:text-white cursor-pointer">Chính sách giao hàng</li>
            <li className="hover:text-white cursor-pointer">Hướng dẫn chọn size</li>
            <li className="hover:text-white cursor-pointer">Liên hệ</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Đăng ký nhận tin</h4>
          <p className="text-sm text-brand-gray mb-4">Nhận ngay ưu đãi 10% cho đơn hàng đầu tiên.</p>
          <div className="flex border-b border-white/20 pb-2">
            <input 
              type="email" 
              placeholder="Email của bạn" 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30"
            />
            <button><ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-brand-gray">
        <p>© 2026 LUMINA FASHION. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
};

// --- Views ---

const HomeView = ({ 
  onShopNow, 
  onViewProduct 
}: { 
  onShopNow: () => void;
  onViewProduct: (p: Product) => void;
}) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Fashion"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">
              Nâng tầm <br /> phong cách
            </h1>
            <p className="text-lg md:text-xl max-w-xl mb-10 font-light opacity-90">
              Khám phá bộ sưu tập thời trang hiện đại, thanh lịch và tinh tế. 
              Thiết kế dành riêng cho những tâm hồn yêu cái đẹp.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={onShopNow}
                className="bg-white text-brand-dark px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand-beige transition-colors"
              >
                Mua ngay
              </button>
              <button className="border border-white text-white px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
                Xem bộ sưu tập
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-2 block">Danh mục</span>
              <h2 className="text-4xl font-serif">Khám phá theo dòng sản phẩm</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={onShopNow}
              >
                <div className="aspect-square overflow-hidden bg-gray-100 mb-4 rounded-full">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-center text-xs uppercase tracking-widest font-bold group-hover:underline">{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-brand-beige/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-2 block">Sản phẩm nổi bật</span>
            <h2 className="text-4xl font-serif">Xu hướng mùa này</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetail={onViewProduct} 
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={onShopNow}
              className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest font-bold border-b-2 border-brand-dark pb-1 hover:opacity-70 transition-opacity"
            >
              <span>Xem tất cả sản phẩm</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Lookbook Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000" 
                alt="Lookbook"
                className="w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-beige hidden md:block -z-10"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gray mb-4 block">Lookbook 2026</span>
            <h2 className="text-5xl font-serif mb-8 leading-tight italic">Sự tối giản <br /> là đỉnh cao của sự tinh tế</h2>
            <p className="text-brand-gray mb-10 leading-relaxed">
              Bộ sưu tập "Minimalist Soul" mang đến những thiết kế tinh giản, tập trung vào chất liệu và form dáng. 
              Mỗi sản phẩm là một lời khẳng định về phong cách sống hiện đại, không phô trương nhưng đầy cuốn hút.
            </p>
            <button className="bg-brand-dark text-white px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand-dark/90 transition-colors">
              Khám phá bộ sưu tập
            </button>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="text-center">
            <Truck className="w-8 h-8 mx-auto mb-4 text-brand-gray" />
            <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Giao hàng toàn quốc</h4>
            <p className="text-[10px] text-brand-gray">Miễn phí cho đơn từ 1.000.000đ</p>
          </div>
          <div className="text-center">
            <RefreshCcw className="w-8 h-8 mx-auto mb-4 text-brand-gray" />
            <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Đổi trả linh hoạt</h4>
            <p className="text-[10px] text-brand-gray">Trong vòng 7 ngày kể từ khi nhận</p>
          </div>
          <div className="text-center">
            <ShieldCheck className="w-8 h-8 mx-auto mb-4 text-brand-gray" />
            <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Chất liệu cao cấp</h4>
            <p className="text-[10px] text-brand-gray">Cam kết chất lượng tốt nhất</p>
          </div>
          <div className="text-center">
            <Headphones className="w-8 h-8 mx-auto mb-4 text-brand-gray" />
            <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Hỗ trợ 24/7</h4>
            <p className="text-[10px] text-brand-gray">Luôn sẵn sàng giải đáp thắc mắc</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-beige/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif">Khách hàng nói gì về LUMINA</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Minh Anh", text: "Chất vải lụa của Lumina thực sự rất tuyệt, mặc vào cảm giác rất sang và nhẹ nhàng.", rating: 5 },
              { name: "Hoàng Nam", text: "Form dáng quần tây rất chuẩn, mình mặc đi làm ai cũng khen. Sẽ ủng hộ shop dài dài.", rating: 5 },
              { name: "Thanh Hằng", text: "Giao hàng nhanh, đóng gói cực kỳ chuyên nghiệp và cao cấp. Rất hài lòng!", rating: 4 }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-dark text-brand-dark" />
                  ))}
                </div>
                <p className="text-sm italic text-brand-gray mb-6 leading-relaxed">"{item.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center text-xs font-bold">
                    {item.name[0]}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
            alt="CTA Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 italic">Đừng bỏ lỡ ưu đãi lớn nhất năm</h2>
          <p className="text-lg mb-10 opacity-80">Giảm đến 30% cho tất cả sản phẩm trong bộ sưu tập mới nhất.</p>
          <button 
            onClick={onShopNow}
            className="bg-white text-brand-dark px-12 py-5 text-sm uppercase tracking-widest font-bold hover:bg-brand-beige transition-colors"
          >
            Mua ngay
          </button>
        </div>
      </section>
    </div>
  );
};

const ShopView = ({ 
  onViewProduct 
}: { 
  onViewProduct: (p: Product) => void;
}) => {
  const [filter, setFilter] = useState('Tất cả');
  const [sort, setSort] = useState('newest');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (filter !== 'Tất cả') {
      result = result.filter(p => p.category === filter || p.gender === filter);
    }
    
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [filter, sort]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-5xl font-serif mb-4">Sản phẩm</h1>
        <p className="text-brand-gray">Khám phá phong cách của riêng bạn qua những thiết kế tinh tế nhất.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-10">
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Bộ lọc
            </h4>
            <div className="space-y-3">
              {['Tất cả', 'Nam', 'Nữ', 'Áo', 'Quần', 'Váy'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`block text-sm transition-colors hover:text-brand-dark ${
                    filter === item ? 'text-brand-dark font-bold' : 'text-brand-gray'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Sắp xếp</h4>
            <select 
              className="w-full bg-transparent border-b border-gray-200 py-2 text-sm outline-none"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetail={onViewProduct} 
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-brand-gray">
              Không tìm thấy sản phẩm nào phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductDetailView = ({ 
  product, 
  onAddToCart,
  onViewProduct
}: { 
  product: Product; 
  onAddToCart: (p: Product, size: string, color: string, qty: number) => void;
  onViewProduct: (p: Product) => void;
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-16 mb-24">
        {/* Images */}
        <div className="w-full md:w-1/2 grid grid-cols-1 gap-4">
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="aspect-square bg-gray-100">
                <img src={product.image} alt="" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
             </div>
             <div className="aspect-square bg-gray-100">
                <img src={product.image} alt="" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
             </div>
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-gray mb-2 block">{product.category}</span>
            <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-2xl font-bold">{product.price.toLocaleString('vi-VN')}đ</span>
              {product.originalPrice && (
                <span className="text-lg text-brand-gray line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
            <p className="text-brand-gray leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          <div className="space-y-8 mb-10">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Màu sắc: {selectedColor}</h4>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      selectedColor === color ? 'border-brand-dark scale-110' : 'border-gray-200'
                    }`}
                    title={color}
                  >
                    <div className={`w-6 h-6 rounded-full bg-gray-200`} style={{ backgroundColor: color === 'Đen' ? '#000' : color === 'Trắng' ? '#fff' : '#d1d5db' }}></div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Kích cỡ: {selectedSize}</h4>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[50px] h-10 border text-xs font-bold transition-all ${
                      selectedSize === size ? 'bg-brand-dark text-white border-brand-dark' : 'border-gray-200 text-brand-dark hover:border-brand-dark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Số lượng</h4>
              <div className="flex items-center border border-gray-200 w-32 h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 flex justify-center items-center hover:bg-gray-50"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="flex-1 text-center text-sm font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 flex justify-center items-center hover:bg-gray-50"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className={`flex-1 h-14 uppercase tracking-widest font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
                isAdded ? 'bg-green-600 text-white' : 'bg-brand-dark text-white hover:bg-brand-dark/90'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã thêm vào giỏ</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm vào giỏ hàng</span>
                </>
              )}
            </button>
            <button className="flex-1 h-14 border border-brand-dark uppercase tracking-widest font-bold text-sm hover:bg-brand-dark hover:text-white transition-all">
              Mua ngay
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-100 space-y-4">
            <div className="flex items-center text-xs text-brand-gray">
              <Truck className="w-4 h-4 mr-3" />
              <span>Giao hàng miễn phí cho đơn hàng trên 1.000.000đ</span>
            </div>
            <div className="flex items-center text-xs text-brand-gray">
              <RefreshCcw className="w-4 h-4 mr-3" />
              <span>Đổi trả miễn phí trong vòng 7 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-3xl font-serif mb-12">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} onViewDetail={onViewProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CartView = ({ 
  items, 
  onUpdateQty, 
  onRemove, 
  onCheckout,
  onContinueShopping
}: { 
  items: CartItem[]; 
  onUpdateQty: (id: number, size: string, color: string, delta: number) => void;
  onRemove: (id: number, size: string, color: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000000 ? 0 : 30000;

  if (items.length === 0) {
    return (
      <div className="pt-48 pb-48 text-center max-w-7xl mx-auto px-4">
        <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-200" />
        <h1 className="text-3xl font-serif mb-4">Giỏ hàng trống</h1>
        <p className="text-brand-gray mb-10">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
        <button 
          onClick={onContinueShopping}
          className="bg-brand-dark text-white px-10 py-4 text-sm uppercase tracking-widest font-bold"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 animate-in fade-in duration-500">
      <h1 className="text-4xl font-serif mb-12">Giỏ hàng của bạn</h1>
      
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <div className="hidden md:grid grid-cols-6 gap-4 pb-6 border-b border-gray-100 text-[10px] uppercase tracking-widest font-bold text-brand-gray">
            <div className="col-span-3">Sản phẩm</div>
            <div className="text-center">Số lượng</div>
            <div className="text-right">Giá</div>
            <div className="text-right">Tổng</div>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-8 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <div className="col-span-1 md:col-span-3 flex items-center space-x-6">
                  <div className="w-24 aspect-[3/4] bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1">{item.name}</h3>
                    <p className="text-xs text-brand-gray mb-2">Size: {item.selectedSize} | Màu: {item.selectedColor}</p>
                    <button 
                      onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)}
                      className="text-[10px] uppercase tracking-widest text-red-500 font-bold hover:underline flex items-center"
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Xóa
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="flex items-center border border-gray-200 w-24 h-10">
                    <button 
                      onClick={() => onUpdateQty(item.id, item.selectedSize, item.selectedColor, -1)}
                      className="flex-1 flex justify-center items-center hover:bg-gray-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="flex-1 text-center text-xs font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(item.id, item.selectedSize, item.selectedColor, 1)}
                      className="flex-1 flex justify-center items-center hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right hidden md:block text-sm">
                  {item.price.toLocaleString('vi-VN')}đ
                </div>

                <div className="text-right font-bold text-sm">
                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-brand-beige/30 p-8">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-8 border-b border-gray-200 pb-4">Tóm tắt đơn hàng</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Tạm tính</span>
                <span>{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Phí vận chuyển</span>
                <span>{shipping === 0 ? 'Miễn phí' : shipping.toLocaleString('vi-VN') + 'đ'}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                <span>Tổng cộng</span>
                <span className="text-xl">{(subtotal + shipping).toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-brand-dark text-white py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand-dark/90 transition-all mb-4"
            >
              Thanh toán ngay
            </button>
            <button 
              onClick={onContinueShopping}
              className="w-full border border-brand-dark text-brand-dark py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand-dark hover:text-white transition-all"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutView = ({ 
  cartItems, 
  onComplete 
}: { 
  cartItems: CartItem[]; 
  onComplete: () => void;
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000000 ? 0 : 30000;

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <h1 className="text-3xl font-serif mb-10">Thông tin thanh toán</h1>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gray">Họ và tên</label>
                <input type="text" required className="w-full border border-gray-200 p-3 outline-none focus:border-brand-dark" placeholder="Nguyễn Văn A" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gray">Số điện thoại</label>
                <input type="tel" required className="w-full border border-gray-200 p-3 outline-none focus:border-brand-dark" placeholder="0901234567" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gray">Địa chỉ nhận hàng</label>
              <input type="text" required className="w-full border border-gray-200 p-3 outline-none focus:border-brand-dark" placeholder="Số nhà, tên đường, phường/xã..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gray">Tỉnh/Thành phố</label>
                <select className="w-full border border-gray-200 p-3 outline-none focus:border-brand-dark bg-white">
                  <option>Hà Nội</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gray">Quận/Huyện</label>
                <input type="text" required className="w-full border border-gray-200 p-3 outline-none focus:border-brand-dark" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gray">Phường/Xã</label>
                <input type="text" required className="w-full border border-gray-200 p-3 outline-none focus:border-brand-dark" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gray">Ghi chú đơn hàng</label>
              <textarea className="w-full border border-gray-200 p-3 outline-none focus:border-brand-dark h-32" placeholder="Lưu ý cho người giao hàng..."></textarea>
            </div>

            <div className="pt-8">
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6">Phương thức thanh toán</h3>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" defaultChecked className="mr-4 accent-brand-dark" />
                  <span className="text-sm">Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="mr-4 accent-brand-dark" />
                  <span className="text-sm">Chuyển khoản ngân hàng</span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="payment" className="mr-4 accent-brand-dark" />
                  <span className="text-sm">Ví điện tử (Momo/ZaloPay)</span>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-dark text-white py-5 text-sm uppercase tracking-widest font-bold hover:bg-brand-dark/90 transition-all mt-10"
            >
              Xác nhận đặt hàng
            </button>
          </form>
        </div>

        <div className="w-full lg:w-96">
          <div className="bg-brand-beige/30 p-8 sticky top-32">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-8 border-b border-gray-200 pb-4">Đơn hàng của bạn</h3>
            <div className="max-h-96 overflow-y-auto scrollbar-hide mb-8 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4">
                  <div className="w-16 aspect-[3/4] bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold mb-1">{item.name}</h4>
                    <p className="text-[10px] text-brand-gray">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                    <p className="text-xs font-bold mt-1">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Tạm tính</span>
                <span>{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray">Phí vận chuyển</span>
                <span>{shipping === 0 ? 'Miễn phí' : shipping.toLocaleString('vi-VN') + 'đ'}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                <span>Tổng cộng</span>
                <span className="text-xl">{(subtotal + shipping).toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProduct]);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  const handleAddToCart = (product: Product, size: string, color: string, qty: number) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size && item.selectedColor === color)
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
  };

  const updateCartQty = (id: number, size: string, color: string, delta: number) => {
    setCart(prev => prev.map(item => 
      (item.id === id && item.selectedSize === size && item.selectedColor === color)
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.selectedSize === size && item.selectedColor === color)
    ));
  };

  const handleOrderComplete = () => {
    setCart([]);
    setShowSuccessPopup(true);
    setView('home');
    setTimeout(() => setShowSuccessPopup(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        setView={setView}
        currentView={view}
      />

      <main className="flex-grow">
        {view === 'home' && (
          <HomeView 
            onShopNow={() => setView('shop')} 
            onViewProduct={handleViewProduct} 
          />
        )}
        {view === 'shop' && (
          <ShopView 
            onViewProduct={handleViewProduct} 
          />
        )}
        {view === 'product-detail' && selectedProduct && (
          <ProductDetailView 
            product={selectedProduct} 
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
          />
        )}
        {view === 'cart' && (
          <CartView 
            items={cart} 
            onUpdateQty={updateCartQty} 
            onRemove={removeFromCart}
            onCheckout={() => setView('checkout')}
            onContinueShopping={() => setView('shop')}
          />
        )}
        {view === 'checkout' && (
          <CheckoutView 
            cartItems={cart} 
            onComplete={handleOrderComplete} 
          />
        )}
      </main>

      <Footer />

      {/* Order Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 right-8 z-[100] bg-brand-dark text-white p-6 shadow-2xl max-w-sm border-l-4 border-green-500"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1 uppercase tracking-widest">Đặt hàng thành công!</h4>
                <p className="text-xs text-brand-gray leading-relaxed">
                  Cảm ơn bạn đã tin tưởng LUMINA. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
                </p>
              </div>
              <button onClick={() => setShowSuccessPopup(false)}>
                <X className="w-4 h-4 opacity-50 hover:opacity-100" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-8 left-8 z-40 flex flex-col space-y-4">
        <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Facebook className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-bold text-xs">
          Zalo
        </button>
      </div>
    </div>
  );
}
