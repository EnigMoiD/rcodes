function Decoder(selector, bands) {
	var dec = this
	dec.$c = $(selector)
	dec.$c.addClass('decoder')

	dec.possibleBands = [4, 5, 6]

	var mantissae = []
	var tolerances = []
	var exponents = []

	var bandMap = {}

	dec.init = function(bands) {
		for (var key in map) {
			var band = map[key]

			var bandCell = { content: "", color: band.color.name, data: key }

			if (band.mant !== null) mantissae.push(bandCell)
			if (band.exp !== null) exponents.push(bandCell)
			if (band.tol !== null) tolerances.push(bandCell)
		}

		for (var i = 0; i < bands-2; i++)
			bandMap['mantissa'+i] = mantissae

		bandMap['exponent'] = exponents
		bandMap['tolerance'] = tolerances

		dec.$c.append('<div class="carousel-chain"></div>')
		dec.carouselChain = new CarouselChain('.carousel-chain', bandMap, {
			cellHeight: 40
		})
		dec.$c.append('<div class="display"></div>')
		dec.display = $(dec.$c).find('.display')

		$(dec.carouselChain.$c).click(function() {
			dec.display.html(dec.resistorValue().str)
		})

		dec.$c.append('<div class="band-buttons"></div>')
		for (var i in dec.possibleBands) {
			bands = dec.possibleBands[i]
			$('.band-buttons').append('<button class="band-choice" data="'+bands+'">'+bands+'</button>')
		}

		$('.band-choice').click(function() {
			dec.clear()
			dec.init($(this).attr('data'))
		})
	}

	dec.clear = function() {
		dec.$c.empty()

		mantissae = []
		tolerances = []
		exponents = []

		bandMap = {}
	}

	dec.resistorCode = function() {
		var string = ""
		for (var i in dec.carouselChain.carousels) {
			string += dec.carouselChain.carousels[i].selectedData
		}
		return string
	}

	dec.resistorValue = function() {
		return decode(dec.resistorCode())
	}

	dec.init(bands)
}