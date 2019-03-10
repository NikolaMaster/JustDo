using System.ComponentModel.DataAnnotations;

namespace JustDo.ViewModels
{
    public class SignUpViewModel : SignInViewModel
    {
        [Required]
        [Compare("Password")]
        public string PasswordConfirm { get; set; }
    }
}
