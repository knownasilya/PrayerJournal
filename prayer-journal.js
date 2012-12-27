Prayers = new Meteor.Collection("prayers");

// CLIENT

if (Meteor.isClient) {
    Template.new_prayer.title = function() {
        return "Have something on your mind today? Write a prayer :)";
    };

    // New Prayer
    Template.new_prayer.events({
        'click input.save' : function() {            
            var title = $("#prayer_title");
            var prayer = $("#prayer");
            var form = $("#new_prayer");
            var preview = $(".preview_text");
            var preview_container = $("#prayer_preview");

            
//            console.log(title.val());
//            console.log(prayer.val());
            
            Prayers.insert({
                title: title.val(), 
                prayer: prayer.val()});
//            form.fadeOut();
            title.val('');
            prayer.val('');
            preview.text('');
            preview_container.fadeOut();
        },
        'keyup #prayer' : function() {
            var preview_container = $("#prayer_preview");
            preview_container.fadeIn();
            $(".preview_text").text(prayer.value);
        }
    });
    
    Template.recent_prayers.prayers = function () {
        return Prayers.find({});
    };
    
    Template.recent_prayers.events({
        'keydown, click .recent' : function(event) {
            console.log(event.srcElement.id);
            var form = $("#new_prayer");
            var preview_container = $("#prayer_preview");
            
            form.fadeOut();
            preview_container.fadeOut();
            
        }
    });
        
    
    Meteor.autosubscribe(function() {
        Meteor.subscribe("prayers");
    });
}



// SERVER

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
    
    Meteor.publish("prayers", function() {
        return Prayers.find({});
    });
}
