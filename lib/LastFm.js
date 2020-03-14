const ApiRequest = require("./ApiRequest");

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
	 * @param {string} secret
	 * @param {string} sessionKey
	 */

	constructor(apiKey, secret, sessionKey) {
		if (typeof apiKey !== "string") {
			throw new TypeError("apiKey must be of type string");
		}

		this.apiKey = apiKey;

		if (secret !== undefined) {
			if (typeof secret !== "string") {
				throw new TypeError("secret must be of type string");
			}

			this.secret = secret;
		}

		if (sessionKey !== undefined) {
			if (typeof sessionKey !== "string") {
				throw new TypeError("sessionKey must be of type string");
			}

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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "album.addTags",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "album.getInfo"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "album.getTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "album.getTopTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "album.removeTag",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "album.search"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.addTags",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
	}

	/**
	 * Get correction of an artist
	 * @param {Object} params
	 * @param {string} params.artist - Artist to get correction of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	artistGetCorrection(params, callback) {
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.getCorrection"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.getInfo"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.getSimilar"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.getTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.getTopAlbums"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.getTopTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.getTopTracks"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.removeTag",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "artist.search"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "auth.getMobileSession"
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
	}

	/**
	 * Get a session key for an account
	 * @param {Object} params
	 * @param {string} params.token - Token to authenticate request
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	authGetSession(params, callback) {
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "auth.getSession"
			})
			.sign(this.secret)
			.send(callback);

		return apiRequest || this;
	}

	/**
	 * Get a token
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	authGetToken(callback) {
		const apiRequest = new ApiRequest()
			.set({
				api_key: this.apiKey,
				method: "auth.getToken"
			})
			.sign(this.secret)
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "chart.getTopArtists"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "chart.getTopTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "chart.getTopTracks"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "geo.getTopArtists"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "geo.getTopTracks"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "library.getArtists"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "tag.getInfo"
			})
			.send(callback);

		return apiRequest || this;
	}

	/**
	 * Get similar to a tag
	 * @param {Object} params
	 * @param {string} params.tag - Tag to get similar to
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetSimilar(params, callback) {
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "tag.getSimilar"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "tag.getTopAlbums"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "tag.getTopArtists"
			})
			.send(callback);

		return apiRequest || this;
	}

	/**
	 * Get top tags
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetTopTags(callback) {
		const apiRequest = new ApiRequest()
			.set({
				api_key: this.apiKey,
				method: "tag.getTopTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "tag.getTopTracks"
			})
			.send(callback);

		return apiRequest || this;
	}

	/**
	 * Get weekly charts of a tag
	 * @param {Object} params
	 * @param {string} params.tag - Tag to get weekly charts of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	tagGetWeeklyChartList(params, callback) {
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "tag.getWeeklyChartList"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.addTags",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.getCorrection"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.getInfo"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.getSimilar"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.getTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.getTopTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.love",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.removeTag",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.scrobble",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
	}

	/**
	 * Scrobble many tracks
	 * @param {Object[]} paramsArr
	 * @param {string} paramsArr[].artist - Artist whose track to scrobble
	 * @param {string} paramsArr[].track - Track to scobble
	 * @param {string} [paramsArr[].album] - Album the track to scrobble is from
	 * @param {string} [paramsArr[].albumArist] - Artist whose album the track to scrobble is from
	 * @param {number} paramsArr[].timestamp - Timestamp to scrobble track at
	 * @param {number} [paramsArr[].trackNumber] - Number of track to scrobble on the album
	 * @param {number} [paramsArr[].duration] - Length of the track to scrobble in seconds
	 * @param {(0|1)} [paramsArr[].chosenByUser] - Whether the user chose the track to scrobble
	 * @param {string} [paramsArr.streamId] - Stream ID if track to scrobble is from Last.Fm radio
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	trackScrobbleMany(paramsArr, callback) {
		const params = {};

		paramsArr.forEach((paramsObj, i) => Object
			.entries(paramsObj)
			.forEach(([name, value]) => params[`${name}[${i}]`] = value));

		return this.trackScrobble(params, callback);
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.search"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.unlove",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "track.updateNowPlaying",
				sk: this.sessionKey
			})
			.sign(this.secret)
			.send("POST", callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getFriends"
			})
			.send(callback);

		return apiRequest || this;
	}

	/**
	 * Get info of a user
	 * @param {Object} [params]
	 * @param {string} [params.user] - User to get info of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetInfo(params, callback) {
		callback = callback === undefined ? typeof params === "function" ? params : undefined : callback;
		params = typeof params === "object" ? params : {};

		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getInfo"
			});

		if (!params.user) {
			apiRequest
				.set({ sk: this.sessionKey })
				.sign(this.secret);
		}

		return apiRequest.send(params.user ? "GET" : "POST", callback) || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getLovedTracks"
			})
			.send(callback);

		return apiRequest || this;
	}

	/**
	 * Get items of a tag added by a user
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getPersonalTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getRecentTracks"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getTopAlbums"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getTopArtists"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getTopTags"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getTopTracks"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getWeeklyAlbumChart"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getWeeklyArtistChart"
			})
			.send(callback);

		return apiRequest || this;
	}

	/**
	 * Get weekly charts of a user
	 * @param {Object} params
	 * @param {string} params.user - User to get weekly charts of
	 * @param {callback} [callback]
	 * @returns {(Promise|LastFm)}
	 */

	userGetWeeklyChartList(params, callback) {
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getWeeklyChartList"
			})
			.send(callback);

		return apiRequest || this;
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
		const apiRequest = new ApiRequest()
			.set(params)
			.set({
				api_key: this.apiKey,
				method: "user.getWeeklyTrackChart"
			})
			.send(callback);

		return apiRequest || this;
	}
}

module.exports = LastFm;
