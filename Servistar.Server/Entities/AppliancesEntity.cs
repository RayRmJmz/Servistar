using System.ComponentModel.DataAnnotations;

namespace Servistar.Server.Entities
{
    public class AppliancesEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Appliance { get; set; }
    }
}
