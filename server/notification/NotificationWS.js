const express = require('express');
const service = require('./NotificationService');
class NotificationWS {
    constructor(router) {
        this.router = express.Router()
        .get('/notification/client', this.getClients.bind(this))
        .post('/notification/client', this.registerClient.bind(this))
        .post('/notification', this.send.bind(this));

    }

    getClients(req, res, next) {
        service.getClients().then((users) => res.json(users))
        .catch(next);
    }

    send(req, res, next) {
        service.send({
            clientId: req.body.clientId,
            notification: {
                title: req.body.title,
                body:  req.body.body,
                sound: req.body.sound
            }
        }).then((msg) => res.json(msg))
        .catch(next);
    }

    registerClient(req, res, next) {
        service.registerClient({
            clientId: req.body.clientId,
            token: req.body.token
        }).then((msg) => res.json(msg))
        .catch(next);
    }

    getRouter() {
        return this.router;
    }

}
module.exports = NotificationWS;
