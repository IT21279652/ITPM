const router = require("express").Router();
let Location = require("../models/Location");

//add location
router.route("/add").post((req, res)=>{
    const name = req.body.name;
    const province = req.body.province;
    const description = req.body.description;

    const newLocation = new Location({
        name,
        province,
        description
    })

    newLocation.save().then(()=>{
        res.json("Location Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//display
router.route("/").get((req,res)=>{
    Location.find().then((locations)=>{
        res.json(locations)
    }).catch((err) =>{
        console.log(err)
    })
})

//update
router.route("/update/:id").put(async(req, res)=>{
    let userId = req.params.id;
    const {name, province, description} = req.body;

    const updateLocation = {
        name,
        province,
        description
    }

    const update = await Location.findByIdAndUpdate(userId, updateLocation)
    .then(() => {
        res.status(200).send({status: "Location Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

//delete
router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Location.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({ststus: "Location deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).semd({status: "Error with delete location", error: err.message});
    })
})

//display 1 location
router.route("/get/:id").get(async(req,res) =>{
    let userId = req.params.id;
    const location = await Location.findById(userId)
    .then((location) => {
        res.status(200).send({status: "Location fetched", location})
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error with fetch location", error: err.message});
    })
})

module.exports = router;