if (Meteor.isServer) {

ClassLevels = new Meteor.Collection('classlevels');
Classes = new Meteor.Collection('classes');
Students = new Meteor.Collection('students');

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
