

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OperaWeb.Server.Repository.Models
{
    /// <summary>
    /// Role class model
    /// </summary>
    [Table("Roles")]
    public class OldRole
    {
        [Key]
        public int Id { get; private set; }

        [Required]
        [Column(TypeName = "varchar(30)")]
        [StringLength(30)]
        public string Description { get; private set; }

        public ICollection<OldUser> Users { get; private set; }
    }
}
