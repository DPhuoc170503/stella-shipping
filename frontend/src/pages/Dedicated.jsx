import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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

  }, [ref])
}

import { useTranslation } from 'react-i18next'

const t_services = {
  vi: [
    { icon: '📋', title: 'Khai báo Hải quan Điện tử', desc: 'Khai báo qua hệ thống VNACCS/VCIS. Đội ngũ chuyên viên xử lý nhanh chóng, chính xác. Hỗ trợ khai báo 24/7 cho hàng khẩn.', highlight: 'Thông quan trong 24 giờ' },
    { icon: '🔍', title: 'Phân loại mã HS', desc: 'Tư vấn và xác định mã HS chính xác cho hàng hóa. Giúp tối ưu thuế suất và tránh rủi ro bị phạt do sai phân loại.', highlight: 'Hệ thống mã HS 8 chữ số' },
    { icon: '📄', title: 'Chứng nhận xuất xứ (C/O)', desc: 'Hỗ trợ xin C/O form AK, D, E, EUR.1, VJ... Tận dụng tối đa ưu đãi thuế quan từ các FTA mà Việt Nam đã ký kết.', highlight: '15+ form C/O' },
    { icon: '🚫', title: 'Xin giấy phép XNK đặc biệt', desc: 'Xử lý giấy phép cho hàng kiểm dịch, an toàn thực phẩm, ĐKPL, hàng hóa có điều kiện từ các Bộ ngành liên quan.', highlight: 'Bộ Y tế, NN&PTNT, Công Thương' },
    { icon: '⚖️', title: 'Tư vấn thuế XNK', desc: 'Tính toán thuế nhập khẩu, thuế GTGT, thuế TTĐB, thuế tự vệ. Hỗ trợ hoàn thuế, miễn thuế cho hàng gia công/SXXK.', highlight: 'Tiết kiệm đến 15% thuế' },
    { icon: '🔒', title: 'Kiểm tra sau thông quan', desc: 'Tư vấn và chuẩn bị hồ sơ cho kiểm tra sau thông quan. Lưu trữ chứng từ đúng quy định 5 năm. Đại diện doanh nghiệp làm việc với Hải quan.', highlight: 'Hỗ trợ audit 5 năm' },
  ],
  en: [
    { icon: '📋', title: 'Electronic Customs Declaration', desc: 'Declaration via VNACCS/VCIS system. Fast and accurate processing by experts. 24/7 support for urgent shipments.', highlight: 'Clearance within 24 hours' },
    { icon: '🔍', title: 'HS Code Classification', desc: 'Consulting and determining the correct HS code for goods. Optimizes tax rates and avoids penalties for misclassification.', highlight: '8-digit HS code system' },
    { icon: '📄', title: 'Certificate of Origin (C/O)', desc: 'Support applying for C/O forms AK, D, E, EUR.1, VJ... Maximize tariff preferences from FTAs signed by Vietnam.', highlight: '15+ C/O forms' },
    { icon: '🚫', title: 'Special Import/Export Licenses', desc: 'Process licenses for quarantine, food safety, and conditional goods from relevant ministries.', highlight: 'MOH, MARD, MOIT' },
    { icon: '⚖️', title: 'Import/Export Tax Consulting', desc: 'Calculate import tax, VAT, SCT, safeguard tax. Support tax refunds and exemptions for processing/export manufacturing goods.', highlight: 'Save up to 15% on taxes' },
    { icon: '🔒', title: 'Post-Clearance Audit', desc: 'Consulting and preparing documents for post-clearance audit. Store documents correctly for 5 years. Represent business in working with Customs.', highlight: '5-year audit support' },
  ]
}

