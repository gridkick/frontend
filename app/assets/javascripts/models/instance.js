var attr = Ember.attr, hasMany = Ember.hasMany, belongsTo = Ember.belongsTo;

App.Instance = Ember.Model.extend({
  id: attr(),
  createdAt: attr(Date),
  name: attr(),
  state: attr(),
  serviceSlug: attr(),
  availabilityZone: belongsTo('App.AvailabilityZone', {key: 'availability_zone_id'}),
  foreignInstanceData: hasMany('App.ForeignInstanceData', {key: 'foreign_instance_data', embedded: true})
});

App.ForeignInstanceData = Ember.Model.extend({
  id: attr(),
  host: attr(),
  port: attr(),
  name: attr(),
  username: attr(),
  password: attr(),
  type: attr(),
  connectionURI: function () {
    var type, uriStart, uriUserAndPass, uriHostAndPort;
    type = this.get("type") === "mongo" ? "mongodb" : this.get("type");

    uriStart = "%@://".fmt(type);
    uriUserAndPass = "";
    uriHostAndPort = "%@:%@".fmt(this.get("host"), this.get("port"));

    if(this.get("username") && this.get("password")) {
       uriUserAndPass = "%@:%@@".fmt(this.get("username"), this.get("password"));
    }

    return uriStart + uriUserAndPass + uriHostAndPort;

  }.property("type", "host", "port", "username", "password"),

  consoleConnection: function () {
    var client, host, port, user = "", pass = "", database = "", delim = " ";

    switch(this.get("type")) {
      case "mongo":
        client = "mongo";
        
        // host = "--host %@".fmt(this.get("host"));
        host = this.get("host") + ":" + this.get("port") + "/admin" 
        
        // port = "--port %@".fmt(this.get("port"));
        port = ""
        
        user = this.get("username") ? "-u %@".fmt(this.get("username")) : "";
        pass = this.get("password") ? "-p" : "";
        break;
      case "mysql":
        client = "mysql";
        host = "-h %@".fmt(this.get("host"));
        port = "-P %@".fmt(this.get("port"));
        user = this.get("username") ? "-u %@".fmt(this.get("username")) : "";
        pass = this.get("password") ? "-p" : "";
        break;
      case "postgres":
        client = "psql";
        host = "-h %@".fmt(this.get("host"));
        port = "-p %@".fmt(this.get("port"));
        user = this.get("username") ? "-U %@".fmt(this.get("username")) : "";
        pass = "";
        database = "-d postgres";
        break;
      case "redis":
        client = "redis-cli";
        host = "-h %@".fmt(this.get("host"));
        port = "-p %@".fmt(this.get("port"));
        user = "";
        pass = this.get("password") ? "-a" : "";
        break;
      default:
        break;
    }

    return [client, host, port, user, pass, database].join(" ");

  }.property("type", "host", "port", "username", "password"),

  uniqueId: function () {
    return this.get('id') + '-' + this.get('type');
  }.property('type', 'id')
});
App.ForeignInstanceData.primaryKey = 'uniqueId';

App.Instance.url = App.baseUrl + "/instances";
App.Instance.rootKey = 'instance';
App.Instance.collectionKey = 'instances';
App.Instance.camelizeKeys = true;
App.Instance.adapter = Ember.RESTAdapter.create();


