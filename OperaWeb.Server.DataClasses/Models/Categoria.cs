﻿using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  [Table("Categorie")]
  public class Categoria
  {
    public int ID { get; set; }

    public int ExternalID { get; set; }

    public string DesSintetica { get; set; }

    public string DesEstesa { get; set; }

    public DateTime DataInit { get; set; }

    public decimal Durata { get; set; }

    public string CodFase { get; set; }

    public decimal Percentuale { get; set; }

    public string Codice { get; set; }

    public virtual Project Project { get; set; }
    public int ProjectID { get; set; }

    public SuperCategoria? SuperCategoria {get; set; }
    public int? SuperCategoriaId { get; set; }
  }
}
