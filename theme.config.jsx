const themeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: '%s – AMPATH Forms',
    }
  },
  docsRepositoryBase: 'https://github.com/denniskigen/ampath-forms/blob/main',
  logo: (
    <>
      <svg
        className="fill-current"
        height={24}
        width={24}
        viewBox="0 0 206 233"
        xmlns="http://www.w3.org/2000/svg"
        styles={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinejoin: 'round',
          strokeMiterlimit: 2,
          fill: 'currentColor',
        }}
      >
        <path
          d="M217.596 180.455c-6.666-4.186-8.706-12.989-4.529-19.68 4.2-6.681 12.991-8.709 19.672-4.548 6.696 4.2 8.721 12.989 4.56 19.685-4.19 6.672-13.021 8.725-19.703 4.543M230.678 75.121s-5.758 103.496-104.229 172.388c5.013-4.134 71.279-73.305 58.775-85.259-7.929-10.279-33.758-24.929-57.171-32.242 0 0 39.875-3.387 68.296 8.242 4.575-4.337 28.45-37.258 34.329-63.129"
          styles={{ fill: '#54b947', fillRule: 'nonzero' }}
          transform="matrix(.96533 0 0 1 -26.125 -14.65)"
        />
        <path
          d="M38.514 187.159c6.811-3.985 15.552-1.672 19.529 5.125 3.973 6.814 1.67 15.558-5.126 19.521-6.814 3.987-15.551 1.69-19.529-5.116-3.988-6.8-1.669-15.549 5.126-19.53M126.451 247.509S29.163 195.842 27.063 71.708c1.329 6.346 26.217 100.775 42.621 95.238 12.808-2.242 37.754-18.304 55.129-35.633 0 0-15.55 36.875-39.05 56.641 1.713 6.067 20.479 42.325 40.688 59.555"
          styles={{ fill: '#71cbd2', fillRule: 'nonzero' }}
          transform="matrix(.96533 0 0 1 -26.125 -14.65)"
        />
        <path
          d="M129.035 30.128c-.66 7.86-7.584 13.685-15.441 13-7.836-.646-13.674-7.57-12.998-15.421.662-7.872 7.567-13.674 15.421-13.005 7.853.651 13.683 7.571 13.018 15.426M27.063 71.707s97.363-52.792 203.617 3.413c-5.98-2.596-98.138-28.484-103.075-11.875-5.521 11.745-6.784 41.416-2.604 65.57 0 0-21.196-33.925-23.817-64.533-5.942-2.087-48.417.85-74.121 7.425"
          styles={{ fill: '#0055a5', fillRule: 'nonzero' }}
          transform="matrix(.96533 0 0 1 -26.125 -14.65)"
        />
      </svg>
      <span className="ml-2 font-semibold hidden md:inline">AMPATH Forms</span>
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
        content="AMPATH Forms: Build and test OpenMRS form schemas"
      />
      <meta
        name="og:description"
        content="AMPATH Forms: Build and test OpenMRS form schemas"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="apple-mobile-web-app-title" content="AMPATH Forms" />
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
  project: {
    link: 'https://github.com/denniskigen/ampath-forms',
  },
  footer: {
    text: (
      <div className="text-xs flex justify-between">
        <span>© {new Date().getFullYear()} AMPATH.</span>
        <span style={{ marginLeft: '0.5rem' }}>
          Crafted by{' '}
          <a
            style={{ color: '#006be6' }}
            href="https://denniskigen.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dennis
          </a>
          .
        </span>
      </div>
    ),
  },
  nextThemes: {
    defaultTheme: 'dark',
  },
}

export default themeConfig
