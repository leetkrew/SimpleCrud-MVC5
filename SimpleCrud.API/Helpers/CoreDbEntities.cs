using SimpleCrud.Core;

namespace SimpleCrud.API.Helpers
{
    public class CoreDbEntities : SimpleCrudEntities
    {
        public CoreDbEntities()
        {
            this.Configuration.EnsureTransactionsForFunctionsAndCommands = false;
        }
    }
}