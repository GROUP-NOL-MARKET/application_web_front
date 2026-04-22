import { createContext, useContext, useState } from "react";

const ImageCacheContext = createContext();

export const ImageCacheProvider = ({ children }) => {
    const [carouselImages, setCarouselImages] = useState([]);
    const [banners, setBanners] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    return (
        <ImageCacheContext.Provider
            value={{
                carouselImages,
                setCarouselImages,
                banners,
                setBanners,
                imagesLoaded,
                setImagesLoaded
            }}
        >
            {children}
        </ImageCacheContext.Provider>
    );
};

export const useImageCache = () => useContext(ImageCacheContext);