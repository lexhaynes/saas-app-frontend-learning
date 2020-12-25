
//TODO: use a library for client-side email and password validations

const validateEmail = (email) => {
    //note: this is the same as on the server side; consolidate, perhaps
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (pass) => {
    return pass.length > 1 ? true : false;
};

export {
    validateEmail,
    validatePassword
}