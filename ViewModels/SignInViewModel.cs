using System.ComponentModel.DataAnnotations;
using JustDo.Utils.Attributes;

namespace JustDo.ViewModels
{
    public class SignInViewModel
    {
        [Required]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "Address format is invalid")]
        public string UserName { get; set; }

        [Required]
        [MinLength(8)]
        [NonWhiteSpace]
        [MinCapitalLetters]
        [AtLeastOneDigit]
        [AtLeastOneSpecialCharacter]
        public string Password { get; set; }
    }
}
