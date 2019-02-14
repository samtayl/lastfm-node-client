const nock = require("nock");
const LastFm = require("../lib/LastFm.js");

describe("LastFm", () => {
	const apiKey = "<apiKey>";
	const secret = "<secret>";
	const sessionKey = "<sessionKey>";

	describe("constructor()", () => {
		test("set apiKey, secret, and sessionKey properties", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
	
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
				new LastFm(apiKey, null);
			}
	
			expect(throwTypeError).toThrow(TypeError);
		});
	
		test("throw TypeError if sessionKey argument is passed and not of type string", () => {
			function throwTypeError() {
				new LastFm(apiKey, secret, null);
			}
	
			expect(throwTypeError).toThrow(TypeError);
		});
	});

	test("add tags to an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "album.addTags", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok" });

		lastFm.albumAddTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get info of an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "album.getInfo", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.albumGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get tags of an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "album.getTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.albumGetTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tags of an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "album.getTopTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.albumGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("remove a tag from an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "album.removeTag", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok"})

		lastFm.albumRemoveTag({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("search for an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "album.search", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.albumSearch({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("add tags to an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "artist.addTags", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok" });

		lastFm.artistAddTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get corrections of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "artist.getCorrection", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.artistGetCorrection({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get info of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "artist.getInfo", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.artistGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get similar artists to an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "artist.getSimilar", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.artistGetSimilar({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get tags of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "artist.getTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.artistGetTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top albums of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "artist.getTopAlbums", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.artistGetTopAlbums({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tags of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "artist.getTopTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.artistGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tracks of an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "artist.getTopTracks", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.artistGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("remove a tag from an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "artist.removeTag", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok"})

		lastFm.artistRemoveTag({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("search for an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "artist.search", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.artistSearch({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get a mobile session", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "auth.getMobileSession", api_key: apiKey, format: "json", api_sig:  /.+/ })
			.reply(200, { status: "ok"})

		lastFm.authGetMobileSession({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get a session key", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "auth.getSession", api_key: apiKey, format: "json", api_sig:  /.+/ })
			.reply(200, { status: "ok" });
	
		lastFm.authGetSession({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get a token", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "auth.getToken", api_key: apiKey, format: "json", api_sig:  /.+/ })
			.reply(200, { status: "ok" });
	
		lastFm.authGetToken((err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get the top artists chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "chart.getTopArtists", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.chartGetTopArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get the top tags chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "chart.getTopTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.chartGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get the top tracks chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "chart.getTopTracks", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.chartGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top artists of a country", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "geo.getTopArtists", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.geoGetTopArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tracks of a country", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "geo.getTopTracks", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.geoGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get artists in the library of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "library.getArtists", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.libraryGetArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get info of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "tag.getInfo", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.tagGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get similar tags to a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "tag.getSimilar", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.tagGetSimilar({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top albums of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "tag.getTopAlbums", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.tagGetTopAlbums({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top artists of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "tag.getTopArtists", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.tagGetTopArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tags", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "tag.getTopTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.tagGetTopTags((err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tracks of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "tag.getTopTracks", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.tagGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get weekly charts of a tag", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "tag.getWeeklyChartList", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.tagGetWeeklyChartList({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("add tags to a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "track.addTags", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok" });

		lastFm.trackAddTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get corrections of a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "track.getCorrection", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.trackGetCorrection({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get info of a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "track.getInfo", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.trackGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get similar tracks to a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "track.getSimilar", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.trackGetSimilar({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get tags of a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "track.getTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });

		lastFm.trackGetTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tags of a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "track.getTopTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" });
	
		lastFm.trackGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("love a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "track.love", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok" });

		lastFm.trackLove({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});
	
	test("remove a tag from a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "track.removeTag", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok"})

		lastFm.trackRemoveTag({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("scrobble a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "track.scrobble", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok" });

		lastFm.trackScrobble({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});
	
	test("search for a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "track.search", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.trackSearch({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("unlove a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "track.unlove", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok" });

		lastFm.trackUnlove({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("update now playing", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.post("/2.0/", { method: "track.updateNowPlaying", api_key: apiKey, format: "json", sk: sessionKey, api_sig:  /.+/ })
			.reply(200, { status: "ok" });

		lastFm.trackUpdateNowPlaying({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get tracks by an artist scrobbled by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getArtistTracks", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetArtistTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get friends of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getFriends", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetFriends({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get info of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getInfo", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetInfo({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get tracks loved by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getLovedTracks", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetLovedTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get tags added by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getPersonalTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetPersonalTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get recent tracks of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getRecentTracks", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetRecentTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top albums listened to by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getTopAlbums", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetTopAlbums({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top artists listented to by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getTopArtists", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetTopArtists({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tags used by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getTopTags", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetTopTags({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get top tracks listened to by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getTopTracks", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetTopTracks({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get weekly album chart of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getWeeklyAlbumChart", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetWeeklyAlbumChart({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get weekly artist chart of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getWeeklyArtistChart", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetWeeklyArtistChart({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get weekly charts of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getWeeklyChartList", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetWeeklyChartList({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});

	test("get weekly track chart of a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		nock("http://ws.audioscrobbler.com")
			.get("/2.0/")
			.query({ method: "user.getWeeklyTrackChart", api_key: apiKey, format: "json" })
			.reply(200, { status: "ok" })

		lastFm.userGetWeeklyTrackChart({}, (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual({ status: "ok" });
			done();
		});
	});
});
