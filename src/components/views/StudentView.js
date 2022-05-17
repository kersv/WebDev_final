/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <img width="10%" height="10%" alt="student" src={student.imgURL}/>
      <h1>{student.firstname + " " + student.lastname}</h1>
      {student.campus === null ?
      <h3>Not Enrolled</h3>
      : <Link to={`/campus/${student.campus.id}`}>
        <h3>{student.campus.name}</h3>
        </Link>
        }
        <h3>Email: {student.email}</h3>
        <h3>GPA: {student.gpa}</h3>
        <br/>
      <Link to ={'/students'}>Back</Link>
    </div>
  );

};

export default StudentView;