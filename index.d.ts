declare namespace LastFm {
  export type Callback = (err?: Error, data?: any) => void;

  export type NumericBoolean = 0 | 1;

  export type Period = "7day" | "1month" | "3month" | "6month" | "12month" | "overall";

  export type MbId = {
    /**
     * MusicBrainz ID of entity to get info of.
     */
    mbid: string;
  }

  export type WithMbId<ParamsType, ExcludedProps extends keyof ParamsType> = Omit<ParamsType, ExcludedProps> & MbId;

  export type AlbumAddTagsParams = {
    /**
     * Artist whose album to add tags to
     */
    artist: string;
    /**
     * Album to add tags to
     */
    album: string;
    /**
     * Tags to add to album
     */
    tags: string | string[];
  };

  export type AlbumGetInfoParams = {
    /**
     * Artist whose album to get info of.
     */
    artist: string;
    /**
     * Album to get info of.
     */
    album: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
    /**
     * Language to return the biography in. Writen as an ISO 639 alpha-2 code.
     */
    lang?: string;
    /**
     * User whose play count to include
     */
    username?: string;
  };

  export type AlbumGetTagsParams = {
    /**
     * Artist whose album to get tags of.
     */
    artist: string;
    /**
     * Album to get tags of.
     */
    album: string;
    /**
     * User whose tags added to the album to get
     */
    user: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
  };

  export type AlbumGetTopTagsParams = {
    /**
     * Artist whose album to get top tags of.
     */
    artist: string;
    /**
     * Album to get top tags of.
     */
    album: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
  };

  export type AlbumRemoveTagParams = {
    /**
     * Artist whose album to remove tag from
     */
    artist: string;
    /**
     * Album to remove tag from
     */
    album: string;
    /**
     * Tag to remove from album
     */
    tag: string;
  };

  export type AlbumSearchParams = {
    /**
     * Album to search for
     */
    album: string;
    /**
     * Number of albums to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type ArtistAddTagsParams = {
    /**
     * Artist to add tags to
     */
    artist: string;
    /**
     * Tags to add to artist
     */
    tags: string | string[];
  };

  export type ArtistGetCorrectionParams = {
    /**
     * Artist to get correction of
     */
    artist: string;
  };

  export type ArtistGetInfoParams = {
    /**
     * Artist to get info of.
     */
    artist: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
    /**
     * Language to return the biography in. Writen as an ISO 639 alpha-2 code.
     */
    lang?: string;
    /**
     * User whose play count to include
     */
    username?: string;
  };

  export type ArtistGetSimilarParams = {
    /**
     * Artist to get similar to.
     */
    artist: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
    /**
     * Number of artists to get
     */
    limit?: number;
  };

  export type ArtistGetTagsParams = {
    /**
     * Artist to get tags of.
     */
    artist: string;
    /**
     * User whose tags added to the artist to get
     */
    user: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
  };

  export type ArtistGetTopAlbumsParams = {
    /**
     * Artist to get top albums of.
     */
    artist: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
    /**
     * Number of albums to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type ArtistGetTopTagsParams = {
    /**
     * Artist to get top tags of.
     */
    artist: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
  };

  export type ArtistGetTopTracksParams = {
    /**
     * Artist to get top tracks of.
     */
    artist: string;
    /**
     * Whether to correct misspelt artist name
     */
    autocorrect?: NumericBoolean
    /**
     * Number of tracks to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type ArtistRemoveTagParams = {
    /**
     * Artist to remove tag from
     */
    artist: string;
    /**
     * Tag to remove from artist
     */
    tag: string;
  };

  export type ArtistSearchParams = {
    /**
     * Artist to search for
     */
    artist: string;
    /**
     * Number of artists to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type AuthGetMobileSessionParams = {
    /**
     * Username or email of the account to get a session key for
     */
    username: string;
    /**
     * Password of the account to get a session key for
     */
    password: string;
  };

  export type AuthGetSessionParams = {
    /**
     * Token to authenticate request
     */
    token: string;
  };

  export type ChartGetTopArtistsParams = {
    /**
     * Number of artists to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type ChartGetTopTagsParams = {
    /**
     * Number of tags to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type ChartGetTopTracksParams = {
    /**
     * Number of tracks to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type GeoGetTopArtistsParams = {
    /**
     * Country to get top artists of. Written as an ISO 3166 country name.
     */
    country: string;
    /**
     * Number of artists to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type GeoGetTopTracksParams = {
    /**
     * Country to get top tracks of. Written as an ISO 3166 country name.
     */
    country: string;
    /**
     * Location within a country to get top tracks of
     */
    location?: string;
    /**
     * Number of tracks to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type LibraryGetArtistsParams = {
    /**
     * User whose library to get artists of
     */
    user: string;
    /**
     * Number of artists to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type TagGetInfoParams = {
    /**
     * Tag to get info of
     */
    tag: string;
    /**
     * Language to return the wiki in. Writen as an ISO 639 alpha-2 code.
     */
    lang?: string;
  };

  export type TagGetSimilarParams = {
    /**
     * Tag to get similar to
     */
    tag: string;
  };

  export type TagGetTopAlbumsParams = {
    /**
     * Tag to get top albums of
     */
    tag: string;
    /**
     * Number of albums to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type TagGetTopArtistsParams = {
    /**
     * Tag to get top artists of
     */
    tag: string;
    /**
     * Number of artists to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type TagGetTopTracksParams = {
    /**
     * Tag to get top tracks of
     */
    tag: string;
    /**
     * Number of tracks to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type TagGetWeeklyChartListParams = {
    /**
     * Tag to get weekly charts of
     */
    tag: string;
  };

  export type TrackAddTagsParams = {
    /**
     * Artist whose track to add tags to
     */
    artist: string;
    /**
     * Track to add tags to
     */
    track: string;
    /**
     * Tags to add to track
     */
    tags: string | string[];
  };

  export type TrackGetCorrectionParams = {
    /**
     * Artist and whose track to get correction of
     */
    artist: string;
    /**
     * Track to get correction of
     */
    track: string;
  };

  export type TrackGetInfoParams = {
    /**
     * Artist whose track to get info of.
     */
    artist: string;
    /**
     * Track to get info of.
     */
    track: string;
    /**
     * Whether to correct misspelt artist and track names
     */
    autocorrect?: NumericBoolean
    /**
     * User whose playcount and whether or not they have loved the track to include
     */
    username?: string;
  };

  export type TrackGetSimilarParams = {
    /**
     * Artist whose track to get similar to.
     */
    artist: string;
    /**
     * Track to get similar to.
     */
    track: string;
    /**
     * Whether to correct misspelt artist and track names
     */
    autocorrect?: NumericBoolean
    /**
     * Number of tracks to get
     */
    limit?: number;
  };

  export type TrackGetTagsParams = {
    /**
     * Artist whose track to get tags of.
     */
    artist: string;
    /**
     * Track to get tags of.
     */
    track: string;
    /**
     * User whose tags added to the track to get
     */
    user: string;
    /**
     * Whether to correct misspelt artist and track names
     */
    autocorrect?: NumericBoolean
  };

  export type TrackGetTopTagsParams = {
    /**
     * Artist whose track to get top tags of.
     */
    artist: string;
    /**
     * Track to get top tags of.
     */
    track: string;
    /**
     * Whether to correct misspelt artist and track names
     */
    autocorrect?: NumericBoolean
  };

  export type TrackLoveParams = {
    /**
     * Artist whose track to love
     */
    artist: string;
    /**
     * Track to love
     */
    track: string;
  };

  export type TrackRemoveTagParams = {
    /**
     * Artist whose track to remove tag from
     */
    artist: string;
    /**
     * Track to remove tag from
     */
    track: string;
    /**
     * Tag to remove from track
     */
    tag: string;
  };

  export type TrackScrobbleParams = {
    /**
     * Artist whose track to scrobble
     */
    artist: string;
    /**
     * Track to scobble
     */
    track: string;
    /**
     * Album the track to scrobble is from
     */
    album?: string;
    /**
     * Artist whose album the track to scrobble is from
     */
    albumArist?: string;
    /**
     * Timestamp to scrobble track at
     */
    timestamp: number;
    /**
     * Number of track to scrobble on the album
     */
    trackNumber?: number;
    /**
     * Length of the track to scrobble in seconds
     */
    duration?: number;
    /**
     * Whether the user chose the track to scrobble
     */
    chosenByUser?: NumericBoolean
    /**
     * Stream ID if track to scrobble is from Last.Fm radio
     */
    streamId?: string;
  };

  export type TrackSearchParams = {
    /**
     * Artist whose track to search for
     */
    artist?: string;
    /**
     * Track to search for
     */
    track: string;
    /**
     * Number of tracks to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type TrackUnloveParams = {
    /**
     * Artist whose track to unlove
     */
    artist: string;
    /**
     * Track to unlove
     */
    track: string;
  };

  export type TrackUpdateNowPlayingParams = {
    /**
     * Artist whose track to update now playing with
     */
    artist: string;
    /**
     * Track to update now playing with
     */
    track: string;
    /**
     * Album the track to update now playing with is from
     */
    album?: string;
    /**
     * Artist whose album the track to update now playing with is from
     */
    albumArist?: string;
    /**
     * Number of track to update now playing with on the album
     */
    trackNumber?: number;
    /**
     * Length of the track to update now playing with in seconds
     */
    duration?: number;
  };

  export type UserGetFriendsParams = {
    /**
     * User to get friends of
     */
    user: string;
    /**
     * Whether to include recent tracks of friends
     */
    recenttracks?: NumericBoolean
    /**
     * Number of friends to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type UserGetInfoParams = {
    /**
     * User to get info of
     */
    user?: string;
  };

  export type UserGetLovedTracksParams = {
    /**
     * User to get loved tracks of
     */
    user: string;
    /**
     * Number of tracks to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type UserGetPersonalTagsParams = {
    /**
     * User whose added tag to get items of
     */
    user: string;
    /**
     * Tag to get items of
     */
    tag: string;
    /**
     * TypE of tag to get items of
     */
    taggingtype: "track" | "artist" | "album";
    /**
     * Number of items to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type UserGetRecentTracksParams = {
    /**
     * User whose recent tracks to get
     */
    user: string;
    /**
     * Whether to include extended data of the artist and whether the user has loved the track or not
     */
    extended?: NumericBoolean
    /**
     * Timestamp to get tracks from
     */
    from?: string;
    /**
     * Timestamp to get tracks to
     */
    to?: string;
    /**
     * Number of tracks to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type UserGetTopAlbumsParams = {
    /**
     * User to get top albums of
     */
    user: string;
    /**
     * Time period to get top albums of
     */
    period?: Period;
    /**
     * Number of albums to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type UserGetTopArtistsParams = {
    /**
     * User to get top artists of
     */
    user: string;
    /**
     * Time period to get top artists of
     */
    period?: Period;
    /**
     * Number of artists to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type UserGetTopTagsParams = {
    /**
     * User to get top tags of
     */
    user: string;
    /**
     * Number of tags to get
     */
    limit?: number;
  };

  export type UserGetTopTracksParams = {
    /**
     * User to get top tracks of
     */
    user: string;
    /**
     * Time period to get top tracks of
     */
    period?: Period;
    /**
     * Number of tracks to get per page
     */
    limit?: number;
    /**
     * Page number to get
     */
    page?: number;
  };

  export type UserGetWeeklyAlbumChartParams = {
    /**
     * User to get weekly album chart of
     */
    user: string;
    /**
     * Timestamp to get weekly album chart from
     */
    from?: string;
    /**
     * Timestamp to get weekly album chart to
     */
    to?: string;
  };

  export type UserGetWeeklyArtistChartParams = {
    /**
     * User to get weekly artist chart of
     */
    user: string;
    /**
     * Timestamp to get weekly artist chart from
     */
    from?: string;
    /**
     * Timestamp to get weekly artist chart to
     */
    to?: string;
  };

  export type UserGetWeeklyChartListParams = {
    /**
     * User to get weekly charts of
     */
    user: string;
  };

  export type UserGetWeeklyTrackChartParams = {
    /**
     * User to get weekly track chart of
     */
    user: string;
    /**
     * Timestamp to get weekly track chart from
     */
    from?: string;
    /**
     * Timestamp to get weekly track chart to
     */
    to?: string;
  };
}

