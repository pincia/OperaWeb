using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
    [Table("Analisi")]
    public partial class Analisi
    {
        public int ID { get; set; }
        public decimal SpeseUtili { get; set; }

        public decimal SpeseGenerali { get; set; }

        public decimal UtiliImpresa { get; set; }

        public decimal OneriAccessoriSc { get; set; }

        public string ConfQuantita { get; set; }

        public virtual Progetto Documento { get; set; }
        public int DocumentoID { get; set; }
    }
}
