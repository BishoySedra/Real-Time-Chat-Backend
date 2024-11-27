import moment from 'moment';

function messageFormat(username, messageContent) {
    return {
        username, messageContent, time: moment().format("LT")
    };
}

export default messageFormat;