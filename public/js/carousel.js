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

	this.addCell = function(cell, index, prepend) {
		cell = "<div class='carousel-cell' cellno='" + index + "' style='background-color: " + cell.color + "'>" + cell.content + "</div>"

		if (prepend)
			car.bandContainer.prepend(cell)
		else
			car.bandContainer.append(cell)

		car.getCell(index).mouseup(function() {
			car.centerTo(index)
		})
	}

	this.reuseCell = function(cell, index, prepend) {
		if (prepend)
			car.bandContainer.prepend(cell)
		else
			car.bandContainer.append(cell)

		car.getCell($(cell).attr('cellno')).mouseup(function() {
			car.centerTo(index)
		})
	}

	this.getCell = function(index) {
		return $(car.bandContainer).find('[cellno=' + index + ']')
	}

	this.getCells = function() {
		return $(car.bandContainer).children()
	}

	this.centerTo = function(index) {
		var delta = index - car.selection

		car.selection = index

		car.removeCells(delta)
		car.addCells(delta)

		var target = car.getCell(index)
		var offset = options.height/2 - $(target).position().top - car.cellHeight/2
		car.bandContainer.animate({
			top: offset + 'px'
		}, 400)
	}

	this.cellQueue = []

	this.addCells = function(delta) {
		// scrolling up
		if (delta < 0)
			for (var i = car.cellQueue.length - 1; i >= 0; i--)
				car.reuseCell(car.cellQueue[i], i, true)
		else
			for (var i = 0; i < car.cellQueue.length; i++)
				car.reuseCell(car.cellQueue[i], i, false)
	}

	this.removeCells = function(delta) {
		cellViews = car.getCells()
		console.log(cellViews)
		// scrolling up
		if (delta > 0) {
			car.cellQueue = cellViews.slice(0, delta)
		}
		else {
			var l = cellViews.length
			car.cellQueue = cellViews.slice(l+delta, l+1)
		}
		$(car.cellQueue).remove()
	}

	for (var i in cells) {
		cell = cells[i]
		car.addCell(cell, i, false)
	}

	this.selection = cells.length/2-1
	this.centerTo(cells.length/2-1)
}