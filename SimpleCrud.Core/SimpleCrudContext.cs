using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Text;

namespace SimpleCrud.Core
{
    public class SimpleCrudContext
    {
        // I intentionally removed the token validation algorythms, session validation, and other security measures in this demo code.

        private static T RequestData<T>(string actionName, object payloadToSend)
        {
            try
            {
                var payload = JsonConvert.SerializeObject(payloadToSend).ToBase64();

                WebClient wc = new WebClient();
                wc.QueryString.Add("Payload", payload);

                var rawApiResponse = wc.UploadValues(
                    string.Format("{0}/SimpleCrud/{1}", ConfigurationManager.AppSettings["V3ApiURL"], actionName), "POST", wc.QueryString);


                var apiResObj = JsonConvert.DeserializeObject<ResponseModel>(Encoding.UTF8.GetString(rawApiResponse));

                string res = apiResObj.Payload
                    .FromBase64();

                if (apiResObj.Status == 200)
                {
                    return JsonConvert.DeserializeObject<T>(res);
                }
                else
                {
                    throw new Exception(res);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<sc_ListEmployee_Result> ListEmployee(Nullable<long> employeeID)
        {
            return RequestData<List<sc_ListEmployee_Result>>("ListEmployee", new
            {
                employeeID
            });
        }


        public int DeleteEmployee(Nullable<long> employeeID)
        {
            return RequestData<int>("DeleteEmployee", new
            {
                employeeID
            });
        }

        public int InsertEmployee(string fullName, string position, string empCode, string mobile)
        {
            return RequestData<int>("InsertEmployee", new
            {
                fullName,
                position,
                empCode,
                mobile
            });
        }

        public int UpdateEmployee(Nullable<long> employeeID, string fullName, string position, string empCode, string mobile)
        {
            return RequestData<int>("UpdateEmployee", new
            {
                employeeID,
                fullName,
                position,
                empCode,
                mobile
            });
        }
    }
}
