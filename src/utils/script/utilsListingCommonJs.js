const lookupMaterialToHash = {
	'Matte Museum paper': 'mm',
	'Luster Museum paper': 'lm',
	'Matte Cotton paper': 'mc',
	'White Frame': 'mf',
};

exports.createSku = (handle, material, size) => {
	const tSize = size.replaceAll(' ', '');

	const tMaterial = lookupMaterialToHash[material];

	const result = `${handle}-${tMaterial}-${tSize}`;

	return result;
};

exports.createUrl = (size, material) => `?s=${size.replaceAll(' ', '')}&m=${lookupMaterialToHash[material]}`;
