var decode = require('../decode.js').decode

describe("The resistor decoder", function() {
	it("decodes 4-band resistors.", function() {
		expect(decode("rogr")).toBe(2300000);
	})
	
	it("decodes 5-band resistors.", function() {
		expect(decode("bkkkr")).toBe(100);
	})
})