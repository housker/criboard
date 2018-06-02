var Sequelize = require('sequelize');

var User = require('./models/user.js');
var Transaction = require('./models/transaction.js')
var Issues = require('./models/issues.js');
// var Ledgers = require('./models/ledger.js');
var Group = require('./models/group.js');
var UserGroup = require('./models/user-group.js');

var bcrypt = require('bcrypt');
var db = require('../database');

// establish relationship between users and transactions tables
// a user can have many transactions
Transaction.belongsTo(User);
User.hasMany(Transaction);

// establish relationship between groups and transactions tables
// a group can have many transactions
Transaction.belongsTo(Group);
Group.hasMany(Transaction);

// // establish many-to-many relationship between users and groups with a join table users_groups
User.belongsToMany(Group, {through: UserGroup});
Group.belongsToMany(User, {through: UserGroup});

db.sync();

// save username, email and password in database
// check if username already exists in database, if not insert user info into database
var createUser = (username, email, password, callback) => {
  User.findOne({
    where: {username: username}
  })
  .then((result) => {
    // console.log(result)
    // if user doesn't exist
    if (result === null) {
      User.create({
        username: username, email: email, password: password
      })
      .then((result) => {
        // console.log('new user created', result)
        // grab the last inserted id in database
        User.findOne({
          where: {username: username}
        })
        .then((result) => {
          //login comes from passport and creates a session and a cookie for the user
          var user_id = result.dataValues.id;
          callback(true, user_id);
        })
      })
    } else {
      // username already exists in database
      // console.log('username already exists');
      callback(false);
    }
  })
};

var authenticateUser = (username, password, isMatch) => {
  User.findOne({
    where: {username: username}
  })
  .then((result) => {
    if (result === null) {
      // console.log('user does not exist');
      isMatch(false);
    } else {
      var hash = result.dataValues.password;
      // console.log('hash for user', hash);
      var userId = result.dataValues.id;
      bcrypt.compare(password, hash, function(err, response) {
        if (response === true) {
          isMatch(true, userId);
        } else {
          isMatch(false);
        }
      });
    }
  })
  .catch(err => {
    // console.log('error reading from database');
    isMatch(false)
  })
};

var fetchUsers = (callback) => {
  User.findAll({})
  .then(result => {
    var people = result.map(person => {
      return person.dataValues.username;
    })
    // console.log(people)
    callback(people);
  })
  .catch(err => {
    // console.log('error fetching from database');
    callback(null);
  })
};

// function to get all data from transactions table
var fetchActivity = (callback) => {
  var transactions = [];
  Transaction.findAll({})
  .then(results => {
    results.forEach(result => {
      User.findOne({
        where: {id: result.UserId}
      })
      .then(user => {
        var username = user.dataValues.username;
        Group.findOne({
          where: {id: result.GroupId}
        })
        .then(group => {
          var groupname = group.dataValues.groupname;
          var transaction = {
            paidBy: username,
            amount: result.amount,
            date: result.date,
            bill: result.bill,
            username: username,
            groupname: groupname
          };
          transactions.push(transaction);
          if (transactions.length === results.length) {
            console.log(transactions)
            callback(transactions);
          }
        })

        })
      })
    })
  .catch(err => {
    // console.log(err);
    callback(null)
  });
};

// // // get transactions from groups which logged in user is a part of
// var fetchActivity = (username, callback) => {
//   var allTransactions = []
//   User.findOne({
//     where: {username: username}
//   })
//   .then(result => {
//     var userId = result.dataValues.id;
//     // console.log('UserID', userId)
//     UserGroup.findAll({
//       where: {UserId: userId}
//     })
//     .then(results => {
//       // console.log(results)
//       var groupIds = results.map(result => {
//         return result.dataValues.GroupId;
//       });
//       console.log('GROUPIDs', groupIds)
//       var allTransactions = [];
//       groupIds.forEach((id, index) => {
//         Transaction.findAll({
//           where: {GroupId: id}
//         })
//         .then(results => {
//           results.forEach((result) => {
//             var transaction = {
//               id: result.dataValues.id,
//               amount: result.dataValues.amount,
//               date: result.dataValues.date,
//               bill: result.dataValues.bill
//             };
//             var userId = result.dataValues.UserId;
//             var groupId = result.dataValues.GroupId;
//             User.findOne({
//               where: {id: userId}
//             })
//             .then(result => {
//               var username = result.dataValues.username;
//               transaction.username = username;
//               Group.findOne({
//                 where: {id: groupId}
//               })
//               .then(result => {
//                 var groupname = result.dataValues.groupname;
//                 transaction.groupname = groupname;

