import babel from "vite-plugin-babel";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = { target: "19" };

export default defineConfig({
  plugins: [
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig]
        ]
      }
    }),

    tailwindcss(),
    reactRouter(),
    tsconfigPaths()],

  resolve:
		process.env.NODE_ENV === "development"
		  ? {}
		  : {
		    alias: {
		      "react-dom/server": "react-dom/server.node"
		    }
		  }
});
