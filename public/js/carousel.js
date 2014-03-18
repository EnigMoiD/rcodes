function Carousel(cells, target) {
	var container = $("."+target)
	container.addClass('carousel')

	for (var i in cells) {
		cell = cells[i]
		container.append(assembleCell(cell))
	}
}

function assembleCell(cell) {
	return "<div class='carousel-cell' style='background-color: " + cell.color + "'>" + cell.content + "</div>"
}