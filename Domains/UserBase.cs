using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DJSendGrid.Domains
{
    public class UserBase : IUserAuthData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Personality { get; set; }
        public string Avatar { get; set; }

    }
}