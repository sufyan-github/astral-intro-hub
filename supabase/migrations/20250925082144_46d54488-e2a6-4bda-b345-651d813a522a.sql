-- Create contacts table for contact form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table for articles
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table for dynamic project management
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  project_type TEXT NOT NULL,
  year TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER DEFAULT 5,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics table for tracking
CREATE TABLE public.analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  page_path TEXT,
  user_agent TEXT,
  ip_address INET,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Blog posts are viewable by everyone" 
ON public.blog_posts FOR SELECT 
USING (published = true);

CREATE POLICY "Projects are viewable by everyone" 
ON public.projects FOR SELECT 
USING (true);

CREATE POLICY "Published testimonials are viewable by everyone" 
ON public.testimonials FOR SELECT 
USING (published = true);

-- Create policies for contact form (allow inserts)
CREATE POLICY "Anyone can submit contact form" 
ON public.contacts FOR INSERT 
WITH CHECK (true);

-- Create policies for analytics (allow inserts)
CREATE POLICY "Anyone can track analytics" 
ON public.analytics FOR INSERT 
WITH CHECK (true);

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for projects
INSERT INTO public.projects (title, description, technologies, project_type, year, featured, github_url, demo_url) VALUES
('Traffic Sign Detection System', 'Real-time detection of traffic signs using YOLOv8, MobileNet, and ResNet. Deployed on a web interface with live video processing support.', ARRAY['YOLOv8', 'MobileNet', 'ResNet', 'Python', 'Computer Vision'], 'AI/ML', '2025', true, '#', '#'),
('Sentiment Analysis and Bias Detection', 'Developed ML/DL models for detecting sentiment and geopolitical bias in social media text. Supported academic research published in ICCIT 2024.', ARRAY['Machine Learning', 'Deep Learning', 'NLP', 'Python'], 'Research', '2024', true, '#', '#'),
('Time-Series Forecasting for Health Data', 'Built forecasting models to predict Monkeypox outbreak trends. Implemented LSTM, GRU, and ensemble ML models.', ARRAY['LSTM', 'GRU', 'Time Series', 'Python', 'Healthcare Analytics'], 'AI/ML', '2024', true, '#', '#'),
('Attendance Management App', 'Cross-platform mobile app built with Flutter and Dart. Integrated Firebase for authentication and real-time database.', ARRAY['Flutter', 'Dart', 'Firebase', 'Mobile Development'], 'Mobile', '2024', false, '#', '#');

-- Insert sample testimonials
INSERT INTO public.testimonials (name, position, company, content, published) VALUES
('Dr. Rashik Rahman', 'Professor', 'RUET CSE Department', 'Abu Sufyan demonstrated exceptional research capabilities during his academic projects. His work on AI and machine learning is truly impressive.', true),
('Tech Colleague', 'Senior Developer', 'AI Bangladesh', 'Working with Abu Sufyan has been a great experience. His expertise in AI and dedication to teaching makes him an excellent instructor.', true);

-- Insert sample blog post
INSERT INTO public.blog_posts (title, slug, content, excerpt, published, tags) VALUES
('Getting Started with Traffic Sign Detection Using YOLOv8', 'traffic-sign-detection-yolov8', 
'# Traffic Sign Detection with YOLOv8

Traffic sign detection is a crucial component of autonomous driving systems. In this article, I will walk you through building a real-time traffic sign detection system using YOLOv8.

## Why YOLOv8?

YOLOv8 offers several advantages:
- Real-time performance
- High accuracy
- Easy to implement
- Great for edge deployment

## Implementation Steps

1. **Data Preparation**
2. **Model Training** 
3. **Deployment**

This project was part of my research work and has shown promising results in real-world scenarios.', 
'Learn how to build a real-time traffic sign detection system using YOLOv8 for autonomous driving applications.', 
true, 
ARRAY['AI', 'Computer Vision', 'YOLOv8', 'Traffic Signs']);