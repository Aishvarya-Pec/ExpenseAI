import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Review data array with 50+ unique testimonials using real photos from randomuser.me
const reviews = [
  { id: 4, name: "David Thompson", avatar: "https://randomuser.me/api/portraits/men/2.jpg", text: "The automated categorization saves me hours every month. Highly recommended!" },
  { id: 5, name: "Lisa Wang", avatar: "https://randomuser.me/api/portraits/women/3.jpg", text: "Best expense tracking app I've used. The interface is clean and intuitive." },
  { id: 6, name: "James Miller", avatar: "https://randomuser.me/api/portraits/men/3.jpg", text: "ExpenseAI's budgeting features helped me save $2000 last year. Amazing results!" },
  { id: 7, name: "Anna Kowalski", avatar: "https://randomuser.me/api/portraits/women/4.jpg", text: "Perfect for freelancers! Tracks business expenses automatically and generates reports." },
  { id: 8, name: "Robert Garcia", avatar: "https://randomuser.me/api/portraits/men/4.jpg", text: "The AI learns my spending habits and gives personalized advice. It's like having a financial advisor." },
  { id: 9, name: "Jennifer Lee", avatar: "https://randomuser.me/api/portraits/women/5.jpg", text: "Switched from 3 different apps to just ExpenseAI. It does everything I need and more." },
  { id: 10, name: "Mark Anderson", avatar: "https://randomuser.me/api/portraits/men/5.jpg", text: "The real-time notifications help me stay on track with my spending goals." },
  { id: 11, name: "Sophie Martin", avatar: "https://randomuser.me/api/portraits/women/6.jpg", text: "Love how it connects to all my bank accounts and credit cards seamlessly." },
  { id: 12, name: "Alex Turner", avatar: "https://randomuser.me/api/portraits/men/6.jpg", text: "The visual spending reports make it easy to understand where my money goes." },
  { id: 13, name: "Rachel Green", avatar: "https://randomuser.me/api/portraits/women/7.jpg", text: "ExpenseAI helped me identify unnecessary subscriptions and save $150/month." },
  { id: 14, name: "Kevin Brown", avatar: "https://randomuser.me/api/portraits/men/7.jpg", text: "The AI predictions for future expenses are surprisingly accurate. Great for planning!" },
  { id: 15, name: "Maria Santos", avatar: "https://randomuser.me/api/portraits/women/8.jpg", text: "Finally achieved my savings goal thanks to ExpenseAI's smart budgeting features." },
  { id: 16, name: "Tom Wilson", avatar: "https://randomuser.me/api/portraits/men/8.jpg", text: "The app's machine learning gets better over time. It knows my spending better than I do!" },
  { id: 17, name: "Jessica Davis", avatar: "https://randomuser.me/api/portraits/women/9.jpg", text: "Excellent for tracking medical expenses and insurance claims. Very organized." },
  { id: 18, name: "Chris Taylor", avatar: "https://randomuser.me/api/portraits/men/9.jpg", text: "The receipt scanning feature is a game-changer. No more manual entry!" },
  { id: 19, name: "Amanda White", avatar: "https://randomuser.me/api/portraits/women/10.jpg", text: "Love the goal-setting features. Saved for my vacation in just 6 months!" },
  { id: 20, name: "Daniel Kim", avatar: "https://randomuser.me/api/portraits/men/10.jpg", text: "The security features give me peace of mind. Bank-level encryption is impressive." },
  { id: 21, name: "Nicole Johnson", avatar: "https://randomuser.me/api/portraits/women/11.jpg", text: "Perfect for managing farm expenses and seasonal income fluctuations." },
  { id: 22, name: "Ryan Clark", avatar: "https://randomuser.me/api/portraits/men/11.jpg", text: "As a content creator, tracking business expenses is crucial. ExpenseAI makes it effortless." },
  { id: 23, name: "Olivia Moore", avatar: "https://randomuser.me/api/portraits/women/12.jpg", text: "The family sharing features help us stay on budget together. Great for couples!" },
  { id: 24, name: "Brandon Lee", avatar: "https://randomuser.me/api/portraits/men/12.jpg", text: "Musician here - tracking gig income and equipment expenses has never been easier." },
  { id: 25, name: "Samantha Hill", avatar: "https://randomuser.me/api/portraits/women/13.jpg", text: "The fitness and health expense tracking motivates me to invest in my wellbeing." },
  { id: 26, name: "Jason Rodriguez", avatar: "https://randomuser.me/api/portraits/men/13.jpg", text: "Teacher-friendly! Helps me track classroom supplies and claim tax deductions." },
  { id: 27, name: "Megan Foster", avatar: "https://randomuser.me/api/portraits/women/14.jpg", text: "The business expense reports are professional and detailed. Perfect for my accounting." },
  { id: 28, name: "Tyler Scott", avatar: "https://randomuser.me/api/portraits/men/14.jpg", text: "Research expenses are complex, but ExpenseAI handles them with ease." },
  { id: 29, name: "Hannah Baker", avatar: "https://randomuser.me/api/portraits/women/15.jpg", text: "The AI suggestions helped me optimize my spending and increase my savings rate." },
  { id: 30, name: "Nathan Cooper", avatar: "https://randomuser.me/api/portraits/men/15.jpg", text: "The investment tracking feature gives me a complete financial picture." },
  { id: 31, name: "Grace Turner", avatar: "https://randomuser.me/api/portraits/women/16.jpg", text: "Medical professional here - tracking continuing education expenses is now simple." },
  { id: 32, name: "Ethan Phillips", avatar: "https://randomuser.me/api/portraits/men/16.jpg", text: "The gamification elements make budgeting fun instead of stressful." },
  { id: 33, name: "Chloe Adams", avatar: "https://randomuser.me/api/portraits/women/17.jpg", text: "Art supplies are expensive! ExpenseAI helps me budget for my creative projects." },
  { id: 34, name: "Lucas Martinez", avatar: "https://randomuser.me/api/portraits/men/17.jpg", text: "Restaurant owner - tracking food costs and inventory has never been more accurate." },
  { id: 35, name: "Zoe Campbell", avatar: "https://randomuser.me/api/portraits/women/18.jpg", text: "The AI learns seasonal patterns in my spending. Very helpful for planning ahead." },
  { id: 36, name: "Ian Wright", avatar: "https://randomuser.me/api/portraits/men/18.jpg", text: "Event planner here - ExpenseAI helps me stay within client budgets perfectly." },
  { id: 37, name: "Bella Thompson", avatar: "https://randomuser.me/api/portraits/women/19.jpg", text: "The carbon footprint tracking feature aligns with my environmental values." },
  { id: 38, name: "Connor Davis", avatar: "https://randomuser.me/api/portraits/men/19.jpg", text: "Healthcare costs are complex, but the AI categorization makes sense of everything." },
  { id: 39, name: "Maya Patel", avatar: "https://randomuser.me/api/portraits/women/20.jpg", text: "The API integrations with other financial tools create a seamless ecosystem." },
  { id: 40, name: "Jake Wilson", avatar: "https://randomuser.me/api/portraits/men/20.jpg", text: "Film production expenses are chaotic, but ExpenseAI brings order to the madness." },
  { id: 41, name: "Aria Chen", avatar: "https://randomuser.me/api/portraits/women/21.jpg", text: "Music teacher - tracking student payments and instrument purchases is now effortless." },
  { id: 42, name: "Owen Garcia", avatar: "https://randomuser.me/api/portraits/men/21.jpg", text: "Agricultural expenses vary by season. The AI predictions help me plan harvests." },
  { id: 43, name: "Luna Rodriguez", avatar: "https://randomuser.me/api/portraits/women/22.jpg", text: "Lab equipment is expensive! ExpenseAI helps me justify research budget requests." },
  { id: 44, name: "Finn Anderson", avatar: "https://randomuser.me/api/portraits/men/22.jpg", text: "The visual design of the app is as beautiful as it is functional." },
  { id: 45, name: "Nova Kim", avatar: "https://randomuser.me/api/portraits/women/23.jpg", text: "Emergency responder - tracking uniform and equipment costs for tax purposes." },
  { id: 46, name: "River Taylor", avatar: "https://randomuser.me/api/portraits/men/23.jpg", text: "Theater production costs are unpredictable, but ExpenseAI helps me stay organized." },
  { id: 47, name: "Sage Johnson", avatar: "https://randomuser.me/api/portraits/women/24.jpg", text: "The educational discounts and student loan tracking features are incredibly helpful." },
  { id: 48, name: "Phoenix Lee", avatar: "https://randomuser.me/api/portraits/men/24.jpg", text: "Mechanic shop owner - tracking parts and labor costs has never been more accurate." },
  { id: 49, name: "Iris Martinez", avatar: "https://randomuser.me/api/portraits/women/25.jpg", text: "Circus performer - tracking travel and costume expenses across different cities." },
  { id: 50, name: "Atlas Brown", avatar: "https://randomuser.me/api/portraits/men/25.jpg", text: "The future expense predictions help me make better financial decisions today." },
  { id: 51, name: "Willow Davis", avatar: "https://randomuser.me/api/portraits/women/26.jpg", text: "Organic farming requires careful expense tracking. ExpenseAI makes it simple." },
  { id: 52, name: "Orion Wilson", avatar: "https://randomuser.me/api/portraits/men/26.jpg", text: "Band manager - tracking tour expenses and revenue splits is now automated." }
];

