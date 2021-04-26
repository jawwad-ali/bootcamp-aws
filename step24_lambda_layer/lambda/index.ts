const axios = require("axios")

// auth is my custom code
const auth = require("/opt/auth")

exports.handler = async () => {
    const result = await axios.get("https://jsonplaceholder.typicode.com/todos/1")

    console.log("authfunc",await auth.authorize())

    return {
        data: result.data,
        authInfo: await auth.authorize()
    }
}