const { configure } = require("quasar/wrappers");

module.exports = configure(function (ctx) {
  return {
    css: ["app.scss"],

    extras: [
      "material-icons", 
      'fontawesome-v6'
    ],

    build: {
      target: {
        browser: ["es2022", "firefox115", "chrome115", "safari14"],
        node: "node20",
      },

      vueRouterMode: "history",
    },

    framework: {
      config: {},

      iconSet: "material-icons",

      plugins: [],
    },
  };
});
