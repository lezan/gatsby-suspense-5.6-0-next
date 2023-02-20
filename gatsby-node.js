const { graphql } = require('gatsby');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.onPostBuild = ({ graphql }) => new Promise((resolve) => {
	resolve(
		graphql(`
			query {
				test: allDataJson {
					nodes {
						name
						email
					}
				}
			}
		`).then((result) => { 
			console.log(result);
			const header = Object.keys(result?.data?.test?.nodes[0]).map((d) => ({
				id: d,
				title: d,
			}));

			const csvWriter = createCsvWriter({
				path: 'public/catalog.csv',
				header,
			});

			csvWriter.writeRecords(result?.data?.test?.nodes);
		}),
	);
});
