import React, { useEffect, useState } from "react";
import LicenseService from "../../services/licenseService";
import debug from "sabio-debug";
import toastr from "toastr";
import { Formik, Field, ErrorMessage, Form } from "formik";
import licenseValidationSchema from "../../schemas/licenseFormSchema";
import lookUpService from "../../services/lookUpService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./licensecard.css";

function LicenseForm() {
  const _logger = debug.extend("LicenseForm");
  const [initialValues, setInitialValues] = useState({
    id: 0,
    licenseStateId: 0,
    licenseNumber: "",
    dateAdmitted: "",
    isActive: true,
  });
  const [stateOptions, setStateOptions] = useState([]);

  const navigate = useNavigate();

  const params = useParams();

  const { id } = params;

  const location = useLocation();

  const { state } = location;

  useEffect(() => {
    lookUpService
      .getTypes(["States"])
      .then(onGetTypesSuccess)
      .catch(onGetTypesError);

    if (state?.type === "license_CARD") {
      const license = state.payload;
      setInitialValues((prevState) => {
        const newSt = { ...prevState };
        newSt.dateAdmitted = license.dateAdmitted.slice(0, 10);
        newSt.licenseNumber = license.licenseNumber;
        newSt.isActive = license.isActive;
        newSt.licenseStateId = license.state.id;
        return newSt;
      });
    }
  }, []);

  const onGetTypesSuccess = (data) => {
    setStateOptions(data.item.states);
  };

  const onGetTypesError = (err) => {
    _logger(err);
  };

  const stateMapper = stateOptions.map((state) => (
    <option key={state.id || state.abbreviation} value={state.id}>
      {state.name}
    </option>
  ));

  const handleSubmit = (values) => {
    const updatedInputs = {
      licenseStateId: Number(values.licenseStateId),
      licenseNumber: values.licenseNumber,
      dateAdmitted: values.dateAdmitted,
      isActive: Boolean(values.isActive),
    };

    if (id > 0) {
      LicenseService.editLicense(updatedInputs, id)
        .then(onEditLicenseSuccess)
        .catch(onEditLicenseError);
    } else {
      LicenseService.addLicense(updatedInputs)
        .then(onAddLicenseSuccess)
        .catch(onAddLicenseError);
    }
  };

  const onAddLicenseSuccess = (data) => {
    setInitialValues((prev) => {
      const itemId = { ...prev };
      itemId.id = data.item;
      return itemId;
    });
    toastr.success("License has uploaded");
    navigate(`/licenses`);
  };

  const onAddLicenseError = (err) => {
    _logger(err, initialValues);
    toastr.error("Something went wrong");
  };

  const onEditLicenseSuccess = (data) => {
    _logger(data);

    toastr.success("Edited Successfully");

    navigate(`/licenses`);
  };

  const onEditLicenseError = (err) => {
    _logger(err);
    toastr.error("something went wrong");
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={licenseValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="license-form-style">
            <div className="card license-form-card-style">
              <div className="col-md-6 license-form-state-style">
                <label htmlFor="licenseStateId" className="form-label">
                  State
                </label>
                <Field
                  as="select"
                  className={`form-control`}
                  id="licenseStateId"
                  name="licenseStateId"
                >
                  <option value="">Select a state...</option>
                  {stateMapper}
                </Field>
                <ErrorMessage name="licenseStateId" />
              </div>

              <div className="license-form-inputs-style">
                <label htmlFor="licenseNumber" className="licenseNumber">
                  License
                </label>
                <Field
                  className={`form-control`}
                  name="licenseNumber"
                  type="text"
                />
                <ErrorMessage name="licenseNumber" />
              </div>
              <div className="license-form-inputs-style">
                <label htmlFor="dateAdmitted" className="form-label">
                  dateAdmitted
                </label>
                <Field
                  className={`form-control`}
                  name="dateAdmitted"
                  type="date"
                />
                <ErrorMessage name="dateAdmitted" />
              </div>
              <div className="col-md-6">
                <label htmlFor="isActive" className="form-label">
                  Active
                </label>
                <Field
                  className="form-check-input"
                  type="checkbox"
                  name="isActive"
                />
                <ErrorMessage name="isActive" />
              </div>
              <div>
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
}
export default LicenseForm;