/**
   * LastFm API Client
   */
declare class LastFm {
  /**
   * Create a LastFm instance
   */
  constructor(apiKey: string, secret?: string, sessionKey?: string);
  
  apiKey: string;
  secret: string;
  sessionKey: string;

  /**
   * Add tags to an album
   */
  albumAddTags(params: LastFm.AlbumAddTagsParams, callback: LastFm.Callback): this;
  albumAddTags(params: LastFm.AlbumAddTagsParams): Promise<any>;

  /**
   * Get info of an album
   */
  albumGetInfo(params: LastFm.AlbumGetInfoParams, callback: LastFm.Callback): this;
  albumGetInfo(params: LastFm.WithMbId<LastFm.AlbumGetInfoParams, 'artist' | 'album'>, callback: LastFm.Callback): this;
  albumGetInfo(params: LastFm.AlbumGetInfoParams): Promise<any>;
  albumGetInfo(params: LastFm.WithMbId<LastFm.AlbumGetInfoParams, 'artist' | 'album'>): Promise<any>;

  /**
   * Get tags of an album added by a user
   */
  albumGetTags(params: LastFm.AlbumGetTagsParams, callback: LastFm.Callback): this;
  albumGetTags(params: LastFm.WithMbId<LastFm.AlbumGetTagsParams, 'artist' | 'album'>, callback: LastFm.Callback): this;
  albumGetTags(params: LastFm.AlbumGetTagsParams): Promise<any>;
  albumGetTags(params: LastFm.WithMbId<LastFm.AlbumGetTagsParams, 'artist' | 'album'>): Promise<any>;

