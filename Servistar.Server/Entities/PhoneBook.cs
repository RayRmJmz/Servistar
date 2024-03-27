using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Servistar.Server.Entities
{
    public class PhoneBook
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(13)]
        public string PhoneNumber { get; set; }
        public bool Principal { get; set; }

    }
}
