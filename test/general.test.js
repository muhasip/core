const {test, expect} = require("@jest/globals");
const muhasip = require("../muhasip")
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY1NDM5MThlMjQwOGVhMDg0M2FlZiIsImlhdCI6MTcwNTEwMzM5OSwiZXhwIjoxNzIwNjU1Mzk5LCJpc3MiOiJtdWR1In0.i9_bSSB4kZMvH_znMF8w0AHrAqxMu6sjHYbf_JDIcOk"

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
    const result = await muhasipCore.contact("6585fd5e28d12c8b7af81044")
    console.log(result)
    expect(result.status).toBe(true)
});

test('posLink', async () => {
    const result = await muhasipCore.posLink({
        amount: 100,
        returnUrl: "https://payment.isscrm.dev/",
        orderId: "9991119",
        description: "CORE TEST"
    })
    console.log(result)
    expect(result.status).toBe(true)
});

test('posStatus', async () => {
    const result = await muhasipCore.pos("65e6f1616fd470379cc5ff93", false)
    console.log(result)
    expect(result.status).toBe(true)
});

test('posDelete', async () => {
    const result = await muhasipCore.pos("65e6f1616fd470379cc5ff93", true)
    console.log(result)
    expect(result.status).toBe(true)
});


