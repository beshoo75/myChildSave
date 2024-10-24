import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [

  // ]
  // optimizeDeps: {
  //   exclude: ["android"],
  // },
})

// apiKey=AIzaSyBTfYU0MEJW0Oz_fEaC_Zf1czU1dj2YgBw