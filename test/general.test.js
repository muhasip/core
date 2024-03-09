const {test, expect} = require("@jest/globals");
const muhasip = require("../muhasip")
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY1NDM5MThlMjQwOGVhMDg0M2FlZiIsImlhdCI6MTcwNTEwMzM5OSwiZXhwIjoxNzIwNjU1Mzk5LCJpc3MiOiJtdWR1In0.i9_bSSB4kZMvH_znMF8w0AHrAqxMu6sjHYbf_JDIcOk"
const {v4: uuid} = require("uuid")
const muhasipCore = new muhasip(apikey);

test('info', async () => {
    const result = await muhasipCore.info()
    console.log(result)
    expect(result.status).toBe(true)
});

test('contacts', async () => {
    const result = await muhasipCore.contacts({page: 1, pageSize: 25})
    console.log(result)
    expect(result.status).toBe(true)
});

test('contact', async () => {
    const result = await muhasipCore.contact("6566543a18e2408ea0843af4")
    console.log(result)
    expect(result.status).toBe(true)
});

test('posLink', async () => {
    // UUID ile tamamlanacak kayıt varsa güncellenir yoksa eklenir
    const result = await muhasipCore.posLink({
        amount: 100,
        returnUrl: "https://payment.isscrm.dev/",
        orderId: uuid(),
        description: "CORE TEST",
        variables: [{
            key: "aboneNo",
            title: "Abone No",
            value: "1234"
        }, {
            key: "AdSoyad",
            title: "Ad Soyad",
            value: "Murat Duran"
        }]
    })
    console.log(result)
    expect(result.status).toBe(true)
});

test('posStatus', async () => {
    const result = await muhasipCore.pos("65ecd96efe4f2191b02357e0", false)
    console.log(result)
    expect(result.status).toBe(true)
});
test('variablesUpdate', async () => {
    const result = await muhasipCore.posVariables("65ecd96efe4f2191b02357e0", {
        variables: [{
            key: "editaboneNo",
            title: "Abone No",
            value: "1234"
        }, {
            key: "editAdSoyad",
            title: "Ad Soyad",
            value: "Murat Duran"
        }]
    })
    console.log(result)
    expect(result.status).toBe(true)
});

test('posDelete', async () => {
    const result = await muhasipCore.pos("65eccf19ac64755e096c1a29", true)
    console.log(result)
    expect(result.status).toBe(true)
});

test('getTransaction', async () => {
    const result = await muhasipCore.bankTransactions()
    expect(result.status).toBe(true)
});