//                 allTransactions.push(transaction);
//                 if (transaction.length === results.length && index === groupIds.length) {
//                   console.log(allTransactions)
//                   callback(allTransactions)
//                 }
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// };

// fetchActivity('Yoshi')

var reportIssue = (title, description, image) => {
  // console.log('title: ', title)
  // console.log('title: ', description)
  // console.log('title: ', image)
  Issues.create({
    status: 'reported',
    title: title,
    description: description,
    image: image
  });
}

var selectIssues = (callback) => {
  console.log('+++++++++++++++SELECT ISSUES IS BEING CALLED+++++++++++')
  Issues.findAll()
  .then((result) => {
    console.log(callback)
    callback(JSON.stringify(result))
  }).bind(this);
};

var makeGroup = (data, callback) => {
  var groupname = data.groupname; // a string
  var groupmembers = data.groupmembers; // an array of all group members (all of these members exist in the users array)
  // save a new entry in groups table with groupname and groupmembers array
  console.log('groupname and members in DATABASE HELPER', groupname, groupmembers, Array.isArray(groupmembers))
  var n = groupmembers.length;
  var groupTable = [];
  for (var i = 0; i < n; i++) {
    groupTable[i] = []
    for (var j = 0; j < n; j++) {
      groupTable[i][j] = 0;
    }
  }
  var matrix = JSON.stringify(groupTable);
  Group.create({
    groupname: groupname,
    matrix: matrix,
    members: JSON.stringify(groupmembers)
  })
  .then(result => {
    var groupId = result.dataValues.id;
    // find userid for each member in this group
    groupmembers.forEach((member, i)  => {
      User.findOne({
        where: {username: member}
      })
      .then(result => {
        var userId = result.dataValues.id;
        // insert userId and groupId in users_groups table
        UserGroup.create({
          UserId: userId,
          GroupId: groupId
        })
        .then(result => {
          if (i === groupmembers.length) {
            console.log('group initialized');
            // callback(true); //- uncomment this line later
          }
        })
      })
    })
  });
};

var insertTransaction = (groupname, bill, amount, date, paidby, cb) => {
  Group.findOne({
    where: {groupname: groupname}
  })
  .then(result => {
    var members = JSON.parse(result.dataValues.members);
    var groupId = result.dataValues.id;
    var groupMatrix = result.dataValues.matrix;
    User.findOne({where: {username: paidby}})
      .then((result) => {
        var userId = result.dataValues.id;
        // console.log('userId', userId)
        Transaction.create({
          bill: bill,
          amount: amount,
          date: date,
          UserId: userId,
          GroupId: groupId
        })
        .then(result => {
          // insert transaction in groups table matrix
          var groupTable = JSON.parse(groupMatrix);
          var n = groupTable.length;
          // console.log('group table', groupTable)
          // find userIndex in groupmembers array and adjust matrix values when transaction is added
          var userIndex = members.indexOf(paidby);
          console.log('userIndex', userIndex)
          var temp = amount/n;
          for (var i = 0; i < n; i++) {
            if (i != userIndex) {
              groupTable[userIndex][i] -= temp;
              groupTable[i][userIndex] += temp;
            }
          }
          groupMatrix = JSON.stringify(groupTable);
          Group.update({
            matrix: groupMatrix
          }, {
            where: {
              groupname: groupname
            }
          })
          .then(result => {
            cb(result)
          })
        })

      })
  })
  .catch(err => console.log(err))
};

// var createLedger = (userArr) => {
//   var arr = ['a', 'b', 'c'];
//   var toCreate = [];
//   for (var i = 0; i < arr.length; i++) {
//     for (var j = 0; j < arr.length; j++) {
//       var obj = {matrixRow: '',
//                 matrixColumn: '',
//                 value: 0
//                 }
//       obj.matrixRow = arr[i];
//       obj.matrixColumn = arr[j];
//       toCreate.push(obj);
//     }
//   }
//   Ledgers.bulkCreate(toCreate)
//   // .then(() => {
//   //   return Ledgers.findAll();
//   // }).then((users) => console.log(users))
// }

