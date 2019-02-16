const { URL, URLSearchParams } = require("url");
const crypto = require("crypto");
const nock = require("nock");
const sinon = require("sinon");
const ApiRequest = require("../lib/ApiRequest");

describe("ApiRequest", () => {
	describe("constructor()", () => {
		test("set format property to json", () => {
			const apiRequest = new ApiRequest();
			
			expect(apiRequest.format).toBe("json");
		});
	});

	describe("ApiRequest.set()", () => {
		test("set self properties of properties argument", () => {
			const property = "<name>";
			const value = "<value>";
			const properties = {};
			const apiRequest = new ApiRequest();

			properties[property] = value;

			apiRequest.set(properties);

			expect(apiRequest[property]).toBe(properties[property]);
		});
	});

	describe("ApiRequest.sign()", () => {
		test("set self api_sig property to an md5 hash of all property names and values, excluding format and callback properties, ordered alphabetically and appended with a shared secret", () => {
			const apiRequest = (new ApiRequest())
				.set({
					api_key: "<apiKey>",
					method: "<apiPackage>.<apiMethod>"
				});

			const secret = "<secret>";
			const params = Object.entries(apiRequest).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
			let paramString = "";

			for(const [name, value] of params) {
				if(name !== "format" && name !== "callback") {
					paramString += name + value;
				}
			}
			
			const hash = crypto
				.createHash("md5")
				.update(paramString + secret)
				.digest("hex");

			apiRequest.sign(secret);

			expect(apiRequest.api_sig).toBe(hash);
		});
	});

	describe("ApiRequest._actuallySend()", () => {
		test("make a GET request", done => {
			const apiRequest = new ApiRequest();

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
			const apiRequest = new ApiRequest();

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
			const apiRequest = new ApiRequest;

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
		const apiKey = "<apiKey>";
		const apiMethod = "<apiPackage>.<apiMethod>";
		const apiRequestPrototype = Object.getPrototypeOf(new ApiRequest());

		afterEach(() => {
			if(typeof apiRequestPrototype._actuallySend.restore === "function") {
				apiRequestPrototype._actuallySend.restore();
			}
		});

		test("when method is POST, set options.method to POST and add own properties to body params", () => {
			const apiRequest = (new ApiRequest())
				.set({
					api_key: apiKey,
					method: apiMethod
				});

			sinon.stub(apiRequestPrototype, "_actuallySend").callsFake((options, body, callback) => {
				const searchParams = new URLSearchParams(body);

				expect(options.method).toBe("POST");
				expect(searchParams.get("method")).toBe(apiRequest.method);
				expect(searchParams.get("api_key")).toBe(apiRequest.api_key);
				expect(searchParams.get("format")).toBe(apiRequest.format);
			});

			apiRequest.send("POST");
		});
		
		test("when method is not POST, add own properties to query params", () => {
			const apiRequest = (new ApiRequest())
				.set({
					api_key: apiKey,
					method: apiMethod
				});

			sinon.stub(apiRequestPrototype, "_actuallySend").callsFake((options, body, callback) => {
				const url = new URL(`http://${options.hostname + options.path}`);
				const searchParams = url.searchParams;

				expect(options.method).not.toBe("POST");
				expect(searchParams.get("method")).toBe(apiRequest.method);
				expect(searchParams.get("api_key")).toBe(apiRequest.api_key);
				expect(searchParams.get("format")).toBe(apiRequest.format);
			});
			
			apiRequest.send();
		});

		test("when callback is passed, return undefined", () => {
			const apiRequest = (new ApiRequest())
				.set({
					api_key: apiKey,
					method: apiMethod
				})

			sinon.stub(apiRequestPrototype, "_actuallySend").callsFake((options, body, callback) => {
				expect(callback).toBeDefined();
			});

			const response = apiRequest.send(() => {});

			expect(response).toBeUndefined();
		});

		test("when callback is not passed, return promise", () => {
			const apiRequest = (new ApiRequest())
				.set({
					api_key: apiKey,
					method: apiMethod
				});

			const spy = sinon.spy(apiRequestPrototype, "send");

			sinon.stub(apiRequestPrototype, "_actuallySend");

			const response = apiRequest.send();

			expect(spy.getCall(0).args[0]).toBeUndefined();
			expect(response).toBeInstanceOf(Promise);
		});
	});
});
