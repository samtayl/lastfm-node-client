const request = require("./request");

class LastFm {
	constructor(apiKey, secret, sessionKey) {
		if(typeof apiKey !== "string") {
			throw new TypeError("apiKey must be of type string");
		}

		if(secret !== undefined && typeof secret !== "string") {
			throw new TypeError("secret, if passed, must be of type string");
		}

		if(sessionKey !== undefined && typeof sessionKey !== "string") {
			throw new TypeError("sessionKey, if passed, must be of type string");
		}

		this.apiKey = apiKey;

		if(secret) {
			this.secret = secret;
		}

		if(sessionKey) {
			this.sessionKey = sessionKey;
		}
	}

	albumAddTags(params, callback) {
		return request("album", "addTags", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	albumGetInfo(params, callback) {
		return request("album", "getInfo", this.apiKey, params).send(callback) || this;
	}

	albumGetTags(params, callback) {
		return request("album", "getTags", this.apiKey, params).send(callback) || this;
	}

	albumGetTopTags(params, callback) {
		return request("album", "getTopTags", this.apiKey, params).send(callback) || this;
	}

	albumsRemoveTag(params, callback) {
		return request("album", "removeTag", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	albumSearch(params, callback) {
		return request("album", "search", this.apiKey, params).send(callback) || this;
	}

	artistAddTags(params, callback) {
		return request("artist", "addTags", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	artistGetCorrection(params, callback) {
		return request("artist", "getCorrection", this.apiKey, params).send(callback) || this;
	}

	artistGetInfo(params, callback) {
		return request("artist", "getInfo", this.apiKey, params).send(callback) || this;
	}

	artistGetSimilar(params, callback) {
		return request("artist", "getSimilar", this.apiKey, params).send(callback) || this;
	}

	artistGetTags(params, callback) {
		return request("artist", "getTags", this.apiKey, params).send(callback) || this;
	}

	artistGetTopAlbums(params, callback) {
		return request("artist", "getTopAlbums", this.apiKey, params).send(callback) || this;
	}

	artistGetTopTags(params, callback) {
		return request("artist", "getTopTags", this.apiKey, params).send(callback) || this;
	}

	artistGetTopTracks(params, callback) {
		return request("artist", "getTopTracks", this.apiKey, params).send(callback) || this;
	}

	artistRemoveTag(params, callback) {
		return request("artist", "removeTag", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	artistSearch(params, callback) {
		return request("artist", "search", this.apiKey, params).send(callback) || this;
	}

	authGetMobileSession(params, callback) {
		return request("auth", "getMobileSession", this.apiKey, params).sign(this.secret).send("POST", callback) || this;
	}

	authGetSession(params, callback) {
		return request("auth", "getSession", this.apiKey, params).sign(this.secret).send(callback) || this;
	}

	authGetToken(callback) {
		return request("auth", "getToken", this.apiKey).sign(this.secret).send(callback) || this;
	}

	chartGetTopArtists(params, callback) {
		return request("chart", "getTopArtists", this.apiKey, params).send(callback) || this;
	}

	chartGetTopArtists(params, callback) {
		return request("chart", "getTopArtists", this.apiKey, params).send(callback) || this;
	}

	chartGetTopTracks(params, callback) {
		return request("chart", "getTopTracks", this.apiKey, params).send(callback) || this;
	}

	geoGetTopArtists(params, callback) {
		return request("geo", "getTopArtists", this.apiKey, params).send(callback) || this;
	}

	geoGetTopTracks(params, callback) {
		return request("geo", "getTopTracks", this.apiKey, params).send(callback) || this;
	}

	libraryGetArtists(params, callback) {
		return request("library", "getArtists", this.apiKey, params).send(callback) || this;
	}

	tagGetInfo(params, callback) {
		return request("tag", "getInfo", this.apiKey, params).send(callback) || this;
	}

	tagGetSimilar(params, callback) {
		return request("tag", "getSimilar", this.apiKey, params).send(callback) || this;
	}

	tagGetTopAlbums(params, callback) {
		return request("tag", "getTopAlbums", this.apiKey, params).send(callback) || this;
	}

	tagGetTopArtists(params, callback) {
		return request("tag", "getTopArtists", this.apiKey, params).send(callback) || this;
	}

	tagGetTopTags(params, callback) {
		return request("tag", "getTopTags", this.apiKey, params).send(callback) || this;
	}

	tagsGetTopTracks(params, callback) {
		return request("tag", "gatTopTracks", this.apiKey, params).send(callback) || this;
	}

	tagsGetWeeklyChartList(params, callback) {
		return request("tag", "getWeeklyChartList", this.apiKey, params).send(callback) || this;
	}

	trackAddTags(params, callback) {
		return request("track", "addTags", this.apiKey, params, this.sessionKey).send("POST", callback) || this;
	}

	trackGetCorrection(params, callback) {
		return request("track", "getCorrection", this.apiKey, params).send(callback) || this;
	}

	trackGetInfo(params, callback) {
		return request("track", "getInfo", this.apiKey, params).send(callback) || this;
	}

	trackGetSimilar(params, callback) {
		return request("track", "getSimilar", this.apiKey, params).send(callback) || this;
	}

	trackGetTags(params, callback) {
		return request("track", "getTags", this.apiKey, params).send(callback) || this;
	}

	trackGetTopTags(params, callback) {
		return request("track", "getTopTags", this.apiKey, params).send(callback) || this;
	}

	trackLove(params, callback) {
		return request("track", "love", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	trackRemoveTag(params, callback) {
		return request("track", "removeTag", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	trackScrobble(params, callback) {
		return request("track", "scrobble", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	trackSearch(params, callback) {
		return request("track", "search", this.apiKey, params).send(callback) || this;
	}

	trackUnlove(params, callback) {
		return request("track", "unlove", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	trackUpdateNowPlaying(params, callback) {
		return request("track", "updateNowPlaying", this.apiKey, params, this.sessionKey).sign(this.secret).send("POST", callback) || this;
	}

	userGetArtistTracks(params, callback) {
		return request("user", "getArtistTracks", this.apiKey, params).send(callback) || this;
	}

	userGetFriends(params, callback) {
		return request("user", "getFreinds", this.apiKey, params).send(callback) || this;
	}

	userGetInfo(params, callback) {
		return request("user", "getInfo", this.apiKey, params).send(callback) || this;
	}

	userGetLovedTracks(params, callback) {
		return request("user", "getLovedTracks", this.apiKey, params).send(callback) || this;
	}

	userGetPersonalTags(params, callback) {
		return request("user", "getPersonalTags", this.apiKey, params).send(callback) || this;
	}

	userGetRecentTracks(params, callback) {
		return request("user", "getRecentTracks", this.apiKey, params).send(callback) || this;
	}

	userGetTopAlbums(params, callback) {
		return request("user", "getTopAlbums", this.apiKey, params).send(callback) || this;
	}

	userGetTopArtists(params, callback) {
		return request("user", "getTopArtists", this.apiKey, params).send(callback) || this;
	}

	userGetTopTags(params, callback) {
		return request("user", "getTopTags", this.apiKey, params).send(callback) || this;
	}

	userGetTopTracks(params, callback) {
		return request("user", "getTopTracks", this.apiKey, params).send(callback) || this;
	}

	userGetWeeklyAlbumChart(params, callback) {
		return request("user", "getWeeklyAlbumChart", this.apiKey, params).send(callback) || this;
	}

	userGetWeeklyArtistChart(params, callback) {
		return request("user", "getWeeklyArtistChart", this.apiKey, params).send(callback) || this;
	}

	userGetWeeklyChartList(params, callback) {
		return request("user", "getWeeklyChartList", this.apiKey, params).send(callback) || this;
	}

	userGetWeeklyTrackChart(params, callback) {
		return request("user", "getWeeklyTrackChart", this.apiKey, params).send(callback) || this;
	}
}

module.exports = LastFm;
