﻿using System.ComponentModel.DataAnnotations;

namespace JustDo.Utils.Attributes
{
    public class AtLeastOneSpecialCharacterAttribute : RegularExpressionAttribute
    {
        public AtLeastOneSpecialCharacterAttribute() : base(@"^.*[^A-Za-z0-9\s].*$")
        {
            ErrorMessage = $"{ErrorMessageResourceName} must contain at least one special character";
        }
    }
}
