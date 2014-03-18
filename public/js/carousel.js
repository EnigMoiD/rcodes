function Carousel(cells, selector, style) {
	var container = $(selector)
	container.addClass('carousel')
	container.css(style)

	for (var j = 0; j < 3; j++)
		for (var i in cells) {
			cell = cells[i]
			container.append(assembleCell(cell))
		}

	container.children().mouseup(function() {
		alert('click')
	})
}

function assembleCell(cell) {
	return "<div class='carousel-cell' style='background-color: " + cell.color + "'>" + cell.content + "</div>"
}