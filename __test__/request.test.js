const crypto = require("crypto");
const createRequest = require("../lib/request");

describe("createRequest()", () => {
	test("return request object", function() {
		const request = createRequest("<apiMethod>", "<apiPackage>", "<apiKey>");

		expect(typeof request).toBe("object");
	});

	test("assign request object method, api_key, and sk properties from apiPackage and apiMethod, apiKey, and sessionKey arguments", () => {
		const apiMethod = "<apiMethod>";
		const apiPackage = "<apiPackage>";
		const apiKey = "<apiKey>";
		const sessionKey = "<sessionKey>";
		const request = createRequest(apiPackage, apiMethod, apiKey, {}, sessionKey);

		expect(request.method).toBe(apiPackage + "." + apiMethod);
		expect(request.api_key).toBe(apiKey);
		expect(request.sk).toBe(sessionKey);
	});

	test("assign request object properties of param argument", () => {
		const name = "<name>";
		const value = "<value>";
		const params = {};

		params[name] = value;

		const request = createRequest("<apiPackage>", "<apiMethod>", "<apiKey>", params);

		expect(request[name]).toBe(value);
	});

	test("overwrite apiMethod, api_key, and sk params with apiPackage and apiMethod, apiKey, and sessionKey arguments", () => {
		const apiPackageArg = "<apiPackage arg>";
		const apiMethodArg = "<apiMethod arg>";
		const apiKeyArg = "<apiKey arg>";
		const sessionKeyArg = "<sessionKey arg>";
		const apiPackageParam = "<apiPackage param>";
		const apiMethodParam = "<apiMethod param>";
		const apiKeyParam = "<apiKey param>";
		const sessionKeyParam = "<sessionKey param>";
		const params = {
			apiMethod: apiPackageParam + "." + apiMethodParam,
			api_key: apiKeyParam,
			sk: sessionKeyParam
		};

		const request = createRequest(apiPackageArg, apiMethodArg, apiKeyArg, params, sessionKeyArg);

		expect(request.method).toBe(apiPackageArg + "." + apiMethodArg);
		expect(request.api_key).toBe(apiKeyArg);
		expect(request.sk).toBe(sessionKeyArg);
	});

	test("set the format property to json", () => {
		const request = createRequest("<apiPackage>", "<apiMethod>", "<apiKey>");

		expect(request.format).toBe("json");
	});

	test("overwrite format param to json", () => {
		const formatParam = "<format param>";
		const params = {
			format: formatParam
		};

		const request = createRequest("<apiPackage>", "<apiMethod>", "<apiKey>", params);

		expect(request.format).toBe("json");
	});

	test("don't set the sk property if a sessionKey paramater is not passed", () => {
		const request = createRequest("<apiPackage>", "<apiMethod>", "<apiKey>");

		expect(request["sk"]).toBeUndefined();
	});

	test("delete the callback property if passed in the params paramater", () => {
		const params = {
			callback: "<callback param>"
		};

		const request = createRequest("<apiPackage>", "<apiMethod>", "<apiKey>", params, "<sessionKey>");

		expect(request["callback"]).toBeUndefined();
	});
});

describe("request.sign()", () => {
	test("assign self api_sig property with value of an md5 hash of all property names and values (excluding format and callback properties) ordered alphabetically and appended with a shared secret", () => {
		const request = createRequest("<apiPackage>", "<apiMethod>", "<apiKey>");
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

		expect(request.api_sig).toBe(hash);
	});
});