  /**
   * Get top tags of an album
   */
  albumGetTopTags(params: LastFm.AlbumGetTopTagsParams, callback: LastFm.Callback): this;
  albumGetTopTags(params: LastFm.WithMbId<LastFm.AlbumGetTopTagsParams, 'artist' | 'album'>, callback: LastFm.Callback): this;
  albumGetTopTags(params: LastFm.AlbumGetTopTagsParams): Promise<any>;
  albumGetTopTags(params: LastFm.WithMbId<LastFm.AlbumGetTopTagsParams, 'artist' | 'album'>): Promise<any>;

  /**
   * Remove tag from an album
   */
  albumRemoveTag(params: LastFm.AlbumRemoveTagParams, callback: LastFm.Callback): this;
  albumRemoveTag(params: LastFm.AlbumRemoveTagParams): Promise<any>;

  /**
   * Search for an album
   */
  albumSearch(params: LastFm.AlbumSearchParams, callback: LastFm.Callback): this;
  albumSearch(params: LastFm.AlbumSearchParams): Promise<any>;

  /**
   * Add tags to an artist
   */
  artistAddTags(params: LastFm.ArtistAddTagsParams, callback: LastFm.Callback): this;
  artistAddTags(params: LastFm.ArtistAddTagsParams): Promise<any>;

