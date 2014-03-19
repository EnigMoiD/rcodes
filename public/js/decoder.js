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

	this.container.append('<div class="carousel-chain"></div>')

	this.carouselChain = CarouselChain('.carousel-chain', bandMap, {
		cellHeight: 40
	})
}