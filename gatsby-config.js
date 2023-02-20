require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `My Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  flags: {
	DEV_SSR: true,
},
  plugins: [
	'gatsby-plugin-image',
	{
		resolve: 'gatsby-source-shopify',
		options: {
			password: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
			storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
			salesChannel: process.env.SHOPIFY_SALES_CHANNEL,
			shopifyConnections: ['collections'],
		},
	},
  ],
}
