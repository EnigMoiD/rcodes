window.map = {
	k: { mant: 0, exp: 0, tol: null, temp: null, color: { name: "black", value: "#000000" } },
	b: { mant: 1, exp: 1, tol: .01, temp: 100, color: { name: "brown", value: "#843417" } },
	r: { mant: 2, exp: 2, tol: .02, temp: 50, color: { name: "red", value: "#ff0f00" } },
	o: { mant: 3, exp: 3, tol: null, temp: 15, color: { name: "orange", value: "#ff8e35" } },
	y: { mant: 4, exp: 4, tol: null, temp: 25, color: { name: "yellow", value: "#ffed14" } },
	g: { mant: 5, exp: 5, tol: null, temp: .5, color: { name: "green", value: "#52f305" } },
	u: { mant: 6, exp: 6, tol: null, temp: .25, color: { name: "blue", value: "#4b6cff" } },
	v: { mant: 7, exp: 7, tol: null, temp: .1, color: { name: "violet", value: "#d02dff" } },
	a: { mant: 8, exp: 8, tol: null, temp: null, color: { name: "gray", value: "#a3a3a3" } },
	i: { mant: 9, exp: 9, tol: null, temp: null, color: { name: "white", value: "#ffffff" } },
	s: { mant: null, exp: -2, tol: .1, temp: null, color: { name: "silver", value: "#efefef" } },
	l: { mant: null, exp: -1, tol: .05, temp: null, color: { name: "gold", value: "#ffc145" } }
}

function decode(code) {
	try {
		if (code.length < 3 || code.length > 5)
			throw "Invalid number of bands."
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

// module.exports.decode = decode