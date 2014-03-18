$(document).ready(function() {
	var cells = []
	for (var key in map) {
		var cell = { content: "", color: map[key].color.name }
		cells.push(cell)
	}

	Carousel(cells, 'decoder')
})