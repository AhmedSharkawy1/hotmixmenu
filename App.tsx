
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import { MENU_DATA, ADDITIONS_DATA } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // الوضع الافتراضي ليلي
  });
  
  const navRef = useRef<HTMLDivElement>(null);
  const isScrollingToRef = useRef<boolean>(false);
  const [showBottomCallMenu, setShowBottomCallMenu] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const STICKY_OFFSET = 80;

  const triggerHaptic = (pattern: number | number[] = 10) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
    const root = document.documentElement;
    const body = document.body;
    
    if (isDark) {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const checkScroll = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      const isAtStart = Math.abs(scrollLeft) < 5;
      const isAtEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 5;
      
      setCanScrollRight(!isAtStart);
      setCanScrollLeft(!isAtEnd);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${STICKY_OFFSET}px 0px -40% 0px`,
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingToRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newId = entry.target.id;
          updateActiveTab(newId);
        }
      });
    };

    const updateActiveTab = (id: string) => {
      setActiveSection(id);
      if (navRef.current) {
        const navItem = navRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement;
        if (navItem) {
          const container = navRef.current;
          const scrollTarget = navItem.offsetLeft - (container.offsetWidth / 2) + (navItem.offsetWidth / 2);
          container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    MENU_DATA.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    const addEl = document.getElementById('additions');
    if (addEl) observer.observe(addEl);

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    if (e) e.preventDefault();
    triggerHaptic(15);
    const target = document.getElementById(id);
    if (target) {
      isScrollingToRef.current = true;
      setActiveSection(id);
      
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - STICKY_OFFSET + 5;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (navRef.current) {
        const navItem = navRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement;
        if (navItem) {
          const container = navRef.current;
          const scrollTarget = navItem.offsetLeft - (container.offsetWidth / 2) + (navItem.offsetWidth / 2);
          container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
        }
      }

      setTimeout(() => {
        isScrollingToRef.current = false;
      }, 1000);
    }
  };

  const scrollByAmount = (amount: number) => {
    triggerHaptic(5);
    if (navRef.current) {
      navRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl || 'https://hotmix.com')}&bgcolor=ffffff&color=ff5f00`;

  const whatsappMsg = encodeURIComponent("مرحباً مطعم هوت ميكس، أود الطلب من القائمة الرقمية.");
  const phoneNumbers = [
    { label: "اتصالات", number: "01126770105", color: "#009739" },
    { label: "فودافون", number: "01094280173", color: "#e60000" },
    { label: "أورانج", number: "01220691771", color: "#ff7900" }
  ];

  const mapsLink = "https://www.google.com/maps/search/مطعم+هوت+ميكس+البدرشين+خلف+المركز+بجوار+الإدارة+التعليمية";

  return (
    <div className="min-h-screen transition-colors duration-500 bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-zinc-200 antialiased selection:bg-orange-500/30">
      <Header 
        isDark={isDark} 
        onToggleTheme={() => {
          triggerHaptic([10, 40, 10]);
          setIsDark(!isDark);
        }} 
        onAction={() => triggerHaptic(10)}
      />
      
      <nav 
        className="sticky top-0 z-40 bg-zinc-50/95 dark:bg-[#050505]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 py-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300"
        aria-label="تصنيفات الطعام"
      >
        <div className="relative max-w-2xl mx-auto px-10">
          <button 
            onClick={() => scrollByAmount(150)}
            className={`absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-full shadow-md transition-all duration-300 ${canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}
            aria-label="تمرير لليمين"
          >
            <span className="text-orange-500 font-bold">❮</span>
          </button>

          <button 
            onClick={() => scrollByAmount(-150)}
            className={`absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-full shadow-md transition-all duration-300 ${canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`}
            aria-label="تمرير لليسار"
          >
            <span className="text-orange-500 font-bold">❯</span>
          </button>

          <div className="absolute inset-y-0 right-10 w-8 bg-gradient-to-l from-zinc-50 dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 left-10 w-8 bg-gradient-to-r from-zinc-50 dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>
          
          <div 
            ref={navRef}
            onScroll={checkScroll}
            className="flex gap-3 overflow-x-auto no-scrollbar px-2 py-1 scroll-smooth"
            role="tablist"
          >
            {MENU_DATA.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                data-id={section.id}
                onClick={(e) => handleNavClick(e, section.id)}
                role="tab"
                aria-selected={activeSection === section.id}
                aria-controls={section.id}
                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-[13px] font-black border transition-all duration-500 flex items-center gap-2 outline-none transform active:scale-95 ${
                  activeSection === section.id 
                  ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/30 scale-105' 
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:border-orange-200 dark:hover:border-orange-500/30'
                }`}
              >
                <span className="text-lg" aria-hidden="true">{section.emoji}</span>
                <span>{section.title}</span>
              </a>
            ))}
            <a
              href="#additions"
              data-id="additions"
              onClick={(e) => handleNavClick(e, 'additions')}
              role="tab"
              aria-selected={activeSection === 'additions'}
              aria-controls="additions"
              className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-[13px] font-black border transition-all duration-500 flex items-center gap-2 outline-none transform active:scale-95 ${
                activeSection === 'additions' 
                ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/30 scale-105' 
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <span className="text-lg" aria-hidden="true">➕</span>
              <span>الإضافات</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-5 py-8 pb-48">
        <div className="mb-12 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-8 relative overflow-hidden shadow-sm dark:shadow-2xl">
          <div className="relative z-10 text-right">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></span>
              <span className="text-green-600 dark:text-green-500 text-[10px] font-black uppercase tracking-widest">مفتوح الآن</span>
            </div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 leading-tight">هوت ميكس البدرشين</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed max-w-[200px] font-medium opacity-80">
              أفضل مكونات طازجة وجودة لا تضاهى في قلب البدرشين.
            </p>
          </div>
          <div className="absolute -left-6 -bottom-6 text-[140px] opacity-[0.03] dark:opacity-10 grayscale select-none pointer-events-none">🔥</div>
        </div>

        {MENU_DATA.map((section, idx) => (
          <MenuSection key={section.id} section={section} isFirst={idx === 0} onInteraction={() => triggerHaptic(5)} />
        ))}

        <section id="additions" className="scroll-mt-[100px] mb-10 reveal-item text-right">
          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-5 shadow-2xl border-2 border-orange-500/30 bg-zinc-200 dark:bg-zinc-900">
            <img src={ADDITIONS_DATA.image} alt="" className="w-full h-full object-cover brightness-95" />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/60 dark:from-zinc-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 right-6 text-right">
              <span className="text-white font-black text-[10px] tracking-widest uppercase bg-orange-600/80 px-2 py-0.5 rounded-md mb-1 inline-block">التخصيص</span>
              <h2 className="text-3xl font-black text-white leading-none">إضافات وتجهيزات ✨</h2>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-zinc-900/90 dark:to-zinc-800/90 rounded-[2.5rem] p-6 border-2 border-orange-500 shadow-xl">
            <div className="grid grid-cols-1 gap-4 mb-8">
              {ADDITIONS_DATA.general.map((add, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white dark:bg-zinc-950 p-5 rounded-2xl border-2 border-orange-200 dark:border-white/10 shadow-md">
                  <span className="font-black text-zinc-900 dark:text-zinc-100 text-base">{add.name}</span>
                  <div className="bg-orange-600 px-5 py-2.5 rounded-xl border border-white/20 shadow-lg">
                    <span className="text-white font-black text-xl leading-none tabular-nums">{add.price} ج</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-[2.25rem] p-8 shadow-2xl border-2 border-white/20">
              <h4 className="text-2xl font-black text-white mb-6 flex items-center gap-3">🍖 إضافة بروتين</h4>
              <div className="flex flex-wrap gap-3 mb-10">
                {ADDITIONS_DATA.protein.items.map((item, idx) => (
                  <span key={idx} className="bg-white/20 text-white text-[12px] font-black px-5 py-2.5 rounded-2xl border border-white/30 backdrop-blur-md">{item}</span>
                ))}
              </div>
              <div className="flex justify-between items-center pt-8 border-t border-white/30">
                 <span className="text-white font-black">سعر الإضافة</span>
                 <div className="bg-white px-6 py-3 rounded-[1.5rem] shadow-2xl">
                   <span className="text-4xl font-black text-orange-600 tabular-nums">{ADDITIONS_DATA.protein.price} ج</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section with dynamic QR Code */}
        <footer className="mt-24 pb-12">
          <div className="max-w-md mx-auto flex flex-col items-center gap-8">
            
            {/* QR CODE DISPLAY CARD */}
            <div className="w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-orange-500/20 p-8 shadow-2xl flex flex-col items-center gap-6 reveal-item">
               <div className="text-center">
                 <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-1">شارك المنيو 📱</h3>
                 <p className="text-zinc-500 text-xs font-bold">امسح الكود لفتح القائمة على جوالك</p>
               </div>
               
               <div className="relative p-4 bg-white rounded-3xl shadow-inner border-8 border-zinc-50 dark:border-zinc-800">
                  <img 
                    src={qrUrl} 
                    alt="QR Code" 
                    className="w-48 h-48 block"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border-2 border-orange-500">
                      <span className="text-xl">🔥</span>
                    </div>
                  </div>
               </div>
               
               <a 
                href={qrUrl} 
                download="hotmix-qr.png"
                target="_blank"
                className="text-orange-600 dark:text-orange-500 font-black text-sm hover:underline"
               >
                 عرض الرمز بحجم كبير للطباعة
               </a>
            </div>

            <a 
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerHaptic(15)}
              className="w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 p-8 shadow-xl relative overflow-hidden group active:scale-[0.98] transition-transform block"
            >
              <div className="flex flex-col gap-6 relative z-10 text-right">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-orange-100 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center text-2xl border border-orange-200/50 group-hover:bg-orange-500 group-hover:text-white transition-colors">📍</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-orange-600 dark:text-orange-500 tracking-widest uppercase">اضغط لفتح الخريطة</span>
                    <p className="text-zinc-800 dark:text-zinc-100 text-[14px] font-black leading-snug">البدرشين - خلف المركز - بجوار الإدارة التعليمية</p>
                  </div>
                </div>
                <div className="w-full h-px bg-zinc-100 dark:bg-white/5"></div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-2xl border border-zinc-200/50">📞</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">للتواصل المباشر</span>
                    <span className="text-zinc-900 dark:text-white text-lg font-black tabular-nums tracking-widest">01126770105</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/[0.03] transition-colors pointer-events-none"></div>
            </a>
            
            <p className="text-zinc-500 dark:text-zinc-600 text-[11px] font-bold leading-relaxed text-center">
              تصميم وتنفيذ مهندس / احمد النقيب<br/>
              للتواصل <span className="tabular-nums font-black text-zinc-900 dark:text-zinc-400">01092621367</span>
            </p>
          </div>
        </footer>
      </main>

      {/* Bottom Floating Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-[calc(var(--safe-bottom)+1.25rem)] pt-2 md:hidden">
        <div className="max-w-xl mx-auto glass border border-zinc-200 dark:border-white/10 rounded-[2.5rem] p-2 flex items-center justify-around shadow-2xl relative">
          {showBottomCallMenu && (
            <>
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[59]" onClick={() => setShowBottomCallMenu(false)}></div>
              <div className="absolute bottom-[calc(100%+1.25rem)] left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden animate-slide-up z-[60] mx-2">
                <div className="px-4 py-2 bg-zinc-50 dark:bg-white/5 border-b border-zinc-100 dark:border-white/5 text-right">
                  <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">اختر الشبكة</span>
                </div>
                {phoneNumbers.map((phone, idx) => (
                  <a key={idx} href={`tel:${phone.number}`} onClick={() => setShowBottomCallMenu(false)} className="flex items-center justify-between px-4 py-3 border-b last:border-0 border-zinc-100 dark:border-white/5 transition-colors active:bg-orange-50 dark:active:bg-orange-500/10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full shadow-sm shrink-0" style={{ backgroundColor: phone.color }}></div>
                      <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{phone.label}</span>
                    </div>
                    <span className="text-[13px] font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter whitespace-nowrap">{phone.number}</span>
                  </a>
                ))}
              </div>
            </>
          )}
          <a href={`https://wa.me/201126770105?text=${whatsappMsg}`} className="flex-1 flex flex-col items-center py-2 gap-1 text-zinc-500 dark:text-zinc-400"><span className="text-2xl">💬</span><span className="text-[10px] font-black">واتساب</span></a>
          <button onClick={() => setShowBottomCallMenu(!showBottomCallMenu)} className={`flex-1 flex flex-col items-center py-2 gap-1 ${showBottomCallMenu ? 'text-orange-500' : 'text-zinc-500 dark:text-zinc-400'}`}><span className="text-2xl">📞</span><span className="text-[10px] font-black">اتصال</span></button>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="bg-orange-600 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl -mt-8 border-4 border-zinc-50 dark:border-[#050505] active:scale-90 transition-all z-10"><span className="text-xl">🔝</span></button>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center py-2 gap-1 text-zinc-500 dark:text-zinc-400"><span className="text-2xl">📍</span><span className="text-[10px] font-black">الموقع</span></a>
          <button onClick={(e) => handleNavClick(e, MENU_DATA[0].id)} className="flex-1 flex flex-col items-center py-2 gap-1 text-zinc-500 dark:text-zinc-400"><span className="text-2xl">📋</span><span className="text-[10px] font-black">المنيو</span></button>
        </div>
      </nav>
    </div>
  );
};

export default App;
