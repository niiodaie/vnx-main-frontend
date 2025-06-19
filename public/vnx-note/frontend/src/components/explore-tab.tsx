import { Compass, Sparkles, TrendingUp, Users, BookOpen } from "lucide-react";

export default function ExploreTab() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Explore</h1>
        <p className="text-slate-600">Discover popular note themes and trending topics across VNX.</p>
      </div>

      {/* Coming Soon Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-12 shadow-sm text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Explore Popular Themes Across VNX
          </h2>
          
          <p className="text-slate-600 mb-8">
            Coming soon! Discover trending topics, popular note themes, and connect with the broader VNX community.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Trending Topics</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <Users className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Community Insights</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <BookOpen className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Popular Templates</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <Sparkles className="w-6 h-6 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">AI Recommendations</p>
            </div>
          </div>
          
          <div className="text-sm text-slate-500">
            This feature will help you discover new ideas and connect with other VNX users.
          </div>
        </div>
      </div>

      {/* Feature Preview */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800 mb-2">What's Coming</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Browse trending note topics across the VNX community</li>
          <li>• Discover popular note templates and structures</li>
          <li>• Get AI-powered recommendations for related content</li>
          <li>• Connect with users who share similar interests</li>
        </ul>
      </div>
    </div>
  );
}