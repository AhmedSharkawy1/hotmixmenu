
import React from 'react';
import { MenuSection as MenuSectionType } from '../types';

interface Props {
  section: MenuSectionType;
  isFirst?: boolean;
  onInteraction?: () => void;
}

const MenuSection: React.FC<Props> = ({ section, isFirst, onInteraction }) => {
  return (
    <section id={section.id} className="mb-10 scroll-mt-[195px]" aria-labelledby={`${section.id}-heading`}>
      {/* Visual Header */}
      <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-5 shadow-xl border border-zinc-200 dark:border-white/5 bg-zinc-200 dark:bg-zinc-900 reveal-item">
        <img
          src={section.image}
          alt=""
          className="w-full h-full object-cover"
          loading={isFirst ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={isFirst ? "high" : "auto"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-[#050505] via-transparent to-transparent opacity-90"></div>
        <div className="absolute bottom-6 right-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-orange-600 dark:text-orange-500 font-black text-[10px] tracking-widest uppercase opacity-80" aria-hidden="true">التصنيف</span>
            <div className="flex items-center gap-2">
              <h2 id={`${section.id}-heading`} className="text-3xl font-black text-zinc-900 dark:text-white leading-none">{section.title}</h2>
              <span className="text-2xl leading-none" aria-hidden="true">{section.emoji}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Container */}
      <div className="bg-white dark:bg-zinc-900/40 backdrop-blur-md rounded-[2rem] p-5 md:p-8 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-lg reveal-item">
        {section.subtitles && !section.items.some(item => item.labels) && (
          <div className="flex justify-end mb-6 border-b border-zinc-100 dark:border-white/5 pb-3">
             <div className="flex gap-10 pl-4" aria-hidden="true">
                {section.subtitles.map((sub, idx) => (
                    <span key={idx} className="text-zinc-400 dark:text-zinc-500 text-[10px] font-black tracking-tighter uppercase">{sub}</span>
                ))}
             </div>
          </div>
        )}
        
        <div className="divide-y divide-zinc-100 dark:divide-white/5" role="list">
          {section.items.map((item, idx) => {
            const itemDescription = `${item.name}. السعر: ${item.prices.join(' أو ')} جنيه مصري.${item.isPopular ? ' صنف مميز.' : ''}${item.isSpicy ? ' صنف حار.' : ''}`;
            
            return (
              <div 
                key={idx} 
                onClick={onInteraction}
                className="py-5 flex items-center justify-between gap-3 group transition-all duration-300 ease-out hover:bg-zinc-50 dark:hover:bg-white/[0.04] active:scale-[0.98] -mx-3 px-3 rounded-2xl border border-transparent hover:border-zinc-200 dark:hover:border-white/5"
                role="listitem"
                aria-label={itemDescription}
              >
                <div className="flex flex-col gap-1.5 max-w-[50%]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-zinc-800 dark:text-zinc-100 font-bold text-base leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      {item.isPopular && (
                        <span className="bg-orange-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md animate-popular group-hover:scale-110 transition-transform duration-300">
                          مميز
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="animate-spicy text-sm leading-none group-hover:scale-125 transition-transform duration-300">🌶️</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 md:gap-6 items-end shrink-0" aria-hidden="true">
                  {item.prices.map((price, pIdx) => (
                    <div key={pIdx} className="flex flex-col items-center gap-1">
                      {item.labels && item.labels[pIdx] && (
                        <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-tighter mb-0.5">
                          {item.labels[pIdx]}
                        </span>
                      )}
                      <div className="bg-zinc-100 dark:bg-zinc-800/60 group-hover:bg-white dark:group-hover:bg-zinc-700/80 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-white/5 group-hover:border-orange-500/30 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5">
                          <span className="text-orange-600 dark:text-orange-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 font-black text-lg leading-none">
                              {price}
                          </span>
                          <span className="text-[9px] text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 mr-0.5 font-black">ج</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
