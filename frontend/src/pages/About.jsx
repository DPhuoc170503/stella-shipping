import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

/* ─── Scroll-reveal hook ─── */
function useScrollReveal() {
  const containerRef = useRef(null)

  const observe = useCallback(() => {
    if (!containerRef.current) return
    const els = containerRef.current.querySelectorAll('.reveal')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const cleanup = observe()
    return cleanup
  }, [observe])

  return containerRef
}

/* ─── Animated counter hook ─── */
function useCounter(target, duration = 2000, startOnReveal = false) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (!startOnReveal || !ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const animate = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [target, duration, startOnReveal])

  return { count, ref }
}

function StatItem({ value, suffix = '', label }) {
  const { count, ref } = useCounter(value, 2200, true)
  return (
    <div className="abt-stat-item" ref={ref}>
      <span className="abt-stat-number">{count}{suffix}</span>
      <span className="abt-stat-label">{label}</span>
    </div>
  )
}

const t_ui = {
  vi: {
    kicker: "VỀ STELLA SHIPPING",
    hero_h1: "Đối tác Logistics\nĐáng tin cậy \nĐông Nam Á",
    hero_p: "Hơn 10 năm kết nối chuỗi cung ứng toàn cầu — từ cảng đến kho, từ hải quan tới giao nhận nội địa. Chúng tôi tối ưu chi phí, giảm rủi ro và đảm bảo thời gian giao hàng cho mọi quy mô doanh nghiệp.",
    btn_contact: "Yêu cầu tư vấn",
    btn_video: "Xem video giới thiệu ▶",
    stat_1: "Năm kinh nghiệm",
    stat_2: "Quốc gia kết nối",
    stat_3: "Khách hàng tin tưởng",
    stat_4: "Giao hàng đúng hẹn",
    mv_kicker: "SỨ MỆNH & TẦM NHÌN",
    mv_h2: "Kiến tạo chuỗi cung ứng bền vững",
    mv_p: "Chúng tôi tin rằng logistics không chỉ là vận chuyển hàng hóa — mà là kết nối giá trị, tạo dựng lòng tin và thúc đẩy tăng trưởng cho doanh nghiệp Việt trên bản đồ toàn cầu.",
    mission_title: "Sứ mệnh",
    mission_desc: "Cung cấp giải pháp logistics tích hợp, tối ưu chi phí và thời gian cho doanh nghiệp Việt Nam. Chúng tôi cam kết mang đến dịch vụ chuyên nghiệp, minh bạch và đáng tin cậy — giúp khách hàng tập trung vào cốt lõi kinh doanh trong khi chúng tôi quản lý toàn bộ chuỗi cung ứng.",
    vision_title: "Tầm nhìn",
    vision_desc: "Trở thành đối tác logistics hàng đầu Đông Nam Á vào năm 2030, tiên phong ứng dụng công nghệ số hóa và phát triển bền vững trong chuỗi cung ứng. Chúng tôi hướng đến xây dựng mạng lưới kết nối liền mạch từ cảng biển đến tay người tiêu dùng.",
    story_kicker: "CÂU CHUYỆN CỦA CHÚNG TÔI",
    story_h2: "Từ một văn phòng nhỏ đến mạng lưới toàn cầu",
    story_p1: "Stella Shipping được thành lập năm 2009 tại TP. Hồ Chí Minh với tầm nhìn đơn giản nhưng táo bạo: giúp doanh nghiệp vừa và nhỏ Việt Nam tiếp cận dịch vụ logistics quốc tế ở tiêu chuẩn cao nhất với chi phí hợp lý.",
    story_p2: "Sau hơn 15 năm phát triển, chúng tôi đã xây dựng được mạng lưới đối tác vận tải rộng khắp 120+ quốc gia, sở hữu hệ thống kho bãi hiện đại tại các cảng trọng điểm, và đội ngũ hơn 200 chuyên viên giàu kinh nghiệm.",
    story_l1: "Đội ngũ 200+ chuyên gia logistics quốc tế",
    story_l2: "Hệ thống kho bãi 15.000m² tại TP.HCM, Hà Nội và Đà Nẵng",
    story_l3: "Đối tác với 50+ hãng tàu và hãng hàng không quốc tế",
    story_l4: "Hệ thống tracking real-time và cổng khách hàng trực tuyến",
    tl_kicker: "CỘT MỐC PHÁT TRIỂN",
    tl_h2: "Hành trình 10 năm kiến tạo giá trị",
    tl_p: "Từ những bước đi đầu tiên đến vị thế hàng đầu khu vực — mỗi cột mốc đánh dấu sự nỗ lực không ngừng của đội ngũ Stella Shipping.",
    tl_list: [
      { year: '2023', title: 'Thành lập Stella Shipping', desc: 'Khởi đầu với dịch vụ giao nhận nội địa và forwarding cơ bản tại TP.HCM. Đội ngũ ban đầu chỉ 5 người với tầm nhìn lớn.' },
      { year: '2024', title: 'Mở rộng ra miền Bắc', desc: 'Khai trương văn phòng Hà Nội, bổ sung dịch vụ vận tải biển quốc tế FCL/LCL và xử lý thủ tục hải quan.' },
      { year: '2025', title: 'Hệ thống kho bãi hiện đại', desc: 'Đầu tư 15.000m² kho bãi với hệ thống quản lý WMS tiên tiến, nâng cao năng lực lưu trữ và cross-docking.' },
      { year: '2026', title: 'Chuyển đổi số toàn diện', desc: 'Ra mắt cổng khách hàng online, hệ thống tracking real-time và API tích hợp ERP cho doanh nghiệp lớn.' },
    ],
    vid_kicker: "VIDEO GIỚI THIỆU",
    vid_h2: "Khám phá Stella Shipping qua góc nhìn thực tế",
    vid_p: "Hãy cùng chúng tôi khám phá quy trình vận hành chuyên nghiệp — từ cảng biển đến kho hàng, từ thủ tục hải quan đến giao nhận tận nơi.",
    vid_watch: "Xem video giới thiệu công ty",
    cap_kicker: "NĂNG LỰC CỐT LÕI",
    cap_h2: "Chuyên môn & Dịch vụ toàn diện",
    cap_p: "Từ vận tải quốc tế đến giao nhận nội địa, chúng tôi cung cấp chuỗi dịch vụ khép kín đáp ứng mọi nhu cầu logistics của doanh nghiệp.",
    cap_list: [
      { title: 'Vận tải biển (FCL & LCL)', desc: 'Booking container tuyến toàn cầu, đàm phán giá cước cạnh tranh với 50+ hãng tàu. Hỗ trợ hàng nguy hiểm, quá khổ và reefer.' },
      { title: 'Vận tải hàng không', desc: 'Dịch vụ air freight cho hàng khẩn cấp, giá trị cao. Kết nối các sân bay quốc tế lớn với thời gian transit nhanh nhất.' },
      { title: 'Vận tải đa phương thức', desc: 'Kết hợp đường biển – bộ – sắt – hàng không linh hoạt, tối ưu chi phí và thời gian cho từng lô hàng.' },
      { title: 'Kho bãi & Phân phối', desc: 'Hệ thống kho 15.000m² với WMS hiện đại. Dịch vụ cross-docking, pick-pack, quản lý tồn kho và last-mile delivery.' },
      { title: 'Thủ tục Hải quan', desc: 'Đội ngũ khai báo hải quan chuyên nghiệp, tư vấn mã HS, C/O, hồ sơ xuất nhập khẩu. Cam kết thông quan trong 24h.' },
      { title: 'Tư vấn chuỗi cung ứng', desc: 'Phân tích và tối ưu toàn bộ chuỗi cung ứng: lộ trình, chi phí, rủi ro. Giải pháp SCM tùy chỉnh cho từng ngành hàng.' },
    ],
    net_kicker: "MẠNG LƯỚI TOÀN CẦU",
    net_h2: "Kết nối mọi điểm đến trên thế giới",
    net_p: "Với mạng lưới đại lý và đối tác vận tải rộng khắp, chúng tôi đảm bảo hàng hóa của bạn đến đúng nơi, đúng lúc.",
    net_list: [
      { title: 'Châu Á – Thái Bình Dương', desc: 'Trung Quốc, Nhật Bản, Hàn Quốc, Singapore, Thái Lan, Malaysia, Indonesia, Úc' },
      { title: 'Châu Âu', desc: 'Đức, Pháp, Hà Lan, Anh, Ý, Tây Ban Nha, Ba Lan, Thổ Nhĩ Kỳ' },
      { title: 'Châu Mỹ', desc: 'Hoa Kỳ, Canada, Mexico, Brazil, Chile, Colombia' },
      { title: 'Trung Đông & Châu Phi', desc: 'UAE, Ả Rập Saudi, Nam Phi, Kenya, Ai Cập, Nigeria' },
    ],
    val_kicker: "GIÁ TRỊ CỐT LÕI",
    val_h2: "Nguyên tắc dẫn dắt mọi hoạt động",
    val_list: [
      { title: 'Uy tín & Minh bạch', desc: 'Cam kết báo giá rõ ràng, không phát sinh chi phí ẩn. Hệ thống tracking minh bạch 24/7.' },
      { title: 'Tốc độ & Hiệu quả', desc: 'Quy trình chuẩn hóa, response time dưới 2 giờ. Tối ưu thời gian transit cho từng tuyến.' },
      { title: 'Phát triển bền vững', desc: 'Cam kết Net-Zero 2035. Ưu tiên giải pháp xanh, giảm carbon footprint trong vận tải.' },
      { title: 'Đồng hành cùng khách hàng', desc: 'Mỗi khách hàng đều có Account Manager riêng. Hỗ trợ tư vấn chiến lược chuỗi cung ứng dài hạn.' },
    ],
    cert_kicker: "CHỨNG CHỈ & ĐỐI TÁC",
    cert_h2: "Được chứng nhận bởi các tổ chức uy tín",
    cert_p: "Chất lượng dịch vụ của chúng tôi được kiểm chứng và công nhận bởi các tiêu chuẩn quốc tế hàng đầu.",
    cert_list: [
      'ISO 9001:2015\nQuản lý chất lượng',
      'ISO 14001:2015\nQuản lý môi trường',
      'AEO\nDoanh nghiệp ưu tiên',
      'FIATA\nHiệp hội Giao nhận QT',
      'IATA\nĐại lý hàng không',
      'WCA\nMạng lưới Logistics TG'
    ],
    cs_kicker: "CASE STUDY",
    cs_h2: "Câu chuyện thành công cùng khách hàng",
    cs_title: "Giảm 20% chi phí & rút ngắn 2 ngày giao hàng",
    cs_client: "Khách hàng:",
    cs_client_v: "Doanh nghiệp sản xuất linh kiện điện tử xuất khẩu sang châu Âu, xử lý trung bình 120 container/tháng.",
    cs_challenge: "Thách thức:",
    cs_challenge_v: "Chi phí logistics chiếm 18% giá thành sản phẩm, lead time kéo dài 28 ngày, thường xuyên phát sinh phí lưu container và trễ hải quan.",
    cs_solution: "Giải pháp Stella:",
    cs_sol_1: "Tối ưu lộ trình vận chuyển, chuyển sang gom hàng LCL cho lô nhỏ",
    cs_sol_2: "Đàm phán hợp đồng dài hạn với 3 hãng tàu, giảm đơn giá 15%",
    cs_sol_3: "Triển khai hệ thống hải quan điện tử, thời gian thông quan từ 3 ngày xuống 8 giờ",
    cs_sol_4: "Tích hợp API tracking vào hệ thống ERP của khách hàng",
    cta_h2: "Sẵn sàng tối ưu chuỗi cung ứng của bạn?",
    cta_p: "Liên hệ ngay hôm nay để nhận tư vấn miễn phí từ đội ngũ chuyên gia logistics của Stella Shipping.",
    cta_btn1: "Yêu cầu tư vấn miễn phí",
    cta_btn2: "Tính cước vận chuyển"
  },
  en: {
    kicker: "ABOUT STELLA SHIPPING",
    hero_h1: "Reliable Logistics\nPartner in\nSoutheast Asia",
    hero_p: "Over 10 years of connecting global supply chains — from ports to warehouses, customs to domestic delivery. We optimize costs, reduce risks, and ensure delivery times for businesses of all sizes.",
    btn_contact: "Request Consultation",
    btn_video: "Watch intro video ▶",
    stat_1: "Years of Experience",
    stat_2: "Connected Countries",
    stat_3: "Trusted Clients",
    stat_4: "On-time Delivery",
    mv_kicker: "MISSION & VISION",
    mv_h2: "Creating Sustainable Supply Chains",
    mv_p: "We believe that logistics is not just about transporting goods — it's about connecting values, building trust, and driving growth for Vietnamese enterprises on the global map.",
    mission_title: "Mission",
    mission_desc: "Providing integrated logistics solutions, optimizing costs and time for Vietnamese enterprises. We are committed to delivering professional, transparent, and reliable services — allowing clients to focus on their core business while we manage the entire supply chain.",
    vision_title: "Vision",
    vision_desc: "To become the leading logistics partner in Southeast Asia by 2030, pioneering the application of digital technology and sustainable development in the supply chain. We aim to build a seamless connection network from seaports to consumers.",
    story_kicker: "OUR STORY",
    story_h2: "From a small office to a global network",
    story_p1: "Stella Shipping was established in 2009 in Ho Chi Minh City with a simple but bold vision: to help Vietnamese SMEs access international logistics services at the highest standards with reasonable costs.",
    story_p2: "After more than 15 years of development, we have built a transportation partner network covering 120+ countries, owning modern warehouse systems at key ports, and a team of over 200 experienced experts.",
    story_l1: "A team of 200+ international logistics experts",
    story_l2: "15,000m² warehouse system in HCMC, Hanoi, and Da Nang",
    story_l3: "Partnerships with 50+ shipping lines and international airlines",
    story_l4: "Real-time tracking system and online customer portal",
    tl_kicker: "MILESTONES",
    tl_h2: "A 10-Year Journey of Creating Value",
    tl_p: "From the very first steps to the leading position in the region — every milestone marks the relentless efforts of the Stella Shipping team.",
    tl_list: [
      { year: '2023', title: 'Stella Shipping Established', desc: 'Started with domestic delivery and basic forwarding in HCMC. The initial team of just 5 people with a big vision.' },
      { year: '2024', title: 'Expansion to the North', desc: 'Opened the Hanoi office, added FCL/LCL international sea freight and customs clearance services.' },
      { year: '2025', title: 'Modern Warehouse System', desc: 'Invested in 15,000m² warehouse with an advanced WMS management system, enhancing storage and cross-docking capabilities.' },
      { year: '2026', title: 'Comprehensive Digital Transformation', desc: 'Launched the online customer portal, real-time tracking system, and API integration for large enterprises.' },
    ],
    vid_kicker: "INTRO VIDEO",
    vid_h2: "Explore Stella Shipping through a real-world perspective",
    vid_p: "Join us in exploring the professional operation process — from seaports to warehouses, from customs procedures to door-to-door delivery.",
    vid_watch: "Watch company intro video",
    cap_kicker: "CORE COMPETENCIES",
    cap_h2: "Expertise & Comprehensive Services",
    cap_p: "From international transport to domestic delivery, we provide a closed-loop service chain that meets all logistics needs of enterprises.",
    cap_list: [
      { title: 'Ocean Freight (FCL & LCL)', desc: 'Global container booking, negotiating competitive freight rates with 50+ shipping lines. Supporting dangerous, oversized, and reefer cargo.' },
      { title: 'Air Freight', desc: 'Air freight services for urgent, high-value cargo. Connecting major international airports with the fastest transit times.' },
      { title: 'Intermodal Transport', desc: 'Flexibly combining sea - land - rail - air, optimizing costs and time for each shipment.' },
      { title: 'Warehousing & Distribution', desc: '15,000m² warehouse system with modern WMS. Cross-docking, pick-pack, inventory management, and last-mile delivery services.' },
      { title: 'Customs Clearance', desc: 'Professional customs declaration team, consulting on HS codes, C/O, import-export documents. Committed to 24h clearance.' },
      { title: 'Supply Chain Consulting', desc: 'Analyzing and optimizing the entire supply chain: routes, costs, risks. Customized SCM solutions for each industry.' },
    ],
    net_kicker: "GLOBAL NETWORK",
    net_h2: "Connecting every destination in the world",
    net_p: "With an extensive network of agents and transport partners, we ensure your goods arrive at the right place, at the right time.",
    net_list: [
      { title: 'Asia - Pacific', desc: 'China, Japan, South Korea, Singapore, Thailand, Malaysia, Indonesia, Australia' },
      { title: 'Europe', desc: 'Germany, France, Netherlands, UK, Italy, Spain, Poland, Turkey' },
      { title: 'Americas', desc: 'USA, Canada, Mexico, Brazil, Chile, Colombia' },
      { title: 'Middle East & Africa', desc: 'UAE, Saudi Arabia, South Africa, Kenya, Egypt, Nigeria' },
    ],
    val_kicker: "CORE VALUES",
    val_h2: "Principles guiding all activities",
    val_list: [
      { title: 'Prestige & Transparency', desc: 'Committed to clear pricing, no hidden costs. 24/7 transparent tracking system.' },
      { title: 'Speed & Efficiency', desc: 'Standardized processes, response time under 2 hours. Optimizing transit time for each route.' },
      { title: 'Sustainable Development', desc: 'Committed to Net-Zero 2035. Prioritizing green solutions, reducing carbon footprints in transport.' },
      { title: 'Accompanying Clients', desc: 'Each client has a dedicated Account Manager. Support for long-term supply chain strategy consulting.' },
    ],
    cert_kicker: "CERTIFICATIONS & PARTNERS",
    cert_h2: "Certified by prestigious organizations",
    cert_p: "The quality of our services is verified and recognized by top international standards.",
    cert_list: [
      'ISO 9001:2015\nQuality Management',
      'ISO 14001:2015\nEnvironmental Mgt',
      'AEO\nAuthorized Operator',
      'FIATA\nIntl Forwarders Assoc',
      'IATA\nAirline Agent',
      'WCA\nGlobal Logistics Net'
    ],
    cs_kicker: "CASE STUDY",
    cs_h2: "Success stories with clients",
    cs_title: "Reducing costs by 20% & shortening delivery by 2 days",
    cs_client: "Client:",
    cs_client_v: "Enterprise manufacturing electronic components exported to Europe, handling an average of 120 containers/month.",
    cs_challenge: "Challenge:",
    cs_challenge_v: "Logistics costs accounted for 18% of product cost, lead time extended to 28 days, frequently incurring container storage fees and customs delays.",
    cs_solution: "Stella's Solution:",
    cs_sol_1: "Optimized transport routes, switched to LCL consolidation for small shipments",
    cs_sol_2: "Negotiated long-term contracts with 3 shipping lines, reducing unit prices by 15%",
    cs_sol_3: "Implemented e-customs system, reducing clearance time from 3 days to 8 hours",
    cs_sol_4: "Integrated tracking API into the client's ERP system",
    cta_h2: "Ready to optimize your supply chain?",
    cta_p: "Contact us today for a free consultation from Stella Shipping's logistics experts.",
    cta_btn1: "Request free consultation",
    cta_btn2: "Calculate freight rate"
  }
}