const t_aeo_benefits = {
  vi: [
    { icon: '⚡', title: 'Thông quan ưu tiên', desc: 'Giảm tỷ lệ kiểm tra hàng hóa xuống dưới 5%. Ưu tiên xử lý hồ sơ tại cửa khẩu.' },
    { icon: '💳', title: 'Ưu đãi thuế', desc: 'Nộp thuế gộp vào ngày 10 tháng sau. Không phải nộp bảo lãnh thuế cho từng lô hàng.' },
    { icon: '🌏', title: 'Công nhận quốc tế', desc: 'MRA (Mutual Recognition) với Hàn Quốc, Nhật Bản. Hưởng ưu đãi tương đương tại các nước đối tác.' },
    { icon: '📊', title: 'Giảm chi phí vận hành', desc: 'Tiết kiệm 30–50% thời gian thông quan. Giảm chi phí lưu kho, demurrage tại cảng.' },
  ],
  en: [
    { icon: '⚡', title: 'Priority Clearance', desc: 'Reduce goods inspection rate to under 5%. Priority document processing at checkpoints.' },
    { icon: '💳', title: 'Tax Incentives', desc: 'Consolidated tax payment on the 10th of next month. No need for tax guarantees for each shipment.' },
    { icon: '🌏', title: 'International Recognition', desc: 'MRA (Mutual Recognition) with South Korea, Japan. Enjoy equivalent preferences in partner countries.' },
    { icon: '📊', title: 'Reduce Operating Costs', desc: 'Save 30–50% clearance time. Reduce storage costs and demurrage at the port.' },
  ]
}

const t_documents = {
  vi: [
    { name: 'Bill of Lading (B/L)', desc: 'Vận đơn đường biển — chứng từ sở hữu hàng hóa' },
    { name: 'Invoice (Hóa đơn thương mại)', desc: 'Thể hiện giá trị, điều kiện mua bán hàng hóa' },
    { name: 'Packing List', desc: 'Chi tiết đóng gói: số kiện, trọng lượng, thể tích' },
    { name: 'Certificate of Origin (C/O)', desc: 'Chứng nhận xuất xứ — hưởng ưu đãi thuế FTA' },
    { name: 'Tờ khai Hải quan', desc: 'Khai báo điện tử qua VNACCS/VCIS' },
    { name: 'Giấy phép chuyên ngành', desc: 'Kiểm dịch, ATTP, ĐKPL... tùy loại hàng hóa' },
  ],
  en: [
    { name: 'Bill of Lading (B/L)', desc: 'Ocean Bill of Lading — document of title to the goods' },
    { name: 'Commercial Invoice', desc: 'Shows the value and conditions of the goods sold' },
    { name: 'Packing List', desc: 'Packaging details: number of packages, weight, volume' },
    { name: 'Certificate of Origin (C/O)', desc: 'Certificate of origin — enjoy FTA tax preferences' },
    { name: 'Customs Declaration', desc: 'Electronic declaration via VNACCS/VCIS' },
    { name: 'Specialized Licenses', desc: 'Quarantine, Food Safety... depending on cargo type' },
  ]
}

const t_ui = {
  vi: {
    back: "← Quay lại Dịch vụ",
    badge: "CUSTOMS BROKERAGE",
    title: "Thủ tục",
    subtitle: "Hải quan",
    desc: "Đội ngũ chuyên viên hải quan giàu kinh nghiệm. Tư vấn mã HS, C/O, xử lý hồ sơ XNK. Cam kết thông quan trong 24 giờ. Doanh nghiệp đạt chứng nhận AEO (Ưu tiên Hải quan).",
    stat_1_val: "10+", stat_1_lbl: "Năm kinh nghiệm",
    stat_2_val: "24h", stat_2_lbl: "Cam kết thông quan",
    stat_3_val: "5.000+", stat_3_lbl: "Tờ khai/năm",
    stat_4_val: "AEO", stat_4_lbl: "Chứng nhận ưu tiên",
    svc_kicker: "DỊCH VỤ HẢI QUAN",
    svc_title: "Giải pháp thông quan toàn diện",
    aeo_kicker: "CHỨNG NHẬN AEO",
    aeo_title: "Doanh nghiệp Ưu tiên Hải quan",
    aeo_desc: "Stella Shipping là một trong số ít doanh nghiệp logistics Việt Nam được Tổng Cục Hải Quan công nhận AEO.",
    doc_kicker: "CHỨNG TỪ CẦN THIẾT",
    doc_title: "Bộ chứng từ xuất nhập khẩu cơ bản",
    cta_title: "Cần hỗ trợ thủ tục hải quan?",
    cta_desc: "Đội ngũ chuyên viên sẵn sàng tư vấn miễn phí về mã HS, thuế suất và quy trình thông quan.",
    cta_btn1: "Liên hệ tư vấn miễn phí",
    cta_btn2: "Xem bảng giá →",
  },
  en: {
    back: "← Back to Services",
    badge: "CUSTOMS BROKERAGE",
    title: "Customs",
    subtitle: "Brokerage",
    desc: "Experienced customs expert team. Consulting on HS code, C/O, handling import/export documents. 24-hour clearance commitment. AEO certified (Authorized Economic Operator).",
    stat_1_val: "10+", stat_1_lbl: "Years of Experience",
    stat_2_val: "24h", stat_2_lbl: "Clearance Commitment",
    stat_3_val: "5,000+", stat_3_lbl: "Declarations/Year",
    stat_4_val: "AEO", stat_4_lbl: "Priority Certification",
    svc_kicker: "CUSTOMS SERVICES",
    svc_title: "Comprehensive Clearance Solutions",
    aeo_kicker: "AEO CERTIFICATION",
    aeo_title: "Authorized Economic Operator",
    aeo_desc: "Stella Shipping is one of the few Vietnamese logistics companies recognized as AEO by the General Department of Customs.",
    doc_kicker: "REQUIRED DOCUMENTS",
    doc_title: "Basic Import/Export Document Set",
    cta_title: "Need help with customs procedures?",
    cta_desc: "Our expert team is ready for free consultation on HS codes, tax rates, and clearance processes.",
    cta_btn1: "Contact for Free Consultation",
    cta_btn2: "View Pricing →",
  }
}