  /**
   * Get correction of an artist
   */
  artistGetCorrection(params: LastFm.ArtistGetCorrectionParams, callback: LastFm.Callback): this;
  artistGetCorrection(params: LastFm.ArtistGetCorrectionParams): Promise<any>;

  /**
   * Get info of an artist
   */
  artistGetInfo(params: LastFm.ArtistGetInfoParams, callback: LastFm.Callback): this;
  artistGetInfo(params: LastFm.WithMbId<LastFm.ArtistGetInfoParams, 'artist'>, callback: LastFm.Callback): this;
  artistGetInfo(params: LastFm.ArtistGetInfoParams): Promise<any>;
  artistGetInfo(params: LastFm.WithMbId<LastFm.ArtistGetInfoParams, 'artist'>): Promise<any>;

  /**
   * Get similar to an artist
   */
  artistGetSimilar(params: LastFm.ArtistGetSimilarParams, callback: LastFm.Callback): this;
  artistGetSimilar(params: LastFm.WithMbId<LastFm.ArtistGetSimilarParams, 'artist'>, callback: LastFm.Callback): this;
  artistGetSimilar(params: LastFm.ArtistGetSimilarParams): Promise<any>;
  artistGetSimilar(params: LastFm.WithMbId<LastFm.ArtistGetSimilarParams, 'artist'>): Promise<any>;

