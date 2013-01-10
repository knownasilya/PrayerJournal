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
        
        if( currentUser !== null ) {
            Prayers.insert({
                title: title.val(), 
                prayer: prayer.val(),
                user: currentUser });
            
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
    }
});

Template.main.mainTemplateIs = function (template) {
    return Session.get("currentMainTemplate") === template
}
    
Template.header.events({
    'click #pray' : function() {
        Session.set("currentMainTemplate", "newPrayer");
    }
});

Template.recentPrayers.prayers = function () {
    return Prayers.find({user: Meteor.userId()});
};

Template.recentPrayers.events({
    'keydown, click .recent' : function(event) {
        var prayerId = event.srcElement.id;
        Session.set("currentPrayer", prayerId);
        Session.set("currentMainTemplate", "aPrayer");
    }
});

Template.aPrayer.prayers = function () {
    return Prayers.find({_id: Session.get("currentPrayer")});
}

Template.aPrayer.events({
    'click input.saveAnswer' : function () {
        var answer = $("#answer");
        Prayers.update(
            {_id: Session.get("currentPrayer")},
            {$set: {answer: answer.val()}}
        );
        $("#answerForm").fadeOut();
    },
    
    'click #answerPrayer' : function () {
        $("#answerPrayer").fadeOut();
        var answerForm = $("#answerForm");
        answerForm.fadeIn();
    }
});

    