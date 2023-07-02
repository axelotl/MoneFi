import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { useNavigate } from "react-router-dom";
import "./licensecard.css";

function LicenseCard(props) {
  const _logger = debug.extend("Licenses");
  _logger(props.license, "over here card");
  const license = props.license;
  const navigate = useNavigate();

  const onEditClicked = () => {
    var startCard = {
      type: "license_CARD",
      payload: license,
    };
    navigate(`/license/${license.id}/edit`, { state: startCard });
  };

  return (
    <div className="col-md-3 text-center">
      <div className="card license-card-style">
        <img
          src={license.createdBy.avatarUrl}
          className="card-img-top license-card-img-style"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {license.createdBy.firstName} {license.createdBy.mi}{" "}
            {license.createdBy.lastName}
          </h5>
          <h4>{license.licenseNumber}</h4>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {license.state.code}
          </h6>
          <p className="card-text">{license.state.name}</p>
          <button onClick={onEditClicked} className="btn btn-primary">
            edit
          </button>
        </div>
      </div>
    </div>
  );
}
LicenseCard.propTypes = {
  license: PropTypes.shape({
    id: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
    licenseNumber: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
  }).isRequired,
};
export default LicenseCard;
