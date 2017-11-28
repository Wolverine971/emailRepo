using DJSendGrid.Domains;
using DJSendGrid;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace DJSendGrid
{
    public class GrabbyService : IGrabbyService
    {
        public List<string> GetUrls(ScrapeRequest model)
        {
            var webClient = new WebClient();
            var html = webClient.DownloadString(model.Website);

            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);

            string additionalParam = null;
            if (model.SearchingFor == "href")
            {
                additionalParam = "www";
            }
            if (model.SearchingFor == "img")
            {
                additionalParam = "src";
            }
            if (model.SearchingFor == "word")
            {
                additionalParam = "word";
            }

            var nodes =
                htmlDocument
                .DocumentNode
                .Descendants()
                .Where(node =>
                node.Attributes[model.SearchingFor] != null &&
                node.Attributes[model.SearchingFor].Value.Contains(additionalParam));

            List<string> urls = new List<string>();
            foreach (var node in nodes)
            {
                urls.Add(node.InnerText);
                urls.Add(node.OuterHtml);

                urls.Add(node.OriginalName);
                urls.Add(node.InnerHtml);
            }

            return urls;
        }
        
    }
}