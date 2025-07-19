import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Play, Download, Share2, Clock, Users, Zap } from 'lucide-react';
import { promotionalVideoScript, videoProductionNotes, socialMediaCaptions } from '../data/videoContent';

interface VideoGeneratorProps {
  onGenerateVideo: () => void;
}

export const VideoGenerator: React.FC<VideoGeneratorProps> = ({ onGenerateVideo }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate video generation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll create a placeholder video URL
      // In a real implementation, this would call an AI video generation service
      setGeneratedVideoUrl('https://example.com/voicecraft-promo-video.mp4');
      
      onGenerateVideo();
    } catch (error) {
      console.error('Video generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadVideoScript = () => {
    const scriptContent = `VoiceCraft Promotional Video Script (50 seconds)

${promotionalVideoScript.scenes.map(scene => 
  `${scene.timestamp}: ${scene.scene}
  Visuals: ${scene.visuals}
  Text Overlay: ${scene.text}
  Voiceover: ${scene.voiceover}
  `
).join('\n')}

Production Notes:
- Duration: ${promotionalVideoScript.duration}
- Target Audience: ${promotionalVideoScript.targetAudience}
- Platforms: ${promotionalVideoScript.platforms.join(', ')}
- Music: ${promotionalVideoScript.musicSuggestion}

Video Specifications:
- Format: ${videoProductionNotes.videoSpecs.format}
- Resolution: ${videoProductionNotes.videoSpecs.resolution}
- Frame Rate: ${videoProductionNotes.videoSpecs.frameRate}
- File Size: ${videoProductionNotes.videoSpecs.fileSize}

Hashtags: ${promotionalVideoScript.hashtags.join(' ')}
`;

    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voicecraft-video-script.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadSocialCaptions = () => {
    const captionsContent = `VoiceCraft Social Media Captions

INSTAGRAM:
${socialMediaCaptions.instagram}

TIKTOK:
${socialMediaCaptions.tiktok}

LINKEDIN:
${socialMediaCaptions.linkedin}

TWITTER:
${socialMediaCaptions.twitter}
`;

    const blob = new Blob([captionsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voicecraft-social-captions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Video Generation Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            50-Second Promotional Video Generator
          </CardTitle>
          <CardDescription>
            Create a professional social media promotional video for VoiceCraft
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-sm">50 seconds duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-sm">Multi-platform ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm">AI-powered content</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {promotionalVideoScript.platforms.map((platform) => (
              <Badge key={platform} variant="secondary">
                {platform}
              </Badge>
            ))}
          </div>

          <Button 
            onClick={handleGenerateVideo}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Video...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Generate Promotional Video
              </>
            )}
          </Button>

          {generatedVideoUrl && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✅ Video Generated Successfully!</p>
              <p className="text-green-600 text-sm mt-1">
                Your 50-second promotional video is ready for download and social media sharing.
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Download Video
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Script Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Video Script & Storyboard</CardTitle>
          <CardDescription>
            Detailed 50-second promotional video breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {promotionalVideoScript.scenes.map((scene, index) => (
              <div key={index} className="border-l-4 border-primary/30 pl-4 py-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{scene.timestamp}</Badge>
                  <span className="font-medium">{scene.scene}</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Visuals:</strong> {scene.visuals}</p>
                  <p><strong>Text:</strong> {scene.text}</p>
                  <p><strong>Voiceover:</strong> {scene.voiceover}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={downloadVideoScript} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Script
            </Button>
            <Button onClick={downloadSocialCaptions} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Social Captions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Production Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Video Production Specifications</CardTitle>
          <CardDescription>
            Technical requirements and creative guidelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Technical Specs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="font-medium">{videoProductionNotes.videoSpecs.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="font-medium">{videoProductionNotes.videoSpecs.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frame Rate:</span>
                  <span className="font-medium">{videoProductionNotes.videoSpecs.frameRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span className="font-medium">{videoProductionNotes.videoSpecs.fileSize}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Visual Style</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Colors:</span>
                  <span className="font-medium">{videoProductionNotes.visualStyle.colorScheme}</span>
                </div>
                <div className="flex justify-between">
                  <span>Typography:</span>
                  <span className="font-medium">{videoProductionNotes.visualStyle.typography}</span>
                </div>
                <div className="flex justify-between">
                  <span>Animations:</span>
                  <span className="font-medium">{videoProductionNotes.visualStyle.animations}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-3">Hashtag Strategy</h4>
            <div className="flex flex-wrap gap-1">
              {promotionalVideoScript.hashtags.map((hashtag) => (
                <Badge key={hashtag} variant="secondary" className="text-xs">
                  {hashtag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};