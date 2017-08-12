const User = require('../models/user');
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
                   Hospital.find( (err,hospitalAdminDetail) => {
                    if(!hospitalAdminDetail){
                        res.json({ success:false , message: 'No hospital found'});
                    } else {
                        res.json({ success:true , message:'List Details', data:hospitalDetail, data1:hospitalAdminDetail});
                    }
                    
                });
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
                    res.json({ success:true , message:'Hospital List', data:hospitals});
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
        id= "598c437ab2cc052920459545";
         if(!id){
            res.json({ success:false , message:'No hospital id was provided!!'});
        } else {
            Hospital.findOne({ _id: id } , (err,hospital) => {
                if(err){
                    res.json({ success:false , message:'Not a valid hospital id!!'});
                } else {
                    if(!hospital){
                        res.json({ success:false , message: 'No hospital found'});
                    } else {
                        res.json({ success:true , message:hospital});
                    }
                }
            });
        }
    });

     router.post('/getHospitalDetail',(req,res)=>{
        //console.log(req.body.id);
         if(!req.body.id){
            res.json({ success:false , message:'No hospital id was provided!!'});
        } else {
            Hospital.findOne({ _id: req.body.id } , (err,hospitalDetail) => {
                if(err){
                    res.json({ success:false , message:'Not a valid hospital id!!'});
                } else {
                    if(!hospitalDetail){
                        res.json({ success:false , message: 'No hospital found'});
                    } else {
                        
                        User.find({ hospitalId: req.body.id } , (err,hospitalAdminDetail) => {
                    if(!hospitalAdminDetail){
                        res.json({ success:false , message: 'No hospital found'});
                    } else {
                        res.json({ success:true , message:'List Details', data:hospitalDetail, data1:hospitalAdminDetail});
                    }
                    
                });
                    }
                }
            });
        }
    });
    router.post('/addHospitalAdmin',(req,res)=>{
      //  console.log(req.body.hospitalId);
         let user = new User({
            hospitalId:req.body.hospitalId,
            name:req.body.name,
            gender:req.body.gender,
            email:req.body.email,
            phoneno:req.body.phoneno,
            technicalno:req.body.technicalno,
            username:req.body.username,
            password:req.body.password,
            usertype:'hospital_admin'
        });

        user.save((err)=>{
            if(err){
                res.json({ success:false , message:err });
            } else {
                User.find({ hospitalId: req.body.hospitalId } , (err,hospitalAdminList) => {
                    if(!hospitalAdminList){
                        res.json({ success:false , message: 'No hospital Admin List found'});
                    } else {
                        res.json({ success:true , message:'Admin List', data:hospitalAdminList});
                    }
                    
                });
            }
        });
    });

     router.post('/getBranchDetail',(req,res)=>{
        const [hospital_id, branch_id] = req.body.branchid.split('-');
     // console.log(hospital_id);
        Hospital.findOne({_id:hospital_id}, (err, hospitalDet) =>{
               if(err){
                        res.json({ success:false , message: 'Not a valid hospital id'});
                    } else {
                        
                       if(hospitalDet.branchDetails._id == branch_id)
                        {
                              res.json({ success:false , message: 'Not a valid hospital id'});
                        } else {
                             User.find({ branchId: branch_id } , (err,branchAdmin) => {
                                if(!branchAdmin){
                                    res.json({ success:false , message: 'Not a valid branch id'});
                                } else {
                                    res.json({ success:true , message:'Branch List', datahospital:hospitalDet, databranch:branchAdmin});
                                }
                                
                            });
                        }
                    }
        });
        
    });
     router.post('/addBranchAdmin',(req,res)=>{
       const [hospital_id, branch_id] = req.body.branchId.split('-');
       console.log(req.body);
       let user = new User({
           hospitalId:req.body.hospitalId,
           branchId:branch_id,
           name:req.body.name,
           email:req.body.email,
           phoneno:req.body.phoneno,
           technicalno:req.body.technicalno,
           username:req.body.username,
           password:req.body.password,
           usertype:'branch_admin'
       });
        user.save((err)=>{
            if(err){
                res.json({ success:false , message:err });
            } else {
                User.find({ branchId: branch_id } , (err,branchList) => {
                    if(!branchList){
                        res.json({ success:false , message: 'No branch List found'});
                    } else {
                        res.json({ success:true , message:'Branch admin added',   data:branchList});
                    }
                    
                });
            }
        });
     });
       
      router.post('/addSurgeon',(req,res)=>{
       const [hospital_id, branch_id] = req.body.branchId.split('-');
       console.log(req.body);
       let user = new User({
           hospitalId:req.body.hospitalId,
           branchId:branch_id,
           regno:req.body.regno,
           city:req.body.city,
           country:req.body.country,
           email:req.body.email,
           phoneno:req.body.phoneno,
           username:req.body.username,
           password:req.body.password,
           usertype:'surgeon'
       });
        user.save((err)=>{
            if(err){
                res.json({ success:false , message:err });
            } else {
                User.find({ branchId: branch_id } , (err,surgeonList) => {
                    if(!surgeonList){
                        res.json({ success:false , message: 'No Surgeon List found'});
                    } else {
                        res.json({ success:true , message:'Surgen added', data:surgeonList});
                    }
                    
                });
            }
        });
     });
       
 

    return router;
}