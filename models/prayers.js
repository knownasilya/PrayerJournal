
/* 
 * Each Prayer is represented by a document in the Prayers Collection:
 *   owner: user id
 *   prayer: The owners prayer
 *   answer: God's answer
 *   public: boolean
 *   shared_with: Array of Users, only if not public
 *   date_created: Date
 *   date_answered: Date
 *   estimated_duration: Time
 */
Prayers = new Meteor.Collection( "prayers" );
Needs = new Meteor.Collection( "needs" );

Prayers.allow({
  insert: function ( options ) {
      console.log("in insert");
    return true; // Use createPrayer to insert
  },
  update: function ( userId, prayer, answer ) {
    return checkUser( userId, prayer );
  },
  remove: function ( userId, prayer ) {
    return checkUser( userId, prayer );
  }
});

Meteor.methods({
  createPrayer: function ( userId, title, prayer, visibility ) {
    if( !( userId.length > 0 && title.length > 0 
       && prayer.length > 0 ) ) {
        throw new Meteor.Error(400, "Required parameter missing");
    }
      
    if( userId === Meteor.userId() ) {
      Prayers.insert({
        owner: userId,
        title: title,
        prayer: prayer,
        public: visibility
      });
    }
  }
});

var checkUser = function ( userId, prayer ) {
  if( userId !== prayer.owner ) {
    return false;
  }
  return true;
}




