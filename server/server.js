//server.js

if (Meteor.isServer) {

ClassLevels = new Meteor.Collection('classlevels');
Classes = new Meteor.Collection('classes');
Students = new Meteor.Collection('students');

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
		console.log("no admin user");
	}

  });


}

if(Meteor.users.find({username:'admin'}).count()>0)
	Accounts.validateNewUser(function (user) {
    var loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin']) || Roles.userIsInRole(loggedInUser,['manager'])) {
      return true;
    }

    throw new Meteor.Error(403, "Not authorized to create new users");
});
	