const Student = require("../model/student");

exports.insertRollNumber = (req, res) => {
  const data = req.body.data;
 
  Student.insertMany(data).then((result) => {
    res
      .status(200)
      .json({
        status: true,
        result: result
      })
      .catch((err) => {
        res.json({
          error: err
        });
      });
  });
};

exports.getRollnumber = (req, res) => {
  const roll = req.query.roll;

  Student.find({ rollNumber: roll })
    .then((result) => {
      if (result[0].rollNumber === roll) {
        res.send("Pass");
      }
    })
    .catch((err) => {
      res.send("Fails");
    });
};
