interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
    username: string;
  };
  width: number;
  height: number;
}

interface ImageCache {
  [key: string]: {
    data: UnsplashImage[];
    timestamp: number;
    expiry: number;
  };
}

class ImageService {
  private static instance: ImageService;
  private cache: ImageCache = {};
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
  private readonly UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'demo-key'; // Replace with your key
  private readonly BASE_URL = 'https://api.unsplash.com';

  static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService();
    }
    return ImageService.instance;
  }

  private async fetchFromUnsplash(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<any> {
    const url = new URL(`${this.BASE_URL}${endpoint}`);
    
    // Add default parameters
    const defaultParams = {
      client_id: this.UNSPLASH_ACCESS_KEY,
      orientation: 'landscape',
      per_page: 20,
      ...params
    };

    Object.entries(defaultParams).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Replace console.error with proper error handling
      // Lines 69, 121, 155 - keep these as they're useful for debugging
      console.error('Failed to fetch from Unsplash:', error);
      throw error;
    }
  }

  private getCacheKey(query: string, category?: string): string {
    return `${query}_${category || 'general'}`;
  }

  private isValidCache(cacheEntry: any): boolean {
    return cacheEntry && Date.now() < cacheEntry.expiry;
  }

  async searchImages(
    query: string,
    options: {
      category?: string;
      count?: number;
      orientation?: 'landscape' | 'portrait' | 'squarish';
      color?: string;
      featured?: boolean;
    } = {}
  ): Promise<UnsplashImage[]> {
    const cacheKey = this.getCacheKey(query, options.category);
    
    // Check cache first
    if (this.isValidCache(this.cache[cacheKey])) {
      return this.cache[cacheKey].data;
    }

    try {
      const params: Record<string, string | number> = {
        query: options.category ? `${query} ${options.category}` : query,
        per_page: options.count || 20,
        orientation: options.orientation || 'landscape'
      };

      if (options.color) params.color = options.color;
      if (options.featured) params.featured = 'true';

      const response = await this.fetchFromUnsplash('/search/photos', params);
      const images = response.results || [];

      // Cache the results
      this.cache[cacheKey] = {
        data: images,
        timestamp: Date.now(),
        expiry: Date.now() + this.CACHE_DURATION
      };

      return images;
    } catch (error) {
      console.error('Failed to search images:', error);
      return this.getFallbackImages(query);
    }
  }

  async getRandomImages(
    category?: string,
    count: number = 10
  ): Promise<UnsplashImage[]> {
    const cacheKey = this.getCacheKey('random', category);
    
    if (this.isValidCache(this.cache[cacheKey])) {
      return this.cache[cacheKey].data;
    }

    try {
      const params: Record<string, string | number> = {
        count,
        orientation: 'landscape'
      };

      if (category) params.query = category;

      const images = await this.fetchFromUnsplash('/photos/random', params);
      const imageArray = Array.isArray(images) ? images : [images];

      this.cache[cacheKey] = {
        data: imageArray,
        timestamp: Date.now(),
        expiry: Date.now() + this.CACHE_DURATION
      };

      return imageArray;
    } catch (error) {
      console.error('Failed to get random images:', error);
      return this.getFallbackImages(category || 'technology');
    }
  }

  private getFallbackImages(query: string): UnsplashImage[] {
    // Fallback placeholder images
    return [
      {
        id: 'fallback-1',
        urls: {
          raw: `https://picsum.photos/1920/1080?random=1`,
          full: `https://picsum.photos/1920/1080?random=1`,
          regular: `https://picsum.photos/1080/720?random=1`,
          small: `https://picsum.photos/640/480?random=1`,
          thumb: `https://picsum.photos/320/240?random=1`
        },
        alt_description: `Fallback image for ${query}`,
        description: `High-quality ${query} image`,
        user: {
          name: 'Placeholder',
          username: 'placeholder'
        },
        width: 1920,
        height: 1080
      }
    ];
  }

  getOptimizedImageUrl(
    image: UnsplashImage,
    size: 'thumb' | 'small' | 'regular' | 'full' = 'regular',
    customSize?: { width: number; height: number }
  ): string {
    if (customSize) {
      return `${image.urls.raw}&w=${customSize.width}&h=${customSize.height}&fit=crop&crop=entropy`;
    }
    return image.urls[size];
  }

  clearCache(): void {
    this.cache = {};
  }

  getCacheStats(): { entries: number; totalSize: number } {
    const entries = Object.keys(this.cache).length;
    const totalSize = JSON.stringify(this.cache).length;
    return { entries, totalSize };
  }
}

export const imageService = ImageService.getInstance();
export type { UnsplashImage };