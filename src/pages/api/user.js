import { createRouter } from "next-connect"
import db from '../../utils/db' // Import your database connection
import AquaUser from '../../Backend/models/user'; // Import your Mongoose User model
import _ from "lodash"

const Router = createRouter();

Router.post(async (req, res) => {
  // Create a new user
  //let result;
  db.connectDb()
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json("please enter valid email and password")
  }

  const user = await AquaUser.create({
    email,
    password,
  })
  const sanitisedUseer = { id: user._id, email: user.email, role: user.role }
  res.status(201).json(sanitisedUseer);
  db.disconnectDb()
  // try {
  //   db.connectDb();
  //   const user = new AquaUser(userData);
  //   await user.save();
  //   res.status(201).json(user);
  //   db.disconnectDb();
  // } catch (error) {
  //   res.status(400).json(error);
  // }
})
  .get(async (req, res) => {
    try {
      db.connectDb();
      const user = await AquaUser.find({});
      if (!user) {
        res.status(404).json({ message: 'Users not found' });
        return;
      }
      res.status(200).json(user);
      db.disconnectDb();
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get(async (req, res) => {
    // Retrieve a user by ID
    const { userId } = req.query;
    try {
      db.connectDb();
      const user = await AquaUser.findById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
      db.disconnectDb();
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put(async (req, res) => {
    // Update a user by ID
    const { userId } = req.query;
    const userData = req.body;
    try {
      db.connectDb();
      const user = await AquaUser.findByIdAndUpdate(userId, userData, { new: true });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
      db.disconnectDb();
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    // Delete a user by ID
    const { userId } = req.query;
    try {
      db.connectDb();
      const user = await AquaUser.findByIdAndRemove(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(204).send(); // 204 means no content (successful deletion)
      db.disconnectDb();
    } catch (error) {
      res.status(500).json(error);
    }
  });

export default Router.handler();
