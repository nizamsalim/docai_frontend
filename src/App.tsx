import {
  ArrowRight,
  Zap,
  Brain,
  MessageSquare,
  FileText,
  LogOut,
  Folder,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth, type AuthContextType } from "./context/AuthContext";
import { useLoader, type LoaderContextType } from "./context/LoaderContext";

export default function App() {
  const { user, logout } = useAuth() as AuthContextType;
  const { setIsLoading } = useLoader() as LoaderContextType;
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DocAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-400 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-slate-400 hover:text-white transition"
            >
              Benefits
            </a>
            <a
              href="#faq"
              className="text-slate-400 hover:text-white transition"
            >
              FAQ
            </a>
          </div>
          {user ? (
            <button
              onClick={async () => {
                setIsLoading(true);
                await logout();
                setIsLoading(false);
              }}
              className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-white text-slate-950 px-6 py-2 rounded-full font-semibold hover:bg-slate-100 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-slate-800 border border-slate-700 rounded-full">
            <p className="text-sm text-slate-300">
              ✨ Generate documents 10x faster with AI
            </p>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-balance leading-tight">
            Create Polished Documents in Minutes, Not Hours
          </h1>

          <p className="text-xl text-slate-400 mb-10 text-balance max-w-2xl mx-auto leading-relaxed">
            Transform simple section headings into beautifully formatted
            documents and presentations. Refine them naturally through
            conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="bg-white text-slate-950 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-100 transition flex items-center justify-center gap-2 group"
              onClick={() => {
                if (user) {
                  navigate("/projects");
                } else {
                  navigate("/auth/login");
                }
              }}
            >
              {user ? (
                <>
                  <p>My Projects</p>
                  <Folder className="w-5 h-5 group-hover:translate-x-1 transition" />
                </>
              ) : (
                <>
                  <p> Get Started</p>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
            <button className="border border-slate-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800/50 transition flex items-center justify-center gap-2">
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Hero Visual */}
          <div className="relative rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-8 backdrop-blur overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>
            <div className="relative">
              <div className="bg-slate-950 rounded-lg p-6 border border-slate-800 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                  <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                  <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                </div>
                <div className="space-y-2 text-left">
                  <div className="h-2 bg-slate-800 rounded w-1/3"></div>
                  <div className="h-2 bg-slate-800 rounded w-2/3"></div>
                  <div className="h-2 bg-slate-800 rounded w-1/2"></div>
                </div>
              </div>
              <div className="bg-slate-950 rounded-lg p-6 border border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-slate-400">
                    AI is generating...
                  </span>
                </div>
                <div className="space-y-2 text-left">
                  <div className="h-2 bg-gradient-to-r from-blue-500/50 to-transparent rounded"></div>
                  <div className="h-2 bg-gradient-to-r from-blue-500/30 to-transparent rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to create professional documents effortlessly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Generate complete documents in seconds, not hours. AI handles the heavy lifting.",
              },
              {
                icon: Brain,
                title: "AI-Powered Intelligence",
                description:
                  "Advanced algorithms understand context and create coherent, well-structured content.",
              },
              {
                icon: MessageSquare,
                title: "Conversational Refinement",
                description:
                  "Chat naturally with the AI to adjust tone, content, and format until perfect.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition hover:from-slate-800/70"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Teams Choose DocAI
              </h2>
              <div className="space-y-6">
                {[
                  { metric: "80%", label: "Less time spent writing" },
                  { metric: "10x", label: "Faster document creation" },
                  { metric: "99%", label: "Formatting accuracy" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">
                          {item.metric.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{item.metric}</p>
                      <p className="text-slate-400">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur">
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold">You:</p>
                      <p className="text-slate-400">
                        Create a quarterly business review
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold">DocAI:</p>
                      <p className="text-slate-400">
                        Generates complete QBR with executive summary, metrics,
                        and insights
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold">You:</p>
                      <p className="text-slate-400">
                        Adjust tone to be more formal and add specific data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Join thousands of professionals creating better documents faster.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center gap-2 mx-auto group">
            Start Creating{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">DocAI</span>
              </div>
              <p className="text-slate-400 text-sm">
                Creating the future of document generation.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Security"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Resources", links: ["Docs", "API", "Community"] },
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-white transition text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <p>&copy; 2025 DocAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms
              </a>
              <a href="#" className="hover:text-white transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
