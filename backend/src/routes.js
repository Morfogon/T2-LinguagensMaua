const express = require ('express');
const UserController = require('./controllers/UserController');
const ReviewController = require('./controllers/ReviewController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const Printer = require('./controllers/Printer');
const routes = express.Router();

routes.get('/printer', Printer.create); 

routes.post('/sessions', SessionController.index); 

routes.get('/users', UserController.index); 
routes.post('/users', UserController.create); 

routes.get('/reviews', ReviewController.index); 
routes.post('/reviews', ReviewController.create); 
routes.delete('/reviews/:id', ReviewController.delete);

routes.get('/profile', ProfileController.index); 

module.exports = routes;

