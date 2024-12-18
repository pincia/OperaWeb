﻿
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    public virtual File File { get; set; }
    public virtual ApplicationUser User { get; set; }
    public virtual Soa? SoaCategory { get; set; }
    public virtual SoaClassification? SoaClassification { get; set; }
    public ICollection<VoceComputo> VociComputo { get; set; }
    public ICollection<Categoria> Categorie { get; set; }
    public ICollection<SubCategoria> SubCategorie { get; set; }
    public ICollection<SuperCategoria> SuperCategorie { get; set; }
    public ICollection<ConfigNumeri> ConfigNumeri { get; set; }
    public ICollection<DatiGenerali> DatiGenerali { get; set; }
    public ICollection<ElencoPrezzo> ElencoPrezzi { get; set; }

  }
}
