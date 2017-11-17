using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DJSendGrid.Controllers
{
    [RoutePrefix("api/demo")]
    public class DemoController : ApiController
    {
        [Route("message"), HttpGet]
        public object GetMessage()
        {
            return "hello";
        }
    }
}