  /**
   * Get tags of an artist added by a user
   */
  artistGetTags(params: LastFm.ArtistGetTagsParams, callback: LastFm.Callback): this;
  artistGetTags(params: LastFm.WithMbId<LastFm.ArtistGetTagsParams, 'artist'>, callback: LastFm.Callback): this;
  artistGetTags(params: LastFm.ArtistGetTagsParams): Promise<any>;
  artistGetTags(params: LastFm.WithMbId<LastFm.ArtistGetTagsParams, 'artist'>): Promise<any>;

  /**
   * Get top albums of an artist
   */
  artistGetTopAlbums(params: LastFm.ArtistGetTopAlbumsParams, callback: LastFm.Callback): this;
  artistGetTopAlbums(params: LastFm.WithMbId<LastFm.ArtistGetTopAlbumsParams, 'artist'>, callback: LastFm.Callback): this;
  artistGetTopAlbums(params: LastFm.ArtistGetTopAlbumsParams): Promise<any>;
  artistGetTopAlbums(params: LastFm.WithMbId<LastFm.ArtistGetTopAlbumsParams, 'artist'>): Promise<any>;

  /**
   * Get top tags of an artist
   */
  artistGetTopTags(params: LastFm.ArtistGetTopTagsParams, callback: LastFm.Callback): this;
  artistGetTopTags(params: LastFm.WithMbId<LastFm.ArtistGetTopTagsParams, 'artist'>, callback: LastFm.Callback): this;
  artistGetTopTags(params: LastFm.ArtistGetTopTagsParams): Promise<any>;
  artistGetTopTags(params: LastFm.WithMbId<LastFm.ArtistGetTopTagsParams, 'artist'>): Promise<any>;

  /**
   * Get top tracks of an artist
   */
  artistGetTopTracks(params: LastFm.ArtistGetTopTracksParams, callback: LastFm.Callback): this;
  artistGetTopTracks(params: LastFm.WithMbId<LastFm.ArtistGetTopTracksParams, 'artist'>, callback: LastFm.Callback): this;
  artistGetTopTracks(params: LastFm.ArtistGetTopTracksParams): Promise<any>;
  artistGetTopTracks(params: LastFm.WithMbId<LastFm.ArtistGetTopTracksParams, 'artist'>): Promise<any>;

  /**
   * Remove tag from an artist
   */
  artistRemoveTag(params: LastFm.ArtistRemoveTagParams, callback: LastFm.Callback): this;
  artistRemoveTag(params: LastFm.ArtistRemoveTagParams): Promise<any>;

  /**
   * Search for an artist
   */
  artistSearch(params: LastFm.ArtistSearchParams, callback: LastFm.Callback): this;
  artistSearch(params: LastFm.ArtistSearchParams): Promise<any>;

