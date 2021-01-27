using SimpleCrud.Web.Services;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SimpleCrud.Web.Models
{
    public class HomeInsertEmployeeParam  : CrudBaseService
    {
        // I intentionally removed the token validation algorythms, session validation, and other security measures in this demo code.

        [Required]
        [DisplayName("Employee Code")]
        public string EmpCode { get; set; }

        [Required]
        [DisplayName("Full Name")]
        public string FullName { get; set; }

        [Required]
        [DisplayName("Mobile #")]
        public string Mobile { get; set; }

        [Required]
        [DisplayName("Position")]
        public string Position { get; set; }
    }
}