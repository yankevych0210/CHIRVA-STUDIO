import type React from 'react';
import { PHOTO_SIZE, photoUrl, type PhotoName } from '../lib/photos';

interface PhotoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  name: PhotoName;
  /** Rendered width hint for the browser, e.g. "(min-width: 1024px) 33vw, 50vw" */
  sizes: string;
  alt: string;
}

export const Photo: React.FC<PhotoProps> = ({ name, sizes, alt, loading = 'lazy', ...rest }) => (
  <img
    src={photoUrl(name)}
    srcSet={`${photoUrl(name, 480)} 480w, ${photoUrl(name)} 960w`}
    sizes={sizes}
    alt={alt}
    loading={loading}
    decoding="async"
    {...PHOTO_SIZE[name]}
    {...rest}
  />
);
