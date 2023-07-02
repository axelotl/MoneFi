using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.BusinessProfiles;
using Sabio.Models.Interfaces;
using Sabio.Models.Requests;
using Sabio.Models.Requests.BusinessProfiles;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/licenses")]
    [ApiController]
    public class LicensesApiController : BaseApiController
    {
        private ILicensesService _service = null;
        private IAuthenticationService<int> _authService = null;
        public LicensesApiController(ILicensesService service,
            ILogger<LicensesApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }



        [HttpGet("createdby/{Id:int}")]
        public ActionResult<ItemsResponse<License>> GetByCreator(int Id)
        {
            int Code = 200;
            BaseResponse response = null;
            try
            {
                List<License> list = _service.GetByCreator(Id);
                if (list == null)
                {
                    Code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemsResponse<License> { Items = list };
                }
            }
            catch (Exception ex)
            {
                Code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(Code, response);
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<License>>> GetAll(int pageIndex, int pageSize)
        {

            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<License> page = _service.GetAll(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<License>> { Item = page };
                }

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);

        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(LicensesUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(LicensesAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);

            }
            catch (Exception ex)
            {

                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }




    }
}
