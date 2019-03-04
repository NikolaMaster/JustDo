using System.ComponentModel.DataAnnotations;

namespace JustDo.Models
{
    public class SignInModel
    {
        [Required]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}")]
        public string UserName { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=(.*[A-Z].*){2,})(?=.*\d+.*)(?=.*[^\da-zA-Z])\S{8,}$")]
        public string Password { get; set; }
    }
}
