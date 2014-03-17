function decode(code) {
	try {
		if (code.length < 3 || code.length > 5)
			throw "Invalid number of bands."
		var map = {
			k: { mant: 0, exp: 0, tol: null, temp: null },
			b: { mant: 1, exp: 1, tol: .01, temp: 100 },
			r: { mant: 2, exp: 2, tol: .02, temp: 50 },
			o: { mant: 3, exp: 3, tol: null, temp: 15 },
			y: { mant: 4, exp: 4, tol: null, temp: 25 },
			g: { mant: 5, exp: 5, tol: null, temp: .5 },
			u: { mant: 6, exp: 6, tol: null, temp: .25 },
			v: { mant: 7, exp: 7, tol: null, temp: .1 },
			a: { mant: 8, exp: 8, tol: null, temp: null },
			i: { mant: 9, exp: 9, tol: null, temp: null },
			s: { mant: null, exp: -2, tol: .1, temp: null },
			l: { mant: null, exp: -1, tol: .05, temp: null }
		}
		var bands = code.length;

		var tol = map[code[bands-1]].tol
		if (tol === null)
			throw "Invalid tolerance band."

		var mult = Math.pow(10, map[code[bands-2]].exp)

		var value = 0
		var mantissa = bands-2
		for (var i = 0; i < mantissa; i++) {
			var num = map[code[i]].mant
			if (num === null)
				throw "Invalid mantissa band."
			value += num * Math.pow(10, mantissa-i-1)
		}
	}
	catch (e) {
		return "Error: " + e
	}

	return {
		value: value*mult,
		tolerance: tol
	};
}

module.exports.decode = decode;