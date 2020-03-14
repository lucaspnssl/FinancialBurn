const express = require('express');

const SessionController = require('./controllers/SessionController');
const TargetController = require('./controllers/TargetController');
const DeptController = require('./controllers/DeptController');
const CardController = require('./controllers/CardController');

const routes = express.Router();

//User
routes.post('/sessions', SessionController.store);

//Target
routes.post('/targets', TargetController.store);
routes.get('/targets', TargetController.show);
routes.put('/targets/:target_id', TargetController.update);
routes.delete('/targets/:target_id', TargetController.destroy);

//Dept
routes.post('/targets/:target_id/depts', DeptController.store);
routes.get('/targets/:target_id/depts', DeptController.index);
routes.delete('/targets/:target_id/depts/:dept_id', DeptController.destroy);

//Card
routes.post('/cards', CardController.store);
routes.get('/cards', CardController.show);
routes.put('/cards/:card_id', CardController.update);
routes.delete('/cards/:card_id', CardController.destroy);

module.exports = routes;