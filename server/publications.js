Meteor.publish("prayers", function() {
        return Prayers.find({});
});
