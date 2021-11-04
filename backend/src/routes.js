const express = require ('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileConttroller');
const SessionController = require('./controllers/SessionController');
const Printer = require('./controllers/Printer');
const routes = express.Router();

routes.get('/printer', Printer.create); 

routes.post('/sessions', SessionController.index); 

routes.get('/users', OngController.index); 
routes.post('/users', OngController.create); 

routes.get('/reviews', IncidentController.index); 
routes.post('/reviews', IncidentController.create); 
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index); 

module.exports = routes;

