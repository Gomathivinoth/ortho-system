//const User = require('../models/user');
const Login = require('../models/login');
const Hospital = require('../models/hospital');
const config = require('../config/database'); 

module.exports = (router) => {
    router.post('/register', (req, res) => {
         if(!req.body.username){
            res.json({success:false,message:'Username was not provided'});
        } else {
            if(!req.body.password){
                res.json({success:false,message:'Password was not provided'});
            } else {
                if(!req.body.usertype){
                    res.json({success:false,message:'Usertype was not provided'});
                } else {
                     let login = new Login({
                        username : req.body.username,
                        password : req.body.password,
                        usertype : req.body.usertype
                    });
                    login.save((err) => {
                        if(err){
                            if(err.code === 11000){
                                 res.json({ success:false , message:'Username  already exist'});
                            } else {
                                res.json({ success:false , message:err});
                            }
                             
                        } else {
                            res.json({ success:true , message:'Succcessfully saved!'});
                        }

                    });
                }
            }
        }
            
    });


    router.post('/login', (req, res) => {
        //console.log(req.body);
        if(!req.body.username){
            res.json({ success:false , message:'Username not provided!'});
        } else {
            if(!req.body.password){
                res.json({success:false , message:'Password not provided'})
            } else {
                Login.findOne({username:req.body.username} , (err,data) =>{
                 if(err){
                         res.json({ success:false , message:err});
                    } else {
                        if(!data){
                                 res.json({ success:true , message:'username not found!'});
                         } else {
                             Login.findOne({ password:req.body.password}, (err,data) => {
                                 if(err){
                                     res.json({ success:false,message:err});
                                  } else {
                                      if(!data){
                                           res.json({ success:false , message:'password not found!'});
                                        } else {
                                             res.json({ success:true , message:'Login success', data:data});
                                        }
                                  }
                             });
                         }
                    }

                });
            }
        }

    });

    //Add Hospital Details

    router.post('/addHospital', (req, res) => {
        let hospital = new Hospital({
            hospitalName:req.body.hospitalName,
            alias:req.body.alias,
            hospitalType:req.body.hospitalType,
            hospitalAddress:req.body.hospitalAddress,            
            hospitalPhoneno:req.body.hospitalPhoneno,
            hospitalEmail:req.body.hospitalEmail,
            hospitalWebsite:req.body.hospitalWebsite
        });

        hospital.save((err)=>{
            if(err){
                res.json({ success:false , message:err });
            } else {
                res.json({ success:true , message:'Hospital added' });
            }
        });
    });
    
      //Get Hospitals
    router.get('/getHospitals',(req,res)=>{
        Hospital.find({},(err,hospitals) => {
            if(err) {
                res.json({ success:false , message:err});
            } else {
                if(!hospitals){
                    res.json({ success:false , message:'No hospitals found!'});
                } else {
                    res.json({ success:true , message:hospitals});
                }
            }
        });
    });

     //Add Branch Details

     router.post('/addBranch', (req, res) => {
         
       Hospital.findOne({_id:req.body.branch.branchHospitalId} , (err,hospital) =>{
        if(err){
            res.json({ success: false, message: 'Invalid hospital id' }); 
         } else {
             if(!hospital){
                 res.json({ success: false, message: 'Hospital not found.' }); 
             } else {
                hospital.branchDetails.push({
                   branchName:req.body.branch.branchName,
                   branchAlias:req.body.branch.branchAlias,
                   branchType:req.body.branch.branchType,
                   branchAddress:req.body.branch.branchAddress,
                   branchPhoneno:req.body.branch.branchPhoneno,
                   branchEmail:req.body.branch.branchEmail,
                   branchWebsite:req.body.branch.branchWebsite
                });
                hospital.noOfBranches++;
                hospital.hasBranch = 'Yes';
                hospital.save((err) => {
                     if (err) {
                           res.json({ success: false, message: 'Something went wrong.' }); 
                    } else {
                           res.json({ success: true, message: 'Branch saved' });
                     }
                });
             }
         }
         });
     });
     
       //Get Branches
    router.get('/getBranches',(req,res)=>{
        Hospital.find({},(err,hospital) => {
            if(err) {
                res.json({ success:false , message:err});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospitals found!'});
                } else {
                    res.json({ success:true , message:hospital});
                }
            }
        });
    });

    return router;
}