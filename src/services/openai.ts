import OpenAI from 'openai';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class OpenAIService {
  private openai: OpenAI;
  private isConfigured: boolean;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.isConfigured = !!apiKey && !this.isPlaceholderKey(apiKey) && apiKey.length > 20;
    
    // Always set to false to force demo mode
    this.isConfigured = false;
    
    if (false) { // Never initialize the actual API client
      try {
        this.openai = new OpenAI({
          apiKey: apiKey,
          dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
        });
      } catch (error) {
        console.error('Failed to initialize OpenAI:', error);
        this.isConfigured = false;
      }
    } else {
      console.warn('OpenAI API key not configured. AI Assistant will use demo responses.');
    }
  }

  private isPlaceholderKey(apiKey: string): boolean {
    // Check for common placeholder patterns
    const placeholderPatterns = [
      'your_openai_api_key',
      'your_openai_api_key',
      'your_api_key_here',
      'sk-placeholder',
      'sk-your',
      'sk-demo',
      'sk-proj'
    ];
    
    return placeholderPatterns.some(pattern => 
      apiKey.toLowerCase().includes(pattern.toLowerCase())
    ) || apiKey.length < 20; // OpenAI keys are typically much longer
  }

  async generateResponse(messages: AIMessage[]): Promise<string> {
    if (!this.isConfigured) {
      return this.getDemoResponse(messages[messages.length - 1]?.content || '');
    }

    try {
      const systemMessage: AIMessage = {
        role: 'system',
        content: `You are an AI learning assistant for SkillArena, a gamified learning platform focused on game development, programming, and technical skills. You help users with:

- Game development guidance (Unity, Unreal Engine, Godot, etc.)
- Programming languages and frameworks
- Career advice in gaming and tech
- Learning path recommendations
- Platform features and tutorials
- Code debugging and best practices
- Game testing methodologies
- Industry insights and trends

Be helpful, encouraging, and provide practical advice. Keep responses concise but informative. When discussing code, provide examples when helpful. Always maintain an enthusiastic and supportive tone that matches the gamified learning environment.`
      };

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, ...messages],
        max_tokens: 500,
        temperature: 0.7,
        stream: false,
      });

      return response.choices[0]?.message?.content || 'Sorry, I could not generate a response at this time.';
    } catch (error: any) {
      console.error('OpenAI API Error:', error);
      
      if (error.code === 'insufficient_quota') {
        return 'I apologize, but the API quota has been exceeded. Please check your OpenAI account billing or try again later.';
      } else if (error.code === 'invalid_api_key') {
        return 'There seems to be an issue with the API configuration. Please check your OpenAI API key.';
      } else if (error.code === 'rate_limit_exceeded') {
        return 'I\'m receiving too many requests right now. Please wait a moment and try again.';
      } else {
        return 'I\'m having trouble connecting to my AI services right now. Please try again in a moment.';
      }
    }
  }

  private getDemoResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    if (input.includes('game development') || input.includes('start learning')) {
      return "Great question! To start learning game development, I recommend:\n\n1. **Choose an Engine**: Unity (C#) for beginners, Unreal Engine (C++/Blueprints) for advanced graphics\n2. **Learn Programming**: C# for Unity, C++ or Blueprint for Unreal\n3. **Start Small**: Begin with simple games like Pong or Tetris\n4. **Take Our Tutorials**: Check out our 'Game Development Fundamentals' course in the Tutorials section!\n\nWould you like specific recommendations based on your experience level?";
    }
    
    if (input.includes('programming language') || input.includes('languages')) {
      return "For game development, here are the most important programming languages:\n\n🎮 **C#**: Perfect for Unity, easy to learn, great for beginners\n⚡ **C++**: Used in Unreal Engine, AAA games, high performance\n🌐 **JavaScript**: Web games, browser-based development\n🐍 **Python**: Game scripting, tools, AI/ML in games\n\nI'd recommend starting with C# and Unity - it's beginner-friendly and widely used in the industry!";
    }
    
    if (input.includes('game test') || input.includes('tester') || input.includes('qa')) {
      return "Becoming a game tester is an excellent entry point into the gaming industry! Here's how:\n\n📝 **Skills Needed**:\n- Attention to detail\n- Clear communication\n- Patience and persistence\n- Basic understanding of games\n\n🚀 **Getting Started**:\n1. Check our Game Testing section for opportunities\n2. Complete our 'Professional Game Testing' tutorial\n3. Practice writing detailed bug reports\n4. Apply to beta testing programs\n\nMany of our partners are always looking for reliable testers!";
    }
    
    if (input.includes('unity') || input.includes('unreal')) {
      return "Great question about game engines!\n\n**Unity**:\n✅ Beginner-friendly\n✅ C# programming\n✅ Great for 2D and mobile games\n✅ Large community and resources\n\n**Unreal Engine**:\n✅ Industry-standard for AAA games\n✅ Amazing graphics capabilities\n✅ Blueprint visual scripting\n✅ Free for small projects\n\n**Recommendation**: Start with Unity if you're new to programming, choose Unreal if you want cutting-edge graphics or have C++ experience.";
    }
    
    if (input.includes('career') || input.includes('job') || input.includes('industry')) {
      return "The gaming industry offers many exciting career paths:\n\n🎨 **Creative Roles**:\n- Game Designer\n- Level Designer\n- Artist/Animator\n- Sound Designer\n\n⚙️ **Technical Roles**:\n- Programmer/Developer\n- QA Tester\n- Technical Artist\n- DevOps Engineer\n\n📊 **Business Roles**:\n- Producer\n- Marketing\n- Community Manager\n\nOur platform helps you explore all these paths with hands-on experience!";
    }

    if (input.includes('tutorial') || input.includes('course') || input.includes('learn')) {
      return "We have amazing tutorials in our Tutorials section! Here are some popular ones:\n\n🎮 **Game Development Fundamentals** - Perfect for beginners\n💻 **Advanced JavaScript Patterns** - Level up your coding\n🎨 **Creative Coding & Visual Art** - Explore the artistic side\n🤖 **AI & Machine Learning Basics** - Future-proof your skills\n🧪 **Professional Game Testing** - Start your QA career\n\nAll tutorials include hands-on projects and real-world applications!";
    }
    
    return "Thanks for your question! I'm here to help you with game development, programming, career guidance, and navigating SkillArena's features. Feel free to ask about:\n\n• Getting started with game development\n• Programming languages and tools\n• Career paths in gaming\n• Our tutorials and challenges\n• Game testing opportunities\n\nWhat would you like to learn about?";
  }

  isApiConfigured(): boolean {
    return this.isConfigured;
  }
}

export const openaiService = new OpenAIService();