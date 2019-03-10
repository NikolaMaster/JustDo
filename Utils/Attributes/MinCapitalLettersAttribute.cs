using System.ComponentModel.DataAnnotations;

namespace JustDo.Utils.Attributes
{
    public class MinCapitalLettersAttribute : RegularExpressionAttribute
    {
        public MinCapitalLettersAttribute() : base(@"^(.*[A-Z].*){2,}$")
        {
        }
    }
}
