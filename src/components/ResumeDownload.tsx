import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResumeDownload = () => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      // Track download analytics
      await supabase.from("analytics").insert([
        {
          event_type: "resume_download",
          metadata: {
            download_time: new Date().toISOString(),
            user_agent: navigator.userAgent,
          },
        },
      ]);

      // Path to your PDF (must be in /public/assets/cv/)
      const pdfUrl = "./assets/cv/Abu_Sufyan_CV.pdf";

      // Create an <a> element for direct download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Abu_Sufyan_CV.pdf"; // Suggested download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Resume Downloaded!",
        description:
          "Thank you for your interest. The resume has been downloaded.",
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
