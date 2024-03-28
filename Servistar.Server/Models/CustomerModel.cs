using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Servistar.Server.Models
{
    public class CustomerCreateModel
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string LastName { get; set; }
        public string? SecondLastName { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? BirthDate { get; set; }

        public IEnumerable<CustomerAddressCreateModel>? Address { get; set; }
        public IEnumerable<CustomersPhoneNumbersCreateModel>? PhoneNumbers { get; set; }
    }

    public class CustomerResponseModel
    {
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
   
        [StringLength(50)]
        public string LastName { get; set; }
        public string? SecondLastName { get; set; }

        public bool IsActive { get; set; }
        [Column(TypeName = "Date")]
        public string? BirthDate { get; set; }
        public string? UserId { get; set; }
        public DateTime? RegistrationDate { get; set; }

        public IEnumerable<CustomerAddressResponseModel>? Address { get; set; }
        public IEnumerable<CustomersPhoneNumbersResponseModel>? PhoneNumbers { get; set; }
    }
}
