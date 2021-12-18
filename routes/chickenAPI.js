const express = require('express');
const router = express.Router();
const Chicken = require('../models/chicken');
const { check, validationResult } = require('express-validator/check');
const ObjectId = require('mongoose').Types.ObjectId;



// Get the list of chickens :  GET http://localhost:8001/chicken
router.get('/', async (req, res)=>{
    try {
        const chickens = await Chicken.find();
        res.send(chickens);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    
});


// Add a chicken to the list of chickens : POST http://localhost:8001/chicken/ + body { "name" : "...", "birthday": "mm-dd-yyyy", "weight": ... }
router.post(
    '/', 
    [
    check('name', 'name is required').not().isEmpty(),
    check('weight', 'weight is required').not().isEmpty(),
    ],
    async (req, res)=>{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, birthday, weight, steps, isRunning } = req.body;
    try {
        let chicken = await Chicken.findOne({ name });
          if (chicken) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Chicken already exists' }] });
          }
       chicken = new Chicken({ name, birthday, weight, steps, isRunning });
       await chicken.save(); 
       res.status(200).send(chicken); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } 
} );


// Update a chicken by _id with put : PUT http://localhost:8001/chicken/CHICKEN_id  + body {changes...}
router.put('/:id', async (req, res)=>{
        try {
            if(!ObjectId.isValid(req.params.id))
            return res.status(400).send('ID unknown: ' + req.params.id)
           
            const updatedChicken = {
                name: req.body.name,
                birthday: req.body.birthday, 
                weight: req.body.weight, 
                steps: req.body.steps, 
                isRunning: req.body.isRunning
            }
           await Chicken.findByIdAndUpdate(
               req.params.id,
               {$set : updatedChicken},
               {new: true}
           );
            res.status(200).send('chicken updated'); 
    
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)

// Update a chicken by _id with patch : PATCH  http://localhost:8001/chicken/CHICKEN_id  + body {changes...}
router.patch('/:id', async (req, res)=>{
    try {
        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

       await Chicken.findByIdAndUpdate(
           req.params.id,
           req.body,
           {new: true}
       );
        res.status(200).send('chicken updated'); 

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
)

// Delete a chicken by _id : DELETE http://localhost:8001/chicken/CHICKEN_id 
router.delete('/:id', async (req, res)=>{
    try {
        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)
        await Chicken.findByIdAndRemove(req.params.id);
        res.status(200).send('chicken deleted'); 

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// Increase chicken's steps by 1 by its _id :  GET  http://localhost:8001/chicken/run/CHICKEN_id 
router.get('/run/:id', async (req, res)=>{
    try {
        if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id)

       let chickenRuns = await Chicken.findByIdAndUpdate(
           req.params.id,
           {$inc :{steps:1}},
           {new: true}
       );

      
       res.json({ result: [{ chicken_name: chickenRuns.name  },{ steps_number: chickenRuns.steps}] });
        res.status(200); 

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
)

module.exports = router;


