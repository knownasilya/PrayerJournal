Meteor.autosubscribe( function () {
    Meteor.subscribe( "prayers" );
    Meteor.subscribe( "needs" );
});
