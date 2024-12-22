namespace OperaWeb.Server.Models.DTO
{
  public class TaskLinkDTO
  {
    public int Id { get; set; } // Identificativo del collegamento
    public int SourceTaskId { get; set; } // ID del task sorgente
    public int TargetTaskId { get; set; } // ID del task destinazione
    public int Type { get; set; } // Tipo di relazione (0 = Fine-Inizio, 1 = Inizio-Inizio, ecc.)
  }
}
