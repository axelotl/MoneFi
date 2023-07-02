import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import "./users.css";
import toastr from "toastr";

import Select from "react-select";
import { updateUserStatus } from "services/userService";

function UserCard(props) {
  const _logger = debug.extend("UserList");
  const user = props.user;
  const [userStatus, setUserStatus] = useState({
    id: "",
    statusId: user.status.id,
    label: "",
    badgeColor: "",
  });

  const handleOptionClicked = (options) => {
    setUserStatus((prev) => {
      const newUserStatusValue = { ...prev };
      newUserStatusValue.statusId = options.value;
      newUserStatusValue.id = user.id;
      newUserStatusValue.label = options.label;

      return newUserStatusValue;
    });
  };

  useEffect(() => {
    setUserStatus((prev) => {
      const badge = { ...prev };
      switch (userStatus.statusId) {
        case 1:
          badge.badgeColor = "bg-success";
          break;
        case 2:
          badge.badgeColor = "bg-secondary";
          break;
        case 3:
          badge.badgeColor = "bg-info";
          break;
        case 4:
          badge.badgeColor = "bg-warning";
          break;
        default:
          badge.badgeColor = "bg-danger";
      }
      
      return badge;
    });
  }, [userStatus.statusId]);

  const onUpdateUserStatusSuccess = (response) => {
    toastr.success("User Status Updated", response);
  };

  const onUpdateUserStatusError = (err) => {
    toastr.error("User was not Updated ");
    _logger(err);
  };

  useEffect(() => {
    if (userStatus.id !== "") {
      updateUserStatus(userStatus.statusId, userStatus.id)
        .then(onUpdateUserStatusSuccess)
        .catch(onUpdateUserStatusError);
    }
  }, [userStatus.statusId]);

  return (
    <div className="col-md-3 text-center position-relative">
      <div className="card user-card-style">
        <img
          src={user.avatarUrl}
          className="card-img-top user-card-img-style"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{user.email}</h5>
          <h4>
            {user.firstName} {user.mi} {user.lastName}
          </h4>
          <Select options={props.status} onChange={handleOptionClicked} />
        </div>
      </div>{" "}
      <span
        className={`badge rounded-pill  ${userStatus.badgeColor} user-card-badge-style position-absolute `}
      >
        {userStatus.label ? userStatus.label : user.status.name}
      </span>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    mi: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  status: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
export default UserCard;
