//used to loop through an object in handlebars template when used with Ember
//usage:
// {{#eachProperty object}}
//   {{key}}: {{value}}<br/>
// {{/eachProperty }}
Ember.Handlebars.registerHelper('eachProperty', function(context, options) {
  var ret = "";
  var newContext = Ember.get(this, context);
  for(var prop in newContext)
  {
    if (newContext.hasOwnProperty(prop)) {
      ret = ret + options.fn({property:prop,value:newContext[prop]});
    }
  }
  return ret;
});


Ember.Handlebars.registerHelper('supportEmail', function(context, options) {
  return new Handlebars.SafeString( "<a href='mailto:support@gridkick.com'>Support</a>");
});

//{{questions.length}} {{pluralize questions.length s="Question"}}
//{{dog_count}} {{pluralize dog_count s="dog has" p="dogs have"}} gone for a walk.
Ember.Handlebars.registerBoundHelper('pluralize', function(number, opts) {
  var single = opts.hash['s'];
  Ember.assert('pluralize requires a singular string (s)', single);
  var plural = opts.hash['p'] || single + 's';
  return (number == 1) ? single : plural;
});