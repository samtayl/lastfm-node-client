const assert = require("assert");
const crypto = require("crypto");
const createRequest = require("../lib/request");

assert.strict;

describe("createRequest()", function() {
	it("return request object", function() {
		const request = createRequest("<method>", "<package>", "<apiKey>");

		assert(request);
		assert(typeof request, "object");
	});

	it("assign request object method, api_key, and sk properties from package and method, apiKey, and sessionKey arguments", function() {
		const method = "<method>";
		const package = "<package>";
		const apiKey = "<apiKey>";
		const sessionKey = "<sessionKey>";
		const request = createRequest(method, package, apiKey, {}, sessionKey);

		assert(request.method, method + "." + package);
		assert(request.api_key, apiKey);
		assert(request.sk, sessionKey);
	});

	it("assign request object properties of param argument", function() {
		const name = "<name>";
		const value = "<value>";
		const params = {};

		params[name] = value;

		const request = createRequest("<method>", "<package>", "<apiKey>", params);

		assert(request[name], value);
	});

	it("overwrite method, api_key, and sk params with package and method, apiKey, and sessionKey arguments", function() {
		const methodArg = "<method arg>";
		const packageArg = "<package arg>";
		const apiKeyArg = "<apiKey arg>";
		const sessionKeyArg = "<sessionKey arg>";

		const methodParam = "<method param>";
		const packageParam = "<package param>";
		const apiKeyParam = "<apiKey param>";
		const sessionKeyParam = "<sessionKey param>";

		const params = {
			method: methodParam,
			package: packageParam,
			api_key: apiKeyParam,
			sk: sessionKeyParam
		};

		const request = createRequest(methodArg, packageArg, apiKeyArg, params, sessionKeyArg);

		assert(request.method, methodArg + "." + packageArg);
		assert(request.api_key, apiKeyArg);
		assert(request.sk, sessionKeyArg);
	});

	it("set the format property to json", function() {
		const request = createRequest("<method>", "<package>", "<apiKey>");

		assert(request.format, "json");
	});

	it("overwrite format param to json", function() {
		const formatParam = "<format param>";

		const params = {
			format: formatParam
		};

		const request = createRequest("<method>", "<package>", "<apiKey>", params);

		assert(request.format, "json");
	});

	it("don't set the sk property if a sessionKey paramater is not passed", function() {
		const request = createRequest("<method>", "<package>", "<apiKey>");

		assert.strictEqual(request.hasOwnProperty("sk"), false);
	});	

	it("delete the callback property if passed in the params paramater", function() {
		const params = {
			callback: "<callback param>"
		};

		const request = createRequest("<method>", "<package>", "<apiKey>", params, "<sessionKey>");

		assert.strictEqual(request.hasOwnProperty("callback"), false);
	});
});

describe("request.sign()", function() {
	it("assign self api_sig property with value of an md5 hash of all property names and values (excluding format and callback properties) ordered alphabetically and appended with a shared secret", function() {
		const request = createRequest("<method>", "<package>", "<apiKey>");
		const secret = "<secret>";
		const params = Object.entries(request).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
		let paramString = "";

		for(const [name, value] of params) {
			if(name !== "format" && name !== "callback") {
				paramString += name + value;
			}
		}
		
		const hash = crypto.createHash("md5").update(paramString + secret).digest("hex");

		request.sign(secret);

		assert(request.api_sig, hash);
	});
});
