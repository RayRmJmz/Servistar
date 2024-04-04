using Servistar.Server.Models.Sources;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Servistar.Server.Models
{

    public class UsersCreateModel
    {
        [Required]
        [MaxLength(10)]
        public string UserName { get; set; }
        [Required]
        [MaxLength(10)]
        public string NewPassword { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? LastName { get; set; }

        public string? SecondLastName { get; set; }
        public string? NNS { get; set; }
        [Column(TypeName = "Date")]
        public string? BirthDate { get; set; }
        [Column(TypeName = "Date")]
        public string? StartedDate { get; set; }

        public IEnumerable<RoleResponseModel> Roles { get; set; }
    }
    public class UsersResponseModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? SecondLastName { get; set; }
        public string? NNS { get; set; }
        [Column(TypeName = "Date")]
        public string? BirthDate { get; set; }
        [Column(TypeName = "Date")]
        public string? StartedDate { get; set; }
        [Column(TypeName = "Date")]
        public string? TerminationDate { get; set; }
        public bool Active { get; set; }
        public IEnumerable<RoleResponseModel> Roles { get; set; }
    }
}
