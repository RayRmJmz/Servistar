using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Servistar.Server.Entities
{
    public class ApplicationUserEntity : IdentityUser
    {
        [MaxLength(100)]
        public string? Name { get; set; }
        [MaxLength(100)]
        public string? LastName { get; set; }
        [MaxLength(100)]
        public string? SecondLastName { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? BirthDate { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? StartedDate { get; set; }
        [Column(TypeName = "Date")]
        public DateTime? TerminationDate { get; set; }
        [MaxLength(20)]
        public string? NNS { get; set; }
        public bool? Active { get; set; }

       
    }
}
