using System;

namespace SimpleCrud.Core
{
    public class ExceptionHelper
    {
        public string Message { get; private set; }

        public int ResponseCode { get; private set; }

        public string StackTrace { get; set; }

        public ExceptionHelper(ref Exception ex)
        {
            string alert = "";
            this.ResponseCode = 500;
            if (ex.InnerException != null)
            {
                alert = ex.InnerException.Message;
            }
            else
            {
                alert = ex.Message;
            }

            if ((alert.StartsWith("sp|")) || (alert.StartsWith("in|")) ||
                (alert.StartsWith("SP|")) || (alert.StartsWith("IN|")))
            {
                alert = alert.Substring(3);
            }
            else
            {
                alert = "Unknown Error";
            }

            this.Message = alert;

            this.StackTrace = ex.ToString();
            if (alert.Contains("Invalid Token"))
            {
                this.ResponseCode = 401;
            }
        }

        public ExceptionHelper(ref Exception ex, bool removePrefix = true)
        {
            string alert = "";
            this.ResponseCode = 500;
            if (ex.InnerException != null)
            {
                alert = ex.InnerException.Message;
            }
            else
            {
                alert = ex.Message;
            }

            if ((alert.StartsWith("sp|")) || (alert.StartsWith("in|")) ||
                (alert.StartsWith("SP|")) || (alert.StartsWith("IN|")))
            {

                if (removePrefix)
                {
                    alert = alert.Substring(3);
                }
            }
            else
            {
                //I intentionally removed the logging and reporting algorythm in this demo code
                alert = "Unknown Error";
            }

            this.Message = alert;

            this.StackTrace = ex.ToString();
            if (alert.Contains("Invalid Token"))
            {
                this.ResponseCode = 401;
            }
        }
    }
}
