-- Multi-language (English) migration script
-- Add _en columns to navigation table
ALTER TABLE navigation 
ADD COLUMN label_en VARCHAR(255) DEFAULT '';

-- Add _en columns to articles table
ALTER TABLE articles
ADD COLUMN title_en VARCHAR(500) DEFAULT '',
ADD COLUMN description_en TEXT,
ADD COLUMN full_content_en TEXT,
ADD COLUMN category_en VARCHAR(100) DEFAULT 'Company';

-- Add _en columns to categories table
ALTER TABLE categories
ADD COLUMN name_en VARCHAR(255) DEFAULT '',
ADD COLUMN description_en TEXT;

-- Add _en columns to pricing_rates table
ALTER TABLE pricing_rates
ADD COLUMN route_en VARCHAR(255) DEFAULT '',
ADD COLUMN origin_en VARCHAR(255) DEFAULT '',
ADD COLUMN destination_en VARCHAR(255) DEFAULT '',
ADD COLUMN service_en VARCHAR(100) DEFAULT '',
ADD COLUMN service_type_en VARCHAR(100) DEFAULT '',
ADD COLUMN transit_time_en VARCHAR(100) DEFAULT '',
ADD COLUMN note_en TEXT,
ADD COLUMN notes_en TEXT;

-- For settings, we insert a new key 'home_page_en' with the default english translation
INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (
  'home_page_en',
  '{
    "hero": {
      "eyebrow": "RELIABLE LOGISTICS PARTNER",
      "title_line1": "Transport ",
      "title_hl1": "safely",
      "title_line2": ",\\nquickly and ",
      "title_hl2": "comprehensively",
      "title_line3": "\\nfor your business",
      "lead": "Connecting 120+ countries — optimized sea freight, air freight, road and warehousing solutions for your supply chain. 98% on-time delivery commitment."
    },
    "services": [
      { "img": "/Shippinglines.jpg", "badge": "SHIPPING", "title": "Sea Freight (FCL & LCL)", "desc": "Global container booking, competitive rates negotiation with 50+ top carriers. Support for dangerous, oversized, reefer and project cargo.", "link": "/services/shipping-lines" },
      { "img": "/AirFreight.jpg", "badge": "AIR FREIGHT", "title": "Air Freight", "desc": "Air freight solutions for urgent and high-value cargo. Connecting 80+ international airports with the fastest transit times in the market.", "link": "/services/scheduled-flights" },
      { "img": "/INTERMODA.jpg", "badge": "INTERMODAL", "title": "Intermodal Transport", "desc": "Flexible combination of sea - road - rail - air. Cost and time optimization for each specific transport route.", "link": "/services/intermodal" },
      { "img": "/Logictis.jpg", "badge": "LOGISTICS", "title": "Warehousing & Distribution", "desc": "15,000m² warehouse system with modern WMS. Cross-docking, pick-pack, inventory management and last-mile delivery services.", "link": "/services/logistics" },
      { "img": "/OURRANGE.jpg", "badge": "CUSTOMS", "title": "Customs Clearance", "desc": "Experienced customs specialist team. HS code, C/O consulting, import-export profile handling. Clearance commitment within 24 hours.", "link": "/services/dedicated" },
      { "img": "/Chacracter.jpg", "badge": "CONSULTING", "title": "Supply Chain Consulting", "desc": "Analyze and optimize the entire supply chain: routes, costs, risks. Custom SCM solution design for each industry.", "link": "/services/charters" }
    ],
    "why_choose_us": [
      { "icon": "🌐", "title": "Global Network", "desc": "Agency partners in 120+ countries. Seamless connection from port of loading to final delivery warehouse." },
      { "icon": "💰", "title": "Optimized Cost", "desc": "Long-term contracts with shipping lines & airlines. Commitment to the most competitive rates in the market." },
      { "icon": "📊", "title": "Modern Technology", "desc": "Online customer portal, real-time tracking, ERP integrated API. Manage shipments anytime, anywhere." },
      { "icon": "⏰", "title": "2h Response", "desc": "Specialist team response within 2 working hours. Dedicated Account Manager for each customer." },
      { "icon": "🛡️", "title": "Safety & Insurance", "desc": "Full journey cargo insurance. Packaging, loading and transport processes meet international standards." },
      { "icon": "📋", "title": "International Certs", "desc": "ISO 9001, ISO 14001, AEO, FIATA, IATA. Ensuring service quality at the highest standards." },
      { "icon": "🌱", "title": "Green Logistics", "desc": "Net-Zero 2035 commitment. Prioritizing eco-friendly vehicles and carbon footprint optimization." },
      { "icon": "🤝", "title": "Long-term Partnership", "desc": "SCM strategic consulting, not just order processing. Partnership relationship instead of short-term transactions." }
    ],
    "process": [
      { "num": "01", "title": "Request Quote", "desc": "Send shipment info via form, email or hotline. Get detailed quote within 2 hours." },
      { "num": "02", "title": "Confirm & Booking", "desc": "Finalize transport plan, confirm schedule and book vessel/flight slot." },
      { "num": "03", "title": "Transport & Tracking", "desc": "Shipment processed professionally. Real-time tracking via customer portal." },
      { "num": "04", "title": "Delivery & Report", "desc": "On-time delivery. Detailed reporting on cost, time and performance." }
    ]
  }'
);
