import React from "react";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { Image, Button } from "react-bootstrap";

function LoanAppCardTemplate(props) {
  const _logger = debug.extend("LoanAppCardTemplate");
  _logger("Props:", props);

  const aApp = props.app;

  _logger({ aApp });

  const navigate = useNavigate();

  const onViewMore = (e) => {
    e.preventDefault();
    navigate(`/loanapplications/details`, {
      state: { type: `Loan_View`, payload: aApp },
    });
  };

  return (
    <React.Fragment>
      <tbody>
        <tr>
          <td>
            <div>
              <Image
                src={aApp.createdBy?.avatarUrl}
                alt="user image"
                className="rounded-circle avatar-sm mb-3"
                style={{ objectFit: "cover" }}
              />{" "}
              {aApp.createdBy?.firstName} {aApp.createdBy?.lastName}
            </div>
          </td>
          <td>{aApp.loanAmount}</td>
          <td>{aApp.loanTerm}</td>
          <td>{aApp.preferredInterestRate}</td>
          <td>{aApp.creditScore}</td>
          <td>{aApp.statusType.name}</td>
          <td>{aApp.isBusiness.toString()}</td>
          <td>
            <Button variant="btn btn-primary btn-xs" onClick={onViewMore}>
              View More
            </Button>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
}

LoanAppCardTemplate.propTypes = {
  app: PropTypes.shape({
    id: PropTypes.number.isRequired,
    loanType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    loanAmount: PropTypes.number.isRequired,
    loanTerm: PropTypes.number.isRequired,
    preferredInterestRate: PropTypes.number.isRequired,
    creditScore: PropTypes.number.isRequired,
    statusType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    isBusiness: PropTypes.bool.isRequired,
    businessProfile: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      ein: PropTypes.number,
      statusType: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      businessType: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      industryType: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      projectedAnnualBusinessIncome: PropTypes.number,
      annualBusinessIncome: PropTypes.number,
      businessStage: PropTypes.shape({
        value: PropTypes.number,
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      logo: PropTypes.string,
      location: PropTypes.shape({
        id: PropTypes.number.isRequired,
        locationType: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        lineOne: PropTypes.string.isRequired,
        lineTwo: PropTypes.string,
        city: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired,
        state: PropTypes.shape({
          code: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        createdBy: PropTypes.number.isRequired,
        modifiedBy: PropTypes.number.isRequired,
        isDeleted: PropTypes.bool.isRequired,
      }),
      dateCreated: PropTypes.string,
      dateModified: PropTypes.string,
      userId: PropTypes.number,
    }),
    borrower: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          mi: PropTypes.string,
          avatarUrl: PropTypes.string.isRequired,
        }).isRequired,
        ssn: PropTypes.string.isRequired,
        statusTypes: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
        annualIncome: PropTypes.number.isRequired,
        location: PropTypes.shape({
          id: PropTypes.number.isRequired,
          typeId: PropTypes.number.isRequired,
          lineOne: PropTypes.string.isRequired,
          lineTwo: PropTypes.string,
          city: PropTypes.string.isRequired,
          zip: PropTypes.string.isRequired,
        }).isRequired,
        dateCreated: PropTypes.string,
        dateModified: PropTypes.string,
      })
    ),
    loanFiles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fileName: PropTypes.string.isRequired,
        fileUrl: PropTypes.string.isRequired,
        fileType: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
        createdBy: PropTypes.number.isRequired,
        modifiedBy: PropTypes.number.isRequired,
      })
    ).isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    modifiedBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default LoanAppCardTemplate;
