const API_URL = 'test';
const resolveImg = (src) => {
    if (!src) return '/Banner.jpg'
    if (src.includes('http') && src.lastIndexOf('http') > 0) {
      src = src.substring(src.lastIndexOf('http'))
    }
    if (src.startsWith('http')) return src
    if (src.startsWith('/uploads/')) return `${API_URL}${src}`
    return src
};
const arr = [
  'https://stella-shipping.onrender.comhttps://res.cloudinary.com/w9ccok5g/image/upload/v1791168758/stella_shipping/eimzwcerhb9wy1myzrys.jpg',
  'https://stella-shipping.onrender.comhttps://res.cloudinary.com/w9ccok5g/image/upload/v1791168751/stella_shipping/egiycqbh4fws4iidejx7.jpg',
  'https://stella-shipping.onrender.comhttps://res.cloudinary.com/w9ccok5g/image/upload/v1791168751/stella_shipping/egiycqbh4fws4iidejx7.jpg'
];
console.log(arr.map(resolveImg));
