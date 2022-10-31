// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [
      // 'localhost',
      ...process.env.IMAGE_DOMAINS.split(',')
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `${process.env.BACKEND_BASE_URL}/api/:path*/`,
      },
      {
        source: "/file-upload/:path*",
        destination: `${process.env.NEXT_PUBLIC_ROCKETCHAT}/file-upload/:path*`,
      }
    ];
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["ar"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "ar",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en-US',
    //   },
    // ],
  },
};

module.exports = nextConfig;

//
// pages/_document.js
// Done! (with install mui)
