import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { imageService, UnsplashImage } from '../../utils/imageService';

interface ImageGalleryProps {
  query: string;
  category?: string;
  columns?: number;
  maxImages?: number;
  className?: string;
  showCredits?: boolean;
  onImageClick?: (image: UnsplashImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  query,
  category,
  columns = 3,
  maxImages = 12,
  className = '',
  showCredits = true,
  onImageClick
}) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const fetchedImages = await imageService.searchImages(query, {
          category,
          count: maxImages,
          featured: true
        });
        setImages(fetchedImages.slice(0, maxImages));
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, category, maxImages]);

  const handleImageClick = (image: UnsplashImage) => {
    setSelectedImage(image);
    onImageClick?.(image);
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns] || 'grid-cols-3';

  if (isLoading) {
    return (
      <div className={`grid ${gridCols} gap-4 ${className}`}>
        {Array.from({ length: maxImages }).map((_, index) => (
          <motion.div
            key={index}
            className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <motion.div
        className={`grid ${gridCols} gap-4 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="aspect-video cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleImageClick(image)}
          >
            <div className="relative w-full h-full">
              <img
                src={imageService.getOptimizedImageUrl(image, 'regular')}
                alt={image.alt_description || image.description || `${query} image`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                {showCredits && (
                  <div className="p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Photo by {image.user.name}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imageService.getOptimizedImageUrl(selectedImage, 'full')}
                alt={selectedImage.alt_description || selectedImage.description}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              
              {/* Credits */}
              {showCredits && (
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded">
                  Photo by{' '}
                  <a
                    href={`https://unsplash.com/@${selectedImage.user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-300 transition-colors"
                  >
                    {selectedImage.user.name}
                  </a>{' '}
                  on Unsplash
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;