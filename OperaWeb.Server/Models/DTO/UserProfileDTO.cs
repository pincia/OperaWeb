namespace OperaWeb.Server.Models.DTO
{
  public class UserProfileDto
  {
    /// <summary>
    /// First name of the user.
    /// </summary>
    public string FirstName { get; set; }

    /// <summary>
    /// Last name of the user.
    /// </summary>
    public string LastName { get; set; }

    /// <summary>
    /// Full name of the user.
    /// </summary>
    public string FullName { get; set; }

    /// <summary>
    /// user email /username
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Phone number of the user.
    /// </summary>
    public string? PhoneNumber { get; set; }

    /// <summary>
    /// Alternate email of the user.
    /// </summary>
    public string AlternateEmail { get; set; }

    /// <summary>
    /// Address of the user.
    /// </summary>
    public string? Address { get; set; }

    /// <summary>
    /// City of the user.
    /// </summary>
    public string City { get; set; }

    /// <summary>
    /// Postal code of the user.
    /// </summary>
    public string PostalCode { get; set; }

    /// <summary>
    /// Country of the user.
    /// </summary>
    public string Country { get; set; }

    /// <summary>
    /// The comune id
    /// </summary>
    public int? CityId { get; set; }

    /// <summary>
    /// The province id
    /// </summary>
    public int? ProvinceId { get; set; }
    /// <summary>
    /// Tax code of the user (Codice Fiscale - CF).
    /// </summary>
    public string CF { get; set; }

    /// <summary>
    /// Organization role id
    /// </summary>
    public int OrganizationRoleId { get; set; }

    /// <summary>
    /// The organziation role
    /// </summary>
    public string? OrgnaizationRole { get; set; }
  }
}
