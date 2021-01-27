using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleCrud.Web.Models
{
    public class FrontEndResponseModel
    {
        public int Status { get; set; }
        public string Description { get; set; }
        public object Validation { get; set; }
        public string Url { get; set; }
    }
}