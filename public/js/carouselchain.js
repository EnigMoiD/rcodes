function CarouselChain(selector, data, options) {
	var con = this
	this.container = $(selector)
	this.container.addClass('carousel-chain')

	this.carousels = []

	var longest = 0
	for (var sel in data)
		longest = longest < data[sel].length? data[sel].length : longest

	this.height = options.cellHeight * longest

	for (var sel in data) {
		var datum = data[sel]
		this.container.append('<div class="' + sel + '"></div>')
		console.log(con.height)
		console.log(options.cellHeight * datum.length)
		this.carousels.push(new Carousel(datum, '.'+sel, {
			style: {
				'width': '20%',
				'display': 'inline-block',
				'overflow': 'hidden',
				'top': -(con.height - (options.cellHeight * datum.length))/2
			},
			height: options.cellHeight * datum.length,
			cellHeight: options.cellHeight
		}))
	}
}