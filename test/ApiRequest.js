const crypto = require("crypto");
const nock = require("nock");
const ApiRequest = require("../lib/ApiRequest");
const apiKey = "<apiKey>";
const apiMethod = "<apiPackage>.<apiMethod>";

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
		test("set self api_sig property to an md5 hash of all property names and values, excluding format and callback, ordered by `String.prototype.charCodeAt()` return value, and appended with a shared secret", () => {
			const apiRequest = new ApiRequest()
				.set({
					"api_key": apiKey,
					"method": apiMethod
				});

			const secret = "<secret>";
			const paramsString = Object
				.entries(apiRequest)
				.filter(([name]) => name !== "format" && name !== "callback")
				.sort(([a], [b]) => {
					for(let i = 0; i <= a.length || i <= b.length; i++) {
						const charCodeA = a.charCodeAt(i) || 0;
						const charCodeB = b.charCodeAt(i) || 0;

						if(charCodeA < charCodeB) {
							return -1;
						}

						if(charCodeA > charCodeB) {
							return 1;
						}
					}
				})
				.map(param => param.join(""))
				.join("");

			const hash = crypto
				.createHash("md5")
				.update(paramsString + secret)
				.digest("hex");

			apiRequest.sign(secret);

			expect(apiRequest.api_sig).toBe(hash);
		});

		test("include all property names, excluding format and callback", () => {
			const param1 = "<value1>";
			const param2 = "<value2>"
			const apiRequest = new ApiRequest()
				.set({
					param1,
					param2
				});

			const secret = "<secret>";
			const paramsArray = Object.entries(apiRequest);

			expect(paramsArray.find(([name]) => name === "param1")).not.toBeUndefined();
			expect(paramsArray.find(([name]) => name === "param2")).not.toBeUndefined();

			const paramsArrayFiltered = paramsArray.filter(([name]) => name !== "format" && name !== "callback");
			
			expect(paramsArrayFiltered.find(([name]) => name === "format")).toBeUndefined();
			expect(paramsArrayFiltered.find(([name]) => name === "callback")).toBeUndefined();

			const paramsArrayFilteredSorted = paramsArrayFiltered.sort(([a], [b]) => {
				for(let i = 0; i <= a.length || i <= b.length; i++) {
					const charCodeA = a.charCodeAt(i) || 0;
					const charCodeB = b.charCodeAt(i) || 0;

					if(charCodeA < charCodeB) {
						return -1;
					}

					if(charCodeA > charCodeB) {
						return 1;
					}
				}
			});

			const paramStringsArrayFilteredSorted = paramsArrayFilteredSorted.map(param => param.join(""));
			const paramsStringFilteredSorted = paramStringsArrayFilteredSorted.join("");
			const hash = crypto
				.createHash("md5")
				.update(paramsStringFilteredSorted + secret)
				.digest("hex");

			apiRequest.sign(secret);

			expect(apiRequest.api_sig).toBe(hash);
		});

		test("order key value pairs by `String.prototype.charCodeAt()` return value", () => {
			const param1 = "<value1>";
			const param2 = "<value2>";
			const param12 = "<value12>";
			const param22 = "<value122>";
			const param112 = "<value112>";
			const apiRequest = new ApiRequest()
				.set({
					param2,
					param112,
					param22,
					param1,
					param12
				});

			const secret = "<secret>";
			const paramsArray = Object.entries(apiRequest);
			const paramsArrayFiltered = paramsArray.filter(([name]) => name !== "format" && name !== "callback");
			const paramsArrayFilteredSorted = paramsArrayFiltered.sort(([a], [b]) => {
				for(let i = 0; i <= a.length || i <= b.length; i++) {
					const charCodeA = a.charCodeAt(i) || 0;
					const charCodeB = b.charCodeAt(i) || 0;

					if(charCodeA < charCodeB) {
						return -1;
					}

					if(charCodeA > charCodeB) {
						return 1;
					}
				}
			});

			expect(paramsArrayFilteredSorted[0][0]).toBe("param1");
			expect(paramsArrayFilteredSorted[1][0]).toBe("param112");
			expect(paramsArrayFilteredSorted[2][0]).toBe("param12");
			expect(paramsArrayFilteredSorted[3][0]).toBe("param2");
			expect(paramsArrayFilteredSorted[4][0]).toBe("param22");

			const paramStringsArrayFilteredSorted = paramsArrayFilteredSorted.map(param => param.join(""));
			const paramsStringFilteredSorted = paramStringsArrayFilteredSorted.join("");
			const hash = crypto
				.createHash("md5")
				.update(paramsStringFilteredSorted + secret)
				.digest("hex");

			apiRequest.sign(secret);

			expect(apiRequest.api_sig).toBe(hash);
		});
	});

	describe("ApiRequest.send()", () => {
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
			const apiRequest = new ApiRequest()
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
			const apiRequest = new ApiRequest()
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
			const apiRequest = new ApiRequest()
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
			const apiRequest = new ApiRequest()
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
			const apiRequest = new ApiRequest()
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
			const apiRequest = new ApiRequest()
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
