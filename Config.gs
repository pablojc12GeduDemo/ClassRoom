function Config() {
  // mode (true = debug, false = live)
  this.debug = false; 
  
  // Timer Setting
  this.requestLimit = 500; // Requests max limit (500 according to API)
  this.timeLimit = 100; // Seconds limit for each request (100 according to API)
  
  /**
   * It can be an identifier or the email of who creates the class;
   * value "me" : this returns the ID of the user who sends the request to create the class => Default Value
   *
   * @value string ownerId => unique user identifier
   */
  this.ownerId = "me";
}