  /**
   * Get a session key for an account
   */
  authGetMobileSession(params: LastFm.AuthGetMobileSessionParams, callback: LastFm.Callback): this;
  authGetMobileSession(params: LastFm.AuthGetMobileSessionParams): Promise<any>;

  /**
   * Get a session key for an account
   */
  authGetSession(params: LastFm.AuthGetSessionParams, callback: LastFm.Callback): this;
  authGetSession(params: LastFm.AuthGetSessionParams): Promise<any>;

  /**
   * Get a token
   */
  authGetToken(callback: LastFm.Callback): this;

  /**
   * Get the top artists chart
   */
  chartGetTopArtists(params: LastFm.ChartGetTopArtistsParams, callback: LastFm.Callback): this;
  chartGetTopArtists(params: LastFm.ChartGetTopArtistsParams): Promise<any>;

  /**
   * Get the top tags chart
   */
  chartGetTopTags(params: LastFm.ChartGetTopTagsParams, callback: LastFm.Callback): this;
  chartGetTopTags(params: LastFm.ChartGetTopTagsParams): Promise<any>;

  /**
   * Get the top tracks chart
   */
  chartGetTopTracks(params: LastFm.ChartGetTopTracksParams, callback: LastFm.Callback): this;
  chartGetTopTracks(params: LastFm.ChartGetTopTracksParams): Promise<any>;

  /**
   * Get top artists of a country
   */
  geoGetTopArtists(params: LastFm.GeoGetTopArtistsParams, callback: LastFm.Callback): this;
  geoGetTopArtists(params: LastFm.GeoGetTopArtistsParams): Promise<any>;

  /**
   * Get top tracks of a country
   */
  geoGetTopTracks(params: LastFm.GeoGetTopTracksParams, callback: LastFm.Callback): this;
  geoGetTopTracks(params: LastFm.GeoGetTopTracksParams): Promise<any>;

  /**
   * Get artists in library of a user
   */
  libraryGetArtists(params: LastFm.LibraryGetArtistsParams, callback: LastFm.Callback): this;
  libraryGetArtists(params: LastFm.LibraryGetArtistsParams): Promise<any>;

  /**
   * Get info of a tag
   */
  tagGetInfo(params: LastFm.TagGetInfoParams, callback: LastFm.Callback): this;
  tagGetInfo(params: LastFm.TagGetInfoParams): Promise<any>;

  /**
   * Get similar to a tag
   */
  tagGetSimilar(params: LastFm.TagGetSimilarParams, callback: LastFm.Callback): this;
  tagGetSimilar(params: LastFm.TagGetSimilarParams): Promise<any>;

  /**
   * Get top albums of a tag
   */
  tagGetTopAlbums(params: LastFm.TagGetTopAlbumsParams, callback: LastFm.Callback): this;
  tagGetTopAlbums(params: LastFm.TagGetTopAlbumsParams): Promise<any>;

  /**
   * Get top artists of a tag
   */
  tagGetTopArtists(params: LastFm.TagGetTopArtistsParams, callback: LastFm.Callback): this;
  tagGetTopArtists(params: LastFm.TagGetTopArtistsParams): Promise<any>;

  /**
   * Get top tags
   */
  tagGetTopTags(callback: LastFm.Callback): this;

  /**
   * Get top tracks of a tag
   */
  tagGetTopTracks(params: LastFm.TagGetTopTracksParams, callback: LastFm.Callback): this;
  tagGetTopTracks(params: LastFm.TagGetTopTracksParams): Promise<any>;

  /**
   * Get weekly charts of a tag
   */
  tagGetWeeklyChartList(params: LastFm.TagGetWeeklyChartListParams, callback: LastFm.Callback): this;
  tagGetWeeklyChartList(params: LastFm.TagGetWeeklyChartListParams): Promise<any>;