/* ─── CSS ─── */
const aboutPageCSS = `
  /* Reveal animations */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1);
    will-change: opacity, transform;
  }
  .reveal.from-left  { transform: translateX(-50px) translateY(0) }
  .reveal.from-right { transform: translateX(50px) translateY(0) }
  .reveal.scale-up   { transform: scale(.92) translateY(20px) }
  .reveal.revealed   { opacity:1; transform: translateY(0) translateX(0) scale(1) }
  .reveal.delay-1 { transition-delay:.1s }
  .reveal.delay-2 { transition-delay:.2s }
  .reveal.delay-3 { transition-delay:.3s }
  .reveal.delay-4 { transition-delay:.4s }
  .reveal.delay-5 { transition-delay:.5s }

  /* ── Hero ── */
  .abt-hero {
    position: relative; min-height: 480px; display: flex; align-items: center;
    background: url('/Banner.jpg') center/cover no-repeat; color: #fff;
  }
  .abt-hero::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(6,22,45,.78) 0%, rgba(15,43,87,.55) 60%, rgba(243,108,31,.15) 100%);
  }
  .abt-hero-content { position: relative; z-index: 2; max-width: 720px; padding: 72px 24px }
  .abt-hero-content .kicker {
    display: inline-block; color: #f36c1f; font-weight: 700; letter-spacing: 3px; font-size: 13px;
    border: 1px solid rgba(243,108,31,.4); padding: 5px 14px; border-radius: 20px; margin-bottom: 16px;
  }
  .abt-hero-content h1 { font-size: 48px; line-height: 1.1; margin: 0 0 18px; font-weight: 800 }
  .abt-hero-content .lead { font-size: 17px; color: rgba(255,255,255,.88); line-height: 1.65; max-width: 600px; margin-bottom: 24px }
  .abt-hero-btns { display: flex; gap: 14px; flex-wrap: wrap }
  .abt-hero-btns .btn-outline {
    background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.35); padding: 12px 22px;
    border-radius: 8px; font-weight: 600; text-decoration: none; transition: all .25s;
  }
  .abt-hero-btns .btn-outline:hover { background: rgba(255,255,255,.1); border-color: #fff }

  /* ── Section common ── */
  .abt-section { padding: 60px 24px }
  .abt-section-alt { background: #f5f8fb }
  .abt-section-dark { background: #0a1e3d; color: #fff }
  .abt-section-header { text-align: center; max-width: 680px; margin: 0 auto 40px }
  .abt-section-header .kicker { color: #f36c1f; font-weight: 700; letter-spacing: 3px; font-size: 12px; margin-bottom: 8px }
  .abt-section-header h2 { font-size: 34px; color: #0f2b57; margin: 0 0 12px; font-weight: 800 }
  .abt-section-dark .abt-section-header h2 { color: #fff }
  .abt-section-header p { color: #5a6f82; font-size: 15px; line-height: 1.65 }
  .abt-section-dark .abt-section-header p { color: rgba(255,255,255,.7) }

  /* ── Mission / Vision grid ── */
  .abt-mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; max-width: 1100px; margin: 0 auto }
  .abt-mv-card {
    background: #fff; border-radius: 14px; padding: 36px 28px; position: relative; overflow: hidden;
    box-shadow: 0 8px 32px rgba(10,20,40,.06); transition: transform .3s, box-shadow .3s;
  }
  .abt-mv-card:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(10,20,40,.1) }
  .abt-mv-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 5px; height: 100%;
    background: linear-gradient(180deg, #f36c1f, #e05a10);
  }
  .abt-mv-card .mv-icon { font-size: 32px; margin-bottom: 14px }
  .abt-mv-card h3 { font-size: 22px; color: #0f2b57; margin: 0 0 10px }
  .abt-mv-card p { color: #5a6f82; line-height: 1.65; margin: 0 }

  /* ── Stats bar ── */
  .abt-stats-bar {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
    max-width: 1100px; margin: 0 auto; padding: 40px 0;
  }
  .abt-stat-item { text-align: center }
  .abt-stat-number { display: block; font-size: 44px; font-weight: 800; color: #f36c1f }
  .abt-stat-label { display: block; font-size: 14px; color: #5a6f82; margin-top: 6px; letter-spacing: .5px }
  .abt-section-dark .abt-stat-label { color: rgba(255,255,255,.7) }

  /* ── Story (text + image) ── */
  .abt-story { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; max-width: 1100px; margin: 0 auto }
  .abt-story-text h2 { font-size: 30px; color: #0f2b57; margin: 0 0 14px; font-weight: 800 }
  .abt-story-text p { color: #5a6f82; line-height: 1.7; margin: 0 0 14px }
  .abt-story-text ul { padding-left: 18px; color: #5a6f82; line-height: 2 }
  .abt-story-text ul li::marker { color: #f36c1f }
  .abt-story-img { border-radius: 14px; overflow: hidden; box-shadow: 0 12px 40px rgba(10,20,40,.1) }
  .abt-story-img img { width: 100%; height: 100%; object-fit: cover; display: block }

  /* ── Timeline ── */
  .abt-timeline { position: relative; max-width: 800px; margin: 0 auto; padding-left: 40px }
  .abt-timeline::before {
    content: ''; position: absolute; left: 15px; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, #f36c1f, #0f2b57);
  }
  .abt-tl-item { position: relative; margin-bottom: 36px; padding-left: 20px }
  .abt-tl-item::before {
    content: ''; position: absolute; left: -29px; top: 6px; width: 14px; height: 14px;
    background: #f36c1f; border: 3px solid #fff; border-radius: 50%; box-shadow: 0 0 0 3px rgba(243,108,31,.25);
  }
  .abt-tl-year { font-weight: 800; color: #f36c1f; font-size: 18px; margin-bottom: 4px }
  .abt-tl-title { font-weight: 700; color: #0f2b57; font-size: 16px; margin-bottom: 4px }
  .abt-tl-desc { color: #5a6f82; font-size: 14px; line-height: 1.6 }

  /* ── Video section ── */
  .abt-video-section { position: relative; padding: 80px 24px; text-align: center; overflow: hidden }
  .abt-video-section::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #0a1e3d 0%, #153468 50%, #0f2b57 100%);
  }
  .abt-video-inner { position: relative; z-index: 2; max-width: 900px; margin: 0 auto }
  .abt-video-inner h2 { font-size: 32px; color: #fff; margin: 0 0 10px; font-weight: 800 }
  .abt-video-inner p { color: rgba(255,255,255,.7); margin-bottom: 32px; font-size: 15px }
  .abt-video-wrapper {
    position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 16px;
    overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.35);
    background: #000;
  }
  .abt-video-wrapper iframe,
  .abt-video-wrapper video {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;
  }
  .abt-video-placeholder {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center; cursor: pointer;
    background: linear-gradient(135deg, rgba(10,30,61,.85), rgba(15,43,87,.75)),
                url('/Banner.jpg') center/cover;
    transition: opacity .4s;
  }
  .abt-video-placeholder:hover { opacity: .92 }
  .abt-play-btn {
    width: 72px; height: 72px; border-radius: 50%; border: none;
    background: rgba(243,108,31,.9); color: #fff; font-size: 28px;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    box-shadow: 0 0 0 12px rgba(243,108,31,.2); transition: transform .3s, box-shadow .3s;
  }
  .abt-play-btn:hover { transform: scale(1.1); box-shadow: 0 0 0 18px rgba(243,108,31,.25) }
  .abt-video-placeholder span { color: rgba(255,255,255,.85); margin-top: 14px; font-weight: 600; font-size: 15px; letter-spacing: 1px }

  /* ── Services capabilities ── */
  .abt-cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto }
  .abt-cap-card {
    background: #fff; border-radius: 14px; overflow: hidden; transition: transform .3s, box-shadow .3s;
    box-shadow: 0 6px 24px rgba(10,20,40,.05);
  }
  .abt-cap-card:hover { transform: translateY(-6px); box-shadow: 0 16px 44px rgba(10,20,40,.1) }
  .abt-cap-card img { width: 100%; height: 180px; object-fit: cover }
  .abt-cap-card-body { padding: 20px }
  .abt-cap-card-body h4 { margin: 0 0 8px; color: #0f2b57; font-size: 17px }
  .abt-cap-card-body p { margin: 0; color: #5a6f82; font-size: 14px; line-height: 1.6 }

  /* ── Global network ── */
  .abt-network-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
    max-width: 1100px; margin: 0 auto;
  }
  .abt-network-card {
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
    border-radius: 12px; padding: 28px 20px; text-align: center;
    transition: background .3s, transform .3s;
  }
  .abt-network-card:hover { background: rgba(255,255,255,.1); transform: translateY(-4px) }
  .abt-network-card .net-icon { font-size: 28px; margin-bottom: 10px }
  .abt-network-card h4 { margin: 0 0 6px; color: #fff; font-size: 15px }
  .abt-network-card p { margin: 0; color: rgba(255,255,255,.6); font-size: 13px; line-height: 1.5 }

  /* ── Core values ── */
  .abt-values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1100px; margin: 0 auto }
  .abt-value-card { text-align: center; padding: 28px 18px }
  .abt-value-icon {
    width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 14px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(243,108,31,.12), rgba(243,108,31,.04));
    font-size: 26px;
  }
  .abt-value-card h4 { color: #0f2b57; margin: 0 0 8px; font-size: 16px }
  .abt-value-card p { color: #5a6f82; font-size: 13px; line-height: 1.6; margin: 0 }

  /* ── Certifications ── */
  .abt-cert-row {
    display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;
    max-width: 1100px; margin: 0 auto;
  }
  .abt-cert-item {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    padding: 18px 28px; background: #fff; border-radius: 12px;
    box-shadow: 0 4px 18px rgba(10,20,40,.05); transition: transform .3s;
  }
  .abt-cert-item:hover { transform: translateY(-3px) }
  .abt-cert-icon { font-size: 32px }
  .abt-cert-item span { font-size: 12px; color: #5a6f82; font-weight: 600; letter-spacing: .5px; text-align: center }

  /* ── Testimonials ── */
  .abt-testimonials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto }
  .abt-test-card {
    background: #fff; border-radius: 14px; padding: 28px; position: relative;
    box-shadow: 0 6px 24px rgba(10,20,40,.05);
  }
  .abt-test-card::before { content: '"'; position: absolute; top: 14px; left: 22px; font-size: 52px; color: rgba(243,108,31,.15); font-family: Georgia, serif; line-height: 1 }
  .abt-test-quote { color: #5a6f82; font-size: 14px; line-height: 1.65; margin: 12px 0 18px; font-style: italic }
  .abt-test-author { display: flex; align-items: center; gap: 12px }
  .abt-test-avatar {
    width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #0f2b57, #f36c1f);
    display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 16px;
  }
  .abt-test-info strong { display: block; color: #0f2b57; font-size: 14px }
  .abt-test-info span { color: #8a9bb0; font-size: 12px }

  /* ── Team ── */
  .abt-team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto }
  .abt-team-card { text-align: center }
  .abt-team-card .team-photo {
    width: 140px; height: 140px; border-radius: 50%; margin: 0 auto 14px;
    object-fit: cover; border: 4px solid #fff; box-shadow: 0 6px 20px rgba(10,20,40,.1);
  }
  .abt-team-card h4 { margin: 0 0 4px; color: #0f2b57; font-size: 16px }
  .abt-team-card .team-role { color: #f36c1f; font-size: 13px; font-weight: 600; margin-bottom: 6px }
  .abt-team-card p { color: #5a6f82; font-size: 13px; line-height: 1.5; margin: 0 }

  /* ── CTA banner ── */
  .abt-cta-banner {
    position: relative; padding: 72px 24px; text-align: center; overflow: hidden;
    background: linear-gradient(135deg, #f36c1f 0%, #e05a10 50%, #c94d0e 100%); color: #fff;
  }
  .abt-cta-banner h2 { font-size: 34px; margin: 0 0 12px; font-weight: 800 }
  .abt-cta-banner p { font-size: 16px; opacity: .9; max-width: 560px; margin: 0 auto 28px }
  .abt-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap }
  .abt-cta-btns a {
    padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none;
    transition: all .25s; font-size: 15px;
  }
  .abt-cta-btns .cta-white { background: #fff; color: #0f2b57 }
  .abt-cta-btns .cta-white:hover { background: #f0f4f8 }
  .abt-cta-btns .cta-outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.5) }
  .abt-cta-btns .cta-outline:hover { border-color: #fff; background: rgba(255,255,255,.1) }

  /* ── Responsive ── */
  @media(max-width: 900px) {
    .abt-hero-content h1 { font-size: 32px }
    .abt-mv-grid, .abt-story, .abt-cap-grid, .abt-testimonials, .abt-team-grid { grid-template-columns: 1fr }
    .abt-stats-bar, .abt-values-grid, .abt-network-grid { grid-template-columns: repeat(2, 1fr) }
    .abt-timeline { padding-left: 30px }
  }
  @media(max-width: 600px) {
    .abt-stats-bar, .abt-values-grid, .abt-network-grid { grid-template-columns: 1fr }
  }
`

