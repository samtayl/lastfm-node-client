const nock = require("nock");
const LastFm = require("../lib/LastFm");
const apiKey = "<apiKey>";
const secret = "<secret>";
const sessionKey = "<sessionKey>";

describe("LastFm()", () => {
	describe("constructor()", () => {
		test("set self apiKey property value of apiKey parameter", () => {
			const lastFm = new LastFm(apiKey);

			expect(lastFm.apiKey).toBe(apiKey);
		});

		test("set self secret property value of secret parameter", () => {
			const lastFm = new LastFm(apiKey, secret);

			expect(lastFm.secret).toBe(secret);
		});

		test("set self sessionKey property value of sessionKey parameter", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);

			expect(lastFm.sessionKey).toBe(sessionKey);
		});

		test("throw TypeError if apiKey paramater is not passed", () => {
			function throwsTypeError() {
				new LastFm();
			}

			expect(throwsTypeError).toThrow(TypeError);
		});

		test("throw TypeError if apiKey paramater is not of type string", () => {
			function throwsTypeError() {
				new LastFm(null);
			}

			expect(throwsTypeError).toThrow(TypeError);
		});

		test("throw TypeError if secret paramater is not of type string", () => {
			function throwsTypeError() {
				new LastFm(apiKey, null);
			}

			expect(throwsTypeError).toThrow(TypeError);
		});

		test("throw TypeError if sessionKey paramater is not of type string", () => {
			function throwsTypeError() {
				new LastFm(apiKey, secret, null);
			}

			expect(throwsTypeError).toThrow(TypeError);
		});
	});

	test("add tags to an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "album.addTags",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.albumAddTags().then(() => done());
	});

	test("get info of an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "album.getInfo"
			})
			.reply(200, {});

		lastFm.albumGetInfo().then(() => done());
	});

	test("get tags of an album added by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "album.getTags"
			})
			.reply(200, {});

		lastFm.albumGetTags().then(() => done());
	});

	test("get top tags of an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "album.getTopTags"
			})
			.reply(200, {});

		lastFm.albumGetTopTags().then(() => done());
	});

	test("remove tag from an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "album.removeTag",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.albumRemoveTag().then(() => done());
	});

	test("search for an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "album.search"
			})
			.reply(200, {});

		lastFm.albumSearch().then(() => done());
	});

	test("add tags to an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "artist.addTags",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.artistAddTags().then(() => done());
	});

	test("get correction of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getCorrection"
			})
			.reply(200, {});

		lastFm.artistGetCorrection().then(() => done());
	});

	test("get info of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getInfo"
			})
			.reply(200, {});

		lastFm.artistGetInfo().then(() => done());
	});

	test("get similar to an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getSimilar"
			})
			.reply(200, {});

		lastFm.artistGetSimilar().then(() => done());
	});

	test("get tags of an artist added by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getTags"
			})
			.reply(200, {});

		lastFm.artistGetTags().then(() => done());
	});

	test("get top albums of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getTopAlbums"
			})
			.reply(200, {});

		lastFm.artistGetTopAlbums().then(() => done());
	});

	test("get top tags of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getTopTags"
			})
			.reply(200, {});

		lastFm.artistGetTopTags().then(() => done());
	});

	test("get top tracks of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getTopTracks"
			})
			.reply(200, {});

		lastFm.artistGetTopTracks().then(() => done());
	});

	test("remove tag from an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "artist.removeTag",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.artistRemoveTag().then(() => done());
	});

	test("search for an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.search"
			})
			.reply(200, {});

		lastFm.artistSearch().then(() => done());
	});

	test("get a session key for an account", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "auth.getMobileSession"
			})
			.reply(200, {});

		lastFm.authGetMobileSession().then(() => done());
	});

	test("get a session key for an account", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "auth.getSession"
			})
			.reply(200, {});

		lastFm.authGetSession().then(() => done());
	});

	test("get a token", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "auth.getToken"
			})
			.reply(200, {});

		lastFm.authGetToken((err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({});
			done();
		});
	});

	test("get the top artists chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "chart.getTopArtists"
			})
			.reply(200, {});

		lastFm.chartGetTopArtists().then(() => done());
	});

	test("get the top tags chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "chart.getTopTags"
			})
			.reply(200, {});

		lastFm.chartGetTopTags().then(() => done());
	});

	test("get the top tracks chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "chart.getTopTracks"
			})
			.reply(200, {});

		lastFm.chartGetTopTracks().then(() => done());
	});

	test("get top artists of a country", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "geo.getTopArtists"
			})
			.reply(200, {});

		lastFm.geoGetTopArtists().then(() => done());
	});

	test("get top tracks of a country", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "geo.getTopTracks"
			})
			.reply(200, {});

		lastFm.geoGetTopTracks().then(() => done());
	});

	test("get artists in library of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "library.getArtists"
			})
			.reply(200, {});

		lastFm.libraryGetArtists().then(() => done());
	});

	test("get info of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getInfo"
			})
			.reply(200, {});

		lastFm.tagGetInfo().then(() => done());
	});

	test("get similar to a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getSimilar"
			})
			.reply(200, {});

		lastFm.tagGetSimilar().then(() => done());
	});

	test("get top albums of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getTopAlbums"
			})
			.reply(200, {});

		lastFm.tagGetTopAlbums().then(() => done());
	});

	test("get top artists of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getTopArtists"
			})
			.reply(200, {});

		lastFm.tagGetTopArtists().then(() => done());
	});

	test("get top tags", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getTopTags"
			})
			.reply(200, {});

		lastFm.tagGetTopTags((err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({});
			done();
		});
	});

	test("get top tracks of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getTopTracks"
			})
			.reply(200, {});

		lastFm.tagGetTopTracks().then(() => done());
	});

	test("get weekly charts of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getWeeklyChartList"
			})
			.reply(200, {});

		lastFm.tagGetWeeklyChartList().then(() => done());
	});

	test("add tags to a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "track.addTags",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.trackAddTags().then(() => done());
	});

	test("get correction of a track and artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getCorrection"
			})
			.reply(200, {});

		lastFm.trackGetCorrection().then(() => done());
	});

	test("get info of a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getInfo"
			})
			.reply(200, {});

		lastFm.trackGetInfo().then(() => done());
	});

	test("get similar to a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getSimilar"
			})
			.reply(200, {});

		lastFm.trackGetSimilar().then(() => done());
	});

	test("get tags of a track added by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getTags"
			})
			.reply(200, {});

		lastFm.trackGetTags().then(() => done());
	});

	test("get top tags of a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getTopTags"
			})
			.reply(200, {});

		lastFm.trackGetTopTags().then(() => done());
	});

	test("love a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "track.love",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.trackLove().then(() => done());
	});

	test("remove tag from a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "track.removeTag",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.trackRemoveTag().then(() => done());
	});

	test("scrobble a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "track.scrobble",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.trackScrobble().then(() => done());
	});

	test("scrobble many tracks", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "track.scrobble",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.trackScrobbleMany([], (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({});
			done();
		});
	});

	describe("trackScrobbleMany()", () => {
		test("concatenate params array into single object, using array notation to distinguish each set of params, and call LastFm.trackScrobble() with that as the first argument", done => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const spy = jest.spyOn(lastFm, "trackScrobble");
			const params = [{ "param": "<value>" }, { "param": "<value>" }];

			nock("http://ws.audioscrobbler.com")
				.post("/2.0")
				.reply(200, {});

			lastFm.trackScrobbleMany(params, (err, data) => {
				expect(err).toBeNull();
				expect(data).toEqual({});
				expect(spy).toBeCalledTimes(1);

				const [firstCallArgs] = spy.mock.calls;
				const [firstCallFirstArg] = firstCallArgs;

				expect(JSON.stringify(firstCallFirstArg)).toBe("{\"param[1]\":\"<value>\",\"param[0]\":\"<value>\"}");
				done();
			});
		});

		test("if called with one params object, call LastFm.trackScrobble() with that as the first argument", done => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
			const spy = jest.spyOn(lastFm, "trackScrobble");
			const params = [{ "param": "<value>" }];

			nock("http://ws.audioscrobbler.com")
				.post("/2.0")
				.reply(200, {});

			lastFm.trackScrobbleMany(params, (err, data) => {
				expect(err).toBeNull();
				expect(data).toEqual({});
				expect(spy).toBeCalledTimes(1);

				const [firstCallArgs] = spy.mock.calls;
				const [firstCallFirstArg] = firstCallArgs;

				expect(JSON.stringify(firstCallFirstArg)).toBe("{\"param\":\"<value>\"}");
				done();
			});
		});
	});

	test("search for a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.search"
			})
			.reply(200, {});

		lastFm.trackSearch().then(() => done());
	});

	test("unlove a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "track.unlove",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.trackUnlove().then(() => done());
	});

	test("update now playing", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0", {
				"api_key": apiKey,
				"api_sig": /.*/u,
				"format": "json",
				"method": "track.updateNowPlaying",
				"sk": sessionKey
			})
			.reply(200, {});

		lastFm.trackUpdateNowPlaying().then(() => done());
	});

	test("get tracks of an artist scrobbled by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getArtistTracks"
			})
			.reply(200, {});

		lastFm.userGetArtistTracks().then(() => done());
	});

	test("get friends of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getFriends"
			})
			.reply(200, {});

		lastFm.userGetFriends().then(() => done());
	});

	test("get info of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getInfo"
			})
			.reply(200, {});

		lastFm.userGetInfo().then(() => done());
	});

	test("get loved tracks of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getLovedTracks"
			})
			.reply(200, {});

		lastFm.userGetLovedTracks().then(() => done());
	});

	test("get items of a tag added by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getPersonalTags"
			})
			.reply(200, {});

		lastFm.userGetPersonalTags().then(() => done());
	});

	test("get recent tracks of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getRecentTracks"
			})
			.reply(200, {});

		lastFm.userGetRecentTracks().then(() => done());
	});

	test("get top albums of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getTopAlbums"
			})
			.reply(200, {});

		lastFm.userGetTopAlbums().then(() => done());
	});

	test("get top artists of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getTopArtists"
			})
			.reply(200, {});

		lastFm.userGetTopArtists().then(() => done());
	});

	test("get top tags of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getTopTags"
			})
			.reply(200, {});

		lastFm.userGetTopTags().then(() => done());
	});

	test("get top tracks of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getTopTracks"
			})
			.reply(200, {});

		lastFm.userGetTopTracks().then(() => done());
	});

	test("get weekly album chart of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getWeeklyAlbumChart"
			})
			.reply(200, {});

		lastFm.userGetWeeklyAlbumChart().then(() => done());
	});

	test("get weekly artist chart of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getWeeklyArtistChart"
			})
			.reply(200, {});

		lastFm.userGetWeeklyArtistChart().then(() => done());
	});

	test("get weekly charts of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getWeeklyChartList"
			})
			.reply(200, {});

		lastFm.userGetWeeklyChartList().then(() => done());
	});

	test("get weekly track chart of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getWeeklyTrackChart"
			})
			.reply(200, {});

		lastFm.userGetWeeklyTrackChart().then(() => done());
	});
});
