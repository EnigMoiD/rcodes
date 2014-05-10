function Carousel(cells, selector, options) {
	var car = this
	car.container = $(selector)
	car.container.addClass('carousel')
	car.container.css(options.style || "")
	car.container.height(options.height || 'auto')

	car.container.append('<div class="mask top"></div>')

	car.container.find('.mask.top').height(options.height/2 - options.cellHeight/2 || 0)
	car.container.append('<div class="mask bottom"></div>')
	car.container.find('.mask.bottom').height(options.height/2 - options.cellHeight/2 || 0)

	car.container.append('<div class="band-container"></div>')

	car.bandContainer = car.container.children().last()

	car.cellHeight = options.cellHeight

	car.newCell = function(cell, index, prepend) {
		cell = "<div class='carousel-cell' data='" + options.data[index].data + "' cellno='" + index + "' style='background-color: " + cell.color + "'>" + cell.content + "</div>"

		car.insertCell(cell, index, prepend)
	}

	car.insertCell = function(cell, index, prepend) {
		if (prepend)
			car.bandContainer.prepend(cell)
		else
			car.bandContainer.append(cell)

		car.getCell(index).mouseup(function() {
			car.select(index)
		})
	}

	car.getCell = function(index) {
		return $(car.bandContainer).find('[cellno=' + index + ']')
	}

	car.getCells = function() {
		return $(car.bandContainer).children()
	}

	car.select = function(index) {
		var delta = index - car.selection

		car.selection = index

		var target = car.getCell(index)

		car.selectedData = $(target).attr('data')

		var offset = options.height/2 - $(target).position().top - car.cellHeight/2
		car.bandContainer.css({
			top: offset + 'px'
		})
	}

	car.cellQueue = []

	for (var i in cells) {
		cell = cells[i]
		car.newCell(cell, i, false)
	}

	car.selection = cells.length/2-1
	car.select(cells.length/2-1)
}