Router.map(function(){
	this.route('home',{
		path:'/',
		layoutTemplate:'layout',
		yieldTemplates:{
			'hleft':{to:'left'},
			'menu':{to:'menu'}
		}
	});
	this.route('classes',{
		layoutTemplate:'layout',
		yieldTemplates:{
			'cleft':{to:'left'},
			'menu':{to:'menu'}
		}
	});
	this.route('classlevels',{
		layoutTemplate:'layout',
		yieldTemplates:{
			'cleft':{to:'left'},
			'menu':{to:'menu'}
		}
	});

	this.route('students',{
		layoutTemplate:'layout',
		yieldTemplates:{
			'sleft':{to:'left'},
			'menu':{to:'menu'}
		}
	});
	this.route('teachers',{
		layoutTemplate:'layout',
		yieldTemplates:{
			'tleft':{to:'left'},
			'menu':{to:'menu'}
		}
	});
	this.route('rooms',{
		layoutTemplate:'layout',
		notFoundTemplate:'notFound',
		yieldTemplates:{
			'rleft':{to:'left'},
			'menu':{to:'menu'}
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

Router.configure({
	layoutTemplate:'layout',
	notFoundTemplate:'notFound',
	loadingTemplate:'loading'
});