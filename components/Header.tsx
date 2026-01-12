
import React, { useState } from 'react';

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
  onAction?: () => void;
}

const Header: React.FC<Props> = ({ isDark, onToggleTheme, onAction }) => {
  const [showCallMenu, setShowCallMenu] = useState(false);
  const phoneNumbers = [
    { label: "اتصالات", number: "01126770105", color: "#009739" },
    { label: "فودافون", number: "01094280173", color: "#e60000" },
    { label: "أورانج", number: "01220691771", color: "#ff7900" }
  ];

  const handleCallClick = () => {
    onAction?.();
    setShowCallMenu(!showCallMenu);
  };

  return (
    <header className="relative z-50 bg-white dark:bg-[#050505] border-b border-zinc-200 dark:border-white/10 pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-2xl mx-auto px-5 py-4 md:py-6">
        <div className="flex items-center justify-between mb-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={onAction}>
            <span className="text-2xl animate-pulse" aria-hidden="true">🔥</span>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                هوت ميكس
              </h1>
              <span className="text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">البدرشين</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
            className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl transition-all active:scale-90 border border-zinc-200 dark:border-white/10 shadow-sm"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full gap-3 relative">
          <div className="flex-1 relative">
            <button
              onClick={handleCallClick}
              className={`w-full font-black py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.96] shadow-xl text-[13px] border ${showCallMenu ? 'bg-orange-600 text-white border-orange-500' : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-transparent dark:border-zinc-200'}`}
            >
              <span className="text-lg" aria-hidden="true">📞</span>
              <span>اتصل بنا</span>
            </button>
            
            {/* Call Dropdown Menu */}
            {showCallMenu && (
              <>
                <div 
                  className="fixed inset-0 z-[-1] bg-black/20 backdrop-blur-[4px]" 
                  onClick={() => {
                    onAction?.();
                    setShowCallMenu(false);
                  }}
                ></div>
                <div className="absolute top-full mt-3 left-0 right-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[1.25rem] shadow-2xl overflow-hidden animate-slide-up z-50">
                  <div className="px-3 py-1.5 bg-zinc-50 dark:bg-white/5 border-b border-zinc-100 dark:border-white/5">
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">اختر الشبكة</span>
                  </div>
                  {phoneNumbers.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.number}`}
                      onClick={() => setShowCallMenu(false)}
                      className="flex items-center justify-between px-3 py-2.5 hover:bg-orange-50 dark:hover:bg-orange-500/5 border-b last:border-0 border-zinc-100 dark:border-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-1.5">
                        <div 
                          className="w-1.5 h-1.5 rounded-full shadow-sm shrink-0" 
                          style={{ backgroundColor: phone.color }}
                        ></div>
                        <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 whitespace-nowrap">{phone.label}</span>
                      </div>
                      <span className="text-[13px] font-black text-zinc-900 dark:text-white tabular-nums tracking-tighter whitespace-nowrap">{phone.number}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          <a
            href="https://wa.me/201126770105"
            onClick={onAction}
            aria-label="تواصل معنا عبر واتساب"
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.96] shadow-xl shadow-orange-600/30 text-[13px] border border-orange-400/20"
          >
            <span className="text-lg" aria-hidden="true">💬</span>
            <span>واتساب</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
