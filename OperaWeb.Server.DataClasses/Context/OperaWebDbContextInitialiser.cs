
using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OperaWeb.Server.DataClasses.Context;
using System.Security.Claims;
namespace OperaWeb.Server.DataClasses.Context
{
  public class OperaWebDbContextInitialiser
  {
    private readonly ILogger<OperaWebDbContextInitialiser> _logger;
    private readonly OperaWebDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public OperaWebDbContextInitialiser(ILogger<OperaWebDbContextInitialiser> logger, OperaWebDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
      _logger = logger;
      _context = context;
      _userManager = userManager;
      _roleManager = roleManager;
    }
    public async Task InitialiseAsync()
    {
      try
      {
        if (_context.Database.IsSqlServer())
        {
          await _context.Database.MigrateAsync();
        }
      }
      catch (Exception ex)
      {

        _logger.LogError(ex, "An error occurred while initialising the database.");
        throw;
      }
    }
    public async Task SeedAsync()
    {
      try
      {
        await TrySeedAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "An error occurred while seeding the database.");
        throw;
      }
    }

    public async Task TrySeedAsync()
    {
      // Default roles
      var administratorRole = new IdentityRole("Administrator");

      if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
      {
        var role = await _roleManager.CreateAsync(administratorRole);
        if (role != null)
        {
          await _roleManager.AddClaimAsync(administratorRole, new Claim("RoleClaim", "HasRoleView"));
          await _roleManager.AddClaimAsync(administratorRole, new Claim("RoleClaim", "HasRoleAdd"));
          await _roleManager.AddClaimAsync(administratorRole, new Claim("RoleClaim", "HasRoleEdit"));
          await _roleManager.AddClaimAsync(administratorRole, new Claim("RoleClaim", "HasRoleDelete"));
        }
      }

      //Soa 
      var soa = _context.Soas.ToList();

      if (soa.Count == 0)
      {
        _context.Soas.Add(new Models.Soa() { Code = "", Description = "Nessuna" });
        _context.Soas.Add(new Models.Soa() { Code = "G1", Description = "Edifici civili e industriali" });
        _context.Soas.Add(new Models.Soa() { Code = "G2", Description = "Restauro e manutenzione dei beni immobili sottoposti a tutela" });
        _context.Soas.Add(new Models.Soa() { Code = "G3", Description = "Strade, autostrade, ponti, viadotti, ferrovie, metropolitane" });
        _context.Soas.Add(new Models.Soa() { Code = "G4", Description = "Opere d\"arte nel sottosuolo" });
        _context.Soas.Add(new Models.Soa() { Code = "G5", Description = "Dighe" });
        _context.Soas.Add(new Models.Soa() { Code = "G6", Description = "Acquedotti, gasdotti, oleodotti, opere di irrigazione e di evacuazione" });
        _context.Soas.Add(new Models.Soa() { Code = "G7", Description = "Opere marittime e lavori di dragaggio" });
        _context.Soas.Add(new Models.Soa() { Code = "G8", Description = "Opere fluviali, di difesa, di sistemazione idraulica e di bonifica" });
        _context.Soas.Add(new Models.Soa() { Code = "G9", Description = "Impianti per la produzione di energia elettrica" });
        _context.Soas.Add(new Models.Soa() { Code = "OG10", Description = "Impianti per la trasformazione alta/media tensione e per la distribuzione di energia elettrica in corrente alternata e continua ed impianti di pubblica illuminazione" });
        _context.Soas.Add(new Models.Soa() { Code = "OG11", Description = "Impianti tecnologici" });
        _context.Soas.Add(new Models.Soa() { Code = "OG12", Description = "Opere ed impianti di bonifica e protezione ambientale" });
        _context.Soas.Add(new Models.Soa() { Code = "OG13", Description = "Opere di ingegneria naturalistica" });
        _context.Soas.Add(new Models.Soa() { Code = "OS1", Description = "Lavori in terra" });
        _context.Soas.Add(new Models.Soa() { Code = "OS2-A", Description = "Superfici decorate di beni immobili del patrimonio culturale e beni culturali mobili di interesse storico, artistico, archeologico ed etnoantropologico" });
        _context.Soas.Add(new Models.Soa() { Code = "OS2-B", Description = "Beni culturali mobili di interesse archivistico e librario" });
        _context.Soas.Add(new Models.Soa() { Code = "OS3", Description = "Impianti idrico-sanitario, cucine, lavanderie" });
        _context.Soas.Add(new Models.Soa() { Code = "OS4", Description = "Impianti elettromeccanici trasportatori" });
        _context.Soas.Add(new Models.Soa() { Code = "OS5", Description = "Impianti pneumatici e antintrusione" });
        _context.Soas.Add(new Models.Soa() { Code = "OS6", Description = "Finiture di opere generali in materiali lignei, plastici, metallici e vetrosi" });
        _context.Soas.Add(new Models.Soa() { Code = "OS7", Description = "Finiture di opere generali di natura edile e tecnica" });
        _context.Soas.Add(new Models.Soa() { Code = "OS8", Description = "Opere di impermeabilizzazione" });
        _context.Soas.Add(new Models.Soa() { Code = "OS9", Description = "Impianti per la segnaletica luminosa e la sicurezza del traffico" });
        _context.Soas.Add(new Models.Soa() { Code = "OS10", Description = "Segnaletica stradale non luminosa" });
        _context.Soas.Add(new Models.Soa() { Code = "OS11", Description = "Apparecchiature strutturali speciali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS12-A", Description = "Barriere stradali di sicurezza" });
        _context.Soas.Add(new Models.Soa() { Code = "OS12-B", Description = "Barriere paramassi, fermaneve e simili" });
        _context.Soas.Add(new Models.Soa() { Code = "OS13", Description = "Strutture prefabbricate in cemento armato" });
        _context.Soas.Add(new Models.Soa() { Code = "OS14", Description = "Impianti di smaltimento e recupero rifiuti" });
        _context.Soas.Add(new Models.Soa() { Code = "OS15", Description = "Pulizia di acque marine, lacustri, fluviali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS16", Description = "Impianti per centrali produzione energia elettrica" });
        _context.Soas.Add(new Models.Soa() { Code = "OS17", Description = "Linee telefoniche ed impianti di telefonia" });
        _context.Soas.Add(new Models.Soa() { Code = "OS18-A", Description = "Componenti strutturali in acciaio" });
        _context.Soas.Add(new Models.Soa() { Code = "OS18-B", Description = "Componenti per facciate continue" });
        _context.Soas.Add(new Models.Soa() { Code = "OS19", Description = "Impianti di reti di telecomunicazione e di trasmissioni e trattamento" });
        _context.Soas.Add(new Models.Soa() { Code = "OS20-A", Description = "Rilevamenti topografici" });
        _context.Soas.Add(new Models.Soa() { Code = "OS20-B", Description = "Indagini geognostiche" });
        _context.Soas.Add(new Models.Soa() { Code = "OS21", Description = "Opere strutturali speciali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS22", Description = "Impianti di potabilizzazione e depurazione" });
        _context.Soas.Add(new Models.Soa() { Code = "OS23", Description = "Demolizione di opere" });
        _context.Soas.Add(new Models.Soa() { Code = "OS24", Description = "Verde e arredo urbano" });
        _context.Soas.Add(new Models.Soa() { Code = "OS25", Description = "Scavi archeologici" });
        _context.Soas.Add(new Models.Soa() { Code = "OS26", Description = "Pavimentazioni e sovrastrutture speciali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS27", Description = "Impianti per la trazione elettrica" });
        _context.Soas.Add(new Models.Soa() { Code = "OS28", Description = "Impianti termici e di condizionamento" });
        _context.Soas.Add(new Models.Soa() { Code = "OS29", Description = "Armamento ferroviario" });
        _context.Soas.Add(new Models.Soa() { Code = "OS30", Description = "Impianti interni elettrici, telefonici, radiotelefonici e televisivi" });
        _context.Soas.Add(new Models.Soa() { Code = "OS31", Description = "Impianti per la mobilità sospesa" });
        _context.Soas.Add(new Models.Soa() { Code = "OS32", Description = "Strutture in legno" });
        _context.Soas.Add(new Models.Soa() { Code = "OS33", Description = "Coperture speciali" });
        _context.Soas.Add(new Models.Soa() { Code = "OS34", Description = "Sistemi antirumore per infrastrutture di mobilità" });
        _context.Soas.Add(new Models.Soa() { Code = "OS35", Description = "Interventi a basso impatto ambientale" });
 
      }

      //soas classifications
      var soaclassifications = _context.SoaClassifications.ToList();

      if (soaclassifications.Count == 0)
      {
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "", Description = "Nessuna" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "I", Description = "Classificazione I" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "II", Description = "Classificazione II" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "III", Description = "Classificazione III" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "III bis", Description = "Classificazione III bis" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "IV", Description = "Classificazione IV" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "IV bis", Description = "Classificazione IV bis" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "V", Description = "Classificazione V" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "VI", Description = "Classificazione VI" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "VII", Description = "Classificazione VII" });
        _context.SoaClassifications.Add(new Models.SoaClassification() { Code = "VIII", Description = "Classificazione VIII" });
      }

      // Default users
      var administrator = new ApplicationUser { UserName = "admin@test.it", Email = "admin@test.it" };
     
      if (_userManager.Users.All(u => u.UserName != administrator.UserName))
      {
        await _userManager.CreateAsync(administrator, "admin");
        if (!string.IsNullOrWhiteSpace(administratorRole.Name))
        {
          var result = await _userManager.CreateAsync(administrator, "Admin2024!");
          var newUser = _context.Users.Where(u => u.Email == administrator.Email).FirstOrDefault();
          newUser.EmailConfirmed = true;
        }
      }

      _context.SaveChanges();
    }
  }
}