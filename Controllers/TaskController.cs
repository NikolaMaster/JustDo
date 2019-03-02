using System.Collections.Generic;
using System.Linq;
using JustDo.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JustDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly JustDoContext _db;
        public TaskController(JustDoContext db)
        {
            _db = db;
        }

        public List<Task> Get()
        {
            return _db.Tasks.ToList();
        }
    }
}