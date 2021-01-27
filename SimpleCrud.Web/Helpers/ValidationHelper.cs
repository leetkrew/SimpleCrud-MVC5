using SimpleCrud.Core;
using SimpleCrud.Web.Models;
using System;
using System.Linq;
using System.Web.Http.ModelBinding;

namespace SimpleCrud.Web.Helpers
{
    public static class ValidationHelper
    {
        public static bool ValidateParam<T>(this T obj, ModelStateDictionary ms, out JsonContent result)
        {
            if (ms.IsValid)
            {
                var objType = typeof(T);

                if (objType == typeof(HomeUpdateEmployeeParam))
                {
                    HomeUpdateEmployeeParam param = (HomeUpdateEmployeeParam)Convert.ChangeType(obj, typeof(HomeUpdateEmployeeParam));
                    Validate(ref param, ref ms);
                }

                if (objType == typeof(HomeInsertEmployeeParam))
                {
                    HomeInsertEmployeeParam param = (HomeInsertEmployeeParam)Convert.ChangeType(obj, typeof(HomeInsertEmployeeParam));
                    Validate(ref param, ref ms);
                }



                result = ms.JsonValidation();
                if (ms.IsValid)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                result = ms.JsonValidation();
                return false;
            }
        }

        private static void Validate(ref HomeInsertEmployeeParam param, ref ModelStateDictionary ms)
        {
            if (param.Mobile.Length != 11)
            {
                ms.AddModelError("Mobile", "Mobile number must be 11 digits");
            }

            if (!param.Mobile.StartsWith("09"))
            {
                ms.AddModelError("Mobile", "Invalid mobile phone number");
            }
        }

        private static JsonContent JsonValidation(this ModelStateDictionary state)
        {
            return new JsonContent(new FrontEndResponseModel()
            {
                Status = 406,
                Description = "Not Acceptable",
                Validation = from e in state
                             where e.Value.Errors.Count > 0
                             select new
                             {
                                 Name = e.Key.Split(new char[] { '.' }).Last(),
                                 Errors = e.Value.Errors.Select(x => x.ErrorMessage)
                                   .Concat(e.Value.Errors.Where(x => x.Exception != null).Select(x => x.Exception.Message))
                             }

            });
        }

        private static void Validate(ref HomeUpdateEmployeeParam param, ref ModelStateDictionary ms)
        {
            if(string.IsNullOrEmpty(param.EmpCode))
            {
                ms.AddModelError("EmpCode", "Invalid Employee Code");
            }

            if (param.Mobile.Length != 11)
            {
                ms.AddModelError("Mobile", "Mobile number must be 11 digits");
            }

            if (!param.Mobile.StartsWith("09"))
            {
                ms.AddModelError("Mobile", "Invalid mobile phone number");
            }
        }
    }
}