var decode = require('../decode.js').decode

describe("The resistor decoder", function() {
	it("decodes 5-band resistors.", function() {
		expect(decode("bkkkr")).toBe(100);
	})

	it("decodes 4-band resistors.", function() {
		expect(decode("bkkr")).toBe(100);
	})
})