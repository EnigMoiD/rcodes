function decode(code) {
	var map = {
		k: 0,
		b: 1,
		r: 2,
		o: 3,
		y: 4,
		g: 5,
		u: 6,
		v: 7,
		a: 8,
		i: 9
	}
	bands = code.length;
	// Tolerance
	var tol = code[bands-1]

	// Exponent
	var mult = Math.pow(10, map[code[bands-2]])

	// Value
	var value = 0
	var mantissa = bands-2
	for (var i = 0; i < mantissa; i++) {
		var num = map[code[i]]
		value += num*Math.pow(10, mantissa-i-1)
	}

	return value*mult;
}

module.exports.decode = decode;