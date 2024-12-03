using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
    [Table("Misure")]
    public class Misura
    {
        public int ID { get; set; }
        public int IDVV { get; set; }

        public string Descrizione { get; set; }

        public string? PartiUguali { get; set; }

        public decimal? Lunghezza { get; set; }

        public decimal? Larghezza { get; set; }

        public decimal? HPeso { get; set; }

        public decimal? Quantita { get; set; }

        public int Flags { get; set; }

        public virtual VoceComputo VoceComputo { get; set; }
        public int VoceComputoID { get; set; }
    }
}
