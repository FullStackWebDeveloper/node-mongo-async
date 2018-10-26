const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .get(controller.getProducts);

Router.route('/')
  .post(controller.addProducts);

Router.route('/')
  .put(controller.updateProducts);

Router.route('/remove')
    .post(controller.deleteProducts);

module.exports = Router;