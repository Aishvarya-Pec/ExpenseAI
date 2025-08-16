import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { imageService, UnsplashImage } from '../../utils/imageService';

interface SmartImageProps {
  query?: string;
  category?: string;
  className?: string;
  alt?: string;
  size?: 'thumb' | 'small' | 'regular' | 'full';
  customSize?: { width: number; height: number };
  lazy?: boolean;
  showCredits?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const SmartImage: React.FC<SmartImageProps> = ({
  query = 'technology',
  category,
  className = '',
  alt,
  size = 'regular',
  customSize,
  lazy = true,
  showCredits = false,
  fallbackSrc,
  onLoad,
  onError
}) => {
  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [lazy, isInView]);

  // Fetch image when in view
  useEffect(() => {
    if (!isInView) return;

    const fetchImage = async () => {
      try {
        setIsLoading(true);
        const images = await imageService.searchImages(query, {
          category,
          count: 1,
          featured: true
        });
        
        if (images.length > 0) {
          setImage(images[0]);
        } else {
          throw new Error('No images found');
        }
      } catch (error) {
        // Line 79 - keep this error logging as it's functional
        console.error('Failed to fetch image:', error);
        setHasError(true);
        onError?.();
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [isInView, query, category, onError]);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const getImageSrc = (): string => {
    if (hasError && fallbackSrc) return fallbackSrc;
    if (!image) return '';
    return imageService.getOptimizedImageUrl(image, size, customSize);
  };

  const getAltText = (): string => {
    if (alt) return alt;
    if (image?.alt_description) return image.alt_description;
    if (image?.description) return image.description;
    return `${query} ${category || ''} image`.trim();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Main Image */}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={getImageSrc()}
          alt={getAltText()}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Error State */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}

      {/* Credits */}
      {showCredits && image && !hasError && (
        <motion.div
          className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Photo by{' '}
          <a
            href={`https://unsplash.com/@${image.user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-300 transition-colors"
          >
            {image.user.name}
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default SmartImage;