// ... existing code ...
import { ParticleBackground } from '../ui/ParticleBackground';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import Sparkles from '../ui/Sparkles';

export const Dashboard: React.FC = () => {
  // ... existing code ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 relative overflow-hidden">
      {/* Enhanced particle systems */}
      <ParticleBackground density={25} color="mixed" size="small" speed="slow" />
      <AnimatedBackground variant="subtle" />
      <Sparkles density={20} className="fixed inset-0 pointer-events-none z-0">
        <div />
      </Sparkles>
      
      <div className="relative z-10">
        {/* ... existing dashboard content ... */}
      </div>
    </div>
  );
};