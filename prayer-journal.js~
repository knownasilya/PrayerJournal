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
            var preview_formatted = prayer.value.replace(/\n/g,'<br/>');
            $(".preview_text").html(preview_formatted);
        },
        'click #pray' : function() {
            $("#main").html("");
            var title = $("#prayer_title").fadeIn();
            var prayer = $("#prayer").fadeIn();
            var form = $("#new_prayer").fadeIn();
            var preview = $(".preview_text").fadeIn();
            var preview_container = $("#prayer_preview").fadeIn();
        }
    });
    
    Template.recent_prayers.prayers = function () {
        return Prayers.find({});
    };
    
    Template.recent_prayers.events({
        'keydown, click .recent' : function(event) {
            var prayer_id = event.srcElement.id;
            var form = $("#new_prayer");
            var preview_container = $("#prayer_preview");
            
            form.fadeOut();
            preview_container.fadeOut();
            // insert the content            
            var content = Prayers.find({_id: prayer_id}).fetch();
            var content_prayer = "<p>" + content[0].prayer + "</p>";
            var content_title = "<h1>" + content[0].title + "</h1>";
            $("#main").html(content_title + content_prayer);
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
