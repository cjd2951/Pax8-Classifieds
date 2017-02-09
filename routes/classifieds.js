'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')

// YOUR CODE HERE

//get all
router.get('/', (req, res, next) =>{
  knex('classifieds')
     .select('id', 'title', 'description', 'price', 'item_image')
     .then((results)=>{
       res.send(results);
     })
     .catch((err)=>{
       next(err);
     });
});

//get by id
router.get('/:id', (req, res, next) =>{
  knex('classifieds')
     .select('id', 'title', 'description', 'price', 'item_image')
     .where('id', req.params.id)
     .then((results)=>{
       res.send(results[0]);
     })
     .catch((err)=>{
       next(err);
     });
});

//post new
router.post('/', (req, res, next) =>{
  knex('classifieds')
     .insert({
       title: req.body.title,
       description: req.body.description,
       price: req.body.price,
       item_image: req.body.item_image
     }, ['id', 'title', 'description', 'price', 'item_image'])
     .then((results)=>{
       res.send(results[0]);
     })
     .catch((err)=>{
       next(err);
     });
});

//update
router.patch('/:id', (req, res, next) =>{
  knex('classifieds')
     .where('id', req.params.id)
     .update({
       title: req.body.title,
       description: req.body.description,
       price: req.body.price,
       item_image: req.body.item_image
     }, ['id', 'title', 'description', 'price', 'item_image'])
     .then((results)=>{
       res.send(results[0]);
     })
     .catch((err)=>{
       next(err);
     });
});

//delete
router.delete('/:id', (req, res, next) =>{
  knex('classifieds')
     .where('id', req.params.id)
     .returning(['id', 'title', 'description', 'price', 'item_image'])
     .del()
     .then((results)=>{
       res.send(results[0]);
     })
     .catch((err)=>{
       next(err);
     });
});

module.exports = router;
