using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DJSendGrid
{
    public interface IGrabbyService
    {
        List<string> GetUrls(ScrapeRequest model);
    }
}
