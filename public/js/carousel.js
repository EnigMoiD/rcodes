function Carousel(cells, selector, options) {
	var car = this;
	this.container = $(selector)
	this.container.addClass('carousel')
	this.container.css(options.style || "")
	this.container.height(options.height || 'auto')

	this.container.append('<div class="band-container"></div>')

	this.bandContainer = this.container.children().first()

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
			top: (options.height/2 - $(target).position().top) + 'px'
		})
	}
}

function assembleCell(cell) {
	return "<div class='carousel-cell' style='background-color: " + cell.color + "'>" + cell.content + "</div>"
}