// var updateLedger = (grantor, amount) => {
//   Ledgers.find({where: {matrixRow: !grantor} })
//   .on('success', function (record) {
//     // Check if record exists in db
//     if (record) {
//       record.updateAttributes({
//         value: -amount
//       })
//       .success(function (results) {console.log(results)})
//     }
//   })
// }

// find groups for given user
var findGroups = (username, callback) => {
  // find userid for given user
  User.findOne({
    where: {username: username}
  })
  .then(result => {
    var userid = result.dataValues.id;
    console.log('USER ID', userid )
    // find group ids for this user
    UserGroup.findAll({
      where: {UserId: userid}
    })
    .then(results => {
      var groups = [];
      results.forEach((result, i) => {
        // for each group, find groupname from groups table
        var groupId = result.dataValues.GroupId;
        console.log('GROUP ID', groupId)
        Group.findOne({
          where: {id: groupId}
        })
        .then(result => {
          groups.push(result.dataValues.groupname)
          if (groups.length === results.length) {
            console.log(groups)
            callback(null, groups)
          }
        })
      })
    })
  })
};



// find user info for a particular user
var findUserInfo = (username, callback) => {
  User.findOne({
    where: {username: username}
  })
  .then(result => {
    var userid = result.dataValues.id;
    // console.log('USER ID', userid )
    // find group ids for this user
    UserGroup.findAll({
      where: {UserId: userid}
    })
    .then(results => {
      var groups = [];
      results.forEach((result, i) => {
        // for each group, find groupname from groups table
        groups[i] = {};
        var groupId = result.dataValues.GroupId;
        // console.log('GROUP ID', groupId)
        Group.findOne({
          where: {id: groupId}
        })
        .then(result => {
          var groupmembers = JSON.parse(result.dataValues.members);
          var groupMatrix = JSON.parse(result.dataValues.matrix);
          var userIndex = groupmembers.indexOf(username);
          groups[i].groupname = result.dataValues.groupname;
          groups[i].groupmembers = groupmembers;
          groups[i].row = groupMatrix[userIndex];
          var check = groups.reduce((acc,item) => {
            return acc && (Object.keys(item).length === 3);
          }, true)
          if (check) {
            // console.log(groups)
            callback(groups);
          }
        })
      })
    })
  })
};

// given a username, find user id in table
var findUserId = function(username, callback) {
  User.findOne({
    where: {username: username}
  })
  .then(result => {
    // console.log(result.dataValues.id)
    var userId = result.dataValues.id
    callback(userId)
  })
}

var settleUsers = (groupname, id1, id2, callback) => {
  Group.findOne({
    where: {groupname: groupname}
  })
  .then(result => {
    var groupMatrix = result.dataValues.matrix;
    var groupTable = JSON.parse(groupMatrix);
    groupTable[id1][id2] = 0;
    groupTable[id2][id1] = 0;
    groupMatrix = JSON.stringify(groupTable);
    Group.update({
      matrix: groupMatrix
    }, {
      where: {
        groupname: groupname
      }
    })
    .then(result => {
      callback(true);
    })
  })
};

var fetchUsersByGroup = (groupname, callback) => {
  Group.findOne({
    where: {groupname: groupname}
  })
  .then(result => {
    var members = result.dataValues.members;
    // console.log(members);
    callback(members);
  })
};

// save address to database
var postAddress = (data, callback) => {
  var latitude = data.latitude;
  var longitude = data.longitude;
  var address = data.address;
  var username = data.username;
  User.update({
    latitude: latitude,
    longitude: longitude,
    address: address
  }, {
    where: {username: username}
  })
  .then(result => {
    callback(true)
  })
}

module.exports = {
  createUser: createUser,
  reportIssue: reportIssue,
  selectIssues: selectIssues,
  authenticateUser: authenticateUser,
  insertTransaction: insertTransaction,
  fetchActivity: fetchActivity,
  // createLedger: createLedger,
  // updateLedger: updateLedger,
  fetchUsers: fetchUsers,
  fetchActivity: fetchActivity,
  findUserInfo: findUserInfo,
  findUserId: findUserId,
  settleUsers: settleUsers,
  makeGroup: makeGroup,
  findGroups: findGroups,
  fetchUsersByGroup: fetchUsersByGroup,
  postAddress: postAddress
};