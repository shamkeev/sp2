//server.js

if (Meteor.isServer) {
Meteor.methods({
 
    addUser: function (email,password,role,firstName,lastName,tel,address,birthday,gender,isActive) {
      var id = Accounts.createUser({
        'email':email,
        'password':password,
        'profile':{
          'firstName':firstName,
          'lastName':lastName,
          'tel':tel,
          'address':address,
          'birthday':birthday,
          'gender':gender,
          'isActive':isActive
        }
      });
      Roles.addUsersToRoles(id,[role]);
      return id;
      console.log(id);
    }
  });

ClassLevels = new Meteor.Collection('classlevels');
Classes = new Meteor.Collection('classes');
Rooms = new Meteor.Collection('rooms');
TimeSections = new Meteor.Collection('timesections');
Schedule = new Meteor.Collection('schedule');

  Meteor.startup(function () {
    // code to run on server at startup

    // create an admin user if they don't already exist
	if (Meteor.users.find({username: 'admin'}).count() < 1) {
		Accounts.createUser({
			'username': 'admin',
			'email': 'admin@test.com',
			'password': 'admin'
		});
		Roles.addUsersToRoles(Meteor.users.find({username: 'admin'}).fetch(), ['admin']);
	}

  });
  
  Meteor.users.allow({
  	insert: function(userId, user){
  		return true;
  	}
  });
}
/*
if(Meteor.users.find({username:'admin'}).count()>0)
	Accounts.validateNewUser(function (user) {
    var loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin']) || Roles.userIsInRole(loggedInUser,['manager'])) {
      return true;
    }

    throw new Meteor.Error(403, "Not authorized to create new users");
});*/
	