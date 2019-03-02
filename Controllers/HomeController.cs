using Microsoft.AspNetCore.Mvc;

namespace JustDo.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}