const nock = require("nock");
const LastFm = require("../lib/LastFm");

describe("LastFm", () => {
	const apiKey = "<apiKey>";
	const secret = "<secret>";
	const sessionKey = "<sessionKey>";

	describe("constructor()", () => {
		test("set apiKey, secret, and sessionKey properties", () => {
			const lastFm = new LastFm({ apiKey, secret, sessionKey });

			expect(lastFm.apiKey).toBe(apiKey);
			expect(lastFm.secret).toBe(secret);
			expect(lastFm.sessionKey).toBe(sessionKey);
		});

		test("throw TypeError if apikey argument is not of type string", () => {
			function throwTypeError() {
				new LastFm();
			}

			expect(throwTypeError).toThrow(TypeError);
		});

		test("throw TypeError if secret argument is passed and not of type string", () => {
			function throwTypeError() {
				new LastFm({ apiKey, "secret": null });
			}

			expect(throwTypeError).toThrow(TypeError);
		});

		test("throw TypeError if sessionKey argument is passed and not of type string", () => {
			function throwTypeError() {
				new LastFm({ apiKey, "sessionKey": null });
			}

			expect(throwTypeError).toThrow(TypeError);
		});

		test("don't set secret property if not passed", () => {
			const lastFm = new LastFm({ apiKey });

			expect(lastFm.hasOwnProperty("secret")).toBeFalsy();
		});

		test("don't set sessionKey property if not passed", () => {
			const lastFm = new LastFm({ apiKey });

			expect(lastFm.hasOwnProperty("sessionKey")).toBeFalsy();
		});
	});

	test("add tags to an album", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "album.addTags",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.albumAddTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get info of an album", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "album.getInfo"
			})
			.reply(200, { "status": "ok" });

		lastFm.albumGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get tags of an album added by a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "album.getTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.albumGetTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tags of an album", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "album.getTopTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.albumGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("remove tag from an album", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "album.removeTag",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.albumRemoveTag({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("search for an album", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "album.search"
			})
			.reply(200, { "status": "ok" });

		lastFm.albumSearch({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("add tags to an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "artist.addTags",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.artistAddTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get correction of an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getCorrection"
			})
			.reply(200, { "status": "ok" });

		lastFm.artistGetCorrection({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get info of an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getInfo"
			})
			.reply(200, { "status": "ok" });

		lastFm.artistGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get similar to an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getSimilar"
			})
			.reply(200, { "status": "ok" });

		lastFm.artistGetSimilar({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get tags of an artist added by a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.artistGetTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top albums of an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getTopAlbums"
			})
			.reply(200, { "status": "ok" });

		lastFm.artistGetTopAlbums({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tags of an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getTopTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.artistGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tracks of an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.getTopTracks"
			})
			.reply(200, { "status": "ok" });

		lastFm.artistGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("remove tag from an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "artist.removeTag",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.artistRemoveTag({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("search for an artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "artist.search"
			})
			.reply(200, { "status": "ok" });

		lastFm.artistSearch({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get a session key for an account", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "auth.getMobileSession"
			})
			.reply(200, { "status": "ok" });

		lastFm.authGetMobileSession({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get a session key for an account", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "auth.getSession"
			})
			.reply(200, { "status": "ok" });

		lastFm.authGetSession({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get a token", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "auth.getToken"
			})
			.reply(200, { "status": "ok" });

		lastFm.authGetToken((err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get the top artists chart", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "chart.getTopArtists"
			})
			.reply(200, { "status": "ok" });

		lastFm.chartGetTopArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get the top tags chart", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "chart.getTopTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.chartGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get the top tracks chart", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "chart.getTopTracks"
			})
			.reply(200, { "status": "ok" });

		lastFm.chartGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top artists of a country", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "geo.getTopArtists"
			})
			.reply(200, { "status": "ok" });

		lastFm.geoGetTopArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tracks of a country", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "geo.getTopTracks"
			})
			.reply(200, { "status": "ok" });

		lastFm.geoGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get artists in library of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "library.getArtists"
			})
			.reply(200, { "status": "ok" });

		lastFm.libraryGetArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get info of a tag", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getInfo"
			})
			.reply(200, { "status": "ok" });

		lastFm.tagGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get similar to a tag", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getSimilar"
			})
			.reply(200, { "status": "ok" });

		lastFm.tagGetSimilar({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top albums of a tag", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getTopAlbums"
			})
			.reply(200, { "status": "ok" });

		lastFm.tagGetTopAlbums({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top artists of a tag", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getTopArtists"
			})
			.reply(200, { "status": "ok" });

		lastFm.tagGetTopArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tags", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getTopTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.tagGetTopTags((err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tracks of a tag", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getTopTracks"
			})
			.reply(200, { "status": "ok" });

		lastFm.tagGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get weekly charts of a tag", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "tag.getWeeklyChartList"
			})
			.reply(200, { "status": "ok" });

		lastFm.tagGetWeeklyChartList({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("add tags to a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "track.addTags",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.trackAddTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get correction of a track and artist", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getCorrection"
			})
			.reply(200, { "status": "ok" });

		lastFm.trackGetCorrection({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get info of a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getInfo"
			})
			.reply(200, { "status": "ok" });

		lastFm.trackGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get similar to a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getSimilar"
			})
			.reply(200, { "status": "ok" });

		lastFm.trackGetSimilar({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get tags of a track added by a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.trackGetTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tags of a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.getTopTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.trackGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("love a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "track.love",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.trackLove({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("remove tag from a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "track.removeTag",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.trackRemoveTag({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("scrobble a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "track.scrobble",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.trackScrobble({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("search for a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "track.search"
			})
			.reply(200, { "status": "ok" });

		lastFm.trackSearch({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("unlove a track", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "track.unlove",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.trackUnlove({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("update now playing", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", {
				"api_key": apiKey,
				"api_sig": /.+/u,
				"format": "json",
				"method": "track.updateNowPlaying",
				"sk": sessionKey
			})
			.reply(200, { "status": "ok" });

		lastFm.trackUpdateNowPlaying({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get tracks of an artist scrobbled by a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getArtistTracks"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetArtistTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get friends of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getFriends"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetFriends({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get info of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getInfo"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get loved tracks of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getLovedTracks"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetLovedTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get items of a tag added by a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getPersonalTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetPersonalTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get recent tracks of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getRecentTracks"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetRecentTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top albums of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getTopAlbums"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetTopAlbums({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top artists of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getTopArtists"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetTopArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tags of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getTopTags"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get top tracks of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getTopTracks"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get weekly album chart of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getWeeklyAlbumChart"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetWeeklyAlbumChart({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get weekly artist chart of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getWeeklyArtistChart"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetWeeklyArtistChart({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get weekly charts of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getWeeklyChartList"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetWeeklyChartList({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});

	test("get weekly track chart of a user", done => {
		const lastFm = new LastFm({ apiKey, secret, sessionKey });

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({
				"api_key": apiKey,
				"format": "json",
				"method": "user.getWeeklyTrackChart"
			})
			.reply(200, { "status": "ok" });

		lastFm.userGetWeeklyTrackChart({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ "status": "ok" });
			done();
		});
	});
});
