/*jshint esversion: 6 */

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    Meteor.methods({
        getSession: function (args) {
            let result = HTTP.call('POST', 'https://api.rebilly.com/v2.1/signin', {'data': {
                email: args.email,
                password: args.password,
            }});
            console.log(result.data);

            return result.data;
        },
        removeSession: function (id, token) {
            console.log([id, token]);
            let result = HTTP.call('DELETE', 'https://api.rebilly.com/v2.1/sessions/' + id, {
                headers: {Authorization: 'Bearer ' + token}
            });
            console.log(result);

            return result.statusCode;
        }
    });
});
