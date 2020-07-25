interface Logger {
    info: (param: string) => void,
    warn: (param: string) => void,
    error: (param: string) => void
}
const loggerDisable: boolean = false;

const logger: Logger = {
    info: (param) => {
        if(!loggerDisable)
            console.log(param);
    },
    warn: (param) => {
        if(!loggerDisable)
            console.warn(param);
    },
    error: (param) => {
        if(!loggerDisable)
            console.error(param);
    }
}
export default Object.freeze(logger);