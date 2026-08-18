import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/* ─── Scroll-reveal ─── */
function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rvd'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    ref.current.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [ref])
}

const t_ui = {
  vi: {
    back: "← Quay lại Dịch vụ",
    badge: "AIR FREIGHT",
    hero_h1: "Vận tải hàng không",
    hero_h1_span: "Nhanh chóng & An toàn",
    hero_p: "Dịch vụ vận chuyển hàng hóa bằng đường hàng không đến hơn 220 quốc gia. Giải pháp tối ưu cho hàng gấp, hàng giá trị cao, dược phẩm, thủy hải sản và e-commerce — từ booking đến giao hàng tận nơi.",
    stat_partners: "Hãng hàng không",
    stat_countries: "Quốc gia",
    stat_delivery: "Ngày giao hàng",
    stat_track: "Tracking online",
    adv_kicker: "TẠI SAO CHỌN HÀNG KHÔNG?",
    adv_h2: "Ưu điểm vượt trội của vận tải hàng không",
    adv_p: "Phương thức vận chuyển nhanh nhất, an toàn nhất cho hàng hóa quốc tế.",
    advs: [
      { icon: '⚡', title: 'Tốc độ vượt trội', desc: 'Transit time chỉ vài giờ thay vì vài tuần so với đường biển. Lý tưởng cho hàng gấp, mùa vụ và e-commerce.' },
      { icon: '🔒', title: 'An toàn tuyệt đối', desc: 'Tỷ lệ hư hỏng/mất mát thấp nhất trong các phương thức vận chuyển. Phù hợp hàng giá trị cao, thiết bị y tế, điện tử.' },
      { icon: '🌍', title: 'Phủ sóng toàn cầu', desc: 'Kết nối 220+ quốc gia qua mạng lưới 100+ hãng hàng không đối tác. Đến mọi điểm trên thế giới trong 1–5 ngày.' },
      { icon: '📊', title: 'Tracking chính xác', desc: 'Theo dõi lô hàng real-time từ kho gửi đến kho nhận. Cập nhật trạng thái AWB qua hệ thống Cargo IQ quốc tế.' },
      { icon: '📋', title: 'Thủ tục trọn gói', desc: 'Làm AWB (Air Waybill), khai hải quan, chứng nhận xuất xứ, hun trùng, kiểm dịch — tất cả trong 1 đầu mối.' },
      { icon: '💰', title: 'Giá cước linh hoạt', desc: 'Nhiều mức giá: Minimum, Normal, Quantity, Specific Commodity Rate. Contract rate ưu đãi cho khách hàng dài hạn.' },
    ],
    svc_kicker: "DANH MỤC DỊCH VỤ",
    svc_h2: "Giải pháp vận tải hàng không đa dạng",
    svc_p: "Từ hàng thông thường đến hàng đặc biệt — chúng tôi có giải pháp cho mọi nhu cầu.",
    svcs: [
      { icon: '✈️', title: 'General Cargo', desc: 'Vận chuyển hàng hóa thông thường bằng đường hàng không. Thời gian transit 1–5 ngày tùy điểm đến. Linh hoạt lịch trình bay hàng tuần.', badge: 'Phổ biến nhất' },
      { icon: '⚡', title: 'Express / Urgent', desc: 'Dịch vụ chuyển phát nhanh quốc tế. Giao hàng trong 24–72 giờ door-to-door. Ưu tiên bay sớm nhất, tracking real-time.', badge: 'Nhanh nhất' },
      { icon: '❄️', title: 'Temperature Controlled', desc: 'Vận chuyển hàng nhạy cảm nhiệt độ: dược phẩm, vaccine, mẫu sinh học. Kiểm soát 2–8°C hoặc -20°C. Đạt chuẩn GDP/WHO.', badge: 'Pharma' },
      { icon: '🥩', title: 'Perishables', desc: 'Thủy hải sản, trái cây, hoa tươi, thực phẩm chế biến. Cool chain từ kho đến sân bay. Thời gian xử lý nhanh tại cảng hàng không.', badge: 'Hàng tươi sống' },
      { icon: '☣️', title: 'Dangerous Goods (DG)', desc: 'Vận chuyển hàng nguy hiểm theo quy định IATA DGR. Hóa chất, pin lithium, sơn, dung môi. Chuyên viên DG làm tờ khai SHIPER\'s DECLARATION.', badge: 'Chứng chỉ IATA' },
      { icon: '🏗️', title: 'Project & Charter', desc: 'Thuê nguyên chuyến bay (Full Charter) cho hàng siêu trọng, thiết bị công nghiệp, viện trợ nhân đạo. Boeing 747F, AN-124, IL-76.', badge: 'Đặc biệt' },
    ],
    comp_kicker: "SO SÁNH DỊCH VỤ",
    comp_h2: "Consol vs Direct — Chọn phương án nào?",
    con_title: "Consolidation",
    con_sub: "Hàng ghép (gom hàng)",
    con_list: [
      { t1: 'Gom nhiều lô hàng nhỏ vào ', s: '1 MAWB', t2: '' },
      { t1: 'Phù hợp lô hàng ', s: '< 300 kg', t2: '' },
      { t1: 'Giá cước ', s: 'tiết kiệm hơn', t2: ' 20–40%' },
      { t1: 'Transit time ', s: 'dài hơn 1–2 ngày', t2: ' (cần gom hàng)' },
      { t1: 'Xuất hàng theo ', s: 'lịch cố định', t2: ' hàng tuần' },
      { t1: 'Lý tưởng cho hàng ', s: 'không gấp', t2: ', mẫu hàng, phụ tùng' },
    ],
    con_btn: "Xem giá Consol →",
    dir_title: "Direct Shipment",
    dir_sub: "Gửi hàng trực tiếp",
    dir_list: [
      { t1: 'Gửi trực tiếp, ', s: 'không qua gom hàng', t2: '' },
      { t1: 'Phù hợp lô hàng ', s: '> 300 kg', t2: ' hoặc hàng gấp' },
      { t1: 'Transit time ', s: 'ngắn nhất có thể', t2: '' },
      { t1: 'Chọn hãng bay, ', s: 'chuyến bay cụ thể', t2: '' },
      { t1: 'Booking ', s: 'ưu tiên', t2: ', xác nhận nhanh' },
      { t1: 'Lý tưởng cho hàng ', s: 'giá trị cao, gấp, mùa vụ', t2: '' },
    ],
    dir_btn: "Xem giá Direct →",
    carr_kicker: "ĐỐI TÁC HÀNG KHÔNG",
    carr_h2: "Hợp tác cùng các hãng hàng không hàng đầu",
    carr_p: "Mạng lưới 100+ hãng hàng không quốc tế đảm bảo lịch bay dày đặc, giá cước cạnh tranh và chỗ hàng (allotment) ổn định.",
    carrs: [
      { name: 'Vietnam Airlines Cargo', logo: '🇻🇳', origin: 'Việt Nam', fleet: '100+ máy bay', routes: '60+ điểm đến', desc: 'Hãng hàng không quốc gia Việt Nam với mạng lưới nội địa dày đặc. Belly cargo trên toàn bộ chuyến bay hành khách và freighter chuyên dụng tuyến châu Á – châu Âu.', color: '#00338D' },
      { name: 'Singapore Airlines Cargo', logo: '🇸🇬', origin: 'Singapore', fleet: '7 freighters', routes: '130+ điểm đến', desc: 'Đội freighter Boeing 747-400F hiện đại. Hub tại Changi Airport — gateway số 1 Đông Nam Á. Dịch vụ Pharma, Perishables và E-commerce chuyên biệt.', color: '#F0AB00' },
      { name: 'Korean Air Cargo', logo: '🇰🇷', origin: 'Hàn Quốc', fleet: '23 freighters', routes: '120+ điểm đến', desc: 'Top 5 hãng cargo lớn nhất thế giới. Hub Incheon kết nối nhanh Việt Nam – Bắc Mỹ. Kho lạnh đạt chuẩn GDP cho hàng dược phẩm.', color: '#0064D2' },
      { name: 'Cathay Pacific Cargo', logo: '🇭🇰', origin: 'Hồng Kông', fleet: '18 freighters', routes: '85+ điểm đến', desc: 'Gateway hàng đầu vào thị trường Trung Quốc và Bắc Á. Terminal cargo siêu hiện đại tại HKIA. Chuyên mạnh hàng điện tử, thời trang và luxury.', color: '#004D40' },
      { name: 'Emirates SkyCargo', logo: '🇦🇪', origin: 'UAE', fleet: '11 freighters + 270 belly', routes: '150+ điểm đến', desc: 'Mạng lưới cargo lớn nhất thế giới. Hub Dubai kết nối 6 châu lục. SkyPharma, SkyFresh, SkyChain — hệ sinh thái sản phẩm chuyên biệt.', color: '#D71A1A' },
      { name: 'Turkish Cargo', logo: '🇹🇷', origin: 'Thổ Nhĩ Kỳ', fleet: '400+ belly + freighters', routes: '130+ quốc gia', desc: 'Hub Istanbul kết nối châu Á – châu Âu – châu Phi hiệu quả nhất. Tăng trưởng nhanh nhất thế giới về cargo tonnage. Giá cước cạnh tranh.', color: '#E30A17' },
      { name: 'China Airlines Cargo', logo: '🇹🇼', origin: 'Đài Loan', fleet: '18 freighters', routes: '100+ điểm đến', desc: 'Freighter trực tiếp SGN/HAN – TPE hàng ngày. Transit nhanh qua Đài Bắc đi Mỹ và châu Âu. Kho hàng tự động hóa tại Taoyuan Airport.', color: '#00205B' },
      { name: 'FedEx Express', logo: '📦', origin: 'Hoa Kỳ', fleet: '680+ máy bay', routes: '220+ quốc gia', desc: 'Express integrator lớn nhất thế giới. Mạng lưới cửa-đến-cửa (door-to-door) nhanh nhất. Hub châu Á tại Quảng Châu. SenseAware tracking IoT real-time.', color: '#4D148C' },
    ],
    rt_kicker: "TUYẾN BAY HÀNG HÓA",
    rt_h2: "Các tuyến bay cargo chính từ Việt Nam",
    rt_p: "Transit time tính từ cất cánh đến hạ cánh (flight time). Thời gian thực tế bao gồm xử lý hàng tại sân bay.",
    th_from: "SÂN BAY ĐI",
    th_to: "SÂN BAY ĐẾN",
    th_transit: "FLIGHT TIME",
    th_freq: "TẦN SUẤT",
    th_type: "LOẠI",
    routes: [
      { from: 'SGN (TP.HCM)', to: 'ICN (Seoul)', transit: '5–6 giờ', freq: 'Hàng ngày', type: 'Direct' },
      { from: 'SGN (TP.HCM)', to: 'NRT (Tokyo)', transit: '5–6 giờ', freq: 'Hàng ngày', type: 'Direct' },
      { from: 'SGN (TP.HCM)', to: 'SIN (Singapore)', transit: '2 giờ', freq: 'Hàng ngày', type: 'Direct' },
      { from: 'SGN (TP.HCM)', to: 'FRA (Frankfurt)', transit: '12–14 giờ', freq: '5 chuyến/tuần', type: 'Direct' },
      { from: 'SGN (TP.HCM)', to: 'LAX (Los Angeles)', transit: '16–20 giờ', freq: '4 chuyến/tuần', type: '1 stop' },
      { from: 'SGN (TP.HCM)', to: 'LHR (London)', transit: '13–15 giờ', freq: '3 chuyến/tuần', type: '1 stop' },
      { from: 'HAN (Hà Nội)', to: 'PVG (Shanghai)', transit: '3–4 giờ', freq: 'Hàng ngày', type: 'Direct' },
      { from: 'HAN (Hà Nội)', to: 'HKG (Hong Kong)', transit: '2–3 giờ', freq: 'Hàng ngày', type: 'Direct' },
      { from: 'HAN (Hà Nội)', to: 'CDG (Paris)', transit: '12–14 giờ', freq: '3 chuyến/tuần', type: 'Direct' },
      { from: 'SGN (TP.HCM)', to: 'DXB (Dubai)', transit: '7–8 giờ', freq: '4 chuyến/tuần', type: 'Direct' },
    ],
    rt_btn: "Báo giá",
    st_kicker: "QUY TRÌNH VẬN CHUYỂN",
    st_h2: "6 bước gửi hàng bằng đường hàng không",
    steps: [
      { step: '01', title: 'Yêu cầu báo giá', desc: 'Cung cấp thông tin: tuyến bay, loại hàng, trọng lượng, kích thước. Nhận báo giá trong 1 giờ.' },
      { step: '02', title: 'Booking chuyến bay', desc: 'Chọn hãng bay, lịch bay phù hợp. Xác nhận booking và allotment trên chuyến bay.' },
      { step: '03', title: 'Thu gom & Đóng gói', desc: 'Pickup hàng tại kho. Đóng gói, dán nhãn, cân đo theo tiêu chuẩn IATA. Chuẩn bị chứng từ.' },
      { step: '04', title: 'Khai hải quan xuất', desc: 'Khai báo hải quan điện tử, làm AWB (Air Waybill), giấy phép xuất khẩu, C/O nếu cần.' },
      { step: '05', title: 'Bay & Tracking', desc: 'Hàng lên máy bay. Theo dõi real-time qua hệ thống Cargo IQ. Nhận thông báo tự động.' },
      { step: '06', title: 'Thông quan & Giao hàng', desc: 'Customs clearance tại sân bay đích. Giao hàng tận nơi (door delivery) hoặc nhận tại kho.' },
    ],
    doc_kicker: "CHỨNG TỪ HÀNG KHÔNG",
    doc_h2: "Hồ sơ cần chuẩn bị khi gửi hàng Air",
    doc_p: "Stella Shipping hỗ trợ toàn bộ thủ tục giấy tờ — bạn chỉ cần cung cấp thông tin cơ bản.",
    docs: [
      { icon: '📄', title: 'AWB (Air Waybill)', desc: 'Vận đơn hàng không — chứng từ quan trọng nhất. Ghi nhận thông tin người gửi, người nhận, mô tả hàng, trọng lượng và cước phí.' },
      { icon: '📋', title: 'Commercial Invoice', desc: 'Hóa đơn thương mại thể hiện giá trị lô hàng. Dùng cho mục đích khai hải quan và tính thuế nhập khẩu tại nước đến.' },
      { icon: '📦', title: 'Packing List', desc: 'Phiếu đóng gói chi tiết số kiện, trọng lượng, kích thước từng kiện. Dùng đối chiếu khi nhận hàng tại đích.' },
      { icon: '🏛️', title: 'Tờ khai Hải quan', desc: 'Khai báo hải quan điện tử theo hệ thống VNACCS/VCIS. Stella Shipping hỗ trợ khai báo và thông quan nhanh.' },
      { icon: '🌿', title: 'Giấy phép / Chứng nhận', desc: 'C/O (Certificate of Origin), Health Certificate, Phytosanitary Certificate — tùy yêu cầu nước nhập khẩu.' },
      { icon: '☣️', title: 'DG Declaration', desc: 'Shipper\'s Declaration for Dangerous Goods theo IATA DGR. Bắt buộc cho hàng nguy hiểm: pin lithium, hóa chất, aerosol.' },
    ],
    cta_h2: "Cần gửi hàng bằng đường hàng không?",
    cta_p: "Liên hệ ngay để nhận báo giá tốt nhất từ 100+ hãng hàng không quốc tế.",
    cta_btn1: "Nhận báo giá ngay",
    cta_btn2: "Liên hệ tư vấn →"
  },
  en: {
    back: "← Back to Services",
    badge: "AIR FREIGHT",
    hero_h1: "Air Freight",
    hero_h1_span: "Fast & Secure",
    hero_p: "Air freight shipping services to over 220 countries. The optimal solution for urgent cargo, high-value goods, pharma, seafood, and e-commerce — from booking to door delivery.",
    stat_partners: "Airlines",
    stat_countries: "Countries",
    stat_delivery: "Delivery Days",
    stat_track: "Online Tracking",
    adv_kicker: "WHY CHOOSE AIR FREIGHT?",
    adv_h2: "Outstanding advantages of air transport",
    adv_p: "The fastest, most secure transport method for international cargo.",
    advs: [
      { icon: '⚡', title: 'Superior Speed', desc: 'Transit time is just hours instead of weeks compared to ocean freight. Ideal for urgent goods, seasonal items, and e-commerce.' },
      { icon: '🔒', title: 'Absolute Safety', desc: 'Lowest damage/loss rate among all transport modes. Suitable for high-value goods, medical equipment, and electronics.' },
      { icon: '🌍', title: 'Global Coverage', desc: 'Connects 220+ countries via a network of 100+ partner airlines. Reach any point in the world in 1-5 days.' },
      { icon: '📊', title: 'Accurate Tracking', desc: 'Real-time cargo tracking from pickup to delivery. AWB status updates via the international Cargo IQ system.' },
      { icon: '📋', title: 'All-inclusive Procedures', desc: 'Handling AWB, customs clearance, C/O, fumigation, quarantine — all through a single point of contact.' },
      { icon: '💰', title: 'Flexible Pricing', desc: 'Various rate tiers: Minimum, Normal, Quantity, Specific Commodity Rate. Favorable contract rates for long-term clients.' },
    ],
    svc_kicker: "SERVICE PORTFOLIO",
    svc_h2: "Diverse Air Freight Solutions",
    svc_p: "From general cargo to special cargo — we have a solution for every need.",
    svcs: [
      { icon: '✈️', title: 'General Cargo', desc: 'Standard air freight transportation. Transit time 1-5 days depending on destination. Flexible weekly flight schedules.', badge: 'Most Popular' },
      { icon: '⚡', title: 'Express / Urgent', desc: 'International express delivery. Door-to-door delivery in 24-72 hours. Earliest flight priority, real-time tracking.', badge: 'Fastest' },
      { icon: '❄️', title: 'Temperature Controlled', desc: 'Transport for temperature-sensitive goods: pharma, vaccines, bio-samples. Controlled 2-8°C or -20°C. GDP/WHO compliant.', badge: 'Pharma' },
      { icon: '🥩', title: 'Perishables', desc: 'Seafood, fruits, fresh flowers, processed food. Cool chain from warehouse to airport. Fast handling at airports.', badge: 'Fresh Goods' },
      { icon: '☣️', title: 'Dangerous Goods (DG)', desc: 'Transporting dangerous goods per IATA DGR. Chemicals, lithium batteries, paint. DG specialists handle SHIPPER\'S DECLARATION.', badge: 'IATA Certified' },
      { icon: '🏗️', title: 'Project & Charter', desc: 'Full Charter flights for heavy cargo, industrial equipment, humanitarian aid. Boeing 747F, AN-124, IL-76.', badge: 'Special' },
    ],
    comp_kicker: "SERVICE COMPARISON",
    comp_h2: "Consol vs Direct — Which option to choose?",
    con_title: "Consolidation",
    con_sub: "Consolidated Cargo",
    con_list: [
      { t1: 'Consolidate multiple small shipments into ', s: '1 MAWB', t2: '' },
      { t1: 'Suitable for shipments ', s: '< 300 kg', t2: '' },
      { t1: 'Freight rates are ', s: 'more economical', t2: ' by 20-40%' },
      { t1: 'Transit time is ', s: '1-2 days longer', t2: ' (needs consolidation)' },
      { t1: 'Departures on ', s: 'fixed schedules', t2: ' weekly' },
      { t1: 'Ideal for ', s: 'non-urgent', t2: ' goods, samples, spare parts' },
    ],
    con_btn: "View Consol Rates →",
    dir_title: "Direct Shipment",
    dir_sub: "Direct Cargo",
    dir_list: [
      { t1: 'Direct shipping, ', s: 'no consolidation', t2: '' },
      { t1: 'Suitable for shipments ', s: '> 300 kg', t2: ' or urgent cargo' },
      { t1: 'Transit time is ', s: 'as short as possible', t2: '' },
      { t1: 'Choose airline and ', s: 'specific flight', t2: '' },
      { t1: 'Booking is ', s: 'prioritized', t2: ', fast confirmation' },
      { t1: 'Ideal for ', s: 'high-value, urgent, seasonal', t2: ' cargo' },
    ],
    dir_btn: "View Direct Rates →",
    carr_kicker: "AIRLINE PARTNERS",
    carr_h2: "Partnering with Top Airlines",
    carr_p: "Our network of 100+ international airlines ensures dense flight schedules, competitive rates, and stable cargo allotments.",
    carrs: [
      { name: 'Vietnam Airlines Cargo', logo: '🇻🇳', origin: 'Vietnam', fleet: '100+ aircraft', routes: '60+ destinations', desc: 'Vietnam\'s national carrier with a dense domestic network. Belly cargo on all passenger flights and dedicated freighters for Asia-Europe routes.', color: '#00338D' },
      { name: 'Singapore Airlines Cargo', logo: '🇸🇬', origin: 'Singapore', fleet: '7 freighters', routes: '130+ destinations', desc: 'Modern Boeing 747-400F freighter fleet. Hub at Changi Airport — Southeast Asia\'s #1 gateway. Specialized Pharma, Perishables, and E-commerce services.', color: '#F0AB00' },
      { name: 'Korean Air Cargo', logo: '🇰🇷', origin: 'South Korea', fleet: '23 freighters', routes: '120+ destinations', desc: 'Top 5 largest cargo airlines globally. Incheon hub connects Vietnam to North America quickly. GDP-certified cold storage for pharma.', color: '#0064D2' },
      { name: 'Cathay Pacific Cargo', logo: '🇭🇰', origin: 'Hong Kong', fleet: '18 freighters', routes: '85+ destinations', desc: 'Premier gateway to the Chinese and North Asian markets. Ultra-modern cargo terminal at HKIA. Very strong in electronics, fashion, and luxury.', color: '#004D40' },
      { name: 'Emirates SkyCargo', logo: '🇦🇪', origin: 'UAE', fleet: '11 freighters + 270 belly', routes: '150+ destinations', desc: 'World\'s largest cargo network. Dubai hub connects 6 continents. SkyPharma, SkyFresh, SkyChain — specialized product ecosystem.', color: '#D71A1A' },
      { name: 'Turkish Cargo', logo: '🇹🇷', origin: 'Turkey', fleet: '400+ belly + freighters', routes: '130+ countries', desc: 'Istanbul hub efficiently connects Asia - Europe - Africa. World\'s fastest-growing in cargo tonnage. Competitive rates.', color: '#E30A17' },
      { name: 'China Airlines Cargo', logo: '🇹🇼', origin: 'Taiwan', fleet: '18 freighters', routes: '100+ destinations', desc: 'Daily direct freighters SGN/HAN - TPE. Fast transit via Taipei to the US and Europe. Automated cargo warehouse at Taoyuan Airport.', color: '#00205B' },
      { name: 'FedEx Express', logo: '📦', origin: 'USA', fleet: '680+ aircraft', routes: '220+ countries', desc: 'World\'s largest express integrator. Fastest door-to-door network. Asia hub in Guangzhou. Real-time SenseAware IoT tracking.', color: '#4D148C' },
    ],
    rt_kicker: "MAIN CARGO ROUTES",
    rt_h2: "Major Cargo Routes from Vietnam",
    rt_p: "Transit time is from takeoff to landing (flight time). Actual time includes cargo handling at the airport.",
    th_from: "AIRPORT OF DEPARTURE",
    th_to: "AIRPORT OF ARRIVAL",
    th_transit: "FLIGHT TIME",
    th_freq: "FREQUENCY",
    th_type: "TYPE",
    routes: [
      { from: 'SGN (HCMC)', to: 'ICN (Seoul)', transit: '5-6 hours', freq: 'Daily', type: 'Direct' },
      { from: 'SGN (HCMC)', to: 'NRT (Tokyo)', transit: '5-6 hours', freq: 'Daily', type: 'Direct' },
      { from: 'SGN (HCMC)', to: 'SIN (Singapore)', transit: '2 hours', freq: 'Daily', type: 'Direct' },
      { from: 'SGN (HCMC)', to: 'FRA (Frankfurt)', transit: '12-14 hours', freq: '5 flights/week', type: 'Direct' },
      { from: 'SGN (HCMC)', to: 'LAX (Los Angeles)', transit: '16-20 hours', freq: '4 flights/week', type: '1 stop' },
      { from: 'SGN (HCMC)', to: 'LHR (London)', transit: '13-15 hours', freq: '3 flights/week', type: '1 stop' },
      { from: 'HAN (Hanoi)', to: 'PVG (Shanghai)', transit: '3-4 hours', freq: 'Daily', type: 'Direct' },
      { from: 'HAN (Hanoi)', to: 'HKG (Hong Kong)', transit: '2-3 hours', freq: 'Daily', type: 'Direct' },
      { from: 'HAN (Hanoi)', to: 'CDG (Paris)', transit: '12-14 hours', freq: '3 flights/week', type: 'Direct' },
      { from: 'SGN (HCMC)', to: 'DXB (Dubai)', transit: '7-8 hours', freq: '4 flights/week', type: 'Direct' },
    ],
    rt_btn: "Quote",
    st_kicker: "SHIPPING PROCESS",
    st_h2: "6 Steps for Air Freight Shipping",
    steps: [
      { step: '01', title: 'Request a Quote', desc: 'Provide details: flight route, cargo type, weight, dimensions. Get a quote in 1 hour.' },
      { step: '02', title: 'Flight Booking', desc: 'Select airline and suitable schedule. Confirm booking and allotment on the flight.' },
      { step: '03', title: 'Collection & Packing', desc: 'Pickup cargo at warehouse. Pack, label, weigh according to IATA standards. Prepare documents.' },
      { step: '04', title: 'Export Customs', desc: 'E-customs declaration, prepare AWB (Air Waybill), export licenses, C/O if required.' },
      { step: '05', title: 'Flight & Tracking', desc: 'Cargo loaded onto aircraft. Real-time tracking via Cargo IQ. Receive automatic notifications.' },
      { step: '06', title: 'Clearance & Delivery', desc: 'Customs clearance at destination airport. Door delivery or warehouse pickup.' },
    ],
    doc_kicker: "AIR FREIGHT DOCUMENTS",
    doc_h2: "Documents Required for Air Freight",
    doc_p: "Stella Shipping assists with all paperwork — you only need to provide basic information.",
    docs: [
      { icon: '📄', title: 'AWB (Air Waybill)', desc: 'The most important document. Records shipper, consignee, cargo description, weight, and freight charges.' },
      { icon: '📋', title: 'Commercial Invoice', desc: 'Shows the cargo\'s value. Used for customs declaration and calculating import duties at the destination.' },
      { icon: '📦', title: 'Packing List', desc: 'Details the number of packages, weight, and dimensions of each. Used for cross-checking upon receipt at destination.' },
      { icon: '🏛️', title: 'Customs Declaration', desc: 'E-customs declaration via VNACCS/VCIS. Stella Shipping assists with fast declaration and clearance.' },
      { icon: '🌿', title: 'Licenses / Certificates', desc: 'C/O (Certificate of Origin), Health Certificate, Phytosanitary Certificate — depending on the importing country\'s requirements.' },
      { icon: '☣️', title: 'DG Declaration', desc: 'Shipper\'s Declaration for Dangerous Goods per IATA DGR. Mandatory for dangerous goods: lithium batteries, chemicals, aerosols.' },
    ],
    cta_h2: "Need to ship by air freight?",
    cta_p: "Contact us now for the best quotes from 100+ international airlines.",
    cta_btn1: "Get a Quote Now",
    cta_btn2: "Contact for Consultation →"
  }
}