  /**
   * Add tags to a track
   */
  trackAddTags(params: LastFm.TrackAddTagsParams, callback: LastFm.Callback): this;
  trackAddTags(params: LastFm.TrackAddTagsParams): Promise<any>;

  /**
   * Get correction of a track and artist
   */
  trackGetCorrection(params: LastFm.TrackGetCorrectionParams, callback: LastFm.Callback): this;
  trackGetCorrection(params: LastFm.TrackGetCorrectionParams): Promise<any>;

  /**
   * Get info of a track
   */
  trackGetInfo(params: LastFm.TrackGetInfoParams, callback: LastFm.Callback): this;
  trackGetInfo(params: LastFm.WithMbId<LastFm.TrackGetInfoParams, 'artist' | 'track'>, callback: LastFm.Callback): this;
  trackGetInfo(params: LastFm.TrackGetInfoParams): Promise<any>;
  trackGetInfo(params: LastFm.WithMbId<LastFm.TrackGetInfoParams, 'artist' | 'track'>): Promise<any>;

  /**
   * Get similar to a track
   */
  trackGetSimilar(params: LastFm.TrackGetSimilarParams, callback: LastFm.Callback): this;
  trackGetSimilar(params: LastFm.WithMbId<LastFm.TrackGetSimilarParams, 'artist' | 'track'>, callback: LastFm.Callback): this;
  trackGetSimilar(params: LastFm.TrackGetSimilarParams): Promise<any>;
  trackGetSimilar(params: LastFm.WithMbId<LastFm.TrackGetSimilarParams, 'artist' | 'track'>): Promise<any>;

  /**
   * Get tags of a track added by a user
   */
  trackGetTags(params: LastFm.TrackGetTagsParams, callback: LastFm.Callback): this;
  trackGetTags(params: LastFm.WithMbId<LastFm.TrackGetTagsParams, 'artist' | 'track'>, callback: LastFm.Callback): this;
  trackGetTags(params: LastFm.TrackGetTagsParams): Promise<any>;
  trackGetTags(params: LastFm.WithMbId<LastFm.TrackGetTagsParams, 'artist' | 'track'>): Promise<any>;

  /**
   * Get top tags of a track
   */
  trackGetTopTags(params: LastFm.TrackGetTopTagsParams, callback: LastFm.Callback): this;
  trackGetTopTags(params: LastFm.WithMbId<LastFm.TrackGetTopTagsParams, 'artist' | 'track'>, callback: LastFm.Callback): this;
  trackGetTopTags(params: LastFm.TrackGetTopTagsParams): Promise<any>;
  trackGetTopTags(params: LastFm.WithMbId<LastFm.TrackGetTopTagsParams, 'artist' | 'track'>): Promise<any>;

  /**
   * Love a track
   */
  trackLove(params: LastFm.TrackLoveParams, callback: LastFm.Callback): this;
  trackLove(params: LastFm.TrackLoveParams): Promise<any>;

  /**
   * Remove tag from a track
   */
  trackRemoveTag(params: LastFm.TrackRemoveTagParams, callback: LastFm.Callback): this;
  trackRemoveTag(params: LastFm.TrackRemoveTagParams): Promise<any>;

  /**
   * Scrobble a track
   */
  trackScrobble(params: LastFm.TrackScrobbleParams, callback: LastFm.Callback): this;
  trackScrobble(params: LastFm.TrackScrobbleParams): Promise<any>;

  /**
   * Scrobble many tracks
   */
  trackScrobbleMany(paramsArr: LastFm.TrackScrobbleParams[], callback: LastFm.Callback): this;
  trackScrobbleMany(paramsArr: LastFm.TrackScrobbleParams[]): Promise<any>;

  /**
   * Search for a track
   */
  trackSearch(params: LastFm.TrackSearchParams, callback: LastFm.Callback): this;
  trackSearch(params: LastFm.TrackSearchParams): Promise<any>;

