using System.ComponentModel.DataAnnotations;

namespace JustDo.Utils.Attributes
{
    public class AtLeastOneDigitAttribute : RegularExpressionAttribute
    {
        public AtLeastOneDigitAttribute() : base(@"^.*\d.*$")
        {
        }
    }
}
