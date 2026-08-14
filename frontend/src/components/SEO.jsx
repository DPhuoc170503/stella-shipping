import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SEO({ 
  title, 
  description = "Stella Shipping - Giải pháp Logistics, Vận tải biển, Hàng không và Thủ tục Hải quan toàn diện cho doanh nghiệp.", 
  image = "http://localhost:3000/Banner.jpg", 
  url = "http://localhost:3000" 
}) {
  const siteTitle = "Stella Shipping"
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph tags (Facebook, Zalo) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
