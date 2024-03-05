const express = require('express')
const app = express();
const Service = require('./Service')
const PositionModel = require('../models/PositionModel')

app.get('/position/list', Service.isLogin, async (req, res) => {
    try {
        const results = await PositionModel.findAll({
            // where: {
            //     userId: Service.getMemberId(req)
            // },
            // attributes: ['id', 'level', 'name', 'usr'],
            order: [['id', 'DESC']]
        });
        res.send({ message: 'success', results: results });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.post('/position/insert', Service.isLogin, async (req, res) => {
    try {
        let payload = req.body;
        //payload.name = Service.getMemberId(req);
        //const result = await MemberModel.create(req.body);
        await PositionModel.create(payload);
        res.send({ message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.delete('/position/delete/:id', Service.isLogin, async (req, res) => {
    try {
        await PositionModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send({ message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.post('/position/edit', Service.isLogin, async (req, res) => {
    try {
        let payload = req.body;
        payload.userId = Service.getMemberId(req);

        await PositionModel.update(payload, {
            where: {
                id: req.body.id
            }
        })
        res.send({ message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

module.exports = app;