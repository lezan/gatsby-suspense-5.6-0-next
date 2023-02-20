module.exports = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  flags: {
	DEV_SSR: true,
},
  plugins: [
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			path: `${__dirname}/src/data`,
			name: 'data',
		},
	},
	'gatsby-transformer-json',
  ],
}
