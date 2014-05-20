if (Meteor.isClient) {
  Template.classes.classLevels = function(){
  return ClassLevels.find();
};
Template.classlevels.classLevels = function(){
  return ClassLevels.find();
};

  Template.insertClassLevel.level = function(){
    return ClassLevels.find();
  };
Template.classes.class = function(){
  return Classes.find();
};

  Template.updateClass.editingDoc = function () {
  return Classes.findOne({_id: Session.get("selectedDocId")});
};

  Template.students.studentList = function(){
    return Meteor.users.find({roles:'student'});
  }

  Template.teachers.teacherList = function(){
    return Meteor.users.find({roles:'teacher'});
  }

  Template.profile.events({
    'click .login': function (evt, tmpl) {
      var email = tmpl.find('.email').value;
      var password = tmpl.find('.password').value;

      Meteor.loginWithPassword(email, password);
    }
  });

    //Meteor.users.insert({emails:[address:email, verified:false],username:firstName'.'lastName,password:password,createdAt:new Date(),
     // profile:[firstName:firstName, lastName:lastName, address:address, birthday:birthday,isActive:isActive,
     
ClassLevels = new Meteor.Collection('classlevels');
Classes = new Meteor.Collection('classes');

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

  Template.insertStudent2.editingDoc = function(){
    return Session.get('newUserIdFromServer');
  };

//Meteor.users.attachSchema(UserSchema);
ClassLevels.attachSchema(levelSchema);
Classes.attachSchema(classSchema);

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
      Session.set('newUserIdFromServer',response);
      //Meteor.users.update({_id:response}, {$set:{profile:['firstName':firstName]});
     });
    }
  });

}

