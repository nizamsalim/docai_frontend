import { useState } from "react";
import { Eye, EyeOff, ArrowRight, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { useLoader, type LoaderContextType } from "../../context/LoaderContext";
import {
  AlertType,
  useAlert,
  type AlertContextType,
} from "../../context/AlertContext";
import { useAuth, type AuthContextType } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "nizamsalim",
    password: "nizam123",
  });

  const { setIsLoading } = useLoader() as LoaderContextType;
  const { showAlert } = useAlert() as AlertContextType;
  const { login } = useAuth() as AuthContextType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = (await login(formData.username, formData.password)) as {
      success?: boolean;
      message?: string;
    };

    setIsLoading(false);
    console.log(res);
    if (!res.success) {
      showAlert({ type: AlertType.DANGER, title: res.message! });
      return;
    }
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DocAI</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 pt-24 flex overflow-hidden">
        {/* Left Pane - 70% */}
        <div className="hidden lg:flex w-7/12 bg-gradient-to-br from-slate-800/20 to-slate-900/20 border-r border-slate-800/50 flex-col items-center justify-center px-12 py-8">
          <div className="max-w-md">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                Sign in to your DocAI account to continue creating amazing
                documents and presentations.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: "⚡",
                  title: "Quick Access",
                  desc: "Access all your documents instantly",
                },
                {
                  icon: "🔒",
                  title: "Secure",
                  desc: "Your data is encrypted and protected",
                },
                {
                  icon: "✨",
                  title: "Seamless",
                  desc: "Continue where you left off",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane - 30% */}
        <div className="w-full lg:w-5/12 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Sign In</h1>
              <p className="text-slate-400">
                Enter your credentials to continue
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder:text-slate-500 transition"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder:text-slate-500 transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center gap-2 mt-8"
                disabled={
                  formData.username.trim().length === 0 ||
                  formData.password.trim().length === 0
                }
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/auth/register")}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
