using Newtonsoft.Json;
using SimpleCrud.API.Helpers;
using SimpleCrud.API.Models;
using SimpleCrud.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SimpleCrud.API.Controllers.Api
{
    //I intentionally removed the encryption algorythm, logs, and other security mechanism in this demo code
    public class SimpleCrudController : ApiController //: BaseApiController
    {
        public CoreDbEntities _db = new CoreDbEntities();

        public static bool ValidateSecurityToken(string tokenID)
        {
            return !string.IsNullOrEmpty(tokenID);
        }

        [HttpGet]
        public HttpResponseMessage Test()
        {
            try
            {
                return
                 new HttpResponseMessage()
                 {
                     Content = new StringContent(
                                            JsonConvert.SerializeObject(new ResponseModel()
                                            {
                                                Status = 200,
                                                Payload = "Test"
                                            }),
                                            Encoding.UTF8,
                                            "application/json")
                 };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, false);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new ResponseModel()
                    {
                        Status = 500,
                        Payload = exh.Message.ToBase64()
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }

        [HttpPost]
        public HttpResponseMessage ListEmployee(ApiParam param)
        {
            try
            {
                var plainPayload = param.Payload.FromBase64();
                var payload = JsonConvert.DeserializeObject<dynamic>(plainPayload);

                Nullable<long> employeeID = payload.employeeID;
                var dbRes = _db.sc_ListEmployee(employeeID).ToList();

                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                            JsonConvert.SerializeObject(new ResponseModel()
                            {
                                Status = 200,
                                Payload = JsonConvert.SerializeObject(dbRes).ToBase64()
                            }),
                            Encoding.UTF8,
                            "application/json")
                };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, false);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new ResponseModel()
                    {
                        Status = 500,
                        Payload = exh.Message.ToBase64()
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }


        [HttpPost]
        public HttpResponseMessage DeleteEmployee(ApiParam param)
        {
            try
            {
                var plainPayload = param.Payload.FromBase64();
                var payload = JsonConvert.DeserializeObject<dynamic>(plainPayload);

                Nullable<long> employeeID = payload.employeeID;
                var dbRes = _db.sc_DeleteEmployee(employeeID);

                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                            JsonConvert.SerializeObject(new ResponseModel()
                            {
                                Status = 200,
                                Payload = JsonConvert.SerializeObject(dbRes).ToBase64()
                            }),
                            Encoding.UTF8,
                            "application/json")
                };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, false);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new ResponseModel()
                    {
                        Status = 500,
                        Payload = exh.Message.ToBase64()
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }

        [HttpPost]
        public HttpResponseMessage InsertEmployee(ApiParam param)
        {
            try
            {
                var plainPayload = param.Payload.FromBase64();
                var payload = JsonConvert.DeserializeObject<dynamic>(plainPayload);

                string fullName = payload.fullName;
                string position = payload.position;
                string empCode = payload.empCode;
                string mobile = payload.mobile;
                var dbRes = _db.sc_InsertEmployee(fullName, position, empCode, mobile);


                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                            JsonConvert.SerializeObject(new ResponseModel()
                            {
                                Status = 200,
                                Payload = JsonConvert.SerializeObject(dbRes).ToBase64()
                            }),
                            Encoding.UTF8,
                            "application/json")
                };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, false);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new ResponseModel()
                    {
                        Status = 500,
                        Payload = exh.Message.ToBase64()
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }


        [HttpPost]
        public HttpResponseMessage UpdateEmployee(ApiParam param)
        {
            try
            {
                var plainPayload = param.Payload.FromBase64();
                var payload = JsonConvert.DeserializeObject<dynamic>(plainPayload);

                Nullable<long> employeeID = payload.employeeID;
                string fullName = payload.fullName;
                string position = payload.position;
                string empCode = payload.empCode;
                string mobile = payload.mobile;

                var dbRes = _db.sc_UpdateEmployee(employeeID, fullName, position, empCode, mobile);

                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                            JsonConvert.SerializeObject(new ResponseModel()
                            {
                                Status = 200,
                                Payload = JsonConvert.SerializeObject(dbRes).ToBase64()
                            }),
                            Encoding.UTF8,
                            "application/json")
                };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, false);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new ResponseModel()
                    {
                        Status = 500,
                        Payload = exh.Message.ToBase64()
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }

    }
}
