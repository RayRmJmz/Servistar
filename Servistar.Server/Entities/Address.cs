using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Servistar.Server.Entities
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(10)]
        public string Number { get; set; }
        [Required]
        [StringLength(50)]
        public string Street { get; set; }
        public string Colony { get; set; }
        public int MinicipalityId { get; set; }
        public string State { get; set; }
        public int PostalCode { get; set; }
        public bool Principal { get; set; }
        public string? References { get; set; }

        [ForeignKey("MinicipalityId")]
        public virtual MunicipalitiesEntity? Municipalities { get; set; }

    }
}
