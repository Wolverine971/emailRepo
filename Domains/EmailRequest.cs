using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DJSendGrid.Domains
{
    public class EmailRequest
    {
        public string From { get; set; }
        public string[] To { get; set; }
        public string BCC { get; set; }
        public string Body { get; set; }
    }
}