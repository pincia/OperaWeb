namespace OperaWeb.Server.Models.DTO
{
  public class UpdateProfileDto
  {
    // Campi Utente
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public int ComuneId { get; set; }          // Comune dell'utente
    public int ProvinciaId { get; set; }       // Provincia dell'utente

    // Campi Azienda
    public string RagioneSociale { get; set; } // Obbligatorio
    public string? PIVA { get; set; }          // Nullable
    public string? CompanyTaxCode { get; set; } // Codice fiscale aziendale
    public int CompanyComuneId { get; set; }    // Comune dell'azienda
    public int CompanyProvinciaId { get; set; } // Provincia dell'azienda
    public string? SDICode { get; set; }       // Codice SDI
    public string? PEC { get; set; }           // PEC aziendale
    public int SubRoleId { get; set; }  //Sottoruolo
  }


}
