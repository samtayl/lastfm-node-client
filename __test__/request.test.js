const { URL, URLSearchParams } = require("url");
const crypto = require("crypto");
const sinon = require("sinon");
const createRequest = require("../lib/request");

describe("createRequest()", () => {
	test("return request object", function() {
		const request = createRequest("<apiMethod>", "<apiPackage>", "<apiKey>");

		expect(typeof request).toBe("object");
	});

	test("assign request object method, api_key, and sk properties from apiPackage and apiMethod, apiKey, and sessionKey arguments", () => {
		const apiPackage = "<apiPackage>";
		const apiMethod = "<apiMethod>";
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

	test("overwrite method, api_key, and sk params with apiPackage and apiMethod, apiKey, and sessionKey arguments", () => {
		const apiPackageArg = "<apiPackage arg>";
		const apiMethodArg = "<apiMethod arg>";
		const apiKeyArg = "<apiKey arg>";
		const sessionKeyArg = "<sessionKey arg>";
		const apiPackageParam = "<apiPackage param>";
		const apiMethodParam = "<apiMethod param>";
		const apiKeyParam = "<apiKey param>";
		const sessionKeyParam = "<sessionKey param>";
		const params = {
			method: apiPackageParam + "." + apiMethodParam,
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

		expect(request.hasOwnProperty("sk")).toBe(false);
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

describe("request.send", () => {
	const apiPackage = "<apiPackage>";
	const apiMethod = "<apiMethod>";
	const apiKey = "<apiKey>";
	const requestPrototype = Object.getPrototypeOf(createRequest());

	afterEach(() => {
		if(typeof requestPrototype["_actuallySend"].restore === "function") {
			requestPrototype["_actuallySend"].restore();
		}
	});

	test("when method is POST, set options.method as POST and add own properties to body params", () => {
		const request = createRequest(apiPackage, apiMethod, apiKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");

			const searchParams = new URLSearchParams(body);

			expect(searchParams.get("method")).toBe(request.method);
			expect(searchParams.get("api_key")).toBe(request.api_key);
			expect(searchParams.get("format")).toBe(request.format);
		});

		request.send("POST");
	});
	
	test("when method is not POST, add own properties to url search params", () => {
		const request = createRequest(apiPackage, apiMethod, apiKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBeUndefined();

			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe(request.method);
			expect(searchParams.get("api_key")).toBe(request.api_key);
			expect(searchParams.get("format")).toBe(request.format);
		});
		
		request.send();
	});

	test("when callback is passed, return undefined", () => {
		const request = createRequest(apiPackage, apiMethod, apiKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(callback).toBeTruthy();
		});

		const response = request.send(() => {});
		
		expect(response).toBeUndefined();
	});

	test("when callback is not passed, return _actuallySend return value", () => {
		const testReturn = "<test return>";
		const request = createRequest(apiPackage, apiMethod, apiKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(callback).toBeNull();

			return testReturn;
		});
		
		const response = request.send();
		
		expect(response).toBe(testReturn);
	});
});
