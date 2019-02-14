const ApiRequest = require("./request");

/**
 * Callback for LastFm methods
 * @callback callback
 * @param {Error} [err]
 * @param {Object} [data]
 */

class LastFm {

	/**
	 * Create a LastFm instance
	 * @param {string} apiKey
	 * @param {string} [secret]
	 * @param {string} [sessionKey]
	 */

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

	/**
	 * Add tags to an album
	 * @param {Object} params
	 * @param {string} params.artist - Artist whose album to add tags to
	 * @param {string} params.album - Album to add tags to
	 * @param {(string|string[])} params.tags - Tags to add to album
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	albumAddTags(params, callback) {
		return (new ApiRequest("album", "addTags", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Get info of an album
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist whose album to get info of. Required unless params.mbid is set.
	 * @param {string} [params.album] - Album to get info of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of album to get info of. Required unless params.artist and params.album are set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {string} [params.lang] - Language to return the biography in. Writen as an ISO 639 alpha-2 code.
	 * @param {string} [params.username] - User whose play count to include
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	albumGetInfo(params, callback) {
		return (new ApiRequest("album", "getInfo", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get tags of an album added by a user
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist whose album to get tags of. Required unless params.mbid is set.
	 * @param {string} [params.album] - Album to get tags of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of album to get tags of. Required unless params.artist and params.album are set.
	 * @param {string} params.user - User whose tags added to the album to get
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	albumGetTags(params, callback) {
		return (new ApiRequest("album", "getTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top tags of an album
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist whose album to get top tags of. Required unless params.mbid is set.
	 * @param {string} [params.album] - Album to get top tags of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of album to get top tags of. Required unless params.artist and params.album are set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	albumGetTopTags(params, callback) {
		return (new ApiRequest("album", "getTopTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Remove tag from an album
	 * @param {Object} params
	 * @param {string} params.artist - Artist whose album to remove tag from
	 * @param {string} params.album - Album to remove tag from
	 * @param {string} params.tag - Tag to remove from album
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	albumRemoveTag(params, callback) {
		return (new ApiRequest("album", "removeTag", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Search for an album
	 * @param {Object} params
	 * @param {string} params.album - Album to search for
	 * @param {number} [params.limit] - Number of albums to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	albumSearch(params, callback) {
		return (new ApiRequest("album", "search", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Add tags to an artist
	 * @param {Object} params
	 * @param {string} params.artist - Artist to add tags to
	 * @param {(string|string[])} params.tags - Tags to add to artist
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistAddTags(params, callback) {
		return (new ApiRequest("artist", "addTags", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Get correction of an artist
	 * @param {Object} params
	 * @param {string} params.artist - Artist to get correction of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistGetCorrection(params, callback) {
		return (new ApiRequest("artist", "getCorrection", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get info of an artist
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist to get info of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of artist to get info of. Required unless params.artist is set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {string} [params.lang] - Language to return the biography in. Writen as an ISO 639 alpha-2 code.
	 * @param {string} [params.username] - User whose play count to include
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistGetInfo(params, callback) {
		return (new ApiRequest("artist", "getInfo", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get similar to an artist
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist to get similar to. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of artist to get similar to. Required unless params.artist is set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {number} [params.limit] - Number of artists to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistGetSimilar(params, callback) {
		return (new ApiRequest("artist", "getSimilar", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get tags of an artist added by a user
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist to get tags of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of artist to get tags of. Required unless params.artist is set.
	 * @param {string} params.user - User whose tags added to the artist to get
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistGetTags(params, callback) {
		return (new ApiRequest("artist", "getTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top albums of an artist
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist to get top albums of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of artist to get top albums of. Required unless params.artist is set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {number} [params.limit] - Number of albums to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistGetTopAlbums(params, callback) {
		return (new ApiRequest("artist", "getTopAlbums", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top tags of an artist
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist to get top tags of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of artist to get top tags of. Required unless params.artist is set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistGetTopTags(params, callback) {
		return (new ApiRequest("artist", "getTopTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top tracks of an artist
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist to get top tracks of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of artist to get top tracks of. Required unless params.artist is set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist name
	 * @param {number} [params.limit] - Number of tracks to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistGetTopTracks(params, callback) {
		return (new ApiRequest("artist", "getTopTracks", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Remove tag from an artist
	 * @param {Object} params
	 * @param {string} params.artist - Artist to remove tag from
	 * @param {string} params.tag - Tag to remove from artist
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistRemoveTag(params, callback) {
		return (new ApiRequest("artist", "removeTag", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Search for an artist
	 * @param {Object} params
	 * @param {string} params.artist - Artist to search for
	 * @param {number} [params.limit] - Number of artists to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistSearch(params, callback) {
		return (new ApiRequest("artist", "search", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get a session key for an account
	 * @param {Object} params
	 * @param {string} params.username - Username or email of the account to get a session key for
	 * @param {string} params.password - Password of the account to get a session key for
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	authGetMobileSession(params, callback) {
		return (new ApiRequest("auth", "getMobileSession", this.apiKey, params)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Get a session key for an account
	 * @param {Object} params
	 * @param {string} params.token - Token to authenticate request
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	authGetSession(params, callback) {
		return (new ApiRequest("auth", "getSession", this.apiKey, params)).sign(this.secret).send(callback) || this;
	}

	/**
	 * Get a token
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	authGetToken(callback) {
		return (new ApiRequest("auth", "getToken", this.apiKey)).sign(this.secret).send(callback) || this;
	}

	/**
	 * Get the top artists chart
	 * @param {Object} params
	 * @param {number} [params.limit] - Number of artists to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	chartGetTopArtists(params, callback) {
		return (new ApiRequest("chart", "getTopArtists", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get the top tags chart
	 * @param {Object} params
	 * @param {number} [params.limit] - Number of tags to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	chartGetTopTags(params, callback) {
		return (new ApiRequest("chart", "getTopTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get the top tracks chart
	 * @param {Object} params
	 * @param {number} [params.limit] - Number of tracks to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	chartGetTopTracks(params, callback) {
		return (new ApiRequest("chart", "getTopTracks", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top artists of a country
	 * @param {Object} params
	 * @param {string} params.country - Country to get top artists of. Written as an ISO 3166 country name.
	 * @param {number} [params.limit] - Number of artists to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	geoGetTopArtists(params, callback) {
		return (new ApiRequest("geo", "getTopArtists", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top tracks of a country
	 * @param {Object} params
	 * @param {string} params.country - Country to get top tracks of. Written as an ISO 3166 country name.
	 * @param {string} [params.location] - Location within a country to get top tracks of
	 * @param {number} [params.limit] - Number of tracks to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	geoGetTopTracks(params, callback) {
		return (new ApiRequest("geo", "getTopTracks", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get artists in library of a user
	 * @param {Object} params
	 * @param {string} params.user - User whose library to get artists of
	 * @param {number} [params.limit] - Number of artists to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	libraryGetArtists(params, callback) {
		return (new ApiRequest("library", "getArtists", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get info of a tag
	 * @param {Object} params
	 * @param {string} params.tag - Tag to get info of
	 * @param {string} [params.lang] - Language to return the wiki in. Writen as an ISO 639 alpha-2 code.
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetInfo(params, callback) {
		return (new ApiRequest("tag", "getInfo", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get similar to a tag
	 * @param {Object} params
	 * @param {string} params.tag - Tag to get similar to
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetSimilar(params, callback) {
		return (new ApiRequest("tag", "getSimilar", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top albums of a tag
	 * @param {Object} params
	 * @param {string} params.tag - Tag to get top albums of
	 * @param {number} [params.limit] - Number of albums to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetTopAlbums(params, callback) {
		return (new ApiRequest("tag", "getTopAlbums", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top artists of a tag
	 * @param {Object} params
	 * @param {string} params.tag - Tag to get top artists of
	 * @param {number} [params.limit] - Number of artists to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetTopArtists(params, callback) {
		return (new ApiRequest("tag", "getTopArtists", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top tags
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetTopTags(callback) {
		return (new ApiRequest("tag", "getTopTags", this.apiKey)).send(callback) || this;
	}

	/**
	 * Get top tracks of a tag
	 * @param {Object} params
	 * @param {string} params.tag - Tag to get top tracks of
	 * @param {number} [params.limit] - Number of tracks to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetTopTracks(params, callback) {
		return (new ApiRequest("tag", "getTopTracks", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get weekly charts of a tag
	 * @param {Object} params
	 * @param {string} params.tag - Tag to get weekly charts of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetWeeklyChartList(params, callback) {
		return (new ApiRequest("tag", "getWeeklyChartList", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Add tags to a track
	 * @param {Object} params
	 * @param {string} params.artist - Artist whose track to add tags to
	 * @param {string} params.track - Track to add tags to
	 * @param {(string|string[])} params.tags - Tags to add to track
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackAddTags(params, callback) {
		return (new ApiRequest("track", "addTags", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Get correction of a track and artist
	 * @param {Object} params
	 * @param {string} params.artist - Artist and whose track to get correction of
	 * @param {string} params.track - Track to get correction of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackGetCorrection(params, callback) {
		return (new ApiRequest("track", "getCorrection", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get info of a track
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist whose track to get info of. Required unless params.mbid is set.
	 * @param {string} [params.track] - Track to get info of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of track to get info of. Required unless params.artist and params.track are set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist and track names
	 * @param {string} [params.username] - User whose playcount and whether or not they have loved the track to include
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackGetInfo(params, callback) {
		return (new ApiRequest("track", "getInfo", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get similar to a track
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist whose track to get similar to. Required unless params.mbid is set.
	 * @param {string} [params.track] - Track to get similar to. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of track to get similar to. Required unless params.artist and params.track are set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist and track names
	 * @param {number} [params.limit] - Number of tracks to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackGetSimilar(params, callback) {
		return (new ApiRequest("track", "getSimilar", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get tags of a track added by a user
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist whose track to get tags of. Required unless params.mbid is set.
	 * @param {string} [params.track] - Track to get tags of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of track to get tags of. Required unless params.artist and params.track are set.
	 * @param {string} params.user - User whose tags added to the track to get
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist and track names
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackGetTags(params, callback) {
		return (new ApiRequest("track", "getTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top tags of a track
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist whose track to get top tags of. Required unless params.mbid is set.
	 * @param {string} [params.track] - Track to get top tags of. Required unless params.mbid is set.
	 * @param {string} [params.mbid] - MusicBrainz ID of track to get top tags of. Required unless params.artist and params.track are set.
	 * @param {(0|1)} [params.autocorrect] - Whether to correct misspelt artist and track names
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackGetTopTags(params, callback) {
		return (new ApiRequest("track", "getTopTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Love a track
	 * @param {Object} params
	 * @param {string} params.artist - Artist whose track to love
	 * @param {string} params.track - Track to love
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackLove(params, callback) {
		return (new ApiRequest("track", "love", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Remove tag from a track
	 * @param {Object} params
	 * @param {string} params.artist - Artist whose track to remove tag from
	 * @param {string} params.track - Track to remove tag from
	 * @param {string} params.tag - Tag to remove from track
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackRemoveTag(params, callback) {
		return (new ApiRequest("track", "removeTag", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Scrobble a track
	 * @param {Object} params
	 * @param {string} params.artist - Artist whose track to scrobble
	 * @param {string} params.track - Track to scobble
	 * @param {string} [params.album] - Album the track to scrobble is from
	 * @param {string} [params.albumArist] - Artist whose album the track to scrobble is from
	 * @param {number} params.timestamp - Timestamp to scrobble track at
	 * @param {number} [params.trackNumber] - Number of track to scrobble on the album
	 * @param {number} [params.duration] - Length of the track to scrobble in seconds
	 * @param {(0|1)} [params.chosenByUser] - Whether the user chose the track to scrobble
	 * @param {string} [params.streamId] - Stream ID if track to scrobble is from Last.Fm radio
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackScrobble(params, callback) {
		return (new ApiRequest("track", "scrobble", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Search for a track
	 * @param {Object} params
	 * @param {string} [params.artist] - Artist whose track to search for
	 * @param {string} params.track - Track to search for
	 * @param {number} [params.limit] - Number of tracks to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackSearch(params, callback) {
		return (new ApiRequest("track", "search", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Unlove a track
	 * @param {Object} params
	 * @param {string} params.artist - Artist whose track to unlove
	 * @param {string} params.track - Track to unlove
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackUnlove(params, callback) {
		return (new ApiRequest("track", "unlove", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Update now playing
	 * @param {Object} params
	 * @param {string} params.artist - Artist whose track to update now playing with
	 * @param {string} params.track - Track to update now playing with
	 * @param {string} [params.album] - Album the track to update now playing with is from
	 * @param {string} [params.albumArist] - Artist whose album the track to update now playing with is from
	 * @param {number} [params.trackNumber] - Number of track to update now playing with on the album
	 * @param {number} [params.duration] - Length of the track to update now playing with in seconds
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackUpdateNowPlaying(params, callback) {
		return (new ApiRequest("track", "updateNowPlaying", this.apiKey, params, this.sessionKey)).sign(this.secret).send("POST", callback) || this;
	}

	/**
	 * Get tracks of an artist scrobbled by a user
	 * @param {Object} params
	 * @param {string} params.user - User whose scrobbled tracks of an artist to get
	 * @param {string} params.artist - Artist whose tracks scrobbled by a user to get
	 * @param {string} [params.startTimestamp] - Timestamp to get tracks from
	 * @param {string} [params.endTimestamp] - Timestamp to get tracks to
	 * @param {string} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetArtistTracks(params, callback) {
		return (new ApiRequest("user", "getArtistTracks", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get friends of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get friends of
	 * @param {(0|1)} [params.recenttracks] - Whether to include recent tracks of friends
	 * @param {number} [params.limit] - Number of friends to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetFriends(params, callback) {
		return (new ApiRequest("user", "getFriends", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get info of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get info of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetInfo(params, callback) {
		return (new ApiRequest("user", "getInfo", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get loved tracks of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get loved tracks of
	 * @param {number} [params.limit] - Number of tracks to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetLovedTracks(params, callback) {
		return (new ApiRequest("user", "getLovedTracks", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get item of a tag added by a user
	 * @param {Object} params
	 * @param {string} params.user - User whose added tag to get items of
	 * @param {string} params.tag - Tag to get items of
	 * @param {("artist"|"album"|"track")} params.taggingtype - Type of tag to get items of
	 * @param {number} [params.limit] - Number of items to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetPersonalTags(params, callback) {
		return (new ApiRequest("user", "getPersonalTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get recent tracks of a user
	 * @param {Object} params
	 * @param {string} params.user - User whose recent tracks to get
	 * @param {(0|1)} [params.extended] - Whether to include extended data of the artist and whether the user has loved the track or not
	 * @param {string} [params.from] - Timestamp to get tracks from
	 * @param {string} [params.to] - Timestamp to get tracks to
	 * @param {number} [params.limit] - Number of tracks to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetRecentTracks(params, callback) {
		return (new ApiRequest("user", "getRecentTracks", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top albums of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get top albums of
	 * @param {("7day"|"1month"|"3month"|"6month"|"12month"|"overall")} [params.period] - Time period to get top albums of
	 * @param {number} [params.limit] - Number of albums to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetTopAlbums(params, callback) {
		return (new ApiRequest("user", "getTopAlbums", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top artists of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get top artists of
	 * @param {("7day"|"1month"|"3month"|"6month"|"12month"|"overall")} [params.period] - Time period to get top artists of
	 * @param {number} [params.limit] - Number of artists to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetTopArtists(params, callback) {
		return (new ApiRequest("user", "getTopArtists", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top tags of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get top tags of
	 * @param {number} [params.limit] - Number of tags to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetTopTags(params, callback) {
		return (new ApiRequest("user", "getTopTags", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get top tracks of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get top tracks of
	 * @param {("7day"|"1month"|"3month"|"6month"|"12month"|"overall")} [params.period] - Time period to get top tracks of
	 * @param {number} [params.limit] - Number of tracks to get per page
	 * @param {number} [params.page] - Page number to get
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetTopTracks(params, callback) {
		return (new ApiRequest("user", "getTopTracks", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get weekly album chart of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get weekly album chart of
	 * @param {string} [params.from] - Timestamp to get weekly album chart from
	 * @param {string} [params.to] - Timestamp to get weekly album chart to
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetWeeklyAlbumChart(params, callback) {
		return (new ApiRequest("user", "getWeeklyAlbumChart", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get weekly artist chart of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get weekly artist chart of
	 * @param {string} [params.from] - Timestamp to get weekly artist chart from
	 * @param {string} [params.to] - Timestamp to get weekly artist chart to
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetWeeklyArtistChart(params, callback) {
		return (new ApiRequest("user", "getWeeklyArtistChart", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get weekly charts of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get weekly charts of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetWeeklyChartList(params, callback) {
		return (new ApiRequest("user", "getWeeklyChartList", this.apiKey, params)).send(callback) || this;
	}

	/**
	 * Get weekly track chart of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get weekly track chart of
	 * @param {string} [params.from] - Timestamp to get weekly track chart from
	 * @param {string} [params.to] - Timestamp to get weekly track chart to
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetWeeklyTrackChart(params, callback) {
		return (new ApiRequest("user", "getWeeklyTrackChart", this.apiKey, params)).send(callback) || this;
	}
}

module.exports = LastFm;
