//Allows the sharejs package to access the document
this.Documents = new Mongo.Collection("documents");
if (Meteor.isClient) {
  //Updates the date session variable every sec
  Meteor.setInterval(function(){
    Session.set("currentDate", new Date());
  }, 1000);

  Template.display_date.helpers({
    currentDate: function(){
      return Session.get("currentDate");
    }
  });

  Template.editor.helpers({  
    docid: function(){
      var doc = Documents.findOne();
      if (doc)  
        return doc._id;
      else
        return undefined;
    },

    config: function () {
      return function(editor) {
        editor.setTheme('ace/theme/monokai');
    // editor.getSession().setMode('ace/mode/javascript');
    editor.getSession().setMode('ace/mode/html');
    editor.setShowPrintMargin(false);
    editor.getSession().setUseWrapMode(true);
  }
}

});
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(!Documents.findOne()){
      Documents.insert({title: "New document"});
    }
  });
}
