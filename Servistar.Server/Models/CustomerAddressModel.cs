using System.ComponentModel.DataAnnotations;

namespace Servistar.Server.Models
{
    public class CustomerAddressCreateModel
    {
        [Required]
        [StringLength(10)]
        public string Number { get; set; }
        [Required]
        [StringLength(50)]
        public string Street { get; set; }
        [Required]
        public string Colony { get; set; }
        public int MinicipalityId { get; set; }
        public string State { get; set; }
        public int PostalCode { get; set; }
        public bool Principal { get; set; }
        public string? References { get; set; }
    }

    public class CustomerAddressResponseModel
    {
        public int Id { get; set; }
        [Required]
        [StringLength(10)]
        public string Number { get; set; }
        [Required]
        [StringLength(50)]
        public string Street { get; set; }
        [Required]
        public string Colony { get; set; }
        public int MinicipalityId { get; set; }
        public string Minicipality { get; set; }
        public string State { get; set; }
        public int PostalCode { get; set; }
        public bool Principal { get; set; }
        public string? References { get; set; }
    }
}
