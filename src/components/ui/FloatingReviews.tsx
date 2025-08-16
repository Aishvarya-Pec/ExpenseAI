import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  avatar: string;
  position: string;
}

const reviews: Review[] = [
  { id: 1, name: "Alex Chen", text: "Mind-blowing AI accuracy! This app has revolutionized how I manage my finances.", rating: 5, avatar: "🚀", position: "Software Engineer" },
  { id: 2, name: "Sarah Kim", text: "Future of finance is here. The predictions are incredibly accurate.", rating: 5, avatar: "⭐", position: "Product Manager" },
  { id: 3, name: "Mike Johnson", text: "Saved me $2000 this month! The insights are game-changing.", rating: 5, avatar: "💎", position: "Entrepreneur" },
  { id: 4, name: "Emma Wilson", text: "Incredible user experience. So intuitive and powerful.", rating: 5, avatar: "🌟", position: "Designer" },
  { id: 5, name: "David Lee", text: "Revolutionary technology that actually works as promised.", rating: 5, avatar: "🔥", position: "Data Scientist" },
  { id: 6, name: "Lisa Zhang", text: "Best financial app I've ever used. Highly recommend!", rating: 5, avatar: "✨", position: "Marketing Director" },
  { id: 7, name: "Tom Brown", text: "AI predictions are spot-on. It's like having a financial advisor.", rating: 5, avatar: "🎯", position: "Analyst" },
  { id: 8, name: "Anna Davis", text: "Futuristic and intuitive. Love the holographic interface!", rating: 5, avatar: "🚀", position: "UX Designer" },
  { id: 9, name: "Chris Wilson", text: "Game-changing features that make expense tracking effortless.", rating: 5, avatar: "⚡", position: "Developer" },
  { id: 10, name: "Maya Patel", text: "Quantum leap in finance technology. Absolutely brilliant!", rating: 5, avatar: "🌈", position: "CEO" },
  { id: 11, name: "James Rodriguez", text: "The AI categorization is incredibly smart and accurate.", rating: 5, avatar: "🎮", position: "Tech Lead" },
  { id: 12, name: "Sophie Turner", text: "Beautiful design meets powerful functionality. Perfect!", rating: 5, avatar: "🎨", position: "Creative Director" },
  { id: 13, name: "Ryan O'Connor", text: "Transformed my financial habits completely. Amazing insights!", rating: 5, avatar: "🎪", position: "Consultant" },
  { id: 14, name: "Priya Sharma", text: "The future of personal finance is here. Incredible technology!", rating: 5, avatar: "🎭", position: "Product Owner" },
  { id: 15, name: "Marcus Thompson", text: "Outstanding performance and user experience. 5 stars!", rating: 5, avatar: "🎯", position: "Engineer" },
  { id: 16, name: "Isabella Garcia", text: "Revolutionary approach to expense management. Love it!", rating: 5, avatar: "🎲", position: "Startup Founder" },
  { id: 17, name: "Kevin Chang", text: "Smart predictions that actually help save money. Brilliant!", rating: 5, avatar: "🎸", position: "Financial Advisor" },
  { id: 18, name: "Rachel Green", text: "Seamless experience with cutting-edge AI technology.", rating: 5, avatar: "🎺", position: "Business Analyst" },
  { id: 19, name: "Daniel Kim", text: "Next-level innovation in financial technology. Impressive!", rating: 5, avatar: "🎻", position: "CTO" },
  { id: 20, name: "Olivia Martinez", text: "Perfect mobile experience with powerful desktop features.", rating: 5, avatar: "🎹", position: "Mobile Developer" }
];

const FloatingReview: React.FC<{ review: Review; delay: number }> = ({ review, delay }) => {
  const randomX = Math.random() * 80 + 10; // 10% to 90% from left
  const randomDuration = Math.random() * 3 + 8; // 8-11 seconds
  const randomDelay = delay + Math.random() * 5; // Stagger the animations

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: '100vh', 
        x: `${randomX}vw`,
        scale: 0.8
      }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        y: ['-10vh', '-20vh', '-80vh', '-100vh'],
        x: [`${randomX}vw`, `${randomX + (Math.random() - 0.5) * 20}vw`],
        scale: [0.8, 1, 1, 0.8],
        rotate: [0, Math.random() * 10 - 5, 0]
      }}
      transition={{ 
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        repeatDelay: Math.random() * 15 + 10,
        ease: "easeInOut"
      }}
      className="fixed pointer-events-none z-20 max-w-xs"
      style={{ left: 0, top: '100vh' }}
    >
      <div className="bg-black/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 shadow-2xl shadow-amber-500/20">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-lg">
            {review.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="text-white font-semibold text-sm truncate">{review.name}</h4>
              <div className="flex">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-amber-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-amber-300/80 text-xs">{review.position}</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{review.text}</p>
      </div>
    </motion.div>
  );
};

export const FloatingReviews: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {reviews.map((review, index) => (
        <FloatingReview 
          key={review.id} 
          review={review} 
          delay={index * 1.5} 
        />
      ))}
    </div>
  );
};

export default FloatingReviews;