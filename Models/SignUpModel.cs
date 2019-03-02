using System.ComponentModel.DataAnnotations;

namespace JustDo.Models
{
    public class SignUpModel : SignInModel
    {
        [Required]
        [Compare("Password")]
        public string PasswordConfirm { get; set; }
    }
}
