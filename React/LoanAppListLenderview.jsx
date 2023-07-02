import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import debug from "sabio-debug";
import lookUpService from "services/lookUpService";
import loanAppsService from "../../services/loanApplicationsService";
import LoanAppCardTemplate from "./LoanAppCardList";
import toastr from "toastr";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";

const _logger = debug.extend("LoanAppListViewMore");

function LoanAppListLenderView() {
  _logger("Firing");

  const [pageData, setPageData] = useState({
    arrayOfApps: [],
    arrayOfAppsComponents: [],
    loanTypeId: 0,
    arrayOfLoanTypes: [],
    arrayOfLoanTypesComponents: [],
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });
  const [searchUser, setSearchUser] = useState("");

  const onPageChange = (page) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.pageIndex = page - 1;
      return newState;
    });
  };

  const mappingApplications = (aApplication) => {
    _logger("Application:", aApplication.id);
    return (
      <LoanAppCardTemplate
        app={aApplication}
        key={"Application" + aApplication.id}
      />
    );
  };

  function mapLoanTypes(loan) {
    _logger("loan", loan);
    return (
      <option key={loan.id} name={loan.name} value={loan.id}>
        {loan.name}
      </option>
    );
  }
  useEffect(() => {
    loanAppsService
      .getLoanApps(pageData.pageIndex, pageData.pageSize)
      .then(onGetLoanAppsSuccess)
      .catch(onGetLoanAppsError);
  }, [pageData.pageIndex]);

  useEffect(() => {
    lookUpService
      .getTypes3Col(["LoanTypes"])
      .then(onGetTypes3ColSuccess)
      .catch(onGetTypes3ColError);
  }, []);

  const onGetTypes3ColSuccess = (data) => {
    _logger("LoanTypes3Col:", data);
    let newLoanTypeArray = data.item.loanTypes;
    _logger("newLoanTypeArray -->", newLoanTypeArray);
    setPageData((prevState) => {
      const newSt = { ...prevState };
      newSt.arrayOfLoanTypes = newLoanTypeArray.map(mapLoanTypes);
      return newSt;
    });
  };

  const onGetTypes3ColError = (err) => {
    _logger(err, "Get Types Error");
    toastr.error("Type Get Call Failed");
  };

  useEffect(() => {
    _logger("useEffect firing");
    if (!!pageData.loanTypeId) {
      loanAppsService
        .searchByTypeLoanApps(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.loanTypeId
        )
        .then(onLoanAppsSearchSuccess)
        .catch(onLoanAppsSearchError);
    } else {
      loanAppsService
        .getLoanApps(pageData.pageIndex, pageData.pageSize)
        .then(onGetLoanAppsSuccess)
        .catch(onGetLoanAppsError);
    }
  }, [pageData.pageIndex, pageData.pageSize, pageData.loanTypeId]);

  const onGetLoanAppsSuccess = (data) => {
    _logger("Applications:", data);

    let newAppArray = data.item.pagedItems;
    setPageData((prevState) => {
      const newSt = { ...prevState };
      newSt.totalCount = data.item.totalCount;
      newSt.arrayOfApps = newAppArray;
      newSt.arrayOfAppsComponents = newAppArray.map(mappingApplications);
      return newSt;
    });
  };

  const onGetLoanAppsError = (err) => {
    _logger(err, "Get LoanApps Error");
    toastr.error("LoanApps Get Call Failed");
  };

  const onLoanAppsSearchSuccess = (data) => {
    _logger("Search Result:", data);
    const searchResult = data.item.pagedItems;
    setPageData((prevState) => {
      const newSt = { ...prevState };
      _logger("This is the newState: ", newSt);
      newSt.pageIndex = data.item.pageIndex;
      newSt.pageSize = data.item.pageSize;
      newSt.totalCount = data.item.totalCount;
      newSt.arrayOfApps = searchResult;
      newSt.arrayOfAppsComponents = searchResult.map(mappingApplications);
      return newSt;
    });
  };

  const onLoanAppsSearchError = (err) => {
    _logger(err, "LoanApps search Error");
    toastr.error("LoanApps search Error");
  };

  const handleLoanTypes = (e) => {
    _logger("e", e);
    _logger("e.target", e.target.value);

    setPageData((prevState) => {
      let newObj = { ...prevState };
      newObj.pageIndex = 0;
      // this is for the select dropdown
      newObj.selectedOption = e.target.value;

      // is meant for calling the search api
      newObj.loanTypeId = parseInt(e.target.value);
      return newObj;
    });
  };
  const handleSearch = (e) => {
    setSearchUser(e.target.value);
  };

  const onSearchClicked = (e) => {
    e.preventDefault();

    if (searchUser === "") {
      return loanAppsService
        .getLoanApps(pageData.pageIndex, pageData.pageSize)
        .then(onGetLoanAppsSuccess)
        .catch(onGetLoanAppsError);
    } else {
      return loanAppsService
        .searchByuser(searchUser, pageData.pageIndex, pageData.pageSize)
        .then(onGetLoanAppsSuccess)
        .catch(onSearchError);
    }
  };

  const onSearchError = (err) => {
    toastr.error("Loan was not found ");
    _logger(err);
  };

  return (
    <>
      <Card className="border-0">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="mb-0">Loan Application Profiles</h3>
              <p className="mb-0">
                Quickly retrieve detailed information about individuals Loan
                Applications
              </p>
            </div>
            <div className="flex-grow-1 d-flex justify-content-end">
              <form className="d-flex" role="search">
                <select
                  onChange={handleLoanTypes}
                  value={pageData.selectedOption}
                  className="form-select text-dark"
                >
                  <option value="">Select Loan Types</option>
                  {pageData.arrayOfLoanTypes}
                </select>
              </form>
            </div>
          </div>{" "}
          <Col
            md={1}
            className="flex-grow-1 d-flex justify-content-end"
            style={{ width: "300px" }}
          >
            <input
              name="search"
              type="search"
              className="form-control user-list-search-style"
              id="exampleFormControlInput1"
              placeholder="Search user"
              onChange={handleSearch}
            />{" "}
          </Col>
          <Col md={1} className="flex-grow-1 d-flex justify-content-end">
            <span
              onClick={onSearchClicked}
              className="flex-grow-1 d-flex justify-content-end"
            >
              <Icon onclick path={mdiMagnify} size={2} />
            </span>
          </Col>
          <div className="flex-grow-1 d-flex justify-content-end">
            <Pagination
              onChange={onPageChange}
              current={pageData.pageIndex + 1}
              pageSize={pageData.pageSize}
              total={pageData.totalCount}
              locale={locale}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
            />
          </div>
        </Card.Header>
        <Card.Body className="p-0 pb-5">
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div className="table-responsive ">
                <Table className="text-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th>Applicant</th>
                      <th>Loan Amount</th>
                      <th>Loan Term</th>
                      <th>Preferred Interest Rate</th>
                      <th>Credit Score</th>
                      <th>Status Id</th>
                      <th>Business</th>
                      <th>{}</th>
                    </tr>
                    <tr>
                      <th colSpan="5">
                        Showing {pageData.arrayOfAppsComponents.length} of{" "}
                        {pageData.totalCount} items
                      </th>
                      <th>{}</th>
                      <th>{}</th>
                      <th>{}</th>
                    </tr>
                  </thead>
                  {pageData.arrayOfAppsComponents}
                </Table>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default LoanAppListLenderView;
