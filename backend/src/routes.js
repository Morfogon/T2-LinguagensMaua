const express = require ('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileConttroller');
const SessionController = require('./controllers/SessionController');
const Printer = require('./controllers/Printer');
const routes = express.Router();

routes.get('/printer', Printer.create); // listar as ongs como array

routes.post('/sessions', SessionController.index); // listar as ongs como array

routes.get('/users', OngController.index); // listar as ongs como array
routes.post('/users', OngController.create); // adicionar ao banco os dados do insert

routes.get('/reviews', IncidentController.index); // listar as ongs como incidents
routes.post('/reviews', IncidentController.create); // adicionar ao banco os dados do insert
routes.delete('/incidents/:id', IncidentController.delete); // deletar um incidente com base no id

routes.get('/profile', ProfileController.index); // 

module.exports = routes;

