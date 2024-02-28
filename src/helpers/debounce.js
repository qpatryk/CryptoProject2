

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


export default debounce


// export default function debounce(func, timeout = 300) {
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => { func.apply(this, args); }, timeout);
//     };
// }
// function saveInput() {
//     console.log('Saving data');
// }
// const processChange = debounce(() => saveInput());

