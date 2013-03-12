Template.newPrayer.title = function() {
    return "Pray";
};

// New Prayer
Template.newPrayer.events({
    'click input.save' : function() {            
        var title = $("#prayer_title");
        var prayer = $("#prayer");
        var preview_container = $("#prayer_preview");
        var currentUser = Meteor.userId();
        
        if( currentUser !== null ) {
            Meteor.call( "createPrayer", currentUser, 
                title.val(),
                prayer.val(),
                false );
            
            title.val('');
            prayer.val('');
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

/* Replace with this: https://github.com/erobit/meteor-accounts-ui-bootstrap-dropdown */


Template.recentPrayers.prayers = function () {
    return Prayers.find({owner: Meteor.userId()});
};

Template.recentPrayers.events({
    'keydown, click .recent' : function(event) {
        var prayerId = event.srcElement.id;
        $(event.srcElement).parent().parent().find("li").removeClass("active");
        $(event.srcElement).parent().addClass("active");
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

    