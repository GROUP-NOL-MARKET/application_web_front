import React, { useState, useEffect } from "react";
import API from "../Authentification/api";
import AdBanner from "../AdBannerMobile";

const EnteteMobile = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const localCache = localStorage.getItem("bannersCache");

        // Charger immédiatement depuis le cache
        if (localCache) {
          const parsed = JSON.parse(localCache);
          setBanners(parsed);
        }

        // Fetch en arrière-plan
        const res = await API.get("/bannieres");
        const freshData = res.data.bannieres;

        // Si aucune différence → ne rien mettre à jour
        if (JSON.stringify(freshData) !== localCache) {
          setBanners(freshData);
          localStorage.setItem("bannersCache", JSON.stringify(freshData));
        }
      } catch (err) {
        console.error("Erreur fetch bannières", err);
      }
    };

    fetchBanners();

    // Mise à jour automatique après ajout côté admin
    const handler = () => fetchBanners();
    window.addEventListener("bannersUpdated", handler);

    return () => window.removeEventListener("bannersUpdated", handler);
  }, []);

  return (
    <div className="d-block d-lg-none">
      {banners.map((banner, index) => (
        <div className="container-fluid px-0" key={index}>
          <div className="banner overflow-hidden shadow-sm">
            <AdBanner
              imageUrl={banner.images}
              title="Promo exclusive !!!"
              subtitle={banner.subTitle}
              ctaText1="Jusqu'à"
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
