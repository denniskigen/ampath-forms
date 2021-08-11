export default {
  github: 'https://github.com/denniskigen/ampath-forms',
  docsRepositoryBase: 'https://github.com/denniskigen/ampath-forms/blob/main',
  titleSuffix: ' – AMPATH Forms',
  logo: (
    <>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="a" x="-10%" y="-10%" width="120%" height="120%">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur" />
          </filter>
        </defs>
        <path fill="#60F" d="M0 0h24v24H0z" />
        <g filter="url(#a)">
          <circle cx="12" cy="18" fill="#0C9" r="11" />
          <circle cx="2" cy="2" fill="#60F" r="11" />
          <circle cx="21" cy="2" fill="#0C9" r="11" />
          <circle cx="17" cy="21" fill="#0C9" r="11" />
          <circle cx="7" cy="15" fill="#60F" r="11" />
          <circle cx="2" cy="17" fill="#0C9" r="11" />
        </g>
      </svg>
      <span className="ml-2 font-extrabold hidden md:inline">AMPATH Forms</span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="AMPATH Forms: Build and test POC form schemas"
      />
      <meta
        name="og:description"
        content="AMPATH Forms: Build and test POC form schemas"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="apple-mobile-web-app-title" content="AMPATH Forms" />
      <link
        rel="stylesheet preload"
        href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
        as="style"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/@tailwindcss/typography@0.4.x/dist/typography.min.css"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
    </>
  ),
  search: false,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: 'Edit this page on GitHub',
  footerText: <>{new Date().getFullYear()} © AMPATH</>,
}
