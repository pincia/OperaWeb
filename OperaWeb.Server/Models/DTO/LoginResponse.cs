namespace OperaWeb.Server.Models.DTO
{
    public class RegisterResponse
    {
        public RegisterResponse()
        {
            responseMsg =
            new HttpResponseMessage()
            {
                StatusCode =
               System.Net.HttpStatusCode.Unauthorized
            };
        }
        public HttpResponseMessage responseMsg
        {
            get; set;
        }

    }

}
