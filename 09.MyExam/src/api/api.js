import { getUserData } from "../util.js";

const host = 'http://localhost:3030'
//requests
async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }
    try {
        const response = await fetch(host + url, options);

        if (response.status == 204) {
            //no data
            return response;
        }

        const result = await response.json();//could be data or error message from server that response is not ok

        if (response.ok == false) {
            //the result is an error
            throw new Error(result.message);
        }

        return result;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}
//"wrapping" the function with the desired method
export const get = request.bind(null, 'get');
//alternative:
// export function get(url){
//     return request('get',url);
// }
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');