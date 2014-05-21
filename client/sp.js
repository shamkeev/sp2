if (Meteor.isClient) {

//sessions
Template.insertStudent2.editingDoc = function(){
    return Session.get('newUserIdFromServer');
  };

Template.updateClass1.editingDoc = function () {
  return Classes.findOne({_id: Session.get("selectedDocId")});
};

//helpers
  Template.classes.classLevels = function(){
  return ClassLevels.find();
};
Template.schedule.room = function(){
  return Rooms.find();
};
Template.schedule.timesection = function(){
  return TimeSections.find();
};
Template.schedule.schedule = function(){
  return Schedule.find();
}

Template.classlevels.classLevels = function(){
  return ClassLevels.find();
};

  Template.insertClassLevel.level = function(){
    return ClassLevels.find();
  };
Template.classes.class = function(){
  return Classes.find();
};

  Template.students.studentList = function(){
    return Meteor.users.find({roles:'student'});
  }

  Template.teachers.teacherList = function(){
    return Meteor.users.find({roles:'teacher'});
  }

//events
  Template.classes.events({
    'dbclick .classItem': function () {
      Session.set('selectedDocId');
    }
  });

  Template.loginmodal.events({
    'click .login': function (evt, tmpl) {
      var email = tmpl.find('.email').value;
      var password = tmpl.find('.password').value;

      Meteor.loginWithPassword(email, password);
    }
  });


//this one calls a method from the server and creates new student
  Template.insertStudent2.events({
    'click .save': function (evt, tmpl) {
      var firstName = tmpl.find('.firstName').value;
      var lastName = tmpl.find('.lastName').value;
      var email = tmpl.find('.email').value;
      var password = tmpl.find('.password').value;
      var role = 'student';
      var tel = tmpl.find('.tel').value;
      var address = tmpl.find('.address').value;
      var birthday = tmpl.find('.birthday').value;
      var gender = tmpl.find('.gender').value;
      var isActive = tmpl.find('.isActive').value;
     Meteor.call('addUser',email,password,role,firstName,lastName,tel,address,birthday,gender,isActive, function(err, response){
      Session.set('newUserIdFromServer',response);
      //Meteor.users.update({_id:response}, {$set:{profile:['firstName':firstName]});
     });
    }
  });
  Template.signup.events({
    'click .go': function (evt,tmpl) {
      var firstName = tmpl.find('.firstName').value;
      var lastName = tmpl.find('.lastName').value;
      var email = tmpl.find('.email').value;
      var password = tmpl.find('.password').value;
      var role = 'student';
      var tel = tmpl.find('.tel').value;
      var address = tmpl.find('.address').value;
      var birthday = tmpl.find('.birthday').value;
      var gender = tmpl.find('.gender').value;
      var isActive = false;
      Accounts.createUser({
        'email':email,
        'password':password,
        'profile':{
          'firstName':firstName,
          'lastName':lastName,
          'tel':tel,
          'address':address,
          'birthday':birthday,
          'gender':gender,
          'isActive': false
        }
      });
      //Roles.addUsersToRoles(id,[role]);
    }
  });
  Template.insertTeacher.events({
    'click .save': function (evt, tmpl) {
      var firstName = tmpl.find('.firstName').value;
      var lastName = tmpl.find('.lastName').value;
      var email = tmpl.find('.email').value;
      var password = tmpl.find('.password').value;
      var role = 'teacher';
      var tel = tmpl.find('.tel').value;
      var address = tmpl.find('.address').value;
      var birthday = tmpl.find('.birthday').value;
      var gender = tmpl.find('.gender').value;
      var isActive = tmpl.find('.isActive').value;
     Meteor.call('addUser',email,password,role,firstName,lastName,tel,address,birthday,gender,isActive, function(err, response){
      console.log("isActive=" + isActive)
      Session.set('newUserIdFromServer',response);
      //Meteor.users.update({_id:response}, {$set:{profile:['firstName':firstName]});
     });
    }
  });

  Template.insertRoom.events({
    'click .save': function (evt, tmpl) {
      var name = tmpl.find('.name').value;

      Rooms.insert({name:name});
    }
  });
  Template.insertTime.events({
    'click .save': function (evt, tmpl) {
      var start = tmpl.find('.start').value;
      var end = tmpl.find('.end').value;
      TimeSections.insert({start:start, end:end});
    }
  });

  //define collections here:
ClassLevels = new Meteor.Collection('classlevels');
Classes = new Meteor.Collection('classes');
Rooms = new Meteor.Collection('rooms');
TimeSections = new Meteor.Collection('timesections');
Schedule = new Meteor.Collection('schedule');


levelSchema = new SimpleSchema({
  name:{
    type:String,
    label:'Level'
  }
});
classSchema = new SimpleSchema({
    name:{
      type:String,
      label:'Class-Group Name'
    },
    level:{
      type:String,
      label:'Class Level'
    },
    comment:{
      type:String,
      label:'Comment',
      max:300
    }
});
/*
UserProfileSchema = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    tel:{
      type:String,
      label:'Telephone Number'
    },
    address:{
      type:String,
      label:'Address'
    },
    birthday: {
        type: Date,
        optional: true
    },
    isActive:{
      type:Boolean,
      label:'Check if the user is Active'
    }
});
UserSchema = new SimpleSchema({
    profile: {
        type: UserProfileSchema,
        optional: true
    }
});*/

//Meteor.users.attachSchema(UserSchema);
ClassLevels.attachSchema(levelSchema);
Classes.attachSchema(classSchema);
//Rooms.attachSchema(roomSchema);
//TimeSections.attachSchema(timeSectionSchema);

}

