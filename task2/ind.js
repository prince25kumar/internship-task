async.waterfall(
    [
        function(callback) {
          Student.find({ "status": "student" },{ "_id": 1 },callback);
        },
        function(students,callback) {
            WorksnapsTimeEntry.find({

                "student": { "$in": students.map(function(el) {
                    return el._id
                })
            },callback);
        }
    ],
    function(err,results) {
       if (err) {
          // do something
       } else {
          // results are the matching entries
       }
    }
)

WorksnapsTimeEntry.find().populate({
    "path": "student",
    "match": { "status": "student" }
}).exec(function(err,entries) {
   // Now client side filter un-matched results
   entries = entries.filter(function(entry) {
       return entry.student != null;
   });
   // Anything not populated by the query condition is now removed
});