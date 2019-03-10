using System.ComponentModel.DataAnnotations;

namespace JustDo.Utils.Attributes
{
    public class NonWhiteSpaceAttribute : RegularExpressionAttribute
    {
        public NonWhiteSpaceAttribute() : base(@"^\S+$")
        {
        }
    }
}
