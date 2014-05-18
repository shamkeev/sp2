UI.registerHelper("levelOptions", function(){
  lvls = ClassLevels.find();
  levels = lvls.map(function(lvls){
    return {label:lvls.name, value:lvls._id}
  });
  return levels;
});

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
  Template.students.Students = function(){
    return Students.find();
  };

  Template.updateClass.editingDoc = function () {
  return Classes.findOne({_id: Session.get("selectedDocId")});
};


ClassLevels = new Meteor.Collection('classlevels');
Classes = new Meteor.Collection('classes');
Students = new Meteor.Collection('students');
studentSchema = new SimpleSchema({
  name:{
    type:String
  }
});
Students.attachSchema(studentSchema);
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

ClassLevels.attachSchema(levelSchema);
Classes.attachSchema(classSchema);

  
}

