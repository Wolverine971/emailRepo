using DJSendGrid;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DJSendGrid.Controllers
{
    [RoutePrefix("api/scrape")][AllowAnonymous]
    public class ScrapeController : ApiController
    {
        private IGrabbyService _gService;

        public ScrapeController(IGrabbyService gService)
        {
            _gService = gService;
        }
        [Route("site"), HttpPost]
        public HttpResponseMessage Post(ScrapeRequest model)
        {
            try
            {
                var response = _gService.GetUrls(model);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

    }
}
