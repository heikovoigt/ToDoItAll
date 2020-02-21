// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DateTimePicker } from "material-ui-pickers";

// Custom Actions


// START IMPORT ACTIONS
import ToDoActions from "../redux/actions/ToDoActions";

// END IMPORT ACTIONS

/** APIs

* actionsToDo.create
*	@description CRUD ACTION create
*
* actionsToDo.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsToDo.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*

**/

class ToDoEdit extends Component {
  // Init todo
  constructor(props) {
    super(props);
    this.state = {
      todo: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsToDo.loadToDo(this.props.match.params.id);
    }
    
  }

  // Insert props todo in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      todo: props.todo
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.todo._id) {
      this.props.actionsToDo.saveToDo(this.state.todo).then(data => {
        this.props.history.push("/todos/");
      });
    } else {
      this.props.actionsToDo.createToDo(this.state.todo).then(data => {
        this.props.history.push("/todos/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>ToDo Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          
          <TextField
            id="Body"
            label="Body"
            value={this.state.todo.Body || ""}
            onChange={Utils.handleChange.bind(this, "todo")}
            margin="normal"
            fullWidth
          />
          
          <DateTimePicker
            id="duedate"
            label="Duedate"
            className="mt-20 mb-20"
            ampm={false}
            value={
              this.state.todo.duedate
                ? new Date(this.state.todo.duedate)
                : null
            }
            onChange={Utils.handleChangeDate.bind(this, "todo", "duedate")}
            fullWidth
            autoOk
            disableFuture
            required
            {...(!this.state.todo.duedate && this.state.todo.duedate === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="responsible"
            label="Responsible"
            value={this.state.todo.responsible || ""}
            onChange={Utils.handleChange.bind(this, "todo")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.todo.responsible && this.state.todo.responsible === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="subject"
            label="Subject"
            value={this.state.todo.subject || ""}
            onChange={Utils.handleChange.bind(this, "todo")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.todo.subject && this.state.todo.subject === ""
              ? { error: true }
              : {})}
          />
          

          {/* Footer */}
          <div className="footer-card">
            <Link to="/todos/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsToDo: bindActionCreators(ToDoActions, dispatch),
  };
};

// Validate types
ToDoEdit.propTypes = { 
  actionsToDo: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    todo: state.ToDoEditReducer.todo
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoEdit);