export default function ScheduledFlights() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'vi'
  const t = t_ui[lang]

  const pageRef = useRef(null)
  useReveal(pageRef)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div ref={pageRef}>
      <style>{css}</style>

      {/* ═══ HERO ═══ */}
      <section className="af-hero">
        <div className="af-hero-overlay" />
        {/* Animated particles */}
        <div className="af-hero-particles">
          <div className="af-particle p1" />
          <div className="af-particle p2" />
          <div className="af-particle p3" />
          <div className="af-particle p4" />
          <div className="af-particle p5" />
        </div>
        <div className="af-hero-inner">
          <Link to="/services" className="af-back rv">{t.back}</Link>
          <div className="af-hero-badge rv">{t.badge}</div>
          <h1 className="rv d1">{t.hero_h1}<br /><span>{t.hero_h1_span}</span></h1>
          <p className="rv d2">{t.hero_p}</p>
          <div className="af-hero-stats rv d3">
            <div><strong>100+</strong><span>{t.stat_partners}</span></div>
            <div><strong>220+</strong><span>{t.stat_countries}</span></div>
            <div><strong>1–5</strong><span>{t.stat_delivery}</span></div>
            <div><strong>24/7</strong><span>{t.stat_track}</span></div>
          </div>
        </div>
      </section>

      {/* ═══ ƯU ĐIỂM VẬN TẢI HÀNG KHÔNG ═══ */}
      <section className="af-section">
        <div className="af-section-hdr rv">
          <div className="kicker">{t.adv_kicker}</div>
          <h2>{t.adv_h2}</h2>
          <p>{t.adv_p}</p>
        </div>
        <div className="af-adv-grid">
          {t.advs.map((a, i) => (
            <div key={i} className={`af-adv-card rv d${(i % 4) + 1}`}>
              <div className="af-adv-icon">{a.icon}</div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DỊCH VỤ ═══ */}
      <section className="af-section af-section-alt">
        <div className="af-section-hdr rv">
          <div className="kicker">{t.svc_kicker}</div>
          <h2>{t.svc_h2}</h2>
          <p>{t.svc_p}</p>
        </div>
        <div className="af-svc-grid">
          {t.svcs.map((s, i) => (
            <div key={i} className={`af-svc-card rv d${(i % 4) + 1}`}>
              {s.badge && <div className="af-svc-badge">{s.badge}</div>}
              <div className="af-svc-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CONSOLIDATION vs DIRECT ═══ */}
      <section className="af-section">
        <div className="af-section-hdr rv">
          <div className="kicker">{t.comp_kicker}</div>
          <h2>{t.comp_h2}</h2>
        </div>
        <div className="af-compare rv">
          <div className="af-compare-card">
            <div className="af-cc-header consol">
              <h3>📦 {t.con_title}</h3>
              <p>{t.con_sub}</p>
            </div>
            <ul>
              {t.con_list.map((li, i) => (
                <li key={i}>{li.t1}{li.s && <strong>{li.s}</strong>}{li.t2}</li>
              ))}
            </ul>
            <Link to="/pricing" className="af-cc-cta">{t.con_btn}</Link>
          </div>
          <div className="af-compare-card">
            <div className="af-cc-header direct">
              <h3>🚀 {t.dir_title}</h3>
              <p>{t.dir_sub}</p>
            </div>
            <ul>
              {t.dir_list.map((li, i) => (
                <li key={i}>{li.t1}{li.s && <strong>{li.s}</strong>}{li.t2}</li>
              ))}
            </ul>
            <Link to="/pricing" className="af-cc-cta">{t.dir_btn}</Link>
          </div>
        </div>
      </section>

      {/* ═══ HÃNG HÀNG KHÔNG ĐỐI TÁC ═══ */}
      <section className="af-section af-section-alt">
        <div className="af-section-hdr rv">
          <div className="kicker">{t.carr_kicker}</div>
          <h2>{t.carr_h2}</h2>
          <p>{t.carr_p}</p>
        </div>
        <div className="af-carrier-grid">
          {t.carrs.map((c, i) => (
            <div key={i} className={`af-carrier-card rv d${(i % 4) + 1}`}>
              <div className="af-carrier-logo" style={{ background: c.color }}>{c.logo}</div>
              <div className="af-carrier-body">
                <h4>{c.name}</h4>
                <div className="af-carrier-meta">
                  <span>🏳️ {c.origin}</span>
                  <span>✈️ {c.fleet}</span>
                  <span>🌐 {c.routes}</span>
                </div>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TUYẾN BAY CHÍNH ═══ */}
      <section className="af-section">
        <div className="af-section-hdr rv">
          <div className="kicker">{t.rt_kicker}</div>
          <h2>{t.rt_h2}</h2>
          <p>{t.rt_p}</p>
        </div>
        <div className="af-route-table rv">
          <table>
            <thead>
              <tr>
                <th>{t.th_from}</th>
                <th>{t.th_to}</th>
                <th>{t.th_transit}</th>
                <th>{t.th_freq}</th>
                <th>{t.th_type}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {t.routes.map((r, i) => (
                <tr key={i}>
                  <td><strong>🛫 {r.from}</strong></td>
                  <td><strong>🛬 {r.to}</strong></td>
                  <td><span className="af-transit">⏱️ {r.transit}</span></td>
                  <td>{r.freq}</td>
                  <td><span className={`af-type-badge ${r.type === 'Direct' ? 'direct' : 'stop'}`}>{r.type}</span></td>
                  <td><Link to="/pricing" className="af-route-btn">{t.rt_btn}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ QUY TRÌNH ═══ */}
      <section className="af-section af-section-alt">
        <div className="af-section-hdr rv">
          <div className="kicker">{t.st_kicker}</div>
          <h2>{t.st_h2}</h2>
        </div>
        <div className="af-steps">
          {t.steps.map((s, i) => (
            <div key={i} className={`af-step rv d${i + 1}`}>
              <div className="af-step-num">{s.step}</div>
              <div className="af-step-line" />
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CHỨNG TỪ HÀNG KHÔNG ═══ */}
      <section className="af-section">
        <div className="af-section-hdr rv">
          <div className="kicker">{t.doc_kicker}</div>
          <h2>{t.doc_h2}</h2>
          <p>{t.doc_p}</p>
        </div>
        <div className="af-doc-grid rv">
          {t.docs.map((d, i) => (
            <div key={i} className="af-doc-card">
              <div className="af-doc-icon">{d.icon}</div>
              <h4>{d.title}</h4>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="af-cta rv">
        <div className="af-cta-inner">
          <h2>{t.cta_h2}</h2>
          <p>{t.cta_p}</p>
          <div className="af-cta-btns">
            <Link to="/pricing" className="btn btn-primary">{t.cta_btn1}</Link>
            <Link to="/contact" className="af-cta-ghost">{t.cta_btn2}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const css = `
  /* ═══════════ HERO ═══════════ */
  .af-hero { position:relative; min-height:520px; display:flex; align-items:center; color:#fff; overflow:hidden; margin:-24px -24px 0 -24px; }
  .af-hero-overlay { position:absolute; inset:0; background: linear-gradient(135deg, rgba(12,35,64,0.93) 0%, rgba(30,58,100,0.85) 50%, rgba(15,43,87,0.9) 100%), url('/AirFreight.jpg') center/cover; z-index:1; }
  .af-hero-inner { position:relative; z-index:3; max-width:1200px; margin:0 auto; padding:90px 32px; width:100%; }
  .af-back { color:rgba(255,255,255,0.6); text-decoration:none; font-size:14px; display:inline-block; margin-bottom:24px; transition:color .2s; }
  .af-back:hover { color:#fff; }
  .af-hero-badge { display:inline-block; background:linear-gradient(135deg, #f36c1f, #ff8a3d); padding:7px 18px; border-radius:20px; font-size:12px; font-weight:700; letter-spacing:2.5px; margin-bottom:22px; box-shadow:0 4px 16px rgba(243,108,31,0.4); }
  .af-hero h1 { font-size:54px; margin:0 0 22px; line-height:1.12; font-weight:800; text-shadow:0 2px 24px rgba(0,0,0,0.15); }
  .af-hero h1 span { background:linear-gradient(135deg, #f36c1f, #ffb347); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .af-hero p { max-width:660px; color:rgba(255,255,255,0.82); font-size:17px; line-height:1.75; margin-bottom:40px; }
  .af-hero-stats { display:flex; gap:48px; flex-wrap:wrap; }
  .af-hero-stats > div { text-align:center; }
  .af-hero-stats strong { display:block; font-size:40px; font-weight:800; background:linear-gradient(135deg, #f36c1f, #ffb347); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .af-hero-stats span { font-size:13px; color:rgba(255,255,255,0.7); margin-top:4px; display:block; }

  /* ── Particles ── */
  .af-hero-particles { position:absolute; inset:0; z-index:2; pointer-events:none; overflow:hidden; }
  .af-particle { position:absolute; border-radius:50%; background:rgba(243,108,31,0.15); animation:afFloat 12s ease-in-out infinite; }
  .p1 { width:80px; height:80px; top:15%; left:8%; animation-delay:0s; }
  .p2 { width:50px; height:50px; top:60%; left:75%; animation-delay:-3s; }
  .p3 { width:120px; height:120px; top:70%; left:20%; animation-delay:-6s; opacity:0.5; }
  .p4 { width:40px; height:40px; top:25%; left:85%; animation-delay:-2s; }
  .p5 { width:60px; height:60px; top:50%; left:50%; animation-delay:-8s; opacity:0.3; }
  @keyframes afFloat {
    0%, 100% { transform:translateY(0) translateX(0) scale(1); opacity:0.3; }
    25% { transform:translateY(-20px) translateX(10px) scale(1.1); opacity:0.5; }
    50% { transform:translateY(-10px) translateX(-15px) scale(0.95); opacity:0.4; }
    75% { transform:translateY(-25px) translateX(8px) scale(1.05); opacity:0.35; }
  }

  /* ═══════════ SECTIONS ═══════════ */
  .af-section { padding:80px 24px; max-width:1200px; margin:0 auto; }
  .af-section-alt { background:linear-gradient(180deg, #f7f9fb, #f0f4f8); max-width:100%; padding-left:calc((100% - 1200px)/2 + 24px); padding-right:calc((100% - 1200px)/2 + 24px); }
  .af-section-hdr { text-align:center; margin-bottom:52px; }
  .af-section-hdr .kicker { color:#f36c1f; font-size:12px; font-weight:700; letter-spacing:3px; margin-bottom:12px; }
  .af-section-hdr h2 { font-size:36px; color:#0f2b57; font-weight:800; margin:0 0 14px; }
  .af-section-hdr p { color:#5a6f82; max-width:660px; margin:0 auto; line-height:1.65; font-size:15.5px; }

  /* ═══════════ ADVANTAGES ═══════════ */
  .af-adv-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .af-adv-card { background:#fff; padding:32px 28px; border-radius:16px; box-shadow:0 4px 24px rgba(10,20,40,0.05); transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s; position:relative; overflow:hidden; }
  .af-adv-card::before { content:''; position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg, #f36c1f, #ffb347); transform:scaleX(0); transform-origin:left; transition:transform .4s cubic-bezier(.22,1,.36,1); }
  .af-adv-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(10,20,40,0.1); }
  .af-adv-card:hover::before { transform:scaleX(1); }
  .af-adv-icon { font-size:36px; margin-bottom:16px; display:inline-flex; width:64px; height:64px; align-items:center; justify-content:center; background:linear-gradient(135deg, rgba(243,108,31,0.1), rgba(255,179,71,0.1)); border-radius:16px; }
  .af-adv-card h4 { color:#0f2b57; font-size:18px; margin:0 0 10px; font-weight:700; }
  .af-adv-card p { color:#5a6f82; font-size:14px; line-height:1.65; margin:0; }

  /* ═══════════ SERVICES ═══════════ */
  .af-svc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
  .af-svc-card { background:#fff; padding:32px 24px; border-radius:16px; box-shadow:0 4px 24px rgba(10,20,40,0.05); transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s; text-align:center; position:relative; }
  .af-svc-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(10,20,40,0.1); }
  .af-svc-badge { position:absolute; top:16px; right:16px; background:linear-gradient(135deg, #f36c1f, #ff8a3d); color:#fff; font-size:11px; font-weight:700; padding:4px 10px; border-radius:12px; letter-spacing:0.5px; }
  .af-svc-icon { font-size:44px; margin-bottom:16px; }
  .af-svc-card h4 { color:#0f2b57; font-size:17px; margin:0 0 12px; font-weight:700; }
  .af-svc-card p { color:#5a6f82; font-size:13.5px; line-height:1.65; margin:0; text-align:left; }

  /* ═══════════ COMPARE ═══════════ */
  .af-compare { display:grid; grid-template-columns:1fr 1fr; gap:32px; max-width:920px; margin:0 auto; }
  .af-compare-card { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(10,20,40,0.06); transition:transform .3s,box-shadow .3s; }
  .af-compare-card:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(10,20,40,0.1); }
  .af-cc-header { padding:30px 24px; color:#fff; text-align:center; }
  .af-cc-header.consol { background:linear-gradient(135deg, #0f2b57, #1a4a8a); }
  .af-cc-header.direct { background:linear-gradient(135deg, #f36c1f, #e05a10); }
  .af-cc-header h3 { margin:0; font-size:28px; }
  .af-cc-header p { margin:6px 0 0; opacity:0.85; font-size:14px; }
  .af-compare-card ul { padding:24px 24px 24px 40px; margin:0; list-style:none; }
  .af-compare-card li { position:relative; padding:11px 0; color:#33475b; font-size:14.5px; line-height:1.6; border-bottom:1px solid #f0f2f5; }
  .af-compare-card li:last-child { border-bottom:none; }
  .af-compare-card li::before { content:'✓'; position:absolute; left:-24px; color:#f36c1f; font-weight:700; }
  .af-cc-cta { display:block; text-align:center; padding:16px; background:#f7f9fb; color:#0f2b57; font-weight:700; text-decoration:none; transition:background .2s,color .2s; }
  .af-cc-cta:hover { background:#0f2b57; color:#fff; }

  /* ═══════════ CARRIERS ═══════════ */
  .af-carrier-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; max-width:1200px; margin:0 auto; }
  .af-carrier-card { display:flex; gap:20px; background:#fff; padding:24px; border-radius:14px; box-shadow:0 4px 24px rgba(10,20,40,0.05); transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s; }
  .af-carrier-card:hover { transform:translateY(-4px); box-shadow:0 14px 42px rgba(10,20,40,0.1); }
  .af-carrier-logo { width:60px; height:60px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:28px; flex-shrink:0; }
  .af-carrier-body h4 { margin:0 0 6px; color:#0f2b57; font-size:17px; font-weight:700; }
  .af-carrier-meta { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:8px; }
  .af-carrier-meta span { font-size:12px; color:#5a6f82; background:#f0f4f8; padding:2px 8px; border-radius:8px; }
  .af-carrier-body p { margin:0; color:#5a6f82; font-size:13.5px; line-height:1.6; }

  /* ═══════════ ROUTES TABLE ═══════════ */
  .af-route-table { max-width:1200px; margin:0 auto; overflow-x:auto; border-radius:16px; box-shadow:0 4px 24px rgba(10,20,40,0.06); }
  .af-route-table table { width:100%; border-collapse:collapse; background:#fff; overflow:hidden; }
  .af-route-table thead { background:linear-gradient(135deg, #0f2b57, #153468); color:#fff; }
  .af-route-table th { padding:16px 20px; text-align:left; font-size:12px; letter-spacing:1.5px; font-weight:600; }
  .af-route-table td { padding:16px 20px; border-bottom:1px solid #f0f2f5; font-size:14.5px; color:#33475b; }
  .af-route-table tr:last-child td { border-bottom:none; }
  .af-route-table tr:hover td { background:#f7f9fb; }
  .af-transit { color:#f36c1f; font-weight:600; }
  .af-type-badge { display:inline-block; padding:3px 10px; border-radius:10px; font-size:12px; font-weight:600; }
  .af-type-badge.direct { background:rgba(22,163,74,0.1); color:#16a34a; }
  .af-type-badge.stop { background:rgba(234,179,8,0.15); color:#b45309; }
  .af-route-btn { display:inline-block; padding:7px 18px; background:linear-gradient(135deg, #f36c1f, #ff8a3d); color:#fff; border-radius:8px; text-decoration:none; font-size:13px; font-weight:600; transition:transform .2s, box-shadow .2s; }
  .af-route-btn:hover { transform:translateY(-1px); box-shadow:0 4px 12px rgba(243,108,31,0.3); }

  /* ═══════════ STEPS ═══════════ */
  .af-steps { display:grid; grid-template-columns:repeat(6,1fr); gap:20px; max-width:1200px; margin:0 auto; }
  .af-step { background:#fff; padding:28px 20px; border-radius:14px; box-shadow:0 4px 24px rgba(10,20,40,0.05); text-align:center; position:relative; transition:transform .35s cubic-bezier(.22,1,.36,1); }
  .af-step:hover { transform:translateY(-6px); }
  .af-step-num { display:inline-flex; width:52px; height:52px; border-radius:50%; background:linear-gradient(135deg,#0f2b57,#1a4a8a); color:#fff; font-size:18px; font-weight:800; align-items:center; justify-content:center; margin-bottom:16px; box-shadow:0 4px 16px rgba(15,43,87,0.2); }
  .af-step-line { display:none; }
  .af-step h4 { color:#0f2b57; margin:0 0 8px; font-size:14.5px; font-weight:700; }
  .af-step p { color:#5a6f82; font-size:12.5px; line-height:1.55; margin:0; }

  /* ═══════════ DOCUMENTS ═══════════ */
  .af-doc-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1200px; margin:0 auto; }
  .af-doc-card { background:#fff; padding:28px 24px; border-radius:14px; box-shadow:0 4px 24px rgba(10,20,40,0.05); transition:transform .35s, box-shadow .35s; border-left:4px solid #f36c1f; }
  .af-doc-card:hover { transform:translateY(-4px); box-shadow:0 14px 42px rgba(10,20,40,0.1); }
  .af-doc-icon { font-size:32px; margin-bottom:12px; }
  .af-doc-card h4 { color:#0f2b57; font-size:16px; margin:0 0 8px; font-weight:700; }
  .af-doc-card p { color:#5a6f82; font-size:13.5px; line-height:1.6; margin:0; }

  /* ═══════════ CTA ═══════════ */
  .af-cta { text-align:center; padding:0; background:linear-gradient(135deg, #0f2b57 0%, #153468 50%, #1a4a8a 100%); color:#fff; margin:0 -24px -24px -24px; position:relative; overflow:hidden; }
  .af-cta::before { content:''; position:absolute; top:-50%; right:-20%; width:500px; height:500px; background:radial-gradient(circle, rgba(243,108,31,0.15), transparent 70%); border-radius:50%; }
  .af-cta::after { content:''; position:absolute; bottom:-40%; left:-10%; width:400px; height:400px; background:radial-gradient(circle, rgba(255,179,71,0.1), transparent 70%); border-radius:50%; }
  .af-cta-inner { position:relative; z-index:1; padding:80px 24px; }
  .af-cta h2 { font-size:36px; margin:0 0 14px; font-weight:800; }
  .af-cta p { color:rgba(255,255,255,0.75); font-size:17px; margin-bottom:36px; }
  .af-cta-btns { display:flex; gap:16px; justify-content:center; align-items:center; flex-wrap:wrap; }
  .af-cta-ghost { color:rgba(255,255,255,0.8); text-decoration:none; font-weight:600; transition:color .2s; padding:12px 24px; border:1px solid rgba(255,255,255,0.2); border-radius:8px; }
  .af-cta-ghost:hover { color:#fff; border-color:rgba(255,255,255,0.5); }

  /* ═══════════ REVEAL ═══════════ */
  .rv { opacity:0; transform:translateY(30px); transition:opacity .7s ease, transform .7s ease; }
  .rvd { opacity:1; transform:translateY(0); }
  .d1 { transition-delay:.1s } .d2 { transition-delay:.2s } .d3 { transition-delay:.3s } .d4 { transition-delay:.4s } .d5 { transition-delay:.5s } .d6 { transition-delay:.6s }

  /* ═══════════ RESPONSIVE ═══════════ */
  @media(max-width:1024px) {
    .af-steps { grid-template-columns:repeat(3,1fr); }
  }
  @media(max-width:900px) {
    .af-hero h1 { font-size:36px; }
    .af-hero-stats { gap:24px; }
    .af-compare { grid-template-columns:1fr; }
    .af-svc-grid { grid-template-columns:1fr 1fr; }
    .af-adv-grid { grid-template-columns:1fr 1fr; }
    .af-carrier-grid { grid-template-columns:1fr; }
    .af-steps { grid-template-columns:repeat(2,1fr); }
    .af-doc-grid { grid-template-columns:1fr 1fr; }
  }
  @media(max-width:600px) {
    .af-hero { min-height:440px; }
    .af-hero h1 { font-size:28px; }
    .af-hero-inner { padding:60px 20px; }
    .af-hero-stats { flex-direction:column; gap:14px; }
    .af-svc-grid { grid-template-columns:1fr; }
    .af-adv-grid { grid-template-columns:1fr; }
    .af-steps { grid-template-columns:1fr; }
    .af-doc-grid { grid-template-columns:1fr; }
    .af-section { padding:52px 16px; }
    .af-section-hdr h2 { font-size:26px; }
    .af-cta h2 { font-size:26px; }
  }
`
