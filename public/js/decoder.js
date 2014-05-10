function Decoder(selector, bands) {
	var dec = this
	this.container = $(selector)
	this.container.addClass('decoder')

	this.possibleBands = [4, 5, 6]

	var mantissae = []
	var tolerances = []
	var exponents = []
	for (var key in map) {
		band = map[key]

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

	this.container.append('<div class="carousel-chain"></div>')
	this.carouselChain = new CarouselChain('.carousel-chain', bandMap, {
		cellHeight: 40
	})
	this.container.append('<div class="display"></div>')
	this.display = $(this.container).find('.display')

	this.resistorCode = function() {
		var string = ""
		for (var i in dec.carouselChain.carousels) {
			string += dec.carouselChain.carousels[i].selectedData
		}
		return string
	}

	$(dec.carouselChain.container).click(function() {
		dec.display.html(dec.resistorValue().value)
	})

	this.resistorValue = function() {
		return decode(dec.resistorCode())
	}

	this.container.append('<div class="band-buttons"></div>')
	for (var i in this.possibleBands) {
		bands = this.possibleBands[i]
		$('.band-buttons').append('<button class="band-choice" data="'+bands+'">'+bands+'</button>')
	}
	$('.band-choice').click(function() {
		console.log(this);
	})
}