using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.Abstractions;
using OperaWeb.Server.Models;
using OperaWeb.Server.DataClasses;
using System.Security.Claims;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Services;
using OperaWeb.Server.Models.DTO.Templates;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TemplateController : ControllerBase
  {
    private readonly IProjectService _projectService;
    private readonly UserManager<ApplicationUser> _userManager;

    public TemplateController(UserManager<ApplicationUser> userManager, IProjectService dataService)
    {
      _projectService = dataService;
      _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll()
    {
      try
      {
        var templates = _projectService.GetAllTemplates();

        if (templates == null || !templates.Any())
        {
          return Ok(new { message = "No templates found", data = new List<TemplateDTO>() });
        }

        return Ok(new { message = "Successfully retrieved all projects", data = templates });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while retrieving projects", error = ex.Message });
      }

    }

  }
}
