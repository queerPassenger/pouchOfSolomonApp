export const request = {
    get: async (url, headers) => {
        try{
            const response  = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...headers
                }
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
                console.warn('Error in parsing Json ', jsonParseErr);
                const textResponse = await response.text();
                return {
                    status: true,
                    type: 'text',
                    data: textResponse
                }
            }
            
        }
        catch(err){
            console.warn('Error', err);
            return {
                status: false,
                type: 'error',
                data: err
            }
        }        
    },
    /** @description post endpoint that accepts json body
     * 
     */
    post: async (url, headers, body) => {
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
                console.warn('Error in parsing Json ', jsonParseErr);
                const textResponse = await response.text();
                return {
                    status: true,
                    type: 'text',
                    data: textResponse
                }
            }
            
        }
        catch(err){
            console.warn('Error', err);
            return {
                status: false,
                type: 'error',
                data: err
            }
        }        
    },
}