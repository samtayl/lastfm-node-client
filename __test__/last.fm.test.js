const sinon = require("sinon");
const LastFm = require("../lib/last.fm.js");
const createRequest = require("../lib/request");

describe("LastFm", () => {
	const apiKey = "<apiKey>";
	const secret = "<secret>";
	const sessionKey = "<sessionKey>";
	const requestPrototype = Object.getPrototypeOf(createRequest());

	afterEach(() => {
		if(typeof requestPrototype["_actuallySend"].restore === "function") {
			requestPrototype["_actuallySend"].restore();
		}
	});

	describe("constructor()", () => {
		it("set apiKey, secret, and sessionKey properties", () => {
			const lastFm = new LastFm(apiKey, secret, sessionKey);
	
			expect(lastFm.apiKey).toBe(apiKey);
			expect(lastFm.secret).toBe(secret);
			expect(lastFm.sessionKey).toBe(sessionKey);
		});
	
		it("throw TypeError if apikey argument is not of type string", () => {
			function throwTypeError() {
				new LastFm();
			}
	
			expect(throwTypeError).toThrow(TypeError);
		});
	
		it("throw TypeError if secret argument is passed and not of type string", () => {
			function throwTypeError() {
				new LastFm(apiKey, null);
			}
	
			expect(throwTypeError).toThrow(TypeError);
		});
	
		it("throw TypeError if sessionKey argument is passed and not of type string", () => {
			function throwTypeError() {
				new LastFm(apiKey, secret, null);
			}
	
			expect(throwTypeError).toThrow(TypeError);
		});
	});

	it("add tags to an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");

			const searchParams = new URLSearchParams(body);
			
			expect(searchParams.get("method")).toBe("album.addTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});

		lastFm.albumAddTags();
	});

	it("get info from an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");

			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("album.getInfo");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});

		lastFm.albumGetInfo();
	});

	it("get tags from an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");

			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("album.getTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});

		lastFm.albumGetTags();
	});

	it("get top tags from an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");

			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("album.getTopTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});

		lastFm.albumGetTopTags();
	});

	it("remove tag from an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");

			const searchParams = new URLSearchParams(body);
			
			expect(searchParams.get("method")).toBe("album.removeTag");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});

		lastFm.albumRemoveTag();
	});

	it("search for an album", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");

			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("album.search");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});

		lastFm.albumSearch();
	});

	it("should add tags to an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);

		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");

			const searchParams = new URLSearchParams(body);

			expect(searchParams.get("method")).toBe("artist.addTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});

		lastFm.artistAddTags();
	});

	it("get artist correction", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("artist.getCorrection");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.artistGetCorrection();
	});

	it("get artist info", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("artist.getInfo");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.artistGetInfo();
	});

	it("get similar artists", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("artist.getSimilar");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.artistGetSimilar();
	});

	it("get artist tags", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("artist.getTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.artistGetTags();
	});

	it("get an artist's top albums", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("artist.getTopAlbums");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.artistGetTopAlbums();
	});

	it("get an artist's top tags", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("artist.getTopTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.artistGetTopTags();
	});

	it("get an artist's top tracks", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("artist.getTopTracks");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.artistGetTopTracks();
	});

	it("remove a tag from an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");
	
			const searchParams = new URLSearchParams(body);
	
			expect(searchParams.get("method")).toBe("artist.removeTag");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.artistRemoveTag();
	});

	it("search for an artist", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("artist.search");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.artistSearch();
	});

	it("get a mobile session", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");
	
			const searchParams = new URLSearchParams(body);
	
			expect(searchParams.get("method")).toBe("auth.getMobileSession");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.authGetMobileSession();
	});

	it("get session", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("auth.getSession");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.authGetSession();
	});

	it("get token", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("auth.getToken");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.authGetToken();
	});

	it("get the top artists chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("chart.getTopArtists");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.chartGetTopArtists();
	});

	it("get the top tags chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("chart.getTopTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.chartGetTopTags();
	});

	it("get the top tracks chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("chart.getTopTracks");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.chartGetTopTracks();
	});

	it("get most popular artists by country", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("geo.getTopArtists");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.geoGetTopArtists();
	});

	it("get most popular tracks by country", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("geo.getTopTracks");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.geoGetTopTracks();
	});

	it("get artists in a users library", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("library.getArtists");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.libraryGetArtists();
	});

	it("get tag info", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("tag.getInfo");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.tagGetInfo();
	});

	it("get similar tags", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("tag.getSimilar");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.tagGetSimilar();
	});

	it("get a tag's top albums", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("tag.getTopAlbums");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.tagGetTopAlbums();
	});

	it("get a tag's top artists", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("tag.getTopArtists");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.tagGetTopArtists();
	});

	it("get top tags", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("tag.getTopTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.tagGetTopTags();
	});

	it("get a tag's top tracks", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("tag.getTopTracks");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.tagGetTopTracks();
	});

	it("Get a tag's weekly chart", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("tag.getWeeklyChartList");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.tagGetWeeklyChartList();
	});

	it("add tags to a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");
	
			const searchParams = new URLSearchParams(body);
	
			expect(searchParams.get("method")).toBe("track.addTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.trackAddTags();
	});

	it("get track correction", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("track.getCorrection");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.trackGetCorrection();
	});

	it("get track info", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("track.getInfo");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.trackGetInfo();
	});

	it("get similar tracks", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("track.getSimilar");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.trackGetSimilar();
	});

	it("get tags from a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("track.getTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.trackGetTags();
	});

	it("get top tags for a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("track.getTopTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.trackGetTopTags();
	});

	it("love a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");
	
			const searchParams = new URLSearchParams(body);
	
			expect(searchParams.get("method")).toBe("track.love");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.trackLove();
	});
	
	it("remove a tag from a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");
	
			const searchParams = new URLSearchParams(body);
	
			expect(searchParams.get("method")).toBe("track.removeTag");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.trackRemoveTag();
	});

	it("scrobble a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");
	
			const searchParams = new URLSearchParams(body);
	
			expect(searchParams.get("method")).toBe("track.scrobble");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.trackScrobble();
	});
	
	it("search for a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("track.search");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.trackSearch();
	});

	it("unlove a track", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");
	
			const searchParams = new URLSearchParams(body);
	
			expect(searchParams.get("method")).toBe("track.unlove");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.trackUnlove();
	});

	it("update now playing", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).toBe("POST");
	
			const searchParams = new URLSearchParams(body);
	
			expect(searchParams.get("method")).toBe("track.updateNowPlaying");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			expect(searchParams.get("sk")).toBe(lastFm.sessionKey);
			expect(searchParams.has("api_sig")).toBe(true);
			done();
		});
	
		lastFm.trackUpdateNowPlaying();
	});

	it("Get tracks by an artist scrobbled by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getArtistTracks");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetArtistTracks();
	});

	it("get a user's friends", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getFriends");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetFriends();
	});

	it("get user info", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getInfo");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetInfo();
	});

	it("get loved tracks", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getLovedTracks");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetLovedTracks();
	});

	it("get tags added by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getPersonalTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetPersonalTags();
	});

	it("get recent tracks by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getRecentTracks");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetRecentTracks();
	});

	it("get top albums listened to by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getTopAlbums");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetTopAlbums();
	});

	it("get top artists listented to by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getTopArtists");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetTopArtists();
	});

	it("get top tags used by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getTopTags");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetTopTags();
	});

	it("get top tracks listened to by a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getTopTracks");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetTopTracks();
	});

	it("get album chart for a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getWeeklyAlbumChart");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetWeeklyAlbumChart();
	});

	it("get artist chart for a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getWeeklyArtistChart");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetWeeklyArtistChart();
	});

	it("get charts for a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getWeeklyChartList");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetWeeklyChartList();
	});

	it("get track chart for a user", done => {
		const lastFm = new LastFm(apiKey, secret, sessionKey);
	
		sinon.stub(requestPrototype, "_actuallySend").callsFake((options, body, callback) => {
			expect(options.method).not.toBe("POST");
	
			const url = new URL(`http://${options.hostname + options.path}`);
			const searchParams = url.searchParams;
			
			expect(searchParams.get("method")).toBe("user.getWeeklyTrackChart");
			expect(searchParams.get("api_key")).toBe(lastFm.apiKey);
			done();
		});
	
		lastFm.userGetWeeklyTrackChart();
	});
});
