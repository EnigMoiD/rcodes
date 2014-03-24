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

	this.cellHeight = options.cellHeight

	this.newCell = function(cell, index, prepend) {
		cell = "<div class='carousel-cell' data='" + options.data[index].data + "' cellno='" + index + "' style='background-color: " + cell.color + "'>" + cell.content + "</div>"

		car.insertCell(cell, index, prepend)
	}

	this.insertCell = function(cell, index, prepend) {
		if (prepend)
			car.bandContainer.prepend(cell)
		else
			car.bandContainer.append(cell)

		car.getCell(index).mouseup(function() {
			car.select(index)
		})
	}

	this.getCell = function(index) {
		return $(car.bandContainer).find('[cellno=' + index + ']')
	}

	this.getCells = function() {
		return $(car.bandContainer).children()
	}

	this.select = function(index) {
		var delta = index - car.selection

		car.selection = index

		var target = car.getCell(index)

		car.selectedData = $(target).attr('data')

		var offset = options.height/2 - $(target).position().top - car.cellHeight/2
		car.bandContainer.css({
			top: offset + 'px'
		})
	}

	this.cellQueue = []

	for (var i in cells) {
		cell = cells[i]
		car.newCell(cell, i, false)
	}

	this.selection = cells.length/2-1
	this.select(cells.length/2-1)
}