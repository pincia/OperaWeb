namespace OperaWeb.Server.Models.DTO.Project
{
  using System;

  namespace ProjectManagement.Models.DTO
  {
    public class ProjectTaskDTO
    {
      // Proprietà essenziali
      public int Id { get; set; } // Identificativo univoco del task
      public string Text { get; set; } // Nome o descrizione breve del task
      public DateTime StartDate { get; set; } // Data di inizio del task
      public int Duration { get; set; } // Durata in giorni
      public double Progress { get; set; } // Avanzamento tra 0 e 1

      // Proprietà opzionali
      public int? ParentId { get; set; } // ID del task genitore (null per i task principali)
      public bool? Open { get; set; } // Se il task è espanso o collassato (solo per task con figli)
      public string Type { get; set; } // Tipo del task (es. "task", "milestone")
      public int? Order { get; set; } // Ordine del task nella lista
      public DateTime? EndDate { get; set; } // Data di fine (opzionale, calcolata da StartDate + Duration)
      public string Priority { get; set; } // Priorità (es. "High", "Medium", "Low")
      public string Color { get; set; } // Colore personalizzato per il task

      // Costruttore vuoto per la serializzazione/deserializzazione
      public ProjectTaskDTO() { }
    }
  }

}
