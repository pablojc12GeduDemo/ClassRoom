function Access() {
  // Object function Config()
  var config = new Config();
  // Object function Props()
  var timer = new Timer();
  
  try{
  //----------------------------------- Create Course --------------------------------
    /** Public function
      * Function create({name, section, descriptionHeading, description, room, courseState}) : {course}
      * Create Course
      *
      * @param object {
      *     param in object string name               : Optional - default 'defaultCreateClassByAPI'
      *     param in object string section            : Optional - default ''
      *     param in object string descriptionHeading : Optional - default ''
      *     param in object string description        : Optional - default ''
      *     param in object string room               : Optional - default ''
      *     param in object string courseState        : Optional - default 'PROVISIONED'
      *     param in object string ownerId            : Optional - default 'me'
      * }
      * 
      * @return object {course}
      */ 
    this.create = function(params){
      var course = new Classroom.newCourse();
      
      course.name = params.name || 'defaultCreateClassByAPI';
      course.section = params.section || '';
      course.descriptionHeading = params.descriptionHeading || '';
      course.description= params.description || '';
      course.room = params.room || '';
      course.ownerId = params.ownerId || config.ownerId;
      course.courseState = courseState || 'PROVISIONED';
    
      course = Classroom.Courses.create(course); // quota request
    
      if(course.id !== "")
        if(config.debug) Logger.log(course); else return course;
      else
        throw ('La clase con el nombre: ' + name + ', no me fue posible crearla');
    };
  //----------------------------------- List Courses --------------------------------
    /** -- Public Function --
     * Function list() : {list}
     * List Courses
     *
     * @return array [{name, id, description, url}, ...] or false
     */
    this.list = function(){
      var date = new Date();
      timer.data.start = date.getTime();
      
      timer.data.request ++;
      var response = Classroom.Courses.list(); // main quota request
      
      var courses = response.courses;
      var lengthCourses = courses.length;
      var list = [];
      
      timer.data.quotaRequest = timer.quotaRequest(lengthCourses, 3, 1);
      timer.play();
      
      // if courses return array
      // else return boolean false
      if (courses && courses.length > 0) {
        for (i = 0; i < lengthCourses; i++) {
          var course = courses[i];
          list.push({'name': course.name, 
                    'id': course.id, 
                    'description': course.description,
                    'url': course.alternateLink,
                    'courseState': course.courseState,
                    'students': getStudents(course.id), // quota request
                    'aliases': getAliases(course.id),   // quota request
                    'teachers': getTeachers(course.id)  // quota request
                    });
        }
        if(config.debug) Logger.log(list); else return list;
      } else {
        var result = false;
        if(config.debug) Logger.log(result); else return result;
      }
    };
    
    
    //-------------------------------------------------------------------------
    //  Requests Structure (Bucle) -- Function List() supporting feature -- Private functions
    
    // Get a list of Students per course
    var getStudents = function(courseId){
      timer.data.request ++;
      var list = Classroom.Courses.Students.list(courseId);
      
      timer.play();// Timer Request
      return list.students || {};
    };
    
    // Get a list of Aliases per course
    var getAliases = function(courseId){
      timer.data.request ++;
      var list = Classroom.Courses.Aliases.list(courseId);
      
      timer.play(); // Timer Request
      return list.aliases || {};
    };
    
    // Get a list of Teachers per course
    var getTeachers = function(courseId){
      timer.data.request ++;
      var list = Classroom.Courses.Teachers.list(courseId);
      
      timer.play(); // Timer Request
      return list.teachers || {};
    };
  //-------------------------------------------------------------------------
  // Error Detail
  }catch(err){
    if(config.debug) 
      Logger.log(err); 
    else 
      return err;
  }
}
