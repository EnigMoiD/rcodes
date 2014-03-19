function Decoder(selector, bands) {
	this.container = $(selector)
	this.container.addClass('decoder')

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

	this.carousels = []

	for (var sel in bandMap) {
		var data = bandMap[sel]
		this.container.append('<div class="' + sel + '"></div>')
		this.carousels.push(new Carousel(data, '.'+sel, {style: {'width': '20%', 'display': 'inline-block', 'overflow': 'hidden'}, height: 300}))
	}
}