  /**
   * Unlove a track
   */
  trackUnlove(params: LastFm.TrackUnloveParams, callback: LastFm.Callback): this;
  trackUnlove(params: LastFm.TrackUnloveParams): Promise<any>;

  /**
   * Update now playing
   */
  trackUpdateNowPlaying(params: LastFm.TrackUpdateNowPlayingParams, callback: LastFm.Callback): this;
  trackUpdateNowPlaying(params: LastFm.TrackUpdateNowPlayingParams): Promise<any>;

  /**
   * Get friends of a user
   */
  userGetFriends(params: LastFm.UserGetFriendsParams, callback: LastFm.Callback): this;
  userGetFriends(params: LastFm.UserGetFriendsParams): Promise<any>;

  /**
   * Get info of a user
   */
  userGetInfo(params: LastFm.UserGetInfoParams, callback: LastFm.Callback): this;
  userGetInfo(params: LastFm.UserGetInfoParams): Promise<any>;

  /**
   * Get loved tracks of a user
   */
  userGetLovedTracks(params: LastFm.UserGetLovedTracksParams, callback: LastFm.Callback): this;
  userGetLovedTracks(params: LastFm.UserGetLovedTracksParams): Promise<any>;

  /**
   * Get items of a tag added by a user
   */
  userGetPersonalTags(params: LastFm.UserGetPersonalTagsParams, callback: LastFm.Callback): this;
  userGetPersonalTags(params: LastFm.UserGetPersonalTagsParams): Promise<any>;

  /**
   * Get recent tracks of a user
   */
  userGetRecentTracks(params: LastFm.UserGetRecentTracksParams, callback: LastFm.Callback): this;
  userGetRecentTracks(params: LastFm.UserGetRecentTracksParams): Promise<any>;

  /**
   * Get top albums of a user
   */
  userGetTopAlbums(params: LastFm.UserGetTopAlbumsParams, callback: LastFm.Callback): this;
  userGetTopAlbums(params: LastFm.UserGetTopAlbumsParams): Promise<any>;

  /**
   * Get top artists of a user
   */
  userGetTopArtists(params: LastFm.UserGetTopArtistsParams, callback: LastFm.Callback): this;
  userGetTopArtists(params: LastFm.UserGetTopArtistsParams): Promise<any>;

  /**
   * Get top tags of a user
   */
  userGetTopTags(params: LastFm.UserGetTopTagsParams, callback: LastFm.Callback): this;
  userGetTopTags(params: LastFm.UserGetTopTagsParams): Promise<any>;

  /**
   * Get top tracks of a user
   */
  userGetTopTracks(params: LastFm.UserGetTopTracksParams, callback: LastFm.Callback): this;
  userGetTopTracks(params: LastFm.UserGetTopTracksParams): Promise<any>;

  /**
   * Get weekly album chart of a user
   */
  userGetWeeklyAlbumChart(params: LastFm.UserGetWeeklyAlbumChartParams, callback: LastFm.Callback): this;
  userGetWeeklyAlbumChart(params: LastFm.UserGetWeeklyAlbumChartParams): Promise<any>;

  /**
   * Get weekly artist chart of a user
   */
  userGetWeeklyArtistChart(params: LastFm.UserGetWeeklyArtistChartParams, callback: LastFm.Callback): this;
  userGetWeeklyArtistChart(params: LastFm.UserGetWeeklyArtistChartParams): Promise<any>;

  /**
   * Get weekly charts of a user
   */
  userGetWeeklyChartList(params: LastFm.UserGetWeeklyChartListParams, callback: LastFm.Callback): this;
  userGetWeeklyChartList(params: LastFm.UserGetWeeklyChartListParams): Promise<any>;

  /**
   * Get weekly track chart of a user
   */
  userGetWeeklyTrackChart(params: LastFm.UserGetWeeklyTrackChartParams, callback: LastFm.Callback): this;
  userGetWeeklyTrackChart(params: LastFm.UserGetWeeklyTrackChartParams): Promise<any>;
}

export = LastFm;
