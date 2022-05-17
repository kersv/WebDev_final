import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk} from '../../store/thunks';

class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          campus: this.props.campus,
          campusId: this.props.match.params.id,
          redirect: false, 
          redirectId: null,
        };
    }

    componentDidMount() {
        this.props.fetchCampus(this.state.campusId);
    }


    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        let campus = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            imageURL: this.state.imageURL,
            id: this.state.campusId
        };

        if (typeof campus.imageURL === undefined) {
            campus.imageURL = "https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_1280.png"
          }

          let newCampus = await this.props.editCampus(campus);
          this.setState({
            name: "", 
            description: "", 
            address: "",
            imageURL: "", 
            redirectId: this.state.campusId,
            redirect: true
          });
        }

        componentWillUnmount() {
            this.setState({redirect: false, redirectId: null});
        }

        render() {
            if(this.state.redirect) {
              return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
            }
            return (
                <EditCampusView 
                campusInfo = {this.state}
                handleChange = {this.handleChange} 
                handleSubmit={this.handleSubmit}      
                />
            );
          }
      }

      const mapState = (state) => {
        return {
          campus: state.campus,
        };
      };

      const mapDispatch = (dispatch) => {
        return({
            fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
            editCampus: (campus) => dispatch(editCampusThunk(campus)),
        })
    }

    EditCampusContainer.propTypes = {
        fetchCampus: PropTypes.func.isRequired,
        editCampus: PropTypes.func.isRequired,
    };

    export default connect(mapState, mapDispatch)(EditCampusContainer);