using System.Web;
using System.Web.Optimization;

namespace SimpleCrud.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/swal2/SweetAlert2.css",
                      "~/Content/datatables/dt.css",
                      "~/Content/jquery-ui/jquery-ui.css"
                      ));


            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                    "~/Scripts//jquery.js",
                      "~/Content/jquery-ui/jquery-ui.js",
                      "~/Content/SimpleCrud/b64.js",
                      "~/Content/swal2/SweetAlert2.js",
                      "~/Content/SimpleCrud/ajax.js",
                      "~/Content/SimpleCrud/ajaxBg.js",
                      "~/Content/SimpleCrud/initializePage.js",
                      "~/Content/SimpleCrud/bindings.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/modules/HomeIndex").Include(
                      "~/Content/SimpleCrud/modules/HomeIndex.js"
                    ));

            bundles.Add(new ScriptBundle("~/bundles/modules/HomeInsertEmployee").Include(
                      "~/Content/SimpleCrud/modules/HomeInsertEmployee.js"
                    ));

            BundleTable.EnableOptimizations = true;

        }
    }
}
