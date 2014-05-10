function CarouselChain(selector, data, options) {
	var chain = this
	chain.$c = $(selector)
	chain.$c.addClass('carousel-chain')

	chain.carousels = []

	var longest = 0
	for (var sel in data)
		longest = longest < data[sel].length? data[sel].length : longest

	chain.height = options.cellHeight * longest

	for (var sel in data) {
		var datum = data[sel]
		chain.$c.append('<div class="' + sel + '"></div>')
		chain.carousels.push(new Carousel(datum, '.'+sel, {
			style: {
				'width': 100/Object.keys(data).length + '%',
				'display': 'inline-block',
				'overflow': 'hidden',
				'top': -(chain.height - (options.cellHeight * datum.length))/2
			},
			height: options.cellHeight * datum.length,
			data: datum,
			cellHeight: options.cellHeight
		}))
	}
}