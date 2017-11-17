using DJSendGrid.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DJSendGrid
{
    public interface IEmailService
    {
        Task<bool> Execute(EmailRequest model);
        string GetEmailById();
    }
}
