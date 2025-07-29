/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        myPink: '#C98686',
        myOrange: '#f2b880',
        myWhite: '#fff4ec',
        backgroundColor: '#E7CFBC'
      },
      fontFamily: {
        sans: ['sans-serif'],
        serif: ['serif'],
        mono: ['monospace'],
        georgia: ['Georgia'],
        verdana: ['Verdana'],
        avenir: ['Avenir'],
        times: ['Times New Roman'],
        courier: ['Courier'],
      },
    },
    
  },
  plugins: ["nativewind/babel"],
}