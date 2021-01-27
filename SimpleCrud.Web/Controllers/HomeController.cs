using SimpleCrud.Web.Models;
using System.Web.Mvc;


namespace SimpleCrud.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View(new HomeIndexVM());
        }

        public ActionResult InsertEmployee()
        {
            return View(new HomeInsertEmployeeVM());
        }

    }
}
