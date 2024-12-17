namespace OperaWeb.Server.Models.DTO.Account
{
  /// <summary>
  /// DTO per aggiornare i dati
  /// </summary>
  public class UpdateUserDataRequest
  {
    public string MobileNumber { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string PIVA { get; set; }
  }

}
