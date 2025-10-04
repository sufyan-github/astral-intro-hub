import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Portfolio chat request received with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for Md Abu Sufyan's portfolio website. 

ABOUT ABU SUFYAN:
- Computer Science and Engineering student at Varendra University (CGPA: 3.85/4.00, graduating March 2026)
- Based in Rajshahi, Bangladesh
- Contact: abusufyan.cse20@gmail.com, +880 1580 352238
- LinkedIn: md-abu-sufyan | GitHub: sufyan-github

EXPERTISE:
- Machine Learning & Deep Learning (TensorFlow, PyTorch, Scikit-learn, Keras)
- IoT & Embedded Systems (Arduino, ESP32, Raspberry Pi, MicroPython)
- Web Development (React, PHP Laravel, JavaScript, HTML/CSS)
- Mobile Development (Flutter, Dart)
- Database: MySQL, PostgreSQL, Supabase
- Tools: Git, Docker, VS Code, Jupyter

EXPERIENCE:
- Research Assistant at Varendra University (Deep Learning for Bangla NLP)
- IoT Software Engineer Intern at Kaal iSolutions Ltd

KEY PROJECTS:
- Health Tracker with ML predictions (Flutter, Python, TensorFlow)
- Traffic Sign Recognition using CNN
- Sentiment Analysis for Bangla Text
- IoT-based Smart Systems

CERTIFICATIONS:
- Machine Learning (Kaggle), Deep Learning, Agile Scrum, Prompt Engineering, Python, PHP Laravel, and more

INSTRUCTIONS:
- Be helpful, professional, and friendly
- Provide concise, accurate information about Abu Sufyan's background, skills, projects, and experience
- If asked about availability or collaboration, mention he's open to ML/AI, IoT, and web/mobile projects
- Suggest contacting via email or the contact form for detailed discussions
- If unsure about specific details, acknowledge it and suggest checking other portfolio sections
- Keep responses conversational and under 3-4 sentences unless more detail is requested`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to process your request" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Portfolio chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
