const express = require('express');
const router = express.Router();
const Chicken = require('../models/chicken');
const Farmyard = require('../models/farmyard');
const { check, validationResult } = require('express-validator/check');
const ObjectId = require('mongoose').Types.ObjectId;
const farmyard = require('../models/farmyard');

// Get Farmyards : GET http://localhost:8001/farmyard
router.get('/', async (req, res)=>{
    try {
        const Farmyards = await farmyard.find().populate({ path: "listOfChickens", select: 'name'});
        res.status(200).send(Farmyards);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    
});


// Add a farmyard : POST http://localhost:8001/farmyard/
router.post(
    '/', 
    [
    check('farmName', 'farmyard name is required').not().isEmpty(),
    ],
    async (req, res)=>{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { farmName, listOfChickens } = req.body;
    try {
        let farmyard = await Farmyard.findOne({ farmName });
          if (farmyard) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'farmyard already exists' }] });
          }
          farmyard = new Farmyard({ farmName, listOfChickens  });
       await farmyard.save(); 
       res.status(200).send(farmyard); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } 
} );


//Add a chicken by _id to a specific farmyard : PATCH http://localhost:8001/farmyard/FARMYARD_id/CHICKEN_id
router.patch('/:idFarmyard/:idChicken', async (req, res) => {
    try {
      const Farmyards = await farmyard.find().populate('listOfChickens');
      if (await checkExists(Farmyards, req.params.idChicken)) {
        res.send('Chicken already exists in a farm');
      } else {
        const chickenToAdd = await Chicken.findById(req.params.idChicken);
        const farmyard = await Farmyard.findByIdAndUpdate(
          req.params.idFarmyard,
          { $push: { listOfChickens: chickenToAdd } },
          { new: true }
        );
        res.status(200).send(farmyard);
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });


//Delete a farmyard by _id : DELETE http://localhost:8001/farmyard/FARMYARD_id
router.delete('/:id', async (req, res)=>{
    try {
        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
        await Farmyard.findByIdAndRemove(req.params.id);
        res.status(200).send('Farmyard deleted'); 

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})


// function to verify if a chicken exists in a farmyard 

async function checkExists(farmsList, chickenId) {
    const chickenToAdd = await Chicken.findById(chickenId);
    for (farm of farmsList) {
      for (ch of farm.listOfChickens) {
        if (ch._id.toString() === chickenToAdd._id.toString()) {
          return true;
        }
      }
    }
    return false;
  } 

module.exports = router;

