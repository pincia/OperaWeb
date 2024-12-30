
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Models.User;

namespace OperaWeb.Server.DataClasses.Models
{
    [Table("Projects")]
  public class Project
  {
    public int ID { get; set; }
    public string Object { get; set; }
    public string Province { get; set; }
    public string City { get; set; }
    public string Works { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Notes { get; set; }
    public bool Public { get; set; }
    public bool Deleted { get; set; }
    [MaxLength(10)]
    public string? GIG { get; set; }
    [MaxLength(15)]
    public string? CUP { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public string UserId { get; set; }
    public virtual ApplicationUser User { get; set; }
    public int? SoaCategoryId { get; set;  }
    public virtual Soa? SoaCategory { get; set; }
    public int? SoaClassificationId { get; set; }
    public virtual SoaClassification? SoaClassification { get; set; }
    public ICollection<VoceComputo> VociComputo { get; set; }
    public ICollection<Categoria> Categorie { get; set; }
    public ICollection<SubCategoria> SubCategorie { get; set; }
    public ICollection<SuperCategoria> SuperCategorie { get; set; }
    public ConfigNumeri ConfigNumeri { get; set; }
    public DatiGenerali DatiGenerali { get; set; }
    public Analisi Analisi { get; set; }
    public ICollection<ElencoPrezzo> ElencoPrezzi { get; set; }
    public ICollection<ProjectSubject> ProjectSubjects { get; set; }
    public ICollection<ProjectTask> ProjectTasks { get; set; }
    public ICollection<UserProjectAccess> UserProjectAccesses { get; set; }

    public Economics Economics { get; set; }
  }

}
