const fetch = () => new Promise((resolve, reject) => {
    resolve({
        json: () => {
            throw new Error('Json Error');
        },
        text: () => {
            return 'I am good'
        }
    })
});
const request = async (url, headers, body) => {
    try{
        const response  = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        });
        try{
            const jsonResponse = await response.json();
            return {
                status: true,
                type: 'json',
                data: jsonResponse
            }
        }
        catch(jsonParseErr){
            console.log('Error in parsing Json ', jsonParseErr);
            const textResponse = await response.text();
            return {
                status: true,
                type: 'text',
                data: textResponse
            }
        }
        
    }
    catch(err){
        console.log('Error', err);
        return {
            status: false,
            type: 'error',
            data: err
        }
    }        
}
request()
.then(res => {
    console.log('ResAtLast', res);
})