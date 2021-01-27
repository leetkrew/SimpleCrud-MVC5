using SimpleCrud.Core;
using SimpleCrud.Web.Models;
using System.Collections.Generic;


namespace SimpleCrud.Web.Services
{
    public class CrudBaseService
    {
        // I intentionally removed the token validation algorythms, session validation, and other security measures in this demo code.

        public static int DeleteEmployee(ref SimpleCrudContext api, ref HomeDeleteEmployeeParam param)
        {
            param = param.TrimAll();
            return api.DeleteEmployee(param.EmployeeID);
        }

        public static int InsertEmployee(ref SimpleCrudContext api, ref HomeInsertEmployeeParam param)
        {
            param = param.TrimAll();
            return api.InsertEmployee(param.FullName, param.Position, param.EmpCode, param.Mobile);
        }

        public static List<sc_ListEmployee_Result> ListEmployee(ref SimpleCrudContext api, ref HomeListEmployeesParam param)
        {
            param = param.TrimAll();
            return api.ListEmployee(param.EmployeeID);
        }
        public static int UpdateEmployee(ref SimpleCrudContext api, ref HomeUpdateEmployeeParam param)
        {
            param = param.TrimAll();
            return api.UpdateEmployee(param.EmployeeID, param.FullName, param.Position, param.EmpCode, param.Mobile);
        }
    }
}