interface ReviewCardProps {
  review: typeof reviews[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isHovered, onHover, onLeave }) => {
  return (
    <motion.div 
      className="flex-shrink-0 w-96 h-48 bg-black rounded-2xl p-6 shadow-lg border border-gray-800 mr-6 cursor-pointer"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)",
        borderColor: "rgba(168, 85, 247, 0.5)"
      }}
      transition={{ 
        duration: 0.2,
        ease: "easeOut"
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-center mb-4">
        <img 
          src={review.avatar} 
          alt={review.name}
          className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-700"
        />
        <div>
          <h4 className="font-bold text-white text-lg">{review.name}</h4>
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(5)}
          </div>
        </div>
      </div>
      <p className="text-white leading-relaxed text-sm line-clamp-3">{review.text}</p>
    </motion.div>
  );
};

const TestimonialSection: React.FC = () => {
  const [hoveredRowTop, setHoveredRowTop] = useState<number | null>(null);
  const [hoveredRowBottom, setHoveredRowBottom] = useState<number | null>(null);
  const topRowControls = useAnimation();
  const bottomRowControls = useAnimation();
  
  // Split reviews into two arrays for different rows
  const topRowReviews = reviews.slice(0, 26);
  const bottomRowReviews = reviews.slice(26, 52);

  // Smooth animation control for top row
  useEffect(() => {
    const startAnimation = () => {
      topRowControls.start({
        x: [0, -100 * topRowReviews.length],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear"
        }
      });
    };

    if (hoveredRowTop !== null) {
      topRowControls.stop();
    } else {
      startAnimation();
    }
  }, [hoveredRowTop, topRowControls, topRowReviews.length]);

  // Smooth animation control for bottom row
  useEffect(() => {
    const startAnimation = () => {
      bottomRowControls.start({
        x: [-100 * bottomRowReviews.length, 0],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear"
        }
      });
    };

    if (hoveredRowBottom !== null) {
      bottomRowControls.stop();
    } else {
      startAnimation();
    }
  }, [hoveredRowBottom, bottomRowControls, bottomRowReviews.length]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-full">
        {/* Top Row - Scrolling Left */}
        <div className="relative mb-8 overflow-hidden">
          <motion.div
            className="flex"
            animate={topRowControls}
            style={{
              width: `${(topRowReviews.length * 2) * 408}px`
            }}
            onHoverStart={() => topRowControls.stop()}
            onHoverEnd={() => {
              if (hoveredRowTop === null) {
                topRowControls.start({
                  x: [0, -100 * topRowReviews.length],
                  transition: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear"
                  }
                });
              }
            }}
          >
            {/* Duplicate the array for seamless loop */}
            {[...topRowReviews, ...topRowReviews].map((review, index) => (
              <ReviewCard 
                key={`top-${review.id}-${index}`} 
                review={review}
                isHovered={hoveredRowTop === index}
                onHover={() => setHoveredRowTop(index)}
                onLeave={() => setHoveredRowTop(null)}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Scrolling Right */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={bottomRowControls}
            style={{
              width: `${(bottomRowReviews.length * 2) * 408}px`
            }}
            onHoverStart={() => bottomRowControls.stop()}
            onHoverEnd={() => {
              if (hoveredRowBottom === null) {
                bottomRowControls.start({
                  x: [-100 * bottomRowReviews.length, 0],
                  transition: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear"
                  }
                });
              }
            }}
          >
            {/* Duplicate the array for seamless loop */}
            {[...bottomRowReviews, ...bottomRowReviews].map((review, index) => (
              <ReviewCard 
                key={`bottom-${review.id}-${index}`} 
                review={review}
                isHovered={hoveredRowBottom === index}
                onHover={() => setHoveredRowBottom(index)}
                onLeave={() => setHoveredRowBottom(null)}
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile Responsive Version */}
        <div className="block lg:hidden mt-12 px-4">
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
              {reviews.slice(0, 8).map((review) => (
                <ReviewCard 
                  key={`mobile-${review.id}`} 
                  review={review}
                  isHovered={false}
                  onHover={() => {}}
                  onLeave={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;