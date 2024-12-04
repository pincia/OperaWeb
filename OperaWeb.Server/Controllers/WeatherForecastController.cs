using Microsoft.AspNetCore.Mvc;
using OperaWeb.Server.Abstractions;

namespace OperaWeb.Server.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WeatherForecastController : ControllerBase
  {
    private static readonly string[] Summaries = new[]
    {
          "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
      };

    private readonly ILogger<WeatherForecastController> _logger;

    private readonly IProjectService _projectService;


    public WeatherForecastController(ILogger<WeatherForecastController> logger, IProjectService projectService)
    {
      _logger = logger;
      _projectService = projectService;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<IEnumerable<WeatherForecast>> Get()
    {
      try
      {
        _logger.LogInformation("Logs from Controller");
        _logger.LogInformation("Get Forecast!!!");
        var toReturn = "";
        var project = await _projectService.GetAllAsync();

        foreach (var item in project)
        {
          toReturn += item.Description;
        }

        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
          Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
          TemperatureC = Random.Shared.Next(-20, 55),
          Summary = toReturn
        })
        .ToArray();
      }
      catch (Exception ex) 
      {
        _logger.LogInformation("Get Forecast EXCEPTION");
        _logger.LogError(ex.Message);
        return new List<WeatherForecast>();
      }
     
    }
  }

}
