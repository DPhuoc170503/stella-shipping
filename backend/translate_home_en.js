require('dotenv').config();
const pool = require('./db');

const homePageEn = {
  hero: {
    eyebrow: "RELIABLE LOGISTICS PARTNER",
    title_line1: "Safe, ",
    title_hl1: "fast",
    title_line2: "\nand ",
    title_hl2: "comprehensive",
    title_line3: "\nshipping for your business",
    lead: "Connecting 120+ countries — cost-optimized ocean, air, road freight, and warehousing solutions for your supply chain. Guaranteed 98% on-time delivery."
  },
  services: [
    { img: '/Shippinglines.jpg', badge: 'SHIPPING', title: 'Ocean Freight (FCL & LCL)', desc: 'Global container booking, negotiating competitive rates with 50+ top carriers. Support for dangerous goods, oversized, reefer, and project cargo.', link: '/services/shipping-lines' },
    { img: '/AirFreight.jpg', badge: 'AIR FREIGHT', title: 'Air Freight', desc: 'Air freight solutions for urgent and high-value cargo. Connecting 80+ international airports with the fastest transit times in the market.', link: '/services/scheduled-flights' },
    { img: '/INTERMODA.jpg', badge: 'INTERMODAL', title: 'Intermodal Transport', desc: 'Flexible combination of sea, road, rail, and air. Optimizing cost and time for each specific transport route.', link: '/services/intermodal' },
    { img: '/Logictis.jpg', badge: 'LOGISTICS', title: 'Warehousing & Distribution', desc: '15,000m² warehouse system with modern WMS. Cross-docking, pick-pack, inventory management, and last-mile delivery services.', link: '/services/logistics' },
    { img: '/OURRANGE.jpg', badge: 'CUSTOMS', title: 'Customs Clearance', desc: 'Team of experienced customs specialists. Consulting on HS codes, C/O, handling import/export documents. 24-hour clearance commitment.', link: '/services/dedicated' },
    { img: '/Chacracter.jpg', badge: 'CONSULTING', title: 'Supply Chain Consulting', desc: 'Analyzing and optimizing the entire supply chain: routes, costs, risks. Designing customized SCM solutions for each industry.', link: '/services/charters' }
  ],
  why_choose_us: [
    { icon: '🌐', title: 'Global Network', desc: 'Agent partners in 120+ countries. Seamless connection from export port to final delivery warehouse.' },
    { icon: '💰', title: 'Cost Optimization', desc: 'Long-term contracts with shipping lines & airlines. Guaranteeing the most competitive rates in the market.' },
    { icon: '📊', title: 'Modern Technology', desc: 'Online customer portal, real-time tracking, ERP integration API. Manage shipments anytime, anywhere.' },
    { icon: '⏰', title: 'Fast 2H Response', desc: 'Specialist team responds within 2 business hours. Dedicated Account Manager for each client.' },
    { icon: '🛡️', title: 'Safety & Insurance', desc: 'End-to-end cargo insurance. International standard packaging, handling, and transport processes.' },
    { icon: '📋', title: 'International Certifications', desc: 'ISO 9001, ISO 14001, AEO, FIATA, IATA. Ensuring service quality at the highest standards.' },
    { icon: '🌱', title: 'Green Logistics', desc: 'Net-Zero 2035 commitment. Prioritizing eco-friendly transport and optimizing carbon footprint.' },
    { icon: '🤝', title: 'Long-term Partnership', desc: 'Strategic SCM consulting, not just order processing. Building partnerships instead of short-term transactions.' }
  ],
  process: [
    { num: '01', title: 'Request a Quote', desc: 'Send shipment details via form, email, or hotline. Receive a detailed quote in 2 hours.' },
    { num: '02', title: 'Confirm & Booking', desc: 'Finalize transport plan, confirm schedule, and book vessel/flight slot.' },
    { num: '03', title: 'Transport & Tracking', desc: 'Shipment is handled professionally. Track real-time via customer portal.' },
    { num: '04', title: 'Delivery & Reporting', desc: 'Receive goods on time. Detailed reporting on costs, time, and performance.' }
  ]
};

async function run() {
  try {
    const val = JSON.stringify(homePageEn);
    await pool.query("UPDATE settings SET setting_value = ? WHERE setting_key = 'home_page_en'", [val]);
    console.log("Successfully updated home_page_en in the database.");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

run();
