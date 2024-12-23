using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
    [Table("ConfigNumeri")]
    public class ConfigNumeri
    {
        public int ID { get; set; }
        public string Valuta { get; set; }

        public int PartiUguali { get; set; }

        public int Lunghezza { get; set; }

        public int Larghezza { get; set; }

        public int HPeso { get; set; }

        public int Quantita { get; set; }

        public int Prezzi { get; set; }

        public int PrezziTotale { get; set; }

        public int ConvPrezzi { get; set; }

        public int ConvPrezziTotale { get; set; }

        public int IncidenzaPercentuale { get; set; }

        public int Aliquote { get; set; }

        public virtual Project Project { get; set; }
        public int ProjectID { get; set; }
  }
}
