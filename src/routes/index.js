import express from "express";
import config from "../config";
import middleware from "../middleware";
import initializeDb from "../db";
import kamion from "../controller/kamion";

let router = express();

//connect to db
initializeDb(db => {
  //internal middleware
  router.use(middleware({config, db}));

  //api routes v1(/v1)
  router.use("/kamion", kamion({ config, db }));

})

export default router;
