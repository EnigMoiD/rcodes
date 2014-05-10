function Decoder(selector, bands) {
	var dec = this
	dec.container = $(selector)
	dec.container.addClass('decoder')

	dec.possibleBands = [4, 5, 6]

	var mantissae = []
	var tolerances = []
	var exponents = []
	for (var key in map) {
		var band = map[key]

		var bandCell = { content: "", color: band.color.name, data: key }

		if (band.mant !== null) mantissae.push(bandCell)
		if (band.exp !== null) exponents.push(bandCell)
		if (band.tol !== null) tolerances.push(bandCell)
	}

	var bandMap = {}

	for (var i = 0; i < bands-2; i++)
		bandMap['mantissa'+i] = mantissae

	bandMap['exponent'] = exponents
	bandMap['tolerance'] = tolerances

	dec.container.append('<div class="carousel-chain"></div>')
	dec.carouselChain = new CarouselChain('.carousel-chain', bandMap, {
		cellHeight: 40
	})
	dec.container.append('<div class="display"></div>')
	dec.display = $(dec.container).find('.display')

	dec.resistorCode = function() {
		var string = ""
		for (var i in dec.carouselChain.carousels) {
			string += dec.carouselChain.carousels[i].selectedData
		}
		return string
	}

	$(dec.carouselChain.container).click(function() {
		dec.display.html(dec.resistorValue().value)
	})

	dec.resistorValue = function() {
		return decode(dec.resistorCode())
	}

	dec.container.append('<div class="band-buttons"></div>')
	for (var i in dec.possibleBands) {
		bands = dec.possibleBands[i]
		$('.band-buttons').append('<button class="band-choice" data="'+bands+'">'+bands+'</button>')
	}
	$('.band-choice').click(function() {
		console.log(this);
	})
}