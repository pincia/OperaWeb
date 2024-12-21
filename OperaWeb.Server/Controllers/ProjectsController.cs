
using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.Abstractions;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using OperaWeb.Server.Models.Mapper;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class ProjectsController : ControllerBase
  {
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
      _projectService = projectService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateProjectAsync(CreateProjectRequestDTO request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      try
      {
        var projectId = await _projectService.CreateProjectAsync(request);
        return Ok(new { message = "Project successfully created", id = projectId });

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while creating Project", error = ex.Message });

      }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProjectAsync(UpdateProjectRequestDTO request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      try
      {
        await _projectService.UpdateProjectAsync(request);
        return Ok(new { message = "Project successfully updated" });

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while updating Project", error = ex.Message });

      }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
      try
      {
        var userId = User.FindFirstValue("Id");
        var projects = await _projectService.GetAllProjects((string)userId ?? "");
        if (projects == null || !projects.Any())
        {
          return Ok(new { message = "No Projects found", data = new List<Project>() });
        }
        return Ok(new { message = "Successfully retrieved all projects", data = projects });

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while retrieving projects", error = ex.Message });

      }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProjectDTO>> GetProject(int id)
    {
      try
      {
        var userId = User.FindFirstValue("Id");
        var project = _projectService.GetProjectById(id, userId);

        if (project == null)
        {
          return Ok(new { message = $"No Project found for id {id}", data = new List<Project>() });
        }
        return Ok(new { message = "Successfully retrieved project", data = ProjectMapper.ToProjectDTO(project) });

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = $"An error occurred while retreving the project id: {id}", error = ex.Message });
      }
    }
    [HttpDelete]
    public async Task<IActionResult> DeleteProjectAsync(DeleteProjectRequestDTO req)
    {
      var userId = User.FindFirstValue("Id");
      var project = _projectService.GetProjectById(req.Id, userId);
      if (project == null)
      {
        return BadRequest(new { message = "No Project found for user" });
      }

      try
      {
        await _projectService.DeleteProjectAsync(req.Id);
        return Ok(new { message = "Project successfully deleted" });

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while deleting the project", error = ex.Message });

      }
    }

    [HttpDelete]
    [Route("Hard-Delete")]
    public async Task<IActionResult> HardDeleteProjectAsync(int id)
    {
      var userId = User.FindFirstValue("Id");
      var project = _projectService.GetProjectById(id, userId);
      if (project == null)
      {
        return BadRequest(new { message = "No Project found" });
      }

      try
      {
        await _projectService.HardDeleteProjectAsync(id);
        return Ok(new { message = "Project successfully deleted" });

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while deleting the project", error = ex.Message });

      }
    }
    [HttpPost]
    [Route("Create-project-from-file")]
    public async Task<IActionResult> ImportProjectFromFile([FromForm] IFormFile file)
    {
      // Ottieni l'ID dell'utente dal token
      var userId = User.FindFirstValue("Id");

      if (string.IsNullOrEmpty(userId))
      {
        return Unauthorized(new { message = "User not authorized" });
      }

      if (file.Length <= 0)
      {
        return BadRequest(new { message = "File length 0" });
      }

      try
      {
        // Ottieni l'ID di connessione SignalR dal client
        var connectionId = Request.Headers["X-Connection-Id"].ToString();
        if (string.IsNullOrEmpty(connectionId))
        {
          return BadRequest(new { message = "SignalR Connection ID is required" });
        }

        
        // Avvia il metodo di importazione
        var importResult = await _projectService.ImportNewProject(file, userId, connectionId);

   
        return Ok(importResult);

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred during import", error = ex.Message });
      }
    }


  }
}
