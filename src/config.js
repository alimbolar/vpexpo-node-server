// Server configuration file

module.exports.CONFIG = {
    ZOHO_CACHE_DURATION_HOURS: 14 * 24, // nodejs cache duration in number of hours for zoho request. Cache can be expired before the limit by calling /clearCache
    ZOHO_PAGINATION_LIMIT: 200, // Zoho can only send 200 results : we will download 200 by 200. If zoho enables more than 200, we can change this limit
};