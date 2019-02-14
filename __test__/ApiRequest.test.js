const { URL, URLSearchParams } = require("url");
const crypto = require("crypto");
const nock = require("nock");
const sinon = require("sinon");
const ApiRequest = require("../lib/ApiRequest");

describe("ApiRequest", () => {
	describe("constructor()", () => {
		test("set method, api_key, and sk properties as apiPackage and apiMethod, apiKey, and sessionKey arguments", () => {
			const apiPackage = "<apiPackage>";
			const apiMethod = "<apiMethod>";
			const apiKey = "<apiKey>";
			const sessionKey = "<sessionKey>";
			const apiRequest = new ApiRequest(apiPackage, apiMethod, apiKey, {}, sessionKey);

			expect(apiRequest.method).toBe(apiPackage + "." + apiMethod);
			expect(apiRequest.api_key).toBe(apiKey);
			expect(apiRequest.sk).toBe(sessionKey);
		});

		test("set self properties of params argument", () => {
			const name = "<name>";
			const value = "<value>";
			const params = {};

			params[name] = value;

			const apiRequest = new ApiRequest("<apiPackage>", "<apiMethod>", "<apiKey>", params);

			expect(apiRequest[name]).toBe(value);
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

			const apiRequest = new ApiRequest(apiPackageArg, apiMethodArg, apiKeyArg, params, sessionKeyArg);

			expect(apiRequest.method).toBe(apiPackageArg + "." + apiMethodArg);
			expect(apiRequest.api_key).toBe(apiKeyArg);
			expect(apiRequest.sk).toBe(sessionKeyArg);
		});

		test("set format property to json", () => {
			const apiRequest = new ApiRequest("<apiPackage>", "<apiMethod>", "<apiKey>");

			expect(apiRequest.format).toBe("json");
		});

		test("overwrite format param to json", () => {
			const formatParam = "<format param>";
			const params = {
				format: formatParam
			};

			const apiRequest = new ApiRequest("<apiPackage>", "<apiMethod>", "<apiKey>", params);

			expect(apiRequest.format).toBe("json");
		});

		test("don't set sk property if a sessionKey paramater is not passed", () => {
			const apiRequest = new ApiRequest("<apiPackage>", "<apiMethod>", "<apiKey>");

			expect(apiRequest.hasOwnProperty("sk")).toBe(false);
		});

		test("delete callback property if passed in params paramater", () => {
			const params = {
				callback: "<callback param>"
			};

			const apiRequest = new ApiRequest("<apiPackage>", "<apiMethod>", "<apiKey>", params, "<sessionKey>");

			expect(apiRequest["callback"]).toBeUndefined();
		});
	});

	describe("ApiRequest.sign()", () => {
		test("set self api_sig property to an md5 hash of all property names and values, excluding format and callback properties, ordered alphabetically and appended with a shared secret", () => {
			const apiRequest = new ApiRequest("<apiPackage>", "<apiMethod>", "<apiKey>");
			const secret = "<secret>";
			const params = Object.entries(apiRequest).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
			let paramString = "";

			for(const [name, value] of params) {
				if(name !== "format" && name !== "callback") {
					paramString += name + value;
				}
			}
			
			const hash = crypto.createHash("md5").update(paramString + secret).digest("hex");

			apiRequest.sign(secret);

			expect(apiRequest.api_sig).toBe(hash);
		});
	});

	describe("ApiRequest._actuallySend()", () => {
		const apiPackage = "<apiPackage>";
		const apiMethod = "<apiMethod>";
		const apiKey = "<apiKey>";

		test("make a GET request", done => {
			const apiRequest = new ApiRequest(apiPackage, apiMethod, apiKey);

			nock("http://localhost")
				.get("/")
				.reply(200, {});

			apiRequest._actuallySend({ path: "/" }, null, (err, data) => {
				expect(err).toBeNull();
				expect(data).not.toBeNull();
				done();
			});
		});

		test("make a POST request", done => {
			const apiRequest = new ApiRequest(apiPackage, apiMethod, apiKey);

			nock("http://localhost")
				.post("/")
				.reply(200, {});

			apiRequest._actuallySend({ path: "/", method: "POST" }, null, (err, data) => {
				expect(err).toBeNull();
				expect(data).not.toBeNull();
				done();
			});
		});

		test("handle an error", done => {
			const apiRequest = new ApiRequest(apiPackage, apiMethod, apiKey);

			nock("http://localhost")
				.get("/")
				.replyWithError("Error");

			apiRequest._actuallySend({ path: "/" }, null, (err, data) => {
				expect(err).not.toBeNull();
				expect(data).toBeNull();
				done();
			});
		});
	});

	describe("ApiRequest.send()", () => {
		const apiPackage = "<apiPackage>";
		const apiMethod = "<apiMethod>";
		const apiKey = "<apiKey>";
		const apiRequestPrototype = Object.getPrototypeOf(new ApiRequest());

		afterEach(() => {
			if(typeof apiRequestPrototype["_actuallySend"].restore === "function") {
				apiRequestPrototype["_actuallySend"].restore();
			}
		});

		test("when method is POST, set options.method to POST and add own properties to body params", () => {
			const apiRequest = new ApiRequest(apiPackage, apiMethod, apiKey);

			sinon.stub(apiRequestPrototype, "_actuallySend").callsFake((options, body, callback) => {
				expect(options.method).toBe("POST");

				const searchParams = new URLSearchParams(body);

				expect(searchParams.get("method")).toBe(apiRequest.method);
				expect(searchParams.get("api_key")).toBe(apiRequest.api_key);
				expect(searchParams.get("format")).toBe(apiRequest.format);
			});

			apiRequest.send("POST");
		});
		
		test("when method is not POST, add own properties to query params", () => {
			const apiRequest = new ApiRequest(apiPackage, apiMethod, apiKey);

			sinon.stub(apiRequestPrototype, "_actuallySend").callsFake((options, body, callback) => {
				expect(options.method).not.toBe("POST");

				const url = new URL(`http://${options.hostname + options.path}`);
				const searchParams = url.searchParams;
				
				expect(searchParams.get("method")).toBe(apiRequest.method);
				expect(searchParams.get("api_key")).toBe(apiRequest.api_key);
				expect(searchParams.get("format")).toBe(apiRequest.format);
			});
			
			apiRequest.send();
		});

		test("when callback is passed, return undefined", () => {
			const apiRequest = new ApiRequest(apiPackage, apiMethod, apiKey);

			sinon.stub(apiRequestPrototype, "_actuallySend").callsFake((options, body, callback) => {
				expect(callback).toBeDefined();
			});

			const response = apiRequest.send(() => {});
			
			expect(response).toBeUndefined();
		});

		test("when callback is not passed, return promise", () => {
			const apiRequest = new ApiRequest(apiPackage, apiMethod, apiKey);
			const spy = sinon.spy(apiRequestPrototype, "send");

			sinon.stub(apiRequestPrototype, "_actuallySend");

			const response = apiRequest.send();

			expect(spy.getCall(0).args[0]).toBeUndefined();
			
			expect(response).toBeInstanceOf(Promise);
		});
	});
});
