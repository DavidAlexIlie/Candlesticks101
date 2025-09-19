/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  safelist: [
    // Green-Blue
    "from-green-800","to-green-900","border-green-600",
    "from-green-700","to-green-800","hover:from-green-600","hover:to-green-700",
    "border-green-500","from-green-500","to-green-600",
    "text-green-400","text-green-300","text-green-100",
    "bg-green-600","hover:bg-green-700",
  
    // Orange-Red
    "from-red-800","to-red-900","border-red-600",
    "from-red-700","to-red-800","hover:from-red-600","hover:to-red-700",
    "border-red-500","from-red-500","to-red-600",
    "text-red-400","text-red-300","text-red-100",
    "bg-red-600","hover:bg-red-700",
  
    // Purple-Blue
    "from-purple-800","to-blue-800","border-purple-600",
    "from-purple-700","to-blue-700","hover:from-purple-600","hover:to-blue-600",
    "border-purple-500","from-purple-500","to-blue-500",
    "text-purple-400","text-purple-300","text-purple-100",
    "bg-purple-600","hover:bg-purple-700",
  
    // Cyan-Blue
    "from-blue-800","to-blue-900","border-blue-600",
    "from-blue-700","to-blue-800","hover:from-blue-600","hover:to-blue-700",
    "border-blue-500","from-blue-500","to-blue-600",
    "text-blue-400","text-blue-300","text-blue-100",
    "bg-blue-600","hover:bg-blue-700",
  
    // Teal-Green
    "from-emerald-800","to-emerald-900","border-emerald-600",
    "from-emerald-700","to-emerald-800","hover:from-emerald-600","hover:to-emerald-700",
    "border-emerald-500","from-emerald-500","to-emerald-600",
    "text-emerald-400","text-emerald-300","text-emerald-100",
    "bg-emerald-600","hover:bg-emerald-700"
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
}

