using System.ComponentModel.DataAnnotations;

namespace JustDo.Utils.Attributes
{
    public class MinCapitalLettersAttribute : RegularExpressionAttribute
    {
        public MinCapitalLettersAttribute() : base(@"^(.*[A-Z].*){2,}$")
        {
            ErrorMessage = $"{ErrorMessageResourceName} must contain capital letters";
        }
    }
}
