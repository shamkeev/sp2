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
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
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