export default function About() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'vi'
  const t = t_ui[lang]

  const pageRef = useScrollReveal()
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <main ref={pageRef}>
      <style>{aboutPageCSS}</style>

      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="abt-hero">
        <div className="container abt-hero-content">
          <div className="kicker reveal">{t.kicker}</div>
          <h1 className="reveal delay-1" style={{ whiteSpace: 'pre-line' }}>{t.hero_h1}</h1>
          <p className="lead reveal delay-2">{t.hero_p}</p>
          <div className="abt-hero-btns reveal delay-3">
            <a className="btn btn-primary" href="/contact">{t.btn_contact}</a>
            <a className="btn-outline" href="#video-section">{t.btn_video}</a>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. STATS BAR ═══════════════ */}
      <section className="abt-section">
        <div className="abt-stats-bar">
          <StatItem value={10} suffix="+" label={t.stat_1} />
          <StatItem value={20} suffix="+" label={t.stat_2} />
          <StatItem value={500} suffix="+" label={t.stat_3} />
          <StatItem value={98} suffix="%" label={t.stat_4} />
        </div>
      </section>

      {/* ═══════════════ 3. SỨ MỆNH & TẦM NHÌN ═══════════════ */}
      <section className="abt-section abt-section-alt">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.mv_kicker}</div>
          <h2>{t.mv_h2}</h2>
          <p>{t.mv_p}</p>
        </div>
        <div className="abt-mv-grid">
          <div className="abt-mv-card reveal from-left">
            <div className="mv-icon">🎯</div>
            <h3>{t.mission_title}</h3>
            <p>{t.mission_desc}</p>
          </div>
          <div className="abt-mv-card reveal from-right delay-1">
            <div className="mv-icon">🌏</div>
            <h3>{t.vision_title}</h3>
            <p>{t.vision_desc}</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. CÂU CHUYỆN THƯƠNG HIỆU ═══════════════ */}
      <section className="abt-section">
        <div className="abt-story">
          <div className="abt-story-text reveal from-left">
            <div className="kicker" style={{ color: '#f36c1f', fontWeight: 700, letterSpacing: 3, fontSize: 12, marginBottom: 8 }}>{t.story_kicker}</div>
            <h2>{t.story_h2}</h2>
            <p>{t.story_p1}</p>
            <p>{t.story_p2}</p>
            <ul>
              <li>{t.story_l1}</li>
              <li>{t.story_l2}</li>
              <li>{t.story_l3}</li>
              <li>{t.story_l4}</li>
            </ul>
          </div>
          <div className="abt-story-img reveal from-right delay-1">
            <img src="/Banner.jpg" alt={t.story_kicker} />
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. LỊCH SỬ PHÁT TRIỂN ═══════════════ */}
      <section className="abt-section abt-section-alt">
        <div className="abt-section-header reveal">
          <div className="kicker">CỘT MỐC PHÁT TRIỂN</div>
          <h2>Hành trình 10 năm kiến tạo giá trị</h2>
          <p>Từ những bước đi đầu tiên đến vị thế hàng đầu khu vực — mỗi cột mốc đánh dấu sự nỗ lực không ngừng của đội ngũ Stella Shipping.</p>
        </div>
        <div className="abt-timeline">
          {[
            { year: '2023', title: 'Thành lập Stella Shipping', desc: 'Khởi đầu với dịch vụ giao nhận nội địa và forwarding cơ bản tại TP.HCM. Đội ngũ ban đầu chỉ 5 người với tầm nhìn lớn.' },
            { year: '2024', title: 'Mở rộng ra miền Bắc', desc: 'Khai trương văn phòng Hà Nội, bổ sung dịch vụ vận tải biển quốc tế FCL/LCL và xử lý thủ tục hải quan.' },
            { year: '2025', title: 'Hệ thống kho bãi hiện đại', desc: 'Đầu tư 15.000m² kho bãi với hệ thống quản lý WMS tiên tiến, nâng cao năng lực lưu trữ và cross-docking.' },
            { year: '2026', title: 'Chuyển đổi số toàn diện', desc: 'Ra mắt cổng khách hàng online, hệ thống tracking real-time và API tích hợp ERP cho doanh nghiệp lớn.' },

          ].map((item, i) => (
            <div key={i} className={`abt-tl-item reveal delay-${Math.min(i + 1, 5)}`}>
              <div className="abt-tl-year">{item.year}</div>
              <div className="abt-tl-title">{item.title}</div>
              <div className="abt-tl-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 6. VIDEO GIỚI THIỆU ═══════════════ */}
      <section className="abt-video-section" id="video-section">
        <div className="abt-video-inner">
          <div className="kicker reveal" style={{ color: '#f36c1f', fontWeight: 700, letterSpacing: 3, fontSize: 12, marginBottom: 8 }}>{t.vid_kicker}</div>
          <h2 className="reveal delay-1">{t.vid_h2}</h2>
          <p className="reveal delay-2">{t.vid_p}</p>
          <div className="abt-video-wrapper reveal scale-up delay-3">
            {videoPlaying ? (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="Stella Shipping Introduction"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div className="abt-video-placeholder" onClick={() => setVideoPlaying(true)}>
                <button className="abt-play-btn" aria-label="Play video">▶</button>
                <span>{t.vid_watch}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. NĂNG LỰC & DỊCH VỤ ═══════════════ */}
      <section className="abt-section">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.cap_kicker}</div>
          <h2>{t.cap_h2}</h2>
          <p>{t.cap_p}</p>
        </div>
        <div className="abt-cap-grid">
          {[
            { img: '/Banner.jpg', ...t.cap_list[0] },
            { img: '/AirFreight.jpg', ...t.cap_list[1] },
            { img: '/INTERMODA.jpg', ...t.cap_list[2] },
            { img: '/Logictis.jpg', ...t.cap_list[3] },
            { img: '/OURRANGE.jpg', ...t.cap_list[4] },
            { img: '/Shippinglines.jpg', ...t.cap_list[5] }
          ].map((s, i) => (
            <div key={i} className={`abt-cap-card reveal delay-${Math.min(i + 1, 5)}`}>
              <img src={s.img} alt={s.title} />
              <div className="abt-cap-card-body">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 8. MẠNG LƯỚI TOÀN CẦU ═══════════════ */}
      <section className="abt-section abt-section-dark">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.net_kicker}</div>
          <h2>{t.net_h2}</h2>
          <p>{t.net_p}</p>
        </div>
        <div className="abt-network-grid">
          {[
            { icon: '🌏', ...t.net_list[0] },
            { icon: '🌍', ...t.net_list[1] },
            { icon: '🌎', ...t.net_list[2] },
            { icon: '🌍', ...t.net_list[3] }
          ].map((n, i) => (
            <div key={i} className={`abt-network-card reveal delay-${i + 1}`}>
              <div className="net-icon">{n.icon}</div>
              <h4>{n.title}</h4>
              <p>{n.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 9. GIÁ TRỊ CỐT LÕI ═══════════════ */}
      <section className="abt-section">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.val_kicker}</div>
          <h2>{t.val_h2}</h2>
        </div>
        <div className="abt-values-grid">
          {[
            { icon: '🛡️', ...t.val_list[0] },
            { icon: '⚡', ...t.val_list[1] },
            { icon: '🌱', ...t.val_list[2] },
            { icon: '🤝', ...t.val_list[3] }
          ].map((v, i) => (
            <div key={i} className={`abt-value-card reveal delay-${i + 1}`}>
              <div className="abt-value-icon">{v.icon}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 10. CHỨNG CHỈ & ĐỐI TÁC ═══════════════ */}
      <section className="abt-section abt-section-alt">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.cert_kicker}</div>
          <h2>{t.cert_h2}</h2>
          <p>{t.cert_p}</p>
        </div>
        <div className="abt-cert-row">
          {[
            { icon: '🏆', label: t.cert_list[0] },
            { icon: '📋', label: t.cert_list[1] },
            { icon: '🔒', label: t.cert_list[2] },
            { icon: '🚢', label: t.cert_list[3] },
            { icon: '✈️', label: t.cert_list[4] },
            { icon: '📦', label: t.cert_list[5] }
          ].map((c, i) => (
            <div key={i} className={`abt-cert-item reveal delay-${Math.min(i + 1, 5)}`}>
              <div className="abt-cert-icon">{c.icon}</div>
              <span style={{ whiteSpace: 'pre-line' }}>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 11. CASE STUDY ═══════════════ */}
      <section className="abt-section">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.cs_kicker}</div>
          <h2>{t.cs_h2}</h2>
        </div>
        <div className="abt-story">
          <div className="abt-story-img reveal from-left">
            <img src="/INTERMODA.jpg" alt="Case study logistics" />
          </div>
          <div className="abt-story-text reveal from-right delay-1">
            <h2>{t.cs_title}</h2>
            <p><strong>{t.cs_client}</strong> {t.cs_client_v}</p>
            <p><strong>{t.cs_challenge}</strong> {t.cs_challenge_v}</p>
            <p><strong>{t.cs_solution}</strong></p>
            <ul>
              <li>{t.cs_sol_1}</li>
              <li>{t.cs_sol_2}</li>
              <li>{t.cs_sol_3}</li>
              <li>{t.cs_sol_4}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ 14. CTA BANNER ═══════════════ */}
      <section className="abt-cta-banner">
        <h2 className="reveal">{t.cta_h2}</h2>
        <p className="reveal delay-1">{t.cta_p}</p>
        <div className="abt-cta-btns reveal delay-2">
          <a href="/contact" className="cta-white">{t.cta_btn1}</a>
          <a href="/pricing" className="cta-outline">{t.cta_btn2}</a>
        </div>
      </section>

    </main>
  )
}
