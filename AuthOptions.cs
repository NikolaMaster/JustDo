using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace JustDo
{
    public class AuthOptions
    {
        public const string Issuer = "JustDoAppServer";
        public const string Audience = "JustDoAppClient";
        private const string Key = "mysupersecret_secretkey!123";
        public const int LifeTime = 60;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
