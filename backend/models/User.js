const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFile = path.join(__dirname, '..', 'users.json');

// Initialize file if it doesn't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

class User {
  static async findOne(query) {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const user = users.find(u => {
      let match = true;
      for (let key in query) {
        if (u[key] !== query[key]) match = false;
      }
      return match;
    });
    
    if (user) {
        // Return a copy so we can attach methods
        const userObj = { ...user };
        userObj.id = userObj._id;
        userObj.matchPassword = async function (enteredPassword) {
            return await bcrypt.compare(enteredPassword, this.password);
        };
        return userObj;
    }
    return null;
  }

  static async findById(id) {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const user = users.find(u => u._id === id);
    if (user) {
        const userObj = { ...user };
        userObj.id = userObj._id;
        userObj.select = function() {
            const { password, ...rest } = this;
            return rest;
        };
        return userObj;
    }
    return { select: () => null };
  }

  static async findByIdAndUpdate(id, data) {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const index = users.findIndex(u => u._id === id);
    if (index !== -1) {
      if (data.name) users[index].name = data.name;
      if (data.email) users[index].email = data.email;
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        users[index].password = await bcrypt.hash(data.password, salt);
      }
      fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

      const userObj = { ...users[index] };
      userObj.id = userObj._id;
      return userObj;
    }
    return null;
  }

  static async create(userData) {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const newUser = {
      _id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    
    const userObj = { ...newUser };
    userObj.id = userObj._id;
    return userObj;
  }
}

module.exports = User;
