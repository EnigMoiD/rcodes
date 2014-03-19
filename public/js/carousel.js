function Carousel(cells, selector, options) {
	var car = this
	this.container = $(selector)
	this.container.addClass('carousel')
	this.container.css(options.style || "")
	this.container.height(options.height || 'auto')

	this.container.append('<div class="mask top"></div>')

	this.container.find('.mask.top').height(options.height/2 - options.cellHeight/2 || 0)
	this.container.append('<div class="mask bottom"></div>')
	this.container.find('.mask.bottom').height(options.height/2 - options.cellHeight/2 || 0)

	this.container.append('<div class="band-container"></div>')

	this.bandContainer = this.container.children().last()

	for (var j = 0; j < 3; j++)
		for (var i in cells) {
			cell = cells[i]
			this.bandContainer.append(assembleCell(cell))
		}

	this.bandContainer.children().mouseup(function() {
		car.centerTo(this)
	})

	this.centerTo = function(target) {
		car.bandContainer.css({
			position: 'relative',
			top: (options.height/2 - $(target).position().top - options.cellHeight/2) + 'px'
		})
	}
}

function assembleCell(cell) {
	return "<div class='carousel-cell' style='background-color: " + cell.color + "'>" + cell.content + "</div>"
}