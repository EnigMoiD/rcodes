function Carousel(cells, selector, options) {
	var car = this
	this.container = $(selector)
	this.container.addClass('carousel')
	this.container.css(options.style || "")
	this.container.height(options.height || 'auto')

	this.container.append('<div class="mask top"></div>')

	this.cellHeight = options.cellHeight

	this.container.find('.mask.top').height(options.height/2 - this.cellHeight/2 || 0)
	this.container.append('<div class="mask bottom"></div>')
	this.container.find('.mask.bottom').height(options.height/2 - this.cellHeight/2 || 0)

	this.container.append('<div class="band-container"></div>')

	this.cells = cells

	this.bandContainer = this.container.children().last()

	this.cellViews = []
	this.cellQueue = []

	this.addCell = function(cell, index, prepend) {
		cell = "<div class='carousel-cell' cellNo='" + index + "' style='background-color: " + cell.color + "'>" + cell.content + "</div>"
		car.cellViews.push($(cell))
		if (prepend)
			car.bandContainer.prepend(cell)
		else
			car.bandContainer.append(cell)
	}

	for (var i in cells) {
		cell = cells[i]
		this.addCell(cell, i, false)
	}

	car.bandContainer.children().one('mouseup', function() {
		car.select($(this).attr('cellno'))
	})

	this.select = function(targetid) {
		car.centerTo(car.cellViews[targetid])
		car.selected = targetid
	}

	this.centerTo = function(target) {
		var offset = options.height/2 - target.position().top - car.cellHeight/2;
		var delta = (car.offset - offset)/car.cellHeight
		car.removeCells(delta)
		car.addCells(delta)

		car.bandContainer.css({
			top: (offset) + 'px'
		})
		car.offset = offset
	}

	this.addCells = function(delta) {
		if (delta < 0) {
			for (var i = car.cellQueue.length - 1; i >= 0; i--) {
				car.addCell(car.cellQueue[i], i, true)
			}
		}
		else {
			for (var i in car.cellQueue) {
				car.addCell(car.cellQueue[i], i, false)
			}
		}
	}

	this.removeCells = function(delta) {
		if (delta < 0) {
			car.cellQueue = car.cellViews.slice(0, delta+1)
		}
		else {
			var l = car.cellViews.length
			car.cellQueue = car.cellViews.slice(l-delta, l+1)
		}
		$(car.cellQueue).remove()
	}

	return this
}