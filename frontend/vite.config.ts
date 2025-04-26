import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = { target: "19" };

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig]
        ]
      }
    }),

    tailwindcss(),
    reactRouter(),
    tsconfigPaths()],

  // fix for dockerfile:
  resolve:
		process.env.NODE_ENV === "development"
		  ? {}
		  : {
		    alias: {
		      "react-dom/server": "react-dom/server.node"
		    }
		  }
});
