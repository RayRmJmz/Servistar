using System.ComponentModel.DataAnnotations;

namespace Servistar.Server.Entities
{
    public class MunicipalitiesEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Minicipality { get; set; }
        [Required]
        [StringLength(3)]
        public string Key { get; set; }
    }
}
