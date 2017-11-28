using DJSendGrid.Domains;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;

namespace DJSendGrid
{
    public class EmailService : IEmailService
    {
        private IUserAuthData _currentUser;
        private IPrincipal _principal;
        private IDataProvider _prov;

        public EmailService(IDataProvider provider, IPrincipal principal)
        {
            _prov = provider;
            _principal = principal;
        }

        public async Task<bool> Execute(EmailRequest model)
        {
            var apiKey = WebConfigurationManager.AppSettings["sendGridKey"].ToString();
            var client = new SendGridClient(apiKey);

            string subject = "friends let friends #learntocode";

            //TO- only one email is sent at a time, but we could do multiple emails, but that doesn't make sense with the user putting in a personalized message
            List<EmailAddress> tos = new List<EmailAddress>();
            for (int i = 0; i < model.To.Length; i++)
            {
                tos.Add(new EmailAddress(model.To[i]));
            }

            //FROM- this is how we get the "from"
            //var userEmail = GetEmailById();
            //string uEmail = userEmail.Email;
            //var fromEmail = MailHelper.StringToEmailAddress(uEmail);

            var fromEmail = MailHelper.StringToEmailAddress(model.From);



            //BCC- to change who gets BCC'd we do it here, can add multiple
            string bccEmail = "someone@sabio.la";
            var bcc = MailHelper.StringToEmailAddress(bccEmail);
            List<EmailAddress> bccEmails = new List<EmailAddress>();
            bccEmails.Add(bcc);


            //Actual message that gets sent
            SendGridMessage message = new SendGridMessage();
            message.AddBccs(bccEmails);
            message.From = fromEmail;
            message.AddTos(tos);
            message.Subject = subject;
            message.HtmlContent = model.Body;

            SendGrid.Response response = await client.SendEmailAsync(message);
            if (response.StatusCode == HttpStatusCode.Accepted || response.StatusCode == HttpStatusCode.OK)
            {
                return true;
            }
            return false;
        }
        public EmailService()
        {
            //_prov = provider;
            //_principal = principal;
        }
        public string GetEmailById()
        {
            //get current userId then make a call to DB to get email, this returns a "string" object- which we return as "userEmail" which gets turned into a string later
            _currentUser = _principal.Identity.GetCurrentUser();
            string userEmail = null;

            _prov.ExecuteCmd("dbo.Users_SelectEmailById",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", _currentUser.Id);
                },
                singleRecordMapper: delegate (IDataReader rdr, short set)
                {
                    switch (set)
                    {
                        case 0:
                            int ord = 0;
                            userEmail = rdr.GetSafeString(ord++);
                            
                            break;
                        default:
                            break;
                    }

                });
            return userEmail;
        }

        
    }
}
