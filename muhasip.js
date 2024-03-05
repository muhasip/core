const axios = require("axios")

async function request(apikey, {path, method = 'get', data, params}) {
    return axios({
        url: "https://api.muhasip.dev/" + path,
        method,
        data,
        params,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            apikey
        }
    }).then((response) => {

        return response.data
    }).catch(({response}) => {
        return response.data
    })
}

/**
 * Create an instance of Muhasip
 *
 * @param {String} apiKey muhasip.pro arayüzü üzerinden edinmeniz gerekmektedir.
 * Projejerin ihtiyaçlarına göre geliştirilmektedir.
 *
 */


class muhasip {
    constructor(apiKey) {
        this.apiKey = apiKey
    }


    async info() {
        return await request(this.apiKey, {path: "info"})
    }

    /**
     *
     * @param {Number} pageSize
     * @param {Number} page
     * @param {Boolean} archived
     * @param {String} query
     *
     */
    async contacts({pageSize = 25, page = 1, archived = false, query = ''}) {
        return await request(this.apiKey, {path: "contacts", params: {pageSize, page, archived, query}})
    }

    /**
     *
     * @param {String} contactId
     *
     */
    async contact(contactId) {
        return await request(this.apiKey, {path: "contacts/" + contactId})
    }

    /**
     *
     * @param {Number} amount
     * @param {URL} returnUrl
     * @param {String} orderId
     * @param {String} description
     * @param {Boolean} commission
     *
     */
    async posLink({amount, returnUrl, orderId, description, commission = false}) {
        return await request(this.apiKey, {
            path: "pos",
            method: "post",
            data: {
                amount,
                returnUrl,
                orderId,
                description,
                commission
            }
        })
    }

    /**
     *
     * @param {String} linkId
     * @param {Boolean} deleted
     *
     */
    async pos(linkId, deleted = false) {
        return await request(this.apiKey, {
            method: deleted ? 'delete' : 'get',
            path: "pos/" + linkId,
        })
    }


}

module.exports = muhasip
