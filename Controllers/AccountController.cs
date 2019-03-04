using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using JustDo.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Task = System.Threading.Tasks.Task;

namespace JustDo.Controllers
{
    public class AccountController : Controller
    {
        private readonly JustDoContext _db;

        public AccountController(JustDoContext db)
        {
            _db = db;
        }

        [HttpPost("/SignUp")]
        public IActionResult SignUp(SignUpModel model)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400);
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

        [HttpPost("/token")]
        public async Task Token([FromBody] SignInModel user)
        {
            if (!ModelState.IsValid)
            {
                Response.StatusCode = 400;
                return;
            }

            var identity = GetIdentity(user.UserName, user.Password);
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