import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk} from '../../store/thunks'; 

class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          student: this.props.student,
          studentId: this.props.match.params.id,
          redirect: false, 
          redirectId: null,
        };
    }
    
    componentDidMount() {
        this.props.fetchStudent(this.state.studentId);
    }
    
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
      event.preventDefault();
      let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        gpa: this.state.gpa,
        email: this.state.email,
        imageURL: this.state.imageURL,
        id: this.state.studentId
      };

        if (typeof student.imageURL === undefined) {
          student.imageURL = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
        }

        let newStudent = await this.props.editStudent(student);


        console.log("new student: ", newStudent)
        this.setState({
          firstname: "", 
          lastname: "", 
          imageURL: "",
          email: "",
          gpa: "",
          campusId: null, 
          redirectId: this.state.studentId,
          redirect: true 
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
      if(this.state.redirect) {
        return (<Redirect to={`/student/${this.state.redirectId}`}/>)
      }
        return (
          <EditStudentView 
            studentInfo = {this.state}
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}      
          />
        );
    }
}

const mapState = (state) => {
    return {
      student: state.student,
    };
  };
  

const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

EditStudentContainer.propTypes = {
    fetchStudent: PropTypes.func.isRequired,
    editStudent: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(EditStudentContainer);