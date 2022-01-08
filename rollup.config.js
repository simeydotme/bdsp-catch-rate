// this file will not afect the sandbox but will
// afect the deployment and dowload

import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";
// import copy from "rollup-plugin-copy";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import yaml from "@rollup/plugin-yaml";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "index.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: (css) => {
        css.write("bundle.css");
      },
    }),
    json(),
    yaml(),
    alias({
      entries: [
        { find: "c", replacement: "App/components" },
        { find: "p", replacement: "App/components/partials" },
        { find: "s", replacement: "stores" },
        { find: "l", replacement: "lib" },
        { find: "pub", replacement: "public" },
      ],
    }),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve(),
    commonjs(),

    // copy({
    //   targets: [
    //     {
    //       src: "node_modules/pokemon-sprites/sprites/pokemon/versions/generation-v/black-white/animated/*.gif",
    //       dest: "public/sprites/animated",
    //     },
    //     {
    //       src: "node_modules/pokemon-sprites/sprites/pokemon/versions/generation-viii/icons/*.png",
    //       dest: "public/sprites/icons",
    //     },
    //   ],
    // }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    chokidar: {
      usePolling: true,
    },
  },
};
