const crypto = require("crypto");
const nock = require("nock");
const ApiRequest = require("../lib/ApiRequest");

describe("ApiRequest()", () => {
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

			for(const [key, value] of Object.entries(props)) {
				expect(apiRequest[key]).toBe(value);
			}
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
		test("make a GET request when \"POST\" is not passed as the first argument", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, {});

			apiRequest
				.send()
				.then(data => {
					expect(data).toBeDefined();
					done();
				});
		});

		test("make a POST request when \"POST\" is passed as the first argument", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.post("/2.0", { "format": "json" })
				.reply(200, {});

			apiRequest
				.send("POST")
				.then(data => {
					expect(data).toBeDefined();
					done();
				});
		});

		test("invoke callback if function is passed as the first argument and no second argument is passed", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, {});

			apiRequest.send((err, data) => {
				expect(err).toBeNull();
				expect(data).toBeDefined();
				done();
			});
		});

		test("invoke callback if function is passed as the second argument", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, {});

			apiRequest.send("GET", (err, data) => {
				expect(err).toBeNull();
				expect(data).toBeDefined();
				done();
			});
		});

		test("return promise if function is not passed as the first argument and no second argument is passed", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, {});

			expect(apiRequest.send("GET")).toBeInstanceOf(Promise);
		});

		test("return promise if function is not passed as the second argument", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, {});

			expect(apiRequest.send("GET", "GOT")).toBeInstanceOf(Promise);
		});

		test("throw an error if the reply is an error", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.replyWithError({});

			apiRequest
				.send()
				.catch(err => {
					expect(err).toBeDefined();
					done();
				});
		});

		test("throw an error if the reply is not JSON", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200);

			apiRequest
				.send()
				.catch(err => {
					expect(err).toBeDefined();
					done();
				});
		});

		test("throw an error if the reply contains error property", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.reply(200, { error: "You've met with a terrible fate, haven't you?" });

			apiRequest
				.send()
				.catch(err => {
					expect(err).toBeDefined();
					done();
				});
		});

		test("handle an error with a callback", done => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ "format": "json" })
				.replyWithError({});

			apiRequest.send((err, data) => {
				expect(err).toBeDefined();
				expect(data).toBeNull();
				done();
			});
		});
	});
});
