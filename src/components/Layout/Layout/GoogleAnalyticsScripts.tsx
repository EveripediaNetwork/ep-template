import { getCachedUserAddress } from '@/utils/getCachedUserAddress'
import Script from 'next/script'
import React from 'react'

const GoogleAnalyticsScripts = () => {
  return (
    <>
      <Script
        id="google-analytics"
        strategy="worker"
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics-config" strategy="worker" defer>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            user_id: '${getCachedUserAddress()}',
            page_path: window.location.pathname,
            send_page_view: false
            });
          `}
      </Script>
    </>
  )
}

export default GoogleAnalyticsScripts
