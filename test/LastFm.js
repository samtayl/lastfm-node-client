const ApiRequest = require("../lib/ApiRequest");
const LastFm = require("../lib/LastFm");
const apiKey = "<apiKey>";
const secret = "<secret>";
const sessionKey = "<sessionKey>";
const mockSet = jest.fn().mockReturnThis();
const mockSign = jest.fn().mockReturnThis();
const mockSend = jest.fn();

jest.mock("../lib/ApiRequest", () => jest.fn().mockImplementation(() => ({
	set: mockSet,
	sign: mockSign,
	send: mockSend
})));

describe("lastFm()", () => {
	beforeEach(() => {
		ApiRequest.mockClear();
		mockSet.mockClear();
		mockSign.mockClear();
		mockSend.mockClear();
	});

	describe("constructor()", () => {
		it("sets self apiKey property value of apiKey argument", () => {
			const lastFm = new LastFm(apiKey);

			expect(lastFm.apiKey).toBe(apiKey);
		});

		it("sets self secret property value of secret argument", () => {
			const lastFm = new LastFm(apiKey, secret);

			expect(lastFm.secret).toBe(secret);
		});

		it("sets self sessionKey property value of sessionKey argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			expect(lastFm.sessionKey).toBe(sessionKey);
		});

		it("throws TypeError if apiKey argument is not passed", () => {
			const throwsTypeError = function() {
				new LastFm();
			};

			expect(throwsTypeError).toThrow(TypeError);
		});

		it("throws TypeError if apiKey argument is not of type string", () => {
			const throwsTypeError = function() {
				new LastFm(null);
			};

			expect(throwsTypeError).toThrow(TypeError);
		});

		it("throws TypeError if secret argument is not of type string", () => {
			const throwsTypeError = function() {
				new LastFm(apiKey, null);
			};

			expect(throwsTypeError).toThrow(TypeError);
		});

		it("throws TypeError if sessionKey argument is not of type string", () => {
			const throwsTypeError = function() {
				new LastFm(apiKey, secret, null);
			};

			expect(throwsTypeError).toThrow(TypeError);
		});
	});

	describe("albumAddTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumAddTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumAddTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.albumAddTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"album.addTags\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumAddTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "album.addTags",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumAddTags({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.albumAddTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.albumAddTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.albumAddTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("albumGetInfo()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetInfo({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetInfo({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.albumGetInfo(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"album.getInfo\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetInfo({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "album.getInfo"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.albumGetInfo({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.albumGetInfo({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.albumGetInfo({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("albumGetTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.albumGetTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"album.getTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "album.getTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.albumGetTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.albumGetTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.albumGetTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("albumGetTopTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetTopTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetTopTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.albumGetTopTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"album.getTopTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumGetTopTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "album.getTopTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.albumGetTopTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.albumGetTopTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.albumGetTopTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("albumRemoveTag()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumRemoveTag({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumRemoveTag({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.albumRemoveTag(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"album.removeTag\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumRemoveTag({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "album.removeTag",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumRemoveTag({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.albumRemoveTag({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.albumRemoveTag({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.albumRemoveTag({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("albumSearch()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumSearch({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumSearch({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.albumSearch(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"album.search\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.albumSearch({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "album.search"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.albumSearch({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.albumSearch({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.albumSearch({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistAddTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistAddTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistAddTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistAddTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"artist.addTags\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistAddTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.addTags",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistAddTags({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistAddTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistAddTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistAddTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistGetCorrection()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetCorrection({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetCorrection({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistGetCorrection(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"artist.getCorrection\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetCorrection({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.getCorrection"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistGetCorrection({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistGetCorrection({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistGetCorrection({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistGetInfo()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetInfo({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetInfo({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistGetInfo(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"artist.getInfo\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetInfo({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.getInfo"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistGetInfo({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistGetInfo({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistGetInfo({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistGetSimilar()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetSimilar({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetSimilar({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistGetSimilar(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"artist.getSimilar\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetSimilar({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.getSimilar"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistGetSimilar({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistGetSimilar({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistGetSimilar({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistGetTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistGetTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"artist.getTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.getTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistGetTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistGetTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistGetTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistGetTopAlbums()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopAlbums({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopAlbums({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistGetTopAlbums(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"artist.getTopAlbums\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopAlbums({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.getTopAlbums"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistGetTopAlbums({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistGetTopAlbums({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistGetTopAlbums({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistGetTopTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistGetTopTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"artist.getTopTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.getTopTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistGetTopTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistGetTopTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistGetTopTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistGetTopTracks()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopTracks({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopTracks({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistGetTopTracks(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"artist.getTopTracks\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistGetTopTracks({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.getTopTracks"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistGetTopTracks({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistRemoveTag()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistRemoveTag({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistRemoveTag({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistRemoveTag(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"artist.removeTag\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistRemoveTag({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.removeTag",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistRemoveTag({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistRemoveTag({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistRemoveTag({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistRemoveTag({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("artistSearch()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistSearch({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistSearch({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.artistSearch(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"artist.search\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.artistSearch({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "artist.search"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.artistSearch({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.artistSearch({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.artistSearch({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("authGetMobileSession()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetMobileSession({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetMobileSession({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.authGetMobileSession(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"auth.getMobileSession\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetMobileSession({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "auth.getMobileSession"
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetMobileSession({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.authGetMobileSession({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.authGetMobileSession({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.authGetMobileSession({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("authGetSession()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetSession({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetSession({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.authGetSession(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"auth.getSession\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetSession({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "auth.getSession"
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetSession({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.authGetSession({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.authGetSession({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.authGetSession({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("authGetToken()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetToken();

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set(), passing object as first argument, with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"auth.getToken\"", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetToken();

			expect(mockSet.mock.calls[0][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "auth.getToken"
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.authGetToken();

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.authGetToken(callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.authGetToken();

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.authGetToken();

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("chartGetTopArtists()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopArtists({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopArtists({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.chartGetTopArtists(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"chart.getTopArtists\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopArtists({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "chart.getTopArtists"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.chartGetTopArtists({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.chartGetTopArtists({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.chartGetTopArtists({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("chartGetTopTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.chartGetTopTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"chart.getTopTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "chart.getTopTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.chartGetTopTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.chartGetTopTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.chartGetTopTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("chartGetTopTracks()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopTracks({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopTracks({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.chartGetTopTracks(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"chart.getTopTracks\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.chartGetTopTracks({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "chart.getTopTracks"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.chartGetTopTracks({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.chartGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.chartGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("geoGetTopArtists()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.geoGetTopArtists({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.geoGetTopArtists({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.geoGetTopArtists(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"geo.getTopArtists\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.geoGetTopArtists({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "geo.getTopArtists"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.geoGetTopArtists({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.geoGetTopArtists({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.geoGetTopArtists({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("geoGetTopTracks()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.geoGetTopTracks({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.geoGetTopTracks({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.geoGetTopTracks(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"geo.getTopTracks\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.geoGetTopTracks({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "geo.getTopTracks"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.geoGetTopTracks({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.geoGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.geoGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("libraryGetArtists()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.libraryGetArtists({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.libraryGetArtists({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.libraryGetArtists(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"library.getArtists\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.libraryGetArtists({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "library.getArtists"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.libraryGetArtists({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.libraryGetArtists({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.libraryGetArtists({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("tagGetInfo()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetInfo({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetInfo({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.tagGetInfo(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"tag.getInfo\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetInfo({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "tag.getInfo"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.tagGetInfo({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.tagGetInfo({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.tagGetInfo({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("tagGetSimilar()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetSimilar({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetSimilar({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.tagGetSimilar(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"tag.getSimilar\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetSimilar({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "tag.getSimilar"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.tagGetSimilar({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.tagGetSimilar({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.tagGetSimilar({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("tagGetTopAlbums()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopAlbums({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopAlbums({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.tagGetTopAlbums(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"tag.getTopAlbums\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopAlbums({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "tag.getTopAlbums"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.tagGetTopAlbums({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.tagGetTopAlbums({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.tagGetTopAlbums({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("tagGetTopArtists()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopArtists({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopArtists({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.tagGetTopArtists(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"tag.getTopArtists\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopArtists({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "tag.getTopArtists"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.tagGetTopArtists({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.tagGetTopArtists({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.tagGetTopArtists({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("tagGetTopTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set(), passing object as first argument, with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"tag.getTopTags\"", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopTags({});

			expect(mockSet.mock.calls[0][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "tag.getTopTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.tagGetTopTags(callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.tagGetTopTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.tagGetTopTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("tagGetTopTracks()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopTracks({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopTracks({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.tagGetTopTracks(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"tag.getTopTracks\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetTopTracks({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "tag.getTopTracks"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.tagGetTopTracks({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.tagGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.tagGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("tagGetWeeklyChartList()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetWeeklyChartList({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetWeeklyChartList({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.tagGetWeeklyChartList(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"tag.getWeeklyChartList\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.tagGetWeeklyChartList({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "tag.getWeeklyChartList"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.tagGetWeeklyChartList({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.tagGetWeeklyChartList({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.tagGetWeeklyChartList({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackAddTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackAddTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackAddTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackAddTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"track.addTags\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackAddTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.addTags",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackAddTags({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackAddTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackAddTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackAddTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackGetCorrection()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetCorrection({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetCorrection({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackGetCorrection(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"track.getCorrection\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetCorrection({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.getCorrection"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackGetCorrection({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackGetCorrection({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackGetCorrection({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackGetInfo()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetInfo({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetInfo({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackGetInfo(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"track.getInfo\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetInfo({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.getInfo"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackGetInfo({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackGetInfo({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackGetInfo({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackGetSimilar()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetSimilar({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetSimilar({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackGetSimilar(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"track.getSimilar\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetSimilar({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.getSimilar"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackGetSimilar({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackGetSimilar({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackGetSimilar({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackGetTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackGetTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"track.getTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.getTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackGetTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackGetTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackGetTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackGetTopTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetTopTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetTopTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackGetTopTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"track.getTopTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackGetTopTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.getTopTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackGetTopTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackGetTopTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackGetTopTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackLove()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackLove({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackLove({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackLove(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"track.love\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackLove({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.love",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackLove({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackLove({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackLove({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackLove({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackRemoveTag()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackRemoveTag({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackRemoveTag({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackRemoveTag(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"track.removeTag\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackRemoveTag({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.removeTag",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackRemoveTag({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackRemoveTag({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackRemoveTag({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackRemoveTag({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackScrobble()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackScrobble({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackScrobble({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackScrobble(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"track.scrobble\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackScrobble({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.scrobble",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackScrobble({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackScrobble({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackScrobble({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackScrobble({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackScrobbleMany()", () => {
		it("calls LastFm.trackScrobble(), passing object as first argument, which is the result of mapping the keys and values of the objects in the paramsArr argument, appending [<index>] to the key to note the index of the source object in the array", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const spyTrackScrobble = jest.spyOn(lastFm, "trackScrobble");
			const paramsArr = [
				{
					foo: "bar",
					bar: "baz"
				},
				{
					qux: "quux",
					corge: "grault"
				}
			];

			const params = {};

			paramsArr.forEach((paramsObj, i) => Object
				.entries(paramsObj)
				.forEach(([name, value]) => params[`${name}[${i}]`] = value));

			lastFm.trackScrobbleMany(paramsArr);

			expect(spyTrackScrobble.mock.calls[0][0]).toStrictEqual(params);
		});
	});

	describe("trackSearch()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackSearch({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackSearch({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackSearch(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"track.search\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackSearch({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.search"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackSearch({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackSearch({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackSearch({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackUnlove()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackUnlove({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackUnlove({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackUnlove(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"track.unlove\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackUnlove({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.unlove",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackUnlove({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackUnlove({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackUnlove({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackUnlove({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("trackUpdateNowPlaying()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackUpdateNowPlaying({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackUpdateNowPlaying({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.trackUpdateNowPlaying(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\", \"method\", and \"sk\" properties set to \"lastFm.apiKey\", \"track.updateNowPlaying\", and \"lastFm.sessionKey\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackUpdateNowPlaying({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "track.updateNowPlaying",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.trackUpdateNowPlaying({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing \"POST\" as first argument, and callback argument as second argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.trackUpdateNowPlaying({}, callback);

			expect(mockSend).toHaveBeenCalledWith("POST", callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.trackUpdateNowPlaying({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.trackUpdateNowPlaying({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetFriends()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetFriends({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetFriends({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetFriends(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getFriends\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetFriends({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getFriends"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetFriends({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetFriends({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetFriends({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetInfo()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetInfo({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetInfo({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetInfo(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getInfo\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetInfo({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getInfo"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetInfo({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetInfo({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetInfo({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetInfoAuthenticated()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetInfoAuthenticated({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("passes object with \"api_key\", \"sk\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getInfo\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetInfoAuthenticated({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getInfo",
				sk: lastFm.sessionKey
			});
		});

		it("calls ApiRequest.sign(), passing \"lastFm.secret\" as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetInfoAuthenticated({});

			expect(mockSign).toHaveBeenCalledWith(lastFm.secret);
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetInfoAuthenticated({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetInfoAuthenticated({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetInfoAuthenticated({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetLovedTracks()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetLovedTracks({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetLovedTracks({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetLovedTracks(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getLovedTracks\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetLovedTracks({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getLovedTracks"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetLovedTracks({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetLovedTracks({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetLovedTracks({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetPersonalTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetPersonalTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetPersonalTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetPersonalTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getPersonalTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetPersonalTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getPersonalTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetPersonalTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetPersonalTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetPersonalTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetRecentTracks()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetRecentTracks({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetRecentTracks({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetRecentTracks(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getRecentTracks\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetRecentTracks({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getRecentTracks"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetRecentTracks({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetRecentTracks({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetRecentTracks({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetTopAlbums()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopAlbums({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopAlbums({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetTopAlbums(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getTopAlbums\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopAlbums({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getTopAlbums"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetTopAlbums({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetTopAlbums({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetTopAlbums({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetTopArtists()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopArtists({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopArtists({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetTopArtists(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getTopArtists\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopArtists({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getTopArtists"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetTopArtists({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetTopArtists({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetTopArtists({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetTopTags()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopTags({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopTags({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetTopTags(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getTopTags\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopTags({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getTopTags"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetTopTags({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetTopTags({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetTopTags({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetTopTracks()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopTracks({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopTracks({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetTopTracks(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getTopTracks\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetTopTracks({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getTopTracks"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetTopTracks({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetTopTracks({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetWeeklyAlbumChart()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyAlbumChart({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyAlbumChart({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetWeeklyAlbumChart(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getWeeklyAlbumChart\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyAlbumChart({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getWeeklyAlbumChart"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetWeeklyAlbumChart({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetWeeklyAlbumChart({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetWeeklyAlbumChart({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetWeeklyArtistChart()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyArtistChart({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyArtistChart({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetWeeklyArtistChart(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getWeeklyArtistChart\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyArtistChart({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getWeeklyArtistChart"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetWeeklyArtistChart({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetWeeklyArtistChart({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetWeeklyArtistChart({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetWeeklyChartList()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyChartList({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyChartList({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetWeeklyChartList(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getWeeklyChartList\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyChartList({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getWeeklyChartList"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetWeeklyChartList({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetWeeklyChartList({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetWeeklyChartList({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});

	describe("userGetWeeklyTrackChart()", () => {
		it("creates a new ApiRequest instance", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyTrackChart({});

			expect(ApiRequest).toHaveBeenCalled();
		});

		it("calls ApiRequest.set() twice", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyTrackChart({});

			expect(mockSet).toHaveBeenCalledTimes(2);
		});

		it("passes params argument as first argument to first call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const params = {
				foo: "bar",
				baz: "qux"
			};

			lastFm.userGetWeeklyTrackChart(params);

			expect(mockSet).toHaveBeenNthCalledWith(1, params);
		});

		it("passes object with \"api_key\" and \"method\" properties set to \"lastFm.apiKey\" and \"user.getWeeklyTrackChart\", as first argument to second call of ApiRequest.set()", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			lastFm.userGetWeeklyTrackChart({});

			expect(mockSet.mock.calls[1][0]).toStrictEqual({
				api_key: lastFm.apiKey,
				method: "user.getWeeklyTrackChart"
			});
		});

		it("calls ApiRequest.send(), passing callback argument as first argument", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const callback = () => {};

			lastFm.userGetWeeklyTrackChart({}, callback);

			expect(mockSend).toHaveBeenCalledWith(callback);
		});

		it("returns what ApiRequest.send() returns", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const rA = {};

			mockSend.mockReturnValueOnce(rA);

			const rB = lastFm.userGetWeeklyTrackChart({});

			expect(mockSend).toHaveReturnedWith(rA);
			expect(rB).toBe(rA);
		});

		it("returns self if ApiRequest.send() returns undefined", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const r = lastFm.userGetWeeklyTrackChart({});

			expect(mockSend).toHaveReturnedWith(undefined);
			expect(r).toBe(lastFm);
		});
	});
});
