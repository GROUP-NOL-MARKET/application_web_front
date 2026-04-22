const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

function sanitizePublicId(filename) {
    return filename
        .replace(/\.[^/.]+$/, '')          // retire l'extension
        .replace(/\s+/g, '_')              // espaces → underscores
        .replace(/[^a-zA-Z0-9_\-\/]/g, '') // caractères spéciaux
        .toLowerCase();
}

export function getProductImage(image, options = {}) {
    if (!image) return '/placeholder.png';

    const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
    const transforms = ['f_auto', 'q_auto'];
    if (options.width) transforms.push(`w_${options.width}`);
    if (options.height) transforms.push(`h_${options.height}`);
    const transformStr = transforms.join(',');

    // CAS 1 : déjà un public_id Cloudinary "products/mon_produit"
    if (image.includes('products/') && !image.includes('http')) {
        return `${base}/${transformStr}/${image}`;
    }

    // CAS 2 : URL locale complète "http://localhost:8000/storage/products/MON PRODUIT.avif"
    if (image.includes('http')) {
        const filename = image.split('/').pop(); // → "MON PRODUIT.avif"
        const publicId = 'products/' + sanitizePublicId(filename);
        return `${base}/${transformStr}/${publicId}`;
    }

    //  CAS 3 : simple nom de fichier "MON PRODUIT.avif"
    const publicId = 'products/' + sanitizePublicId(image);
    return `${base}/${transformStr}/${publicId}`;
}