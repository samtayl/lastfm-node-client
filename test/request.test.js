const assert = require("assert");
const createRequest = require("../lib/request");

assert.strict;

describe("request", function() {
	it("assign self method, api_key, and sk properties from package and method, apiKey, and sessionKey arguments", function() {
		const method = "<method>";
		const package = "<package>";
		const apiKey = "<apiKey>";
		const sessionKey = "<sessionKey>";
		const request = createRequest(method, package, apiKey, {}, sessionKey);

		assert(request.method, method + "." + package);
		assert(request.api_key, apiKey);
		assert(request.sk, sessionKey);
	});

	it("assign self properties of param argument", function() {
		const name = "<name>";
		const value = "<value>";
		const params = {};

		params[name] = value;

		const request = createRequest("<method>", "<package>", "<apiKey>", params, "<sessionKey>");

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
		const request = createRequest();

		assert(request.format, "json");
	});

	it("overwrite format param with json", function() {
		const formatParam = "<format param>";

		const params = {
			format: formatParam
		};

		const request = createRequest("<method>", "<package>", "<apiKey>", params, "<sessionKey>");

		assert(request.format, "json");
	});

	it("don't set the sk property if a sessionKey paramater is not passed", function() {
		const request = createRequest("<method>", "<package>", "<apiKey>", {});

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
