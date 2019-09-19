const crypto = require("crypto");
const nock = require("nock");
const ApiRequest = require("../lib/ApiRequest");

describe("apiRequest", () => {
	describe("constructor()", () => {
		it("sets self `params` property to a `Map`", () => {
			const apiRequest = new ApiRequest();

			expect(apiRequest.params).toBeInstanceOf(Map);
		});

		it("sets `apiRequest.params` \"format\" key to \"json\"", () => {
			const apiRequest = new ApiRequest();

			expect(apiRequest.params.get("format")).toBe("json");
		});
	});

	describe("set()", () => {
		it("sets `apiRequest.params` keys and values of object argument", () => {
			const apiRequest = new ApiRequest();
			const params = {
				foo: "bar",
				baz: "qux"
			};

			apiRequest.set(params);

			expect(Array.from(apiRequest.params)).toStrictEqual(expect.arrayContaining(Object.entries(params)));
		});
	});

	describe("sign()", () => {
		it("sets `apiRequest.params` \"api_sig\" key to an md5 hash of all `apiRequest.params` keys and values, excluding format and callback, ordered by `String.prototype.charCodeAt()` return value, and appended with a shared secret", () => {
			const apiRequest = new ApiRequest();
			const params = {
				aa: "aa",
				a: "a",
				aaa: "aaa"
			};

			apiRequest.set(params);

			const paramsStr = Array.from(apiRequest.params)
				.filter(([key]) => key !== "format" && key !== "callback")
				.sort(([a], [b]) => {
					for (let i = 0; i < a.length || i < b.length; i++) {
						const charCodeA = a.charCodeAt(i) || 0;
						const charCodeB = b.charCodeAt(i) || 0;

						if (charCodeA < charCodeB) {
							return -1;
						}

						if (charCodeA > charCodeB) {
							return 1;
						}
					}

					return 0;
				})
				.map(param => param.join(""))
				.join("");

			const secret = "foo";
			const apiSig = crypto
				.createHash("md5")
				.update(paramsStr + secret)
				.digest("hex");

			apiRequest.sign(secret);

			expect(apiRequest.params.get("api_sig")).toBe(apiSig);
		});
	});

	describe("send()", () => {
		it("makes a GET request if \"POST\" is not passed as the first argument", () => {
			const apiRequest = new ApiRequest();
			const scope = nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.reply(200, {});

			return apiRequest
				.send()
				.then(() => expect(scope.isDone()).toBe(true));
		});

		it("makes a POST request if \"POST\" is passed as the first argument", () => {
			const apiRequest = new ApiRequest();
			const scope = nock("http://ws.audioscrobbler.com")
				.post("/2.0", { format: "json" })
				.reply(200, {});

			return apiRequest
				.send("POST")
				.then(() => expect(scope.isDone()).toBe(true));
		});

		it("returns promise if function is not passed as the first argument and no second argument is passed, and resolves with the API response", () => {
			const apiRequest = new ApiRequest();
			const reply = {};

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.reply(200, reply);

			const apiResponse = apiRequest.send("GET");

			expect(apiResponse).toBeInstanceOf(Promise);

			return expect(apiResponse).resolves.toStrictEqual(reply);
		});

		it("returns promise if function is not passed as the second argument, and resolves with the API response", () => {
			const apiRequest = new ApiRequest();
			const reply = {};

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.reply(200, reply);

			const apiResponse = apiRequest.send("GET", "GOT");

			expect(apiResponse).toBeInstanceOf(Promise);

			return expect(apiResponse).resolves.toStrictEqual(reply);
		});

		it("invokes callback if function is passed as the first argument and no second argument is passed, passing `null` and the response as the `err` and `data` paramaters respectively", () => {
			const apiRequest = new ApiRequest();
			const reply = {};

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.reply(200, reply);

			return new Promise(done => {
				apiRequest.send((err, data) => {
					expect(err).toBeNull();
					expect(data).toStrictEqual(reply);
					done();
				});
			});
		});

		it("invokes callback if function is passed as the second argument, passing `null` and the response as the `err` and `data` paramaters respectively", () => {
			const apiRequest = new ApiRequest();
			const reply = {};

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.reply(200, reply);

			return new Promise(done => {
				apiRequest.send("GET", (err, data) => {
					expect(err).toBeNull();
					expect(data).toStrictEqual(reply);
					done();
				});
			});
		});

		it("throws an error if the reply is an error", () => {
			const apiRequest = new ApiRequest();
			const reply = new Error();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.replyWithError(reply);

			return expect(apiRequest.send()).rejects.toStrictEqual(reply);
		});

		it("throws an error if the reply is not JSON", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.reply(200);

			return expect(apiRequest.send()).rejects.toBeInstanceOf(Error);
		});

		it("throws an error if the reply contains error property", () => {
			const apiRequest = new ApiRequest();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.reply(200, { error: "You've met with a terrible fate, haven't you?" });

			return expect(apiRequest.send()).rejects.toBeInstanceOf(Error);
		});

		it("handles an error with a callback", () => {
			const apiRequest = new ApiRequest();
			const reply = new Error();

			nock("http://ws.audioscrobbler.com")
				.get("/2.0")
				.query({ format: "json" })
				.replyWithError(reply);

			return new Promise(done => {
				apiRequest.send((err, data) => {
					expect(err).toStrictEqual(reply);
					expect(data).toBeNull();
					done();
				});
			});
		});
	});
});
