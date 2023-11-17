const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/users');
const Printout = require('../models/printout');

router.post('/register', async (req, res) => {
    console.log(req.body);
    const { displayName, email, number, password } = req.body;

    if (!displayName || !email || !password || !number) {
        return res.status(422).json({ error: 'Plz fill all the fields correctly' })
    }

    console.log(email);

    try {
        // const userExist = await Users.findOne({ user_handle: userHandle })

        // console.log(userExist);

        // if (userExist) {
        //     return res.status(422).json({ error: 'Username already exists, provide unique username or login' })
        // } else {
            const user = new Users({
                display_name: displayName,
                email: email,
                number: number,
                password: password,
            })

            await user.save();

            res.status(201).json({ message: "user registered successfully"})
        // }
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/signin', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ error: 'Plz fill the data properly' })
        }

        const userLogin = await Users.findOne({ email: email })

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            const uuid = userLogin.uuid

            if (!isMatch) {
                res.status(400).json({ error: 'Invalid Credentials' })
            } else {
                res.status(201).json({ message: 'user Signin successful', uuid})
            }
        } else {
            res.status(400).json({ error: 'Invalid Credentials!' })
        }

    } catch (err) {
        res.status(400).send(err);
    }
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/submit-form', upload.single('pdf'), async (req, res) => {
    const formData = req.body;
    
    console.log(formData);

    // Add the uploaded PDF file to the form data
    formData.pdf = req.file.buffer;
  
    // Generate a UUID for the form data
    formData.uuid = uuidv4();
  
    try {
      // Create a new FormData document and save it to the database
      const newFormData = new Printout(formData);
      await newFormData.save();
  
      res.status(201).json({ message: 'Form data and PDF uploaded successfully' });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/get-printouts', async (req, res) => {
    try {
      const formData = await Printout.find();
      res.json(formData);
    } catch (error) {
      console.error('Error fetching form data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;