export default function Dedicated() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'vi'
  const t = t_ui[lang]
  const SERVICES = t_services[lang]
  const AEO_BENEFITS = t_aeo_benefits[lang]
  const DOCUMENTS = t_documents[lang]

  const pageRef = useRef(null)
  useReveal(pageRef)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div ref={pageRef}>
      <style>{css}</style>

      <section className="dd-hero">
        <div className="dd-hero-overlay" />
        <div className="dd-hero-inner">
          <Link to="/services" className="dd-back rv">{t.back}</Link>
          <div className="dd-badge rv">{t.badge}</div>
          <h1 className="rv d1">{t.title}<br /><span>{t.subtitle}</span></h1>
          <p className="rv d2">{t.desc}</p>
          <div className="dd-hero-stats rv d3">
            <div><strong>{t.stat_1_val}</strong><span>{t.stat_1_lbl}</span></div>
            <div><strong>{t.stat_2_val}</strong><span>{t.stat_2_lbl}</span></div>
            <div><strong>{t.stat_3_val}</strong><span>{t.stat_3_lbl}</span></div>
            <div><strong>{t.stat_4_val}</strong><span>{t.stat_4_lbl}</span></div>
          </div>
        </div>
      </section>

      <section className="dd-section">
        <div className="dd-hdr rv"><div className="kicker">{t.svc_kicker}</div><h2>{t.svc_title}</h2></div>
        <div className="dd-svc-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className={`dd-svc-card rv d${(i % 4) + 1}`}>
              <div className="dd-svc-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <div className="dd-highlight">✓ {s.highlight}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="dd-section dd-section-alt">
        <div className="dd-hdr rv"><div className="kicker">{t.aeo_kicker}</div><h2>{t.aeo_title}</h2><p style={{maxWidth:640,margin:'12px auto 0',color:'#5a6f82'}}>{t.aeo_desc}</p></div>
        <div className="dd-aeo-grid">
          {AEO_BENEFITS.map((b, i) => (
            <div key={i} className={`dd-aeo-card rv d${i + 1}`}>
              <div className="dd-aeo-icon">{b.icon}</div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dd-section">
        <div className="dd-hdr rv"><div className="kicker">{t.doc_kicker}</div><h2>{t.doc_title}</h2></div>
        <div className="dd-doc-grid rv">
          {DOCUMENTS.map((d, i) => (
            <div key={i} className="dd-doc-item">
              <div className="dd-doc-num">{String(i + 1).padStart(2, '0')}</div>
              <div><strong>{d.name}</strong><p>{d.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="dd-cta rv">
        <h2>{t.cta_title}</h2>
        <p>{t.cta_desc}</p>
        <div className="dd-cta-btns">
          <Link to="/contact" className="btn btn-primary">{t.cta_btn1}</Link>
          <Link to="/pricing" className="dd-cta-ghost">{t.cta_btn2}</Link>
        </div>
      </section>
    </div>
  )
}

const css = `
  .dd-hero{position:relative;min-height:480px;display:flex;align-items:center;color:#fff;overflow:hidden;margin:-24px -24px 0 -24px}
  .dd-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,43,87,.92),rgba(21,52,104,.85)),url('/OURRANGE.jpg') center/cover;z-index:1}
  .dd-hero-inner{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:80px 32px;width:100%}
  .dd-back{color:rgba(255,255,255,.6);text-decoration:none;font-size:14px;display:inline-block;margin-bottom:24px;transition:color .2s}.dd-back:hover{color:#fff}
  .dd-badge{display:inline-block;background:#f36c1f;padding:6px 16px;border-radius:4px;font-size:12px;font-weight:700;letter-spacing:2px;margin-bottom:20px}
  .dd-hero h1{font-size:52px;margin:0 0 20px;line-height:1.15;font-weight:800}.dd-hero h1 span{color:#f36c1f}
  .dd-hero p{max-width:640px;color:rgba(255,255,255,.8);font-size:17px;line-height:1.7;margin-bottom:36px}
  .dd-hero-stats{display:flex;gap:40px;flex-wrap:wrap}
  .dd-hero-stats>div{text-align:center}
  .dd-hero-stats strong{display:block;font-size:36px;font-weight:800;color:#f36c1f}
  .dd-hero-stats span{font-size:13px;color:rgba(255,255,255,.7)}

  .dd-section{padding:72px 24px;max-width:1200px;margin:0 auto}
  .dd-section-alt{background:#f7f9fb;max-width:100%;padding-left:calc((100% - 1200px)/2 + 24px);padding-right:calc((100% - 1200px)/2 + 24px)}
  .dd-hdr{text-align:center;margin-bottom:48px}
  .dd-hdr .kicker{color:#f36c1f;font-size:12px;font-weight:700;letter-spacing:3px;margin-bottom:10px}
  .dd-hdr h2{font-size:34px;color:#0f2b57;font-weight:800;margin:0}

  .dd-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .dd-svc-card{background:#fff;padding:28px;border-radius:14px;box-shadow:0 6px 24px rgba(10,20,40,.05);transition:transform .3s,box-shadow .3s}
  .dd-svc-card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(10,20,40,.1)}
  .dd-svc-icon{font-size:36px;margin-bottom:14px}
  .dd-svc-card h4{color:#0f2b57;font-size:17px;margin:0 0 10px;font-weight:700}
  .dd-svc-card p{color:#5a6f82;font-size:14px;line-height:1.6;margin:0 0 14px}
  .dd-highlight{font-size:12px;color:#f36c1f;font-weight:700;padding:8px 12px;background:#fff5f0;border-radius:6px;display:inline-block}

  .dd-aeo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
  .dd-aeo-card{background:#fff;padding:28px;border-radius:12px;box-shadow:0 4px 20px rgba(10,20,40,.05);text-align:center;transition:transform .3s}
  .dd-aeo-card:hover{transform:translateY(-4px)}
  .dd-aeo-icon{font-size:40px;margin-bottom:12px}
  .dd-aeo-card h4{color:#0f2b57;margin:0 0 8px;font-weight:700}
  .dd-aeo-card p{color:#5a6f82;font-size:13.5px;line-height:1.55;margin:0}

  .dd-doc-grid{max-width:800px;margin:0 auto}
  .dd-doc-item{display:flex;gap:20px;align-items:flex-start;padding:20px 0;border-bottom:1px solid #f0f2f5}
  .dd-doc-item:last-child{border-bottom:none}
  .dd-doc-num{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0f2b57,#1a4a8a);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}
  .dd-doc-item strong{color:#0f2b57;font-size:15px}
  .dd-doc-item p{margin:4px 0 0;color:#5a6f82;font-size:13.5px}

  .dd-cta{text-align:center;padding:72px 24px;background:linear-gradient(135deg,#0f2b57,#153468);color:#fff;margin:0 -24px -24px -24px}
  .dd-cta h2{font-size:34px;margin:0 0 14px;font-weight:800}
  .dd-cta p{color:rgba(255,255,255,.75);font-size:16px;margin-bottom:32px}
  .dd-cta-btns{display:flex;gap:16px;justify-content:center;align-items:center}
  .dd-cta-ghost{color:rgba(255,255,255,.8);text-decoration:none;font-weight:600;transition:color .2s}.dd-cta-ghost:hover{color:#fff}

  .rv{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.rvd{opacity:1;transform:translateY(0)}
  .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}

  @media(max-width:900px){.dd-hero h1{font-size:34px}.dd-svc-grid{grid-template-columns:1fr 1fr}.dd-aeo-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:600px){.dd-svc-grid,.dd-aeo-grid{grid-template-columns:1fr}.dd-hero-stats{flex-direction:column;gap:12px}}
`
