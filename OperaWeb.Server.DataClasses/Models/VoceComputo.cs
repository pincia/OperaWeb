using System.ComponentModel.DataAnnotations.Schema;

namespace OperaWeb.Server.DataClasses.Models
{
    [Table("VociComputo")]
    public class VoceComputo
    {
        public int ID;

        public int IDEP { get; set; }

        public decimal Quantita { get; set; }

        public DateTime DataMis { get; set; }

        public int Flags { get; set; }

        public virtual SuperCategoria SuperCategoria { get; set; }
        public int? SuperCategoriaID;

        public virtual Categoria Categoria { get; set; }
        public int? CategoriaID;

        public virtual SubCategoria SubCategoria { get; set; }
        public int? SubCategoriaID;

        public ICollection<Misura> Misure { get; set; }

        public virtual Project Project { get; set; }
        public int ProjectID { get; set; }
    }

}
