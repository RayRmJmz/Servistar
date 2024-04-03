using System.ComponentModel.DataAnnotations;

namespace Servistar.Server.Entities
{
    public class BrandsEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Brand { get; set; }
    }
}
