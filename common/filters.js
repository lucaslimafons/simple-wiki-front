const moment = require('moment');

export function formatDate(datetime, format) {
    moment.locale('pt-br');
    if (moment) {
        if (datetime != undefined && datetime != '') {
            return moment(datetime).format(format);
        } else {
            return '';
        }
    }
    else {
        return moment();
    }
}
