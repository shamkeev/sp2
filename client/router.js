Router.map(function(){
	this.route('home',{
		path:'/',
		layoutTemplate:'homelayout'
	});
	this.route('profile',{
		layoutTemplate:'profile',
		yieldTemplates:{
			'menu':{to:'menu'}
		}
	});
	this.route('signup',{
		layoutTemplate:'signup',
		yieldTemplates:{
			'menu':{to:'menu'}
		}
	});
	this.route('classes',{
		layoutTemplate:'layout',
		yieldTemplates:{
			'cleft':{to:'left'},
			'menu':{to:'menu'}
		},
		onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('/');
      }
    }

	});
	this.route('classlevels',{
		layoutTemplate:'layout',
		yieldTemplates:{
			'cleft':{to:'left'},
			'menu':{to:'menu'}
		},
		onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('/');
      }
    }

	});

	this.route('students',{
		layoutTemplate:'layout',
		yieldTemplates:{
			'sleft':{to:'left'},
			'menu':{to:'menu'}
		},
		onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('/');
      }
    }

	});
	this.route('teachers',{
		layoutTemplate:'layout',
		yieldTemplates:{
			'tleft':{to:'left'},
			'menu':{to:'menu'}
		},
		onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('/');
      }
    }

	});
	this.route('schedule',{
		layoutTemplate:'layout',
		notFoundTemplate:'notFound',
		yieldTemplates:{
			'scleft':{to:'left'},
			'menu':{to:'menu'}
		},
		onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('/');
      }
    }

	});
	this.route('admin', {
    path:'/admin',
    template: 'accountsAdmin',
    layoutTemplate:'adminlayout',

    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('/');
      }
    }
  });

});

var CheckUserRole = function(){

};

Router.configure({
	layoutTemplate:'layout',
	notFoundTemplate:'notFound',
	loadingTemplate:'loading'
});