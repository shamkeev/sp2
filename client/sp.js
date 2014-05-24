if (Meteor.isClient) {


Template.teacherClasses.classList = function(){
  //var name = Meteor.user.profile.firstName + ' ' +Meteor.user.profile.lastName;
  var teacher = Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
  return Classes.find({teacher:teacher});
}
//sessions
Template.insertStudent2.editingDoc = function(){
    return Session.get('newUserIdFromServer');
  };

  Template.profile.currentUserName = function(){
    return Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
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
Template.insertStudent2.classlist = function(){
  return Classes.find();
}

  Template.students.studentList = function(){
    return Meteor.users.find({roles:'student'});
  }

  Template.teachers.teacherList = function(){
    return Meteor.users.find({roles:'teacher'});
  }

  Template.insertClass.teacherList = function(){
    return Meteor.users.find({roles:'teacher'});
  }
  Template.insertClass.levelList = function(){
    return ClassLevels.find();
  }
  Template.insertClass.timeList = function(){
    return TimeSections.find();
  }
  Template.insertClass.roomList = function(){
    return Rooms.find();
  }



Template.studentinfo.classlist = function(){
  return Meteor.user().profile.class;
}
Template.studentinfo.postlist = function(){
  return Posts.find();
}
Template.teacherClasses.postlist = function(){
  return Posts.find();
}
Template.studentinfo.postlist = function(){
  return Posts.find();
}


//events

  Template.students.events({
    'click .remove': function () {
      // ...
      Meteor.users.remove({_id:this._id});

    }
  });
  Template.classes.events({
    'click .remove': function () {
      // ...
      Classes.remove({_id:this._id});

    }
  });

  Template.teachers.events({
    'click .remove': function () {
      // ...
      Meteor.users.remove({_id:this._id});

    }
  });
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

  Template.insertClass.events({
    'click .save': function (evt, tmpl) {
      // ...
      var name = tmpl.find('.name').value;
      var level  = tmpl.find('.level').value;
      var teacher = tmpl.find('.teacher').value;
      var comment = tmpl.find('.comment').value;
      var room = tmpl.find('.room').value;
      var time = tmpl.find('.time').value;

      Classes.insert({name:name, level:level, teacher:teacher, comment:comment, room:room, time:time});
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
      var group = tmpl.find('.group').value;
     Meteor.call('addUser',email,password,role,firstName,lastName,tel,address,birthday,gender,isActive,group, function(err, response){
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

Assignments = new Meteor.Collection('assignments');

asSchema = new SimpleSchema({
  assignment:{
    type:String,
    label:"Assignment"
  },
  deadline:{
    type:Date,
    label:"Deadline"
  }
});


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
    teacher:{
      type:String,
      label:'Teacher'
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
postSchema = new SimpleSchema({
  post:{
    type:String,
    label:'New Post'
  }
});
Posts = new Meteor.Collection('posts');
Posts.attachSchema(asSchema);
Assignments.attachSchema(asSchema);
postSchema = new SimpleSchema({
  post:{
    type:String,
    label:'New Post'
  }
});



Template.teacherClasses.events({
  'click .go': function (evt, tmpl) {
    // ...
    var post = tmpl.find('.post').value;
    Posts.insert({post:post});
  }
});

}

