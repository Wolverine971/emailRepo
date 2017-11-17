using System.Web.Mvc;
using Unity;
using System.Web.Http;
using System.Configuration;
using System.Security.Principal;
using System.Web;
using Unity.WebApi;
using Microsoft.Practices.Unity;

namespace DJSendGrid
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();


           container.RegisterType<IEmailService, EmailService>();

            container.RegisterType<IDataProvider, SqlDataProvider>(
           new InjectionConstructor(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString));

            container.RegisterType<IPrincipal>(new TransientLifetimeManager(),
                     new InjectionFactory(con => HttpContext.Current.User));


            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
        }
    }
}