import express from 'express';
import { business } from './business/service/ServiceFoo';
import * as foo from './controllers/foocontroller';
import { crudInterface } from './data/Interface/crudInterface';
import { MysqlCrudInterface } from './data/Interface/mysqlcrudinterface';

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.status(200).json(
    {"Reply":"Hello world!"}
  );
});

app.get("/foo/:id", (req, res) => {
  //TODO: het aanmaken van deze objecten moet je niet bij elke request doen. Oplossing is om een singleton te gebruiken.
  let mysql:crudInterface = new MysqlCrudInterface();
  let fooService:business.ServiceFoo = new business.ServiceFoo(mysql);
  let fooController: foo.FooController = new foo.FooController(fooService);
  fooController.getFooById(req, res);
});

// set port, listen for requests
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
