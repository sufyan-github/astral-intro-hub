import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Analytics tracker component
const Analytics = () => {
  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await supabase.from('analytics').insert([
          {
            event_type: 'page_view',
            page_path: window.location.pathname,
            user_agent: navigator.userAgent,
            metadata: {
              referrer: document.referrer,
              timestamp: new Date().toISOString(),
              viewport: {
                width: window.innerWidth,
                height: window.innerHeight
              }
            }
          }
        ]);
      } catch (error) {
        console.error('Analytics tracking error:', error);
      }
    };

    trackPageView();

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        supabase.from('analytics').insert([
          {
            event_type: 'scroll_depth',
            metadata: { depth: scrollPercent }
          }
        ]);
      }
    };

    window.addEventListener('scroll', trackScrollDepth);

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 30) { // Only track if user spent more than 30 seconds
        supabase.from('analytics').insert([
          {
            event_type: 'time_on_page',
            metadata: { seconds: timeSpent }
          }
        ]);
      }
    };

    window.addEventListener('beforeunload', trackTimeOnPage);

    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;