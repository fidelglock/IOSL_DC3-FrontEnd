import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';

const FormElements = () => (
  <div className="card">
    <div className="header">
      <h4>Register New Package</h4>
    </div>
    <div className="content">
      <form onSubmit={console.log("done")} className="form-horizontal">

        <legend>Pickup Address</legend>

        <div className="form-group">
          <label className="control-label col-md-3">Name</label>
          <div className="col-md-9">
            <Field
              name="Sender Name"
              placeholder = "Joh Doe"
              type="text"
              component={renderField} 
              helpText="as appear on your Mailbox" /> 
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">country</label>
          <div className="col-md-9">
            <Field
              name="withHelp"
              type="text"
              placeholder = "Germany"
              component={renderField} />
              {/* helpText="A block of help text that breaks onto a new line." /> */}
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">street</label>
          <div className="col-md-9">
            <Field
              name="street"
              placeholder = "berlinstr.88"
              type="text"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">zip</label>
          <div className="col-md-9">
            <Field
              name="zip"
              placeholder = "10235"
              type="text"
              component={renderField} />
          </div>
        </div>


      <legend>Destenation Address</legend>

        <div className="form-group">
          <label className="control-label col-md-3">Name</label>
          <div className="col-md-9">
            <Field
              name="dSender Name"
              placeholder = "Joh Doe"
              type="text"
              component={renderField} 
              helpText="as appear on reciever Mailbox" /> 
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">country</label>
          <div className="col-md-9">
            <Field
              name="dcountry"
              type="text"
              placeholder = "Germany"
              component={renderField} />
              {/* helpText="A block of help text that breaks onto a new line." /> */}
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">street</label>
          <div className="col-md-9">
            <Field
              name="dstreet"
              placeholder = "berlinstr.88"
              type="text"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">zip</label>
          <div className="col-md-9">
            <Field
              name="dzip"
              placeholder = "10235"
              type="text"
              component={renderField} />
          </div>
        </div>

        {/* <div className="form-group">
          <label className="control-label col-md-3">Password</label>
          <div className="col-md-9">
            <Field
              name="password"
              type="password"
              component={renderField} />
          </div>
        </div> */}

        {/* <div className="form-group">
          <label className="control-label col-md-3">Placeholder</label>
          <div className="col-md-9">
            <Field
              name="placeholder"
              type="text"
              placeholder="placeholder"
              component={renderField} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Disabled</label>
          <div className="col-md-9">
            <Field
              name="disabled"
              type="text"
              placeholder="This input is disabled"
              disabled={true}
              component={renderField} />
          </div>
        </div> */}

        <legend>Sensors</legend>

        <div className="form-group">
          <label className="control-label col-md-3">Sensors</label>
          <div className="col-md-9 checkbox-group">
            <Field
              name="checkbox1"
              type="checkbox"
              label="Heat Sensor"
              component={renderField} />

            <Field
              name="checkbox2"
              type="checkbox"
              label="Pressure Sensors"
              component={renderField} />

            {/* <Field
              name="radioGroup"
              type="radio"
              label="Male"
              value="male"
              component={renderField} />

            <Field
              name="radioGroup"
              type="radio"
              label="Female"
              value="female"
              component={renderField} /> */}
          </div>
        </div>

        {/* <div className="form-group">
          <label className="control-label col-md-3">Inline checkboxs</label>
          <div className="col-md-9 checkbox-group">
            <Field
              name="a"
              type="checkbox"
              label="a"
              component={renderField} />
            <Field
              name="b"
              type="checkbox"
              label="b"
              component={renderField} />
            <Field
              name="c"
              type="checkbox"
              label="c"
              component={renderField} />
          </div>
        </div> */}

        {/* <fieldset>
          <legend>Input variants</legend>
          <label className="col-sm-2 control-label">Custom Checkboxes & radios</label>
          <div className="col-sm-4 col-sm-offset-1 checkbox-group">
            <Field
              name="unchecked"
              type="checkbox"
              label="Unchecked"
              component={renderField} />

            <Field
              name="checked"
              type="checkbox"
              label="Checked"
              component={renderField} />

            <Field
              name="disabledUnchecked"
              type="checkbox"
              label="Disabled Unchecked"
              disabled
              component={renderField} />

            <Field
              name="disabledChecked"
              type="checkbox"
              label="Disabled Checked"
              disabled
              component={renderField} />
          </div>

          <div className="col-sm-5 radio-group">
            <Field
              name="radioOnOff"
              type="radio"
              label="Radio is off"
              value="off"
              component={renderField} />

            <Field
              name="radioOnOff"
              type="radio"
              label="Radio is on"
              value="on"
              component={renderField} />

            <Field
              name="radioDisabledOnOff"
              type="radio"
              label="Disabled Unchecked"
              value="off"
              disabled
              component={renderField} />

            <Field
              name="radioDisabledOnOff"
              type="radio"
              label="Disabled Checked"
              value="on"
              disabled
              component={renderField} />

          </div>
        </fieldset> */}
        <button type="submit" className="btn btn-fill btn-info">Submit</button>
      </form>
    </div>
  </div>
);

export default reduxForm({
  form: 'formElements'
})(FormElements);