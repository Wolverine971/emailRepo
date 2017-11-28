using DJSendGrid.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web.Http;
using WikiWebStarter.Web.Models.Responses;

namespace DJSendGrid.Controllers
{
    [RoutePrefix("api/email")][AllowAnonymous]
    public class EmailsApiController : ApiController
    {
        IEmailService _svc;
        
        //private IUserAuthData _currentUser;


        public EmailsApiController(IEmailService svc)
        {
            //_currentUser = principal.Identity.GetCurrentUser();
            _svc = svc;
        }
        // POST api/<controller>
        [Route]
        [HttpPost]
        public async Task<HttpResponseMessage> Post(EmailRequest model)
        {
            var x = await _svc.Execute(model);
            ItemResponse<System.Net.HttpStatusCode> response = new ItemResponse<System.Net.HttpStatusCode>();
            if (x == true)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest, new ErrorResponse("Email Failed to Send"));
        }
    }
}