const muhasip = require("muhasip")

class bank extends muhasip {
        async pos(linkId, deleted = false) {
        return await request(this.apiKey, {
            method: deleted ? 'delete' : 'get',
            path: "pos/" + linkId,
        })
    }
}

module.exports = bank
