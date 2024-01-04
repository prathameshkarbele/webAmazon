import express from "express";
import { Products } from "../Model/productsSchema.js";
import { USER } from "../Model/user̥Shemam.js";
import bcrypt from "bcryptjs";
import  {athenticate}  from "../middleware/authenticate.js";



export const router = new express.Router();

router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    res.status(200).json(productsdata);
    // console.log("productsDate...",productsdata)
  } catch (error) {
    console.log(error.message);
  }
});

// get individual data

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id",id)
    const individualData = await Products.findOne({ id: id });
    console.log(individualData, "individual data");
    res.status(201).json(individualData);
  } catch (error) {
    res.status(400).json(individualData);
    console.log(error.message);
  }
});

// register the data
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { name, email, mobile, password, cpassword } = req.body;

  if (!name || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "filll the all details" });
    console.log("bhai nathi present badhi details");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password are not matching" });
    } else {
      const finaluser = new USER({
        name,
        email,
        mobile,
        password,
        cpassword,
      });

      // yaha pe hasing krenge

      const storedata = await finaluser.save();
      console.log(storedata + "user successfully added");
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log(
      "error the bhai catch ma for registratoin time" + error.message
    );
    res.status(422).send(error);
  }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    console.log("Received login request:", email, password);
  
    if (!email || !password) {
      console.log("Missing email or password");
      res.status(400).json({ error: "fill the all data" });
    }
  
    try {
      const userLogin = await USER.findOne({ email: email });
      console.log("User found:", userLogin);  
  
      if (userLogin) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
  


        // console.log("Password match:", isMatch);
  
        if (!isMatch) {
          console.log("Invalid Password");
          res.status(400).json({ error: "Invalid Password" });
        } else {
        //   console.log("Login successful");
           // tokem generate
           const token = await userLogin.generateAuthtokenn();
           console.log("token", token)
   
           res.cookie("Amazonweb",token,{
               expires:new Date(Date.now()+ 90000000),
               httpOnly:true
           })
          res.status(201).json(userLogin);
        }
      } else {
        console.log("User not found");
        res.status(400).json({ error: "Invalid your Details " });
      }
    } catch (error) {
      console.log("Error during login:", error.message);
      res.status(400).json({ error: "all Invalid Details" });
    }
  });

  router.post("/addcart/:id", athenticate ,async(req,res)=>{
    try {
      const {id} = req.params;
      const cart = await Products.findOne({id:id})
      console.log(cart +"cart Value")
     
      const UserContact = await USER.findOne({_id:req.userID});
      console.log(UserContact)

      if(UserContact){
        const cartData = await UserContact.addcartdata(cart);
        await UserContact.save();
        console.log(cartData)
        res.status(201).json(UserContact);

      }else{
        res.status(401).json({error:"Invalid user"})
      }
    } catch (error) {
      res.status(401).json({error:"Invalid user"})

    }
  })

  // get data into the cart
router.get("/cartdetails", athenticate, async (req, res) => {
  try {
      const buyuser = await USER.findOne({ _id: req.userID });
      console.log(buyuser + "user hain buy pr");
      res.status(201).json(buyuser);
  } catch (error) {
      console.log(error + "error for buy now");
  }
});

  // get data into the cart
  router.get("/validuser", athenticate, async (req, res) => {
    try {
        const validuserone = await USER.findOne({ _id: req.userID });
        console.log(validuserone + "user hain buy pr");
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for buy now");
    }
  });

  // remove Item in the cart
  router.delete("/remove/:id",athenticate,async(req,res)=>{
    try {
      const {id} = req.params;

      req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
        return cruval.id != id  
      })
      req.rootUser.save();
      res.status(201).json(req.rootUser);
      console.log("Item Remove")
    } catch (error) {
      console.log("eroor"+ error)
      res.status(400).json(req.rootUser);
    }
  })

// for userlogout

router.get("/logout", athenticate, async (req, res) => {
  try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
          return curelem.token !== req.token
      });

      res.clearCookie("Amazonweb", { path: "/" });
      req.rootUser.save();
      res.status(201).json(req.rootUser.tokens);
      console.log("user logout");

  } catch (error) {
      console.log(error + "jwt provide then logout");
  }
});      
