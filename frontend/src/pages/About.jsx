import React, { useEffect, useRef, useCallback, useState } from 'react'

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

import { useTranslation } from 'react-i18next'

const content = {
  vi: {
    kicker: "VỀ STELLA SHIPPING",
    hero_title: "Đối tác Logistics\nĐáng tin cậy\nĐông Nam Á",
    hero_lead: "Hơn 10 năm kết nối chuỗi cung ứng toàn cầu — từ cảng đến kho, từ hải quan tới giao nhận nội địa. Chúng tôi tối ưu chi phí, giảm rủi ro và đảm bảo thời gian giao hàng cho mọi quy mô doanh nghiệp.",
    req_consult: "Yêu cầu tư vấn",
    watch_video: "Xem video giới thiệu ▶",
    stat_years: "Năm kinh nghiệm",
    stat_countries: "Quốc gia kết nối",
    stat_clients: "Khách hàng tin tưởng",
    stat_ontime: "Giao hàng đúng hẹn",
    mv_kicker: "SỨ MỆNH & TẦM NHÌN",
    mv_title: "Kiến tạo chuỗi cung ứng bền vững",
    mv_desc: "Chúng tôi tin rằng logistics không chỉ là vận chuyển hàng hóa — mà là kết nối giá trị, tạo dựng lòng tin và thúc đẩy tăng trưởng cho doanh nghiệp Việt trên bản đồ toàn cầu.",
    mission: "Sứ mệnh",
    mission_desc: "Cung cấp giải pháp logistics tích hợp, tối ưu chi phí và thời gian cho doanh nghiệp Việt Nam. Chúng tôi cam kết mang đến dịch vụ chuyên nghiệp, minh bạch và đáng tin cậy — giúp khách hàng tập trung vào cốt lõi kinh doanh trong khi chúng tôi quản lý toàn bộ chuỗi cung ứng.",
    vision: "Tầm nhìn",
    vision_desc: "Trở thành đối tác logistics hàng đầu Đông Nam Á vào năm 2030, tiên phong ứng dụng công nghệ số hóa và phát triển bền vững trong chuỗi cung ứng. Chúng tôi hướng đến xây dựng mạng lưới kết nối liền mạch từ cảng biển đến tay người tiêu dùng.",
    story_kicker: "CÂU CHUYỆN CỦA CHÚNG TÔI",
    story_title: "Từ một văn phòng nhỏ đến mạng lưới toàn cầu",
    story_p1: "Stella Shipping được thành lập năm 2009 tại TP. Hồ Chí Minh với tầm nhìn đơn giản nhưng táo bạo: giúp doanh nghiệp vừa và nhỏ Việt Nam tiếp cận dịch vụ logistics quốc tế ở tiêu chuẩn cao nhất với chi phí hợp lý.",
    story_p2: "Sau hơn 15 năm phát triển, chúng tôi đã xây dựng được mạng lưới đối tác vận tải rộng khắp 120+ quốc gia, sở hữu hệ thống kho bãi hiện đại tại các cảng trọng điểm, và đội ngũ hơn 200 chuyên viên giàu kinh nghiệm.",
    story_li1: "Đội ngũ 200+ chuyên gia logistics quốc tế",
    story_li2: "Hệ thống kho bãi 15.000m² tại TP.HCM, Hà Nội và Đà Nẵng",
    story_li3: "Đối tác với 50+ hãng tàu và hãng hàng không quốc tế",
    story_li4: "Hệ thống tracking real-time và cổng khách hàng trực tuyến",
    tl_kicker: "CỘT MỐC PHÁT TRIỂN",
    tl_title: "Hành trình 10 năm kiến tạo giá trị",
    tl_desc: "Từ những bước đi đầu tiên đến vị thế hàng đầu khu vực — mỗi cột mốc đánh dấu sự nỗ lực không ngừng của đội ngũ Stella Shipping.",
    tl_1_title: "Thành lập Stella Shipping",
    tl_1_desc: "Khởi đầu với dịch vụ giao nhận nội địa và forwarding cơ bản tại TP.HCM. Đội ngũ ban đầu chỉ 5 người với tầm nhìn lớn.",
    tl_2_title: "Mở rộng ra miền Bắc",
    tl_2_desc: "Khai trương văn phòng Hà Nội, bổ sung dịch vụ vận tải biển quốc tế FCL/LCL và xử lý thủ tục hải quan.",
    tl_3_title: "Hệ thống kho bãi hiện đại",
    tl_3_desc: "Đầu tư 15.000m² kho bãi với hệ thống quản lý WMS tiên tiến, nâng cao năng lực lưu trữ và cross-docking.",
    tl_4_title: "Chuyển đổi số toàn diện",
    tl_4_desc: "Ra mắt cổng khách hàng online, hệ thống tracking real-time và API tích hợp ERP cho doanh nghiệp lớn.",
    vid_kicker: "VIDEO GIỚI THIỆU",
    vid_title: "Khám phá Stella Shipping qua góc nhìn thực tế",
    vid_desc: "Hãy cùng chúng tôi khám phá quy trình vận hành chuyên nghiệp — từ cảng biển đến kho hàng, từ thủ tục hải quan đến giao nhận tận nơi.",
    vid_btn: "Xem video giới thiệu công ty",
    cap_kicker: "NĂNG LỰC CỐT LÕI",
    cap_title: "Chuyên môn & Dịch vụ toàn diện",
    cap_desc: "Từ vận tải quốc tế đến giao nhận nội địa, chúng tôi cung cấp chuỗi dịch vụ khép kín đáp ứng mọi nhu cầu logistics của doanh nghiệp.",
    cap_1_title: "Vận tải biển (FCL & LCL)",
    cap_1_desc: "Booking container tuyến toàn cầu, đàm phán giá cước cạnh tranh với 50+ hãng tàu. Hỗ trợ hàng nguy hiểm, quá khổ và reefer.",
    cap_2_title: "Vận tải hàng không",
    cap_2_desc: "Dịch vụ air freight cho hàng khẩn cấp, giá trị cao. Kết nối các sân bay quốc tế lớn với thời gian transit nhanh nhất.",
    cap_3_title: "Vận tải đa phương thức",
    cap_3_desc: "Kết hợp đường biển – bộ – sắt – hàng không linh hoạt, tối ưu chi phí và thời gian cho từng lô hàng.",
    cap_4_title: "Kho bãi & Phân phối",
    cap_4_desc: "Hệ thống kho 15.000m² với WMS hiện đại. Dịch vụ cross-docking, pick-pack, quản lý tồn kho và last-mile delivery.",
    cap_5_title: "Thủ tục Hải quan",
    cap_5_desc: "Đội ngũ khai báo hải quan chuyên nghiệp, tư vấn mã HS, C/O, hồ sơ xuất nhập khẩu. Cam kết thông quan trong 24h.",
    cap_6_title: "Tư vấn chuỗi cung ứng",
    cap_6_desc: "Phân tích và tối ưu toàn bộ chuỗi cung ứng: lộ trình, chi phí, rủi ro. Giải pháp SCM tùy chỉnh cho từng ngành hàng.",
    net_kicker: "MẠNG LƯỚI TOÀN CẦU",
    net_title: "Kết nối mọi điểm đến trên thế giới",
    net_desc: "Với mạng lưới đại lý và đối tác vận tải rộng khắp, chúng tôi đảm bảo hàng hóa của bạn đến đúng nơi, đúng lúc.",
    net_1_title: "Châu Á – Thái Bình Dương",
    net_1_desc: "Trung Quốc, Nhật Bản, Hàn Quốc, Singapore, Thái Lan, Malaysia, Indonesia, Úc",
    net_2_title: "Châu Âu",
    net_2_desc: "Đức, Pháp, Hà Lan, Anh, Ý, Tây Ban Nha, Ba Lan, Thổ Nhĩ Kỳ",
    net_3_title: "Châu Mỹ",
    net_3_desc: "Hoa Kỳ, Canada, Mexico, Brazil, Chile, Colombia",
    net_4_title: "Trung Đông & Châu Phi",
    net_4_desc: "UAE, Ả Rập Saudi, Nam Phi, Kenya, Ai Cập, Nigeria",
    val_kicker: "GIÁ TRỊ CỐT LÕI",
    val_title: "Nguyên tắc dẫn dắt mọi hoạt động",
    val_1_title: "Uy tín & Minh bạch",
    val_1_desc: "Cam kết báo giá rõ ràng, không phát sinh chi phí ẩn. Hệ thống tracking minh bạch 24/7.",
    val_2_title: "Tốc độ & Hiệu quả",
    val_2_desc: "Quy trình chuẩn hóa, response time dưới 2 giờ. Tối ưu thời gian transit cho từng tuyến.",
    val_3_title: "Phát triển bền vững",
    val_3_desc: "Cam kết Net-Zero 2035. Ưu tiên giải pháp xanh, giảm carbon footprint trong vận tải.",
    val_4_title: "Đồng hành cùng khách hàng",
    val_4_desc: "Mỗi khách hàng đều có Account Manager riêng. Hỗ trợ tư vấn chiến lược chuỗi cung ứng dài hạn.",
    cert_kicker: "CHỨNG CHỈ & ĐỐI TÁC",
    cert_title: "Được chứng nhận bởi các tổ chức uy tín",
    cert_desc: "Chất lượng dịch vụ của chúng tôi được kiểm chứng và công nhận bởi các tiêu chuẩn quốc tế hàng đầu.",
    cert_1: "ISO 9001:2015\nQuản lý chất lượng",
    cert_2: "ISO 14001:2015\nQuản lý môi trường",
    cert_3: "AEO\nDoanh nghiệp ưu tiên",
    cert_4: "FIATA\nHiệp hội Giao nhận QT",
    cert_5: "IATA\nĐại lý hàng không",
    cert_6: "WCA\nMạng lưới Logistics TG",
    case_kicker: "CASE STUDY",
    case_title: "Câu chuyện thành công cùng khách hàng",
    case_sub: "Giảm 20% chi phí & rút ngắn 2 ngày giao hàng",
    case_client: "Khách hàng:",
    case_client_desc: "Doanh nghiệp sản xuất linh kiện điện tử xuất khẩu sang châu Âu, xử lý trung bình 120 container/tháng.",
    case_challenge: "Thách thức:",
    case_challenge_desc: "Chi phí logistics chiếm 18% giá thành sản phẩm, lead time kéo dài 28 ngày, thường xuyên phát sinh phí lưu container và trễ hải quan.",
    case_solution: "Giải pháp Stella:",
    case_sol_1: "Tối ưu lộ trình vận chuyển, chuyển sang gom hàng LCL cho lô nhỏ",
    case_sol_2: "Đàm phán hợp đồng dài hạn với 3 hãng tàu, giảm đơn giá 15%",
    case_sol_3: "Triển khai hệ thống hải quan điện tử, thời gian thông quan từ 3 ngày xuống 8 giờ",
    case_sol_4: "Tích hợp API tracking vào hệ thống ERP của khách hàng",
    cta_title: "Sẵn sàng tối ưu chuỗi cung ứng của bạn?",
    cta_desc: "Liên hệ ngay hôm nay để nhận tư vấn miễn phí từ đội ngũ chuyên gia logistics của Stella Shipping.",
    cta_btn_1: "Yêu cầu tư vấn miễn phí",
    cta_btn_2: "Tính cước vận chuyển"
  },
  en: {
    kicker: "ABOUT STELLA SHIPPING",
    hero_title: "Your Reliable\nLogistics Partner\nin Southeast Asia",
    hero_lead: "Over 10 years of connecting the global supply chain — from port to warehouse, customs to inland delivery. We optimize costs, reduce risks, and ensure timely delivery for businesses of all sizes.",
    req_consult: "Request Consultation",
    watch_video: "Watch Video ▶",
    stat_years: "Years of Experience",
    stat_countries: "Countries Connected",
    stat_clients: "Trusted Clients",
    stat_ontime: "On-time Delivery",
    mv_kicker: "MISSION & VISION",
    mv_title: "Creating a Sustainable Supply Chain",
    mv_desc: "We believe logistics is more than just moving goods — it's about connecting value, building trust, and driving growth for businesses on the global map.",
    mission: "Mission",
    mission_desc: "To provide integrated logistics solutions, optimizing costs and time for businesses. We commit to professional, transparent, and reliable services — allowing clients to focus on their core business while we manage the entire supply chain.",
    vision: "Vision",
    vision_desc: "To become a leading logistics partner in Southeast Asia by 2030, pioneering digitalization and sustainability in the supply chain. We aim to build a seamless network from seaport to end consumers.",
    story_kicker: "OUR STORY",
    story_title: "From a Small Office to a Global Network",
    story_p1: "Stella Shipping was founded in 2009 in Ho Chi Minh City with a simple yet bold vision: to help Vietnamese SMEs access international logistics services at the highest standards with reasonable costs.",
    story_p2: "After more than 15 years of development, we have built a transport partner network across 120+ countries, owning modern warehouse systems at key ports, and a team of over 200 experienced professionals.",
    story_li1: "Team of 200+ international logistics experts",
    story_li2: "15,000m² warehouse system in HCMC, Hanoi, and Da Nang",
    story_li3: "Partners with 50+ international shipping lines and airlines",
    story_li4: "Real-time tracking system and online customer portal",
    tl_kicker: "MILESTONES",
    tl_title: "A 10-Year Journey of Creating Value",
    tl_desc: "From our first steps to a leading regional position — each milestone marks the relentless effort of the Stella Shipping team.",
    tl_1_title: "Stella Shipping Established",
    tl_1_desc: "Started with domestic delivery and basic forwarding in HCMC. An initial team of 5 people with a big vision.",
    tl_2_title: "Expansion to the North",
    tl_2_desc: "Opened the Hanoi office, adding international sea freight FCL/LCL and customs clearance services.",
    tl_3_title: "Modern Warehouse System",
    tl_3_desc: "Invested in a 15,000m² warehouse with an advanced WMS, enhancing storage and cross-docking capabilities.",
    tl_4_title: "Comprehensive Digital Transformation",
    tl_4_desc: "Launched an online customer portal, real-time tracking, and ERP integration API for large enterprises.",
    vid_kicker: "INTRODUCTION VIDEO",
    vid_title: "Discover Stella Shipping in Reality",
    vid_desc: "Join us in exploring our professional operations — from seaport to warehouse, customs clearance to door delivery.",
    vid_btn: "Watch Company Introduction Video",
    cap_kicker: "CORE CAPABILITIES",
    cap_title: "Expertise & Comprehensive Services",
    cap_desc: "From international transport to inland delivery, we provide an end-to-end service chain meeting all your business logistics needs.",
    cap_1_title: "Ocean Freight (FCL & LCL)",
    cap_1_desc: "Global container booking, negotiating competitive rates with 50+ carriers. Support for dangerous goods, oversized, and reefer.",
    cap_2_title: "Air Freight",
    cap_2_desc: "Air freight for urgent, high-value goods. Connecting major international airports with the fastest transit times.",
    cap_3_title: "Intermodal Transport",
    cap_3_desc: "Flexible combination of sea, road, rail, and air, optimizing cost and time for every shipment.",
    cap_4_title: "Warehousing & Distribution",
    cap_4_desc: "15,000m² warehouse with modern WMS. Cross-docking, pick-pack, inventory management, and last-mile delivery.",
    cap_5_title: "Customs Clearance",
    cap_5_desc: "Professional customs declaration team, consulting on HS codes, C/O, and import-export documents. 24h clearance commitment.",
    cap_6_title: "Supply Chain Consulting",
    cap_6_desc: "Analyzing and optimizing the entire supply chain: routing, costs, risks. Customized SCM solutions for each industry.",
    net_kicker: "GLOBAL NETWORK",
    net_title: "Connecting Every Destination Worldwide",
    net_desc: "With an extensive network of agents and transport partners, we ensure your goods arrive at the right place, at the right time.",
    net_1_title: "Asia – Pacific",
    net_1_desc: "China, Japan, South Korea, Singapore, Thailand, Malaysia, Indonesia, Australia",
    net_2_title: "Europe",
    net_2_desc: "Germany, France, Netherlands, UK, Italy, Spain, Poland, Turkey",
    net_3_title: "Americas",
    net_3_desc: "USA, Canada, Mexico, Brazil, Chile, Colombia",
    net_4_title: "Middle East & Africa",
    net_4_desc: "UAE, Saudi Arabia, South Africa, Kenya, Egypt, Nigeria",
    val_kicker: "CORE VALUES",
    val_title: "Principles Guiding Our Operations",
    val_1_title: "Trust & Transparency",
    val_1_desc: "Commitment to clear quotes, no hidden costs. 24/7 transparent tracking system.",
    val_2_title: "Speed & Efficiency",
    val_2_desc: "Standardized processes, response time under 2 hours. Optimizing transit times for all routes.",
    val_3_title: "Sustainable Development",
    val_3_desc: "Net-Zero 2035 commitment. Prioritizing green solutions and reducing carbon footprint.",
    val_4_title: "Partnering with Clients",
    val_4_desc: "Dedicated Account Manager for each client. Long-term supply chain strategy consulting.",
    cert_kicker: "CERTIFICATIONS & PARTNERS",
    cert_title: "Certified by Reputable Organizations",
    cert_desc: "Our service quality is verified and recognized by top international standards.",
    cert_1: "ISO 9001:2015\nQuality Management",
    cert_2: "ISO 14001:2015\nEnvironmental Mgt.",
    cert_3: "AEO\nAuthorized Operator",
    cert_4: "FIATA\nIntl Forwarders",
    cert_5: "IATA\nAir Cargo Agent",
    cert_6: "WCA\nLogistics Network",
    case_kicker: "CASE STUDY",
    case_title: "Success Stories with Our Clients",
    case_sub: "Reducing Costs by 20% & Shortening Delivery by 2 Days",
    case_client: "Client:",
    case_client_desc: "An electronics manufacturer exporting to Europe, processing an average of 120 containers/month.",
    case_challenge: "Challenge:",
    case_challenge_desc: "Logistics costs accounted for 18% of product cost, lead time was 28 days, frequent demurrage fees and customs delays.",
    case_solution: "Stella's Solution:",
    case_sol_1: "Optimized transport routing, switching to LCL consolidation for small shipments",
    case_sol_2: "Negotiated long-term contracts with 3 carriers, reducing unit price by 15%",
    case_sol_3: "Implemented e-customs system, reducing clearance time from 3 days to 8 hours",
    case_sol_4: "Integrated tracking API into the client's ERP system",
    cta_title: "Ready to Optimize Your Supply Chain?",
    cta_desc: "Contact us today for a free consultation from Stella Shipping's logistics experts.",
    cta_btn_1: "Request Free Consultation",
    cta_btn_2: "Calculate Freight Quote"
  }
}

