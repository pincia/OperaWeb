
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  [Table("SoaClassifications")]
  public class SoaClassification
  {
    public int Id { get; set; }

    [MaxLength(8)]
    public string Code { get; set; }

    [MaxLength(32)]
    public string Description { get; set; }
  }
}
