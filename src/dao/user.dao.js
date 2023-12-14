import User from '../models/user.model.js'


const UserDAO = {

  async createUser (userData) {

    try {

      const newUser = new User (userData)
      return await newUser.save()

    } catch (error) {

      throw new Error (`Error creating user: ${error}`)
    }
  },


  async getUserById (userId) {

    try {

      return await User.findById (userId)

    } catch (error) {
        
      throw new Error (`Error fetching user: ${error}`)
    }
  },


  async updateUser (userId, updatedData) {

    try {

      return await User.findByIdAndUpdate (userId, updatedData, { new: true })

    } catch (error) {

      throw new Error (`Error updating user: ${error}`)
    }
  },


  async deleteUser (userId) {

    try {

      return await User.findByIdAndDelete (userId)

    } catch (error) {

      throw new Error (`Error deleting user: ${error}`)
    }
  },
}

export default UserDAO
