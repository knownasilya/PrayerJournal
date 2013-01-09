//Prayers = new Meteor.Collection("prayers");

// CLIENT

if (Meteor.isClient) {
    Template.newPrayer.title = function() {
        return "Have something on your mind today? Write a prayer :)";
    };

    // New Prayer
    Template.newPrayer.events({
        'click input.save' : function() {            
            var title = $("#prayer_title");
            var prayer = $("#prayer");
            var form = $("#new_prayer");
            var preview = $(".preview_text");
            var preview_container = $("#prayer_preview");
            var currentUser = Meteor.userId();
            
//            console.log(title.val());
//            console.log(prayer.val());
            if( currentUser !== null ) {
                Prayers.insert({
                    title: title.val(), 
                    prayer: prayer.val(),
                    user: currentUser });
//                form.fadeOut();
                title.val('');
                prayer.val('');
                preview.text('');
                preview_container.fadeOut();
            }
        },
        'keyup #prayer' : function() {
            var preview_container = $("#prayer_preview");
            preview_container.fadeIn();
            var preview_formatted = prayer.value.replace(/\n/g,'<br/>');
            $(".preview_text").html(preview_formatted);
        },
        'click #pray' : function() {
            Session.set("currentMainTemplate", "newPrayer");
        }
    });
    
    Template.recentPrayers.prayers = function () {
        return Prayers.find({user: Meteor.userId()});
    };
    
    Template.recentPrayers.events({
        'keydown, click .recent' : function(event) {
            Session.set("currentMainTemplate", "aPrayer");
            var prayerId = event.srcElement.id;
            Session.set("currentPrayer", prayerId);
//            var form = $("#new_prayer");
//            var preview_container = $("#prayer_preview");
            
//            form.fadeOut();
//            preview_container.fadeOut();
            
            Template.aPrayer = function () {
                if (Session.equals("currentMainTemplate", "aPrayer")) {            
                    return Prayers.find({_id: prayerId});
                }
            }
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
