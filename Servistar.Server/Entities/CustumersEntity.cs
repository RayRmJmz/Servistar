using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Servistar.Server.Entities
{
    public class CustumersEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string LastName { get; set; }
        public string? SecondLastName { get; set; }
        public string? UserId { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? BirthDate { get; set; }
        public DateTime? RegistrationDate { get; set; } = DateTime.Now;
        [ForeignKey("UserId")]
        public virtual ApplicationUserEntity? User { get; set; }
    }
}
