function Timer() {
  var config = new Config();
  
  // Sleep Function
  var sleep = function(milliseconds){
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++)
      if ((new Date().getTime() - start) > milliseconds)
        break;
  };
  
  /* Function quotaRequest(a, b, head) : Integer
   * Number of transfer per bucle
   * 
   * @param integer a => number of course
   * @param integer b => number of function per course
   * @param integer head => main function(courses.list)
   * 
   * @return integer => Total request
   */
  this.quotaRequest = function(a, b, head){
    return (a * b + head)
  };
  
  /* Object to data timer
   * start => new Date().getTime()
   * end => new Date().getTime()
   */
  this.data = {'start': 0, 'request': 0, 'end': 0, 'quotaRequest': 0};
  
  /* Function timer() : 
   * Timer by excessive quota
   * 
   * --- Beta ---
   */
  this.timerRequest = function(){
    if(config.debug) Logger.log('Init-' + this.data.start + ' End-' + this.data.end + ' rquest-' + this.data.request + ' Quota Request-' + this.data.quotaRequest);
    
    if(this.data.quotaRequest >= config.requestLimit)
    {
      if(this.data.request >= config.requestLimit)
      {
        var seconds = ((this.data.end - this.data.start) / 1000);   
        if(seconds <= config.timeLimit && seconds >= 0)
        {
          if(seconds == config.timeLimit)
            sleep(1100);
          else
            sleep(((config.timeLimit - seconds) * 1100));
          
          return true;
        }
      }
    }
  };
  
  // Timer Request Play 
  this.play = function(){
    var date = new Date();
    this.data.end = date.getTime();
  
    var timer = this.timerRequest() || false;
    date = null;
      
    if(timer){
      date = new Date();
        
      this.data.start = date.getTime();
      this.data.quotaRequest = this.data.quotaRequest - this.data.request;
      this.data.request = 0;
    }
  };
}
