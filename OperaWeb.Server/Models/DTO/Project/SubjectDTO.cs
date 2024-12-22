namespace OperaWeb.Server.Models.DTO.Project
{
  public class SubjectDTO
  {
    public int? SubjectId { get; set; } // Id univoco del soggetto
    public string Name { get; set; } // Nome o ragione sociale del soggetto
    public string? Email { get; set; } // Email del soggetto
    public string? Status { get; set; } // Stato (ad esempio, "Invitato", "Registrato")
    public DateTime CreatedAt { get; set; } // Data di creazione
    public string? UserId { get; set; } // Riferimento all'utente registrato, se esiste
    public string SubjectRole { get; set; }
    public string Type { get; set; }
  }
}
