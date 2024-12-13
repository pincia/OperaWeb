
using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.Abstractions;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;
using System.Security.Claims;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
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
    public async Task<ActionResult<Project>> GetProject(int id)
    {
      try
      {
        var userId = User.FindFirstValue("Id");
        var project = _projectService.GetProjectById(id, userId);

        if (project == null)
        {
          return Ok(new { message = $"No Project found for id {id}", data = new List<Project>() });
        }
        return Ok(new { message = "Successfully retrieved project", data = project });

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
    public async Task<IActionResult> Post(CreateProjectFromFileRequestDTO request)
    {
      var userId = User.FindFirstValue("Id");

      if (userId == null)
      {
        return BadRequest();
      }

      if (request.File.Length > 0)
      {
        var res = await _projectService.ImportNewProject(request, userId);

        if (res.Item1 != -1)
        {
          return Ok(new { id = res.Item1 });
        }
        else
        {
          return StatusCode(StatusCodes.Status500InternalServerError, res.Item2);
        }
      }

      return BadRequest();
    }

  }
}
