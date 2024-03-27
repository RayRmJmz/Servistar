using System.ComponentModel.DataAnnotations;

namespace Servistar.Server.Models
{
    public class CustomersPhoneNumbersCreateModel
    {
        [Required]
        [MaxLength(13)]
        public string PhoneNumber { get; set; }
        public bool Principal { get; set; } = false;
    }

    public class CustomersPhoneNumbersResponseModel
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public bool Principal { get; set; } = false;
    }
}
