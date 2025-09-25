import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResumeDownload = () => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      // Track download analytics
      await supabase.from('analytics').insert([
        {
          event_type: 'resume_download',
          metadata: {
            download_time: new Date().toISOString(),
            user_agent: navigator.userAgent
          }
        }
      ]);

      // Create a temporary resume content (in real scenario, this would be a PDF file)
      const resumeContent = `
MD. ABU SUFYAN
Machine Learning & AI Instructor | Researcher | Full-Stack Developer

📧 abusufyan.cse20@gmail.com
📱 +880 1580 352238  
🌍 Rajshahi, Bangladesh
💼 LinkedIn: md-abu-sufyan
🐙 GitHub: sufyan-github

EDUCATION
• B.Sc. in Computer Science & Engineering
  Rajshahi University of Engineering & Technology (RUET)
  CGPA: 3.68/4.00 (2020-2024)

EXPERIENCE
• ML/AI Instructor at AI Bangladesh (2024 - Present)
• Research Assistant at RUET (2023 - 2024)
• Full-Stack Developer - Freelance (2023 - Present)

RESEARCH PUBLICATIONS
• "Sentiment Analysis and Geopolitical Bias Detection in Social Media Text"
  19th International Conference on Computer and Information Technology (ICCIT 2024)

SKILLS
• Programming: Python, JavaScript, React, Node.js, PHP
• AI/ML: Machine Learning, Deep Learning, Computer Vision, NLP
• Databases: MySQL, MongoDB, Firebase
• Tools: Git, Docker, VS Code, Postman

PROJECTS
• Traffic Sign Detection System (YOLOv8, Computer Vision)
• Time-Series Forecasting for Health Data (LSTM, GRU)
• Attendance Management App (Flutter, Firebase)
• Full-Stack Web Applications (React, Node.js)

CERTIFICATIONS
• CAPM® Certification (PMI, 2024)
• App Development with Flutter (Ostad, 2024)
• Introduction to Machine Learning (Kaggle)
• Basic Networking Exam (Cisco)
      `;

      // Create and download the file
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Abu_Sufyan_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Resume Downloaded!",
        description: "Thank you for your interest. The resume has been downloaded.",
      });

    } catch (error) {
      toast({
        title: "Download Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={handleDownload}
      size="lg" 
      className="bg-gradient-primary hover:shadow-glow animate-pulse-glow group"
    >
      <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
      <FileText className="h-5 w-5 mr-2" />
      Download Resume
    </Button>
  );
};

export default ResumeDownload;