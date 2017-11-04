/*jshint esversion: 6 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'

import './main.html';

let session = null;

Session.set('showLogin', true);

Template.body.helpers({
    showLogin() {
        return Session.get('showLogin');
    }
});

Template.login.events({
    'submit .login'(event) {
        event.preventDefault();
        const target = event.target;

        Meteor.call('getSession', {email: target.email.value, password: target.password.value}, function(err, response) {
            console.log(response);

            session = response;
            Session.set('showLogin', false);
            alert('Logged in');
        });
    },
});

Template.logout.events({
    'submit .logout'(event) {
        event.preventDefault();

        Meteor.call('removeSession', session.id, session.token, function(err, response) {
            console.log(response);

            session = null;
            Session.set('showLogin', true);
            alert('Logged out');
        });
    },
});
