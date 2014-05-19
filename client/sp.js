UI.registerHelper("levelOptions", function(){
  lvls = ClassLevels.find();
  levels = lvls.map(function(lvls){
    return {label:lvls.name, value:lvls.name}
  });
  return levels;
});
UI.registerHelper("Meteor", Meteor);

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

  Template.insertStudent1.events({
    'click .save': function (evt, tmpl) {
      var firstName = tmpl.find('.firstName').value;
      var lastName = tmpl.find('.lastName').value;
      var email = tmpl.find('.email').value;
      var password = tmpl.find('.password').value;
      var tel = tmpl.find('.tel').value;
      var address = tmpl.find('.address').value;
      var birthday = tmpl.find('.birthday').value;
      var gender = tmpl.find('.gender').value;
      var isActive = tmpl.find('.isActive').value;

      insertStudent(firstName, lastName, email, password, address, birthday, isActive, tel, gender)
    }
  });

var insertStudent = function(firstName, lastName, email, password, address, birthday, isActive, tel, gender){
    Meteor.users.insert({firstName:firstName, lastName:lastName, emails:[{address:email, verified:false}], password:password, address:address,
      birthday:birthday, isActive:isActive, roles:'student', tel:tel, gender:gender});
};
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
      type:Boolean
    }
});
UserSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    password:{
      type:String,
      label:"Password"
    },
    email:{
      type:String,
      label:"Password"
    },
   /* emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },*/
    createdAt: {
        type: Date
    },
    profile: {
        type: UserProfileSchema,
        optional: true
    }
});


Meteor.users.attachSchema(UserSchema);
ClassLevels.attachSchema(levelSchema);
Classes.attachSchema(classSchema);
  
}

