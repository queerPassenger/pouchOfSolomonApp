import logger from '../utils/logger';

interface RequestProps {
    get: (url: string, headers?: any) => Promise<Response>,
    post: (url: string, body: any, headers?: any) => Promise<Response>
}
interface FetchResponse {
    text: () => Promise<any>,
    json: () => Promise<any>
}
interface Response {
    status: boolean,
    type: ('json' | 'text' | 'error'),
    data: any
}
export const request: RequestProps = {
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
            return await responseHandler(response);       
        }
        catch(err){
            logger.warn('Error'+ err.toString());
            return {
                status: false,
                type: 'error',
                data: err
            }
        }    
    },
    post: async (url, body, headers) => {
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
            return await responseHandler(response);       
        }
        catch(err){
            logger.warn('Error'+ err.toString());
            return {
                status: false,
                type: 'error',
                data: err
            }
        }        
    },
}
export const responseHandler = async (response: FetchResponse): Promise<Response> => {
    try{
        const jsonResponse = await response.json();
        return {
            status: true,
            type: 'json',
            data: jsonResponse
        }
    }
    catch(jsonParseErr){
        logger.warn('Error in parsing Json '+ jsonParseErr.toString());
        const textResponse = await response.text();
        return {
            status: true,
            type: 'text',
            data: textResponse
        }
    }
}

