using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using OperaWeb.Server.Models;

namespace OperaWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MenuController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("Widget")]
        public ActionResult<object> Widget()
        {
            var menuString = "{\"widget\":{\"id\":\"widget\",\"title\":\"widget\",\"type\":\"group\",\"icon\":\"widget\",\"children\":[{\"id\":\"statistics\",\"title\":\"statistics\",\"type\":\"item\",\"icon\":\"statistics\",\"url\":\"/widget/statistics\"},{\"id\":\"data\",\"title\":\"data\",\"type\":\"item\",\"icon\":\"data\",\"url\":\"/widget/data\"},{\"id\":\"chart\",\"title\":\"chart\",\"type\":\"item\",\"icon\":\"chart\",\"url\":\"/widget/chart\"}]}}";


            return Ok(menuString);

        }

    }
}
