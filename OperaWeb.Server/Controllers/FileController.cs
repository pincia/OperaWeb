using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.Abstractions;
using OperaWeb.Server.Models;
using OperaWeb.Server.DataClasses;
using System.Security.Claims;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class FileController : ControllerBase
  {
    private readonly IProjectService _projectService;
    private readonly UserManager<ApplicationUser> _userManager;

    public FileController(UserManager<ApplicationUser> userManager, IProjectService projectService)
    {
      _projectService = projectService;
      _userManager = userManager;
    }

    [HttpPost]
    [Authorize]
    [Route("Upload-XPVE")]
    public async Task<IActionResult> Post(IFormFile file, string projectName)
    {
      if (string.IsNullOrEmpty(projectName)) 
      {
        return BadRequest("Missing project name");
      }
      var username= User.FindFirstValue("UserName");
      
      if (username == null) 
      {
        return BadRequest();
      }

      if (file.Length > 0)
      {
        //await _projectService.ImportNewProject(file, username, projectName);
        return Ok();
      }

      return BadRequest();
    }

  }
}
