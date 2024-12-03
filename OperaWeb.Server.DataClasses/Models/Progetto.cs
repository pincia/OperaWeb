
using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  [Table("Progetti")]
  public class Progetto
  {
    public int ID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public string Address { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string ZipCode { get; set; }
    public decimal TotalAmount { get; set; }

    public bool isDeleted { get; set; }
    public DateTime CreationDate { get; set; }

    public DateTime LastUpdateDate { get; set; }

    public virtual File File { get; set; }

    public virtual ApplicationUser User { get; set; }

    public ICollection<VoceComputo> VociComputo { get; set; }
    public ICollection<Categoria> Categorie { get; set; }
    public ICollection<SubCategoria> SubCategorie { get; set; }
    public ICollection<SuperCategoria> SuperCategorie { get; set; }
    public ICollection<ConfigNumeri> ConfigNumeri { get; set; }
    public ICollection<DatiGenerali> DatiGenerali { get; set; }
    public ICollection<ElencoPrezzo> ElencoPrezzi { get; set; }

  }
}
