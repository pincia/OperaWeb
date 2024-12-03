using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.Repository.Models
{
    /// <summary>
    /// User class model
    /// </summary>
    
    [Table("Users")]
    public class OldUser
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "varchar(30)")]
        [StringLength(30)]
        public string FirstName { get; set; }

        [Column(TypeName = "varchar(30)")]
        [Required]
        [StringLength(30)]
        public string LastName { get; set; }

        [Column(TypeName = "varchar(100)")]
        [StringLength(100)]
        public string Address { get; set; }

        [Column(TypeName = "varchar(30)")]
        [StringLength(30)]
        public string City { get; set; }

        [Column(TypeName = "varchar(30)")]
        [StringLength(30)]
        public string Region { get; set; }

        public int PostalCode { get; set; }

        public string Country { get; set; }

        [Column(TypeName = "varchar(20)")]
        [StringLength(20)]
        public string Phone { get; set; }

        [Required]
        public string Password { get; set; }    

        public bool IsActive {  get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }
        public OldUser() { }

        public ICollection<OldRole> Roles { get; set; }
    }
}
