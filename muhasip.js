const axios = require("axios")

/**
 * Create an instance of Muhasip
 *
 * @param {String} apiKey muhasip.pro arayüzü üzerinden edinmeniz gerekmektedir.
 *
 */
class muhasip {
    constructor(apiKey) {
        this.apiKey = apiKey
        this.baseUrl = "https://api.muhasip.dev/"
    }
    private async request({path, method = 'get', data, params}) {
        if (!this.apiKey) return {status: false}
        return axios({
            url: this.baseUrl + path,
            method,
            data,
            params,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                apikey: this.apiKey
            }
        }).then((response) => {
            return response.data
        }).catch(({response}) => {
            return response.data
        })
    }

    async info() {
        return await this.request({path: "info"})
    }

    async contacts({pageSize = 25, page = 1, archived = false, query = ''}) {
        return await this.request({path: "contacts", params: {pageSize, page, archived, query}})
    }

    async contact(contactId) {
        return await this.request({path: "contacts/" + contactId})
    }

    async pos() {

    }
}

module.exports = muhasip
