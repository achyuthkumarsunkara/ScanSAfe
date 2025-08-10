import React, { useEffect } from 'react';
import Head from 'next/head';

interface AdSenseAdProps {
  slot: string;
  format?: string;
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({ 
  slot, 
  format = "auto",
  responsive = true 
}) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1723764705697822"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </>
  );
};

export default AdSenseAd;