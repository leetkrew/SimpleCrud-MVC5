using System.Web.Mvc;

namespace SimpleCrud.API.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}