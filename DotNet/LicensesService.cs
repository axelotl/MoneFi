using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class LicensesService : ILicensesService
    {
        IBaseUserMapper _userMapper = null;
        ILookUpService _lookUpService = null;

        IDataProvider _data = null;

        public LicensesService(IDataProvider data, IBaseUserMapper userMapper, ILookUpService lookUpService)
        {
            _userMapper = userMapper;
            _data = data;
            _lookUpService = lookUpService;
        }



        public void Delete(int Id)
        {
            string procName = "[dbo].[Licenses_Delete_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@id", Id);
                }, returnParameters: null);

        }

        public List<License> GetByCreator(int id)
        {
            string procName = "[dbo].[Licenses_Select_ByCreatedBy]";
            List<License> list = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@CreatedBy", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                License licenses = MapSingleLicense(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<License>();
                }
                list.Add(licenses);

            });
            return list;
        }


        public Paged<License> GetAll(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Licenses_SelectAll]";
            List<License> list = null;
            Paged<License> paged = null;
            int totalCount = 0;
            _data.ExecuteCmd(procName, (SqlParameterCollection param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
            }, (IDataReader reader, short set) =>
            {
                int startingIndex = 0;
                License licenses = MapSingleLicense(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }
                if (list == null)
                {
                    list = new List<License>();
                }
                list.Add(licenses);

            });
            if (list != null)
            {
                paged = new Paged<License>(list, pageIndex, pageSize, totalCount);
            }
            return paged;


        }

        public void Update(LicensesUpdateRequest model)
        {
            string procName = "[dbo].[Licenses_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        public int Add(LicensesAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Licenses_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                AddCommonParams(model, collection);
                collection.AddWithValue("@CreatedBy", userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                collection.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            }
            );
            return id;
        }




        private static void AddCommonParams(LicensesAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@LicenseStateId", model.LicenseStateId);
            col.AddWithValue("@LicenseNumber", model.LicenseNumber);
            col.AddWithValue("@DateAdmitted", model.DateAdmitted);

            col.AddWithValue("@IsActive", model.IsActive);
        }
        private License MapSingleLicense(IDataReader reader, ref int startingIndex)
        {
            License license = new License();
            license.CreatedBy = new BaseUser();


            license.Id = reader.GetSafeInt32(startingIndex++);
            license.State = _lookUpService.MapSingleLookUp3Col(reader, ref startingIndex);
            license.LicenseNumber = reader.GetSafeString(startingIndex++);
            license.DateAdmitted = reader.GetSafeUtcDateTime(startingIndex++);
            license.DateCreated = reader.GetSafeDateTime(startingIndex++);
            license.IsActive = reader.GetSafeBool(startingIndex++);
            license.CreatedBy = _userMapper.MapBaseUser(reader, ref startingIndex);

            return license;
        }

    }
}

