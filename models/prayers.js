
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
  insert: function ( userId, prayer ) {
    return false; // Use createPrayer to insert
  },
  update: function ( userId, prayer, answer ) {
    return checkUser( userId, prayer );
  },
  remove: function ( userId, prayer ) {
    return checkUser( userId, prayer );
  }
});

var checkUser = function ( userId, prayer ) {
  if( userId !== prayer.owner ) {
    return false;
  }
  return true;
}


