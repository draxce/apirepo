import mongoose from "mongoose";
import { Router } from "express";
import Kamion from "../model/kamion";
import Review from "../model/review";

export default({config, db}) => {
  let api = Router();

  // "/v1/kamion/add"  == Create
  api.post("/add", (req, res) => {
    let noviKamion = new Kamion();
    noviKamion.name = req.body.name;
    noviKamion.foodtype = req.body.foodtype;
    noviKamion.avgcost = req.body.avgcost;
    noviKamion.geometry.coordinates = req.body.geometry.coordinates;

    noviKamion.save(err => {
      if(err){
        res.send(err);
      }
      res.json({ messsage: "Kamion je uspesno sacuvan" });
    });
  });

  // "/v1/kamion/ == Read
  api.get("/", (req, res) => {
    Kamion.find({}, (err, kamioni) =>{
      if(err){
        res.send(err);
      }
      res.json(kamioni);
    });
  });


  // "/v1/kamion/:id == Read id
  api.get("/:id", (req, res) => {
    Kamion.findById(req.params.id, (err, kamioni) =>{
      if(err){
        res.send(err);
      }
      res.json(kamioni);
    });
  });

  // "/v1/kamion/:id == Update
  api.put("/:id", (req, res) => {
    Kamion.findById(req.params.id, (err, kamioni) =>{
      if(err){
        res.send(err);
      }
      kamioni.name = req.body.name;
      kamioni.save(err => {
        if(err){
          res.send(err);
        }
        res.json({message: "Info kamiona je azuriran"});
      });

    });
  });

  // "/v1/kamion/:id == Delete
  api.delete("/:id", (req, res) => {
    Kamion.remove({
      _id: req.params.id
    }, (err, kamioni) =>{
      if(err){
        res.send(err);
      }
      res.json({message: "Kamion je uspesno obrisan"});

    });
  });

  //add review for a specific kamion id
  // "/v1/kamion.reviews/add/:id"
  api.post("/reviews/add/:id", (req, res) => {
    Kamion.findById(req.params.id, (err, kamionshranom) => {
      if(err){
        res.send(err);
      }
      let noviReview = new Review();
      noviReview.title = req.body.title;
      noviReview.text = req.body.text;
      noviReview.kamion = kamionshranom._id;
      noviReview.save((err, review) => {
        if(err){
          res.send(err);
        }
        kamionshranom.reviews.push(noviReview);
        kamionshranom.save(err => {
          if(err){
            res.send(err);
          }
          res.json({message: "Kamion review kamiona s hranom je sacuvan"});
        });
      });
    });
  });

  //get rewiev for food track
  // "v1/kamion/reviews/:id"
  api.get("/reviews/:id", (req, res) => {
    Review.find({kamion: req.params.id}, (err, reviews) => {
      if(err){
        res.send(err);
      }
      res.json(reviews)
    });
  });

  return api;
}
