
import { MenuSection } from './types';

export const MENU_DATA: MenuSection[] = [
  {
    id: 'pizza',
    title: 'قسم البيتزا',
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=60&w=800&auto=format&fit=crop&fm=webp',
    subtitles: ['وسط', 'كبير'],
    items: [
      { name: 'تشيكن رانش', prices: ['130', '150'], isPopular: true },
      { name: 'تشيكن هالبينو صوص الشيف', prices: ['115', '130'], isSpicy: true },
      { name: 'تشيكن باربكيو', prices: ['105', '120'] },
      { name: 'شاورما فراخ', prices: ['105', '120'] },
      { name: 'شيش طاووق', prices: ['105', '120'] },
      { name: 'ميكس فراخ', prices: ['115', '130'], isPopular: true },
      { name: 'زنجر سوبرم', prices: ['110', '125'], isSpicy: true },
      { name: 'مارجريتا', prices: ['90', '105'] },
      { name: 'ميكس لحوم', prices: ['115', '130'] },
      { name: 'سوبر هوت', prices: ['160', '175'], isSpicy: true },
      { name: 'جمبري بانيه', prices: ['155', '170'] },
      { name: 'تونة', prices: ['175', '195'] },
      { name: 'ميكس جبنة', prices: ['90', '105'] },
    ]
  },
  {
    id: 'grill',
    title: 'قسم المشويات',
    emoji: '🍖',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=60&w=800&auto=format&fit=crop&fm=webp',
    items: [
      { 
        name: 'كفتة بلدي ممتازة', 
        prices: ['85', '170', '340'], 
        labels: ['ربع', 'نص', 'كيلو'],
        isPopular: true 
      },
      { 
        name: 'طرب ساخن على الفحم', 
        prices: ['95', '150', '300'],
        labels: ['ربع', 'نص', 'كيلو']
      },
      { name: 'فراخ شيش', prices: ['45'] },
      { name: 'رغيف حواوشي', prices: ['25'], isPopular: true },
      { name: 'وجبة مشوي كبيرة', prices: ['125'], isPopular: true },
    ]
  },
  {
    id: 'sandwiches',
    title: 'قسم السندوتشات',
    emoji: '🥪',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=60&w=800&auto=format&fit=crop&fm=webp',
    items: [
      { name: 'شاورما فراخ', prices: ['40', '45', '55'], labels: ['صغير', 'وسط', 'كبير'], isPopular: true },
      { name: 'تشيكن كرسبي', prices: ['35', '45'], labels: ['وسط', 'كبير'] },
      { name: 'زنجر سوبرم', prices: ['60'], labels: ['كبير'], isSpicy: true },
      { name: 'سوبر كرانشي', prices: ['45', '55'], labels: ['وسط', 'كبير'] },
      { name: 'كبدة إسكندراني', prices: ['75'] },
      { name: 'ميكس برجر', prices: ['50'], isPopular: true },
    ]
  },
  {
    id: 'crepes',
    title: 'قسم الكريب',
    emoji: '🌯',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?q=60&w=800&auto=format&fit=crop&fm=webp',
    items: [
      { name: 'فاهيتا فراخ', prices: ['90'] },
      { name: 'ميكس فراخ', prices: ['80'], isPopular: true },
      { name: 'كرسبي', prices: ['50'] },
      { name: 'كفتة فحم', prices: ['65'] },
      { name: 'F16', prices: ['100'], isSpicy: true },
      { name: 'ميكس جبنة', prices: ['45'] },
    ]
  }
];

export const ADDITIONS_DATA = {
  image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=60&w=800&auto=format&fit=crop&fm=webp',
  general: [
    { name: 'تونة', price: '25' },
    { name: 'جبنة', price: '20' },
    { name: 'بطاطس فرايز', price: '10' },
    { name: 'لتر بيبسي', price: '35' },
    { name: 'صوص رانش', price: '30' },
  ],
  protein: {
    price: '20',
    items: ['شاورما فراخ', 'كرسبي', 'بانيه', 'زنجر', 'كفتة لحم', 'جمبري بانيه']
  }
};
