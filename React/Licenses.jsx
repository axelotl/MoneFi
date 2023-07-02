import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import LicenseCard from "./LicensesCard";
import LicenseService from "services/licenseService";
import { Link } from "react-router-dom";
import "rc-pagination/assets/index.css";
import debug from "sabio-debug";
import toastr from "toastr";

function Licenses() {
  const [pageValue, setPageValue] = useState({
    licenseAr: [],
    licenseComponents: [],
    pageIndex: 0,
    current: 1,
    pageSize: 12,
    totalCount: 0,
  });

  const _logger = debug.extend("Licenses");

  useEffect(() => {
    LicenseService.getLicensePagination(pageValue.pageIndex, pageValue.pageSize)
      .then(onGetLicensesSucces)
      .catch(onGetLicensesError);
  }, [pageValue.pageIndex]);

  const onGetLicensesSucces = (data) => {
    setPageValue((prevState) => {
      const newvalues = { ...prevState };
      newvalues.totalCount = data.item.totalCount;

      newvalues.licenseAr = data.item.pagedItems;

      newvalues.licenseComponents = newvalues.licenseAr.map(licenseMapper);

      return newvalues;
    });
  };
  const onGetLicensesError = (err) => {
    toastr.error("sorry something went wrong", err);
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

  const licenseMapper = (license) => {
    _logger(license.id);
    return <LicenseCard key={license.id} license={license} />;
  };

  return (
    <React.Fragment>
      <div className="contanier">
        <div style={{ marginLeft: "45%", marginBottom: "30px" }}>
          <Pagination
            className="pb-3 pt-3"
            onChange={handlePageChange}
            current={pageValue.pageIndex + 1}
            total={pageValue.totalCount}
            pageSize={pageValue.pageSize}
            locale={locale}
          />
        </div>

        <div className="row">{pageValue.licenseComponents}</div>

        <Link to={"/license/add"} className="btn btn-primary">
          Add License
        </Link>

        <div style={{ marginLeft: "45%" }}>
          <Pagination
            className="pb-3 pt-3 "
            onChange={handlePageChange}
            current={pageValue.pageIndex + 1}
            total={pageValue.totalCount}
            pageSize={pageValue.pageSize}
            locale={locale}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Licenses;
