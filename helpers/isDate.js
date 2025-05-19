const moment = require('moment');

const isDate = ( value ) => {

    if ( !value ) {
        return false;
    }

    // moment me devolvera una fecha independiente del valor que contenga la variable
    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }

}


module.exports = {
    isDate
};