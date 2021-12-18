const express = require('express');
const router = express.Router();
const Chicken = require('../models/chicken');
const Farmyard = require('../models/farmyard');
const { check, validationResult } = require('express-validator/check');
const ObjectId = require('mongoose').Types.ObjectId;
const farmyard = require('../models/farmyard');

// Get farmyards
router.get('/', async (req, res)=>{
    try {
        const Farmyards = await farmyard.find().populate("listOfChickens");
        res.status(200).send(Farmyards);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    
});


// Add chicken to a farmyard
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


//Add chicken to a specific farmyard
router.patch('/:idFarmyard/:idChicken', async (req, res)=>{
    try {
        if(!ObjectId.isValid(req.params.idChicken)&& !ObjectId.isValid(req.params.idFarmyard) )
        return res.status(400).send('Unknown IDS: Unknown FarmyarID' + req.params.idFarmyard + ', Unknown Chicken ID '+ req.params.idChicken )


        const Farmyards = await farmyard.find().populate("listOfChickens");
        let exists = Object.values(Farmyards).includes(Farmyards.listOfChickens);

            console.log( exists.valueOf())
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}
)


/*
const chickenToAdd = await Chicken.findById(req.params.idChicken);
       const farmyard = await Farmyard.findByIdAndUpdate(
           req.params.idFarmyard,
           {$push :  {listOfChickens :chickenToAdd}},
           {new: true}
        );
        res.status(200).send(farmyard); 
*/
module.exports = router;

