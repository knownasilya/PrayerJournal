Meteor.publish( "prayers", function () {
        return Prayers.find();
});

Meteor.publish( "needs", function () {
        return Needs.find();
})
