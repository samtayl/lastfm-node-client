const crypto = require("crypto");
const nock = require("nock");
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
					"api_key": "<apiKey>",
					"method": "<apiPackage>.<apiMethod>"
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

	describe("ApiRequest.send()", () => {
		const apiKey = "<apiKey>";
		const apiMethod = "<apiPackage>.<apiMethod>";

		test("make a GET request and handle response with callback", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({ "format": "json" })
				.reply(200, {});

			apiRequest.send((err, data) => {
				expect(err).toBeNull();
				expect(data).not.toBeNull();
				done();
			});
		});

		test("make a GET request and handle response with promise", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({ "format": "json" })
				.reply(200, {});

			return expect(apiRequest.send()).resolves.not.toBeNull();
		});

		test("make a POST request and handle response with callback", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.post("/2.0/", { "format": "json" })
				.reply(200, {});

			apiRequest.send("POST", (err, data) => {
				expect(err).toBeNull();
				expect(data).not.toBeNull();
				done();
			});
		});

		test("make a POST request and handle response with promise", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.post("/2.0/", { "format": "json" })
				.reply(200, {});

			expect(apiRequest.send("POST")).resolves.not.toBeNull();
		});

		test("handle an error with callback", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({ "format": "json" })
				.replyWithError("Error");

			apiRequest.send((err, data) => {
				expect(err).not.toBeNull();
				expect(data).toBeNull();
				done();
			});
		});

		test("handle an error with promise", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({ "format": "json" })
				.replyWithError("Error");

			return expect(apiRequest.send()).rejects.toThrowError();
		});

		test("when method is POST, send as POST and add own properties to body params", done => {
			const apiRequest = (new ApiRequest())
				.set({
					"api_key": apiKey,
					"method": apiMethod
				});

			nock("http://ws.audioscrobbler.com")
				.post("/2.0/", {
					"api_key": apiRequest.api_key,
					"format": apiRequest.format,
					"method": apiRequest.method
				})
				.reply(200, {});

			apiRequest.send("POST", (err, data) => {
				expect(err).toBeNull();
				expect(data).not.toBeNull();
				done();
			});
		});

		test("when method is not POST, send as GET and add own properties to query params", done => {
			const apiRequest = (new ApiRequest())
				.set({
					"api_key": apiKey,
					"method": apiMethod
				});

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({
					"api_key": apiRequest.api_key,
					"format": apiRequest.format,
					"method": apiRequest.method
				})
				.reply(200, {});

			apiRequest.send((err, data) => {
				expect(err).toBeNull();
				expect(data).not.toBeNull();
				done();
			});
		});

		test("when callback is passed as first paramater return undefined", () => {
			const apiRequest = (new ApiRequest())
				.set({
					"api_key": apiKey,
					"method": apiMethod
				});

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({
					"api_key": apiRequest.api_key,
					"format": apiRequest.format,
					"method": apiRequest.method
				})
				.reply(200, {});

			const apiResponse = apiRequest.send(() => {
				// Do nothing
			});

			expect(apiResponse).toBeUndefined();
		});

		test("when callback is passed as second paramater return undefined", () => {
			const apiRequest = (new ApiRequest())
				.set({
					"api_key": apiKey,
					"method": apiMethod
				});

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({
					"api_key": apiRequest.api_key,
					"format": apiRequest.format,
					"method": apiRequest.method
				})
				.reply(200, {});

			const apiResponse = apiRequest.send("GET", () => {
				// Do nothing
			});

			expect(apiResponse).toBeUndefined();
		});

		test("when callback is not passed as either first or second paramater, return promise", () => {
			const apiRequest = (new ApiRequest())
				.set({
					"api_key": apiKey,
					"method": apiMethod
				});

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({
					"api_key": apiRequest.api_key,
					"format": apiRequest.format,
					"method": apiRequest.method
				})
				.reply(200, {});

			const apiResponse = apiRequest.send();

			expect(apiResponse).toBeInstanceOf(Promise);
		});

		test("when callback is not passed as second paramater, return promise", () => {
			const apiRequest = (new ApiRequest())
				.set({
					"api_key": apiKey,
					"method": apiMethod
				});

			nock("http://ws.audioscrobbler.com")
				.get("/2.0/")
				.query({
					"api_key": apiRequest.api_key,
					"format": apiRequest.format,
					"method": apiRequest.method
				})
				.reply(200, {});

			const apiResponse = apiRequest.send("GET", null);

			expect(apiResponse).toBeInstanceOf(Promise);
		});
	});
});
