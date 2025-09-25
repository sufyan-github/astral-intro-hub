import React from 'react';
import { 
  Brain, 
  Cpu, 
  Database, 
  Zap, 
  Globe, 
  Wifi, 
  Server, 
  Cloud, 
  Code, 
  GitBranch,
  Network,
  Bot,
  Layers,
  Activity
} from 'lucide-react';

const FloatingTechElements: React.FC = () => {
  const techElements = [
    { Icon: Brain, delay: '0s', position: 'top-10 left-10', color: 'text-primary' },
    { Icon: Cpu, delay: '1s', position: 'top-20 right-16', color: 'text-accent' },
    { Icon: Database, delay: '2s', position: 'top-1/3 left-1/4', color: 'text-secondary' },
    { Icon: Zap, delay: '0.5s', position: 'top-1/2 right-20', color: 'text-primary' },
    { Icon: Globe, delay: '1.5s', position: 'bottom-1/3 left-12', color: 'text-accent' },
    { Icon: Wifi, delay: '2.5s', position: 'bottom-20 right-1/3', color: 'text-secondary' },
    { Icon: Server, delay: '3s', position: 'top-40 left-1/2', color: 'text-primary' },
    { Icon: Cloud, delay: '0.8s', position: 'bottom-40 left-20', color: 'text-accent' },
    { Icon: Code, delay: '1.8s', position: 'top-2/3 right-12', color: 'text-secondary' },
    { Icon: GitBranch, delay: '2.3s', position: 'bottom-1/4 right-1/4', color: 'text-primary' },
    { Icon: Network, delay: '3.2s', position: 'top-1/4 right-1/3', color: 'text-accent' },
    { Icon: Bot, delay: '0.3s', position: 'bottom-12 left-1/3', color: 'text-secondary' },
    { Icon: Layers, delay: '1.3s', position: 'top-3/4 left-16', color: 'text-primary' },
    { Icon: Activity, delay: '2.8s', position: 'bottom-1/2 right-20', color: 'text-accent' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {techElements.map((element, index) => {
        const { Icon, delay, position, color } = element;
        
        return (
          <div
            key={index}
            className={`absolute ${position} animate-float opacity-20 hover:opacity-40 transition-opacity duration-500`}
            style={{
              animationDelay: delay,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className={`absolute inset-0 ${color} opacity-30 blur-lg animate-pulse`}>
                <Icon className="w-8 h-8 md:w-12 md:h-12" />
              </div>
              
              {/* Main icon */}
              <Icon className={`w-8 h-8 md:w-12 md:h-12 ${color} relative z-10`} />
              
              {/* Orbit ring */}
              <div className="absolute inset-0 border border-current rounded-full opacity-20 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-current rounded-full"></div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Neural network connections */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(212, 100%, 65%)" />
            <stop offset="50%" stopColor="hsl(270, 60%, 45%)" />
            <stop offset="100%" stopColor="hsl(189, 100%, 60%)" />
          </linearGradient>
        </defs>
        
        {/* Animated connection lines */}
        <g className="animate-pulse">
          <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="url(#connectionGradient)" strokeWidth="1" />
          <line x1="70%" y1="15%" x2="85%" y2="35%" stroke="url(#connectionGradient)" strokeWidth="1" />
          <line x1="25%" y1="60%" x2="45%" y2="80%" stroke="url(#connectionGradient)" strokeWidth="1" />
          <line x1="60%" y1="70%" x2="80%" y2="50%" stroke="url(#connectionGradient)" strokeWidth="1" />
          <line x1="15%" y1="80%" x2="35%" y2="60%" stroke="url(#connectionGradient)" strokeWidth="1" />
          <line x1="50%" y1="30%" x2="70%" y2="10%" stroke="url(#connectionGradient)" strokeWidth="1" />
        </g>
        
        {/* Data flow particles */}
        <g className="animate-ping">
          <circle cx="20%" cy="30%" r="2" fill="hsl(212, 100%, 65%)" opacity="0.6">
            <animate attributeName="cx" values="20%;80%;20%" dur="8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="30%;70%;30%" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx="80%" cy="20%" r="1.5" fill="hsl(189, 100%, 60%)" opacity="0.8">
            <animate attributeName="cx" values="80%;20%;80%" dur="12s" repeatCount="indefinite" />
            <animate attributeName="cy" values="20%;80%;20%" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle cx="60%" cy="90%" r="3" fill="hsl(270, 60%, 45%)" opacity="0.4">
            <animate attributeName="cx" values="60%;10%;60%" dur="10s" repeatCount="indefinite" />
            <animate attributeName="cy" values="90%;10%;90%" dur="10s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default FloatingTechElements;