using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
    [Table("ConfigNumeri")]
    public class ConfigNumeri
    {
        public int ID { get; set; }
        public string Divisa { get; set; }

        public string ConversioniIN { get; set; }

        public string FattoreConversione { get; set; }

        public byte Cambio { get; set; }

        public string PartiUguali { get; set; }

        public string Lunghezza { get; set; }

        public string Larghezza { get; set; }

        public string HPeso { get; set; }

        public string Quantita { get; set; }

        public string Prezzi { get; set; }

        public string PrezziTotale { get; set; }

        public string ConvPrezzi { get; set; }

        public string ConvPrezziTotale { get; set; }

        public string IncidenzaPercentuale { get; set; }

        public string Aliquote { get; set; }

        public virtual Progetto Progetto { get; set; }
        public int ProgettoID { get; set; }
  }
}
