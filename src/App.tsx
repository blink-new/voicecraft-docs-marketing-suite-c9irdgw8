import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { 
  BookOpen, 
  HelpCircle, 
  List, 
  Play, 
  Share2, 
  Download,
  Search,
  FileText,
  Video,
  MessageSquare,
  Megaphone,
  Settings,
  Zap
} from 'lucide-react'
import { userManualContent } from './data/userManual'
import { stepByStepGuides } from './data/stepByStepGuides'
import { downloadTextAsFile, downloadPDF, downloadAllResources } from './utils/downloadUtils'
import { VideoGenerator } from './components/VideoGenerator'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading VoiceCraft Documentation Suite...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">Welcome to VoiceCraft Docs</CardTitle>
            <CardDescription>Please sign in to access the documentation suite</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => blink.auth.login()} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">VoiceCraft</h1>
                <p className="text-sm text-slate-500">Documentation Suite</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                {user.email}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => blink.auth.logout()}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Complete Documentation & Marketing Suite
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Everything you need to understand, use, and promote the VoiceCraft pronunciation tutor application.
          </p>
          
          {/* Quick Download Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              🎥 Quick Access: How To Use Video Tutorial
            </h3>
            <p className="text-slate-600 mb-4">
              Download the complete 8:45 tutorial video covering all VoiceCraft features
            </p>
            <Button 
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => {
                const videoContent = `VoiceCraft Tutorial Video - How to Use the Application

This is a comprehensive 8:45 tutorial video covering:

1. Account Setup and Initial Configuration (0:00-1:30)
   - Creating your VoiceCraft account
   - Selecting your native and target languages
   - Setting up microphone permissions
   - Completing the initial pronunciation assessment

2. Understanding the Pronunciation Feedback System (1:30-3:00)
   - How AI analyzes your pronunciation
   - Interpreting accuracy scores and feedback
   - Understanding visual feedback indicators
   - Using the replay and comparison features

3. Navigating Different Exercise Types (3:00-5:15)
   - Word pronunciation exercises
   - Sentence reading practice
   - Conversation simulation mode
   - Phonetic training modules
   - Custom practice sessions

4. Tracking Progress and Setting Goals (5:15-7:00)
   - Accessing your progress dashboard
   - Understanding improvement metrics
   - Setting pronunciation goals
   - Reviewing historical performance
   - Identifying areas for improvement

5. Advanced Features and Customization (7:00-8:45)
   - Adjusting feedback sensitivity
   - Customizing practice difficulty
   - Setting up practice reminders
   - Exporting progress reports
   - Troubleshooting common issues

Video Features:
- High-quality screen recordings with clear audio
- Step-by-step visual demonstrations
- Real user interface walkthroughs
- Practical examples and use cases
- Professional narration and explanations

Perfect for:
- New users getting started with VoiceCraft
- Existing users wanting to explore advanced features
- Educators introducing VoiceCraft to students
- Training materials for organizations
- Reference guide for troubleshooting

File Details:
- Duration: 8 minutes 45 seconds
- Format: MP4 (1080p HD)
- Size: Approximately 125 MB
- Audio: Clear English narration
- Subtitles: Available in multiple languages

Note: This is a placeholder description. In a real implementation, this would trigger the download of the actual video file.`;

                downloadTextAsFile(videoContent, 'VoiceCraft-How-To-Use-Video-Tutorial.txt');
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download How To Use Video
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              User Manual
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Social Media
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    User Manual
                  </CardTitle>
                  <CardDescription>
                    Comprehensive guide covering all features and functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Getting Started Guide</li>
                    <li>• Feature Overview</li>
                    <li>• Advanced Settings</li>
                    <li>• Troubleshooting</li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    View Manual
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-cyan-600" />
                    FAQ Section
                  </CardTitle>
                  <CardDescription>
                    Frequently asked questions and quick answers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Common Issues</li>
                    <li>• Feature Questions</li>
                    <li>• Technical Support</li>
                    <li>• Account Management</li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Browse FAQ
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="w-5 h-5 text-green-600" />
                    Step-by-Step Guides
                  </CardTitle>
                  <CardDescription>
                    Detailed tutorials for specific tasks and workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• First-Time Setup</li>
                    <li>• Practice Sessions</li>
                    <li>• Progress Tracking</li>
                    <li>• Settings Configuration</li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    View Guides
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-purple-600" />
                    Video Tutorials
                  </CardTitle>
                  <CardDescription>
                    Visual learning with instructional and promotional videos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• How-to Videos</li>
                    <li>• Feature Demonstrations</li>
                    <li>• Promotional Content</li>
                    <li>• User Testimonials</li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-orange-600" />
                    Social Media Kit
                  </CardTitle>
                  <CardDescription>
                    Ready-to-share content for social media promotion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Social Media Posts</li>
                    <li>• Promotional Graphics</li>
                    <li>• Video Snippets</li>
                    <li>• Hashtag Suggestions</li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Get Content
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-red-600" />
                    Downloads
                  </CardTitle>
                  <CardDescription>
                    Downloadable resources and materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• PDF User Manual</li>
                    <li>• Quick Reference Cards</li>
                    <li>• Marketing Materials</li>
                    <li>• Brand Assets</li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Download All
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Manual Tab */}
          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">VoiceCraft User Manual</CardTitle>
                <CardDescription>
                  Complete guide to using the VoiceCraft pronunciation tutor application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Getting Started</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-slate-900 mb-2">1. Account Setup</h4>
                        <p className="text-sm text-slate-600">
                          Create your account and complete the initial pronunciation assessment to personalize your learning experience.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-slate-900 mb-2">2. Choose Your Language</h4>
                        <p className="text-sm text-slate-600">
                          Select your native language and the language you want to improve your pronunciation in.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-slate-900 mb-2">3. Start Your First Lesson</h4>
                        <p className="text-sm text-slate-600">
                          Begin with basic sounds and gradually progress to more complex pronunciation patterns.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">Key Features</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-medium text-indigo-900 mb-2">AI-Powered Feedback</h4>
                        <p className="text-sm text-indigo-700">
                          Get instant, personalized feedback on your pronunciation with advanced speech recognition technology.
                        </p>
                      </div>
                      <div className="p-4 bg-cyan-50 rounded-lg">
                        <h4 className="font-medium text-cyan-900 mb-2">Progress Tracking</h4>
                        <p className="text-sm text-cyan-700">
                          Monitor your improvement over time with detailed analytics and progress reports.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Interactive Exercises</h4>
                        <p className="text-sm text-green-700">
                          Practice with engaging exercises including word repetition, sentence reading, and conversation simulation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Advanced Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Audio Settings</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Microphone sensitivity</li>
                        <li>• Playback speed control</li>
                        <li>• Audio quality preferences</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Learning Preferences</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Difficulty level adjustment</li>
                        <li>• Practice session duration</li>
                        <li>• Feedback sensitivity</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Notifications</h4>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Daily practice reminders</li>
                        <li>• Progress milestone alerts</li>
                        <li>• Achievement notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => downloadPDF(userManualContent, 'VoiceCraft-User-Manual.txt')}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Manual
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => downloadTextAsFile(userManualContent, 'VoiceCraft-User-Manual-Complete.txt')}
                  >
                    <FileText className="w-4 h-4" />
                    Download Text Version
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Find quick answers to common questions about VoiceCraft
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search FAQ..."
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">How accurate is the pronunciation feedback?</h4>
                    <p className="text-sm text-slate-600">
                      VoiceCraft uses advanced AI speech recognition technology with 95%+ accuracy. The system is trained on native speaker patterns and provides detailed feedback on specific pronunciation aspects.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Can I use VoiceCraft offline?</h4>
                    <p className="text-sm text-slate-600">
                      VoiceCraft requires an internet connection for AI-powered feedback and progress syncing. However, you can download lessons for offline practice, with feedback available when you reconnect.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">What languages are supported?</h4>
                    <p className="text-sm text-slate-600">
                      Currently, VoiceCraft supports English pronunciation training for speakers of Spanish, French, German, Italian, Portuguese, Japanese, Korean, and Mandarin Chinese.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">How long does it take to see improvement?</h4>
                    <p className="text-sm text-slate-600">
                      Most users notice improvement within 2-3 weeks of regular practice (15-20 minutes daily). Significant improvement typically occurs within 2-3 months of consistent use.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Is my voice data stored securely?</h4>
                    <p className="text-sm text-slate-600">
                      Yes, all voice data is encrypted and processed securely. Audio recordings are only used for pronunciation analysis and are automatically deleted after processing unless you choose to save them for progress tracking.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Can I track my progress over time?</h4>
                    <p className="text-sm text-slate-600">
                      Absolutely! VoiceCraft provides detailed progress analytics including pronunciation accuracy scores, improvement trends, and personalized recommendations for areas to focus on.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-medium text-indigo-900 mb-2">Still have questions?</h4>
                  <p className="text-sm text-indigo-700 mb-3">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Beginner</Badge>
                    First-Time Setup
                  </CardTitle>
                  <CardDescription>
                    Complete guide to setting up your VoiceCraft account and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Create Account</h4>
                        <p className="text-sm text-slate-600">Sign up with email or social login</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Language Selection</h4>
                        <p className="text-sm text-slate-600">Choose your native and target languages</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Microphone Test</h4>
                        <p className="text-sm text-slate-600">Ensure your microphone is working properly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Initial Assessment</h4>
                        <p className="text-sm text-slate-600">Complete pronunciation assessment</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => downloadTextAsFile(stepByStepGuides.firstTimeSetup, 'VoiceCraft-First-Time-Setup-Guide.txt')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Setup Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">Intermediate</Badge>
                    Effective Practice Sessions
                  </CardTitle>
                  <CardDescription>
                    Learn how to maximize your pronunciation practice time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Warm-up Exercises</h4>
                        <p className="text-sm text-slate-600">Start with basic sound drills</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Focus Areas</h4>
                        <p className="text-sm text-slate-600">Work on your weakest pronunciation points</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Practice Sentences</h4>
                        <p className="text-sm text-slate-600">Apply sounds in context</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Review & Repeat</h4>
                        <p className="text-sm text-slate-600">Reinforce difficult sounds</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => downloadTextAsFile(stepByStepGuides.effectivePractice, 'VoiceCraft-Effective-Practice-Guide.txt')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Practice Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">Advanced</Badge>
                    Progress Tracking & Analytics
                  </CardTitle>
                  <CardDescription>
                    Understanding your pronunciation improvement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Accuracy Scores</h4>
                        <p className="text-sm text-slate-600">Interpret your pronunciation ratings</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Trend Analysis</h4>
                        <p className="text-sm text-slate-600">Track improvement over time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Weak Point Identification</h4>
                        <p className="text-sm text-slate-600">Focus on areas needing improvement</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Goal Setting</h4>
                        <p className="text-sm text-slate-600">Set and track pronunciation goals</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => downloadTextAsFile(stepByStepGuides.progressTracking, 'VoiceCraft-Progress-Tracking-Guide.txt')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Analytics Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-800">Tips</Badge>
                    Troubleshooting Common Issues
                  </CardTitle>
                  <CardDescription>
                    Solutions to frequently encountered problems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Microphone Issues</h4>
                        <p className="text-sm text-slate-600">Fix audio input problems</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Feedback Accuracy</h4>
                        <p className="text-sm text-slate-600">Improve recognition accuracy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <div>
                        <h4 className="font-medium text-slate-900">App Performance</h4>
                        <p className="text-sm text-slate-600">Optimize app speed and responsiveness</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <div>
                        <h4 className="font-medium text-slate-900">Account & Sync</h4>
                        <p className="text-sm text-slate-600">Resolve account and data sync issues</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Full Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Video Content & Tutorials</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Generate promotional videos and access comprehensive tutorials to master VoiceCraft and improve your pronunciation skills.
              </p>
            </div>

            {/* Video Generator Section */}
            <VideoGenerator onGenerateVideo={() => console.log('Video generated!')} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-red-600" />
                    How to Use VoiceCraft
                  </CardTitle>
                  <CardDescription>
                    Complete tutorial covering all major features (8:45)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Play className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-500">Tutorial Video</p>
                      <p className="text-sm text-slate-400">8:45 duration</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-900">What you'll learn:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Account setup and initial configuration</li>
                      <li>• Understanding the pronunciation feedback system</li>
                      <li>• Navigating through different exercise types</li>
                      <li>• Tracking your progress and setting goals</li>
                      <li>• Advanced features and customization options</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Tutorial
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        // Create a downloadable video file
                        const videoContent = `VoiceCraft Tutorial Video - How to Use the Application

This is a comprehensive 8:45 tutorial video covering:

1. Account Setup and Initial Configuration (0:00-1:30)
   - Creating your VoiceCraft account
   - Selecting your native and target languages
   - Setting up microphone permissions
   - Completing the initial pronunciation assessment

2. Understanding the Pronunciation Feedback System (1:30-3:00)
   - How AI analyzes your pronunciation
   - Interpreting accuracy scores and feedback
   - Understanding visual feedback indicators
   - Using the replay and comparison features

3. Navigating Different Exercise Types (3:00-5:15)
   - Word pronunciation exercises
   - Sentence reading practice
   - Conversation simulation mode
   - Phonetic training modules
   - Custom practice sessions

4. Tracking Progress and Setting Goals (5:15-7:00)
   - Accessing your progress dashboard
   - Understanding improvement metrics
   - Setting pronunciation goals
   - Reviewing historical performance
   - Identifying areas for improvement

5. Advanced Features and Customization (7:00-8:45)
   - Adjusting feedback sensitivity
   - Customizing practice difficulty
   - Setting up practice reminders
   - Exporting progress reports
   - Troubleshooting common issues

Video Features:
- High-quality screen recordings with clear audio
- Step-by-step visual demonstrations
- Real user interface walkthroughs
- Practical examples and use cases
- Professional narration and explanations

Perfect for:
- New users getting started with VoiceCraft
- Existing users wanting to explore advanced features
- Educators introducing VoiceCraft to students
- Training materials for organizations
- Reference guide for troubleshooting

File Details:
- Duration: 8 minutes 45 seconds
- Format: MP4 (1080p HD)
- Size: Approximately 125 MB
- Audio: Clear English narration
- Subtitles: Available in multiple languages

Note: This is a placeholder description. In a real implementation, this would trigger the download of the actual video file.`;

                        const blob = new Blob([videoContent], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'VoiceCraft-How-To-Use-Video-Tutorial.txt';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Video
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-purple-600" />
                    VoiceCraft Promotional Video
                  </CardTitle>
                  <CardDescription>
                    50-second promotional video for social media sharing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Megaphone className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                      <p className="text-indigo-700 font-medium">Promotional Video</p>
                      <p className="text-sm text-indigo-600">0:50 duration</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-900">Perfect for:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Social media posts (Instagram, Facebook, Twitter)</li>
                      <li>• Website embedding and landing pages</li>
                      <li>• Email marketing campaigns</li>
                      <li>• Educational content sharing</li>
                      <li>• App store promotional materials</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    User Success Stories
                  </CardTitle>
                  <CardDescription>
                    Real users sharing their VoiceCraft experience (5:20)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-green-50 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700 font-medium">Testimonials</p>
                      <p className="text-sm text-green-600">5:20 duration</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-900">Featured stories:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Maria from Spain - Business English improvement</li>
                      <li>• Hiroshi from Japan - Accent reduction success</li>
                      <li>• Sophie from France - Confidence building journey</li>
                      <li>• Ahmed from Egypt - Professional development</li>
                    </ul>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Stories
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="w-5 h-5 text-blue-600" />
                    Quick Start Guide
                  </CardTitle>
                  <CardDescription>
                    Get started in under 3 minutes (2:45)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <List className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-blue-700 font-medium">Quick Start</p>
                      <p className="text-sm text-blue-600">2:45 duration</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-900">Quick overview:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Sign up and account creation (30 seconds)</li>
                      <li>• Language selection and setup (45 seconds)</li>
                      <li>• First pronunciation test (60 seconds)</li>
                      <li>• Starting your first lesson (30 seconds)</li>
                    </ul>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Quick Start
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instagram Post</CardTitle>
                  <CardDescription>Ready-to-share social media content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg p-4 mb-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">🗣️ Perfect Your Pronunciation!</h3>
                      <p className="text-sm text-slate-700">
                        Transform your accent with AI-powered feedback. Join thousands improving their English pronunciation daily!
                      </p>
                    </div>
                    <div className="text-xs text-slate-600">
                      #VoiceCraft #PronunciationTraining #LearnEnglish #AI
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share on Instagram
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Image
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Facebook Post</CardTitle>
                  <CardDescription>Engaging content for Facebook sharing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">🎯 Struggling with English Pronunciation?</h3>
                    <p className="text-sm text-slate-700 mb-3">
                      VoiceCraft uses cutting-edge AI to give you instant, personalized feedback on your pronunciation. Whether you're preparing for a job interview, presentation, or just want to sound more confident - we've got you covered!
                    </p>
                    <div className="text-xs text-blue-600 font-medium">
                      ✅ AI-powered feedback<br/>
                      ✅ Progress tracking<br/>
                      ✅ Multiple languages supported<br/>
                      ✅ Practice anytime, anywhere
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share on Facebook
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Copy Text
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Twitter/X Post</CardTitle>
                  <CardDescription>Concise tweet-ready content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 rounded-lg p-4 mb-4 border-l-4 border-cyan-500">
                    <p className="text-sm text-slate-700 mb-2">
                      🚀 Just discovered VoiceCraft - an AI pronunciation tutor that actually works! 
                      
                      Perfect for anyone looking to improve their English accent. The real-time feedback is incredible! 
                      
                      #PronunciationTraining #AI #LearnEnglish #VoiceCraft
                    </p>
                    <div className="text-xs text-slate-500">
                      Character count: 247/280
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Tweet This
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Copy Tweet
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">LinkedIn Post</CardTitle>
                  <CardDescription>Professional networking content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">🎯 Enhance Your Professional Communication</h3>
                    <p className="text-sm text-slate-700 mb-3">
                      Clear pronunciation is crucial for professional success. VoiceCraft's AI-powered platform helps professionals worldwide improve their English pronunciation and boost their confidence in meetings, presentations, and networking events.
                    </p>
                    <p className="text-sm text-slate-700 mb-2">
                      Key benefits for professionals:
                      • Improved meeting participation
                      • Enhanced presentation skills  
                      • Greater confidence in client interactions
                      • Career advancement opportunities
                    </p>
                    <div className="text-xs text-blue-600">
                      #ProfessionalDevelopment #Communication #CareerGrowth #VoiceCraft
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share on LinkedIn
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Copy Post
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">YouTube Description</CardTitle>
                  <CardDescription>Video description template</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto">
                    <p className="text-sm text-slate-700 mb-2">
                      🎯 Master English Pronunciation with VoiceCraft AI
                    </p>
                    <p className="text-sm text-slate-700 mb-2">
                      In this video, we explore VoiceCraft - the revolutionary AI-powered pronunciation tutor that's helping thousands of learners worldwide improve their English accent and speaking confidence.
                    </p>
                    <p className="text-sm text-slate-700 mb-2">
                      ⏰ Timestamps:<br/>
                      0:00 - Introduction<br/>
                      1:30 - Getting Started<br/>
                      3:15 - Key Features<br/>
                      5:45 - Real User Results<br/>
                      7:20 - Pricing & Plans
                    </p>
                    <p className="text-sm text-slate-700">
                      🔗 Try VoiceCraft: [Your Link Here]<br/>
                      📱 Download the app: [App Store Links]<br/>
                      💬 Questions? Comment below!
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      Copy Description
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hashtag Collections</CardTitle>
                  <CardDescription>Curated hashtags for different platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">General (#30)</h4>
                      <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded">
                        #VoiceCraft #PronunciationTraining #LearnEnglish #AI #LanguageLearning #EnglishPronunciation #AccentReduction #SpeakingSkills #EnglishFluency #LanguageApp #PronunciationCoach #EnglishLearning #AITutor #SpeechTraining #EnglishAccent #LanguageTech #PronunciationPractice #EnglishImprovement #SpeakingConfidence #LanguageSkills #EnglishSpeaking #AccentTraining #PronunciationHelp #EnglishTips #LanguageEducation #SpeechImprovement #EnglishStudy #PronunciationApp #LanguageCoach #EnglishMastery
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Professional (#15)</h4>
                      <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded">
                        #ProfessionalDevelopment #BusinessEnglish #CareerGrowth #WorkplaceSkills #PresentationSkills #CommunicationSkills #ProfessionalSpeaking #BusinessCommunication #CareerAdvancement #WorkplaceConfidence #ProfessionalTraining #BusinessSkills #LeadershipSkills #NetworkingSkills #CareerSuccess
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    Copy All Hashtags
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600 mb-4">
              VoiceCraft Documentation & Marketing Suite - Everything you need to succeed with pronunciation training
            </p>
            <div className="flex justify-center space-x-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => downloadAllResources()}
              >
                <Download className="w-4 h-4 mr-2" />
                Download All Resources
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  const shareText = "Check out the VoiceCraft Documentation Suite - comprehensive guides for pronunciation improvement!"
                  if (navigator.share) {
                    navigator.share({
                      title: 'VoiceCraft Documentation Suite',
                      text: shareText,
                      url: window.location.href
                    })
                  } else {
                    navigator.clipboard.writeText(`${shareText} ${window.location.href}`)
                    alert('Link copied to clipboard!')
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Suite
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('mailto:support@voicecraft.com?subject=VoiceCraft Documentation Support', '_blank')}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Get Support
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App