using System.ComponentModel.DataAnnotations;

namespace SimpleCrud.Web.Models
{
    public class HomeUpdateEmployeeParam : HomeInsertEmployeeParam
    {
        // I intentionally removed the token validation algorythms, session validation, and other security measures in this demo code.

        [Required]
        public long EmployeeID { get; set; }
    }
}