export default function About() {
  const { i18n } = useTranslation()
  const t = content[i18n.language === 'en' ? 'en' : 'vi']
  const pageRef = useScrollReveal()
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <main ref={pageRef}>
      <style>{aboutPageCSS}</style>

      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="abt-hero">
        <div className="container abt-hero-content">
          <div className="kicker reveal">{t.kicker}</div>
          <h1 className="reveal delay-1" style={{ whiteSpace: 'pre-line' }}>
            {t.hero_title}
          </h1>
          <p className="lead reveal delay-2">
            {t.hero_lead}
          </p>
          <div className="abt-hero-btns reveal delay-3">
            <a className="btn btn-primary" href="/contact">{t.req_consult}</a>
            <a className="btn-outline" href="#video-section">{t.watch_video}</a>
          </div>
        </div>
      </section>

      {/* ═══════════════ 2. STATS BAR ═══════════════ */}
      <section className="abt-section">
        <div className="abt-stats-bar">
          <StatItem value={10} suffix="+" label={t.stat_years} />
          <StatItem value={20} suffix="+" label={t.stat_countries} />
          <StatItem value={500} suffix="+" label={t.stat_clients} />
          <StatItem value={98} suffix="%" label={t.stat_ontime} />
        </div>
      </section>

      {/* ═══════════════ 3. SỨ MỆNH & TẦM NHÌN ═══════════════ */}
      <section className="abt-section abt-section-alt">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.mv_kicker}</div>
          <h2>{t.mv_title}</h2>
          <p>{t.mv_desc}</p>
        </div>
        <div className="abt-mv-grid">
          <div className="abt-mv-card reveal from-left">
            <div className="mv-icon">🎯</div>
            <h3>{t.mission}</h3>
            <p>{t.mission_desc}</p>
          </div>
          <div className="abt-mv-card reveal from-right delay-1">
            <div className="mv-icon">🌏</div>
            <h3>{t.vision}</h3>
            <p>{t.vision_desc}</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. CÂU CHUYỆN THƯƠNG HIỆU ═══════════════ */}
      <section className="abt-section">
        <div className="abt-story">
          <div className="abt-story-text reveal from-left">
            <div className="kicker" style={{ color: '#f36c1f', fontWeight: 700, letterSpacing: 3, fontSize: 12, marginBottom: 8 }}>{t.story_kicker}</div>
            <h2>{t.story_title}</h2>
            <p>{t.story_p1}</p>
            <p>{t.story_p2}</p>
            <ul>
              <li>{t.story_li1}</li>
              <li>{t.story_li2}</li>
              <li>{t.story_li3}</li>
              <li>{t.story_li4}</li>
            </ul>
          </div>
          <div className="abt-story-img reveal from-right delay-1">
            <img src="/Banner.jpg" alt="Câu chuyện Stella Shipping" />
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. LỊCH SỬ PHÁT TRIỂN ═══════════════ */}
      <section className="abt-section abt-section-alt">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.tl_kicker}</div>
          <h2>{t.tl_title}</h2>
          <p>{t.tl_desc}</p>
        </div>
        <div className="abt-timeline">
          {[
            { year: '2023', title: t.tl_1_title, desc: t.tl_1_desc },
            { year: '2024', title: t.tl_2_title, desc: t.tl_2_desc },
            { year: '2025', title: t.tl_3_title, desc: t.tl_3_desc },
            { year: '2026', title: t.tl_4_title, desc: t.tl_4_desc },

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
          <h2 className="reveal delay-1">{t.vid_title}</h2>
          <p className="reveal delay-2">{t.vid_desc}</p>
          <div className="abt-video-wrapper reveal scale-up delay-3">
            {videoPlaying ? (
              /* ── Thay URL video thật vào đây ── */
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="Stella Shipping Introduction"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div className="abt-video-placeholder" onClick={() => setVideoPlaying(true)}>
                <button className="abt-play-btn" aria-label="Play video">▶</button>
                <span>{t.vid_btn}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. NĂNG LỰC & DỊCH VỤ ═══════════════ */}
      <section className="abt-section">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.cap_kicker}</div>
          <h2>{t.cap_title}</h2>
          <p>{t.cap_desc}</p>
        </div>
        <div className="abt-cap-grid">
          {[
            { img: '/Banner.jpg', title: t.cap_1_title, desc: t.cap_1_desc },
            { img: '/AirFreight.jpg', title: t.cap_2_title, desc: t.cap_2_desc },
            { img: '/INTERMODA.jpg', title: t.cap_3_title, desc: t.cap_3_desc },
            { img: '/Logictis.jpg', title: t.cap_4_title, desc: t.cap_4_desc },
            { img: '/OURRANGE.jpg', title: t.cap_5_title, desc: t.cap_5_desc },
            { img: '/Shippinglines.jpg', title: t.cap_6_title, desc: t.cap_6_desc },
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
          <h2>{t.net_title}</h2>
          <p>{t.net_desc}</p>
        </div>
        <div className="abt-network-grid">
          {[
            { icon: '🌏', title: t.net_1_title, desc: t.net_1_desc },
            { icon: '🌍', title: t.net_2_title, desc: t.net_2_desc },
            { icon: '🌎', title: t.net_3_title, desc: t.net_3_desc },
            { icon: '🌍', title: t.net_4_title, desc: t.net_4_desc },
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
          <h2>{t.val_title}</h2>
        </div>
        <div className="abt-values-grid">
          {[
            { icon: '🛡️', title: t.val_1_title, desc: t.val_1_desc },
            { icon: '⚡', title: t.val_2_title, desc: t.val_2_desc },
            { icon: '🌱', title: t.val_3_title, desc: t.val_3_desc },
            { icon: '🤝', title: t.val_4_title, desc: t.val_4_desc },
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
          <h2>{t.cert_title}</h2>
          <p>{t.cert_desc}</p>
        </div>
        <div className="abt-cert-row">
          {[
            { icon: '🏆', label: t.cert_1 },
            { icon: '📋', label: t.cert_2 },
            { icon: '🔒', label: t.cert_3 },
            { icon: '🚢', label: t.cert_4 },
            { icon: '✈️', label: t.cert_5 },
            { icon: '📦', label: t.cert_6 },
          ].map((c, i) => (
            <div key={i} className={`abt-cert-item reveal delay-${Math.min(i + 1, 5)}`}>
              <div className="abt-cert-icon">{c.icon}</div>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 11. CASE STUDY ═══════════════ */}
      <section className="abt-section">
        <div className="abt-section-header reveal">
          <div className="kicker">{t.case_kicker}</div>
          <h2>{t.case_title}</h2>
        </div>
        <div className="abt-story">
          <div className="abt-story-img reveal from-left">
            <img src="/INTERMODA.jpg" alt="Case study logistics" />
          </div>
          <div className="abt-story-text reveal from-right delay-1">
            <h2>{t.case_sub}</h2>
            <p><strong>{t.case_client}</strong> {t.case_client_desc}</p>
            <p><strong>{t.case_challenge}</strong> {t.case_challenge_desc}</p>
            <p><strong>{t.case_solution}</strong></p>
            <ul>
              <li>{t.case_sol_1}</li>
              <li>{t.case_sol_2}</li>
              <li>{t.case_sol_3}</li>
              <li>{t.case_sol_4}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ 14. CTA BANNER ═══════════════ */}
      <section className="abt-cta-banner">
        <h2 className="reveal">{t.cta_title}</h2>
        <p className="reveal delay-1">{t.cta_desc}</p>
        <div className="abt-cta-btns reveal delay-2">
          <a href="/contact" className="cta-white">{t.cta_btn_1}</a>
          <a href="/pricing" className="cta-outline">{t.cta_btn_2}</a>
        </div>
      </section>

    </main>
  )
}
