// I am using regex expressions to validate the url. Source: https://gist.github.com/franciskim/41a959f8e3989254ef5d
function checkURL(url){
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regexp = new RegExp(expression);
    return regexp.test(url);
}

// Exporting function to be used through client library
export {checkURL};
