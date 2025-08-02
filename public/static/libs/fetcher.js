
export default async function fetcher_api(API, METHOD = "GET", BODY = null) {
    try {
        console.log(BODY)
        let bodyToSend = BODY;
        if (!(BODY instanceof FormData)) {
            bodyToSend = JSON.stringify(BODY);
        }
        const response = await fetch(API, {
            method: METHOD,
            body: bodyToSend
        })

        if (!response.ok) {
            const res_status_error = await response.json();
            console.log(res_status_error);
            return res_status_error
        } else {
            const res_status_data = await response.json();
            console.log(res_status_data);
            return res_status_data;
        }
    } catch (error) {
        console.log(error)
        return error
    }
}



