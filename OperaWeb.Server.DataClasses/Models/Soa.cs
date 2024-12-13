
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  [Table("Soa")]
  public class Soa
  {
    public int Id { get; set; }

    [MaxLength(6)]
    public string Code { get; set; }

    [MaxLength(255)]
    public string Description { get; set; }
  }
}
