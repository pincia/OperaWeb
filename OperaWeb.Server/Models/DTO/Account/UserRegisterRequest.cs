namespace OperaWeb.Server.Models.DTO.Account
{
  /// <summary>
  /// DTO for user registration requests.
  /// </summary>
  public class UserRegisterRequest
  {
    /// <summary>
    /// User's email address.
    /// </summary>
    public string Email { get; set; } = "";

    /// <summary>
    /// User's password.
    /// </summary>
    public string Password { get; set; } = "";

    /// <summary>
    /// User's first name.
    /// </summary>
    public string FirstName { get; set; } = "";

    /// <summary>
    /// User's last name.
    /// </summary>
    public string LastName { get; set; } = "";

    /// <summary>
    /// Figure assigned to the Company.
    /// </summary>
    public string Figure { get; set; } = "";

    /// <summary>
    /// Name of the user's company.
    /// </summary>
    public string CompanyName { get; set; } = "";

    /// <summary>
    /// VAT or Tax Code of the user's company.
    /// </summary>
    public string VatOrTaxCode { get; set; } = "";
  }

}
