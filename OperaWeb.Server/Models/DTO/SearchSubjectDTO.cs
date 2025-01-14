namespace OperaWeb.Server.Models.DTO
{
  public class SearchSubjectDTO
  {
    /// <summary>
    /// Identificativo unico dell'utente legato al soggetto
    /// </summary>
    public string UserId { get; set; }

    /// <summary>
    /// Nome del soggetto.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Email del soggetto.
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Codice fiscale del soggetto
    /// </summary>
    public string Cf { get; set; }

    /// <summary>
    /// Codice fiscale o Partita IVA dell'azienda.
    /// </summary>
    public string CfPiva { get; set; }

    /// <summary>
    /// Nome dell'azienda associata al soggetto.
    /// </summary>
    public string Company { get; set; }

    /// <summary>
    /// Ruolo del soggetto all'interno dell'organizzazione.
    /// </summary>
    public string OrganizationRole { get; set; }

    /// <summary>
    /// Figura associata al soggetto.
    /// </summary>
    public string Figure { get; set; }
  }
}
