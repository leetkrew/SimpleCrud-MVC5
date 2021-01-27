using Newtonsoft.Json;
using SimpleCrud.Core;
using SimpleCrud.Web.Helpers;
using SimpleCrud.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace SimpleCrud.Web.Controllers.Api
{
    public class SimpleCrudController : BaseApiController
    {
        [HttpPost]
        public HttpResponseMessage ListEmployees(HomeListEmployeesParam param)
        {
            try
            {
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                            JsonConvert.SerializeObject(new FrontEndResponseModel()
                            {
                                Status = 200,
                                Description = JsonConvert.SerializeObject(HomeListEmployeesParam.ListEmployee(ref _api, ref param) )
                            }),
                            Encoding.UTF8,
                            "application/json")
                };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, true);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new FrontEndResponseModel()
                    {
                        Status = 500,
                        Description = exh.Message
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }

        [HttpPost]
        public HttpResponseMessage UpdateEmployee(HomeUpdateEmployeeParam param)
        {
            try
            {
                JsonContent validationResult;
                if (!param.ValidateParam(ModelState, out validationResult))
                {
                    return new HttpResponseMessage() { Content = validationResult };
                }

                HomeUpdateEmployeeParam.UpdateEmployee(ref _api, ref param);
                var listParam = new HomeListEmployeesParam() { EmployeeID = 0 };

                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                            JsonConvert.SerializeObject(new FrontEndResponseModel()
                            {
                                Status = 200,
                                Description = JsonConvert.SerializeObject(HomeListEmployeesParam.ListEmployee(ref _api, ref listParam))
                            }),
                            Encoding.UTF8,
                            "application/json")
                };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, true);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new FrontEndResponseModel()
                    {
                        Status = 500,
                        Description = exh.Message
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }


        [HttpPost]
        public HttpResponseMessage DeleteEmployee(HomeDeleteEmployeeParam param)
        {
            try
            {
                JsonContent validationResult;
                if (!param.ValidateParam(ModelState, out validationResult))
                {
                    return new HttpResponseMessage() { Content = validationResult };
                }

                HomeDeleteEmployeeParam.DeleteEmployee(ref _api, ref param);
                var listParam = new HomeListEmployeesParam() { EmployeeID = 0 };

                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                            JsonConvert.SerializeObject(new FrontEndResponseModel()
                            {
                                Status = 200,
                                Description = JsonConvert.SerializeObject(HomeListEmployeesParam.ListEmployee(ref _api, ref listParam))
                            }),
                            Encoding.UTF8,
                            "application/json")
                };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, true);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new FrontEndResponseModel()
                    {
                        Status = 500,
                        Description = exh.Message
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }

        [HttpPost]
        public HttpResponseMessage InsertEmployee(HomeInsertEmployeeParam param)
        {
            try
            {
                JsonContent validationResult;
                if (!param.ValidateParam(ModelState, out validationResult))
                {
                    return new HttpResponseMessage() { Content = validationResult };
                }

                HomeInsertEmployeeParam.InsertEmployee(ref _api, ref param);

                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                            JsonConvert.SerializeObject(new FrontEndResponseModel()
                            {
                                Status = 200,
                                Description = string.Format("{0} has been added!", param.FullName),
                                Url = Url.Content("~/")
                            }),
                            Encoding.UTF8,
                            "application/json")
                };
            }
            catch (Exception ex)
            {
                var exh = new ExceptionHelper(ref ex, true);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(
                    JsonConvert.SerializeObject(new FrontEndResponseModel()
                    {
                        Status = 500,
                        Description = exh.Message
                    }),
                    Encoding.UTF8,
                    "application/json")
                };
            }
        }


    }
}
