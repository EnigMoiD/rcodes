function Decoder(selector, bands) {
	var container = $(selector)
	container.addClass('decoder')

	var mantissae = []
	var tolerances = []
	var exponents = []
	for (var key in map) {
		band = map[key]

		var bandCell = { content: "", color: band.color.name }

		if (band.mant !== null) mantissae.push(bandCell)
		if (band.exp !== null) exponents.push(bandCell)
		if (band.tol !== null) tolerances.push(bandCell)
	}

	var bandMap = {}

	for (var i = 0; i < bands-2; i++)
		bandMap['mantissa'+i] = mantissae

	bandMap['exponent'] = exponents
	bandMap['tolerance'] = tolerances

	for (var sel in bandMap) {
		var data = bandMap[sel]
		container.append('<div class="' + sel + '"></div>')
		Carousel(data, '.'+sel, {'width': '20%', 'display': 'inline-block'})
	}
}