﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.Abstractions;
using OperaWeb.Server.Models;
using OperaWeb.Server.Models.DTO.Project;
using OperaWeb.Server.DataClasses.Models;
using System.Security.Claims;
using AutoMapper;

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
    public async Task<IActionResult> CreateProjectAsync(CreateProjectRequest request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }


      try
      {

        await _projectService.CreateProjectAsync(request);
        return Ok(new { message = "Project successfully created" });

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while creating Project", error = ex.Message });

      }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProjectAsync(UpdateProjectRequest request)
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

        var project = await _projectService.GetAllAsync((string) userId ?? "");
        if (project == null || !project.Any())
        {
          return Ok(new { message = "No Projects found", data = new List<Progetto>() });
        }
        return Ok(new { message = "Successfully retrieved all projects", data = project });

      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "An error occurred while retrieving projects", error = ex.Message });


      }
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteProjectAsync(DeleteProjectRequest req)
    {
      var project = await _projectService.GetByIdAsync(req.Id);
      if (project == null)
      {
        return BadRequest(new { message = "No Project found" });
      }
      var userId = User.FindFirstValue("Id");
      if (project.User.Id != userId)
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
      var project = await _projectService.GetByIdAsync(id);
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
    public async Task<IActionResult> Post(CreateProjectFromFileRequest request)
    {
      var userId = User.FindFirstValue("Id");

      if (userId == null)
      {
        return BadRequest();
      }

      if (request.File.Length > 0)
      {
        var res = await _projectService.ImportNewProject(request, userId);

        if (res.Item1)
        {
          return Ok();
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
