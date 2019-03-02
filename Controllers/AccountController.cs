using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JustDo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace JustDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly JustDoContext _db;

        public AccountController(JustDoContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_db.Users.ToList());
        }

        [HttpPost("/SignUp")]
        public IActionResult SignUp(SignUpModel model)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(404);
            }

            var user = new User
            {
                Login = model.UserName,
                Password = model.Password
            };

            _db.Users.AddAsync(user);
            _db.SaveChanges();
            return Ok(user);
        }

        [HttpPost("/SingIn")]
        public async Task SignIn(User user)
        {
            var identity = GetIdentity(user.Login, user.Password);
            if (identity == null)
            {
                Response.StatusCode = 400;
                return;
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(issuer: AuthOptions.Issuer, audience: AuthOptions.Audience, notBefore: now,
                claims: identity.Claims, expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LifeTime)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodeJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodeJwt,
                username = identity.Name
            };

            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response,
                new JsonSerializerSettings {Formatting = Formatting.Indented}));
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            var user = _db.Users.FirstOrDefault(u =>
                string.Equals(u.Login, username) && string.Equals(u.Password, password));

            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
            };

            var claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }
    }
}