using System.ComponentModel.DataAnnotations;

namespace SimpleCrud.Web.Models
{    
    public class HomeListEmployeesParam : Services.CrudBaseService
    {
        // I intentionally removed the token validation algorythms, session validation, and other security measures in this demo code.

        [Required]
        public long EmployeeID { get; set; }
    }
}