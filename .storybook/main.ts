import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: [
    "../public"
  ],
  viteFinal: async (config) => {
    config.css = {
      ...config.css,
      postcss: {
        plugins: [
          require('@tailwindcss/postcss'),
          require('autoprefixer')
        ]
      }
    };
    return config;
  }
};

export default config;