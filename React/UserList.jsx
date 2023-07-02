import React, { useEffect, useState } from "react";
import debug from "sabio-debug";
import { getAllSearchUsers, getAll } from "../../services/userService";
import Pagination from "rc-pagination";
import lookUpService from "../../services/lookUpService";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import UserCard from "./UserCard";
import "./users.css";
import { Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import toastr from "toastr";

function UserList() {
  const [pageValue, setPageValue] = useState({
    userAr: [],
    userComponents: [],
    pageIndex: 0,
    current: 1,
    pageSize: 12,
    totalCount: 0,
  });

  const [searchUser, setSearchUser] = useState("");

  const [statusOptions, setStatusOptions] = useState([]);

  const _logger = debug.extend("UserList");

  useEffect(() => {
    lookUpService
      .getTypes(["StatusTypes"])
      .then(onGetTypesSuccess)
      .catch(onGetTypesError);
  }, []);

  useEffect(() => {
    if (searchUser === "") {
      getAll(pageValue.pageIndex, pageValue.pageSize)
        .then(onGetAllUserSuccess)
        .catch(onGetAllUserError);
    } else {
      getAllSearchUsers(pageValue.pageIndex, pageValue.pageSize, searchUser)
        .then(onGetAllUserSuccess)
        .catch(onSearchError);
    }
  }, [pageValue.pageIndex, statusOptions.length]);

  

  const onGetTypesSuccess = (data) => {
    const userStatusOptionsMapped = data.item.statusTypes.map(
      userStatusOptionMapper
    );
    setStatusOptions((prev) => {
      var newStatus = { ...prev };
      newStatus = userStatusOptionsMapped;
      return newStatus;
    });
  };

  const onGetTypesError = (err) => {
    toastr.error("Unable to get status types");
    _logger(err);
  };

  const userStatusOptionMapper = (statusObject) => {
    return {
      value: statusObject.id,
      label: statusObject.name,
    };
  };

  const handleSearch = (e) => {
    setSearchUser(e.target.value);
  };

  const onSearchClicked = (e) => {
    e.preventDefault();

    if (searchUser === "") {
      return getAll(pageValue.pageIndex, pageValue.pageSize)
        .then(onGetAllUserSuccess)
        .catch(onGetAllUserError);
    } else {
      return getAllSearchUsers(
        pageValue.pageIndex,
        pageValue.pageSize,
        searchUser
      )
        .then(onGetAllUserSuccess)
        .catch(onSearchError);
    }
  };

  const onSearchError = (err) => {
    toastr.error("User was not found ");
    _logger(err);
  };

  const onGetAllUserSuccess = (response) => {
    setPageValue((prev) => {
      const newValues = { ...prev };
      newValues.totalCount = response.item.totalCount;
      newValues.userAr = response.item.pagedItems;
      newValues.userComponents = newValues.userAr.map(userMapper);

      return newValues;
    });
  };

  const onGetAllUserError = (err) => {
    toastr.error("Unable to Retrieve users");
    _logger(err);
  };

  const userMapper = (user) => {
    return <UserCard key={user.id} user={user} status={statusOptions} />;
  };

  const handlePageChange = (page) => {
    setPageValue((prevState) => {
      return {
        ...prevState,
        current: page,
        pageIndex: page - 1,
      };
    });
  };

  return (
    <React.Fragment>
      {" "}
      <Row>
        <Col md={3} className="user-list-search-col-style">
          <input
            name="search"
            type="search"
            className="form-control user-list-search-style"
            id="exampleFormControlInput1"
            placeholder="Search user"
            onChange={handleSearch}
          />{" "}
        </Col>
        <Col md={2} className="user-list-searchbtn-col-style">
          <span onClick={onSearchClicked} className="user-list-searchbtn-style">
            <Icon onclick path={mdiMagnify} size={2} />
          </span>
        </Col>
        <Col md={3} className="user-list-pag1-style">
          <Pagination
            className="pb-3 pt-5"
            onChange={handlePageChange}
            current={pageValue.pageIndex + 1}
            total={pageValue.totalCount}
            pageSize={pageValue.pageSize}
            locale={locale}
          />
        </Col>{" "}
      </Row>{" "}
      <div className="row">{pageValue.userComponents}</div>
      <div className="user-list-pag2-style">
        <Pagination
          className="pb-3 pt-3 "
          onChange={handlePageChange}
          current={pageValue.pageIndex + 1}
          total={pageValue.totalCount}
          pageSize={pageValue.pageSize}
          locale={locale}
        />
      </div>
    </React.Fragment>
  );
}
export default UserList;
