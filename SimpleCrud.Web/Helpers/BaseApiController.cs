using SimpleCrud.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SimpleCrud.Web.Helpers
{
    public class BaseApiController : ApiController
    {
        public SimpleCrudContext _api = new SimpleCrudContext();
    }
}