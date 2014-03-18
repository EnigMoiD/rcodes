$(document).ready(function() {
	var mantissae = []
	for (var key in map) {
		var mantissa = { content: "", color: map[key].color.name }
		if (map[key].mant)
			mantissae.push(mantissa)
	}

	Carousel(mantissae, 'decoder')
	Carousel(mantissae, 'decoder')
})