const crypto = require("crypto");
const nock = require("nock");
const ApiRequest = require("../lib/ApiRequest");

describe("ApiRequest", () => {
	describe("constructor()", () => {
		test("define `format` property as non configurable, non writable, enumerable, with value `json`", () => {
			const apiRequest = new ApiRequest();
			const descriptor = Object.getOwnPropertyDescriptor(apiRequest, "format");

			expect(descriptor.configurable).toBe(false);
			expect(descriptor.writable).toBe(false);
			expect(descriptor.enumerable).toBe(true);
			expect(descriptor.value).toBe("json");
		});
	});

	describe("set()", () => {
		test("set self properties of object paramater", () => {
			const apiRequest = new ApiRequest();
			const props = {
				"foo": "bar",
				"baz": "qux"
			};

			apiRequest.set(props);

			expect(apiRequest).toMatchObject(props);
		});
	});

	describe("sign()", () => {
		test("set self api_sig property to an md5 hash of all property names and values, excluding format and callback, ordered by `String.prototype.charCodeAt()` return value, and appended with a shared secret", () => {
			const apiRequest = new ApiRequest();
			const props = {
				aa: "aa",
				a: "a",
				aaa: "aaa"
			};

			apiRequest.set(props);

			const paramsString = Object
				.entries(apiRequest)
				.filter(([name]) => name !== "format" && name !== "callback")
				.sort(([a], [b]) => {
					for(let i = 0; i < a.length || i < b.length; i++) {
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
				.flat()
				.join("");

			const secret = "foo";
			const apiSig = crypto
				.createHash("md5")
				.update(paramsString + secret)
				.digest("hex");

			apiRequest.sign(secret);

			expect(apiRequest.api_sig).toBe(apiSig);
		});
	});

	describe("send()", () => {
		test("make a GET request if \"POST\" is not passed as the first argument", () => {
			const apiRequest = new ApiRequest();
			const scope = nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, {});

			return apiRequest
				.send()
				.finally(() => expect(scope.isDone()).toBe(true));
		});

		test("make a POST request if \"POST\" is passed as the first argument", () => {
			const apiRequest = new ApiRequest();
			const scope = nock("http://ws.audioscrobbler.com")
				.post("/2.0", { "format": "json" })
				.reply(200, {});

			return apiRequest
				.send("POST")
				.finally(() => expect(scope.isDone()).toBe(true));
		});

		test("return promise if function is not passed as the first argument and no second argument is passed, and resolves with the API response", () => {
			const apiRequest = new ApiRequest();
			const reply = {};

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, reply);

			const apiResponse = apiRequest.send("GET");

			expect(apiResponse).toBeInstanceOf(Promise);

			return expect(apiResponse).resolves.toStrictEqual(reply);
		});

		test("return promise if function is not passed as the second argument, and resolves with the API response", () => {
			const apiRequest = new ApiRequest();
			const reply = {};

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, reply);

			const apiResponse = apiRequest.send("GET", "GOT");

			expect(apiResponse).toBeInstanceOf(Promise);

			return expect(apiResponse).resolves.toStrictEqual(reply);
		});

		test("invoke callback if function is passed as the first argument and no second argument is passed, passing `null` and the response as the `err` and `data` paramaters respectively", done => {
			const apiRequest = new ApiRequest();
			const reply = {};

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, reply);

			apiRequest.send((err, data) => {
				expect(err).toBeNull();
				expect(data).toStrictEqual(reply);
				done();
			});
		});

		test("invoke callback if function is passed as the second argument, passing `null` and the response as the `err` and `data` paramaters respectively", done => {
			const apiRequest = new ApiRequest();
			const reply = {};

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, reply);

			apiRequest.send("GET", (err, data) => {
				expect(err).toBeNull();
				expect(data).toStrictEqual(reply);
				done();
			});
		});

		test("throw an error if the reply is an error", () => {
			const apiRequest = new ApiRequest();
			const reply = new Error();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.replyWithError(reply);

			return expect(apiRequest.send()).rejects.toStrictEqual(reply);
		});

		test("throw an error if the reply is not JSON", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200);

			return expect(apiRequest.send()).rejects.toBeInstanceOf(Error);
		});

		test("throw an error if the reply contains error property", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, { error: "You've met with a terrible fate, haven't you?" });

			return expect(apiRequest.send()).rejects.toBeInstanceOf(Error);
		});

		test("handle an error with a callback", done => {
			const apiRequest = new ApiRequest();
			const reply = new Error();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.replyWithError(reply);

			apiRequest.send((err, data) => {
				expect(err).toStrictEqual(reply);
				expect(data).toBeNull();
				done();
			});
		});
	});
});
