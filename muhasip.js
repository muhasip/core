const axios = require("axios")


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

    async #request({path, method = 'get', data, params}) {
        return axios({
            url: "https://api.muhasip.dev/" + path,
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
        return await this.#request({path: "info"})
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
        return await this.#request({path: "contacts", params: {pageSize, page, archived, query}})
    }

    /**
     *
     * @param {String} contactId
     *
     */
    async contact(contactId) {
        return await this.#request({path: "contacts/" + contactId})
    }


    /**
     *
     * @param {Number} amount
     * @param {String} returnUrl
     * @param {String} orderId
     * @param {String} description
     * @param {Boolean} commission
     * @param variables
     */
    async posLink({amount, returnUrl, orderId, description, commission = false, variables}) {
        return await this.#request({
            path: "pos",
            method: "post",
            data: {
                amount,
                returnUrl,
                orderId,
                description,
                commission,
                variables
            }
        })
    }

    /**
     *
     * @param {String} linkId
     * @requires linkId
     * @param {Boolean} deleted
     *
     */
    async pos(linkId, deleted = false) {
        return await this.#request({
            method: deleted ? 'delete' : 'get',
            path: "pos/" + linkId,
        })
    }

    /**
     *
     * @param {String} linkId
     * @requires linkId
     * @param {String} contactsId
     * @param {Object} variables
     * @requires  variables
     *
     */
    async posVariables(linkId, {contactsId, variables}) {
        return await this.#request({
            method: "put",
            path: "pos/" + linkId,
            data: {
                contactsId,
                variables
            }
        })
    }

    /**
     *
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {Boolean} incoming
     * @param {Number} status {0|1|2}
     * @param {Number} pageSize
     * @param {Number} page
     * @returns {Promise<Promise<*> |{status:false}|{status:true}| *>}
     */
    async bankTransactions({
                               startDate, endDate, incoming = false, status = 0, pageSize = 25, page = 1
                           }) {
        return await this.#request({
            path: "bank/transactions",
            params: {
                startDate,
                endDate,
                incoming,
                status,
                pageSize,
                page
            }
        })
    }

}

module.exports = muhasip
