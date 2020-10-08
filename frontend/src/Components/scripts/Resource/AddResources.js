import React, { Component } from "react";
import { connect } from "react-redux";
import { onAddingResource } from "../../Redux/Resources/ResourceAction";
import { withRouter } from "react-router-dom";
import { Button, Typography ,TextField} from "@material-ui/core";
class AddResources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      std: "",
      board: "",
      subject: "",
      title: "",
      description: "",
    };
  }

  onFileChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onFileSubmit = () => {
    const {std,board,subject,description,title} = this.state
    const newResource = {
      std,
      board,
      subject,
      title,
    };
    console.log(newResource)
    this.props.onAddingResource(this.state.selectedFile, newResource);
  };

  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render() {
    const {std,board,subject,description,title} = this.state
    return (
      <div>
        <form  noValidate autoComplete="off">
          <TextField id="standard-basic" label="Standard" name="std" value={std} onChange={this._onHandleChange} />
          <TextField id="standard-basic" label="Standard" name="board" value={board} onChange={this._onHandleChange} />
          <TextField id="standard-basic" label="Standard" name="subject" value={subject} onChange={this._onHandleChange} />
          <TextField id="standard-basic" label="Standard" name="title" value={title} onChange={this._onHandleChange} />
          <TextField id="standard-basic" label="Standard" name="description" value={description} onChange={this._onHandleChange} />
        </form>
        {console.log(this.state.selectedFile)}
        {this.state.selectedFile ? (
          <div>
            <Typography variant="body2">
              {this.state.selectedFile.name}
            </Typography>
            <Button
              color="primary"
              size="large"
              variant="contained"
              component="label"
              onClick={this.onFileSubmit}
            >
              Submit
            </Button>
          </div>
        ) : (
          <Button
            color="primary"
            size="large"
            variant="contained"
            component="label"
          >
            Upload
            <input
              type="file"
              onChange={this.onFileChange}
              style={{ display: "none" }}
            />
          </Button>
        )}
      </div>
    );
  }
}

export default connect(null, { onAddingResource })(withRouter(AddResources));
