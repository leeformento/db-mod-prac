const express = require('express');
const helmet = require('helmet');
// const knex=require('knex');

// const knexConfig = require('./knexfile.js')
const coursesRoutes = require('./courses/coursesRoutes.js');

// representrs a connection to my db
const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
  res.send("It's Alive");
});

server.use('/api/courses', coursesRoutes);

server.listen(9000, () => console.log('\nAPI running on 9k\n'));

// get a list of courses
server.get('api/courses', (req, res) => {
  db('courses')
  .then(courses => {
    res.status(200).json(courses);
  })
  .catch(err => res.status(500).json(err))
})

// get course by id
// returns an array
// WHERE -- A COLLECTION BACK.
// Id is unique, primary key, by ID -- Only one back.
// server.get('api/courses/:id', (req, res) => {
//   try {
//     const { id } = req.params;
//       // db('courses').where({id}) // filtering. pass in an object with all filters you want to add
//     const course = await db('courses')
//     .where({id})
//     // const course = await db('courses').where({id}).first(); give first 

//     if (course) {
//       res.status(200).json(course);
//     } else {
//       res.status(404).json({ message: 'Course not found'})
//     }
//     // res.status(200).json(course)
//   } catch(error) {
//     res.status(500).json(error);
//   }
// })

// server.post('api/courses', (req,res) => {
//   // grab data from body
//   const course = req.body;
//   // save data to database
//   // knex:: insert. querybuilder -- knexjs.org ;; different ways of doing it
//   // i have connection to db and now i want to install commands
//   db.insert(courses)
//   .into('courses')
//   .then(ids => {
//     // return id of newly created record
//     res.status(201).json(ids)
//   })
//   .catch( err => {
//     res.status(500).json(err)
//   })

// })

// // update courses


// //delete courses


// // https://knexjs.org/#Builder-insert
