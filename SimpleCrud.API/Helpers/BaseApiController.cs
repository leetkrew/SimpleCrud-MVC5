using System.Web.Http;

namespace SimpleCrud.API.Helpers
{
    public class BaseApiController : ApiController
    {
        // I intentionally removed the token validation algorythms, session validation, and other security measures in this demo code.
        public CoreDbEntities _db = new CoreDbEntities();

        public static bool ValidateSecurityToken(string tokenID)
        {
            return !string.IsNullOrEmpty(tokenID);
        }
    }
}