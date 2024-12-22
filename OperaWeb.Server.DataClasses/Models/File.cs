using System.ComponentModel.DataAnnotations.Schema;
using OperaWeb.Server.DataClasses.Models.User;

namespace OperaWeb.Server.DataClasses.Models
{
    [Table("Files")]
    public class File
    {
        public int ID { get; set; }
        public string FileName { get; set; }

        public virtual ApplicationUser User { get; set; }
  }
}
