using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using JustDo.Models;
using JustDo.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace JustDo.Controllers
{
    public class AccountController : Controller
    {
        private readonly JustDoContext _db;

        public AccountController(JustDoContext db)
        {
            _db = db;
        }

        [HttpPost("/signup")]
        public IActionResult SignUp([FromBody] SignUpViewModel viewModel)
        {
            if (_db.Users.Any(u => string.Equals(u.Login, viewModel.UserName)))
            {
                ModelState.AddModelError("username", "User with the same username is already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                Login = viewModel.UserName,
                Password = EncryptPassword(viewModel.Password)
            };

            _db.Users.AddAsync(user);
            _db.SaveChanges();
            return Ok(user);
        }

        [HttpPost("/token")]
        public IActionResult Token([FromBody] SignInViewModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = GetIdentity(user.UserName, user.Password);
            if (identity == null)
            {
                return Unauthorized();
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(issuer: AuthOptions.Issuer, audience: AuthOptions.Audience, notBefore: now,
                claims: identity.Claims, expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LifeTime)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodeJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return Ok(new
            {
                access_token = encodeJwt,
                username = identity.Name
            });
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            var user = _db.Users.FirstOrDefault(u =>
                string.Equals(u.Login, username) &&
                string.Equals(u.Password, EncryptPassword(password)));

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

        private static string EncryptPassword(string password)
        {
            return Convert.ToBase64String(new SHA256Managed().ComputeHash(Encoding.UTF8.GetBytes(password)));
        }
    }
}