using OperaWeb.SharedClasses.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
  [Table("VociComputo")]
  public class VoceComputo
  {
    public int ID { get; set; } // Proprietà per la chiave primaria

    public virtual ElencoPrezzo ElencoPrezzo { get; set; }
    public int ElencoPrezzoID { get; set; } // Chiave esterna per ElencoPrezzo

    public decimal Quantita { get; set; }
    public DateTime DataMis { get; set; }
    public int Flags { get; set; }
    public decimal Prezzo { get; set; }  
    public virtual SuperCategoria SuperCategoria { get; set; }
    public int? SuperCategoriaID { get; set; } // Cambiato in proprietà

    public virtual Categoria Categoria { get; set; }
    public int? CategoriaID { get; set; } // Cambiato in proprietà

    public virtual SubCategoria SubCategoria { get; set; }
    public int? SubCategoriaID { get; set; } // Cambiato in proprietà

    public virtual ICollection<Misura> Misure { get; set; } // Collezione di Misure

    public virtual Project Project { get; set; }
    public int ProjectID { get; set; } // Chiave esterna per Project
    public JobTypes JobType { get; set; }
  }
}
