import React, { useState, useEffect } from "react";
import API from "../Authentification/api";
import AdBanner from "../AdBanner";

const EnteteMobile = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    API.get("/bannieres")
      .then((res) => setBanners(res.data.bannieres))
      .catch((err) => console.error("Erreur fetch bannières", err));
  }, []);
  return (
    <div>
      {banners.map((banner, index) => (
        <div className="container-fluid px-0 d-none d-lg-block" key={index}>
          <div className="banner overflow-hidden shadow-sm">
            <AdBanner
              imageUrl={banner.images}
              title="Promo exclusive !"
              subtitle={banner.subTitle}
              ctaText1="J'en profite"
              ctaText2={`-${banner.percent}%`}
              ctaLink={banner.link}
              pub_num={banner.phone}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnteteMobile;
