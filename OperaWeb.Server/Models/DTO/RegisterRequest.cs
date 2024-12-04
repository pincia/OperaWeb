namespace OperaWeb.Server.Models.DTO
{
    public class RegisterRequest
    {
        public RegisterRequest()
        {
            Email = string.Empty;
            Password = string.Empty;
            FirstName = string.Empty;
            LastName = string.Empty;
            Address = string.Empty;
            City = string.Empty;
            Region = string.Empty;
            Country = string.Empty;
            Phone = string.Empty;

        }
        /// <example>1234</example>
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public int PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }


    }
}