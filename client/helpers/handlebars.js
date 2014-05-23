Handlebars.registerHelper("formatDate", function(datetime){
	if(moment){
		return moment(datetime).format("DD/MM/YYYY");
	}
	else{
		return datetime;
	}
});
UI.registerHelper("levelOptions", function(){
  lvls = ClassLevels.find();
  levels = lvls.map(function(lvls){
    return {label:lvls.name, value:lvls.name}
  });
  return levels;
});

UI.registerHelper("MeteorUsers", Meteor.users);


//return userName or email
Handlebars.registerHelper('userEmail', function(){
	return Meteor.user().emails[0].address;
});
Handlebars.registerHelper("formatDate", function(datetime) {
	  if (moment) {
	    return moment(datetime).format("MM/DD/YYYY");
	  }
	  else {
	    return datetime;
	  }
	});

//return true if the user is admin
Handlebars.registerHelper('isAdminUser', function() {
	return Roles.userIsInRole(Meteor.user(), ['admin']);
});
//return true if the user is manager
Handlebars.registerHelper('isManagerUser', function() {
	return Roles.userIsInRole(Meteor.user(), ['manager']);
});

Handlebars.registerHelper('isStudentUser', function() {
	return Roles.userIsInRole(Meteor.user(), ['student']);
});

Handlebars.registerHelper('isTeacherUser', function() {
	return Roles.userIsInRole(Meteor.user(), ['teacher']);
});