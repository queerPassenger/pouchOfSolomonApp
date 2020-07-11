const months = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDate = (inputDate) => {
    let date = inputDate.getDate();
    let month = inputDate.getMonth();
    let year = inputDate.getFullYear();
    return `${date < 10 ? ('0'+ date): date} ${months[month]} ${year.toString().slice(-2)}`;
};
export const getTime = (inputDate) => {
    let hours = inputDate.getHours();
    let minutes = inputDate.getMinutes();
    let seconds = inputDate.getSeconds();
    return `${hours < 10? ('0'+ hours): hours} : ${minutes < 10? ('0'+ minutes): minutes} : ${seconds < 10? ('0'+ seconds): seconds}`
}