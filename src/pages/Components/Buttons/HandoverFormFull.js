import React from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "components/FormInputs/renderField";

class HandoverFormFull extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: false,
      thePackage: {},
      items: [],
      id: props.match.params.orderid
    };
  }
  // constructor() {
  //   super();
  //   this.state = {
  //     package: {}
  //   };
  // }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="card">
        <div className="header">
          <h4>Handover Package</h4>
        </div>
        <h2 className="text-center">{this.state.id}</h2>
        <div className="content">
          <form onSubmit={handleSubmit} className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-md-3">packageId</label>
              <div className="col-md-9">
                <Field
                  name="packageId"
                  placeholder="id of package"
                  type="text"
                  component={renderField}
                />
              </div>
            </div>

            {/* <div className="form-group">
              <label className="control-label col-md-3">sensorId</label>
              <div className="col-md-9">
                <Field
                  name="sensorId"
                  placeholder="id of sensor"
                  type="text"
                  component={renderField}
                />
              </div>
            </div> */}

            <legend>Details of receiving postman</legend>

            <div className="form-group">
              <label className="control-label col-md-3">Name</label>
              <div className="col-md-9">
                <Field
                  name="Receiving Postman "
                  placeholder="Receiving Postman"
                  type="text"
                  component={renderField}
                  // helpText="postman receiving the package"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-fill btn-info">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "formElements"
})(HandoverFormFull);
