const { graphql } = require('gatsby');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.onPostBuild = ({ graphql }) => new Promise((resolve) => {
	resolve(
		graphql(`
			query {
				shopify: allShopifyProduct {
					nodes {
						title
						fullDescription: descriptionHtml
						handle
						media {
							... on ShopifyMediaImage {
								image {
									gatsbyImageData(layout: FIXED, width: 1920)
								}
							}
						}
						variants {
							title
							price
							sku
							selectedOptions {
								name
								value
							}
						}
						priceRangeV2 {
							minVariantPrice {
								currencyCode
							}
						}
						metafields {
							value
							namespace
							key
						}
						collections {
							title
						}
					}
				}
				site {
					siteMetadata {
						siteUrl
					}
				}
			}
		`).then((result) => {
			const shopify = result?.data?.shopify?.nodes;

			const availability = 'in stock';
			const condition = 'new';
			const brand = 'VizCart';
			const google_product_category = 'Home & Garden > Decor > Artwork > Posters, Prints, & Visual Artwork';
			const fb_product_category = 'home goods > home decor > decorative accents > posters, prints & paintings';
			const product_type = google_product_category;
			const status = 'active';
			const gender = 'unisex';
			const quantity = 1000;
			const inventory = 1000;

			const items = [];
			shopify?.forEach((item) => {
				const titleSplit = item?.title?.split(' | ');
				const title = `${titleSplit[0]} | ${titleSplit[1]}`;

				let description = '';
				let custom_label_0 = '';
				item?.metafields?.forEach((d) => {
					if (d?.key === 'vizcartdescription') {
						description = d?.value;
					}
					if (d?.key === 'vizcartregion') {
						custom_label_0 = d?.value;
					}
				});

				const image_link = gpi.getSrc(item?.media[0]?.image);
				const item_group_id = item?.handle;
				const additional_image_link = item?.media?.slice(1)?.map((d) => gpi.getSrc(d?.image));
				const rich_text_description = item?.fullDescription;

				const custom_label_1 = item?.collections[0]?.title;

				item?.variants?.forEach((d) => {
					items.push({
						id: d?.sku || createSku(
							item?.handle,
							d?.selectedOptions[1]?.value,
							d?.selectedOptions[0]?.value,
						),
						title,
						description,
						price: `${d?.price} ${item?.priceRangeV2?.minVariantPrice?.currencyCode}`,
						link: `${result?.data?.site?.siteMetadata?.siteUrl}/products/${item?.handle}${createUrl(d?.selectedOptions[0]?.value, d?.selectedOptions[1]?.value)}`,
						image_link,
						additional_image_link,
						brand,
						google_product_category,
						fb_product_category,
						item_group_id,
						status,
						gender,
						availability,
						condition,
						size: `${d?.selectedOptions[0]?.value} cm`,
						material: d?.selectedOptions[1]?.value,
						custom_label_0,
						custom_label_1,
						product_type,
						rich_text_description,
						description_html: rich_text_description,
						quantity,
						inventory,
						mpn: d?.sku || createSku(
							item?.handle,
							d?.selectedOptions[1]?.value,
							d?.selectedOptions[0]?.value,
						),
						variants_name: 'Material,Size',
						variants_value: `${d?.selectedOptions[1]?.value},${d?.selectedOptions[0]?.value} cm`,
						free_shipping_label: true,
					});
				});
			});

			const header = Object.keys(items[0]).map((d) => ({
				id: d,
				title: d,
			}));

			const csvWriter = createCsvWriter({
				path: 'public/catalog.csv',
				header,
			});

			csvWriter.writeRecords(items);
		}),
	);
});
