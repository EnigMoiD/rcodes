var decode = require('../decode.js').decode

describe("The resistor decoder", function() {
	it("decodes 4-band resistors.", function() {
		expect(decode("rogr").value).toBe(2300000);
	})
	
	it("decodes 5-band resistors.", function() {
		expect(decode("bkkkr").value).toBe(100);
	})
	
	it("doesn't decode 6-band resistors (yet).", function() {
		expect(decode("bkkkru")).toBe('Error: Invalid number of bands.');
	})
	
	it("detects invalid mantissa bands.", function() {
		expect(decode("slbr")).toBe('Error: Invalid mantissa band.');
	})
})