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

	this.addCell = function(cell, index, prepend) {
		console.log('OPTIONS')
		console.log(options)
		cell = "<div class='carousel-cell' data='" + options.data[index].data + "' cellno='" + index + "' style='background-color: " + cell.color + "'>" + cell.content + "</div>"

		if (prepend)
			car.bandContainer.prepend(cell)
		else
			car.bandContainer.append(cell)

		car.getCell(index).mouseup(function() {
			car.centerTo(index)
		})
	}

	this.getCell = function(index) {
		return $(car.bandContainer).find('[cellno=' + index + ']')
	}

	this.centerTo = function(index) {
		var target = car.getCell(index)
		car.bandContainer.css({
			top: (options.height/2 - $(target).position().top - options.cellHeight/2) + 'px'
		})
	}

	for (var i in cells) {
		cell = cells[i]
		car.addCell(cell, i, false)
	}
}