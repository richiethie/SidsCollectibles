/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        typography: (theme) => ({
          invert: {
            css: {
              '--tw-prose-body': theme('colors.zinc.300'),
              '--tw-prose-headings': theme('colors.white'),
              '--tw-prose-links': theme('colors.emerald.400'),
              '--tw-prose-bold': theme('colors.white'),
              '--tw-prose-counters': theme('colors.zinc.400'),
              '--tw-prose-bullets': theme('colors.zinc.600'),
              '--tw-prose-hr': theme('colors.zinc.700'),
              '--tw-prose-quotes': theme('colors.zinc.100'),
              '--tw-prose-quote-borders': theme('colors.zinc.700'),
              '--tw-prose-captions': theme('colors.zinc.500'),
              '--tw-prose-code': theme('colors.emerald.400'),
              '--tw-prose-pre-code': theme('colors.zinc.100'),
              '--tw-prose-pre-bg': theme('colors.zinc.800'),
              '--tw-prose-th-borders': theme('colors.zinc.600'),
              '--tw-prose-td-borders': theme('colors.zinc.700'),
            },
          },
        }),
      },
    },
    plugins: [require('@tailwindcss/typography')],
  };