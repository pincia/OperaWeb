using AutoMapper.Execution;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.Controllers.Account;
using OperaWeb.Server.DataClasses;
using OperaWeb.Server.DataClasses.Context;
using OperaWeb.Server.DataClasses.Models;
using OperaWeb.Server.Models.DTO;
using Services.UserGroup;
using System.Security.Claims;

namespace OperaWeb.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public partial class OrganizationController : ControllerBase
  {
    private readonly ILogger<UserController> _logger;
    private readonly UserService _userService;
    private readonly OperaWebDbContext _context;
    public OrganizationController(UserService userService, ILogger<UserController> logger, OperaWebDbContext context)
    {
      _context = context;
      _userService = userService;
      _logger = logger;
    }

    /// <summary>
    /// Aggiunta di un nuovo membro all'organigramma
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost("add-member")]
    public async Task<IActionResult> AddMember([FromBody] AddMemberRequest request)
    {
      try
      {
        var response = await _userService.CreateUserAndAddToOrganizationAsync(request.OrganizationId, request.FullName, request.Email, request.RoleName);
        if (!response.IsSucceed)
          return BadRequest(response);

        return Ok(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }


    /// <summary>
    /// Modifica il ruolo del membro
    /// </summary>
    /// <param name="memberId"></param>
    /// <param name="newRoleName"></param>
    /// <returns></returns>
    [HttpPut("update-role/{memberId}")]
    public async Task<IActionResult> UpdateRole(int memberId, [FromBody] string newRoleName)
    {
      var response = await _userService.UpdateMemberRoleAsync(memberId, newRoleName);
      if (!response.IsSucceed)
        return BadRequest(response);

      return Ok("Role updated successfully.");
    }

    /// <summary>
    /// Elimina un membro dall'organigramma
    /// </summary>
    /// <param name="memberId"></param>
    /// <returns></returns>
    [HttpDelete("remove-member/{memberId}")]
    public async Task<IActionResult> RemoveMember(int memberId)
    {
      var response = await _userService.RemoveMemberFromOrganizationAsync(memberId);
      if (!response.IsSucceed)
        return BadRequest(response);

      return Ok("Member removed successfully.");
    }

    // Endpoint per ottenere i ruoli organizzativi disponibili
    [HttpGet("available-roles")]
    public async Task<IActionResult> GetAvailableRoles()
    {
      var userId = User.FindFirstValue("Id");
      var response = await _userService.GetAvailableOrganizationRolesAsync(userId);

      if (!response.IsSucceed)
        return BadRequest(new { message = "error retriving available roles" });

      return Ok(response.Data.Select(role => new
      {
        role.Id,
        role.Name
      }));
    }

    [HttpPost("create-organization")]
    public async Task<IActionResult> CreateOrganization([FromBody] CreateOrganizationDto dto)
    {
      var response = await _userService.CreateNewOrganizationMemberAsync(dto.UserId);

      if (!response.IsSucceed)
        return BadRequest(new { message = "Errro creating organization member" });

      return Ok(new { message = "Organization member created successfully." });
    }

    [HttpGet("get-structure")]
    public async Task<IActionResult> GetOrganizationStructure()
    {
      try
      {
        var userId = User.FindFirstValue("Id");
        var result = await _userService.GetOrganizationStructure(userId);

        if (result == null || !result.Any())
          return NotFound(new { message = "No organization structure found for this node." });

        return Ok(result);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }
    /// <summary>
    /// Ottiene tutti i membri di un'organizzazione dell'utente loggato
    /// </summary>
    /// <returns>Elenco dei membri dell'organizzazione.</returns>
    [HttpGet("user-organization-members")]
    public async Task<IActionResult> GetOrganizationMembers()
    {
      try
      {
        var userId = User.FindFirstValue("Id");
        var companies = _context.Companies.Include(c => c.OrganizationMembers).ToList();

       var company = companies.FirstOrDefault(c => c.OrganizationMembers.Any(m => m.UserId == userId));


        if (company == null)
        {
          return NotFound("Company not found.");
        }
        // Recupera i membri dell'organizzazione
        var members = await _context.OrganizationMembers
            .Include(m => m.User)
            .Where(m => m.CompanyId == company.Id)
            .ToListAsync();

        if (!members.Any())
          return NotFound(new { message = "No members found for this organization." });

        // Mappa i membri al DTO
        var memberDtos = members.Select(member => new OrganizationMemberDto
        {
          Id = member.Id,
          FullName = $"{member.User.FirstName} {member.User.LastName}",
          Email = member.User.Email,
          PhoneNumber = member.User.PhoneNumber,
          RoleName = member.Role?.Name,
          IsOwner = member.IsOwner
        }).ToList();

        return Ok(memberDtos);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while retrieving organization members.");
        return StatusCode(500, new { message = ex.Message });
      }
    }
    /// <summary>
    /// Ottiene tutti i membri di un'organizzazione.
    /// </summary>
    /// <param name="organizationId">ID dell'organizzazione.</param>
    /// <returns>Elenco dei membri dell'organizzazione.</returns>
    [HttpGet("organization-members/{organizationId}")]
    public async Task<IActionResult> GetOrganizationMembers(int organizationId)
    {
      try
      {
        // Recupera i membri dell'organizzazione
        var members = await _context.OrganizationMembers
            .Include(m => m.User)
            .Where(m => m.CompanyId == organizationId)
            .ToListAsync();

        if (!members.Any())
          return NotFound(new { message = "No members found for this organization." });

        // Mappa i membri al DTO
        var memberDtos = members.Select(member => new OrganizationMemberDto
        {
          Id = member.Id,
          FullName = $"{member.User.FirstName} {member.User.LastName}",
          Email = member.User.Email,
          PhoneNumber = member.User.PhoneNumber,
          RoleName = member.Role?.Name,
          IsOwner = member.IsOwner
        }).ToList();

        return Ok(memberDtos);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while retrieving organization members.");
        return StatusCode(500, new { message = ex.Message });
      }
    }
  }
}
