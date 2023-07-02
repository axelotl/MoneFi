import React from "react";
import { Card, Row, Image, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import debug from "sabio-debug";

function LoanAppViewMore() {
  const _logger = debug.extend("LoanAppListViewMore");
  var location = useLocation();
  const { state } = location;
  _logger(state);
  return (
    <>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Loan Details</h3>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <Image
                src={state.payload.createdBy.avatarUrl}
                id="img-uploaded"
                className="avatar-xl rounded-circle"
                style={{ objectFit: "cover" }}
                alt=""
              />
              <div className="ms-3"></div>
            </div>
            <div></div>
          </div>
          <hr className="my-5" />
          <div>
            <Row>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    FirstName:
                  </label>
                  <Card.Header>
                    <div>{state.payload.createdBy.firstName} </div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    LastName:
                  </label>
                  <Card.Header>
                    <div>{state.payload.createdBy.lastName}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="CreditScore" className="form-label">
                    CreditScore:
                  </label>
                  <Card.Header>
                    <div>{state.payload.creditScore}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="preferred" className="form-label">
                    preferred Interest Rate:
                  </label>
                  <Card.Header>
                    <div>{state.payload.preferredInterestRate}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="LoanAmount" className="form-label">
                    LoanAmount:
                  </label>
                  <Card.Header>
                    <div>{state.payload.loanAmount}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="LoanTerm" className="form-label">
                    LoanTerm:
                  </label>
                  <Card.Header>
                    <div>{state.payload.loanTerm}</div>
                  </Card.Header>
                </div>
              </Col>
              <Col md={6} sm={12} className="mb-3">
                <div className="mb-3">
                  <label htmlFor="LoanType" className="form-label">
                    LoanType:
                  </label>
                  <Card.Header>
                    <div>{state.payload.loanType.name}</div>
                  </Card.Header>
                </div>
              </Col>
              {state.payload.isBusiness && (
                <>
                  <Col md={6} sm={12} className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="zip" className="form-label">
                        Business Name:
                      </label>
                      <Card.Header>
                        <div>{state.payload.businessProfile.name}</div>
                      </Card.Header>
                    </div>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        BusinessIncome:
                      </label>
                      <Card.Header>
                        <div>
                          {state.payload.businessProfile.annualBusinessIncome}
                        </div>
                      </Card.Header>
                    </div>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        BusinessStage:
                      </label>
                      <Card.Header>
                        <div>
                          {state.payload.businessProfile.businessStage.name}
                        </div>
                      </Card.Header>
                    </div>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        industryType:
                      </label>
                      <Card.Header>
                        <div>
                          {state.payload.businessProfile.industryType.name}
                        </div>
                      </Card.Header>
                    </div>
                  </Col>
                  <Col md={6} sm={12} className="mb-3">
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">
                        Location:
                      </label>
                      <Card.Header>
                        <div>
                          {state.payload.businessProfile.location.lineOne}{" "}
                          {state.payload.businessProfile.location.city}{" "}
                          {state.payload.businessProfile.location.state.code}{" "}
                          {state.payload.businessProfile.location.zip}
                        </div>
                      </Card.Header>
                    </div>
                  </Col>
                </>
              )}
              <Col
                sm={12}
                md={12}
                className="d-flex justify-content-between mb-5"
              ></Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      <div className="d-flex mt-3 justify-content-left">
        <div className="col-6"></div>
      </div>
    </>
  );
}
export default LoanAppViewMore;