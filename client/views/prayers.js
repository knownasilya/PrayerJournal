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
    },
});

Template.newPrayer.rendered = function () {
  clearRecentPrayersSelection();
}

Template.main.mainTemplateIs = function (template) {
    return Session.get("currentMainTemplate") === template
}

/* Replace with this: https://github.com/erobit/meteor-accounts-ui-bootstrap-dropdown */


Template.recentPrayers.prayers = function () {
    return Prayers.find({owner: Meteor.userId()});
};

Template.recentPrayers.events({
    'keydown, click a' : function(event) {
        var $this = $(event.target),
          prayerId = $this[0].id,
          $li = $this.closest("li");

        clearRecentPrayersSelection();
        $this.parent().addClass("active");
        Session.set("currentPrayer", prayerId);
        Session.set("currentMainTemplate", "aPrayer");
    },
    'click #pray' : function() {
        Session.set("currentMainTemplate", "newPrayer");
        // clearRecentPrayersSelection();
    }
});

Template.aPrayer.prayers = function () {
    return Prayers.find({_id: Session.get("currentPrayer")});
}

Template.aPrayer.events({
    'click input.save-answer' : function () {
        var answer = $("#answer-form textarea");
        Prayers.update(
            {_id: Session.get("currentPrayer")},
            {$set: {answer: answer.val()}}
        );
        $("#answer-form").fadeOut();
    },
    
    'click #answer-prayer' : function () {
        $("#answer-prayer").fadeOut();
        var answerForm = $("#answerForm");
        answerForm.fadeIn();
    },

    'click #delete-prayer': function () {
        var id = Session.get("currentPrayer");
        Prayers.remove(this._id);
        Meteor.call( "deletePrayer", Meteor.userId(), id );
    }
});

function clearRecentPrayersSelection() {
  $(".recent li").removeClass("active");
}

    